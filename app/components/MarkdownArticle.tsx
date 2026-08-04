import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Children, isValidElement, type ReactNode } from "react";
import { Code } from "@flowstack-ui/brick/code";
import { Table, type TableDensity, type TableSize } from "@flowstack-ui/brick/table";
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

function inlineCodeKind(value: string) {
  if (value.startsWith("--")) return "css-token";
  if (/^(aria-|data-)/.test(value)) return "attribute";
  if (/^(npm|npx|pnpm|yarn)\b/.test(value)) return "command";
  if (/^[A-Z][A-Za-z0-9]*(?:\.[A-Z][A-Za-z0-9]*)?$/.test(value)) return "component";
  if (/^(true|false|null|undefined|[a-zA-Z-]+=["']).*/.test(value)) return "value";
  return "literal";
}

function MarkdownCodeBlock({ children, index, labelPrefix }: { children: ReactNode; index: number; labelPrefix?: string }) {
  if (!isValidElement<{ className?: string; children?: ReactNode }>(children)) return null;
  const language = languageFromClassName(children.props.className);
  const source = normalizeCodeSource(nodeText(children.props.children));
  const label = `${labelPrefix ? `${labelPrefix} ` : ""}${languageNames[language] ?? language.toUpperCase()} code example ${index}`;
  return <HighlightedCodeBlock label={label} language={language} lines={highlightedLines(language, source)} source={source} />;
}

export function MarkdownArticle({ bodyOnly = false, codeLabelPrefix, componentSlug, markdown, tableDensity = "compact", tableSize = "sm" }: { bodyOnly?: boolean; codeLabelPrefix?: string; componentSlug?: string; markdown: string; tableDensity?: TableDensity; tableSize?: TableSize }) {
  const body = bodyOnly ? markdown : markdown.replace(/^# .+\n/, "");
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
          code: ({ children, className }) => <Code className={className} data-code-kind={inlineCodeKind(nodeText(children))} variant="subtle">{children}</Code>,
          p: ({ children }) => {
            const codeCount = Children.toArray(children).filter((child) => isValidElement<{ "data-code-kind"?: string }>(child) && child.props["data-code-kind"]).length;
            return <p className={codeCount >= 4 ? "markdown-token-cluster" : undefined}>{children}</p>;
          },
          pre: ({ children }) => <MarkdownCodeBlock index={++codeExampleIndex} labelPrefix={codeLabelPrefix}>{children}</MarkdownCodeBlock>,
          table: ({ children }) => <Table.Container className="markdown-table-wrap"><Table.Root density={tableDensity} size={tableSize} variant="line">{children}</Table.Root></Table.Container>,
          thead: ({ children }) => <Table.Header>{children}</Table.Header>,
          tbody: ({ children }) => <Table.Body>{children}</Table.Body>,
          tfoot: ({ children }) => <Table.Footer>{children}</Table.Footer>,
          tr: ({ children }) => <Table.Row>{children}</Table.Row>,
          th: ({ children }) => <Table.Head>{children}</Table.Head>,
          td: ({ children }) => <Table.Cell>{children}</Table.Cell>,
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
