#!/usr/bin/env node
/**
 * Build the site's webfont from the app's own copy of Roboto Flex.
 *
 * The app bundles the full 1.75 MB variable font because it can afford to; a
 * web page cannot. This produces a Latin subset with two live axes — `wght` and
 * `opsz` — and everything else pinned to its default, which is what keeps the
 * display type honest. `opsz` is the reason this is worth the trouble: without
 * it, `.display` and `.headline` could not ask for the optically-sized cut of
 * the face, and every heading would render at the 14pt default and look
 * slightly wrong without any obvious cause.
 *
 * The glyph set is derived from the site's own source rather than a
 * hand-maintained string. A hand-maintained list rots: someone adds a middle
 * dot or a minus sign to a mockup, the character is missing from the subset, and
 * the browser silently falls back to the system face *mid-word*. Reading the
 * copy is the only version of this that cannot happen quietly.
 *
 * Usage:
 *   node scripts/build-font.mjs [path/to/RobotoFlex.ttf]
 *
 * Defaults to the app's copy, since the app is the source of truth for brand
 * assets. The generated WOFF2 and the OFL licence are committed; this script
 * only needs re-running when the type itself or the site's copy changes.
 */

import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import subsetFont from "subset-font";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");

const DEFAULT_SOURCE = "/home/abdo/Desktop/walt/assets/fonts/RobotoFlex.ttf";
const SOURCE = resolve(process.argv[2] ?? process.env.WALT_FONT ?? DEFAULT_SOURCE);
const OUT_DIR = join(ROOT, "app", "fonts");
const OUT_FONT = join(OUT_DIR, "RobotoFlex.woff2");
const OUT_LICENCE = join(OUT_DIR, "OFL.txt");

/** Directories whose strings end up on screen. */
const SCAN_DIRS = ["app", "components", "content", "lib", "scripts"];
const SCAN_EXTENSIONS = new Set([".ts", ".tsx", ".css", ".md", ".mjs"]);

/**
 * Characters that must be present whether or not the current copy uses them:
 * the printable ASCII range, the Latin-1 letters, and the punctuation and
 * symbols an English finance app reaches for. Keeping this explicit means adding
 * a new section cannot silently drop a glyph.
 */
const SAFETY = [
  ...Array.from({ length: 95 }, (_, i) => String.fromCharCode(0x20 + i)), // ASCII printable
  " °±×÷",
  "£¥€₹₽",
  "©®™",
  "‐‑‒–—―",
  "‘’‚‛“”„′″",
  "•·…‰",
  "−⁄∕",
  "≤≥≠≈",
  "←↑→↓↔",
  "✓✔✕✖★☆",
  "§¶†‡",
  "←↑→↓⇒⇐⇔",
  "·•",
];

/** Files that carry no on-screen strings. */
const SKIP = new Set(["node_modules", ".next", ".git", ".turbo", "dist", "build"]);

async function collectSourceFiles(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry.name.startsWith(".") || SKIP.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await collectSourceFiles(full)));
    } else if (SCAN_EXTENSIONS.has(extname(entry.name))) {
      out.push(full);
    }
  }
  return out;
}

async function collectCharacters() {
  const files = [];
  for (const dir of SCAN_DIRS) {
    files.push(...(await collectSourceFiles(join(ROOT, dir))));
  }

  const characters = new Set(SAFETY);
  for (const file of files) {
    // Reading the raw source rather than parsing it is deliberate: a missed
    // character only ever *adds* a glyph, whereas a parser that missed a
    // template-literal interpolation would drop one.
    const source = await readFile(file, "utf8");
    for (const character of source) {
      const code = character.codePointAt(0);
      if (code === 0x0a || code === 0x09) continue;
      characters.add(character);
    }
  }

  // Control characters and lone surrogates would make HarfBuzz unhappy.
  return [...characters].filter((character) => {
    const code = character.codePointAt(0);
    return code > 0x1f && !(code >= 0x7f && code <= 0x9f);
  });
}

async function main() {
  if (!existsSync(SOURCE)) {
    console.error(
      `Source font not found:\n  ${SOURCE}\n\n` +
        `Point this at the app's bundled copy, e.g.\n` +
        `  node scripts/build-font.mjs /home/abdo/Desktop/walt/assets/fonts/RobotoFlex.ttf`,
    );
    process.exit(1);
  }

  const originalSize = (await stat(SOURCE)).size;
  const text = (await collectCharacters()).join("");

  const buffer = await subsetFont(await readFile(SOURCE), text, {
    targetFormat: "woff2",
    noHinting: true,
    dropTables: ["gasp"],
    variationAxes: {
      // The two axes the site actually uses. `opsz` drives the display cut,
      // `wght` every weight from 300 to 900.
      wght: { min: 300, max: 900 },
      opsz: { min: 8, max: 144 },
      // Everything below is pinned to its default, which drops a deluge of
      // unused `gvar` deltas — this is most of the difference between ~190 KB
      // and ~60 KB.
      GRAD: 0,
      wdth: 100,
      slnt: 0,
      XOPQ: 96,
      YOPQ: 79,
      XTRA: 468,
      YTUC: 712,
      YTLC: 514,
      YTAS: 750,
      YTDE: -203,
      YTFI: 738,
    },
  });

  await writeFile(OUT_FONT, buffer);

  const licence = join(dirname(SOURCE), "OFL.txt");
  if (existsSync(licence)) {
    await writeFile(OUT_LICENCE, await readFile(licence));
  }

  const pct = ((buffer.byteLength / originalSize) * 100).toFixed(1);
  console.log(`Roboto Flex  ${text.length} characters`);
  console.log(
    `  ${(originalSize / 1024).toFixed(0)} KB source → ${(buffer.byteLength / 1024).toFixed(1)} KB subset (${pct}%)`,
  );
  console.log(`  axes kept: wght 300–900, opsz 8–144`);
  console.log(`  wrote ${OUT_FONT.replace(ROOT + "/", "")}`);
}

await main();
