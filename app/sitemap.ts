import type { MetadataRoute } from "next";
import { components } from "./lib/catalog";
import { guides } from "./lib/guides";
import { absoluteUrl } from "./lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/", "/docs", "/components", "/blocks", "/blocks/application/feed/threaded-comments", "/themes", "/atom",
    ...Object.keys(guides).map((slug) => `/docs/${slug}`),
    ...components.map((component) => `/components/${component.slug}`),
  ].map((path) => ({ url: absoluteUrl(path) }));
}
