"use client";

import "../../app/.generated/previews/blockquote.css";

import { Blockquote } from "@flowstack-ui/brick/blockquote";

export default function BlockquotePreview() {
  return (
    <Blockquote.Root variant="surface">
      <Blockquote.Icon />
      <Blockquote.Content cite="https://example.com/design-systems">
        A system should make the correct decision easier to repeat.
      </Blockquote.Content>
      <Blockquote.Caption>
        Pat Lee, <Blockquote.Cite>Designing Durable Systems</Blockquote.Cite>
      </Blockquote.Caption>
    </Blockquote.Root>
  );
}
