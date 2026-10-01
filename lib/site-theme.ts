/**
 * Site theme state, kept deliberately tiny.
 *
 * Two settings, both stored in `localStorage` (no cookie, nothing leaves the
 * device): the page's brightness and the palette it draws with. They are
 * written straight onto `<html>` as `data-scheme` / `data-palette`, which is
 * exactly what `app/styles/palettes.css` keys off — so a change is one
 * attribute write and one repaint, with no React tree to re-render.
 *
 * Every access is wrapped: `localStorage` throws in private-mode Safari and in
 * some embedded webviews, and a marketing site must not break there.
 */

export const THEME_KEY = "walt:theme";
export const PALETTE_KEY = "walt:palette";

export type ThemeMode = "system" | "light" | "dark";
export type BrightnessMode = "light" | "dark" | "amoled";

export const PALETTES = [
  { name: "emerald", label: "Emerald" },
  { name: "ocean", label: "Ocean" },
  { name: "indigo", label: "Indigo" },
  { name: "violet", label: "Violet" },
  { name: "rose", label: "Rose" },
  { name: "amber", label: "Amber" },
  { name: "terracotta", label: "Terracotta" },
  { name: "teal", label: "Teal" },
  { name: "graphite", label: "Graphite" },
] as const;

export type PaletteName = (typeof PALETTES)[number]["name"];

export const THEME_EVENT = "walt:themechange";

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* Storage unavailable — the session still works, it just will not persist. */
  }
}

function isPalette(value: string | null): value is PaletteName {
  return PALETTES.some((palette) => palette.name === value);
}

/**
 * The browser-chrome colour that goes with each brightness, used to keep
 * `theme-color` in step with the toggle. Next renders the media-query form in
 * the markup; a single token here is the only one a manual toggle can own.
 */
const THEME_COLORS: Record<BrightnessMode, string> = {
  light: "#F7FBF8",
  dark: "#101413",
  amoled: "#000000",
};

function syncThemeColor(mode: ThemeMode): void {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]:not([media])');
  if (!meta) return;
  if (mode === "system") {
    // Hand the choice back to the OS-provided media-query values.
    delete meta.dataset.override;
    return;
  }
  meta.dataset.override = mode;
  meta.content = THEME_COLORS[mode];
}

export function applyTheme(mode: ThemeMode): void {
  const root = document.documentElement;
  if (mode === "system") {
    delete root.dataset.scheme;
  } else {
    root.dataset.scheme = mode;
  }
  write(THEME_KEY, mode);
  syncThemeColor(mode);
  window.dispatchEvent(new CustomEvent(THEME_EVENT));
}

export function applyPalette(name: PaletteName): void {
  document.documentElement.dataset.palette = name;
  write(PALETTE_KEY, name);
  window.dispatchEvent(new CustomEvent(THEME_EVENT));
}

export function currentTheme(): ThemeMode {
  const stored = read(THEME_KEY);
  return stored === "light" || stored === "dark" ? stored : "system";
}

export function currentPalette(): PaletteName {
  const stored = read(PALETTE_KEY);
  return isPalette(stored) ? stored : "emerald";
}

/**
 * Inlined into <head> so the stored palette is applied before first paint —
 * otherwise a visitor who chose Ocean sees a flash of Emerald.
 */
export const THEME_BOOTSTRAP = `(function(){try{
var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});
if(t==="light"||t==="dark"){document.documentElement.dataset.scheme=t}
var p=localStorage.getItem(${JSON.stringify(PALETTE_KEY)});
if(p){document.documentElement.dataset.palette=p}
}catch(e){}})();`;