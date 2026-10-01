import Image from "next/image";

/**
 * A real screenshot, presented as-is.
 *
 * The captures are 720×1280 edge-to-edge screen grabs: the real Android status bar
 * is already in the image, and the app draws no cutout of its own. Wrapping them
 * in a drawn bezel with a punch-hole camera and a gesture bar would put invented
 * hardware on top of a real screen — the status bar in the picture and the fake
 * one implied by the notch would disagree, and every capture would carry chrome
 * the device in the shot never had.
 *
 * So the screenshot *is* the phone. All this adds is the rounded display edge the
 * capture is clipped to, a hairline in the current palette's outline, and a soft
 * shadow to lift it off the page. The 9:16 ratio is the capture's own, kept as one
 * value so a different capture size is a single edit.
 */
export function Shot({
  src,
  alt,
  priority = false,
  decorative = false,
  className = "",
  sizes = "(max-width: 640px) 62vw, (max-width: 1024px) 34vw, (max-width: 1280px) 22vw, 280px",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  /** Hide from assistive tech, for a repeat of a screen described elsewhere. */
  decorative?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      aria-hidden={decorative ? true : undefined}
      className={`relative aspect-[9/16] overflow-hidden rounded-[1.75rem] bg-surface-container ring-1 ring-outline-variant/50 shadow-xl shadow-shadow/20 ${className}`}
    >
      <Image
        src={src}
        alt={decorative ? "" : alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
