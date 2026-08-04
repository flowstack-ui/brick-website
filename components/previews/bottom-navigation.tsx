"use client";

import { BottomNavigation } from "@flowstack-ui/brick/bottom-navigation";
import { Icon } from "@flowstack-ui/brick/icon";
import { Home, Inbox, Settings } from "lucide-react";

export default function BottomNavigationPreview() {
  return <BottomNavigation.Root ariaLabel="Preview navigation" defaultValue="home"><BottomNavigation.Item href="#home" value="home"><BottomNavigation.Icon><Icon><Home /></Icon></BottomNavigation.Icon><BottomNavigation.Label>Home</BottomNavigation.Label></BottomNavigation.Item><BottomNavigation.Item href="#inbox" value="inbox"><BottomNavigation.Icon><Icon><Inbox /></Icon></BottomNavigation.Icon><BottomNavigation.Label>Inbox</BottomNavigation.Label></BottomNavigation.Item><BottomNavigation.Item href="#settings" value="settings"><BottomNavigation.Icon><Icon><Settings /></Icon></BottomNavigation.Icon><BottomNavigation.Label>Settings</BottomNavigation.Label></BottomNavigation.Item></BottomNavigation.Root>;
}
