import Image from "next/image";
import { Suspense, type ReactNode } from "react";
import { whatsNew } from "@/content/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { FloatingNavDemo } from "@/components/FloatingNavDemo";
import { BeforeAfter } from "@/components/BeforeAfter";
import { ChangelogTeaser } from "@/components/ChangelogTeaser";
import { MockBalance, MockProgress, MockRow, MockScreen, MockStatusBar } from "@/components/mocks/primitives";
import { MockOldNavBar } from "@/components/mocks/OldNavBar";

const ICONS: Record<string, ReactNode> = {
  nav: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="17" width="18" height="4" rx="2" />
      <circle cx="7.5" cy="19" r="1.1" fill="currentColor" />
      <path d="M12 12h4a5 5 0 0 1 5 5" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11 12 4l8 7v9H4z" />
      <path d="M10 20v-5h4v5" />
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
      <circle cx="12" cy="12" r="0.5" fill="currentColor" />
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
  type: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 6V4h14v2M12 4v16M9 20h6" />
    </svg>
  ),
  update: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v5h-5" />
      <path d="m9.5 12 2 2 4-4" />
    </svg>
  ),
};

/**
 * Real captures, keyed by the tile `id` that asks for them. Descriptions come from
 * the screen each was captured from, not from the pixels, so they stay true when
 * the sample data in the capture is refreshed.
 */
const CAPTURES: Record<string, { src: string; alt: string }> = {
  home: {
    src: "/screenshots/home.jpg",
    alt: "The home screen: one large balance, income and expense as two pills, and a week recap",
  },
  reports: {
    src: "/screenshots/report.jpg",
    alt: "The reports screen: a Week, Month or Year switcher above a trend and a category breakdown",
  },
  budgets: {
    src: "/screenshots/budget.jpg",
    alt: "The budgets screen, with a rounded progress bar per category",
  },
  themes: {
    src: "/screenshots/settings_themes.jpg",
    alt: "The appearance screen, with palette swatches and a brightness switch",
  },
};

/**
 * One height for every tile's media area, and one width for every capture.
 *
 * Sized by height, not width, on purpose. The bento mixes 2- and 3-span columns,
 * so a capture sized to fill its column would be 22rem tall in one and 33rem in
 * the other — the tallest would set the row height and the rest would sit in dead
 * space. Pinning the height makes every capture the same size everywhere, and
 * `aspect-[9/16]` then derives the width, which keeps the phone proportions the
 * captures actually have instead of stretching them.
 */
const CAPTURE_BOX = "h-64 w-auto aspect-[9/16]";

/**
 * Span values as literal class names.
 *
 * The span comes from the content file, but the class cannot be interpolated —
 * Tailwind extracts whole class strings by scanning the source, so
 * `lg:col-span-${span}` is invisible to it and the rule would never be emitted.
 * Every possible span is therefore written out here, keyed by the number the
 * content uses.
 */
const SPAN_CLASS: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  6: "lg:col-span-6",
};

function Tile({
  span,
  icon,
  title,
  body,
  cta,
  href,
  demo,
  capture,
  note,
}: {
  span: number;
  icon: string;
  title: string;
  body: string;
  cta?: string;
  href?: string;
  demo?: string;
  capture?: string;
  note?: string;
}) {
  const shot = capture ? CAPTURES[capture] : undefined;
  const hasMedia = demo === "floating-nav" || Boolean(shot);

  return (
    <Card
      as="article"
      className={`flex flex-col gap-4 p-6 transition-colors hover:border-primary/40 sm:p-7 ${SPAN_CLASS[span] ?? SPAN_CLASS[2]}`}
    >
      {/*
        The bubble stacks above the heading rather than sitting beside it. Inline,
        a 40px circle next to a 20px title line hangs 20px below the text it
        labels and reads as a misaligned box; stacked, the heading gets the full
        column width, which matters most in the 2-span tiles. It also matches how
        Features and Privacy already lay theirs out, so one tile shape is used
        across all three bento sections.
      */}
      <span aria-hidden="true" className="icon-plate">
        <span className="size-5">{ICONS[icon]}</span>
      </span>

      <div>
        <h3 className="headline text-lg text-on-surface sm:text-xl">{title}</h3>
        <p className="lede mt-2 text-on-surface-variant">{body}</p>
        {href && cta ? (
          <a
            href={href}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
          >
            {cta}
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14m0 0-5-5m5 5-5 5" />
            </svg>
          </a>
        ) : null}
      </div>

      {/*
        `mt-auto` drops the media to the bottom of the card, so a tile with
        three lines of copy and one with two still start their media on the same
        line and the row's cards end level. The slot is the same height for the
        demo and the captures so nothing in a row is taller than its neighbour.
      */}
      {hasMedia ? (
        <div className="mt-auto flex h-64 items-end justify-center">
          {demo === "floating-nav" ? (
            <div className="size-full">
              <FloatingNavDemo />
            </div>
          ) : shot ? (
            <div className={`relative overflow-hidden rounded-xl bg-surface ring-1 ring-outline-variant ${CAPTURE_BOX}`}>
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 144px"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      ) : null}

      {note ? (
        <p className="mt-auto rounded-lg bg-surface-container px-4 py-3 text-sm text-on-surface-variant">
          {note}
        </p>
      ) : null}
    </Card>
  );
}

/**
 * The before/after comparison.
 *
 * The "before" side is a reconstruction, not a screenshot: the app repo has no
 * archived image of the pre-0.7 home screen, so the flat, edge-to-edge
 * navigation bar from `BottomNavigationBarTheme` is rebuilt in CSS and labelled
 * as such. Replace both panels with real captures once they exist.
 */
function NavigationComparison() {
  return (
    <div className="mt-14 sm:mt-20">
      <h3 className="headline text-2xl text-on-surface sm:text-3xl">Before and after, side by side</h3>
      <p className="lede mt-3 max-w-2xl text-on-surface-variant">
        Drag the handle — or focus it and use the arrow keys. The left panel is the bar Walt
        shipped before 0.7, redrawn in CSS from the old theme; the right panel is the floating pill
        navigation in 0.7 and later.
      </p>
      <div className="mt-7 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <BeforeAfter
          beforeLabel="Before · v0.5"
          afterLabel="After · v0.7+"
          caption="Navigation: attached and flat, then detached and floating."
          before={
            <MockScreen nav="none" fab={false}>
              <MockStatusBar />
              <div className="px-4 pt-2">
                <p className="text-[0.6rem] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">
                  Balance
                </p>
                <p className="tabular text-xl font-extrabold text-on-surface">2,480.50</p>
              </div>
              <div className="mt-3 flex flex-col gap-1.5 px-3">
                {[0, 1, 2, 3, 4].map((index) => (
                  <div key={index} className="flex items-center gap-2 rounded-md bg-surface-container px-2.5 py-2">
                    <span aria-hidden="true" className="size-5 rounded bg-secondary-container" />
                    <span className="h-2 flex-1 rounded-pill bg-surface-container-highest" />
                    <span aria-hidden="true" className="h-2 w-8 rounded-pill bg-surface-container-highest" />
                  </div>
                ))}
              </div>
              <MockOldNavBar />
            </MockScreen>
          }
          after={
            <MockScreen nav="home">
              <MockBalance label="Balance" amount="2,480.50" income="+1,200.00" expense="−318.75" />
              <div className="mt-4 flex flex-col gap-2 px-3">
                <MockRow icon={<span className="size-2" />} title="Balance hero" subtitle="One focal number" amount="" first />
                <MockRow icon={<span className="size-2" />} title="Income & expense" subtitle="Tonal pills, not cards" />
                <MockRow icon={<span className="size-2" />} title="Week recap" subtitle="Tall selected-day pill" amount="" />
                <MockRow icon={<span className="size-2" />} title="Floating nav" subtitle="Detached, blurred, labelled" last />
              </div>
              <div className="px-3 pt-3">
                <MockProgress value={68} />
              </div>
            </MockScreen>
          }
        />
        <ul className="flex flex-col gap-4">
          {[
            "Detached from the screen edge by a 16dp margin, fully rounded, and blurred.",
            "The selected destination expands into a labelled pill instead of just tinting.",
            "The bar slides away while you scroll down and comes back on the way up.",
            "The FAB moved to a rounded square above the bar, and opens a staggered action menu.",
          ].map((point) => (
            <li key={point} className="flex gap-3 text-on-surface-variant">
              <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m5 12 5 5L20 7" />
              </svg>
              <span className="lede">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function WhatsNew() {
  return (
    <section id="whats-new" className="section bg-surface-container-lowest">
      <div className="shell">
        <SectionHeader
          eyebrow={whatsNew.eyebrow}
          title={whatsNew.title}
          lede={whatsNew.lede}
        />

        {/*
          `items-stretch` (the default) is what makes the bento work: cards in a
          row share the tallest one's height, and the media's `mt-auto` bottom-aligns
          inside that. `auto-rows-min` is not set, so a row is never taller than the
          tallest card in it.
        */}
        {/*
          Six columns at `lg`, with each tile's span coming from the content file
          so the rows sum to 6 by construction. `items-stretch` — the default, and
          left explicit because the bento depends on it — makes cards in a row
          share the tallest one's height, and the media's `mt-auto` then bottom-
          aligns inside that. No `auto-rows-*` is set, so a row is never taller
          than the tallest card in it.
        */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {whatsNew.tiles.map((tile) => (
            <Tile
              key={tile.id}
              span={tile.span}
              icon={tile.icon}
              title={tile.title}
              body={tile.body}
              cta={"cta" in tile ? tile.cta : undefined}
              href={"href" in tile ? tile.href : undefined}
              demo={"demo" in tile ? tile.demo : undefined}
              capture={"capture" in tile ? tile.capture : undefined}
              note={"note" in tile ? tile.note : undefined}
            />
          ))}
        </div>

        <NavigationComparison />

        {/* The tiles above are static; only the newest release needs the network,
            so only this piece waits. */}
        <Suspense fallback={<ChangelogFallback />}>
          <ChangelogTeaser />
        </Suspense>
      </div>
    </section>
  );
}

/** Same box as the real teaser, so nothing shifts when the release arrives. */
function ChangelogFallback() {
  return (
    <aside
      aria-hidden="true"
      className="mt-14 rounded-xl border border-outline-variant bg-surface-container-low p-6 sm:mt-20 sm:p-8"
    >
      <div className="h-10 w-64 animate-pulse rounded-lg bg-surface-container-high" />
      <div className="mt-6 flex flex-col gap-3 border-t border-outline-variant pt-6">
        <div className="h-4 w-full animate-pulse rounded-full bg-surface-container" />
        <div className="h-4 w-11/12 animate-pulse rounded-full bg-surface-container" />
        <div className="h-4 w-4/5 animate-pulse rounded-full bg-surface-container" />
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-surface-container" />
      </div>
    </aside>
  );
}
