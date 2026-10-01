"use client";

import { useState } from "react";

const DESTINATIONS = [
  { id: "home", label: "Home", path: "M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5" },
  { id: "activity", label: "Activity", path: "M4 7h16M4 12h16M4 17h10" },
  { id: "reports", label: "Reports", path: "M4 20V9m5 11V4m5 16v-7m5 7V7" },
  { id: "budget", label: "Budget", path: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4.5v9m-4-4.5h8" },
] as const;

type Destination = (typeof DESTINATIONS)[number]["id"];

const FEED = [
  { title: "Flat white", meta: "Café · Today", amount: "−4.50", tone: "text-expense" },
  { title: "Metro top-up", meta: "Transit · Today", amount: "−2.75", tone: "text-expense" },
  { title: "Salary", meta: "Work · Yesterday", amount: "+1,200.00", tone: "text-income" },
  { title: "Groceries", meta: "Food · Yesterday", amount: "−63.20", tone: "text-expense" },
  { title: "Bookshop", meta: "Shopping · 2 days ago", amount: "−18.00", tone: "text-expense" },
  { title: "Pharmacy", meta: "Health · 3 days ago", amount: "−22.40", tone: "text-expense" },
  { title: "Bus fare", meta: "Transit · 3 days ago", amount: "−2.40", tone: "text-expense" },
  { title: "Freelance", meta: "Work · 4 days ago", amount: "+320.00", tone: "text-income" },
  { title: "Coffee beans", meta: "Food · 4 days ago", amount: "−14.90", tone: "text-expense" },
  { title: "Electricity", meta: "Utilities · 5 days ago", amount: "−48.15", tone: "text-expense" },
  { title: "Cinema", meta: "Fun · 5 days ago", amount: "−16.00", tone: "text-expense" },
  { title: "Lunch", meta: "Food · 6 days ago", amount: "−11.30", tone: "text-expense" },
];

/**
 * A working replica of the app's floating navigation bar, built from the same
 * Material tokens as the real thing.
 *
 * The selected destination expands into a labelled pill using a `0fr -> 1fr`
 * `grid-template-columns` transition, which animates to the label's natural
 * width instead of guessing one. The bar floats over the panel, so the blur is
 * visibly blurring real content scrolling underneath it rather than sitting on a
 * static gradient.
 *
 * The panel fills whatever height it is given — the feed is `flex-1` rather than a
 * fixed `h-56` — because this sits in a bento tile whose height is set by the
 * capture beside it. A hardcoded height here is what made the two tiles in that row
 * end at different lines.
 */
export function FloatingNavDemo() {
  const [selected, setSelected] = useState<Destination>("home");

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest">
      <div className="surface-blur flex shrink-0 items-center gap-3 border-b border-outline-variant px-4 py-3">
        <span className="text-sm font-bold tracking-tight text-on-surface">Activity</span>
        <span className="rounded-pill bg-surface-container px-2 py-0.5 text-[0.65rem] font-semibold text-on-surface-variant">
          Search
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3" tabIndex={0} role="group" aria-label="Scrolling demo content">
        <ul className="flex flex-col gap-2">
          {FEED.map((entry) => (
            <li
              key={entry.title}
              className="flex items-center gap-3 rounded-lg bg-surface-container-low px-3 py-2.5"
            >
              <span aria-hidden="true" className="size-7 shrink-0 rounded-md bg-secondary-container" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-on-surface">{entry.title}</span>
                <span className="block truncate text-xs text-on-surface-variant">{entry.meta}</span>
              </span>
              <span className={`tabular shrink-0 text-sm font-bold ${entry.tone}`}>{entry.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-3">
        <div
          role="tablist"
          aria-label="Demo navigation destinations"
          className="pointer-events-auto flex w-full max-w-sm items-center gap-1 rounded-pill bg-surface-container/80 p-1.5 shadow-xl shadow-shadow/30 ring-1 ring-outline-variant/70 backdrop-blur-xl"
        >
          {DESTINATIONS.map((destination) => {
            const active = destination.id === selected;
            return (
              <button
                key={destination.id}
                type="button"
                role="tab"
                aria-selected={active}
                tabIndex={active ? 0 : -1}
                onClick={() => setSelected(destination.id)}
                className={`flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-pill px-2 transition-colors duration-200 ${
                  active
                    ? "bg-secondary-container text-on-secondary-container"
                    : "text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={active ? 2.5 : 2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d={destination.path} />
                </svg>
                <span
                  className={`grid transition-[grid-template-columns] duration-300 ease-(--ease-spring) ${
                    active ? "grid-cols-[1fr]" : "grid-cols-[0fr]"
                  }`}
                >
                  <span className="overflow-hidden text-sm font-bold whitespace-nowrap">
                    {destination.label}
                  </span>
                </span>
                <span className="sr-only">{active ? ", selected" : ""}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}