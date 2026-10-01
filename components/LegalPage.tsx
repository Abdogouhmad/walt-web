import Link from "next/link";
import type { ReactNode } from "react";
import { legal, site } from "@/content/site";
import { Footer } from "@/components/Footer";
import { WaltMark } from "@/components/ui/WaltMark";

const ORDER = [
  { href: "/privacy", title: legal.privacy.title },
  { href: "/terms", title: legal.terms.title },
  { href: "/contact", title: legal.contact.title },
];

/**
 * Shared chrome for the three legal pages.
 *
 * They are plain prose, so they get a plain page: a reading measure, a table of
 * contents, the same header and footer as the landing page, and nothing else. No
 * marketing furniture.
 */
export function LegalPage({
  slug,
  title,
  lede,
  children,
}: {
  slug: "/privacy" | "/terms" | "/contact";
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <>
      <a href="#legal" className="skip-link">
        Skip to content
      </a>

      <SiteHeader />

      <main id="legal" className="shell py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Legal pages" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">{site.name}</p>
            <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {ORDER.map((item) => {
                const active = item.href === slug;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`inline-flex rounded-pill px-4 py-2 text-sm font-semibold transition-colors ${
                        active
                          ? "bg-primary-container text-on-primary-container"
                          : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-xs text-on-surface-variant">Last reviewed {legal.updated}.</p>
          </nav>

          <article className="min-w-0 max-w-2xl">
            <h1 className="display text-4xl text-on-surface sm:text-5xl">{title}</h1>
            <p className="lede mt-5 text-lg text-on-surface-variant">{lede}</p>
            <div className="mt-10 flex flex-col gap-8">{children}</div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}

export function Clause({
  heading,
  level = 2,
  children,
}: {
  heading: string;
  level?: 2 | 3;
  children: ReactNode;
}) {
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <section>
      <Tag
        className={
          level === 2
            ? "headline text-2xl text-on-surface"
            : "headline text-lg text-on-surface"
        }
      >
        {heading}
      </Tag>
      <div className="lede mt-3 flex flex-col gap-3 text-on-surface-variant">{children}</div>
    </section>
  );
}

export function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <svg
            viewBox="0 0 24 24"
            className="mt-1.5 size-4 shrink-0 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m5 12 5 5L20 7" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** The legal pages reuse the landing header so the site feels like one place. */
function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/70 surface-blur">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 rounded-pill text-on-surface transition-opacity hover:opacity-80"
        >
          <WaltMark className="size-8" />
          <span className="headline text-lg">{site.name}</span>
        </Link>
        <Link
          href="/"
          className="rounded-pill px-4 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
        >
          ← Back to the site
        </Link>
      </div>
    </header>
  );
}