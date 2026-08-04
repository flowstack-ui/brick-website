"use client";

import "../../app/.generated/previews/list.css";

import { List } from "@flowstack-ui/brick/list";

export default function ListPreview() {
  return <List.Root><List.Item>Package build</List.Item><List.Item>Browser checks</List.Item><List.Item>Release notes</List.Item></List.Root>;
}
