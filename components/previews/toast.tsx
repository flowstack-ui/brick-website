"use client";

import { Button } from "@flowstack-ui/brick/button";

import { Toaster, toast } from "@flowstack-ui/brick/toast";

export default function ToastPreview() {
  return <><Button onPress={() => toast.success("Release published", { description: "Brick 0.1.0 is ready." })}>Show toast</Button><Toaster /></>;
}
