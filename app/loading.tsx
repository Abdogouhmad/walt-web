import { WaltMark } from "@/components/ui/WaltMark";

/**
 * Route-level loading state.
 *
 * All twelve routes prerender, so this is what a visitor sees only on a slow
 * connection or a hard navigation — not on the first paint. It is shaped like the
 * hero rather than like a spinner on a blank page, so the transition into real
 * content does not shift the layout.
 */
export default function Loading() {
  return (
    <div className="grid min-h-[70dvh] place-items-center bg-surface px-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <WaltMark className="size-14 animate-pulse" />
        <p role="status" className="text-sm font-medium text-on-surface-variant">
          Loading Walt…
        </p>
      </div>
    </div>
  );
}
