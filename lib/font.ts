import localFont from "next/font/local";

/**
 * The site's typeface: Roboto Flex, subsetted to the Latin range the copy
 * actually uses and bundled rather than fetched.
 *
 * The original is ~1.75 MB because it carries every optical and width axis; the
 * subset in `app/fonts` keeps the weight axis (300–900) and drops the rest,
 * landing around 56 KB. That is small enough to preload, so `display: "block"`
 * is safe: there is no swap flash, and the browser paints the real face on the
 * first frame instead of a fallback reflowing once the font arrives.
 *
 * `adjustFontFallback` is left at its default so the metric-adjusted fallback
 * still reserves the right space if the font is slow — a smaller, less jarring
 * layout shift than swapping in a different face.
 */
export const Font = localFont({
  src: [
    {
      path: "../app/fonts/RobotoFlex.woff2",
      weight: "300 900",
      style: "normal",
    },
  ],
  variable: "--font-walt",
  display: "block",
  preload: true,
  fallback: ["system-ui", "Segoe UI", "Roboto", "sans-serif"],
});
