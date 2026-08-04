"use client";

import "../../app/.generated/previews/aspect-ratio.css";

import { AspectRatio } from "@flowstack-ui/brick/aspect-ratio";

export default function AspectRatioPreview() {
  return <AspectRatio.Root ratio={16 / 9} radius="lg" variant="outline"><div className="preview-art"><span>16 : 9</span></div></AspectRatio.Root>;
}
