"use client";

import "../../app/.generated/previews/notification-badge.css";

import { NotificationBadge } from "@flowstack-ui/brick/badge";
import { Button } from "@flowstack-ui/brick/button";
import { Inbox } from "lucide-react";

export default function NotificationBadgePreview() {
  return <NotificationBadge count={3}><Button tone="neutral" variant="outline" startIcon={<Inbox />}>Inbox</Button></NotificationBadge>;
}
