import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { source } from "@/app/lib/content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <div className="footer-brand-heading">
          <BrandMark />
          <span className="version-pill footer-version">v{source.version}</span>
        </div>
        <p>Finished React components, built on accessible foundations.</p>
      </div>
      <div className="footer-links">
        <Link href="/docs/getting-started/">Get started</Link>
        <Link href="/components/">Components</Link>
        <Link href="/themes/">Themes</Link>
        <a href="https://atom-ui.com/">Atom <ArrowUpRight size={13} aria-hidden="true" /></a>
        <a href="https://www.npmjs.com/package/@flowstack-ui/brick">npm <ArrowUpRight size={13} aria-hidden="true" /></a>
        <a href="https://github.com/flowstack-ui/brick">GitHub <ArrowUpRight size={13} aria-hidden="true" /></a>
      </div>
      <div className="footer-meta">
        <p className="footer-endorsement">
          <span>Part of <a href="https://github.com/flowstack-ui">Flowstack</a></span>
          <span aria-hidden="true">·</span>
          <span>A <a href="https://swifty.us/">Swifty</a> product</span>
        </p>
        <p className="footer-legal">MIT licensed · Built with Brick · © 2026 Swifty LLC</p>
      </div>
    </footer>
  );
}
