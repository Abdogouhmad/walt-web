import Link from "next/link";
import type { HTMLAttributeAnchorTarget, HTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "filled" | "tonal" | "outlined" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  filled:
    "bg-primary text-on-primary shadow-sm shadow-primary/20 hover:brightness-[1.08] active:brightness-95",
  tonal:
    "bg-secondary-container text-on-secondary-container hover:brightness-[1.04] active:brightness-[0.97]",
  outlined:
    "border border-outline-variant text-on-surface hover:bg-surface-container active:bg-surface-container-high",
  ghost: "text-on-surface-variant hover:bg-surface-container active:bg-surface-container-high",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm gap-1.5",
  md: "h-12 px-5 text-[0.95rem] gap-2",
  lg: "h-14 px-7 text-base gap-2.5",
};

/**
 * The site's one button.
 *
 * Props are typed against `HTMLElement`, not against `<a>` or `<button>`, so
 * the same set — `onClick`, `aria-*`, `target`, `download` — is accepted
 * whichever element ends up being rendered, and the element is chosen by whether
 * `href` is present. Element-only props (`type`, `disabled`) are pulled out and
 * applied to the button branch alone, where they are actually valid.
 *
 * Fully rounded by default and morphing to a 20px radius while held down —
 * the same press affordance the app uses on its filled buttons, done in pure
 * CSS so no component has to become a client component to get it.
 */
type ButtonProps = Omit<HTMLAttributes<HTMLElement>, "className"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  children?: ReactNode;
  /** Only applied when the button is rendered as a `<button>`. */
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  /** Only applied when the button is rendered as a link. */
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  download?: boolean | string;
};

export function Button({
  variant = "filled",
  size = "md",
  href,
  className = "",
  children,
  type = "button",
  disabled,
  target,
  rel,
  download,
  ...rest
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center font-semibold",
    "rounded-pill active:rounded-lg",
    "transition-[background-color,border-radius,filter,color] duration-200 ease-(--ease-spring)",
    "disabled:pointer-events-none disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a
          {...rest}
          href={href}
          className={classes}
          target={target ?? "_blank"}
          rel={rel ?? "noopener noreferrer"}
          {...(download !== undefined ? { download } : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        {...rest}
        href={href}
        className={classes}
        {...(target ? { target } : {})}
        {...(rel ? { rel } : {})}
        {...(download !== undefined ? { download } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button {...rest} type={type} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}