/**
 * A deliberately small Markdown renderer for GitHub release bodies.
 *
 * The app's release pipeline generates those bodies straight from
 * `CHANGELOG.md`, so their shape is known and narrow: `##` version headings,
 * `###` section headings, `-` bullets, `**bold**`, `` `code` `` and wrapped
 * prose. Rendering that with a general-purpose Markdown library would ship tens
 * of kilobytes of parser to the client for a changelog teaser, and would open a
 * raw-HTML injection surface for no benefit.
 *
 * Everything is escaped first and only the small tag vocabulary below is ever
 * emitted, so a hostile release body cannot inject markup.
 */

import type { ReactNode } from "react";

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

/** `**bold**` and `` `code` `` inside a single line of prose. */
function renderInline(text: string): string {
  return escapeHtml(text)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label: string, href: string) =>
      href.startsWith("https://") ? `<a href="${href}" rel="noopener noreferrer">${label}</a>` : label,
    );
}

type Block =
  | { kind: "h2"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] };

/** Groups wrapped lines back into paragraphs and bullet lists. */
function parse(markdown: string): Block[] {
  const blocks: Block[] = [];
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let paragraph: string[] = [];
  let list: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    blocks.push({ kind: "p", text: paragraph.join(" ") });
    paragraph = [];
  };
  const flushList = () => {
    if (list.length === 0) return;
    blocks.push({ kind: "ul", items: list });
    list = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === "") {
      flushParagraph();
      flushList();
      continue;
    }
    if (/^#{1,6}\s+/.test(trimmed)) {
      flushParagraph();
      flushList();
      const level = trimmed.match(/^#+/)![0].length;
      const text = trimmed.replace(/^#+\s+/, "");
      if (level <= 2) blocks.push({ kind: "h2", text });
      else blocks.push({ kind: "h3", text });
      continue;
    }
    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph();
      // Nested bullets are flattened: the teaser is a summary, not a replica.
      list.push(trimmed.replace(/^[-*]\s+/, "").replace(/^\s+/, ""));
      continue;
    }
    if (/^>\s?/.test(trimmed)) {
      flushParagraph();
      flushList();
      continue;
    }
    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  return blocks;
}

export type RenderedMarkdown = {
  /** Plain-text preview, for `aria-label` and meta descriptions. */
  text: string;
  /** A nested list of elements, safe to drop into a server component. */
  nodes: ReactNode[];
};

export function renderReleaseNotes(markdown: string, limit?: number): RenderedMarkdown {
  const blocks = parse(markdown);
  const trimmed: Block[] = [];

  for (const block of blocks) {
    if (block.kind === "h2") continue;
    trimmed.push(block);
    if (limit && trimmed.length >= limit) break;
  }

  const nodes: ReactNode[] = [];
  const text: string[] = [];

  trimmed.forEach((block, index) => {
    const key = `${block.kind}-${index}`;
    // Release notes use `##` for a version heading and `###` for a group inside
    // it. The teaser already sits under an h3 naming the version, so both levels
    // collapse to one h4 rather than fighting the page's heading order.
    if (block.kind === "h2" || block.kind === "h3") {
      nodes.push(
        <h4 key={key} className="mt-6 mb-2 text-sm font-bold tracking-wide text-primary uppercase">
          {block.text}
        </h4>,
      );
      return;
    }
    if (block.kind === "p") {
      text.push(block.text);
      nodes.push(
        <p key={key} className="mb-3 text-on-surface-variant leading-relaxed">
          <span dangerouslySetInnerHTML={{ __html: renderInline(block.text) }} />
        </p>,
      );
      return;
    }
    const items = block.items.map((item, itemIndex) => {
      text.push(item);
      return (
        <li key={`${key}-${itemIndex}`} className="mb-2 flex gap-3 text-on-surface-variant leading-relaxed">
          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
          <span dangerouslySetInnerHTML={{ __html: renderInline(item) }} />
        </li>
      );
    });
    nodes.push(
      <ul key={key} className="mb-4">
        {items}
      </ul>,
    );
  });

  return { text: text.join(" "), nodes };
}