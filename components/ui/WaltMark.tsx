/**
 * The Walt launcher mark, redrawn from `assets/icon/walt_icon.svg` in the app
 * repo: a mint wallet on the deep emerald background from the icon.
 *
 * Inline SVG rather than an `<img>`: it inherits `currentColor` for the wallet
 * body so the mark can be tinted, and it costs no extra request.
 */
export function WaltMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1024 1024" className={className} aria-hidden="true" focusable="false">
      <rect width="1024" height="1024" rx="230" className="fill-[#0B3D2E]" />
      <circle cx="820" cy="180" r="420" fill="#0F5240" opacity="0.55" />
      <rect x="322" y="300" width="380" height="120" rx="48" fill="#B9F8E0" />
      <rect x="262" y="360" width="500" height="360" rx="88" fill="#7CF0C4" />
      <rect x="580" y="464" width="240" height="132" rx="66" fill="#0B3D2E" />
      <circle cx="646" cy="530" r="28" fill="#7CF0C4" />
    </svg>
  );
}

/** The X (formerly Twitter) glyph, which lucide does not carry. */
export function XMark({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function GitHubMark({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="currentColor">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.47.11-3.05 0 0 .98-.31 3.16 1.18a10.9 10.9 0 0 1 5.75 0c2.19-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.75.11 3.05.75.81 1.2 1.84 1.2 3.1 0 4.43-2.69 5.4-5.26 5.69.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5" />
    </svg>
  );
}

export function MailMark({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}