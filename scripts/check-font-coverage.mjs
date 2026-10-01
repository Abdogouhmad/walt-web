#!/usr/bin/env node
/**
 * Verify that every character the site can render exists in the webfont.
 *
 * This exists because the failure it catches is invisible in review and obvious
 * to a visitor: a glyph the subset does not carry is silently replaced by the
 * system face, so a middle dot or a minus sign renders in a different typeface
 * in the middle of an otherwise consistent line. Nothing errors, nothing looks
 * broken, the type just looks slightly wrong.
 *
 * Reads the built WOFF2 directly — `wawoff2.decompress` turns it back into an
 * SFNT, so no font-parsing dependency is needed to walk the `cmap`.
 *
 * Usage: node scripts/check-font-coverage.mjs   (exit 1 on any gap)
 */

import { readFile, readdir } from "node:fs/promises";
import { join, dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { decompress } from "wawoff2";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const FONT = join(ROOT, "app", "fonts", "RobotoFlex.woff2");

const SCAN_DIRS = ["app", "components", "content", "lib"];
const SCAN_EXTENSIONS = new Set([".ts", ".tsx", ".css", ".mjs"]);
const SKIP = new Set(["node_modules", ".next", ".git", ".turbo"]);

/** Walks the SFNT table directory and returns the `cmap` table's bytes. */
function readCmap(sfnt) {
  const view = new DataView(sfnt.buffer, sfnt.byteOffset, sfnt.byteLength);
  const numTables = view.getUint16(4);
  for (let i = 0; i < numTables; i++) {
    const record = 12 + i * 16;
    const tag = String.fromCharCode(
      view.getUint8(record),
      view.getUint8(record + 1),
      view.getUint8(record + 2),
      view.getUint8(record + 3),
    );
    if (tag === "cmap") {
      const start = view.getUint32(record + 8);
      const length = view.getUint32(record + 12);
      return { view, start, length };
    }
  }
  throw new Error("no cmap table in font");
}

/** Every code point the font maps, from the best available subtable. */
function codePoints(sfnt) {
  const { view, start } = readCmap(sfnt);
  const numSubtables = view.getUint16(start + 2);
  let best = { format: 0, offset: start };

  for (let i = 0; i < numSubtables; i++) {
    const record = start + 4 + i * 8;
    const platform = view.getUint16(record);
    const offset = start + view.getUint32(record + 4);
    const format = view.getUint16(offset);
    // Prefer a Unicode full-repertoire subtable (format 12), then BMP (format 4).
    const unicode = platform === 3 || platform === 0;
    const score = format === 12 ? 3 : format === 4 ? 2 : unicode ? 1 : 0;
    if (unicode && score > best.format) best = { format: score, offset };
  }

  const points = new Set();
  if (best.format === 3) {
    const groups = view.getUint32(best.offset + 12);
    for (let g = 0; g < groups; g++) {
      const record = best.offset + 16 + g * 12;
      const first = view.getUint32(record);
      const last = view.getUint32(record + 4);
      for (let code = first; code <= last && code - first < 0x10000; code++) points.add(code);
    }
  } else {
    const segCountX2 = view.getUint16(best.offset + 6);
    const segCount = segCountX2 / 2;
    const endBase = best.offset + 14;
    const startBase = endBase + segCountX2 + 2;
    const deltaBase = startBase + segCountX2;
    const rangeBase = deltaBase + segCountX2;
    for (let s = 0; s < segCount; s++) {
      const end = view.getUint16(endBase + s * 2);
      const start = view.getUint16(startBase + s * 2);
      const rangeOffset = view.getUint16(rangeBase + s * 2);
      if (start === 0xffff) continue;
      for (let code = start; code <= end; code++) {
        let mapped;
        if (rangeOffset === 0) {
          mapped = (code + view.getInt16(deltaBase + s * 2)) & 0xffff;
        } else {
          const glyphIndexAddress = rangeBase + s * 2 + rangeOffset + (code - start) * 2;
          const glyph = view.getUint16(glyphIndexAddress);
          mapped = glyph === 0 ? 0 : (glyph + view.getInt16(deltaBase + s * 2)) & 0xffff;
        }
        if (mapped !== 0) points.add(code);
      }
    }
  }
  return points;
}

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
    if (entry.isDirectory()) out.push(...(await collectSourceFiles(full)));
    else if (SCAN_EXTENSIONS.has(extname(entry.name))) out.push(full);
  }
  return out;
}

const sfnt = Buffer.from(await decompress(await readFile(FONT)));
const covered = codePoints(sfnt);
const missing = new Map();

for (const dir of SCAN_DIRS) {
  for (const file of await collectSourceFiles(join(ROOT, dir))) {
    const source = await readFile(file, "utf8");
    const lines = source.split("\n");
    for (const [index, line] of lines.entries()) {
      for (const character of line) {
        const code = character.codePointAt(0);
        if (code < 0x80 || covered.has(code)) continue;
        if (!missing.has(character)) missing.set(character, []);
        missing.get(character).push(`${file.replace(ROOT + "/", "")}:${index + 1}`);
      }
    }
  }
}

if (missing.size === 0) {
  console.log(`webfont covers every character in ${SCAN_DIRS.join(", ")} (${covered.size} code points)`);
} else {
  console.error("These characters are in the site's source but not in the webfont.");
  console.error("They will render in the system fallback face, mid-line. Use an SVG icon instead:\n");
  for (const [character, locations] of [...missing].sort((a, b) => a[0].codePointAt(0) - b[0].codePointAt(0))) {
    console.error(
      `  U+${character.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}  ${JSON.stringify(character)}  x${locations.length}  ${locations.slice(0, 3).join(", ")}`,
    );
  }
  process.exit(1);
}
