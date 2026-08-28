import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { source } from "@/app/lib/source";

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
        <Link href="/docs/getting-started"><span className="footer-link-label">Get started</span></Link>
        <Link href="/components"><span className="footer-link-label">Components</span></Link>
        <Link href="/blocks"><span className="footer-link-label">Blocks</span></Link>
        <Link href="/themes"><span className="footer-link-label">Themes</span></Link>
        <a href="https://atom-ui.com/"><span className="footer-link-label">Atom <ArrowUpRight size={13} aria-hidden="true" /></span></a>
        <a href="https://www.npmjs.com/package/@flowstack-ui/brick"><span className="footer-link-label">npm <ArrowUpRight size={13} aria-hidden="true" /></span></a>
        <a href="https://github.com/flowstack-ui/brick"><span className="footer-link-label">GitHub <ArrowUpRight size={13} aria-hidden="true" /></span></a>
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
