import type { ReactNode } from "react";

/**
 * A phone drawn in CSS around live markup.
 *
 * Only for previews that cannot be a capture — currently the themes showcase,
 * which recolours with the palette and so has to be live DOM. Real screenshots go
 * through `Shot` instead: a capture is already an edge-to-edge screen grab with
 * the status bar in the picture, and putting a drawn notch and gesture bar on top
 * of one invents hardware the device never had.
 *
 * The 9:16 ratio is the captures' own, kept here so a live preview and a
 * screenshot line up when they appear side by side.
 */
export function PhoneFrame({
  children,
  className = "",
  label,
}: {
  children: ReactNode;
  className?: string;
  /** Accessible name. The frame holds no text of its own, so it needs one. */
  label?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/16] w-full overflow-hidden rounded-[1.75rem] bg-surface ring-1 ring-outline-variant/50 shadow-xl shadow-shadow/20 ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      {children}
    </div>
  );
}
