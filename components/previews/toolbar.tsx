"use client";

import "../../app/.generated/previews/toolbar.css";

import { Toolbar } from "@flowstack-ui/brick/toolbar";
import { Star } from "lucide-react";

export default function ToolbarPreview() {
  return <Toolbar.Root ariaLabel="Document tools"><Toolbar.Button>Undo</Toolbar.Button><Toolbar.Button>Redo</Toolbar.Button><Toolbar.Separator /><Toolbar.ToggleGroup aria-label="Document status"><Toolbar.ToggleItem value="favorite" aria-label="Favorite"><Star /></Toolbar.ToggleItem></Toolbar.ToggleGroup><Toolbar.Link href="#help">Help</Toolbar.Link></Toolbar.Root>;
}
