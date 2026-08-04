"use client";

import { Tree } from "@flowstack-ui/brick/tree";

export default function TreePreview() {
  return <Tree.Root aria-label="Repository" defaultExpandedValue={["src"]} showGuide variant="outline"><Tree.Item value="src"><Tree.ItemContent><Tree.Indicator /><Tree.ItemText>src</Tree.ItemText></Tree.ItemContent><Tree.Group><Tree.Item value="components"><Tree.ItemContent><Tree.Indicator /><Tree.ItemText>components</Tree.ItemText></Tree.ItemContent></Tree.Item><Tree.Item value="index"><Tree.ItemContent><Tree.Indicator /><Tree.ItemText>index.ts</Tree.ItemText></Tree.ItemContent></Tree.Item></Tree.Group></Tree.Item></Tree.Root>;
}
