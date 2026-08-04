import type { MetadataRoute } from "next";
import { components, guides } from "./lib/content";
import { absoluteUrl } from "./lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/", "/docs", "/components", "/themes", "/atom",
    ...Object.keys(guides).map((slug) => `/docs/${slug}`),
    ...components.map((component) => `/components/${component.slug}`),
  ].map((path) => ({ url: absoluteUrl(path) }));
}
