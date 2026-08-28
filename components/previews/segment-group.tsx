"use client";

import "../../app/.generated/previews/segment-group.css";

import { SegmentGroup } from "@flowstack-ui/brick/segment-group";

export default function SegmentGroupPreview() {
  return <SegmentGroup.Root aria-label="Project view" defaultValue="list"><SegmentGroup.Indicator /><SegmentGroup.Item value="list">List</SegmentGroup.Item><SegmentGroup.Item value="grid">Grid</SegmentGroup.Item><SegmentGroup.Item value="board">Board</SegmentGroup.Item></SegmentGroup.Root>;
}
