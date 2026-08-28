"use client";

import { useCallback, useEffect, useState, type ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@flowstack-ui/brick/button";
import { Dialog } from "@flowstack-ui/brick/dialog";
import { Drawer } from "@flowstack-ui/brick/drawer";
import { NavList } from "@flowstack-ui/brick/nav-list";
import { MarkGithubIcon } from "@primer/octicons-react";
import {
  ArrowRight,
  ArrowUpRight,
  Atom,
  Blocks,
  BookOpen,
  Home,
  Menu,
  Moon,
  Package,
  Palette,
  Search,
  Sun,
  X,
} from "lucide-react";
import { BrandMark } from "./BrandMark";
import { source } from "@/app/lib/source";

const nav = [
  { href: "/docs", label: "Guides" },
  { href: "/components", label: "Components" },
  { href: "/themes", label: "Themes" },
  { href: "/atom", label: "Atom" },
];

const drawerNav = [
  { href: "/", label: "Home", description: "See what Brick makes possible", icon: Home },
  { href: "/docs", label: "Guides", description: "Learn the system", icon: BookOpen },
  { href: "/components", label: "Components", description: "Explore all 89 component owners", icon: Blocks },
  { href: "/themes", label: "Themes", description: "Shape the visual voice", icon: Palette },
  { href: "/atom", label: "Atom", description: "Understand the foundation", icon: Atom },
];

type Appearance = "light" | "dark";

function applyAppearance(value: Appearance) {
  document.documentElement.dataset.brickAppearance = value;
  document.documentElement.style.colorScheme = value;
  localStorage.setItem("brick-website-appearance", value);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [SearchContent, setSearchContent] = useState<ComponentType | null>(null);

  const loadSearchContent = useCallback(() => {
    void import("./SiteSearchContent").then((module) => {
      setSearchContent(() => module.SiteSearchContent);
    });
  }, []);

  useEffect(() => {
    const openSearch = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        loadSearchContent();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", openSearch);
    return () => window.removeEventListener("keydown", openSearch);
  }, [loadSearchContent]);

  const toggleAppearance = () => {
    const current: Appearance = document.documentElement.dataset.brickAppearance === "dark" ? "dark" : "light";
    const next: Appearance = current === "light" ? "dark" : "light";
    applyAppearance(next);
  };

  return (
    <header className="site-header">
      <Link className="brand-link" href="/">
        <BrandMark />
        <span className="version-pill">v{source.version}</span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {nav.map((item) => (
          <a key={item.href} href={item.href}>{item.label}</a>
        ))}
      </nav>

      <div className="header-actions">
        <Dialog.Root
          open={searchOpen}
          onOpenChange={(open) => {
            if (open) loadSearchContent();
            setSearchOpen(open);
          }}
        >
          <Dialog.Trigger asChild>
            <Button
              aria-label="Search ⌘K"
              aria-keyshortcuts="Meta+K Control+K"
              className="search-trigger"
              tone="neutral"
              variant="soft"
              size="sm"
              onFocus={loadSearchContent}
              onPointerEnter={loadSearchContent}
              startIcon={<Search size={15} aria-hidden="true" />}
            >
              Search <kbd className="shortcut" aria-hidden="true">⌘K</kbd>
            </Button>
          </Dialog.Trigger>
          {searchOpen && SearchContent ? <SearchContent /> : null}
        </Dialog.Root>

        <div className="header-icon-actions">
          <Button
            aria-label="Toggle color appearance"
            className="icon-action"
            tone="neutral"
            variant="ghost"
            size="sm"
            onPress={toggleAppearance}
          >
            <span className="appearance-icon appearance-icon-light"><Moon size={17} aria-hidden="true" /></span>
            <span className="appearance-icon appearance-icon-dark"><Sun size={17} aria-hidden="true" /></span>
          </Button>

          <Button
            aria-label="Brick on GitHub"
            className="icon-action github-action"
            href="https://github.com/flowstack-ui/brick"
            target="_blank"
            rel="noreferrer"
            tone="neutral"
            variant="ghost"
            size="sm"
          >
            <MarkGithubIcon size={17} aria-hidden="true" />
          </Button>

          <Drawer.Root>
            <Drawer.Trigger asChild>
              <Button aria-label="Open navigation" className="mobile-menu-trigger" tone="neutral" variant="ghost" size="sm">
                <Menu size={19} aria-hidden="true" />
              </Button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay />
              <Drawer.Content placement="end" size="md" className="mobile-drawer">
                <Drawer.Header className="mobile-drawer-header">
                  <div className="drawer-brand-row">
                    <Drawer.Close asChild>
                      <Link className="drawer-brand" href="/">
                        <BrandMark />
                        <span className="drawer-version">v{source.version}</span>
                      </Link>
                    </Drawer.Close>
                    <Drawer.Close asChild>
                      <Button aria-label="Close navigation" className="drawer-close" tone="neutral" variant="ghost" size="md">
                        <X size={19} aria-hidden="true" />
                      </Button>
                    </Drawer.Close>
                  </div>
                  <span className="drawer-kicker">Finished by default</span>
                  <Drawer.Title>Build interfaces from pieces that belong together.</Drawer.Title>
                  <Drawer.Description>Explore the component system, its visual language, and the accessible foundation beneath it.</Drawer.Description>
                </Drawer.Header>
                <Drawer.Body className="mobile-drawer-body">
                  <div className="drawer-nav-group">
                    <span className="drawer-nav-label">Explore</span>
                    <NavList.Root aria-label="Mobile navigation" className="drawer-primary-nav" size="lg" tone="accent" variant="soft">
                      <NavList.List>
                        {drawerNav.map(({ href, label, description, icon: Icon }) => (
                          <NavList.Item key={href}>
                            <Drawer.Close asChild>
                              <NavList.Link
                                active={href === "/" ? pathname === "/" : pathname.startsWith(href)}
                                description={description}
                                href={href}
                                startIcon={<Icon aria-hidden="true" />}
                              >
                                {label}
                              </NavList.Link>
                            </Drawer.Close>
                          </NavList.Item>
                        ))}
                      </NavList.List>
                    </NavList.Root>
                  </div>

                  <div className="drawer-nav-group drawer-resource-group">
                    <span className="drawer-nav-label">Resources</span>
                    <NavList.Root aria-label="Brick resources" className="drawer-resource-nav" size="md" tone="neutral" variant="soft">
                      <NavList.List>
                        <NavList.Item>
                          <NavList.Link
                            endIcon={<ArrowUpRight aria-hidden="true" />}
                            href="https://github.com/flowstack-ui/brick"
                            startIcon={<MarkGithubIcon aria-hidden="true" />}
                            target="_blank"
                            rel="noreferrer"
                          >
                            GitHub repository
                          </NavList.Link>
                        </NavList.Item>
                        <NavList.Item>
                          <NavList.Link
                            endIcon={<ArrowUpRight aria-hidden="true" />}
                            href="https://www.npmjs.com/package/@flowstack-ui/brick"
                            startIcon={<Package aria-hidden="true" />}
                            target="_blank"
                            rel="noreferrer"
                          >
                            npm package
                          </NavList.Link>
                        </NavList.Item>
                      </NavList.List>
                    </NavList.Root>
                  </div>
                </Drawer.Body>
                <Drawer.Footer className="mobile-drawer-footer">
                  <p className="drawer-proof"><span>89 components</span><span>React 18 + 19</span><span>Static CSS</span></p>
                  <Drawer.Close asChild>
                    <Button href="/docs/getting-started" endIcon={<ArrowRight size={17} />} fullWidth>Get started</Button>
                  </Drawer.Close>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </div>
    </header>
  );
}
