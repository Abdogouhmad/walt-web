import type { ReactNode } from "react";

export type ChipTone = "neutral" | "primary" | "income" | "expense" | "warning" | "outline";

const TONES: Record<ChipTone, string> = {
  neutral: "bg-surface-container text-on-surface-variant",
  primary: "bg-primary-container text-on-primary-container",
  income: "bg-income-container text-income",
  expense: "bg-expense-container text-expense",
  warning: "bg-warning-container text-warning",
  outline: "border border-outline-variant text-on-surface-variant",
};

/**
 * A compact tonal label. `icon` is decorative; the caller supplies the
 * meaning, because these are `aria-hidden` — the surrounding sentence is what a
 * screen reader should hear.
 */
export function Chip({
  children,
  tone = "neutral",
  icon,
  className = "",
}: {
  children: ReactNode;
  tone?: ChipTone;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 text-sm font-medium ${TONES[tone]} ${className}`}
    >
      {icon ? (
        <span aria-hidden="true" className="inline-flex size-4 shrink-0 items-center justify-center">
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  );
}