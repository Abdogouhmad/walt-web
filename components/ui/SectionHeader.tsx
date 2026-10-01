import type { ReactNode } from "react";

/**
 * The shared section opener: an optional eyebrow, the `h2`, and a lede capped
 * at a readable measure. Every anchored section on the page uses it, which is
 * what keeps the heading rhythm consistent.
 */
export function SectionHeader({
  eyebrow,
  title,
  lede,
  id,
  align = "start",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  id?: string;
  align?: "start" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold tracking-[0.16em] text-primary uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className="display text-[clamp(2rem,5.2vw,3.5rem)] text-on-surface">
        {title}
      </h2>
      {lede ? (
        <p className={`lede mt-5 text-lg text-on-surface-variant ${centered ? "mx-auto" : ""}`}>
          {lede}
        </p>
      ) : null}
    </div>
  );
}