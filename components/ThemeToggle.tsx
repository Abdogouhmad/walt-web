"use client";

import { applyTheme, type ThemeMode } from "@/lib/site-theme";
import { useSiteTheme } from "@/lib/use-site-theme";

const NEXT: Record<ThemeMode, ThemeMode> = {
  system: "light",
  light: "dark",
  dark: "system",
};

const LABEL: Record<ThemeMode, string> = {
  system: "Theme: follow the system setting",
  light: "Theme: light",
  dark: "Theme: dark",
};

/**
 * Cycles system → light → dark. A three-state control rather than a two-state
 * switch, because "follow my OS" has to be reachable again after you override
 * it — and because it matches the switch in the app's own Appearance screen.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  // The stored mode is read straight from local storage, so a choice made here
  // and one made in the themes showcase are the same value by construction.
  const mode = useSiteTheme();

  return (
    <button
      type="button"
      aria-label={LABEL[mode]}
      title={LABEL[mode]}
      onClick={() => applyTheme(NEXT[mode])}
      className={`grid size-10 place-items-center rounded-pill text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface active:rounded-lg ${className}`}
    >
      {mode === "light" ? (
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        ) : mode === "dark" ? (
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
          </svg>
        ) : (
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3a9 9 0 0 0 0 18Z" fill="currentColor" />
        </svg>
      )}
    </button>
  );
}