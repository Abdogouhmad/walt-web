"use client";

import { useSyncExternalStore } from "react";
import {
  THEME_EVENT,
  currentPalette,
  currentTheme,
  type PaletteName,
  type ThemeMode,
} from "./site-theme";

/**
 * The site's persisted settings, read as external stores.
 *
 * `localStorage` is an external store, not React state: it is written by the
 * pre-paint bootstrap script in the document head, by the header's theme toggle
 * and by the themes showcase, none of which go through this component. Reading it
 * through `useSyncExternalStore` — rather than copying it into `useState` inside
 * an effect — means there is no second render pass, no flash of the default value
 * after hydration, and no chance of two copies of the same setting disagreeing.
 *
 * The server snapshot is what the server rendered, so hydration is quiet; React
 * then swaps in the stored value on the next commit, which for this store is the
 * same attribute the visitor already has painted.
 */
function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener(THEME_EVENT, onStoreChange);
  // A second tab changing the theme should be reflected here too.
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(THEME_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

const SERVER_THEME: ThemeMode = "system";
const SERVER_PALETTE: PaletteName = "emerald";

export function useSiteTheme(): ThemeMode {
  return useSyncExternalStore(subscribe, currentTheme, () => SERVER_THEME);
}

export function useSitePalette(): PaletteName {
  return useSyncExternalStore(subscribe, currentPalette, () => SERVER_PALETTE);
}

/** The OS brightness, as a store, so a visitor flipping their system theme is
 * reflected in any control that offers to follow it. */
function subscribeToColourScheme(onChange: () => void): () => void {
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function systemPrefersDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function useSystemPrefersDark(): boolean {
  return useSyncExternalStore(subscribeToColourScheme, systemPrefersDark, () => false);
}
