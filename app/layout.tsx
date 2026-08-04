import type { Metadata } from "next";
import "./.generated/brick-shell.css";
import { Analytics } from "@vercel/analytics/next";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { rootMetadata } from "./lib/seo";

export const metadata: Metadata = rootMetadata;

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
        {process.env.VERCEL === "1" ? <Analytics /> : null}
      </body>
    </html>
  );
}
