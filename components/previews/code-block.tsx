"use client";

import { CodeBlock } from "@flowstack-ui/brick/code-block";

export default function CodeBlockPreview() {
  return <CodeBlock.Root value={'<Button tone="accent">Publish</Button>'} language="tsx"><CodeBlock.Header><CodeBlock.Title>Button.tsx</CodeBlock.Title><CodeBlock.Language /><CodeBlock.Actions><CodeBlock.CopyTrigger>Copy</CodeBlock.CopyTrigger></CodeBlock.Actions></CodeBlock.Header><CodeBlock.Content aria-label="Button source"><span style={{ color: "var(--brick-syntax-punctuation)" }}>&lt;</span><span style={{ color: "var(--brick-syntax-type)" }}>Button</span> <span style={{ color: "var(--brick-syntax-property)" }}>tone</span><span style={{ color: "var(--brick-syntax-punctuation)" }}>=</span><span style={{ color: "var(--brick-syntax-string)" }}>&quot;accent&quot;</span><span style={{ color: "var(--brick-syntax-punctuation)" }}>&gt;</span>Publish<span style={{ color: "var(--brick-syntax-punctuation)" }}>&lt;/</span><span style={{ color: "var(--brick-syntax-type)" }}>Button</span><span style={{ color: "var(--brick-syntax-punctuation)" }}>&gt;</span></CodeBlock.Content></CodeBlock.Root>;
}
