"use client";

import "../../app/.generated/previews/data-list.css";

import { DataList } from "@flowstack-ui/brick/data-list";

export default function DataListPreview() {
  return <DataList.Root divide labelWidth="sm" orientation={{ initial: "vertical", md: "horizontal" }}><DataList.Item><DataList.Label>Release</DataList.Label><DataList.Value>Brick 0.1.11</DataList.Value></DataList.Item><DataList.Item><DataList.Label>Status</DataList.Label><DataList.Value>Ready to verify</DataList.Value></DataList.Item><DataList.Item><DataList.Label>Owners</DataList.Label><DataList.Value>89 components</DataList.Value></DataList.Item></DataList.Root>;
}
