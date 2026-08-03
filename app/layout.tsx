import type { Metadata } from "next";
import "@flowstack-ui/brick/reset.css";
import "@flowstack-ui/brick/styles.css";
import "./globals.css";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://brick-ui.com"),
  title: {
    default: "Brick UI — Finished React components",
    template: "%s · Brick UI",
  },
  description: "Finished, accessible React components built on Flowstack Atom. Coherent defaults, semantic theming, and public customization hooks.",
  openGraph: {
    type: "website",
    siteName: "Brick UI",
    title: "Brick UI — Finished React components",
    description: "Build interfaces that already feel finished.",
    images: [{ url: "/brick-social-card.png", width: 1200, height: 630, alt: "Brick UI modular component surfaces" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brick UI — Finished React components",
    description: "Build interfaces that already feel finished.",
    images: ["/brick-social-card.png"],
  },
};

const appearanceScript = `
  (() => {
    try {
      const saved = localStorage.getItem("brick-website-appearance");
      const value = saved === "light" || saved === "dark"
        ? saved
        : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.dataset.brickAppearance = value;
      document.documentElement.style.colorScheme = value;
    } catch {}
  })();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-brick-theme="studio" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script dangerouslySetInnerHTML={{ __html: appearanceScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div className="site-canvas">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
