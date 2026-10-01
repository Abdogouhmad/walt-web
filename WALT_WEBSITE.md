# Walt Website — M3 Expressive Update & Marketing Revamp

Site: https://waltapp.vercel.app/ — Next.js (App Router) + Tailwind CSS, deployed on Vercel.
App: **Walt**, privacy-first, local-first Android expense tracker (repo `Abdogouhmad/walt`).

Goal: reposition the site around the **new Material 3 Expressive redesign** while keeping privacy as the core promise, and make the page convert (download) better.

## Rules
1. Read the existing project first (`app/`, components, `tailwind.config`/CSS, `public/screenshots`). Keep the stack and deployment. Keep existing sections' working parts (download selector, screenshots, SEO meta).
2. TypeScript strict, server components by default, `"use client"` only for interactive pieces. Use `next/image`, `next/font`.
3. **No trackers, no third-party analytics, no cookies, no external font/CDN requests.** The site must match the app's privacy promise. (If analytics is wanted later, only a cookieless, self-hostable option, off by default.)
4. Only claim features that exist in the app. Before writing copy, check the app repo/README/CHANGELOG for what shipped. Avoid unprovable superlatives ("first", "best", "only"). Say "built on Material 3 Expressive".
5. Run `npm run lint`, `npm run build`, and fix all warnings. Lighthouse targets: Performance ≥ 95, Accessibility 100, SEO 100, Best Practices 100 (mobile).
6. Commit per phase: `feat(web): ...`.

---

## Phase 1 — Design system (mirror the app)

- Tailwind tokens as CSS variables (light + dark via `prefers-color-scheme` and a manual toggle), named after M3 roles: `--primary`, `--on-primary`, `--primary-container`, `--on-primary-container`, `--secondary-container`, `--surface`, `--surface-container`, `--surface-container-high`, `--on-surface`, `--on-surface-variant`, `--outline-variant`. Map them in Tailwind (`bg-surface`, `text-on-surface`, `bg-primary-container`, …).
- Default palette **Emerald** (seed `#1B9E77`, matches app icon: deep emerald `#0B3D2E` + mint `#7CF0C4`). Define the other app palettes as `[data-palette="ocean|indigo|violet|rose|amber|terracotta|teal|graphite"]` blocks (seeds: Ocean `#1E88E5`, Indigo `#5C6BC0`, Violet `#8E5CD9`, Rose `#E25577`, Amber `#F0A020`, Terracotta `#C8664A`, Teal `#00897B`, Graphite `#607D8B`). Generate tonal values with `@material/material-color-utilities` at build time or a small script; commit the generated CSS.
- Shape scale: 8 / 12 / 20 / 28 / full. Spacing 4-based. Type: a variable font via `next/font/local` (Roboto Flex, bundled), big expressive headings (w700–w800, tight tracking), calm body.
- Motion: CSS-only springs where possible (`linear()` easing or `cubic-bezier(.34,1.56,.64,1)`), short (≤ 400ms). Respect `prefers-reduced-motion`.
- Components (`components/ui/`): `Button` (filled, tonal, outlined; full-round; press morphs radius), `Chip`, `Card`, `PillSwitcher`, `SectionHeader`, `PhoneFrame`, `Badge`, `Accordion`. No nested cards, no heavy gradients, no mint-on-mint monotone.

## Phase 2 — Page structure (single page, anchored sections)

Order:
1. **Header** — sticky, blurred translucent surface (`backdrop-blur-xl`, `bg-surface/70`, 1px `outline-variant` border), floating pill style on desktop. Links: Features, What's new, Themes, Privacy, Download. Primary pill button "Download". Theme (light/dark) toggle. Mobile: full-screen menu with focus trap.
2. **Hero** — badge "New · Material 3 Expressive", headline, subline, two CTAs (Download APK, See what's new), trust row (Open source · No ads · No account · Works offline). Right side: 2–3 overlapping phone mockups (Home, Reports, Add) with subtle float animation. Copy ideas (edit freely):
   - H1: **"Your money. Your phone. Nobody else."**
   - Sub: "Walt is the expense tracker that never leaves your device. Now redesigned with Material 3 Expressive."
3. **What's new (the redesign)** — the key section, see Phase 3.
4. **Themes showcase** — interactive, see Phase 4.
5. **Features grid** — bento layout (mixed sizes, tonal cards): Biometric lock · Local AI insights · 100% local & private · Reports & PDF export · Budgets with alerts · 9 color themes + Dark/AMOLED · Local profile. Each with icon, one-line benefit. (Replace the old "Dark Mode" card with the themes card. Change "FaceID or Fingerprint" to "Fingerprint or face unlock" since it's Android.)
6. **Reports spotlight** — keep "Visualize. Analyze. Export." with the new Reports screen: Week/Month/Year pill switcher, bar chart, donut chart. Keep the AI-advice and PDF mini-cards as floating tonal chips.
7. **Privacy** — "Privacy isn't a feature. It's the architecture." 3 short columns: Data stays on device · No account, no cloud · No trackers. Add a simple "What Walt collects: nothing" statement and link to the full policy page. Keep it honest and verifiable (link to source code).
8. **Screenshots** — horizontally scrollable snap carousel of phone frames (Home, Activity, Budget, Reports, Themes, Settings) with captions; keyboard accessible.
9. **FAQ** — accordion (JSON-LD `FAQPage`): Is it free? Does it need internet? Where is my data stored? Can I export/backup? Will it be on Google Play? Why do I need to install an APK? Does it support Arabic/RTL? (only include answers that are true).
10. **Download** — keep the device selector (Universal / arm64-v8a / armeabi-v7a) and the Play Store "Coming soon" badge. Show current version + release date + file size fetched from the GitHub Releases API (see Phase 5). Add short install steps ("Download → open → allow install from this source").
11. **Footer** — logo, nav, GitHub / X as icon links with accessible labels (currently raw URLs are shown as text), Privacy Policy, Terms, Contact, "Built with privacy in mind. © 2026 Walt."

## Phase 3 — "What's new" section (the update story)

Title: **"A completely new look. Built on Material 3 Expressive."**

Layout: bento grid, each tile = one real design change with a screenshot/mini-demo:
- **Floating blur navigation** — a frosted floating pill nav with an expanding selected pill. Demo: a small interactive CSS/JS replica of the nav (4 icons, selected pill expands with label, spring animation, blurred background over scrolling content).
- **Expressive home** — big balance, income/expense pills, week recap with a tall selected-day pill.
- **Reports, reimagined** — Week/Month/Year pill switcher + bar and donut charts.
- **Smarter budgets** — progress bars and alerts at 80% and 100% (local notifications).
- **Your colors** — 9 themes + dark/AMOLED (links to Phase 4 section).
- **Better typography** — bigger, clearer type and consistent spacing.
- **Gentle updates** — "No forced updates. Walt tells you when a new version is available; you decide." (marketable privacy/control angle).

Also add a **Before / After** slider (drag handle) comparing the old and new Home screen (needs old + new screenshots; component `BeforeAfter` with `input type=range` for accessibility).

Add a compact **"v0.x changelog" teaser** pulling the latest release notes rendered from Markdown (server-side, see Phase 5) with a "Full changelog" link to GitHub releases.

## Phase 4 — Interactive themes showcase

- Section "Make it yours". A row of 9 palette swatches (same look as in-app) + Light/Dark/AMOLED switcher.
- Selecting a swatch sets `data-palette` on a **scoped wrapper** around a large phone mockup built in HTML/CSS (not an image) so it recolors live: balance card, pills, week recap, a chip, a progress bar. Optionally also recolor the whole site accent (persist choice in `localStorage`, no cookies; wrap in try/catch).
- Respect reduced motion; swatches are real buttons with `aria-pressed` and labels.

## Phase 5 — Data, SEO, performance

- **Latest release**: server fetch of `https://api.github.com/repos/Abdogouhmad/walt/releases/latest` with `next: { revalidate: 3600 }`. Derive version, date, notes, and asset URLs (universal, arm64-v8a, armeabi-v7a) by matching asset names. Fall back to a static config if the API fails or rate-limits. No hardcoded `v0.6.0` links anywhere.
- Add `app/sitemap.ts`, `app/robots.ts`, canonical URL, OG/Twitter images (regenerate `og` with the new design via `app/opengraph-image.tsx`, 1200×630), `manifest`, favicon/app icon set from the new Walt icon (emerald + mint wallet).
- JSON-LD: `SoftwareApplication` (operatingSystem Android, applicationCategory FinanceApplication, offers price 0, softwareVersion from release) and `FAQPage`.
- Update `<title>`/description to mention the redesign, e.g. "Walt — Private Expense Tracker for Android | Material 3 Expressive". Keywords: expense tracker android, offline budget app, private finance app, no ads expense tracker.
- Images: WebP/AVIF via `next/image`, explicit `width/height`, `priority` only on hero, lazy elsewhere. Screenshots exported at sensible sizes (not 3840 wide). Phone frames in CSS/SVG.
- i18n-ready structure (copy in a `content/` file); RTL-safe layout (logical Tailwind classes `ms-*`, `ps-*`, `text-start`) so Arabic/French can be added later.

## Phase 6 — Legal & trust pages (currently links go to `#`)

Create real pages: `/privacy`, `/terms`, `/contact` (mailto or GitHub issues link, no form backend). Privacy page must state plainly: no data collection, no analytics, data stored only on device, what permissions the app requests and why (biometrics, notifications, storage for export), how update checks work (only a request to GitHub releases, no identifiers). Verify these statements against the app's actual behavior before publishing.

## Phase 7 — Accessibility & QA

- Semantic landmarks, one `h1`, logical heading order, visible focus rings, skip link, ≥ 4.5:1 contrast in every palette and in dark mode, 48px touch targets, alt text on every screenshot.
- Test at 360px, 768px, 1280px, 1920px; Chrome, Firefox, Safari. Keyboard-only run-through. `prefers-reduced-motion` and `prefers-color-scheme` verified.
- Check `npm run build` output for bundle size; keep JS minimal (interactive bits as small client components).

## Assets to request / generate
- New screenshots (Home, Activity, Budget, Reports, Themes, Settings; light + dark) at 1080×2424, plus old Home for before/after. Place in `public/screenshots/` using clear names.
- App icon from `walt_icon.svg`, `foreground/background/monochrome` for favicon variants.
- If screenshots are not yet available, scaffold with CSS-built phone mockups and clearly marked placeholders.

## Definition of Done
- [ ] Redesigned sections in the order above, mobile-first, light/dark, M3 tokens
- [ ] "What's new" bento + floating-nav demo + before/after slider
- [ ] Interactive themes showcase recoloring a live mockup
- [ ] Download section driven by GitHub latest release (no hardcoded versions)
- [ ] Real `/privacy`, `/terms`, `/contact` pages; footer icons labeled
- [ ] SEO: metadata, OG image, sitemap, robots, JSON-LD (App + FAQ)
- [ ] No third-party trackers/fonts/CDNs; Lighthouse targets met
- [ ] `npm run lint` and `npm run build` clean; README updated
