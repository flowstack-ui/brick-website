"use client";

import { Surface } from "@flowstack-ui/brick/surface";
import { Tabs } from "@flowstack-ui/brick/tabs";

export default function TabsPreview() {
  return <Tabs.Root defaultValue="overview"><Tabs.List ariaLabel="Account sections"><Tabs.Trigger value="overview">Overview</Tabs.Trigger><Tabs.Trigger value="activity">Activity</Tabs.Trigger><Tabs.Indicator /></Tabs.List><Tabs.Content value="overview"><Surface inset="md" level="subtle">Overview panel</Surface></Tabs.Content><Tabs.Content value="activity"><Surface inset="md" level="subtle">Activity panel</Surface></Tabs.Content></Tabs.Root>;
}
