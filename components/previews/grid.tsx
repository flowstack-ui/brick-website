"use client";

import { Grid } from "@flowstack-ui/brick/grid";
import { Surface } from "@flowstack-ui/brick/surface";

export default function GridPreview() {
  return <Grid.Root minItemSize="sm" gap="3"><Surface bordered inset="md">Account</Surface><Surface bordered inset="md">Billing</Surface><Surface bordered inset="md">Security</Surface></Grid.Root>;
}
