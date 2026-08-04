"use client";

import "../../app/.generated/previews/collapsible.css";

import { Collapsible } from "@flowstack-ui/brick/collapsible";

export default function CollapsiblePreview() {
  return <Collapsible.Root className="preview-collapsible"><Collapsible.Trigger>Advanced settings <Collapsible.Indicator /></Collapsible.Trigger><Collapsible.Content><Collapsible.ContentInner>Motion, density, and accessibility options.</Collapsible.ContentInner></Collapsible.Content></Collapsible.Root>;
}
