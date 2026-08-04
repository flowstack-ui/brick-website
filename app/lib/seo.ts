import type { Metadata } from "next";
import source from "@/content/brick-source.json";

export const siteOrigin = "https://brick-ui.com";
export const siteName = "Brick UI";
export const socialImagePath = "/brick-social-card.jpg";
const socialImageAlt = "Brick UI components arranged as a finished interface system";

export const homepageDescription =
  "Finished, accessible React components built on Flowstack Atom, with coherent defaults, semantic theming, and public customization hooks.";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
};

export function canonicalPath(path: string) {
  if (!path || path === "/") return "/";
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return withLeadingSlash.replace(/\/+$/, "");
}

export function absoluteUrl(path: string) {
  return new URL(canonicalPath(path), siteOrigin).toString();
}

function socialTitle(title: string) {
  return title.includes(siteName) ? title : `${title} · ${siteName}`;
}

function sharedMetadata({ title, description, path }: PageMetadata): Metadata {
  const canonical = canonicalPath(path);
  const socialImage = absoluteUrl(socialImagePath);
  return {
    description,
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName,
      title: socialTitle(title),
      description,
      url: absoluteUrl(canonical),
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: socialImageAlt,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle(title),
      description,
      images: [{ url: socialImage, alt: socialImageAlt }],
    },
  };
}

export function createPageMetadata(input: PageMetadata): Metadata {
  return { title: input.title, ...sharedMetadata(input) };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  applicationName: siteName,
  creator: "Swifty LLC",
  publisher: "Swifty LLC",
  title: {
    default: "Brick UI — Finished React components",
    template: "%s · Brick UI",
  },
  ...sharedMetadata({
    title: "Brick UI — Finished React components",
    description: homepageDescription,
    path: "/",
  }),
};

export function createComponentMetadata(component: {
  slug: string;
  title: string;
}): Metadata {
  return createPageMetadata({
    title: `React ${component.title} component`,
    description: `Build with Brick UI's finished ${component.title} component for React. Explore practical usage, API details, styling, and accessibility guidance.`,
    path: `/components/${component.slug}`,
  });
}

const guideTitles: Record<string, string> = {
  "getting-started": "Getting started with Brick",
  theming: "Theming Brick components",
  accessibility: "Accessibility in Brick",
  composition: "Composing interfaces with Brick",
};

export function createGuideMetadata(
  slug: string,
  guide: { title: string; description: string },
): Metadata {
  return createPageMetadata({
    title: guideTitles[slug] ?? guide.title,
    description: guide.description,
    path: `/docs/${slug}`,
  });
}

export const notFoundMetadata: Metadata = {
  title: "Page not found",
  description: "The requested Brick UI page could not be found. Return home or continue with the component catalog and guides.",
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
  robots: { index: false, follow: false, nocache: true },
};

export const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://swifty.us/#organization",
      name: "Swifty LLC",
      legalName: "Swifty LLC",
      url: "https://swifty.us/",
    },
    {
      "@type": "WebSite",
      "@id": `${siteOrigin}/#website`,
      url: `${siteOrigin}/`,
      name: siteName,
      alternateName: "Brick",
      description: homepageDescription,
      inLanguage: "en-US",
      publisher: { "@id": "https://swifty.us/#organization" },
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": `${siteOrigin}/#software`,
      url: `${siteOrigin}/`,
      name: siteName,
      alternateName: source.package,
      description: homepageDescription,
      codeRepository: source.repository,
      version: source.version,
      license: `${source.repository}/blob/main/LICENSE`,
      programmingLanguage: ["TypeScript", "CSS"],
      runtimePlatform: "React 18 and React 19",
      publisher: { "@id": "https://swifty.us/#organization" },
      mainEntityOfPage: { "@id": `${siteOrigin}/#website` },
    },
  ],
};

export function breadcrumbStructuredData(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
