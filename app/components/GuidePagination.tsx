import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { guideNeighbors } from "@/app/lib/guides";

export function GuidePagination({ current }: { current: string }) {
  const { previous, next } = guideNeighbors(current);

  return (
    <nav className="guide-pagination" aria-label="Guide pages">
      {previous ? (
        <Link href={previous.href} rel="prev">
          <ArrowLeft size={16} aria-hidden="true" />
          <span><small>Previous guide</small><strong>{previous.title}</strong></span>
        </Link>
      ) : <span />}
      {next ? (
        <Link href={next.href} rel="next">
          <span><small>Next guide</small><strong>{next.title}</strong></span>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      ) : <span />}
    </nav>
  );
}
