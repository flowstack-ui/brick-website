"use client";

import "../../app/.generated/previews/group.css";

import { Button } from "@flowstack-ui/brick/button";
import { Group } from "@flowstack-ui/brick/group";

export default function GroupPreview() {
  return <Group aria-label="History controls" attached role="group"><Button tone="neutral" variant="outline">Previous</Button><Button tone="neutral" variant="outline">Current</Button><Button tone="neutral" variant="outline">Next</Button></Group>;
}
