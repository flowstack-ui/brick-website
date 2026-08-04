"use client";

import "../../app/.generated/previews/nav-list.css";

import { NavList } from "@flowstack-ui/brick/nav-list";

export default function NavListPreview() {
  return <NavList.Root aria-label="Settings"><NavList.List><NavList.Item><NavList.Link active href="#profile">Profile</NavList.Link></NavList.Item><NavList.Item><NavList.Link href="#security">Security</NavList.Link></NavList.Item><NavList.Item><NavList.Link href="#billing">Billing</NavList.Link></NavList.Item></NavList.List></NavList.Root>;
}
