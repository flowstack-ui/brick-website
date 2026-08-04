"use client";

import { Button } from "@flowstack-ui/brick/button";
import { Drawer } from "@flowstack-ui/brick/drawer";

export default function DrawerPreview() {
  return <Drawer.Root><Drawer.Trigger asChild><Button>Open settings</Button></Drawer.Trigger><Drawer.Portal><Drawer.Overlay /><Drawer.Content><Drawer.Header><Drawer.Title>Settings</Drawer.Title></Drawer.Header><Drawer.Body>Workspace preferences live here.</Drawer.Body><Drawer.Footer><Drawer.Close asChild><Button>Done</Button></Drawer.Close></Drawer.Footer></Drawer.Content></Drawer.Portal></Drawer.Root>;
}
