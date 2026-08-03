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
import { BrandMark } from "./BrandMark";
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

const workspaceSections = [
  { id: "pages", label: "Pages", title: "Pages", description: "Shape the structure of your site.", icon: FileText },
  { id: "content", label: "Content", title: "Content", description: "Review the copy shared across your pages.", icon: Circle },
  { id: "theme", label: "Theme", title: "Theme", description: "Tune the visual direction of Northstar.", icon: Sparkles },
  { id: "settings", label: "Settings", title: "Settings", description: "Control publishing and project behavior.", icon: Settings2 },
] as const;

type WorkspaceSection = (typeof workspaceSections)[number]["id"];

export function ProductWorkspace() {
  const [query, setQuery] = useState("");
  const [autoPublish, setAutoPublish] = useState(true);
  const [activeSection, setActiveSection] = useState<WorkspaceSection>("pages");

  const filteredPages = pages.filter((page) => page.name.toLowerCase().includes(query.toLowerCase()));
  const currentSection = workspaceSections.find((section) => section.id === activeSection) ?? workspaceSections[0];

  return (
    <section className="workspace-window" aria-label="Live Brick website project workspace example">
      <div className="workspace-titlebar">
        <BrandMark compact />
        <Badge tone="accent" variant="soft" size="sm">Live composition</Badge>
        <Avatar className="workspace-owner" alt="Will Donin, project owner" fallback="WD" size="sm" status="online" />
      </div>

      <div className="workspace-body">
        <aside className="workspace-sidebar">
          <div className="workspace-project">
            <span className="project-glyph"><LayoutGrid size={15} aria-hidden="true" /></span>
            <span><strong>Northstar</strong><small>Website project</small></span>
          </div>
          <nav aria-label="Workspace example navigation">
            {workspaceSections.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                className="workspace-nav-button"
                fullWidth
                size="xs"
                tone={activeSection === id ? "accent" : "neutral"}
                variant={activeSection === id ? "soft" : "ghost"}
                startIcon={<Icon size={15} aria-hidden="true" />}
                aria-pressed={activeSection === id}
                onPress={() => setActiveSection(id)}
              >
                {label}
              </Button>
            ))}
          </nav>
          <div className="sidebar-meter">
            <HStack justify="between" align="center"><Text variant="caption">Launch readiness</Text><Text variant="caption" weight="medium">84%</Text></HStack>
            <Progress.Root value={84} size="sm" aria-label="Launch readiness">
              <Progress.Track><Progress.Indicator /></Progress.Track>
            </Progress.Root>
          </div>
        </aside>

        <div className="workspace-main" id="workspace-pages">
          <div className="workspace-toolbar">
            <div>
              <Text as="h2" variant="title-sm">{currentSection.title}</Text>
              <Text tone="secondary" variant="body-sm">{currentSection.description}</Text>
            </div>
            <HStack gap="2">
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button tone="neutral" variant="outline" size="sm" startIcon={<Globe2 size={15} />}>Preview</Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay />
                  <Dialog.Content size="sm" className="workspace-dialog">
                    <Dialog.Header className="workspace-dialog-header">
                      <span className="workspace-dialog-icon"><Globe2 size={18} aria-hidden="true" /></span>
                      <div className="workspace-dialog-copy">
                        <Dialog.Title>Northstar preview</Dialog.Title>
                        <Dialog.Description>The latest approved content and theme are ready to inspect.</Dialog.Description>
                      </div>
                    </Dialog.Header>
                    <Dialog.Body>
                      <div className="workspace-preview-summary">
                        <div className="workspace-preview-address" aria-hidden="true"><span /><span>northstar.site</span></div>
                        <div className="workspace-preview-details">
                          <div><Text weight="semibold">3 pages ready</Text><Text variant="body-sm" tone="secondary">Home, Services, and Journal</Text></div>
                          <div><Text weight="semibold">Theme applied</Text><Text variant="body-sm" tone="secondary">Architectural warmth</Text></div>
                        </div>
                      </div>
                    </Dialog.Body>
                    <Dialog.Footer><Dialog.Close asChild><Button>Done</Button></Dialog.Close></Dialog.Footer>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
              <Dialog.Root>
                <Dialog.Trigger asChild>
                  <Button size="sm" startIcon={<Sparkles size={15} />}>Publish</Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay />
                  <Dialog.Content size="sm" className="workspace-dialog">
                    <Dialog.Header className="workspace-dialog-header">
                      <span className="workspace-dialog-icon"><Sparkles size={18} aria-hidden="true" /></span>
                      <div className="workspace-dialog-copy">
                        <Dialog.Title>Ready to publish</Dialog.Title>
                        <Dialog.Description>Northstar has passed its launch checks.</Dialog.Description>
                      </div>
                    </Dialog.Header>
                    <Dialog.Body>
                      <ul className="workspace-publish-checklist">
                        <li><span><Check size={14} aria-hidden="true" /></span><div><Text weight="medium">Content approved</Text><Text variant="body-sm" tone="secondary">Three pages are ready.</Text></div></li>
                        <li><span><Check size={14} aria-hidden="true" /></span><div><Text weight="medium">Theme connected</Text><Text variant="body-sm" tone="secondary">All semantic tokens resolve.</Text></div></li>
                        <li><span><Check size={14} aria-hidden="true" /></span><div><Text weight="medium">Editing stays open</Text><Text variant="body-sm" tone="secondary">You can continue after publishing.</Text></div></li>
                      </ul>
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

          {activeSection === "pages" ? <><Tabs.Root defaultValue="all" variant="soft" size="sm">
            <div className="workspace-filter-row">
              <Tabs.List ariaLabel="Page status">
                <Tabs.Trigger value="all">All</Tabs.Trigger>
                <Tabs.Trigger value="ready">Ready</Tabs.Trigger>
                <Tabs.Trigger value="draft">Draft</Tabs.Trigger>
                <Tabs.Indicator />
              </Tabs.List>
              <Input
                aria-label="Filter example pages"
                autoComplete="off"
                id="workspace-page-filter"
                name="workspace-page-filter"
                value={query}
                onChange={(event) => setQuery(event.currentTarget.value)}
                placeholder="Filter pages"
                size="sm"
                type="search"
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
                <Card.Title as="h3">Theme direction</Card.Title>
                <Card.Description>Architectural warmth</Card.Description>
              </Card.Header>
              <Card.Content>
                <div className="swatch-row" role="img" aria-label="Theme colors: iris purple, muted magenta, amber, and green"><span /><span /><span /><span /></div>
              </Card.Content>
            </Card.Root>
            <Card.Root size="sm" variant="outline" className="auto-publish-card">
              <Card.Header>
                <HStack className="auto-publish-heading" align="center" justify="between">
                  <Card.Title as="h3">Auto publish</Card.Title>
                  <Switch.Root checked={autoPublish} onCheckedChange={setAutoPublish} aria-label="Auto publish"><Switch.Thumb /></Switch.Root>
                </HStack>
                <Card.Description>Deploy after every approved update.</Card.Description>
              </Card.Header>
              <Card.Footer><Button tone="neutral" variant="soft" size="xs" endIcon={<ChevronRight size={13} />} onPress={() => setActiveSection("settings")}>Open settings</Button></Card.Footer>
            </Card.Root>
          </div>
          </> : (
            <Card.Root size="sm" variant="subtle" className="workspace-section-card">
              <Card.Header>
                <Badge tone="accent" variant="soft" size="sm">{currentSection.label} view</Badge>
                <Card.Title as="h3">
                  {activeSection === "content" && "Three reusable entries are connected"}
                  {activeSection === "theme" && "Architectural warmth"}
                  {activeSection === "settings" && "Publishing preferences"}
                </Card.Title>
                <Card.Description>
                  {activeSection === "content" && "Homepage intro, services summary, and journal metadata stay consistent across the project."}
                  {activeSection === "theme" && "Iris purple, muted magenta, amber, and green form Northstar’s current semantic palette."}
                  {activeSection === "settings" && "Choose whether approved changes should publish automatically."}
                </Card.Description>
              </Card.Header>
              <Card.Content>
                {activeSection === "content" && <HStack gap="2" wrap><Badge tone="success">Homepage ready</Badge><Badge tone="neutral">3 entries</Badge></HStack>}
                {activeSection === "theme" && <div className="swatch-row" role="img" aria-label="Theme colors: iris purple, muted magenta, amber, and green"><span /><span /><span /><span /></div>}
                {activeSection === "settings" && <HStack justify="between" align="center"><Text weight="medium">Auto publish</Text><Switch.Root checked={autoPublish} onCheckedChange={setAutoPublish} aria-label="Auto publish from settings"><Switch.Thumb /></Switch.Root></HStack>}
              </Card.Content>
            </Card.Root>
          )}
        </div>
      </div>

      <div className="workspace-mobile-card">
        <HStack justify="between" align="center">
          <VStack gap="1"><Text variant="caption" tone="secondary">Northstar · demo project</Text><Text weight="semibold">Responsive launch overview</Text></VStack>
          <Avatar alt="Will Donin" fallback="WD" size="sm" status="online" />
        </HStack>
        <Divider />
        <Stack gap="3">
          <Text variant="body-sm" tone="secondary">A compact website-project view assembled from Brick components.</Text>
          <HStack justify="between"><Text tone="secondary">Pages ready</Text><Badge tone="success">2 of 3</Badge></HStack>
          <Progress.Root value={84} size="sm" aria-label="Mobile launch readiness"><Progress.Track><Progress.Indicator /></Progress.Track></Progress.Root>
          <Button href="/components/" fullWidth endIcon={<ArrowRight size={15} />}>Explore the components</Button>
        </Stack>
      </div>
    </section>
  );
}
