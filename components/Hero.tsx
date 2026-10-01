import { hero } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Shot } from "@/components/ui/Shot";

const TRUST_ICONS = {
  "Open source (MIT)": "M8 7V3m8 4V3M4 11h16M6 5h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
  "No ads": "M5 11V7a7 7 0 0 1 14 0v4M5 11h14v5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-5Zm7 0v7",
  "No account": "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm7 8a7 7 0 0 0-14 0",
  "Works offline": "M5 12.5a10 10 0 0 1 14 0M8 16a6 6 0 0 1 8 0M12 20h.01M3 9a14 14 0 0 1 18 0",
} as const;

/**
 * The hero.
 *
 * All three are real captures from the current release in `public/screenshots/`,
 * shown bare — no drawn bezel, notch or gesture bar. The captures are edge-to-edge
 * screen grabs, so the phone is already in the picture; a CSS frame on top would
 * only invent hardware the device never had.
 *
 * The two flanking shots are decorative repeats of screens that are captioned in
 * full further down, so they carry `aria-hidden` and an empty `alt`. A screen
 * reader should hear the hero once, then get each screen described once in the
 * carousel, not three near-identical announcements.
 *
 * Only the centre shot is `priority` — it is the largest contentful paint on the
 * page. The flanking pair stay lazy, since three hero images on one mobile
 * connection is the one place eager loading would genuinely cost bandwidth.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-36 lg:pt-44 lg:pb-24">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 h-[36rem] bg-primary/12 blur-[120px]"
      />
      <div className="shell">
        <div className="flex flex-col items-center gap-14 text-center lg:flex-row lg:items-center lg:gap-10 lg:text-start">
          <div className="max-w-xl flex-1">
            <Badge tone="primary">
              <span aria-hidden="true" className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
              </span>
              {hero.badge}
            </Badge>

            <h1 className="display mt-6 text-[clamp(2.75rem,8.5vw,4.75rem)] text-on-surface">
              {hero.headline.map((line, index) => (
                <span key={line} className="block">
                  {line}
                  {index === hero.headline.length - 1 ? (
                    <span className="text-primary">.</span>
                  ) : null}
                </span>
              ))}
            </h1>

            <p className="lede mx-auto mt-6 max-w-xl text-lg text-on-surface-variant lg:mx-0">
              {hero.subline}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button href="#download" size="lg">
                {hero.primaryCta}
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14" />
                </svg>
              </Button>
              <Button href="#whats-new" variant="outlined" size="lg">
                {hero.secondaryCta}
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14m0 0-6-6m6 6-6 6" />
                </svg>
              </Button>
            </div>

            <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-on-surface-variant lg:justify-start">
              {hero.trust.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={TRUST_ICONS[item as keyof typeof TRUST_ICONS] ?? "m5 12 5 5L20 7"} />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full max-w-md flex-1 lg:max-w-none">
            <div className="relative mx-auto flex w-full max-w-[26rem] items-center justify-center lg:max-w-[30rem]">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-pill bg-primary/18 blur-3xl"
              />
              <Shot
                src="/screenshots/report.jpg"
                alt=""
                decorative
                className="animate-float-slow z-30 w-[54%] shrink-0 translate-y-4 rotate-[-3deg]"
              />
              <Shot
                src="/screenshots/home.jpg"
                alt="Walt's home screen: the current balance in large type, income and expense as two tonal pills, a week recap, and recent transactions"
                priority
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 360px"
                className="z-20 mx-[-13%] w-[64%] shrink-0"
              />
              <Shot
                src="/screenshots/activities.jpg"
                alt=""
                decorative
                className="animate-float z-10 w-[54%] shrink-0 translate-y-8 rotate-[3deg]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}