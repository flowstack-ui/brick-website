"use client";

import "../../app/.generated/previews/app-bar.css";

import { AppBar } from "@flowstack-ui/brick/app-bar";
import { IconButton } from "@flowstack-ui/brick/icon-button";

import { Settings } from "lucide-react";

export default function AppBarPreview() {
  return <AppBar.Root><AppBar.Toolbar><AppBar.Start><strong>Brick</strong></AppBar.Start><AppBar.Center>Workspace</AppBar.Center><AppBar.End><IconButton aria-label="Open settings" variant="ghost"><Settings /></IconButton></AppBar.End></AppBar.Toolbar></AppBar.Root>;
}
