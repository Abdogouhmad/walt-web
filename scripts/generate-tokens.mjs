/**
 * Generates `app/styles/palettes.css` from the same seeds the app ships.
 *
 * The app generates its `ColorScheme` at runtime with
 * `ColorScheme.fromSeed(..., dynamicSchemeVariant: tonalSpot)` (see
 * `lib/core/theme/app_theme.dart`), so the website has to run the identical
 * generator offline or the marketing site would be showing a palette the app
 * cannot produce. `@material/material-color-utilities` is the same HCT
 * implementation Flutter's `material_color_utilities` uses, so this is a
 * byte-for-byte match rather than an approximation.
 *
 * Run with: `bun run tokens`
 */

import {
  DynamicScheme,
  Hct,
  Variant,
  argbFromHex,
  hexFromArgb,
} from "@material/material-color-utilities";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import {
  contrastRatio,
  ensureContrast,
  harmonize,
  luminance,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  hexToRgb,
  withHue,
  withSaturation,
} from "./color-math.mjs";

/** Mirrors `WaltPalette` in `lib/core/theme/walt_palette.dart`. */
const PALETTES = [
  { name: "emerald", label: "Emerald", seed: "#1B9E77" },
  { name: "ocean", label: "Ocean", seed: "#1E88E5" },
  { name: "indigo", label: "Indigo", seed: "#5C6BC0" },
  { name: "violet", label: "Violet", seed: "#8E5CD9" },
  { name: "rose", label: "Rose", seed: "#E25577" },
  { name: "amber", label: "Amber", seed: "#F0A020" },
  { name: "terracotta", label: "Terracotta", seed: "#C8664A" },
  { name: "teal", label: "Teal", seed: "#00897B" },
  { name: "graphite", label: "Graphite", seed: "#607D8B" },
];

export const DEFAULT_PALETTE = "emerald";

/**
 * Material role -> CSS custom property. Kept as an explicit table (rather than
 * a loop over the scheme object) so the emitted CSS stays stable when the
 * upstream library adds new roles, and so unused roles never leak into the
 * cascade.
 */
const ROLES = [
  ["primary", "primary"],
  ["on-primary", "onPrimary"],
  ["primary-container", "primaryContainer"],
  ["on-primary-container", "onPrimaryContainer"],
  ["primary-fixed", "primaryFixed"],
  ["primary-fixed-dim", "primaryFixedDim"],
  ["on-primary-fixed", "onPrimaryFixed"],
  ["on-primary-fixed-variant", "onPrimaryFixedVariant"],
  ["secondary", "secondary"],
  ["on-secondary", "onSecondary"],
  ["secondary-container", "secondaryContainer"],
  ["on-secondary-container", "onSecondaryContainer"],
  ["tertiary", "tertiary"],
  ["on-tertiary", "onTertiary"],
  ["tertiary-container", "tertiaryContainer"],
  ["on-tertiary-container", "onTertiaryContainer"],
  ["error", "error"],
  ["on-error", "onError"],
  ["error-container", "errorContainer"],
  ["on-error-container", "onErrorContainer"],
  ["surface", "surface"],
  ["on-surface", "onSurface"],
  ["surface-variant", "surfaceVariant"],
  ["on-surface-variant", "onSurfaceVariant"],
  ["surface-dim", "surfaceDim"],
  ["surface-bright", "surfaceBright"],
  ["surface-container-lowest", "surfaceContainerLowest"],
  ["surface-container-low", "surfaceContainerLow"],
  ["surface-container", "surfaceContainer"],
  ["surface-container-high", "surfaceContainerHigh"],
  ["surface-container-highest", "surfaceContainerHighest"],
  ["inverse-surface", "inverseSurface"],
  ["inverse-on-surface", "inverseOnSurface"],
  ["inverse-primary", "inversePrimary"],
  ["outline", "outline"],
  ["outline-variant", "outlineVariant"],
  ["shadow", "shadow"],
  ["scrim", "scrim"],
  ["surface-tint", "surfaceTint"],
];

/** Mirrors `WaltColors` in `lib/core/theme/walt_colors.dart`. */
const SEMANTIC = [
  ["income", "income", 145, 0.12],
  ["expense", "expense", 15, 0.12],
  ["warning", "warning", 45, 0.25],
];

function scheme(seed, isDark) {
  return new DynamicScheme({
    sourceColorHct: Hct.fromInt(argbFromHex(seed)),
    variant: Variant.TONAL_SPOT,
    contrastLevel: 0,
    isDark,
  });
}

function semanticAccent(primary, hue, background, harmonizeAmount) {
  const base = rgbToHex(hslToRgb([hue, 0.62, 0.32]));
  const rehued = withHue(harmonize(base, primary, harmonizeAmount), hue);
  return ensureContrast(rehued, background);
}

function semanticContainer(primary, hue, background) {
  const base = rgbToHex(hslToRgb([hue, 0.62, 0.5]));
  const harmonized = harmonize(base, primary, 0.12);
  const [h, s] = rgbToHsl(hexToRgb(withHue(harmonized, hue)));
  const onLight = rgbToHex(hslToRgb([h, s, luminance(background) > 0.5 ? 0.9 : 0.28]));
  return withSaturation(onLight, s * 0.55);
}

function paletteVariables(seed, isDark) {
  const s = scheme(seed, isDark);
  const lines = [];
  for (const [prop, role] of ROLES) {
    lines.push([prop, hexFromArgb(s[role])]);
  }

  const primary = hexFromArgb(s.primary);
  const surfaceContainer = hexFromArgb(s.surfaceContainer);
  const accepted = [];
  for (const [prop, hue, amount] of SEMANTIC) {
    const accent = semanticAccent(primary, hue, surfaceContainer, amount);
    accepted.push(accent);
    lines.push([prop, accent]);
    lines.push([`${prop}-container`, semanticContainer(primary, hue, surfaceContainer)]);
  }

  return lines;
}

function block(selectors, lines, indent = "") {
  const body = lines.map(([prop, value]) => `${indent}  --md-${prop}: ${value};`).join("\n");
  return `${selectors} {\n${body}\n}`;
}

/** Pure-black surfaces for OLED panels — the app's AMOLED mode. */
const AMOLED_SURFACES = [
  ["surface", "#000000"],
  ["surface-dim", "#000000"],
  ["surface-bright", "#0a0a0a"],
  ["surface-container-lowest", "#000000"],
  ["surface-container-low", "#0a0a0a"],
  ["surface-container", "#111111"],
  ["surface-container-high", "#181818"],
  ["surface-container-highest", "#202020"],
];

const out = [];
out.push(`/* eslint-disable */
/**
 * DO NOT EDIT. Generated by \`bun run tokens\` (scripts/generate-tokens.mjs).
 *
 * Material 3 \`tonalSpot\` schemes for the nine palettes the Android app ships,
 * generated from the same seeds and the same algorithm the app runs at runtime,
 * plus the semantic money colours from \`WaltColors\`.
 *
 * Two attributes drive everything:
 *
 *   data-palette  one of the nine palette names. Required on any element whose
 *                 colours should not be inherited, so \`:root\` is included as a
 *                 fallback for a document with no attribute at all.
 *
 *   data-scheme   "light" | "dark" | "amoled". Absent means "follow the OS".
 *
 * Both may sit on <html> or on any nested element. That is what lets the themes
 * showcase recolour a single mockup without touching the rest of the page.
 *
 * The cascade is arranged so no combination can lose:
 *
 *   1. light values, selector [data-palette]                 (0,1,0)
 *   2. dark values inside prefers-color-scheme: dark,
 *      selector [data-palette]:not([data-scheme="light"])    (0,2,0)  \u2190 OS wins
 *   3. explicit dark, [data-palette][data-scheme="dark"]     (0,2,0)
 *   4. explicit AMOLED, [data-palette][data-scheme="amoled"] (0,2,0) \u2190 last
 */
`);

out.push("/* ---- Light (also the no-attribute fallback: Emerald is the default) ---- */");
out.push(block(":root,\n[data-palette=\"emerald\"]", paletteVariables(PALETTES[0].seed, false)));
for (const palette of PALETTES.slice(1)) {
  out.push(block(`[data-palette="${palette.name}"]`, paletteVariables(palette.seed, false)));
}

out.push("/* ---- Dark: what the operating system asks for ---- */");
out.push("@media (prefers-color-scheme: dark) {");
for (const palette of PALETTES) {
  out.push(
    block(`[data-palette="${palette.name}"]:not([data-scheme="light"])`, paletteVariables(palette.seed, true), "  "),
  );
}
out.push("}");

out.push("/* ---- Dark: asked for explicitly ---- */");
for (const palette of PALETTES) {
  out.push(block(`[data-palette="${palette.name}"][data-scheme="dark"]`, paletteVariables(palette.seed, true)));
}

out.push("/* ---- AMOLED: explicit, dark, and pure black ---- */");
for (const palette of PALETTES) {
  out.push(
    block(
      `[data-palette="${palette.name}"][data-scheme="amoled"]`,
      [...paletteVariables(palette.seed, true), ...AMOLED_SURFACES],
    ),
  );
}

out.push("/* ---- Chart series: derived from the scheme, never hardcoded ---- */");
out.push(
  block(":root", [
    ["series-1", "var(--md-primary)"],
    ["series-2", "var(--md-secondary)"],
    ["series-3", "var(--md-tertiary)"],
    ["series-4", "var(--md-primary-container)"],
    ["series-5", "var(--md-tertiary-container)"],
  ]),
);

const target = fileURLToPath(new URL("../app/styles/palettes.css", import.meta.url));
await writeFile(target, `${out.join("\n")}\n`, "utf8");

/* ---- Verify, loudly, rather than discovering a contrast failure on a phone. ---- */
let failures = 0;
function check(label, fg, bg, min) {
  const ratio = contrastRatio(fg, bg);
  if (ratio < min) {
    failures += 1;
    console.error(`  FAIL ${label}: ${fg} on ${bg} = ${ratio.toFixed(2)}:1 (needs ${min})`);
  }
}

for (const palette of PALETTES) {
  for (const isDark of [false, true]) {
    const vars = Object.fromEntries(paletteVariables(palette.seed, isDark));
    const tag = `${palette.name}/${isDark ? "dark" : "light"}`;
    const pairs = [
      ["on-surface", "surface", 4.5],
      ["on-surface", "surface-container", 4.5],
      ["on-surface", "surface-container-high", 4.5],
      ["on-surface-variant", "surface", 4.5],
      ["on-surface-variant", "surface-container", 4.5],
      ["on-primary", "primary", 4.5],
      ["on-primary-container", "primary-container", 4.5],
      ["on-secondary-container", "secondary-container", 4.5],
      ["on-tertiary-container", "tertiary-container", 4.5],
      ["on-error", "error", 4.5],
      ["income", "surface-container", 4.5],
      ["expense", "surface-container", 4.5],
      ["warning", "surface-container", 4.5],
      ["outline", "surface", 3],
    ];
    for (const [fg, bg, min] of pairs) {
      check(`${tag} ${fg} on ${bg}`, vars[fg], vars[bg], min);
    }
  }
}

console.log(`Wrote ${target}`);
console.log(`Checked ${PALETTES.length * 2} scheme combinations (${PALETTES.length * 2 * 14} contrast pairs).`);
if (failures > 0) {
  console.error(`${failures} contrast check(s) failed.`);
  process.exit(1);
}
console.log("All contrast checks passed.");