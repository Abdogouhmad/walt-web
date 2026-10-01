import type { ReactNode } from "react";

/**
 * One flat surface. Deliberately the *only* container primitive in the kit, so
 * the "no nested cards" rule is enforced by the fact that a card has no header
 * slot to fill — you compose with `CardHeader` as a sibling, not a child.
 */
export function Card({
  children,
  as: Tag = "div",
  tone = "low",
  className = "",
}: {
  children: ReactNode;
  as?: "div" | "article" | "li" | "section";
  tone?: "low" | "container" | "high" | "primary";
  className?: string;
}) {
  const tones = {
    low: "bg-surface-container-low border-outline-variant",
    container: "bg-surface-container border-outline-variant",
    high: "bg-surface-container-high border-outline-variant",
    primary: "bg-primary-container border-transparent",
  } as const;

  return (
    <Tag className={`rounded-xl border ${tones[tone]} ${className}`}>{children}</Tag>
  );
}

/** Heading + supporting line for a card. A sibling of the card, never a child. */
export function CardHeader({
  title,
  lede,
  id,
  className = "",
}: {
  title: ReactNode;
  lede?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 id={id} className="headline text-lg text-on-surface sm:text-xl">
        {title}
      </h3>
      {lede ? <p className="lede mt-2 text-on-surface-variant">{lede}</p> : null}
    </div>
  );
}