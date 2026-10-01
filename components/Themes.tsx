import { themes } from "@/content/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ThemesShowcase } from "@/components/ThemesShowcase";

/**
 * The interactive themes section.
 *
 * The server component owns the heading and the prose; the showcase below it is
 * the only client island, so the section still renders and reads completely with
 * JavaScript disabled — the swatches simply stop responding.
 */
export function Themes() {
  return (
    <section id="themes" className="section" data-reveal>
      <div className="shell">
        <SectionHeader eyebrow={themes.eyebrow} title={themes.title} lede={themes.lede} />
        <div className="mt-14">
          <ThemesShowcase />
        </div>
      </div>
    </section>
  );
}