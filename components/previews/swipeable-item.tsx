"use client";

import { Badge } from "@flowstack-ui/brick/badge";
import { Button } from "@flowstack-ui/brick/button";
import { SwipeableItem } from "@flowstack-ui/brick/swipeable-item";
import { Text } from "@flowstack-ui/brick/text";

export default function SwipeableItemPreview() {
  return <SwipeableItem.Root variant="outline"><SwipeableItem.Actions aria-label="Archive actions" side="start"><Button size="sm" variant="ghost">Archive</Button></SwipeableItem.Actions><SwipeableItem.Content className="preview-swipeable-content"><Text>Quarterly report</Text><Badge>Ready</Badge></SwipeableItem.Content><SwipeableItem.Actions aria-label="Delete actions" side="end"><Button size="sm" tone="danger" variant="ghost">Delete</Button></SwipeableItem.Actions></SwipeableItem.Root>;
}
