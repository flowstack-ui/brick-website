import { WebsiteButton } from "@/app/components/WebsiteButton";
import { Text } from "@flowstack-ui/brick/text";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <main id="main-content" className="not-found section-shell"><span className="not-found-code">404</span><Text as="h1" variant="display">This piece is not in the wall.</Text><Text as="p" variant="body-lg" tone="secondary">The page may have moved, or it has not been built yet.</Text><WebsiteButton href="/" startIcon={<ArrowLeft size={15} />}>Back home</WebsiteButton></main>;
}
