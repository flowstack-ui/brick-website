"use client";

import "../../app/.generated/previews/avatar.css";

import { Avatar } from "@flowstack-ui/brick/avatar";
import { HStack } from "@flowstack-ui/brick/stack";

export default function AvatarPreview() {
  return <HStack gap="3" align="center"><Avatar alt="Flowstack Design" fallback="FD" /><Avatar alt="Brick" fallback="BR" /><Avatar alt="Atom" fallback="AT" /></HStack>;
}
