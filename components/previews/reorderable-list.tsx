"use client";

import "../../app/.generated/previews/reorderable-list.css";

import { useState } from "react";
import { ReorderableList } from "@flowstack-ui/brick/reorderable-list";

const labels: Record<string, string> = { connect: "Connect source", configure: "Configure deployment", verify: "Verify setup" };

export default function ReorderableListPreview() {
  const [items, setItems] = useState(["connect", "configure", "verify"]);
  return <ReorderableList.Root getItemLabel={(value) => labels[value]} items={items} onItemsChange={setItems}>{items.map((value) => <ReorderableList.Item key={value} value={value}><ReorderableList.Handle aria-label={`Reorder ${labels[value]}`}>⋮⋮</ReorderableList.Handle><ReorderableList.Content>{labels[value]}</ReorderableList.Content><ReorderableList.Actions><ReorderableList.MoveBefore aria-label={`Move ${labels[value]} earlier`}>↑</ReorderableList.MoveBefore><ReorderableList.MoveAfter aria-label={`Move ${labels[value]} later`}>↓</ReorderableList.MoveAfter></ReorderableList.Actions><ReorderableList.DropIndicator /></ReorderableList.Item>)}</ReorderableList.Root>;
}
