import type { Metadata, Viewport } from "next";
import { hero, site } from "@/content/site";
import { THEME_BOOTSTRAP } from "@/lib/site-theme";
import { Font } from "@/lib/font";
import "./styles/palettes.css";
import "./globals.css";

/**
 * The OG card and the app icon are file conventions (`app/opengraph-image.tsx`,
 * `app/icon.svg`), so they are attached automatically — this object only carries
 * what applies to every route. Each page overrides the parts that differ.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
  authors: [{ name: site.name, url: site.authorProfile }],
  creator: site.name,
  publisher: site.name,
  category: "finance",
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // The colour-scheme meta pairs with this so the browser paints native form
  // controls and scrollbars in the right brightness before any CSS loads.
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7FBF8" },
    { media: "(prefers-color-scheme: dark)", color: "#101413" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-palette="emerald" className={Font.variable}>
      <head>
        {/*
          Applies the stored palette and brightness before first paint, so
          someone who chose Ocean never sees a flash of Emerald. It is inlined
          rather than loaded as a script for exactly that reason.
        */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <noscript>
          <p className="shell py-6 text-center text-sm text-on-surface-variant">
            {hero.headline.join(" ")} — {hero.subline}
          </p>
        </noscript>
      </body>
    </html>
  );
}
