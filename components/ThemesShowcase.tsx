"use client";

import { useState } from "react";
import { themes } from "@/content/site";
import { PALETTES, applyPalette, type BrightnessMode } from "@/lib/site-theme";
import { useSitePalette, useSiteTheme, useSystemPrefersDark } from "@/lib/use-site-theme";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { PillSwitcher } from "@/components/ui/PillSwitcher";

const BRIGHTNESS: Array<{ name: BrightnessMode; label: string; hint: string }> = [
  { name: "light", label: "Light", hint: "Standard surfaces" },
  { name: "dark", label: "Dark", hint: "Dark surfaces" },
  { name: "amoled", label: "AMOLED", hint: "Pure black, for OLED panels" },
];

/**
 * The interactive themes showcase.
 *
 * The mockup is real DOM styled from the same custom properties as the rest of
 * the page, wrapped in its own `data-palette` / `data-scheme` pair — so choosing
 * a swatch recolours it live, at full fidelity, with no second asset and no
 * image swap.
 *
 * Choosing a palette also recolours the site itself and is remembered in
 * `localStorage`. That is the honest way to demo a theming feature: if the
 * marketing site cannot do what the app does, it is not showing the app.
 */
export function ThemesShowcase() {
  /**
   * The palette is not local state: it *is* the site setting, read from the same
   * store the pre-paint script and the header toggle use. Choosing a swatch
   * writes that one value, and the mockup, the swatch ring and the rest of the
   * page all follow from it without a second source of truth to reconcile.
   */
  const palette = useSitePalette();

  /**
   * The preview's brightness is the showcase's own control — the app has an extra
   * AMOLED step the site itself does not have — but it starts on whatever the
   * site is already showing, so nobody lands on a light preview while looking at
   * a dark page.
   */
  const siteMode = useSiteTheme();
  const systemDark = useSystemPrefersDark();
  const [brightness, setBrightness] = useState<BrightnessMode>(
    siteMode === "system" ? (systemDark ? "dark" : "light") : siteMode,
  );

  const choose = (next: typeof palette) => applyPalette(next);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
      <div>
        <fieldset>
          <legend className="text-sm font-semibold text-on-surface">
            {themes.paletteLabel}
          </legend>

          <div className="mt-4 flex flex-wrap gap-3">
            {PALETTES.map((option) => {
              const active = option.name === palette;
              return (
                <button
                  key={option.name}
                  type="button"
                  onClick={() => choose(option.name)}
                  aria-pressed={active}
                  className="group flex flex-col items-center gap-2"
                >
                  <span
                    /* The swatch renders its own palette by carrying the
                       attributes locally — no inline hex, no duplicated tokens. */
                    data-palette={option.name}
                    data-scheme="light"
                    className={`relative grid size-12 place-items-center overflow-hidden rounded-pill transition-transform duration-200 ease-(--ease-spring) group-active:scale-90 ${
                      active ? "ring-2 ring-primary ring-offset-2 ring-offset-surface" : "ring-1 ring-outline-variant"
                    }`}
                  >
                    <span className="absolute inset-0 bg-[linear-gradient(135deg,var(--md-primary)_0%,var(--md-primary)_50%,var(--md-tertiary-container)_50%,var(--md-tertiary-container)_100%)]" />
                    {active ? (
                      <svg
                        viewBox="0 0 24 24"
                        className="relative size-5 text-on-primary drop-shadow-sm"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m5 12 5 5L20 7" />
                      </svg>
                    ) : null}
                  </span>
                  <span
                    className={`text-xs font-semibold ${active ? "text-primary" : "text-on-surface-variant"}`}
                  >
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-9">
          <p className="text-sm font-semibold text-on-surface">{themes.brightnessLabel}</p>
          <PillSwitcher
            className="mt-4 w-full max-w-xs"
            label={themes.brightnessLabel}
            items={BRIGHTNESS}
            value={brightness}
            onChange={setBrightness}
          />
        </div>

        <p className="lede mt-6 max-w-md text-sm text-on-surface-variant">{themes.note}</p>

        <p className="mt-4 text-sm text-on-surface-variant">
          The same nine palettes ship inside the app, in{" "}
          <span className="font-semibold text-on-surface">Settings → Preferences → Appearance</span>,
          next to a System / Light / Dark switch, an AMOLED toggle and a custom colour picker for
          any seed you like.
        </p>
      </div>

      <div className="flex justify-center">
        <div
          data-palette={palette}
          data-scheme={brightness}
          className="w-full max-w-[19rem] transition-[background-color] duration-300"
        >
          <PhoneFrame
            label={`A preview of Walt's home screen in the ${palette} palette, ${
              brightness === "amoled" ? "AMOLED dark" : brightness
            } mode`}
          >
            <ShowcaseScreen brightness={brightness} />
          </PhoneFrame>
        </div>
      </div>
    </div>
  );
}

/**
 * The preview screen. Built from the same primitives as the other mockups, at a
 * larger type scale than the tiny in-phone versions, because here it is the
 * subject rather than a decoration.
 */
function ShowcaseScreen({ brightness }: { brightness: BrightnessMode }) {
  return (
    <div className="relative flex size-full flex-col overflow-hidden bg-surface">
      <div className="flex items-center justify-between px-4 pt-3 pb-1 text-[0.65rem] font-semibold text-on-surface">
        <span className="tabular">9:41</span>
        {/* Drawn, not typed: Roboto Flex has no block-element glyphs, and a
            character the webfont cannot render falls back to the system face
            mid-line. `npm run font:check` fails the build if that creeps back. */}
        <span aria-hidden="true" className="flex items-center gap-1 opacity-75">
          <svg viewBox="0 0 16 12" className="h-2.5 w-4" fill="currentColor">
            <rect x="0" y="8" width="2.5" height="4" rx="0.5" />
            <rect x="4" y="5.5" width="2.5" height="6.5" rx="0.5" />
            <rect x="8" y="3" width="2.5" height="9" rx="0.5" />
            <rect x="12" y="0.5" width="2.5" height="11.5" rx="0.5" />
          </svg>
          <svg viewBox="0 0 26 12" className="h-2.5 w-5" fill="none">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" opacity="0.5" />
            <rect x="2" y="2" width="16" height="8" rx="1.6" fill="currentColor" />
            <path d="M23.5 4v4a2 2 0 0 0 0-4Z" fill="currentColor" opacity="0.5" />
          </svg>
        </span>
      </div>

      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-base font-bold tracking-tight text-on-surface">walt</span>
        <span
          aria-hidden="true"
          className="grid size-8 place-items-center rounded-pill bg-primary-container text-xs font-bold text-on-primary-container"
        >
          A
        </span>
      </div>

      <div className="px-4 pt-2">
        <p className="text-[0.62rem] font-semibold tracking-[0.14em] text-on-surface-variant uppercase">
          Balance
        </p>
        <p className="display tabular mt-1 text-[2.6rem] leading-none text-on-surface">
          2,480.50
          <span className="ms-1.5 align-super text-xs font-semibold tracking-normal text-on-surface-variant">
            USD
          </span>
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-income-container px-3 py-1.5 text-xs font-bold text-income">
            +1,200.00
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-expense-container px-3 py-1.5 text-xs font-bold text-expense">
            −318.75
          </span>
        </div>
      </div>

      <div className="mt-5 rounded-lg bg-surface-container-low px-3 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[0.62rem] font-bold tracking-[0.12em] text-primary uppercase">
            This week
          </span>
          <span className="rounded-pill bg-secondary-container px-2 py-0.5 text-[0.58rem] font-bold text-on-secondary-container">
            Fri · 78.40
          </span>
        </div>
        <div className="mt-3 flex h-20 items-end gap-1.5">
          {[30, 52, 22, 78, 44, 62, 34].map((value, index) => {
            const active = index === 3;
            return (
              <div key={index} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                <span
                  className={`tabular flex w-full items-center justify-center rounded-pill text-[0.5rem] font-bold ${
                    active ? "h-8 bg-primary text-on-primary" : "h-4 bg-primary/15 text-primary"
                  }`}
                >
                  {active ? `${value}` : ""}
                </span>
                <span
                  className={`w-full rounded-pill ${active ? "h-7 bg-primary" : "bg-primary/25"}`}
                  style={{ height: active ? undefined : `${Math.max(6, value / 2.2)}px` }}
                />
                <span
                  className={`text-[0.55rem] font-semibold ${active ? "text-primary" : "text-on-surface-variant"}`}
                >
                  {["M", "T", "W", "T", "F", "S", "S"][index]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 px-4">
        <div className="flex items-center justify-between text-[0.6rem] font-semibold text-on-surface-variant">
          <span>Food budget</span>
          <span className="tabular text-on-surface">82%</span>
        </div>
        <span className="mt-1.5 block h-2 w-full overflow-hidden rounded-pill bg-surface-container-highest">
          <span className="block h-full rounded-pill bg-warning" style={{ width: "82%" }} />
        </span>
      </div>

      <div className="mt-4 px-4">
        <ul className="flex flex-col gap-2">
          {[
            { label: "Flat white", meta: "Café · Today", amount: "−4.50", tone: "text-expense" },
            { label: "Salary", meta: "Work · Yesterday", amount: "+1,200.00", tone: "text-income" },
            { label: "Groceries", meta: "Food · Yesterday", amount: "−63.20", tone: "text-expense" },
          ].map((row) => (
            <li
              key={row.label}
              className="flex items-center gap-3 rounded-lg bg-surface-container-low px-3 py-2.5"
            >
              <span aria-hidden="true" className="size-7 shrink-0 rounded-md bg-secondary-container" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-semibold text-on-surface">{row.label}</span>
                <span className="block truncate text-[0.62rem] text-on-surface-variant">{row.meta}</span>
              </span>
              <span className={`tabular shrink-0 text-xs font-bold ${row.tone}`}>{row.amount}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 px-4 pb-5 pt-4">
        <span className="rounded-pill bg-surface-container/80 px-4 py-2.5 text-xs font-bold text-on-surface-variant ring-1 ring-outline-variant/70 backdrop-blur-md">
          Home
        </span>
        <span
          aria-hidden="true"
          className="size-10 shrink-0 rounded-lg bg-primary-container shadow-lg shadow-shadow/25"
        />
      </div>

      {brightness === "amoled" ? (
        <p className="sr-only">AMOLED mode replaces every surface with pure black.</p>
      ) : null}
    </div>
  );
}