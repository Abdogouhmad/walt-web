import { whatsNew } from "@/content/site";
import { formatReleaseDate, getLatestRelease } from "@/lib/release";
import { renderReleaseNotes } from "@/lib/markdown";

/**
 * The newest release's own notes.
 *
 * Rendered on the server from the GitHub release body — which the app's own
 * pipeline generates from `CHANGELOG.md` — so the marketing page cannot claim a
 * release that was never published, and cannot drift from the notes the user
 * sees inside the app.
 */
export async function ChangelogTeaser() {
  const release = await getLatestRelease();
  const notes = renderReleaseNotes(release.notes, 4);
  const date = formatReleaseDate(release.publishedAt);

  return (
    <aside className="mt-14 rounded-xl border border-outline-variant bg-surface-container-low p-6 sm:mt-20 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
            {whatsNew.changelog.title}
          </p>
          <h3 className="display mt-2 text-3xl text-on-surface sm:text-4xl">
            v{release.version}
            {date ? (
              <span className="ms-3 align-middle text-base font-semibold tracking-normal text-on-surface-variant">
                {date}
              </span>
            ) : null}
          </h3>
        </div>
        <a
          href={release.htmlUrl}
          className="inline-flex items-center gap-2 rounded-pill border border-outline-variant px-5 py-2.5 text-sm font-semibold text-on-surface transition-colors hover:bg-surface-container"
        >
          {whatsNew.changelog.cta}
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 5h5v5M19 5l-8 8M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
          </svg>
        </a>
      </div>

      {release.notes ? (
        <div className="mt-6 border-t border-outline-variant pt-6">{notes.nodes}</div>
      ) : (
        <p className="lede mt-6 border-t border-outline-variant pt-6 text-on-surface-variant">
          This release shipped without written notes. The full history is on the releases page.
        </p>
      )}
    </aside>
  );
}