"use client";

import { Badge } from "@flowstack-ui/brick/badge";
import { Breadcrumb } from "@flowstack-ui/brick/breadcrumb";
import { Button } from "@flowstack-ui/brick/button";
import { Card } from "@flowstack-ui/brick/card";
import { Checkbox } from "@flowstack-ui/brick/checkbox";
import { Dialog } from "@flowstack-ui/brick/dialog";
import { Field } from "@flowstack-ui/brick/field";
import { Input } from "@flowstack-ui/brick/input";
import { Progress } from "@flowstack-ui/brick/progress";
import { HStack, VStack } from "@flowstack-ui/brick/stack";
import { Switch } from "@flowstack-ui/brick/switch";
import { Table } from "@flowstack-ui/brick/table";
import { Tabs } from "@flowstack-ui/brick/tabs";
import { Text } from "@flowstack-ui/brick/text";
import { ArrowRight, Check, Sparkles } from "lucide-react";

export function ComponentPreview({ title, category }: { title: string; category: string }) {
  if (category === "Actions & selection") {
    return <HStack gap="3" wrap><Button>{title}</Button><Button variant="outline" tone="neutral">Secondary</Button><Button variant="ghost" tone="neutral" endIcon={<ArrowRight size={14} />}>Learn more</Button></HStack>;
  }
  if (category === "Forms & choices") {
    return <VStack gap="4" className="preview-form"><Field.Root id={`preview-${title}`}><Field.Label>{title}</Field.Label><Input placeholder="Type something useful" /></Field.Root><HStack justify="between" align="center"><HStack gap="2"><Checkbox aria-label="Include details" /><Text variant="body-sm">Include details</Text></HStack><Switch.Root aria-label="Enabled" defaultChecked><Switch.Thumb /></Switch.Root></HStack></VStack>;
  }
  if (category === "Overlays & menus") {
    return <Dialog.Root><Dialog.Trigger asChild><Button startIcon={<Sparkles size={15} />}>Open {title}</Button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay /><Dialog.Content size="sm"><Dialog.Header><Dialog.Title>{title}</Dialog.Title><Dialog.Description>A real Brick overlay with Atom-owned focus and dismissal.</Dialog.Description></Dialog.Header><Dialog.Body><Text tone="secondary">This live example uses the published package.</Text></Dialog.Body><Dialog.Footer><Dialog.Close asChild><Button tone="neutral" variant="outline">Close</Button></Dialog.Close><Dialog.Close asChild><Button>Continue</Button></Dialog.Close></Dialog.Footer></Dialog.Content></Dialog.Portal></Dialog.Root>;
  }
  if (category === "Navigation & layout") {
    return <VStack gap="4"><Breadcrumb.Root><Breadcrumb.List><Breadcrumb.Item><Breadcrumb.Link href="/components/">Components</Breadcrumb.Link></Breadcrumb.Item><Breadcrumb.Separator /><Breadcrumb.Item><Breadcrumb.Page>{title}</Breadcrumb.Page></Breadcrumb.Item></Breadcrumb.List></Breadcrumb.Root><Tabs.Root defaultValue="overview" variant="soft"><Tabs.List ariaLabel={`${title} preview`}><Tabs.Trigger value="overview">Overview</Tabs.Trigger><Tabs.Trigger value="details">Details</Tabs.Trigger><Tabs.Indicator /></Tabs.List><Tabs.Content value="overview"><Card.Root size="sm" variant="subtle"><Card.Content>Structured composition that adapts from mobile outward.</Card.Content></Card.Root></Tabs.Content><Tabs.Content value="details"><Card.Root size="sm" variant="subtle"><Card.Content>Public parts, semantic tokens, and stable hooks.</Card.Content></Card.Root></Tabs.Content></Tabs.Root></VStack>;
  }
  if (category === "Data & collections") {
    return <Table.Container><Table.Root size="sm"><Table.Header><Table.Row><Table.Head>Surface</Table.Head><Table.Head>Status</Table.Head></Table.Row></Table.Header><Table.Body><Table.Row><Table.Head scope="row">{title}</Table.Head><Table.Cell><Badge tone="success"><Check size={12} /> Ready</Badge></Table.Cell></Table.Row><Table.Row><Table.Head scope="row">Responsive state</Table.Head><Table.Cell><Badge tone="accent">Covered</Badge></Table.Cell></Table.Row></Table.Body></Table.Root></Table.Container>;
  }
  if (category === "Content & status") {
    return <Card.Root className="preview-card"><Card.Header><Card.Title as="h3">{title}</Card.Title><Card.Description>A finished Brick content surface.</Card.Description><Card.Action><Badge tone="accent">New</Badge></Card.Action></Card.Header><Card.Content><Progress.Root value={72} size="sm" aria-label="Example progress"><Progress.Track><Progress.Indicator /></Progress.Track></Progress.Root></Card.Content></Card.Root>;
  }
  return <Card.Root size="sm" variant="subtle"><Card.Content><HStack gap="3" align="center"><Badge tone="accent" variant="outline">A11y</Badge><Text>{title} preserves meaning across input modes and visual preferences.</Text></HStack></Card.Content></Card.Root>;
}
