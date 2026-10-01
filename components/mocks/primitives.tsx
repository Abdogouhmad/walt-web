import type { ReactNode } from "react";

/**
 * Building blocks for the in-browser phone mockups.
 *
 * These are real DOM elements styled from the same Material 3 custom properties
 * the rest of the site uses, not images. That is what lets the themes showcase
 * recolour a live mockup by setting `data-palette` on one wrapper, and it means
 * the mockups can never drift from the palette they advertise.
 */

/**
 * The status bar. No brightness prop: every mockup inherits `data-scheme` from
 * whatever wraps it, so the same component is correct on light, dark and AMOLED
 * without being told which one it is in.
 */
export function MockStatusBar() {
  return (
    <div className="flex items-center justify-between px-4 pt-2.5 pb-1 text-[0.55rem] font-semibold text-on-surface">
      <span className="tabular">9:41</span>
      <span aria-hidden="true" className="flex items-center gap-1 opacity-80">
        <svg viewBox="0 0 16 12" className="h-2.5 w-4" fill="currentColor">
          <rect x="0" y="8" width="2.5" height="4" rx="0.5" />
          <rect x="4" y="5.5" width="2.5" height="6.5" rx="0.5" />
          <rect x="8" y="3" width="2.5" height="9" rx="0.5" />
          <rect x="12" y="0.5" width="2.5" height="11.5" rx="0.5" />
        </svg>
        <svg viewBox="0 0 16 12" className="h-2.5 w-4" fill="currentColor">
          <path d="M8 11.2 6.1 9.1a2.8 2.8 0 0 1 3.8 0L8 11.2Zm0-4.6a5.9 5.9 0 0 0-4 1.6L2.4 6.6a8.1 8.1 0 0 1 11.2 0L12 8.2a5.9 5.9 0 0 0-4-1.6Zm0-4a9.9 9.9 0 0 0-6.8 2.7L0 3.3A11.7 11.7 0 0 1 8 0a11.7 11.7 0 0 1 8 3.3l-1.2 1.3A9.9 9.9 0 0 0 8 2.6Z" />
        </svg>
        <svg viewBox="0 0 26 12" className="h-2.5 w-5" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" opacity="0.5" />
          <rect x="2" y="2" width="16" height="8" rx="1.6" fill="currentColor" />
          <path d="M23.5 4v4a2 2 0 0 0 0-4Z" fill="currentColor" opacity="0.5" />
        </svg>
      </span>
    </div>
  );
}

export function MockAppBar({
  title,
  avatar = true,
}: {
  title: string;
  avatar?: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-3 py-2">
      <span className="text-[0.85rem] font-bold tracking-tight text-on-surface">{title}</span>
      <span
        aria-hidden="true"
        className="grid size-7 place-items-center rounded-pill bg-primary-container text-[0.6rem] font-bold text-on-primary-container"
      >
        {avatar ? "A" : null}
      </span>
    </div>
  );
}

export function MockScreen({
  children,
  nav = "home",
  fab = true,
  className = "",
}: {
  children: ReactNode;
  nav?: "home" | "activity" | "reports" | "budget" | "settings" | "none";
  fab?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative flex size-full flex-col overflow-hidden bg-surface ${className}`}>
      <MockStatusBar />
      <div className="flex-1 overflow-hidden pb-16">{children}</div>
      {fab ? <MockFab /> : null}
      {nav !== "none" ? <MockNavBar selected={nav} /> : null}
    </div>
  );
}

/** The rounded-square FAB, parked above the nav like it is in the app. */
export function MockFab() {
  return (
    <span
      aria-hidden="true"
      className="absolute right-3 bottom-[4.6rem] grid size-9 place-items-center rounded-lg bg-primary-container text-on-primary-container shadow-lg shadow-shadow/25"
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
    </span>
  );
}

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "activity", label: "Activity" },
  { id: "reports", label: "Reports" },
  { id: "budget", label: "Budget" },
  { id: "settings", label: "Settings" },
] as const;

const NAV_ICONS: Record<string, string> = {
  home: "M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5",
  activity: "M4 7h16M4 12h16M4 17h10",
  reports: "M4 20V9m5 11V4m5 16v-7m5 7V7",
  budget: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4.5v9m-4-4.5h8",
  settings: "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z M4 12h2m12 0h2M12 4v2m0 12v2",
};

export function MockNavBar({ selected = "home" }: { selected?: string }) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex justify-center px-3 pb-3">
      <div className="flex w-full items-center gap-0.5 rounded-pill bg-surface-container/85 p-1 shadow-lg shadow-shadow/30 ring-1 ring-outline-variant/60 backdrop-blur-md">
        {NAV_ITEMS.map((item) => {
          const active = item.id === selected;
          return (
            <span
              key={item.id}
              className={`flex flex-1 items-center justify-center gap-1 rounded-pill py-1.5 transition-colors ${
                active ? "bg-secondary-container text-on-secondary-container" : "text-on-surface-variant"
              }`}
            >
              <svg viewBox="0 0 24 24" className="size-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={active ? 2.4 : 1.9} strokeLinecap="round" strokeLinejoin="round">
                <path d={NAV_ICONS[item.id]} />
              </svg>
              <span className={`text-[0.52rem] font-bold whitespace-nowrap ${active ? "" : "hidden"}`}>
                {item.label}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/** The hero amount: big, tight, tabular, with the currency as a quiet suffix. */
export function MockBalance({
  label = "Balance",
  amount = "2,480.50",
  currency = "USD",
  income = "+1,200.00",
  expense = "−318.75",
}: {
  label?: string;
  amount?: string;
  currency?: string;
  income?: string;
  expense?: string;
}) {
  return (
    <div className="px-3">
      <p className="text-[0.58rem] font-semibold tracking-[0.12em] text-on-surface-variant uppercase">{label}</p>
      <p className="display tabular mt-0.5 text-[1.7rem] leading-none text-on-surface">
        {amount}
        <span className="ms-1 align-super text-[0.6rem] font-semibold tracking-normal text-on-surface-variant">{currency}</span>
      </p>
      <div className="mt-2.5 flex gap-1.5">
        <span className="inline-flex items-center gap-1 rounded-pill bg-income-container px-2 py-1 text-[0.58rem] font-bold text-income">
          <svg viewBox="0 0 24 24" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5m-6 6 6-6 6 6" />
          </svg>
          {income}
        </span>
        <span className="inline-flex items-center gap-1 rounded-pill bg-expense-container px-2 py-1 text-[0.58rem] font-bold text-expense">
          <svg viewBox="0 0 24 24" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14m6-6-6 6-6-6" />
          </svg>
          {expense}
        </span>
      </div>
    </div>
  );
}

/**
 * The week recap strip. The tapped day grows into a tall pill and shows its own
 * total — the interaction the redesign added.
 */
export function MockWeekRecap({
  days = ["M", "T", "W", "T", "F", "S", "S"],
  values = [18, 34, 12, 46, 28, 40, 22],
  selected = 3,
}: {
  days?: string[];
  values?: number[];
  selected?: number;
}) {
  const peak = Math.max(...values);
  return (
    <div className="flex h-16 items-end gap-1 px-3">
      {values.map((value, index) => {
        const active = index === selected;
        return (
          <div key={index} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
            <span
              className={`flex w-full items-center justify-center rounded-pill text-[0.45rem] font-bold tabular transition-all ${
                active
                  ? "h-7 bg-primary text-on-primary"
                  : "bg-primary/15 text-primary"
              }`}
            >
              {active ? `${Math.round(value * 1.4)}` : ""}
            </span>
            <span
              className={`w-full rounded-pill ${active ? "h-6" : "h-3"} ${active ? "bg-primary" : "bg-primary/25"}`}
              style={{ minHeight: active ? undefined : `${Math.max(6, (value / peak) * 18)}px` }}
            />
            <span className={`text-[0.5rem] font-semibold ${active ? "text-primary" : "text-on-surface-variant"}`}>
              {days[index]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function MockGroup({
  title,
  children,
  action,
}: {
  title?: string;
  children: ReactNode;
  action?: string;
}) {
  return (
    <section className="px-3">
      {title ? (
        <div className="mb-1.5 flex items-center justify-between px-1">
          <h4 className="text-[0.62rem] font-bold tracking-[0.1em] text-primary uppercase">{title}</h4>
          {action ? <span className="text-[0.55rem] font-semibold text-primary">{action}</span> : null}
        </div>
      ) : null}
      <div className="overflow-hidden rounded-lg bg-surface-container-low">{children}</div>
    </section>
  );
}

export function MockRow({
  icon,
  title,
  subtitle,
  amount,
  tone = "neutral",
  first = false,
  last = false,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  amount?: string;
  tone?: "neutral" | "income" | "expense" | "warning";
  first?: boolean;
  last?: boolean;
}) {
  const tones = {
    neutral: "bg-secondary-container text-on-secondary-container",
    income: "bg-income-container text-income",
    expense: "bg-expense-container text-expense",
    warning: "bg-warning-container text-warning",
  } as const;
  return (
    <div
      className={`flex items-center gap-2 px-2.5 py-2 ${first ? "rounded-t-lg" : ""} ${last ? "rounded-b-lg" : "border-b border-outline-variant/50"}`}
    >
      <span aria-hidden="true" className={`grid size-6 shrink-0 place-items-center rounded-md ${tones[tone]}`}>
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.66rem] font-semibold text-on-surface">{title}</span>
        {subtitle ? (
          <span className="block truncate text-[0.54rem] text-on-surface-variant">{subtitle}</span>
        ) : null}
      </span>
      {amount ? (
        <span
          className={`tabular shrink-0 text-[0.66rem] font-bold ${
            tone === "income" ? "text-income" : tone === "expense" ? "text-expense" : "text-on-surface"
          }`}
        >
          {amount}
        </span>
      ) : null}
    </div>
  );
}

export function MockProgress({
  value,
  tone = "primary",
  className = "",
}: {
  value: number;
  tone?: "primary" | "income" | "expense" | "warning";
  className?: string;
}) {
  const tones = {
    primary: "bg-primary",
    income: "bg-income",
    expense: "bg-expense",
    warning: "bg-warning",
  } as const;
  return (
    <span className={`block h-1.5 w-full overflow-hidden rounded-pill bg-surface-container-highest ${className}`}>
      <span className={`block h-full rounded-pill ${tones[tone]}`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </span>
  );
}

/** A static Week / Month / Year segmented pill, matching `SegmentedButton`. */
export function MockSegmented({
  options,
  selected = 0,
  className = "",
}: {
  options: string[];
  selected?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex rounded-pill bg-surface-container-high p-0.5 ${className}`}>
      {options.map((option, index) => (
        <span
          key={option}
          className={`rounded-pill px-2.5 py-1 text-[0.56rem] font-bold ${
            index === selected ? "bg-primary text-on-primary" : "text-on-surface-variant"
          }`}
        >
          {option}
        </span>
      ))}
    </span>
  );
}

/** A five-bar trend chart with rounded caps. */
export function MockBars({
  values = [38, 62, 30, 80, 54, 70, 44],
  highlight = 3,
}: {
  values?: number[];
  highlight?: number;
}) {
  return (
    <span className="flex h-20 items-end gap-1.5">
      {values.map((value, index) => (
        <span key={index} className="flex-1">
          <span
            className={`block w-full rounded-t-pill ${index === highlight ? "bg-primary" : "bg-primary/25"}`}
            style={{ height: `${value}%` }}
          />
        </span>
      ))}
    </span>
  );
}

/** A donut with the total in the middle — the Reports category chart. */
export function MockDonut({ total = "318.75", caption = "spent" }: { total?: string; caption?: string }) {
  return (
    <span className="relative grid size-28 place-items-center">
      <svg viewBox="0 0 42 42" className="size-full -rotate-90">
        <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--md-surface-container-highest)" strokeWidth="6" />
        <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--md-series-1)" strokeWidth="6" strokeLinecap="round" strokeDasharray="38 100" strokeDashoffset="25" />
        <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--md-series-2)" strokeWidth="6" strokeLinecap="round" strokeDasharray="22 100" strokeDashoffset="-13" />
        <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--md-series-3)" strokeWidth="6" strokeLinecap="round" strokeDasharray="14 100" strokeDashoffset="-35" />
      </svg>
      <span className="absolute inset-0 grid place-content-center text-center">
        <span className="tabular block text-[0.85rem] leading-none font-extrabold text-on-surface">{total}</span>
        <span className="mt-0.5 block text-[0.48rem] tracking-wide text-on-surface-variant uppercase">{caption}</span>
      </span>
    </span>
  );
}