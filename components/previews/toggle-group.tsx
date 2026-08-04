"use client";

import "../../app/.generated/previews/toggle-group.css";

import { ToggleGroup } from "@flowstack-ui/brick/toggle-group";

export default function ToggleGroupPreview() {
  return <ToggleGroup.Root aria-label="Alignment" defaultValue="start"><ToggleGroup.Item value="start">Start</ToggleGroup.Item><ToggleGroup.Item value="center">Center</ToggleGroup.Item><ToggleGroup.Item value="end">End</ToggleGroup.Item></ToggleGroup.Root>;
}
