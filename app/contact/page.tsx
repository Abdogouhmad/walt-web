import type { Metadata } from "next";
import { contactPage, legal, site } from "@/content/site";
import { Clause, LegalPage } from "@/components/LegalPage";
import { MailMark, GitHubMark, XMark } from "@/components/ui/WaltMark";

export const metadata: Metadata = {
  title: legal.contact.title,
  description: `Bug reports, privacy questions and feature requests for ${site.name} — the open-source Android expense tracker.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${legal.contact.title} · ${site.name}`,
    description: "Bug reports, privacy questions and feature requests are all welcome.",
    url: `${site.url}/contact`,
  },
};

const MARKS = [
  { icon: <MailMark className="size-5" />, name: "Email" },
  { icon: <GitHubMark className="size-5" />, name: "GitHub" },
  { icon: <XMark className="size-4" />, name: "X" },
];

export default function Contact() {
  return (
    <LegalPage slug="/contact" title={legal.contact.title} lede={legal.contact.lede}>
      <div className="flex flex-col gap-3">
        {contactPage.channels.map((channel) => {
          const mark = MARKS.find((item) => item.name.toLowerCase() === channel.label.toLowerCase());
          const external = channel.href.startsWith("http");
          return (
            <a
              key={channel.label}
              href={channel.href}
              {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
              className="flex items-center gap-4 rounded-lg border border-outline-variant bg-surface-container-low p-4 transition-colors hover:border-primary/50 hover:bg-surface-container"
            >
              <span
                aria-hidden="true"
                className="grid size-11 shrink-0 place-items-center rounded-pill bg-primary-container text-on-primary-container"
              >
                {mark?.icon}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-on-surface">{channel.label}</span>
                <span className="block truncate text-sm text-on-surface-variant">{channel.value}</span>
              </span>
              <svg viewBox="0 0 24 24" className="ms-auto size-4 shrink-0 text-on-surface-variant" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 5h5v5M19 5l-8 8M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
              </svg>
            </a>
          );
        })}
      </div>

      {contactPage.reasons.map((reason) => (
        <Clause key={reason.heading} heading={reason.heading}>
          <p>{reason.body}</p>
          <p>
            <a
              href={reason.action.href}
              {...(reason.action.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              className="inline-flex items-center gap-2 rounded-pill bg-primary-container px-4 py-2 text-sm font-bold text-on-primary-container transition-[filter,border-radius] hover:brightness-105 active:rounded-lg"
            >
              {reason.action.label}
              {reason.action.href.startsWith("http") ? (
                <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 5h5v5M19 5l-8 8M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
                </svg>
              ) : null}
            </a>
          </p>
        </Clause>
      ))}
    </LegalPage>
  );
}
