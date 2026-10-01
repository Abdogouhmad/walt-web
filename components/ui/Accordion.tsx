import type { ReactNode } from "react";

/**
 * A plain `<details>` accordion — no JavaScript, no state, no hydration cost.
 *
 * Native disclosure is keyboard-operable, exposes its expanded state to
 * assistive technology, is searchable when `name` is used, and cannot get out
 * of sync with the DOM. The FAQ needs all four and none of them justify a
 * client component.
 */
export function Accordion({
  items,
  name,
}: {
  items: ReadonlyArray<{ q: string; a: ReactNode }>;
  /** Lets a visitor collapse an open answer by clicking its own summary. */
  name?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <details
          key={item.q}
          name={name}
          className="group rounded-lg border border-outline-variant bg-surface-container-low transition-colors open:bg-surface-container"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg px-5 py-4 text-start font-semibold text-on-surface hover:bg-surface-container/60">
            <span>{item.q}</span>
            <span
              aria-hidden="true"
              className="grid size-7 shrink-0 place-items-center rounded-pill bg-surface-container-high text-on-surface-variant transition-transform duration-200 ease-(--ease-spring) group-open:rotate-45"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <div className="px-5 pb-5 text-on-surface-variant lede">{item.a}</div>
        </details>
      ))}
    </div>
  );
}