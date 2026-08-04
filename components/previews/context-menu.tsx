"use client";

import { ContextMenu } from "@flowstack-ui/brick/context-menu";
import { Text } from "@flowstack-ui/brick/text";
import { MousePointer2 } from "lucide-react";

export default function ContextMenuPreview() {
  return <ContextMenu.Root><ContextMenu.Trigger className="preview-context-target"><span className="preview-context-icon"><MousePointer2 size={20} aria-hidden="true" /></span><Text as="h3" variant="title-sm">Project canvas</Text><Text as="p" tone="secondary" variant="body-sm">Right-click here, or focus the canvas and press Shift + F10.</Text></ContextMenu.Trigger><ContextMenu.Portal><ContextMenu.Content><ContextMenu.Item value="copy">Copy</ContextMenu.Item><ContextMenu.Item value="duplicate">Duplicate</ContextMenu.Item><ContextMenu.Item value="remove" tone="danger">Remove</ContextMenu.Item></ContextMenu.Content></ContextMenu.Portal></ContextMenu.Root>;
}
