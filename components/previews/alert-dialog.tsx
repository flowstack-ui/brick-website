"use client";

import "../../app/.generated/previews/alert-dialog.css";

import { AlertDialog } from "@flowstack-ui/brick/alert-dialog";
import { Button } from "@flowstack-ui/brick/button";

export default function AlertDialogPreview() {
  return <AlertDialog.Root><AlertDialog.Trigger asChild><Button tone="danger" variant="outline">Remove project</Button></AlertDialog.Trigger><AlertDialog.Portal><AlertDialog.Overlay /><AlertDialog.Content><AlertDialog.Header><AlertDialog.Title>Remove project?</AlertDialog.Title><AlertDialog.Description>This action cannot be undone.</AlertDialog.Description></AlertDialog.Header><AlertDialog.Footer><AlertDialog.Cancel asChild><Button tone="neutral" variant="outline">Keep project</Button></AlertDialog.Cancel><AlertDialog.Action asChild><Button tone="danger">Remove</Button></AlertDialog.Action></AlertDialog.Footer></AlertDialog.Content></AlertDialog.Portal></AlertDialog.Root>;
}
