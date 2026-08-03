import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "./BrandMark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <BrandMark />
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
      <p className="footer-meta">MIT licensed · Built with Brick</p>
    </footer>
  );
}
