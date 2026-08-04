"use client";

import { useMemo, useState } from "react";
import { Badge } from "@flowstack-ui/brick/badge";
import { Button } from "@flowstack-ui/brick/button";
import { Card } from "@flowstack-ui/brick/card";
import { Code } from "@flowstack-ui/brick/code";
import { Input } from "@flowstack-ui/brick/input";
import { Text } from "@flowstack-ui/brick/text";
import {
  ArrowRight,
  CheckSquare,
  Database,
  LayoutDashboard,
  MenuSquare,
  MessageSquareWarning,
  MousePointerClick,
  Search,
} from "lucide-react";
import { categories, components } from "@/app/lib/content";

const outcomes = [
  { category: "Forms & choices", icon: CheckSquare, label: "Collect input", examples: "Field, Input, Select" },
  { category: "Actions & selection", icon: MousePointerClick, label: "Trigger actions", examples: "Button, Toggle, Toolbar" },
  { category: "Content & status", icon: MessageSquareWarning, label: "Show feedback", examples: "Alert, Badge, Progress" },
  { category: "Overlays & menus", icon: MenuSquare, label: "Open an overlay", examples: "Dialog, Drawer, Popover" },
  { category: "Navigation & layout", icon: LayoutDashboard, label: "Shape navigation", examples: "Tabs, Sidebar, Breadcrumb" },
  { category: "Data & collections", icon: Database, label: "Present data", examples: "Table, Data Grid, Tree" },
] as const;

function categoryId(category: string) {
  return category.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and");
}

function conciseDescription(description: string) {
  const firstSentence = description.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim() ?? description;
  return firstSentence.length > 180 ? `${firstSentence.slice(0, 177).trimEnd()}…` : firstSentence;
}

export function ComponentCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const normalizedQuery = query.trim().toLowerCase();

  const matches = useMemo(() => components.filter((component) => {
    const matchesCategory = category === "All" || component.category === category;
    const matchesQuery = !normalizedQuery || `${component.title} ${component.description} ${component.category}`.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesQuery;
  }), [category, normalizedQuery]);

  const visibleCategories = categories.filter((entry) => category === "All" ? matches.some((component) => component.category === entry) : entry === category);

  const chooseCategory = (nextCategory: string) => {
    setCategory(nextCategory);
    window.requestAnimationFrame(() => document.getElementById("component-results")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <>
      <section className="catalog-discovery" aria-labelledby="catalog-discovery-title">
        <div className="catalog-discovery-copy">
          <span>Start with the outcome</span>
          <Text as="h2" id="catalog-discovery-title" variant="title-lg">What are you building?</Text>
          <Text tone="secondary">Browse by purpose when you know the job but not yet the component name.</Text>
        </div>
        <div className="catalog-outcomes">
          {outcomes.map(({ category: outcomeCategory, icon: Icon, label, examples }) => (
            <Button
              key={outcomeCategory}
              aria-pressed={category === outcomeCategory}
              className="catalog-outcome"
              onPress={() => chooseCategory(outcomeCategory)}
              tone={category === outcomeCategory ? "accent" : "neutral"}
              variant={category === outcomeCategory ? "soft" : "ghost"}
            >
              <span className="catalog-outcome-icon"><Icon size={18} aria-hidden="true" /></span>
              <span className="catalog-outcome-copy"><span className="catalog-outcome-title"><strong>{label}</strong><ArrowRight size={14} aria-hidden="true" /></span><small>{examples}</small></span>
            </Button>
          ))}
        </div>
      </section>

      <section className="catalog-browser" id="component-results" aria-labelledby="component-results-title">
        <div className="catalog-browser-heading">
          <div>
            <span>Component finder</span>
            <Text as="h2" id="component-results-title" variant="title-lg">Find the right finished part</Text>
          </div>
          <Badge tone="neutral" variant="outline"><span aria-live="polite">{matches.length} {matches.length === 1 ? "result" : "results"}</span></Badge>
        </div>
        <Input
          autoComplete="off"
          clearable
          id="component-catalog-search"
          name="component-catalog-search"
          onChange={(event) => setQuery(event.currentTarget.value)}
          onClear={() => setQuery("")}
          placeholder="Search by name, purpose, or category…"
          startAdornment={<Search size={17} aria-hidden="true" />}
          type="search"
          value={query}
        />
        <div className="catalog-filters" aria-label="Filter components by category">
          {["All", ...categories].map((entry) => (
            <Button
              key={entry}
              aria-pressed={category === entry}
              onPress={() => setCategory(entry)}
              size="sm"
              tone={category === entry ? "accent" : "neutral"}
              variant={category === entry ? "solid" : "soft"}
            >
              {entry}{entry === "All" ? ` · ${components.length}` : ""}
            </Button>
          ))}
        </div>

        {matches.length > 0 ? (
          <div className="catalog-groups">
            {visibleCategories.map((entry) => {
              const categoryComponents = matches.filter((component) => component.category === entry);
              if (categoryComponents.length === 0) return null;
              return (
                <section key={entry} id={categoryId(entry)} className="catalog-group">
                  <div className="catalog-group-heading">
                    <Text as="h3" variant="title-md">{entry}</Text>
                    <span>{categoryComponents.length}</span>
                  </div>
                  <div className="component-result-grid">
                    {categoryComponents.map((component) => (
                      <Card.Root key={component.slug} as="article" size="sm" variant="outline" className="component-result-card">
                        <Card.Header>
                          <div><Card.Title as="h4">{component.title}</Card.Title><Badge tone="neutral" variant="soft" size="sm">{entry}</Badge></div>
                          <Card.Action><ArrowRight size={16} aria-hidden="true" /></Card.Action>
                        </Card.Header>
                        <Card.Content><Text variant="body-sm" tone="secondary">{conciseDescription(component.description)}</Text></Card.Content>
                        <a className="card-cover-link" href={`/components/${component.slug}/`} aria-label={`Open ${component.title} documentation`} />
                      </Card.Root>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="catalog-empty" role="status">
            <span className="catalog-empty-icon"><Search size={19} aria-hidden="true" /></span>
            <div className="catalog-empty-copy">
              <small>Nothing matched</small>
              <Text as="h3" variant="title-md">No Brick component for <Code>{query}</Code></Text>
              <Text tone="secondary">Try a shorter capability such as dialog, field, navigation, status, or data.</Text>
            </div>
            <Button onPress={() => { setQuery(""); setCategory("All"); }} tone="accent" variant="soft">Show all components</Button>
          </div>
        )}
      </section>
    </>
  );
}
