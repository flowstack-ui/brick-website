import "server-only";

import componentDocs from "@/content/component-docs.json";

export function componentDoc(slug: string) {
  return componentDocs[slug as keyof typeof componentDocs];
}
