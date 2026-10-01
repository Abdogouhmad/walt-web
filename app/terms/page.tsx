import type { Metadata } from "next";
import { legal, site, termsOfUse } from "@/content/site";
import { Bullets, Clause, LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: legal.terms.title,
  description:
    "Walt is free software provided as-is under the MIT licence. What that means for warranty, liability, your data, and installing the signed APK.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `${legal.terms.title} · ${site.name}`,
    description: "Walt is free software provided as-is under the MIT licence.",
    url: `${site.url}/terms`,
  },
};

export default function Terms() {
  return (
    <LegalPage slug="/terms" title={legal.terms.title} lede={legal.terms.lede}>
      {termsOfUse.clauses.map((clause) => (
        <Clause key={clause.heading} heading={clause.heading}>
          {clause.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {clause.list ? <Bullets items={clause.list} /> : null}
        </Clause>
      ))}

      <Clause heading="The licence text">
        <p>
          The authoritative licence is the{" "}
          <code className="rounded-xs bg-surface-container px-1.5 py-0.5 font-mono text-sm">
            LICENSE
          </code>{" "}
          file in the repository:
        </p>
        <p>
          <a
            href={`${site.repository}/blob/main/LICENSE`}
            className="rounded-xs font-semibold text-primary underline-offset-4 hover:underline"
          >
            Read it on GitHub
          </a>
        </p>
      </Clause>
    </LegalPage>
  );
}
