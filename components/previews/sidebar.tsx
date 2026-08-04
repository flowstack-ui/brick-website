"use client";

import "../../app/.generated/previews/sidebar.css";

import { Badge } from "@flowstack-ui/brick/badge";

import { NavList } from "@flowstack-ui/brick/nav-list";
import { Sidebar } from "@flowstack-ui/brick/sidebar";
import { Surface } from "@flowstack-ui/brick/surface";
import { Text } from "@flowstack-ui/brick/text";

import { Home, Inbox, Menu, Settings } from "lucide-react";

export default function SidebarPreview() {
  return <Sidebar.Root className="preview-sidebar" collapsedState="offcanvas"><Sidebar.Panel aria-label="Northstar workspace"><Sidebar.Header><span className="preview-sidebar-brand"><span aria-hidden="true">N</span><Text weight="semibold">Northstar</Text></span></Sidebar.Header><Sidebar.Content><NavList.Root aria-label="Workspace navigation" size="sm" tone="neutral"><NavList.List><NavList.Item><NavList.Link active href="#overview" startIcon={<Home size={15} />}>Overview</NavList.Link></NavList.Item><NavList.Item><NavList.Link href="#inbox" startIcon={<Inbox size={15} />}>Inbox</NavList.Link></NavList.Item><NavList.Item><NavList.Link href="#settings" startIcon={<Settings size={15} />}>Settings</NavList.Link></NavList.Item></NavList.List></NavList.Root></Sidebar.Content><Sidebar.Footer><Badge tone="success" variant="soft">v0.1.0</Badge></Sidebar.Footer></Sidebar.Panel><Sidebar.Main asChild><section className="preview-sidebar-main"><div className="preview-sidebar-toolbar"><Sidebar.Trigger aria-label="Toggle workspace sidebar"><Menu size={17} /></Sidebar.Trigger><Badge tone="accent" variant="outline">Live</Badge></div><div><Text as="h3" variant="title-sm">Project overview</Text><Text as="p" tone="secondary" variant="body-sm">A finished shell with coordinated navigation and content.</Text></div><div className="preview-sidebar-metrics"><Surface bordered inset="sm"><Text weight="semibold">12</Text><Text tone="secondary" variant="caption">Pages</Text></Surface><Surface bordered inset="sm"><Text weight="semibold">Ready</Text><Text tone="secondary" variant="caption">Status</Text></Surface></div></section></Sidebar.Main></Sidebar.Root>;
}
