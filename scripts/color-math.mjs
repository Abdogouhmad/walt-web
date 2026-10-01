/**
 * A faithful port of the app's `lib/core/theme/color_math.dart`.
 *
 * The website and the app have to agree on what "income" and "expense" look
 * like in every palette, otherwise the marketing copy is describing a product
 * that does not exist. Rather than re-deriving the maths differently here, this
 * mirrors the Dart implementation line for line (sRGB -> linear -> XYZ -> Lab,
 * HSL hue harmonisation, and the contrast-solving lightness ramp).
 */

const WHITE_POINT_D65 = [0.95047, 1.0, 1.08883];

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

function srgbToLinear(c) {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

export function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  return [
    parseInt(full.slice(0, 2), 16) / 255,
    parseInt(full.slice(2, 4), 16) / 255,
    parseInt(full.slice(4, 6), 16) / 255,
  ];
}

export function rgbToHex([r, g, b]) {
  const to = (v) =>
    Math.round(clamp01(v) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

/** WCAG 2.1 relative luminance. */
export function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(srgbToLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2.1 contrast ratio, 1..21. */
export function contrastRatio(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

export function rgbToHsl([r, g, b]) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return [0, 0, l];
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h * 360, s, l];
}

export function hslToRgb([h, s, l]) {
  const hn = (((h % 360) + 360) % 360) / 360;
  if (s === 0) return [l, l, l];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const channel = (t) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };
  return [channel(hn + 1 / 3), channel(hn), channel(hn - 1 / 3)];
}

/**
 * Rotates `color`'s hue a fraction of the way toward `target`'s hue, taking the
 * short way around the circle. Identical in spirit to `Color.harmonizeWith`,
 * which the Dart SDK does not expose.
 */
export function harmonize(color, target, amount) {
  if (amount <= 0) return color;
  const t = Math.min(1, amount);
  if (t >= 1) return target;
  const source = rgbToHsl(hexToRgb(color));
  const anchor = rgbToHsl(hexToRgb(target));
  let delta = anchor[0] - source[0];
  if (delta > 180) delta -= 360;
  else if (delta < -180) delta += 360;
  return rgbToHex(hslToRgb([source[0] + delta * t, source[1], source[2]]));
}

export function withHue(hex, hue) {
  const hsl = rgbToHsl(hexToRgb(hex));
  return rgbToHex(hslToRgb([hue, hsl[1], hsl[2]]));
}

export function withLightness(hex, lightness) {
  const hsl = rgbToHsl(hexToRgb(hex));
  return rgbToHex(hslToRgb([hsl[0], hsl[1], lightness]));
}

export function withSaturation(hex, saturation) {
  const hsl = rgbToHsl(hexToRgb(hex));
  return rgbToHex(hslToRgb([hsl[0], saturation, hsl[2]]));
}

/** Smallest CIE76 dE two generated series may sit apart. */
export const MIN_SEPARATION = 8;

function toLab(hex) {
  const [r, g, b] = hexToRgb(hex).map(srgbToLinear);
  const x = (0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / WHITE_POINT_D65[0];
  const y = 0.2126729 * r + 0.7151522 * g + 0.072175 * b;
  const z = (0.0193339 * r + 0.119192 * g + 0.9503041 * b) / WHITE_POINT_D65[2];
  const f = (t) => (t > 0.008856 ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116);
  const [fx, fy, fz] = [f(x), f(y), f(z)];
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

export function deltaE(a, b) {
  const [l1, a1, b1] = toLab(a);
  const [l2, a2, b2] = toLab(b);
  return Math.hypot(l1 - l2, a1 - a2, b1 - b2);
}

function score(candidate, background, avoid, minRatio) {
  const legibility = Math.min(2, contrastRatio(candidate, background) / minRatio);
  if (avoid.length === 0) return legibility;
  let closest = Infinity;
  for (const used of avoid) closest = Math.min(closest, deltaE(used, candidate));
  return legibility * Math.min(1, closest / MIN_SEPARATION);
}

/**
 * Lightens or darkens `color` until it clears `minRatio` against `background`
 * and is not a near-duplicate of anything in `avoid`.
 */
export function ensureContrast(color, background, { minRatio = 4.5, avoid = [] } = {}) {
  const usable = (candidate) => {
    if (contrastRatio(candidate, background) < minRatio) return false;
    return avoid.every((used) => deltaE(used, candidate) >= MIN_SEPARATION);
  };
  if (usable(color)) return color;

  const [hue, sat, light] = rgbToHsl(hexToRgb(color));
  const towardsDark = luminance(background) > 0.5;
  const ramp = [];
  for (let step = 1; step <= 8; step += 1) {
    ramp.push(towardsDark ? light - step * 0.09 : light + step * 0.09);
  }
  for (let step = 1; step <= 4; step += 1) {
    ramp.push(towardsDark ? light + step * 0.09 : light - step * 0.09);
  }

  let best;
  let bestScore = score(color, background, avoid, minRatio);
  for (const lightness of ramp) {
    if (lightness <= 0.02 || lightness >= 0.98) continue;
    const candidate = rgbToHex(hslToRgb([hue, sat, lightness]));
    if (usable(candidate)) return candidate;
    const s = score(candidate, background, avoid, minRatio);
    if (s > bestScore) {
      best = candidate;
      bestScore = s;
    }
  }
  return best ?? color;
}