"use client";

import { Button } from "@flowstack-ui/brick/button";
import { Dialog } from "@flowstack-ui/brick/dialog";
import { Input } from "@flowstack-ui/brick/input";

export default function DialogPreview() {
  return <Dialog.Root><Dialog.Trigger asChild><Button>Edit profile</Button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay /><Dialog.Content size="sm"><Dialog.Header><Dialog.Title>Edit profile</Dialog.Title><Dialog.Description>Update the information visible to your team.</Dialog.Description></Dialog.Header><Dialog.Body><Input aria-label="Display name" defaultValue="Flowstack" /></Dialog.Body><Dialog.Footer><Dialog.Close asChild><Button tone="neutral" variant="outline">Cancel</Button></Dialog.Close><Dialog.Close asChild><Button>Save</Button></Dialog.Close></Dialog.Footer></Dialog.Content></Dialog.Portal></Dialog.Root>;
}
