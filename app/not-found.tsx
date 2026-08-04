import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@flowstack-ui/brick/badge";
import { Text } from "@flowstack-ui/brick/text";
import { ArrowLeft, ArrowRight, Blocks, BookOpen, Palette } from "lucide-react";
import { WebsiteButton } from "@/app/components/WebsiteButton";
import { notFoundMetadata } from "@/app/lib/seo";

export const metadata: Metadata = notFoundMetadata;

const recoveryLinks = [
  { href: "/docs", label: "Read the guides", icon: BookOpen },
  { href: "/components", label: "Browse components", icon: Blocks },
  { href: "/themes", label: "Explore themes", icon: Palette },
];

export default function NotFound() {
  return (
    <main id="main-content" className="not-found section-shell">
      <section className="not-found-panel" aria-labelledby="not-found-title">
        <div className="not-found-visual" aria-hidden="true">
          <div className="not-found-coordinate"><span>route</span><strong>404</strong></div>
          <div className="not-found-wall">
            <span /><span /><span />
            <span /><span className="is-missing" /><span />
            <span /><span /><span />
          </div>
          <div className="not-found-status"><span className="not-found-status-dot" />One piece is out of place</div>
        </div>

        <div className="not-found-copy">
          <Badge tone="accent" variant="soft">404 · Missing route</Badge>
          <Text as="h1" id="not-found-title" variant="display" wrap="balance">
            This piece is not in the wall.
          </Text>
          <Text as="p" variant="body-lg" tone="secondary" wrap="pretty">
            The page may have moved, the address may be incomplete, or this
            part has not been built yet. The rest of Brick is still right where
            it belongs.
          </Text>
          <div className="not-found-actions">
            <WebsiteButton href="/" startIcon={<ArrowLeft size={16} />}>Back home</WebsiteButton>
            <WebsiteButton href="/components" tone="neutral" variant="soft" endIcon={<ArrowRight size={16} />}>Explore components</WebsiteButton>
          </div>
          <nav className="not-found-links" aria-label="Continue exploring Brick UI">
            {recoveryLinks.map(({ href, label, icon: Icon }) => (
              <Link href={href} key={href}>
                <Icon size={16} aria-hidden="true" />
                <span>{label}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </main>
  );
}
