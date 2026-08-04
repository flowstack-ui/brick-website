"use client";

import "../../app/.generated/previews/feed.css";

import { Feed } from "@flowstack-ui/brick/feed";
import { Text } from "@flowstack-ui/brick/text";

export default function FeedPreview() {
  return <Feed.Root aria-label="Release activity" setSize={2}><Feed.Item aria-labelledby="feed-published" index={0}><Text as="h3" id="feed-published" variant="title-sm">Release published</Text><Text tone="secondary">Brick 0.1.0 is ready.</Text></Feed.Item><Feed.Item aria-labelledby="feed-review" index={1}><Text as="h3" id="feed-review" variant="title-sm">Review requested</Text><Text tone="secondary">Morgan requested review.</Text></Feed.Item></Feed.Root>;
}
