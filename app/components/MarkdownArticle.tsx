import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { isValidElement, type ReactNode } from "react";
import { headingId } from "@/app/lib/toc";
import { HighlightedCodeBlock } from "@/app/components/HighlightedCodeBlock";
import { highlightedLines, languageFromClassName, normalizeCodeSource } from "@/app/lib/syntax";

function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return nodeText(node.props.children);
  return "";
}

const languageNames: Record<string, string> = { bash: "Bash", css: "CSS", html: "HTML", text: "Text", ts: "TypeScript", tsx: "TSX" };

function MarkdownCodeBlock({ children, index }: { children: ReactNode; index: number }) {
  if (!isValidElement<{ className?: string; children?: ReactNode }>(children)) return null;
  const language = languageFromClassName(children.props.className);
  const source = normalizeCodeSource(nodeText(children.props.children));
  const label = `${languageNames[language] ?? language.toUpperCase()} code example ${index}`;
  return <HighlightedCodeBlock label={label} language={language} lines={highlightedLines(language, source)} source={source} />;
}

export function MarkdownArticle({ markdown, componentSlug }: { markdown: string; componentSlug?: string }) {
  const body = markdown.replace(/^# .+\n/, "");
  const headingOccurrences = new Map<string, number>();
  let codeExampleIndex = 0;
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
          pre: ({ children }) => <MarkdownCodeBlock index={++codeExampleIndex}>{children}</MarkdownCodeBlock>,
          table: ({ children }) => <div className="markdown-table-wrap"><table>{children}</table></div>,
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
