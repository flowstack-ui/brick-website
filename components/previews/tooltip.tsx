"use client";

import "../../app/.generated/previews/tooltip.css";

import { IconButton } from "@flowstack-ui/brick/icon-button";
import { Tooltip } from "@flowstack-ui/brick/tooltip";
import { Bell } from "lucide-react";

export default function TooltipPreview() {
  return <Tooltip.Root><Tooltip.Trigger asChild><IconButton aria-label="Notifications"><Bell /></IconButton></Tooltip.Trigger><Tooltip.Portal><Tooltip.Content>Notifications</Tooltip.Content></Tooltip.Portal></Tooltip.Root>;
}
