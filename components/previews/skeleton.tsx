"use client";

import "../../app/.generated/previews/skeleton.css";

import { Skeleton } from "@flowstack-ui/brick/skeleton";
import { VStack } from "@flowstack-ui/brick/stack";

export default function SkeletonPreview() {
  return <VStack gap="3"><Skeleton loading variant="rounded"><div>Loaded heading</div></Skeleton><Skeleton loading variant="text"><div>Loaded body content</div></Skeleton><Skeleton loading variant="circular"><div>Avatar</div></Skeleton></VStack>;
}
