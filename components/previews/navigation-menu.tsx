"use client";

import "../../app/.generated/previews/navigation-menu.css";

import { NavigationMenu } from "@flowstack-ui/brick/navigation-menu";
import { Text } from "@flowstack-ui/brick/text";

export default function NavigationMenuPreview() {
  return <NavigationMenu.Root aria-label="Example product navigation" className="preview-navigation-menu"><NavigationMenu.List><NavigationMenu.Item value="guides"><NavigationMenu.Trigger>Guides</NavigationMenu.Trigger><NavigationMenu.Content><div className="preview-navigation-panel"><NavigationMenu.Link href="#navigation-menu-preview" onClick={(event) => event.preventDefault()}><Text weight="semibold">Getting started</Text><Text as="p" tone="secondary" variant="body-sm">Install Brick and compose the first interface.</Text></NavigationMenu.Link><NavigationMenu.Link href="#navigation-menu-preview" onClick={(event) => event.preventDefault()}><Text weight="semibold">Theming</Text><Text as="p" tone="secondary" variant="body-sm">Change expression without changing behavior.</Text></NavigationMenu.Link></div></NavigationMenu.Content></NavigationMenu.Item><NavigationMenu.Item value="components"><NavigationMenu.Trigger>Components</NavigationMenu.Trigger><NavigationMenu.Content><div className="preview-navigation-panel"><NavigationMenu.Link href="#navigation-menu-preview" onClick={(event) => event.preventDefault()}><Text weight="semibold">Actions</Text><Text as="p" tone="secondary" variant="body-sm">Buttons, toggles, and toolbars.</Text></NavigationMenu.Link><NavigationMenu.Link href="#navigation-menu-preview" onClick={(event) => event.preventDefault()}><Text weight="semibold">Overlays</Text><Text as="p" tone="secondary" variant="body-sm">Dialogs, drawers, and popovers.</Text></NavigationMenu.Link></div></NavigationMenu.Content></NavigationMenu.Item><NavigationMenu.Indicator /></NavigationMenu.List><NavigationMenu.Viewport id="navigation-menu-preview" /></NavigationMenu.Root>;
}
