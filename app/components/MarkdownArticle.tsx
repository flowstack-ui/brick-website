import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { isValidElement, type ReactNode } from "react";
import { headingId } from "@/app/lib/toc";

function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return nodeText(node.props.children);
  return "";
}

export function MarkdownArticle({ markdown, componentSlug }: { markdown: string; componentSlug?: string }) {
  const body = markdown.replace(/^# .+\n/, "");
  const headingOccurrences = new Map<string, number>();
  const normalizeHref = (href?: string) => {
    if (!href) return "#";
    if (/^(https?:|mailto:|#)/.test(href)) return href;
    if (componentSlug) {
      const normalized = href.replace(/^\.\//, "");
      if (normalized === "CHANGELOG.md") return `https://github.com/flowstack-ui/brick/blob/main/docs/components/${componentSlug}/CHANGELOG.md`;
      if (href.startsWith("../")) return `https://github.com/flowstack-ui/brick/blob/main/docs/components/${componentSlug}/${href}`;
    }
    return href;
  };

  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children, ...props }) => <a href={normalizeHref(href)} {...props}>{children}</a>,
          h2: ({ children }) => {
            const baseId = headingId(nodeText(children));
            const occurrence = headingOccurrences.get(baseId) ?? 0;
            headingOccurrences.set(baseId, occurrence + 1);
            return <h2 id={occurrence === 0 ? baseId : `${baseId}-${occurrence}`}>{children}</h2>;
          },
          pre: ({ children }) => <div className="code-frame"><pre>{children}</pre></div>,
          table: ({ children }) => <div className="markdown-table-wrap"><table>{children}</table></div>,
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
