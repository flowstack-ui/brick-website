"use client";

import { useState } from "react";
import { Avatar } from "@flowstack-ui/brick/avatar";
import { Badge } from "@flowstack-ui/brick/badge";
import { Button } from "@flowstack-ui/brick/button";
import { Card } from "@flowstack-ui/brick/card";
import { Dialog } from "@flowstack-ui/brick/dialog";
import { Divider } from "@flowstack-ui/brick/divider";
import { Input } from "@flowstack-ui/brick/input";
import { Progress } from "@flowstack-ui/brick/progress";
import { HStack, Stack, VStack } from "@flowstack-ui/brick/stack";
import { Switch } from "@flowstack-ui/brick/switch";
import { Table } from "@flowstack-ui/brick/table";
import { Tabs } from "@flowstack-ui/brick/tabs";
import { Text } from "@flowstack-ui/brick/text";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Circle,
  FileText,
  Globe2,
  LayoutGrid,
  MoreHorizontal,
  Search,
  Settings2,
  Sparkles,
} from "lucide-react";

const pages = [
  { name: "Home", status: "Published", owner: "WD", updated: "2m" },
  { name: "Services", status: "Ready", owner: "AN", updated: "18m" },
  { name: "Journal", status: "Draft", owner: "MK", updated: "1h" },
];

export function ProductWorkspace() {
  const [query, setQuery] = useState("");
  const [autoPublish, setAutoPublish] = useState(true);

  const filteredPages = pages.filter((page) => page.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="workspace-window" aria-label="Live Brick website project workspace example">
      <div className="workspace-titlebar">
        <div className="window-controls" aria-hidden="true"><span /><span /><span /></div>
        <Badge tone="accent" variant="soft" size="sm">Live composition</Badge>
        <HStack gap="2" align="center" className="workspace-presence">
          <Avatar alt="Will Donin" fallback="WD" size="xs" status="online" />
          <Avatar alt="Alex Nguyen" fallback="AN" size="xs" />
        </HStack>
      </div>

      <div className="workspace-body">
        <aside className="workspace-sidebar">
          <div className="workspace-project">
            <span className="project-glyph"><LayoutGrid size={15} aria-hidden="true" /></span>
            <span><strong>Northstar</strong><small>Website project</small></span>
          </div>
          <nav aria-label="Workspace example navigation">
            <a className="is-current" href="#workspace-pages"><FileText size={15} aria-hidden="true" />Pages</a>
            <a href="#workspace-content"><Circle size={15} aria-hidden="true" />Content</a>
            <a href="#workspace-theme"><Sparkles size={15} aria-hidden="true" />Theme</a>
            <a href="#workspace-settings"><Settings2 size={15} aria-hidden="true" />Settings</a>
          </nav>
          <div className="sidebar-meter">
            <HStack justify="between" align="center"><Text variant="caption">Launch readiness</Text><Text variant="caption" weight="medium">84%</Text></HStack>
            <Progress.Root value={84} size="sm" aria-label="Launch readiness">
              <Progress.Track><Progress.Indicator /></Progress.Track>
            </Progress.Root>
          </div>
        </aside>

        <main className="workspace-main" id="workspace-pages">
          <div className="workspace-toolbar">
            <div>
              <Text as="h3" variant="title-sm">Pages</Text>
              <Text tone="secondary" variant="body-sm">Shape the structure of your site.</Text>
            </div>
            <HStack gap="2">
              <Button tone="neutral" variant="outline" size="sm" startIcon={<Globe2 size={15} />}>Preview</Button>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button size="sm" startIcon={<Sparkles size={15} />}>Publish</Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay />
                  <Dialog.Content size="sm">
                    <Dialog.Header>
                      <Dialog.Title>Ready to publish</Dialog.Title>
                      <Dialog.Description>Three pages are ready for the live site.</Dialog.Description>
                    </Dialog.Header>
                    <Dialog.Body>
                      <VStack gap="3">
                        <Badge tone="success" variant="soft"><Check size={13} aria-hidden="true" /> Checks passed</Badge>
                        <Text tone="secondary">The site will remain editable after publishing.</Text>
                      </VStack>
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.Close asChild><Button tone="neutral" variant="outline">Not yet</Button></Dialog.Close>
                      <Dialog.Close asChild><Button>Publish site</Button></Dialog.Close>
                    </Dialog.Footer>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </HStack>
          </div>

          <Tabs.Root defaultValue="all" variant="soft" size="sm">
            <div className="workspace-filter-row">
              <Tabs.List ariaLabel="Page status">
                <Tabs.Trigger value="all">All</Tabs.Trigger>
                <Tabs.Trigger value="ready">Ready</Tabs.Trigger>
                <Tabs.Trigger value="draft">Draft</Tabs.Trigger>
                <Tabs.Indicator />
              </Tabs.List>
              <Input
                aria-label="Filter example pages"
                value={query}
                onChange={(event) => setQuery(event.currentTarget.value)}
                placeholder="Filter pages"
                size="sm"
                startAdornment={<Search size={14} aria-hidden="true" />}
                clearable
                onClear={() => setQuery("")}
              />
            </div>
            <Tabs.Content value="all">
              <Table.Container className="workspace-table">
                <Table.Root size="sm" density="comfortable">
                  <Table.Header>
                    <Table.Row><Table.Head>Page</Table.Head><Table.Head>Status</Table.Head><Table.Head>Owner</Table.Head><Table.Head align="end">Updated</Table.Head><Table.Head><span className="sr-only">Actions</span></Table.Head></Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {filteredPages.map((page) => (
                      <Table.Row key={page.name}>
                        <Table.Head scope="row"><HStack gap="2" align="center"><span className="page-icon"><FileText size={14} /></span>{page.name}</HStack></Table.Head>
                        <Table.Cell><Badge size="sm" tone={page.status === "Draft" ? "warning" : page.status === "Published" ? "accent" : "success"}>{page.status}</Badge></Table.Cell>
                        <Table.Cell><Avatar alt={`${page.owner} owner`} fallback={page.owner} size="xs" /></Table.Cell>
                        <Table.Cell align="end" numeric>{page.updated}</Table.Cell>
                        <Table.Cell align="end"><Button aria-label={`Open ${page.name}`} tone="neutral" variant="ghost" size="xs"><MoreHorizontal size={15} /></Button></Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </Table.Container>
            </Tabs.Content>
            <Tabs.Content value="ready"><Card.Root variant="subtle" size="sm"><Card.Content>Home and Services are ready to publish.</Card.Content></Card.Root></Tabs.Content>
            <Tabs.Content value="draft"><Card.Root variant="subtle" size="sm"><Card.Content>Journal is still being shaped.</Card.Content></Card.Root></Tabs.Content>
          </Tabs.Root>

          <div className="workspace-bottom-grid">
            <Card.Root size="sm" variant="subtle">
              <Card.Header>
                <Card.Title as="h4">Theme direction</Card.Title>
                <Card.Description>Architectural warmth</Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="swatch-row" role="img" aria-label="Theme colors: iris purple, muted magenta, amber, and green"><span /><span /><span /><span /></div>
              </Card.Content>
            </Card.Root>
            <Card.Root size="sm" variant="outline">
              <Card.Header>
                <Card.Title as="h4">Auto publish</Card.Title>
                <Card.Action><Switch.Root checked={autoPublish} onCheckedChange={setAutoPublish} aria-label="Auto publish"><Switch.Thumb /></Switch.Root></Card.Action>
                <Card.Description>Deploy after every approved update.</Card.Description>
              </Card.Header>
              <Card.Footer><Button tone="neutral" variant="ghost" size="sm" endIcon={<ChevronRight size={14} />}>Open settings</Button></Card.Footer>
            </Card.Root>
          </div>
        </main>
      </div>

      <div className="workspace-mobile-card">
        <HStack justify="between" align="center">
          <VStack gap="1"><Text variant="caption" tone="secondary">Northstar</Text><Text weight="semibold">Launch overview</Text></VStack>
          <Avatar alt="Will Donin" fallback="WD" size="sm" status="online" />
        </HStack>
        <Divider />
        <Stack gap="3">
          <HStack justify="between"><Text tone="secondary">Pages ready</Text><Badge tone="success">2 of 3</Badge></HStack>
          <Progress.Root value={84} size="sm" aria-label="Mobile launch readiness"><Progress.Track><Progress.Indicator /></Progress.Track></Progress.Root>
          <Button fullWidth endIcon={<ArrowRight size={15} />}>Review launch</Button>
        </Stack>
      </div>
    </div>
  );
}
