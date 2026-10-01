"use client";

import { useState } from "react";

export type PillSwitcherItem<T extends string> = {
  name: T;
  label: string;
  hint?: string;
};

/**
 * Segmented pill switcher.
 *
 * A radio group rather than a row of buttons: arrow keys, screen-reader
 * announcement and form semantics all come from `role="radiogroup"`, and the
 * single roving `tabIndex` means Tab moves past the group instead of through it.
 * The selected pill is rendered as a real moving thumb — a layout-animated
 * absolutely-positioned element, not four independent background transitions,
 * which is what makes it feel like a Material 3 control.
 */
export function PillSwitcher<T extends string>({
  items,
  value,
  onChange,
  label,
  className = "",
}: {
  items: readonly PillSwitcherItem<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  className?: string;
}) {
  const [focused, setFocused] = useState<T | null>(null);
  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.name === value),
  );
  const thumbIndex = focused ? Math.max(0, items.findIndex((item) => item.name === focused)) : activeIndex;

  const move = (index: number) => {
    const next = items[(index + items.length) % items.length];
    setFocused(next.name);
    onChange(next.name);
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          move(thumbIndex + 1);
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          move(thumbIndex - 1);
        } else if (event.key === "Home") {
          event.preventDefault();
          move(0);
        } else if (event.key === "End") {
          event.preventDefault();
          move(items.length - 1);
        }
      }}
      className={`relative isolate flex rounded-pill bg-surface-container p-1 ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 z-0 rounded-pill bg-primary transition-transform duration-300 ease-(--ease-spring)"
        style={{
          width: `calc((100% - 0.5rem) / ${items.length})`,
          transform: `translateX(calc(${thumbIndex} * 100%))`,
        }}
      />
      {items.map((item) => {
        const active = item.name === value;
        return (
          <button
            key={item.name}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={item.name === value ? 0 : -1}
            title={item.hint}
            onClick={() => onChange(item.name)}
            onFocus={() => setFocused(item.name)}
            onBlur={() => setFocused(null)}
            className={`relative z-10 flex-1 rounded-pill px-4 py-2 text-sm font-bold transition-colors duration-200 active:rounded-sm ${
              active ? "text-on-primary" : "text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}