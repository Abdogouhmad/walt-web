import type { Metadata } from "next";
import { legal, privacyPolicy, site } from "@/content/site";
import { Bullets, Clause, LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: legal.privacy.title,
  description:
    "Walt collects nothing. Your transactions, budgets and settings stay in a local database on your device — no account, no cloud, no trackers, no cookies.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `${legal.privacy.title} · ${site.name}`,
    description:
      "Walt collects nothing. Your transactions, budgets and settings stay in a local database on your device.",
    url: `${site.url}/privacy`,
  },
};

export default function Privacy() {
  return (
    <LegalPage slug="/privacy" title={legal.privacy.title} lede={legal.privacy.lede}>
      {privacyPolicy.clauses.map((clause) => (
        <Clause key={clause.heading} heading={clause.heading}>
          {clause.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {clause.list ? <Bullets items={clause.list} /> : null}
        </Clause>
      ))}

      <Clause heading={privacyPolicy.contact.heading}>
        {privacyPolicy.contact.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>
          <a
            href={`mailto:${site.email}`}
            className="rounded-xs font-semibold text-primary underline-offset-4 hover:underline"
          >
            {site.email}
          </a>{" "}
          ·{" "}
          <a
            href={`${site.repository}/issues`}
            className="rounded-xs font-semibold text-primary underline-offset-4 hover:underline"
          >
            the issue tracker
          </a>
        </p>
      </Clause>
    </LegalPage>
  );
}
