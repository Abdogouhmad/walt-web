"use client";

import { useState } from "react";
import { formatBytes, type ApkAsset } from "@/lib/release";

/**
 * Device selector.
 *
 * The chosen asset lives in React state so the button can show that build's size
 * and label. Choosing it persists in the URL hash is deliberately *not* done:
 * a shared URL that silently upgrades someone's download is worse than one that
 * always goes to the latest release.
 */
export function DownloadSelector({ assets }: { assets: ApkAsset[] }) {
  const [selected, setSelected] = useState(assets[0]);
  const [copied, setCopied] = useState(false);

  if (assets.length === 0) {
    return (
      <p className="mt-7 rounded-lg border border-outline-variant p-5 text-on-surface-variant">
        The release list could not be loaded. The APK is always available from the{" "}
        <a href="https://github.com/Abdogouhmad/walt/releases" className="font-bold text-primary hover:underline">
          releases page
        </a>
        .
      </p>
    );
  }

  return (
    <div className="mt-7">
      <fieldset>
        <legend className="text-sm font-semibold text-on-surface">
          {assets.length === 1 ? "Download" : "Choose your device"}
        </legend>

        {assets.length > 1 ? (
          <div className="mt-3 flex flex-col gap-2">
            {assets.map((asset) => {
              const active = asset.id === selected.id;
              return (
                <button
                  key={asset.id}
                  type="button"
                  onClick={() => setSelected(asset)}
                  aria-pressed={active}
                  className={`flex w-full items-center gap-3 rounded-lg border p-3.5 text-start transition-colors ${
                    active
                      ? "border-primary bg-primary-container text-on-primary-container"
                      : "border-outline-variant text-on-surface hover:bg-surface-container"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`grid size-5 shrink-0 place-items-center rounded-pill border-2 ${
                      active ? "border-primary bg-primary" : "border-outline"
                    }`}
                  >
                    {active ? <span className="size-1.5 rounded-pill bg-on-primary" /> : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 text-sm font-bold">
                      {asset.label}
                      {asset.recommended ? (
                        <span className="rounded-pill bg-primary/15 px-2 py-0.5 text-[0.65rem] tracking-wide uppercase">
                          Works everywhere
                        </span>
                      ) : null}
                    </span>
                    <span className={`mt-0.5 block text-xs ${active ? "opacity-85" : "text-on-surface-variant"}`}>
                      {asset.description}
                    </span>
                  </span>
                  <span className="tabular shrink-0 text-xs font-semibold opacity-70">
                    {formatBytes(asset.size)}
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}

        <a
          href={selected.url}
          download
          className="mt-4 flex min-h-14 w-full items-center justify-center gap-2.5 rounded-pill bg-primary px-7 py-3.5 text-base font-bold text-on-primary shadow-sm shadow-primary/20 transition-[filter,border-radius] duration-200 ease-(--ease-spring) hover:brightness-110 active:rounded-lg"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14" />
          </svg>
          Download {selected.label} APK
          {selected.size ? (
            <span className="tabular text-sm font-semibold opacity-75">{formatBytes(selected.size)}</span>
          ) : null}
        </a>
      </fieldset>

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(selected.url);
              setCopied(true);
              window.setTimeout(() => setCopied(false), 2000);
            } catch {
              /* Clipboard blocked — the link is on screen and selectable anyway. */
            }
          }}
          className="inline-flex items-center gap-1.5 font-semibold text-on-surface-variant hover:text-on-surface"
        >
          {copied ? (
            <>
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m5 12 5 5L20 7" />
              </svg>
              Link copied
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 9a3 3 0 0 1 4 2.8c0 1.4-1 2-2 2.6M9 17.5h.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" />
              </svg>
              Copy the direct link
            </>
          )}
        </button>

        <a
          href="https://github.com/Abdogouhmad/walt/releases"
          className="inline-flex items-center gap-1.5 font-semibold text-on-surface-variant hover:text-on-surface"
        >
          All releases &amp; checksums
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M14 5h5v5M19 5l-8 8M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
          </svg>
        </a>
      </div>
    </div>
  );
}