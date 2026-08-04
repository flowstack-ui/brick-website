"use client";

import { Progress } from "@flowstack-ui/brick/progress";

export default function ProgressPreview() {
  return <Progress.Root value={64}><Progress.Label>Upload files</Progress.Label><Progress.Value /><Progress.Track><Progress.Indicator /></Progress.Track></Progress.Root>;
}
