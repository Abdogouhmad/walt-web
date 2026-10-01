import { faq } from "@/content/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Accordion } from "@/components/ui/Accordion";

/**
 * The FAQ.
 *
 * A native `<details>` accordion, so there is no client component here at all.
 * The same question/answer pairs are emitted as `FAQPage` JSON-LD below, which
 * is what search engines read — generating both from one array is why they
 * cannot drift apart.
 */
export function Faq() {
  return (
    <section id="faq" className="section">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeader eyebrow={faq.eyebrow} title={faq.title} id="faq-heading" />

          <Accordion items={faq.items} name="walt-faq" />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
      </section>
  );
}