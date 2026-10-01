import { reports } from "@/content/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Chip } from "@/components/ui/Chip";
import { MockDonut, MockBars, MockSegmented } from "@/components/mocks/primitives";

const LEGEND = [
  { label: "Food & drink", value: 48, color: "var(--md-series-1)" },
  { label: "Transport", value: 27, color: "var(--md-series-2)" },
  { label: "Home", value: 15, color: "var(--md-series-3)" },
  { label: "Everything else", value: 10, color: "var(--md-series-4)" },
];

/**
 * The Reports spotlight.
 *
 * The chart panel is built from the same primitives as the phone mockups, so the
 * colours are the real scheme rather than an illustration of it, and it is
 * legible on a dark background where a screenshot of a light screen would be a
 * white slab.
 */
export function Reports() {
  return (
    <section id="reports" className="section bg-surface-container-lowest">
      <div className="shell">
        <SectionHeader eyebrow={reports.eyebrow} title={reports.title} lede={reports.lede} />

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          <div className="rounded-xl border border-outline-variant bg-surface-container-low p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">October</p>
              <MockSegmented options={["Week", "Month", "Year"]} selected={1} />
            </div>

            <div className="mt-7">
              <div className="mb-2 flex items-baseline gap-3">
                <p className="display tabular text-4xl text-on-surface">1,842.60</p>
                <span className="text-sm font-semibold text-on-surface-variant">spent this month</span>
              </div>
              <MockBars values={[44, 62, 30, 84, 52, 70, 40, 58, 34, 66, 48, 76]} highlight={6} />
              <div aria-hidden="true" className="mt-2 flex justify-between text-[0.7rem] text-on-surface-variant">
                {["1", "5", "9", "13", "17", "21", "25", "29"].map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-7 border-t border-outline-variant pt-7 sm:flex-row sm:items-center">
              <MockDonut total="1,842" caption="this month" />
              <ul className="flex w-full flex-col gap-3">
                {LEGEND.map((slice) => (
                  <li key={slice.label} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="size-3 shrink-0 rounded-pill"
                      style={{ background: slice.color }}
                    />
                    <span className="flex-1 text-sm text-on-surface-variant">{slice.label}</span>
                    <span className="tabular text-sm font-bold text-on-surface">{slice.value}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {reports.cards.map((card, index) => (
              <div
                key={card.title}
                className={`rounded-xl border border-outline-variant p-6 transition-colors hover:border-primary/40 ${
                  index === 0 ? "bg-surface-container" : "bg-surface-container-low"
                }`}
              >
                <h3 className="headline text-lg text-on-surface">{card.title}</h3>
                <p className="lede mt-2 text-on-surface-variant">{card.body}</p>
              </div>
            ))}

            <ul className="flex flex-wrap gap-2 pt-2">
              <Chip tone="primary">Week · Month · Year</Chip>
              <Chip tone="neutral">Tap a bar to inspect a day</Chip>
              <Chip tone="neutral">Total in the middle of the donut</Chip>
            </ul>

            <p className="lede pt-2 text-on-surface-variant">
              Nothing here needs a network connection. The aggregation runs on the phone, from the
              same local database every other screen reads.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}