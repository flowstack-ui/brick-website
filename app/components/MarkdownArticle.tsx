import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownArticle({ markdown, componentSlug }: { markdown: string; componentSlug?: string }) {
  const body = markdown.replace(/^# .+\n/, "");
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
          pre: ({ children }) => <div className="code-frame"><pre>{children}</pre></div>,
          table: ({ children }) => <div className="markdown-table-wrap"><table>{children}</table></div>,
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}

