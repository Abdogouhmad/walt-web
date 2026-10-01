import { screenshots } from "@/content/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Shot } from "@/components/ui/Shot";

/**
 * Screenshot rail.
 *
 * Every image here is a real capture from the current release — no mockups, no
 * illustrations, and no drawn phone hardware around them. The captures are
 * edge-to-edge screen grabs with the real status bar in the picture, so the phone
 * is already there; a CSS bezel would only add a notch and gesture bar the device
 * never had.
 *
 * Alt text names the screen and the controls on it, taken from the Flutter screen
 * it was captured from rather than from the image, so the description stays true
 * of the screen even after the sample data in the capture changes.
 *
 * The carousel is CSS scroll-snap, not a carousel library: no JavaScript, native
 * momentum on touch, and it stays a plain list of images for keyboard and screen
 * reader users. The rail itself is focusable and labelled so the arrow keys
 * scroll it, which is the one affordance a scroll container needs.
 */
const SHOTS = [
  {
    src: "/screenshots/home.jpg",
    caption: "Home",
    alt: "Walt's home screen: the current balance in large type, income and expense as two tonal pills, a week recap, and recent transactions grouped by day",
  },
  {
    src: "/screenshots/activities.jpg",
    caption: "Activity",
    alt: "Walt's transaction list, with transactions grouped by date and each showing its category, note and amount",
  },
  {
    src: "/screenshots/add_tx.jpg",
    caption: "Add transaction",
    alt: "Walt's add-transaction screen: an expense or income toggle, a large amount field, a grid of categories, and a save button",
  },
  {
    src: "/screenshots/budget.jpg",
    caption: "Budgets",
    alt: "Walt's budgets screen: a monthly summary with one rounded progress bar per category",
  },
  {
    src: "/screenshots/report.jpg",
    caption: "Reports",
    alt: "Walt's reports screen: a Week, Month or Year switcher above a spending trend and a category breakdown",
  },
  {
    src: "/screenshots/settings_themes.jpg",
    caption: "Themes",
    alt: "Walt's appearance settings: a live theme preview card, a grid of palette swatches, a System, Light or Dark switch and an AMOLED option",
  },
  {
    src: "/screenshots/settings.jpg",
    caption: "Settings",
    alt: "Walt's settings screen, with security, data and profile options in a grouped list",
  },
  {
    src: "/screenshots/onboarding.jpg",
    caption: "Welcome",
    alt: "Walt's welcome screen: 'Your simple, secured, private and beautiful personal finance tracker'",
  },
  {
    src: "/screenshots/onboarding_next_1.jpg",
    caption: "Set up profile",
    alt: "Walt's profile setup step, asking for a name, a default currency, and whether to enable biometrics",
  },
  {
    src: "/screenshots/onboarding_next_2.jpg",
    caption: "Get started",
    alt: "The final onboarding step, ending with a Get Started button",
  },
];

export function ScreenshotRail() {
  return (
    <section id="screenshots" className="section bg-surface-container-lowest" aria-labelledby="screenshots-heading">
      <div className="shell">
        <SectionHeader
          id="screenshots-heading"
          eyebrow={screenshots.eyebrow}
          title={screenshots.title}
          lede={screenshots.lede}
        />
      </div>

      <div className="mt-12">
        <ul
          tabIndex={0}
          role="group"
          aria-label={`${screenshots.title} Scroll sideways, or use the left and right arrow keys.`}
          className="no-scrollbar scroll-rail flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1.25rem,calc((100vw-78rem)/2+2.5rem))] pb-4"
        >
          {SHOTS.map((shot) => (
            <li key={shot.src} className="w-[14rem] shrink-0 snap-center sm:w-[16.5rem]">
              <Shot src={shot.src} alt={shot.alt} sizes="(max-width: 640px) 56vw, 264px" />
              <p className="mt-3 text-center text-sm font-semibold text-on-surface-variant">
                {shot.caption}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}