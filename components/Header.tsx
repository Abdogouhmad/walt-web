"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { WaltMark } from "@/components/ui/WaltMark";

/**
 * Sticky header.
 *
 * A translucent, blurred surface with a hairline `outline-variant` border —
 * and a pill outline on desktop once you scroll, so it reads as floating rather
 * than as a bar stuck to the top of the document.
 *
 * The mobile menu is a full-screen sheet with a real focus trap: it moves focus
 * in on open, cycles Tab within itself, and restores focus to the trigger on
 * close.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const panel = panelRef.current;
    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-300 ease-(--ease-emphasized) ${
        scrolled || open ? "surface-blur border-b border-outline-variant py-2.5" : "py-4"
      }`}
    >
      <nav
        aria-label="Main"
        className={`shell flex items-center justify-between gap-3 transition-[border-radius,padding] duration-300 ease-(--ease-spring) ${
          scrolled && !open
            ? "rounded-pill border border-outline-variant/70 py-1.5 ps-3 pe-2 shadow-lg shadow-shadow/10 md:mx-auto md:max-w-3xl"
            : ""
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5 rounded-pill" aria-label={`${site.name} — home`}>
          <WaltMark className="size-9" />
          <span className="text-xl font-extrabold tracking-tight text-on-surface">{site.name}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-pill px-3.5 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button href="#download" size="sm" className="hidden sm:inline-flex">
            Download
          </Button>
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-pill text-on-surface transition-colors hover:bg-surface-container active:rounded-lg md:hidden"
          >
            {open ? (
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="surface-blur animate-rise fixed inset-x-0 top-0 h-[100dvh] overflow-y-auto border-b border-outline-variant pt-24 md:hidden"
        >
          <div className="shell flex flex-col gap-2 pb-10">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                className="rounded-lg px-3 py-3.5 text-2xl font-bold tracking-tight text-on-surface transition-colors hover:bg-surface-container"
              >
                {item.label}
              </a>
            ))}
            <div className="rule my-4" />
            <Button href="#download" size="lg" onClick={close} className="w-full">
              Download the APK
            </Button>
            <Button href="/privacy" variant="tonal" size="lg" onClick={close} className="w-full">
              Read the privacy policy
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}