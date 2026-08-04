"use client";

import { Image } from "@flowstack-ui/brick/image";

export default function ImagePreview() {
  return <Image.Root src="/brick-social-card.jpg" ratio={16 / 9} radius="lg"><Image.Content alt="Brick UI component system artwork" width={1200} height={630} /><Image.Fallback>Brick artwork</Image.Fallback></Image.Root>;
}
