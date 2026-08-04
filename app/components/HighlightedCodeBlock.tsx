"use client";

import { Fragment, type CSSProperties } from "react";
import { CodeBlock } from "@flowstack-ui/brick/code-block";
import type { SyntaxLines, SyntaxToken } from "@/app/lib/syntax";

function tokenStyle(token: SyntaxToken): CSSProperties {
  const decorations = [token.fontStyle && (token.fontStyle & 4) ? "underline" : "", token.fontStyle && (token.fontStyle & 8) ? "line-through" : ""].filter(Boolean).join(" ");
  return {
    color: token.color,
    fontStyle: token.fontStyle && (token.fontStyle & 1) ? "italic" : undefined,
    fontWeight: token.fontStyle && (token.fontStyle & 2) ? 650 : undefined,
    textDecoration: decorations || undefined,
  };
}

export function HighlightedCodeBlock({ language, lines, source }: { language: string; lines: SyntaxLines; source: string }) {
  return (
    <CodeBlock.Root language={language} value={source}>
      <CodeBlock.Header>
        <CodeBlock.Language />
        <CodeBlock.Actions><CodeBlock.CopyTrigger>Copy</CodeBlock.CopyTrigger></CodeBlock.Actions>
      </CodeBlock.Header>
      <CodeBlock.Content aria-label={`${language} code example`}>
        {lines.map((line, lineIndex) => (
          <Fragment key={lineIndex}>
            {line.map((token, tokenIndex) => <span key={tokenIndex} style={tokenStyle(token)}>{token.content}</span>)}
            {lineIndex < lines.length - 1 ? "\n" : null}
          </Fragment>
        ))}
      </CodeBlock.Content>
      <CodeBlock.CopyStatus className="sr-only">
        <CodeBlock.CopyIndicator when="copying">Copying code</CodeBlock.CopyIndicator>
        <CodeBlock.CopyIndicator when="copied">Code copied</CodeBlock.CopyIndicator>
        <CodeBlock.CopyIndicator when="error">Code could not be copied</CodeBlock.CopyIndicator>
      </CodeBlock.CopyStatus>
    </CodeBlock.Root>
  );
}
