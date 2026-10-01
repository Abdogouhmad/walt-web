/**
 * The current Walt release, read from GitHub at request time.
 *
 * There is deliberately no hardcoded version, tag or download URL anywhere in
 * this project. Every link on the site is derived from the release the app's own
 * pipeline published, so the site can never point at a version that has been
 * superseded — or, worse, at an APK that does not exist.
 *
 * If the API is unreachable, rate-limited, or returns a shape we do not
 * recognise, `FALLBACK_RELEASE` is used and `stale: true` is set. The Download
 * section renders a visible notice in that case rather than pretending the
 * numbers are fresh.
 */

import { fallbackRelease, type FallbackRelease } from "./release-fallback";

export type ApkAsset = {
  id: "universal" | "arm64-v8a" | "armeabi-v7a";
  label: string;
  description: string;
  url: string;
  /** Bytes, from the release asset metadata. */
  size: number;
  recommended: boolean;
};

export type Release = {
  version: string;
  tag: string;
  publishedAt: string;
  htmlUrl: string;
  notes: string;
  assets: ApkAsset[];
  /** True when GitHub could not be reached and the fallback is in use. */
  stale: boolean;
};

const API = "https://api.github.com/repos/Abdogouhmad/walt/releases/latest";

/** Asset filename suffixes the release pipeline produces, per ABI. */
const ABI_SUFFIXES: Array<{ id: ApkAsset["id"]; suffix: string }> = [
  { id: "universal", suffix: "-universal.apk" },
  { id: "arm64-v8a", suffix: "-arm64-v8a.apk" },
  { id: "armeabi-v7a", suffix: "-armeabi-v7a.apk" },
];

const ABI_COPY: Record<ApkAsset["id"], { label: string; description: string; recommended: boolean }> = {
  universal: {
    label: "Universal",
    description: "One APK that runs on any Android device. Pick this if you are not sure.",
    recommended: true,
  },
  "arm64-v8a": {
    label: "arm64-v8a",
    description: "64-bit. This is almost every phone made in the last decade.",
    recommended: false,
  },
  "armeabi-v7a": {
    label: "armeabi-v7a",
    description: "Older 32-bit devices. Smaller download.",
    recommended: false,
  },
};

type GithubAsset = { name?: unknown; browser_download_url?: unknown; size?: unknown };
type GithubRelease = {
  tag_name?: unknown;
  name?: unknown;
  published_at?: unknown;
  html_url?: unknown;
  body?: unknown;
  assets?: unknown;
};

function isString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function toAssets(raw: unknown): ApkAsset[] {
  if (!Array.isArray(raw)) return [];
  const byName = new Map<string, GithubAsset>();
  for (const entry of raw as GithubAsset[]) {
    if (entry && isString(entry.name) && isString(entry.browser_download_url)) {
      byName.set(entry.name, entry);
    }
  }

  const assets: ApkAsset[] = [];
  for (const { id, suffix } of ABI_SUFFIXES) {
    // `walt-v0.8.1-universal.apk` — match on the ABI suffix so the lookup
    // survives a version bump without touching this file.
    const match = [...byName.entries()].find(([name]) => name.endsWith(suffix));
    if (!match) continue;
    const [, entry] = match;
    assets.push({
      id,
      url: entry.browser_download_url as string,
      size: typeof entry.size === "number" ? entry.size : 0,
      ...ABI_COPY[id],
    });
  }

  // Preserve the order the Download section presents: universal first.
  return ABI_SUFFIXES.flatMap(({ id }) => assets.filter((asset) => asset.id === id));
}

function fromFallback(reason?: string): Release {
  const fallback: FallbackRelease = fallbackRelease;
  if (reason) {
    console.warn(`[walt] falling back to bundled release data: ${reason}`);
  }
  return {
    version: fallback.version,
    tag: fallback.tag,
    publishedAt: fallback.publishedAt,
    htmlUrl: fallback.htmlUrl,
    notes: fallback.notes,
    assets: ABI_SUFFIXES.flatMap(({ id }) => {
      const asset = fallback.assets.find((candidate) => candidate.id === id);
      if (!asset) return [];
      return [{ ...asset, ...ABI_COPY[id] }];
    }),
    stale: true,
  };
}

export async function getLatestRelease(): Promise<Release> {
  try {
    const response = await fetch(API, {
      // Anonymity: no token, no cookies, no identifying headers. This is the
      // same single request Walt's own update check makes.
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      return fromFallback(`GitHub responded ${response.status}`);
    }

    const payload = (await response.json()) as GithubRelease;
    if (!isString(payload.tag_name)) {
      return fromFallback("release payload had no tag_name");
    }

    const assets = toAssets(payload.assets);
    if (assets.length === 0) {
      // Notes are still worth showing even if the naming ever changes, but a
      // download button with no asset would be a dead end.
      return fromFallback("no APK assets matched the known ABI suffixes");
    }

    const tag = payload.tag_name;
    return {
      version: tag.replace(/^v/, ""),
      tag,
      publishedAt: isString(payload.published_at) ? payload.published_at : new Date().toISOString(),
      htmlUrl: isString(payload.html_url)
        ? payload.html_url
        : `https://github.com/Abdogouhmad/walt/releases/tag/${tag}`,
      notes: isString(payload.body) ? payload.body : "",
      assets,
      stale: false,
    };
  } catch (error) {
    return fromFallback(error instanceof Error ? error.message : "unknown error");
  }
}

/** `2026-09-30` → `30 September 2026`. */
export function formatReleaseDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** `45913439` → `43.8 MB`. */
export function formatBytes(bytes: number): string {
  if (!bytes || bytes < 0) return "";
  const megabytes = bytes / 1_000_000;
  if (megabytes < 1) return `${Math.round(bytes / 1000)} kB`;
  return `${megabytes.toFixed(1)} MB`;
}