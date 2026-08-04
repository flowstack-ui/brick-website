"use client";

import "../../app/.generated/previews/popover.css";

import { Button } from "@flowstack-ui/brick/button";
import { Popover } from "@flowstack-ui/brick/popover";

export default function PopoverPreview() {
  return <Popover.Root><Popover.Trigger asChild><Button variant="outline">Details</Button></Popover.Trigger><Popover.Portal><Popover.Content><Popover.Title>Release details</Popover.Title><Popover.Body>All package checks passed.</Popover.Body></Popover.Content></Popover.Portal></Popover.Root>;
}
