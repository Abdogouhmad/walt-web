import { footer, site } from "@/content/site";
import { WaltMark } from "@/components/ui/WaltMark";

const YEAR_START = 2025;

export function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-lowest">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <a
              href="#top"
              className="inline-flex items-center gap-2.5 rounded-pill text-on-surface transition-opacity hover:opacity-80"
            >
              <WaltMark className="size-9" />
              <span className="headline text-xl">{site.name}</span>
            </a>
            <p className="lede mt-4 text-on-surface-variant">{footer.blurb}</p>
            <p className="mt-4 text-sm text-on-surface-variant">
              <a
                href={`mailto:${site.email}`}
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footer.columns.map((column) => (
              <nav key={column.title} aria-labelledby={`footer-${column.title}`}>
                <h2
                  id={`footer-${column.title}`}
                  className="text-sm font-bold tracking-[0.12em] text-on-surface uppercase"
                >
                  {column.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => {
                    const external = link.href.startsWith("http");
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                          className="inline-flex items-center gap-1.5 rounded-xs text-on-surface-variant underline-offset-4 transition-colors hover:text-primary hover:underline"
                        >
                          {link.label}
                          {external ? (
                            <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M14 5h5v5M19 5l-8 8M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                            </svg>
                          ) : null}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-outline-variant pt-8 text-sm text-on-surface-variant sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {YEAR_START}–{site.copyrightYear} {site.name}.{" "}
            <span className="font-semibold text-on-surface">{site.license}</span> licensed.
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>{footer.tagline}</span>
            <a
              href={site.repository}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-xs font-semibold text-on-surface underline-offset-4 hover:text-primary hover:underline"
            >
              Source
            </a>
            <a
              href={`${site.repository}/releases`}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-xs font-semibold text-on-surface underline-offset-4 hover:text-primary hover:underline"
            >
              Releases
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}