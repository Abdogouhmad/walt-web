import { faq, hero, site } from "@/content/site";
import type { Release } from "@/lib/release";

/**
 * Structured data for the page.
 *
 * Emitted from the same fetched release the download section renders, so the
 * `softwareVersion` in the JSON-LD is the version a visitor is actually offered
 * rather than a number someone forgot to update.
 *
 * `<` is escaped before the JSON goes into the document: without it, a version
 * string or release note containing `<` could close the script element early.
 */
export function StructuredData({ release }: { release: Release }) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${site.url}/#app`,
        name: site.name,
        description: hero.subline,
        url: site.url,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Android",
        softwareVersion: `v${release.version}`,
        downloadUrl: release.assets[0]?.url,
        installUrl: `${site.url}/#download`,
        softwareHelp: `${site.repository}#readme`,
        license: `https://opensource.org/licenses/${site.license}`,
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: [
          "Offline expense tracking",
          "Biometric app lock",
          "Budget alerts at 80% and 100%",
          "PDF report export",
          "Nine Material 3 palettes with AMOLED mode",
        ],
        author: { "@type": "Person", name: site.name, url: site.authorProfile },
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": `${site.url}/#source`,
        name: `${site.name} source code`,
        codeRepository: site.repository,
        license: `https://opensource.org/licenses/${site.license}`,
        programmingLanguage: ["Dart", "Kotlin", "TypeScript"],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
