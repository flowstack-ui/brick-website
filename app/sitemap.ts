import type { MetadataRoute } from "next";
import { components, guides } from "./lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://brick-ui.com";
  return [
    "", "/docs/", "/components/", "/themes/", "/atom/",
    ...Object.keys(guides).map((slug) => `/docs/${slug}/`),
    ...components.map((component) => `/components/${component.slug}/`),
  ].map((path) => ({ url: `${base}${path}`, changeFrequency: path.startsWith("/components/") ? "monthly" : "weekly", priority: path === "" ? 1 : 0.7 }));
}

