import type { ReactNode } from "react";
import { privacy } from "@/content/site";
import { SectionHeader } from "@/components/ui/SectionHeader";

const ICONS: Record<string, ReactNode> = {
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="2.5" width="12" height="19" rx="3" />
      <path d="M10.5 18.5h3" />
    </svg>
  ),
  "user-off": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="7" r="3.5" />
      <path d="M4 20a7 7 0 0 1 9.5-6.5M16 19l5 5M21 19l-5 5" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 5 6v6c0 4.4 2.9 8.2 7 9 4.1-.8 7-4.6 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
};

export function Privacy() {
  return (
    <section id="privacy" className="section">
      <div className="shell">
        <SectionHeader eyebrow={privacy.eyebrow} title={privacy.title} lede={privacy.lede} />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {privacy.columns.map((column) => (
            <article key={column.title} className="rounded-xl border border-outline-variant bg-surface-container-low p-6 sm:p-7">
              <span aria-hidden="true" className="icon-plate">
                <span className="size-5">{ICONS[column.icon]}</span>
              </span>
              <h3 className="headline mt-5 text-lg text-on-surface sm:text-xl">{column.title}</h3>
              <p className="lede mt-2 text-on-surface-variant">{column.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-xl bg-primary-container p-6 sm:p-10">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="display text-2xl text-on-primary-container sm:text-3xl">{privacy.collects.title}</p>
              <p className="lede mt-3 text-on-primary-container/85">{privacy.collects.body}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a
                href="/privacy"
                className="inline-flex items-center gap-2 rounded-pill bg-primary px-5 py-3 text-sm font-bold text-on-primary transition-[filter,border-radius] hover:brightness-110 active:rounded-lg"
              >
                {privacy.collects.linkLabel}
              </a>
              <a
                href="https://github.com/Abdogouhmad/walt"
                className="inline-flex items-center gap-2 rounded-pill border border-on-primary-container/40 px-5 py-3 text-sm font-bold text-on-primary-container transition-colors hover:bg-on-primary-container/10 active:rounded-lg"
              >
                {privacy.collects.sourceLabel}
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 5h5v5M19 5l-8 8M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}