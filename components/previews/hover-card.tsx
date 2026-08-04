"use client";

import "../../app/.generated/previews/hover-card.css";

import { Avatar } from "@flowstack-ui/brick/avatar";
import { Badge } from "@flowstack-ui/brick/badge";
import { HoverCard } from "@flowstack-ui/brick/hover-card";
import { Link } from "@flowstack-ui/brick/link";
import { HStack } from "@flowstack-ui/brick/stack";
import { Text } from "@flowstack-ui/brick/text";
import { Eye } from "lucide-react";

export default function HoverCardPreview() {
  return <HoverCard.Root><HoverCard.Trigger asChild><Link className="preview-hover-trigger" href="#ada"><span className="preview-hover-identity"><Avatar alt="" fallback="AL" /><span className="preview-hover-copy"><strong>Ada Lovelace</strong><small>@ada</small></span></span><span className="preview-hover-action"><Eye size={15} aria-hidden="true" /> Preview profile</span></Link></HoverCard.Trigger><HoverCard.Portal><HoverCard.Content align="start" size="lg"><HStack className="preview-hover-profile"><Avatar alt="" fallback="AL" /><div><Text weight="semibold">Ada Lovelace</Text><Text as="p" tone="secondary" variant="body-sm">Mathematician and early computing author.</Text><HStack gap="2" wrap><Badge tone="success" variant="soft">Available</Badge><Text tone="secondary" variant="caption">4 shared projects</Text></HStack></div></HStack><HoverCard.Arrow /></HoverCard.Content></HoverCard.Portal></HoverCard.Root>;
}
