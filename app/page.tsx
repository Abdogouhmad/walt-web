import { Suspense } from "react";
import type { Metadata } from "next";
import { hero, site } from "@/content/site";
import { getLatestRelease, type Release } from "@/lib/release";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhatsNew } from "@/components/WhatsNew";
import { Features } from "@/components/Features";
import { Reports } from "@/components/Reports";
import { Themes } from "@/components/Themes";
import { Privacy } from "@/components/Privacy";
import { ScreenshotRail } from "@/components/ScreenshotRail";
import { Faq } from "@/components/Faq";
import { Download } from "@/components/Download";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: { default: `${site.name} — ${site.tagline}`, template: `%s · ${site.name}` },
  description: hero.subline,
  applicationName: site.name,
  keywords: [
    "expense tracker",
    "budget app",
    "offline expense tracker",
    "private finance app",
    "Material 3",
    "Android",
    "open source expense tracker",
  ],
  authors: [{ name: site.name, url: site.authorProfile }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en",
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: hero.subline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: hero.subline,
  },
  category: "finance",
  formatDetection: { telephone: false, address: false, email: false },
};

/**
 * The release promise is created once here and handed to every consumer that
 * needs it. Because it is never awaited by the page itself, the sections above
 * the download block are not held up by the GitHub round-trip: the shell, the
 * hero and the bento all stream first, and the release-dependent parts resolve
 * into their own suspense boundaries. Next's fetch cache means the changelog
 * teaser asking for the same release costs nothing extra.
 */
export default function Home() {
  const release = getLatestRelease();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Hero />
        <WhatsNew />
        <Features />
        <Reports />
        <Themes />
        <Privacy />
        <ScreenshotRail />
        <Faq />

        <Suspense fallback={<DownloadFallback />}>
          <DownloadSection release={release} />
        </Suspense>
      </main>

      <Footer />

      <Suspense fallback={null}>
        <StructuredDataSection release={release} />
      </Suspense>
    </>
  );
}

async function DownloadSection({ release }: { release: Promise<Release> }) {
  return <Download release={await release} />;
}

async function StructuredDataSection({ release }: { release: Promise<Release> }) {
  return <StructuredData release={await release} />;
}

/**
 * Occupies the same box as the real section so the page does not jump when the
 * release resolves, and is hidden from assistive tech because the real content
 * replaces it in the same slot.
 */
function DownloadFallback() {
  return (
    <section className="section bg-surface-container-lowest" aria-hidden="true">
      <div className="shell">
        <div className="h-[42rem] w-full animate-pulse rounded-xl border border-outline-variant bg-surface-container-low" />
      </div>
    </section>
  );
}
