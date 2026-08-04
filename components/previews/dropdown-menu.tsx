"use client";

import "../../app/.generated/previews/dropdown-menu.css";

import { Button } from "@flowstack-ui/brick/button";
import { DropdownMenu } from "@flowstack-ui/brick/dropdown-menu";

export default function DropdownMenuPreview() {
  return <DropdownMenu.Root><DropdownMenu.Trigger asChild><Button variant="outline">Actions</Button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content><DropdownMenu.Item value="duplicate">Duplicate</DropdownMenu.Item><DropdownMenu.Item value="rename">Rename</DropdownMenu.Item><DropdownMenu.Item value="delete" tone="danger">Delete</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root>;
}
