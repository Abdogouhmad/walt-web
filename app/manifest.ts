import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Web app manifest.
 *
 * Colours are the emerald palette's own tonal values, so the installed shortcut
 * matches the site rather than some generic dark grey.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.name,
    description:
      "Walt is a private, offline-first expense tracker for Android. No account, no ads, no trackers — and open source under MIT.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    categories: ["finance", "productivity", "utilities"],
    background_color: "#F9F9F9",
    theme_color: "#0F6B4F",
    lang: "en",
    dir: "ltr",
    /**
     * The app's own launcher icon, served from `public/icon` so the manifest can
     * point at stable paths. The PNG is the 1024×1024 icon the Android build
     * ships; the SVG is the same artwork with its C2PA content credentials
     * embedded, which is why it is the one referenced as a maskable candidate.
     */
    icons: [
      { src: "/icon/walt_icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon/walt_icon.png", sizes: "1024x1024", type: "image/png", purpose: "any" },
    ],
    shortcuts: [
      {
        name: "Download",
        short_name: "Download",
        description: "Get the latest signed APK",
        url: "/#download",
      },
      {
        name: "What's new",
        short_name: "What's new",
        description: "See what changed in the latest release",
        url: "/#whats-new",
      },
    ],
  };
}