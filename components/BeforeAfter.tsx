"use client";

import { useState, type ReactNode } from "react";

/**
 * Before / after comparison driven by a real `<input type="range">`.
 *
 * A range input is used rather than a custom pointer handler on purpose: it is
 * keyboard-operable for free (arrows, Home/End, PageUp/PageDown), it announces
 * its value, and it keeps working if the drag handler breaks. The slider is
 * transparent and stretched over the comparison; the handle drawn on top is
 * purely visual, so there is exactly one control and one focusable element.
 */
export function BeforeAfter({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  caption,
}: {
  before: ReactNode;
  after: ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
}) {
  const [position, setPosition] = useState(50);

  return (
    <figure className="m-0">
      <div className="relative overflow-hidden rounded-xl border border-outline-variant has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary">
        <div className="bg-surface-container-lowest p-3">{before}</div>

        <div
          className="absolute inset-0 bg-surface-container-lowest p-3"
          style={{ clipPath: `inset(0 0 0 ${position}%)` }}
          aria-hidden="true"
        >
          {after}
        </div>

        {/* Divider + handle */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-primary"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 left-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-pill bg-primary text-on-primary shadow-lg">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 7-4 5 4 5m6-10 4 5-4 5" />
            </svg>
          </span>
        </div>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-5 left-4 rounded-pill bg-surface-container/85 px-2.5 py-1 text-[0.7rem] font-bold text-on-surface-variant backdrop-blur-sm"
        >
          {beforeLabel}
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-5 right-4 rounded-pill bg-primary/90 px-2.5 py-1 text-[0.7rem] font-bold text-on-primary backdrop-blur-sm"
        >
          {afterLabel}
        </span>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={`Compare ${beforeLabel} with ${afterLabel}`}
          aria-valuetext={`${position}% ${afterLabel}`}
          className="absolute inset-0 size-full cursor-ew-resize appearance-none bg-transparent opacity-0"
        />
      </div>

      {caption ? (
        <figcaption className="mt-3 text-center text-sm text-on-surface-variant">{caption}</figcaption>
      ) : null}
    </figure>
  );
}