import { download, site } from "@/content/site";
import { formatBytes, formatReleaseDate, type Release } from "@/lib/release";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DownloadSelector } from "@/components/DownloadSelector";
import { Badge } from "@/components/ui/Badge";

/**
 * The download section.
 *
 * Every version number, size and link here comes from the release the app's own
 * pipeline published — nothing is hardcoded — so this section cannot point at a
 * superseded APK. When GitHub is unreachable the fallback data is used and says
 * so out loud, because a confidently wrong version number is worse than an
 * admitted one.
 */
export function Download({ release }: { release: Release }) {
  const date = formatReleaseDate(release.publishedAt);

  return (
    <section id="download" className="section bg-surface-container-lowest">
      <div className="shell">
        <SectionHeader eyebrow={download.eyebrow} title={download.title} lede={download.lede} />

        <div className="mt-12 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-low">
          <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone="primary">v{release.version}</Badge>
                {date ? (
                  <span className="text-sm text-on-surface-variant">Released {date}</span>
                ) : null}
                {release.stale ? (
                  <Badge tone="neutral">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-warning" />
                    Version details could not be verified just now
                  </Badge>
                ) : null}
              </div>

              <p className="lede mt-4 text-on-surface-variant">
                Walt ships as a signed APK from its GitHub releases. Pick the build that matches your
                device — if you are unsure, take the universal one.
              </p>

              <DownloadSelector assets={release.assets} />

              <p className="mt-5 text-sm text-on-surface-variant">{download.playNote}</p>

              <div className="mt-7">
                <h3 className="headline text-base text-on-surface">{download.installTitle}</h3>
                <ol className="mt-4 flex flex-col gap-3">
                  {download.steps.map((step, index) => (
                    <li key={step} className="flex gap-3 text-on-surface-variant">
                      <span
                        aria-hidden="true"
                        className="grid size-6 shrink-0 place-items-center rounded-pill bg-primary-container text-xs font-bold text-on-primary-container"
                      >
                        {index + 1}
                      </span>
                      <span className="lede">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-7">
                <h3 className="headline text-base text-on-surface">{download.permissionsTitle}</h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {download.permissions.map((permission) => (
                    <li key={permission} className="flex gap-3 text-sm text-on-surface-variant">
                      <svg viewBox="0 0 24 24" className="mt-1 size-3.5 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m5 12 5 5L20 7" />
                      </svg>
                      {permission}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="flex flex-col gap-4">
              <div className="rounded-lg bg-surface-container p-6">
                <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
                  Minimum requirements
                </p>
                <dl className="mt-4 flex flex-col gap-3 text-sm">
                  {[
                    ["Platform", "Android 5.0 (API 21) or newer"],
                    ["Storage", `${release.assets[0] ? formatBytes(release.assets[0].size) : "—"} for the universal build`],
                    ["Permissions", "Optional, asked for in context"],
                    ["Account", "None. There is nothing to sign up for."],
                    ["Licence", `${site.license}, source available`],
                  ].map(([term, description]) => (
                    <div key={term} className="flex items-baseline justify-between gap-4 border-b border-outline-variant pb-3 last:border-0 last:pb-0">
                      <dt className="text-on-surface-variant">{term}</dt>
                      <dd className="text-end font-semibold text-on-surface">{description}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-lg bg-surface-container p-6">
                <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
                  Verify the download
                </p>
                <p className="lede mt-3 text-sm text-on-surface-variant">
                  Every release publishes a <code className="rounded-xs bg-surface px-1.5 py-0.5 font-mono text-xs">checksums.txt</code>{" "}
                  next to the APKs. The release pipeline refuses to publish an unsigned APK, and
                  fails the build if the published file does not match its recorded checksum.
                </p>
                <a
                  href={release.htmlUrl}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                >
                  See the release
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 5h5v5M19 5l-8 8M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                  </svg>
                </a>
              </div>

              <div className="rounded-lg border border-outline-variant p-6">
                <p className="text-sm font-semibold tracking-[0.16em] text-on-surface-variant uppercase">
                  Google Play
                </p>
                <p className="mt-3 flex items-center gap-3">
                  <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface-container-high text-on-surface-variant">
                    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                      <path d="M4.5 2.8 15 12 4.5 21.2V2.8Z" opacity="0.9" />
                    </svg>
                  </span>
                  <span className="text-sm text-on-surface-variant">Not listed yet</span>
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}