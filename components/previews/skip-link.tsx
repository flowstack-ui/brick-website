"use client";

import { SkipLink } from "@flowstack-ui/brick/skip-link";
import { Text } from "@flowstack-ui/brick/text";

export default function SkipLinkPreview() {
  return <div className="preview-skip"><SkipLink.Root href="#preview-main">Skip to preview content</SkipLink.Root><Text tone="secondary">Press Tab to reveal the skip link.</Text><SkipLink.Target id="preview-main"><Text as="span" weight="semibold">Preview content target</Text></SkipLink.Target></div>;
}
