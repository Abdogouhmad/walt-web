import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getLatestRelease } from "@/lib/release";

/** When the legal pages were last reviewed by hand. */
const LEGAL_REVIEWED = new Date("2026-10-01");

/**
 * Four URLs. In-page anchors are not URLs and are deliberately absent — a
 * sitemap of `/#features` is noise.
 *
 * The home page's `lastModified` is the release date, not `new Date()`: the page
 * only changes when a new version of the app is published, and claiming
 * otherwise is exactly the kind of signal crawlers learn to ignore.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const release = await getLatestRelease();
  const shipped = new Date(release.publishedAt);

  return [
    {
      url: site.url,
      lastModified: Number.isNaN(shipped.getTime()) ? LEGAL_REVIEWED : shipped,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/privacy`,
      lastModified: LEGAL_REVIEWED,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${site.url}/terms`,
      lastModified: LEGAL_REVIEWED,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${site.url}/contact`,
      lastModified: LEGAL_REVIEWED,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}