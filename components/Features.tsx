import type { ReactNode } from "react";
import { features } from "@/content/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

const ICONS: Record<string, ReactNode> = {
  fingerprint: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 11v3m0-6a3 3 0 0 1 3 3c0 2.5-.4 4.8-1.2 6.8M8.4 8.2A7 7 0 0 0 5 14c0 1.8-.3 3.5-.8 5.1M6 11.2a6 6 0 0 1 1.5-3.6" />
      <path d="M9 17.4c.4-1.3.6-2.7.6-4.1a2.4 2.4 0 0 1 4.8 0c0 1.6-.2 3.2-.7 4.7M16.6 12.8c0 1.4-.2 2.7-.6 4" />
      <rect x="3" y="3" width="18" height="18" rx="4" opacity="0.25" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a5 5 0 0 1 5 5v3h1a1 1 0 0 1 1 1v8H5v-8a1 1 0 0 1 1-1h1V8a5 5 0 0 1 5-5Zm-2 8h4" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V9m5 11V4m5 16v-7m5 7V7" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  palette: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a9 9 0 0 0 0 18c1.4 0 2-1 2-2s-.6-1.4-.6-2.2c0-.8.6-1.3 1.4-1.3H16a5 5 0 0 0 5-5c0-4-4-7.5-9-7.5Z" />
      <circle cx="8" cy="11" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16" cy="10" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  wallet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8a2 2 0 0 1 2-2h12v3" />
      <rect x="3" y="8" width="18" height="12" rx="2.5" />
      <circle cx="16.5" cy="14" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  ),
};

/**
 * Bento, not a grid of equals.
 *
 * Two tiles run wide to break the rhythm — the privacy tile is the product's
 * whole argument, so it gets the most space, and the themes tile points at the
 * interactive section that follows the news.
 */
const SPANS = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-6"];

/** The nine palette seeds, as chips. The live, recolourable versions of these
 * live in the themes showcase — this row is just a static index. */
const PALETTE_DOTS: Array<[string, string]> = [
  ["Emerald", "#1B9E77"],
  ["Ocean", "#1E88E5"],
  ["Indigo", "#5C6BC0"],
  ["Violet", "#8E5CD9"],
  ["Rose", "#E25577"],
  ["Amber", "#F0A020"],
  ["Terracotta", "#C8664A"],
  ["Teal", "#00897B"],
  ["Graphite", "#607D8B"],
];

export function Features() {
  return (
    <section id="features" className="section">
      <div className="shell">
        <SectionHeader eyebrow={features.eyebrow} title={features.title} lede={features.lede} />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {features.items.map((feature, index) => {
            const wide = index === features.items.length - 1;
            return (
              <Card
                as="article"
                key={feature.title}
                className={`flex flex-col gap-4 p-6 transition-colors hover:border-primary/40 sm:p-7 ${SPANS[index]}`}
              >
                <span aria-hidden="true" className="icon-plate">
                  <span className="size-5">{ICONS[feature.icon]}</span>
                </span>
                <div>
                  <h3 className="headline text-lg text-on-surface sm:text-xl">{feature.title}</h3>
                  <p className="lede mt-2 text-on-surface-variant">{feature.body}</p>
                </div>
                {wide ? (
                  <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-outline-variant pt-5">
                    {PALETTE_DOTS.map(([label, colour]) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1.5 rounded-pill bg-surface-container px-3 py-1 text-xs font-semibold text-on-surface-variant"
                      >
                        <span
                          aria-hidden="true"
                          className="size-2.5 rounded-pill"
                          style={{ background: colour }}
                        />
                        {label}
                      </span>
                    ))}
                    <a
                      href="#themes"
                      className="inline-flex items-center gap-1.5 rounded-pill bg-primary-container px-3 py-1 text-xs font-bold text-on-primary-container transition-colors hover:brightness-105"
                    >
                      Try them live
                      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14m0 0-5-5m5 5-5 5" />
                      </svg>
                    </a>
                  </div>
                ) : null}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}