"use client";

import { Fragment, useState, type CSSProperties } from "react";
import { CodeBlock, type CodeBlockRootProps } from "@flowstack-ui/brick/code-block";
import { Check, Copy, LoaderCircle, RotateCcw } from "lucide-react";
import type { SyntaxLines, SyntaxToken } from "@/app/lib/syntax";

type CopyStatus = Parameters<NonNullable<CodeBlockRootProps["onStatusChange"]>>[0]["status"];

const copyPresentation = {
  idle: { label: "Copy", icon: Copy },
  copying: { label: "Copying", icon: LoaderCircle },
  copied: { label: "Copied", icon: Check },
  error: { label: "Retry", icon: RotateCcw },
} satisfies Record<CopyStatus, { label: string; icon: typeof Copy }>;

function tokenStyle(token: SyntaxToken): CSSProperties {
  const decorations = [token.fontStyle && (token.fontStyle & 4) ? "underline" : "", token.fontStyle && (token.fontStyle & 8) ? "line-through" : ""].filter(Boolean).join(" ");
  return {
    color: token.color,
    fontStyle: token.fontStyle && (token.fontStyle & 1) ? "italic" : undefined,
    fontWeight: token.fontStyle && (token.fontStyle & 2) ? 650 : undefined,
    textDecoration: decorations || undefined,
  };
}

export function HighlightedCodeBlock({ label, language, lines, source }: { label: string; language: string; lines: SyntaxLines; source: string }) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const { icon: CopyIcon, label: copyLabel } = copyPresentation[copyStatus];

  return (
    <CodeBlock.Root language={language} value={source} onStatusChange={({ status }) => setCopyStatus(status)}>
      <CodeBlock.Header>
        <CodeBlock.Language />
        <CodeBlock.Actions>
          <CodeBlock.CopyTrigger
            className="syntax-copy-trigger"
            variant="soft"
            startIcon={<CopyIcon className={copyStatus === "copying" ? "syntax-copy-spinner" : undefined} size={15} aria-hidden="true" />}
          >
            {copyLabel}
          </CodeBlock.CopyTrigger>
        </CodeBlock.Actions>
      </CodeBlock.Header>
      <CodeBlock.Content aria-label={label}>
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
