"use client";

import { Menubar } from "@flowstack-ui/brick/menubar";

export default function MenubarPreview() {
  return <Menubar.Root><Menubar.Menu value="file"><Menubar.Trigger>File</Menubar.Trigger><Menubar.Portal><Menubar.Content className="preview-menubar-content"><Menubar.Item value="new"><Menubar.ItemLabel>New project</Menubar.ItemLabel><Menubar.Shortcut>⌘N</Menubar.Shortcut></Menubar.Item><Menubar.Item value="open"><Menubar.ItemLabel>Open project</Menubar.ItemLabel><Menubar.Shortcut>⌘O</Menubar.Shortcut></Menubar.Item></Menubar.Content></Menubar.Portal></Menubar.Menu><Menubar.Menu value="edit"><Menubar.Trigger>Edit</Menubar.Trigger><Menubar.Portal><Menubar.Content className="preview-menubar-content"><Menubar.Item value="undo"><Menubar.ItemLabel>Undo</Menubar.ItemLabel><Menubar.Shortcut>⌘Z</Menubar.Shortcut></Menubar.Item></Menubar.Content></Menubar.Portal></Menubar.Menu></Menubar.Root>;
}
