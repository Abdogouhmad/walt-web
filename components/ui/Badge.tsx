import type { ReactNode } from "react";

/**
 * A small tonal label. Used for "New · Material 3 Expressive", the recommended
 * APK marker and the live/fresh indicator in the Download section.
 */
export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: "neutral" | "primary" | "tertiary";
  className?: string;
}) {
  const tones = {
    neutral: "bg-surface-container text-on-surface-variant",
    primary: "bg-primary-container text-on-primary-container",
    tertiary: "bg-tertiary-container text-on-tertiary-container",
  } as const;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-semibold tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}