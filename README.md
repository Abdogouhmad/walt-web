# Walt — marketing site

The marketing site for **Walt**, a privacy-first Android expense tracker. Static, no
trackers, no cookies, and no third-party requests of any kind.

## About Walt

Walt keeps everything on the device: a local SQLite database, no account, no cloud, no
sync. It tracks transactions, per-category budgets with alerts, and week/month/year
reports with PDF export, and it is themed with nine generated Material 3 palettes plus
light, dark and AMOLED modes.

The app is the source of truth for every claim on this site. Anything a screen does not
do is not described here.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, RSC, Turbopack) |
| Styling | Tailwind CSS 4 (CSS-first `@theme`) |
| Language | TypeScript, strict |
| Animation | CSS only — keyframes, transitions, scroll-snap. No animation library. |
| Icons | Hand-written inline SVG |
| Fonts | `next/font/local`, subsetted variable font, self-hosted |

The app source lives at `../walt`. Paths in this README are relative to the app repo.

## Commands

```bash
bun install
bun dev            # dev server
bun run build      # production build
bun run lint       # eslint
bun run font:check # verify the webfont covers every character the site renders
```

## How the theming works

The nine palettes are generated from seed colours using Material's own algorithm
(`@material/material-color-utilities`), producing an HCT tonal palette per palette per
brightness.

```bash
bun run tokens     # regenerates app/styles/palettes.css
```

That output is committed, so a plain `bun install && bun dev` needs no build step and
the token generator's own dependencies are not in the runtime graph. The generator also
runs a contrast pass over every on-surface/background pair and fails if any fall below
WCAG AA, which is why a palette cannot be committed that is merely attractive.

Two attributes on `<html>` drive everything:

- `data-scheme="light | dark | amoled"` — brightness
- `data-palette="emerald | ocean | indigo | …"` — palette

Both are mirrored on any wrapper, which is how the themes showcase recolours a live
mockup without a second copy of the tokens. The header toggle and the showcase write the
same `localStorage` keys (`walt:theme`, `walt:palette`), read through
`useSyncExternalStore` so there is one source of truth and no effect-driven state
mirroring. An inlined script in `<head>` applies the stored values before first paint.

## How releases work

`lib/release.ts` fetches the latest GitHub release at request time with
`revalidate: 3600`, matches assets to the visitor's architecture, and falls back to
verified static data if GitHub is unreachable — saying so on screen rather than serving
a confidently wrong version number. No version, size or checksum is hardcoded in a
component.

## Assets

- `public/icon/` — the app's launcher icon (SVG with embedded C2PA credentials, plus
  PNG layers).
- `public/screenshots/` — real captures from the current release, 720×1280.
- `app/fonts/` — subsetted Roboto Flex with `wght` 300–900 and `opsz` 8–144 live; all
  other axes pinned to their defaults. 61 KB, self-hosted, no CDN.

The font subset is derived from the site's own source text, so a glyph cannot silently
go missing. `bun run font:check` reads the built WOFF2's `cmap` and fails if any
character used in `app/`, `components/`, `content/` or `lib/` is not in the font — the
failure that otherwise shows up only as a single stray glyph rendered in the fallback
face mid-sentence. To rebuild it after changing the type or the copy:

```bash
node scripts/build-font.mjs /path/to/RobotoFlex.ttf
```

## Legal copy

`/privacy`, `/terms` and `/contact` are written to be checkable against the app source,
and the permission list in the privacy policy is the manifest's actual permission set —
including the ones declared for scheduled budget alerts rather than for a visible
feature. Two outbound requests are documented explicitly: the update check, and the
exchange-rate fetch that only happens if you convert currency.

If the app's behaviour changes, these pages are the first thing to update.
