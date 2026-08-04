"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/app/lib/toc";

export function OnThisPage({ items = [] }: { items?: TocItem[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      frame = 0;
      const anchorOffset = 112;
      let nextActiveId = "";

      for (const item of items) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= anchorOffset) nextActiveId = item.id;
        else if (section) break;
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        nextActiveId = items.at(-1)?.id ?? nextActiveId;
      }

      setActiveId(nextActiveId);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, [items]);

  return (
    <nav aria-label="Sections on this page">
      {items.map((item) => (
        <a
          key={item.id}
          className={activeId === item.id ? "is-current" : undefined}
          href={`#${item.id}`}
          aria-current={activeId === item.id ? "location" : undefined}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
