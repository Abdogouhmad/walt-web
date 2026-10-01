/**
 * The last release the site was verified against.
 *
 * This is a safety net, not a source of truth: `lib/release.ts` fetches the
 * current release from GitHub on every request and only falls back to this when
 * that fails. The Download section labels the numbers as unverified in that
 * case, so a stale version string can never be mistaken for a current one.
 *
 * Regenerate by copying the matching section out of the app's `CHANGELOG.md`
 * and taking the asset URLs from the release page.
 */

import type { ApkAsset } from "./release";

const TAG = "v0.8.2";

export type FallbackRelease = {
  version: string;
  tag: string;
  publishedAt: string;
  htmlUrl: string;
  notes: string;
  assets: Array<Pick<ApkAsset, "id" | "url" | "size">>;
};

export const fallbackRelease: FallbackRelease = {
  version: "0.8.2",
  tag: TAG,
  publishedAt: "2026-10-01T18:28:41Z",
  htmlUrl: `https://github.com/Abdogouhmad/walt/releases/tag/${TAG}`,
  notes: `## [0.8.2] - 2026-10-01

### Fixed

- **Recent activity never appeared on Home** — the section filtered
  transactions down to a date window that ended *yesterday*, and a transaction
  is stamped with the moment it was added, so every entry carried a time of day
  and fell outside it. Home said "No recent activity" while the Activity tab
  listed those same transactions. The same window also emptied the section for
  anyone whose newest entry was more than three days old. "Recent" is now simply
  the newest entries, with no date window at all, and picking a day in the week
  recap still narrows the list to that day — now matched on the calendar day, so
  the time of day can no longer hide an entry.
`,
  assets: [
    {
      id: "universal",
      url: `https://github.com/Abdogouhmad/walt/releases/download/${TAG}/walt-${TAG}-universal.apk`,
      size: 45_913_439,
    },
    {
      id: "arm64-v8a",
      url: `https://github.com/Abdogouhmad/walt/releases/download/${TAG}/walt-${TAG}-arm64-v8a.apk`,
      size: 25_459_545,
    },
    {
      id: "armeabi-v7a",
      url: `https://github.com/Abdogouhmad/walt/releases/download/${TAG}/walt-${TAG}-armeabi-v7a.apk`,
      size: 23_278_241,
    },
  ],
};