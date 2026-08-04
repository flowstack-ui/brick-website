"use client";

import "../../app/.generated/previews/progress-circle.css";

import { ProgressCircle } from "@flowstack-ui/brick/progress-circle";

export default function ProgressCirclePreview() {
  return <ProgressCircle.Root value={64}><ProgressCircle.Circle><ProgressCircle.Track /><ProgressCircle.Indicator /></ProgressCircle.Circle><ProgressCircle.Value /><ProgressCircle.Label>Export report</ProgressCircle.Label></ProgressCircle.Root>;
}
