import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("mobile drawer retains its branded reference composition", async () => {
  const headerSource = await readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(headerSource, /<BrandMark \/>/, "drawer must retain Brick identity");
  assert.match(headerSource, /<NavList\.Root/, "drawer navigation must use the published Brick navigation primitive");
  assert.match(headerSource, /Build interfaces from pieces that belong together\./, "drawer must retain its product-specific title");
  assert.match(headerSource, /pathname\.startsWith\(href\)/, "drawer must identify the current product section");
  assert.doesNotMatch(css, /\.version-pill \{ display: none; \}/, "header version must remain visible at every supported width");
  assert.doesNotMatch(css, /\.brand-word \{ display: none; \}/, "header wordmark must remain visible at every supported width");
  assert.match(css, /\.site-header \{ gap: \.5rem; padding-inline: \.75rem; \}\.brand-link, \.brand \{ gap: \.4rem; \}/, "narrow header must compact spacing instead of hiding identity");
});

test("search dialog retains its structured responsive composition", async () => {
  const headerSource = await readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(headerSource, /aria-label="Close search"/, "search must provide a top-right close control");
  assert.match(headerSource, /searchResults\.componentResults/, "search must distinguish component results");
  assert.match(headerSource, /searchResults\.guideResults/, "search must distinguish guide results");
  assert.match(headerSource, /search-dialog-footer/, "search must retain a distinct utility footer");
  assert.doesNotMatch(headerSource, />Close<\/Button>/, "search must not rely on a visually ambiguous footer close button");
  assert.match(css, /\.search-dialog, \.search-dialog\[data-state="closed"\].*block-size: 100dvb/, "narrow-mobile search must use the available screen");
});

test("homepage promise section retains its editorial feature-grid contract", async () => {
  const homepageSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(homepageSource, /className="pillar-link"/, "feature-card destinations must use aligned editorial links");
  assert.match(homepageSource, /className="section-heading promise-heading"/, "feature-grid introduction must opt into its editorial alignment contract");
  assert.match(homepageSource, /id="principles-title"[^>]*align="start"/, "feature-grid title must explicitly use the editorial start axis through the Brick Text API");
  assert.match(homepageSource, /variant="body-lg" tone="secondary" align="start" wrap="pretty"/, "feature-grid description must share the title axis without forcing a pyramidal wrap");
  assert.match(css, /\.section-heading \{ display: grid;[^}]*justify-items: center;/, "section heading must share one centered layout axis");
  assert.match(css, /\.section-heading :is\(h2, p\) \{ width: 100%; max-width: 44rem; \}/, "feature-grid heading copy must share one measure");
  assert.match(css, /\.promise-heading \{ max-width: 52rem; justify-items: start; margin-inline: 0; text-align: start; \}/, "promise heading must align with the feature-card grid instead of forming a centered pyramid");
  assert.match(homepageSource, /<Card\.Header className="icon-card-header">/, "feature icon and title must use the shared authored card-header pattern");
  assert.match(css, /\.pillar-card \{ min-height: 16\.5rem; \}/, "feature cards must avoid the previous dead-space floor");
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*\.pillar-grid \{ grid-template-columns: 1fr !important; \}\.pillar-card \{ min-height: 0; \}/, "feature cards must stack before their content measure becomes cramped");
});

test("favicon reuses the transparent Brick brand mark", async () => {
  const favicon = await readFile(new URL("../public/favicon.svg", import.meta.url), "utf8");
  assert.equal((favicon.match(/<rect\b/g) ?? []).length, 3, "favicon must contain the same three-part masonry mark as the wordmark");
  assert.doesNotMatch(favicon, /<rect[^>]*width="64"[^>]*height="64"/, "favicon must not add a theme-specific background tile");
  assert.match(favicon, /#6847E8[\s\S]*#C45BD8[\s\S]*#EAA64A/, "favicon must retain the Brick mark color order");
});

test("homepage theme story retains its content-pressure contract", async () => {
  const homepageSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(homepageSource, /href="\/themes\/" tone="neutral" variant="soft"/, "theme story action must use a quiet filled surface over the page grid");
  assert.match(css, /\.principles \{[^}]*padding-block-end: clamp\(3rem, 5vw, 5rem\);/, "promise section must not contribute an oversized lower gap");
  assert.match(css, /\.theme-story \{[^}]*padding-block: clamp\(3rem, 5vw, 5rem\);/, "theme story must own restrained transitions on both sides");
  assert.match(css, /@media \(max-width: 1080px\) \{\s*\.theme-story \{ grid-template-columns: 1fr; gap: 3rem; \}/, "theme story must stack when its live comparison starts squeezing the copy");
});

test("homepage catalog story retains its component-constellation contract", async () => {
  const homepageSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(homepageSource, /catalog-module module-actions/, "catalog visual must identify a real component family");
  assert.match(homepageSource, /catalog-module module-fields/, "catalog visual must represent form controls rather than generic boxes");
  assert.match(homepageSource, /catalog-module module-navigation/, "catalog visual must represent navigation components");
  assert.match(homepageSource, /catalog-core[^>]*>[\s\S]*\{components\.length\}/, "catalog visual must keep the source-backed component count at its center");
  assert.doesNotMatch(homepageSource, /catalog-block block-/, "catalog visual must not regress to oversized generic icon tiles");
  assert.match(css, /\.catalog-story \{[^}]*padding-block-start: clamp\(3rem, 5vw, 5rem\);/, "catalog story must own a restrained transition from the theme story");
  assert.match(css, /\.catalog-art::before \{[^}]*background-color: var\(--brick-color-surface-base\);/, "catalog blueprint must block the page grid before drawing its own line system");
});

test("mobile footer retains its centered touch-friendly composition", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const footerSource = await readFile(new URL("../app/components/SiteFooter.tsx", import.meta.url), "utf8");
  assert.match(footerSource, /<BrandMark \/>[\s\S]*className="version-pill footer-version">v\{source\.version\}/, "footer must present the same complete brand and source-backed version treatment as the header");
  assert.match(css, /\.site-footer \{ grid-template-columns: 1fr; justify-items: center;[^}]*text-align: center; \}/, "mobile footer must establish one intentional centered axis");
  assert.match(css, /\.footer-brand \.brand-word \{ display: inline; \}\.footer-brand \.version-pill \{ display: inline-flex; \}/, "footer brand and version must remain visible at every mobile size");
  assert.match(css, /\.footer-links \{ display: grid;[^}]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/, "mobile footer destinations must use a stable two-column grid");
  assert.match(css, /\.footer-links a \{ min-height: 2\.75rem; justify-content: center;/, "mobile footer destinations must preserve touch height and centered labels");
  assert.match(footerSource, /className="footer-link-label"/g, "footer destinations must separate their visible label from their touch target");
  assert.match(css, /\.footer-links a:focus-visible \.footer-link-label \{ outline: 2px solid var\(--brick-color-focus-ring\); outline-offset: \.2rem; \}/, "footer focus rings must wrap visible labels instead of the expanded touch rows");
  assert.match(footerSource, /Part of <a href="https:\/\/github\.com\/flowstack-ui">Flowstack<\/a>/, "footer must identify Brick's Flowstack membership");
  assert.match(footerSource, /A <a href="https:\/\/swifty\.us\/">Swifty<\/a> product/, "footer must identify Swifty ownership without replacing Brick identity");
  assert.match(css, /\.footer-meta \{ grid-column: auto; width: 100%; flex-direction: column;[^}]*text-align: center; \}/, "mobile footer metadata must share the footer axis");
  assert.match(css, /\.footer-endorsement \{ justify-content: center; \}/, "mobile endorsement must remain centered when its phrases wrap");
});

test("Flowstack relationship remains supporting product context", async () => {
  const headerSource = await readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8");
  const homepageSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const atomSource = await readFile(new URL("../app/atom/page.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.doesNotMatch(headerSource, /Swifty|Flowstack/, "global product navigation must remain Brick-owned");
  assert.match(homepageSource, /Atom, Flowstack’s headless foundation/, "homepage may introduce the ecosystem only after the Brick hero");
  assert.match(atomSource, /Part of Flowstack/, "Atom relationship page must explain ecosystem membership");
  assert.match(atomSource, /<ol className="flowstack-path"/, "ecosystem explanation must retain an ordered product path");
  assert.match(atomSource, /name: "Atom"[\s\S]*name: "Brick"[\s\S]*name: "Your product"/, "product path must preserve layer ownership");
  assert.doesNotMatch(atomSource, /Theme|Colors|Blocks as|Blocks pack/, "ecosystem explanation must not present prospective packs as published products");
  assert.match(css, /@media \(max-width: 1080px\)[\s\S]*\.flowstack-context \{ grid-template-columns: 1fr; gap: 3rem; \}/, "Flowstack story must stack before its copy and pathway become cramped");
  assert.match(css, /\.flowstack-context-copy, \.flowstack-path \{ width: min\(100%, 52rem\); margin-inline: auto; \}/, "stacked Flowstack story must share one centered content lane");
});

test("Atom hero retains its readable connected-layer composition", async () => {
  const atomSource = await readFile(new URL("../app/atom/page.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(atomSource, /Flowstack layers/, "hero visual must identify the layer system it depicts");
  assert.match(atomSource, /03 · Application[\s\S]*02 · Presentation[\s\S]*01 · Behavior/, "hero visual must expose a clear top-to-foundation sequence");
  assert.match(atomSource, /className="layer-symbol"/, "each layer must have a dedicated visual anchor");
  assert.doesNotMatch(css, /rotateX\(54deg\)/, "layer labels must not be flattened by the previous perspective transform");
  assert.match(css, /\.layer-diagram::before[^}]*linear-gradient/, "layer composition must retain a visible connection spine");
  assert.match(css, /\.layer-diagram \{[^}]*background-color: var\(--brick-color-surface-base\);/, "diagram must use an opaque surface that blocks the page grid");
  assert.doesNotMatch(css, /\.layer-diagram \{[^}]*var\(--site-grid\)/, "diagram must not draw a second grid over the page grid");
  assert.match(css, /\.brick-layer \{[^}]*width: min\(100%, 27rem\);/, "Brick must remain the visual focus of the relationship diagram");
  assert.match(css, /\.atom-copy \{ display: grid; justify-items: start; gap: 1rem; \}/, "Atom hero copy must own explicit vertical rhythm");
  assert.match(css, /\.atom-copy \.brick-button \{ margin-block-start: \.5rem; \}/, "Atom action must remain separated from its description");
  assert.match(css, /@media \(max-width: 1180px\)[\s\S]*\.atom-hero \{ grid-template-columns: 1fr; gap: 3\.5rem; \}/, "Atom diagram must move below the copy before either hero column becomes cramped");
  assert.match(css, /\.atom-hero \{ gap: 2\.5rem; padding-block: 2\.25rem 3\.5rem; \}/, "narrow Atom hero must begin higher and keep a restrained copy-to-diagram transition");
});

test("Atom ownership section retains one aligned editorial lane", async () => {
  const atomSource = await readFile(new URL("../app/atom/page.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(atomSource, /id="ownership-title"/, "ownership section must expose a named heading");
  assert.match(atomSource, /Atom owns the behavioral contract\. Brick owns the finished visual system\./, "ownership heading must explain the division rather than relying on a title alone");
  assert.match(atomSource, /className="ownership-card"/, "ownership cards must opt into their authored alignment contract");
  assert.match(css, /\.ownership-section \.ownership-heading, \.ownership-grid \{ width: min\(100%, 65rem\); max-width: 65rem; margin-inline: auto; \}/, "ownership heading and cards must share one centered lane");
  assert.match(atomSource, /<Card\.Header className="icon-card-header">/, "ownership card icons must use the shared explicit title-spacing pattern");
  assert.match(css, /\.flowstack-context \{ padding-block-end: clamp\(2rem, 3vw, 3rem\); \}/, "preceding story must not contribute an oversized lower transition");
  assert.match(css, /\.ownership-section \{ padding-block-start: clamp\(2rem, 3vw, 3rem\); \}/, "ownership section must begin without an oversized upper transition");
});

test("Atom closing choice preserves one-line action priority", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.atom-choice > div:first-child \{ min-width: 0; flex: 1 1 auto; \}/, "closing copy must absorb available compression and wrap normally");
  assert.match(css, /\.atom-choice \.brick-button \{ flex: 0 0 auto; white-space: nowrap; \}/, "closing action must retain its intrinsic one-line label");
  assert.match(css, /\.theme-cta, \.atom-choice \{ align-items: flex-start; flex-direction: column;/, "closing choice must still stack when the narrow layout genuinely requires it");
});

test("Themes hero retains its semantic instrument composition", async () => {
  const themesSource = await readFile(new URL("../app/themes/page.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(themesSource, /className="theme-copy"/, "theme hero copy must own explicit vertical rhythm");
  assert.match(themesSource, /<Sparkles size=\{13\} aria-hidden="true" \/>/, "theme eyebrow icon must remain decorative");
  assert.match(themesSource, /className="theme-actions"/, "theme actions must opt into authored description spacing");
  assert.match(themesSource, /href="\/components\/" tone="neutral" variant="soft"/, "theme secondary action must use the opaque quiet treatment over the page grid");
  assert.match(themesSource, /role="img" aria-label="Brick semantic theme instrument/, "theme visual must expose one grouped accessible summary");
  assert.match(themesSource, /Semantic core[\s\S]*Accent[\s\S]*Surface[\s\S]*Type[\s\S]*Motion/, "theme instrument must retain its meaning-first semantic roles");
  assert.match(themesSource, /A theme is not a coat of paint\./, "comparison story must explain the semantic contract before presenting visual expressions");
  assert.match(themesSource, /Same Brick component tree/g, "both expressions must identify their unchanged component contract");
  assert.match(themesSource, /Semantic map[\s\S]*04 connected systems/, "token families must read as one connected semantic system");
  assert.match(css, /\.theme-copy > \.brick-badge \{ gap: \.4rem; \}/, "theme eyebrow must separate its icon from its label");
  assert.match(css, /\.theme-actions \{ margin-block-start: \.5rem; \}/, "theme actions must remain separated from the description");
  assert.match(css, /\.theme-comparison, \.token-section \{ padding-block: clamp\(2\.75rem, 4vw, 4rem\); \}/, "theme story transitions must use restrained section rhythm");
  assert.match(css, /\.comparison-panel \{[^}]*background-image: radial-gradient/, "theme expressions must sit on authored opaque presentation surfaces");
  assert.match(css, /\.token-family \{[^}]*grid-template-columns:/, "semantic token groups must retain their structured map anatomy");
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*\.theme-cta \{ align-items: flex-start; flex-direction: column; gap: 1\.25rem; \}/, "theme closing action must stack at its content-pressure breakpoint");
  assert.match(css, /\.theme-cta > div:first-child, \.theme-cta \.install-command \{ width: 100%; max-width: none; \}/, "stacked theme CTA copy and install command must use the complete available width");
  assert.match(css, /\.theme-orbit \{[^}]*aspect-ratio: 1;[^}]*border-radius: 50%;/, "theme instrument outer geometry must remain a true circle");
  assert.match(css, /\.theme-orbit \{[^}]*conic-gradient/, "theme instrument must retain its restrained semantic spectrum");
  assert.doesNotMatch(css, /\.theme-orbit \{[^}]*min-height:/, "theme instrument must not recreate an ellipse through an unrelated minimum height");
});

test("documentation rails retain readable scalable navigation", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const shellSource = await readFile(new URL("../app/components/DocsShell.tsx", import.meta.url), "utf8");
  const railSource = await readFile(new URL("../app/components/OnThisPage.tsx", import.meta.url), "utf8");
  const markdownSource = await readFile(new URL("../app/components/MarkdownArticle.tsx", import.meta.url), "utf8");
  const guideSource = await readFile(new URL("../app/docs/[slug]/page.tsx", import.meta.url), "utf8");
  const componentSource = await readFile(new URL("../app/components/[slug]/page.tsx", import.meta.url), "utf8");
  const componentNavSource = await readFile(new URL("../app/components/ComponentDocsNavigation.tsx", import.meta.url), "utf8");
  const componentDocSource = await readFile(new URL("../app/components/ComponentDocument.tsx", import.meta.url), "utf8");
  const componentParserSource = await readFile(new URL("../app/lib/component-docs.ts", import.meta.url), "utf8");
  const catalogSource = await readFile(new URL("../app/components/page.tsx", import.meta.url), "utf8");
  assert.match(css, /\.docs-sidebar a, \.docs-rail a \{[^}]*min-height: 2\.35rem;[^}]*font-size: \.9rem;[^}]*line-height: 1\.35;/, "documentation links must not use compact metadata-sized text or targets");
  assert.match(css, /\.docs-nav-label, \.docs-rail > span \{[^}]*font-size: \.75rem;[^}]*line-height: 1\.4;/, "documentation rail labels must retain a readable supporting scale");
  assert.match(css, /\.docs-shell \{ position: relative; isolation: isolate;/, "documentation routes must establish their own reading-plane stacking context");
  assert.match(css, /\.docs-shell::before \{[^}]*background: linear-gradient\(180deg, transparent 0 4rem,[^}]*transparent 50%\) 10rem,[^}]*var\(--brick-color-surface-canvas\) 22rem\);/, "documentation introductions must visibly retain the global grid before the reading-plane fade");
  assert.match(css, /\.docs-shell::before \{[^}]*width: 100vw;[^}]*background: linear-gradient\(180deg,[^}]*var\(--brick-color-surface-canvas\) 22rem\);/, "documentation grid must fade into an opaque semantic reading canvas");
  assert.match(css, /\.docs-shell::before, \.catalog-shell::before \{ background: Canvas; \}/, "forced-colors mode must give documentation and catalog routes a fully opaque reading plane");
  assert.match(css, /@media \(max-width: 1180px\)[\s\S]*\.docs-rail \{ display: none; \}/, "the right rail must leave the layout before text zoom compresses the article");
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*\.docs-shell \{ display: block; \}/, "the remaining documentation navigation must reflow before narrow layouts");
  assert.match(shellSource, /<OnThisPage items=\{toc\} \/>/, "the documentation shell must render page-owned table-of-contents data");
  assert.match(shellSource, /\["getting-started", "theming", "composition", "accessibility"\]/, "the documentation navigation must follow the overview's recommended learning route");
  assert.match(shellSource, /aria-label="Guide navigation"[\s\S]*docs-nav-label">Guides<[\s\S]*href="\/docs\/">Overview/, "the learning rail must present itself as Guides with a clear overview entry");
  assert.doesNotMatch(shellSource, /docs-nav-label">Components|categories\.map|All components/, "component discovery must not be duplicated inside the Guides rail");
  assert.doesNotMatch(shellSource, /Introduction[\s\S]*Details[\s\S]*Next steps/, "the right rail must not ship a generic placeholder outline");
  assert.match(railSource, /aria-current=\{activeId === item\.id \? "location"/, "the visible page section must be exposed to assistive technology");
  assert.match(railSource, /getBoundingClientRect\(\)\.top <= anchorOffset/, "the right rail must track actual document sections while scrolling");
  assert.match(markdownSource, /h2: \(\{ children \}\)[\s\S]*headingId\(nodeText\(children\)\)/, "rendered Markdown headings must receive the same stable IDs as the table of contents");
  assert.match(guideSource, /extractMarkdownToc\(guide\.body\)/, "guide rails must be generated from their authored headings");
  assert.match(componentSource, /componentDocToc\(consumerMarkdown\)[\s\S]*<ComponentDocument/, "component rails and their consumer-first article must share the structured public document");
  assert.match(componentParserSource, /maintainerStart[\s\S]*Evidence\|Changelog/, "component presentation must remove maintainer evidence and changelogs from the public reading path");
  assert.match(componentParserSource, /maintainerOnlyExamples[^;]*title === "Examples"[^;]*playground[^;]*!\/```\//, "playground-only source sections must route to maintainer resources instead of masquerading as consumer examples");
  assert.match(componentDocSource, /Know when \{componentTitle\} is the right part[\s\S]*Advanced reference[\s\S]*Maintainer resources/, "component pages must progress from adoption guidance to optional advanced and maintainer resources");
  assert.match(componentNavSource, /aria-current=\{component\.slug === currentSlug \? "page"/, "component navigation must expose the current component route");
  assert.match(componentNavSource, /<Accordion\.Root[\s\S]*categories\.map/, "component navigation must use collapsible Brick category groups");
  assert.match(componentNavSource, /docs-mobile-toolbar[\s\S]*title="Components"[\s\S]*title="On this page"/, "component pages must retain both navigation layers on narrow screens");
  assert.match(catalogSource, /<main id="main-content" className="catalog-shell section-shell">/, "the component catalog must own a focused full-width discovery surface");
  assert.doesNotMatch(catalogSource, /DocsShell/, "the catalog must not duplicate its own filters with a documentation rail");
  assert.match(css, /\.docs-sidebar a:focus-visible, \.docs-rail a:focus-visible \{ outline: 2px solid var\(--brick-color-focus-ring\); outline-offset: -2px; \}/, "scrollable documentation rails must use an inset semantic focus ring that cannot be clipped");
  assert.match(css, /\.site-canvas :focus-visible \{ outline-color: var\(--brick-color-focus-ring\); \}/, "authored focus indicators must inherit the website's semantic purple focus color");
  assert.match(css, /@media \(forced-colors: active\)[\s\S]*\.site-canvas :focus-visible \{ outline-color: Highlight; \}/, "forced-colors users must retain the system focus indicator color");
});

test("component discovery and rendering remain consumer-first Brick compositions", async () => {
  const catalogSource = await readFile(new URL("../app/components/ComponentCatalog.tsx", import.meta.url), "utf8");
  const previewSource = await readFile(new URL("../app/components/ComponentPreview.tsx", import.meta.url), "utf8");
  const componentSource = await readFile(new URL("../app/components/[slug]/page.tsx", import.meta.url), "utf8");
  const componentDocSource = await readFile(new URL("../app/components/ComponentDocument.tsx", import.meta.url), "utf8");
  const markdownSource = await readFile(new URL("../app/components/MarkdownArticle.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(catalogSource, /What are you building\?[\s\S]*Component finder[\s\S]*Search by name, purpose, or category/, "the catalog must support outcome-led browsing and known-item search");
  assert.match(catalogSource, /as="p" className="catalog-discovery-description" tone="secondary">Browse by purpose/, "catalog guidance must render as body copy instead of an eyebrow span");
  assert.match(css, /\.catalog-discovery-copy > \.catalog-discovery-description \{[^}]*color: var\(--brick-color-text-secondary\);[^}]*font-size: 1rem;[^}]*text-transform: none;/, "catalog guidance must preserve normal-case secondary body typography");
  assert.match(catalogSource, /aria-pressed=\{category === entry\}/, "category filters must expose their selected state");
  assert.match(catalogSource, /catalog-outcome-title[^>]*><strong>\{label\}<\/strong><ArrowRight/, "outcome arrows must remain attached to their action labels");
  assert.match(css, /\.catalog-outcome-title \{[^}]*width: fit-content;[^}]*gap: \.3rem;/, "outcome arrows must not be pushed to the far edge of their cards");
  assert.match(catalogSource, /aria-live="polite"/, "search result changes must be announced without moving focus");
  assert.match(componentSource, /categoryComponents[\s\S]*component-category-return/, "previous, category, and next navigation must remain category-relative");
  assert.match(componentSource, /Back to category[\s\S]*<strong>\{component\.category\}<\/strong>/, "the category return must read as a labeled destination instead of an unrelated icon action");
  assert.doesNotMatch(componentSource, /LayoutGrid/, "the category return must not introduce an ambiguous grid icon between directional links");
  assert.match(componentDocSource, /Source docs<\/WebsiteButton>[\s\S]*Changelog<\/WebsiteButton>[\s\S]*Playground<\/WebsiteButton>/, "maintainer destinations must remain one equally weighted external-link group");
  assert.doesNotMatch(componentDocSource, /variant="soft"[^>]*>Source docs/, "source docs must not receive unexplained emphasis over peer GitHub destinations");
  assert.match(previewSource, /case "field":[^;]*required><Field\.Label>Email<\/Field\.Label>/, "the Field preview must rely on Label's required-state indicator contract");
  assert.doesNotMatch(previewSource, /case "field":[^;]*Field\.RequiredIndicator/, "the Field preview must not add a second required indicator to Label's automatic one");
  assert.match(previewSource, /case "swipeable-item":[^;]*preview-swipeable-content[^;]*size="sm" tone="danger" variant="ghost"/, "the Swipeable Item preview must use the complete padded content composition and bounded action recipe");
  assert.match(css, /\.preview-swipeable-content \{[^}]*grid-template-columns: minmax\(0, 1fr\) auto;[^}]*padding: var\(--brick-space-4\);/, "Swipeable Item preview content must remain fully visible inside its component boundary");
  assert.match(componentSource, /\["collapsible", "data-grid", "sidebar", "tree", "tree-grid"\][^?]*\? " example-canvas--structure"/, "expanding and structure-heavy examples must opt into their own natural-height canvas");
  assert.match(componentSource, /className="example-specimen"><ComponentPreview/, "the preview frame must own measure without applying width to a component's first rendered element");
  assert.match(css, /\.example-specimen \{ width: min\(100%, 34rem\); \}/, "the neutral specimen wrapper must own the generic preview measure");
  assert.doesNotMatch(css, /\.example-canvas > \* \{ width:/, "the preview canvas must not stretch portaled-component triggers when their Root renders no host");
  assert.match(css, /\.example-canvas--structure \{[^}]*min-height: 0;[^}]*align-content: start;[^}]*place-items: start stretch;/, "expanding structures must grow downward without recentering or shifting their example header");
  assert.match(previewSource, /case "tree-grid":[^;]*rowCount=\{3\}[^;]*parentValue="src"[^;]*level=\{2\}/, "Tree Grid must render a real child row for its expanded branch");
  assert.match(previewSource, /case "sidebar":[^;]*collapsedState="offcanvas"[^;]*Northstar workspace[^;]*Workspace navigation[^;]*preview-sidebar-main/, "Sidebar must demonstrate a finished coordinated application shell instead of raw unplaced anatomy");
  assert.doesNotMatch(previewSource, /case "sidebar":[^;]*collapsedState="rail"/, "Sidebar must not collapse full text navigation into an unadapted clipped rail");
  assert.match(previewSource, /case "context-menu":[^;]*preview-context-target[^;]*Project canvas[^;]*Shift \+ F10/, "Context Menu must expose a visible purposeful target with pointer and keyboard instructions");
  assert.match(css, /\.preview-context-target \{[^}]*min-height: 12rem;[^}]*border: 2px dashed var\(--brick-color-border-strong\);[^}]*cursor: context-menu;/, "Context Menu target must read as a visible dashed interaction region");
  assert.match(previewSource, /case "collapsible":[^;]*className="preview-collapsible"[^;]*Collapsible\.Content/, "Collapsible must expose a bounded specimen that opens below its anchored trigger");
  assert.match(previewSource, /case "hover-card":[^;]*preview-hover-identity[^;]*preview-hover-action[^;]*Preview profile[^;]*preview-hover-profile[^;]*HoverCard\.Arrow/, "Hover Card must separate profile identity, preview affordance, and structured passive content");
  assert.match(previewSource, /case "menubar":[^;]*preview-menubar-content[^;]*ItemLabel>New project[^;]*Shortcut>⌘N/, "Menubar must use its full item anatomy for command labels and shortcuts");
  assert.match(css, /\.preview-menubar-content \{ min-inline-size: 12rem; \}/, "Menubar preview content must retain a command-appropriate width");
  assert.match(previewSource, /case "navigation-menu":[^;]*NavigationMenu\.Trigger>Guides[^;]*NavigationMenu\.Content[^;]*NavigationMenu\.Trigger>Components[^;]*NavigationMenu\.Viewport/, "Navigation Menu must demonstrate disclosure triggers, destination panels, and the measured viewport");
  assert.match(previewSource, /href="#navigation-menu-preview" onClick=\{\(event\) => event\.preventDefault\(\)\}/, "example Navigation Menu destinations must preserve link anatomy without leaving the documentation page");
  assert.doesNotMatch(previewSource, /case "navigation-menu":[^;]*href="\/docs\//, "Navigation Menu preview must not use live site routes as inert demonstration controls");
  assert.match(markdownSource, /<Code[^>]*data-code-kind=\{inlineCodeKind/, "inline technical literals must use the published Brick Code component with semantic token styling");
  assert.match(markdownSource, /<Table\.Container[\s\S]*<Table\.Root[\s\S]*<Table\.Header/, "Markdown API matrices must use the published Brick Table anatomy");
  assert.match(css, /\.catalog-outcomes \{[^}]*grid-template-columns: repeat\(3/, "the full-width outcome discovery surface must retain a scannable desktop grid");
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*\.catalog-outcomes, \.component-result-grid \{ grid-template-columns: 1fr; \}/, "catalog discovery and results must stack at the narrow-mobile boundary");
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*\.component-guidance-item \{ grid-template-columns: 1fr; gap: 1rem; \}/, "usage guidance must stack its label and content at the narrow-mobile boundary");
  assert.match(css, /\.component-api \.brick-table \{ --brick-table-min-inline-size: 40rem; font-size: \.92rem; \}/, "component API tables must use a comfortable readable reference scale");
  assert.match(css, /\.component-api \.markdown-body > h3:first-child \{[^}]*padding-block-start: 0;[^}]*border-block-start: 0;/, "the first API subsection must not duplicate the API introduction divider");
  assert.match(css, /\.component-api > \.component-section-heading \.component-section-description \{[^}]*color: var\(--brick-color-text-secondary\);[^}]*font-size: 1rem;[^}]*text-transform: none;/, "the API explanation must remain normal secondary body copy rather than inheriting eyebrow typography");
  assert.match(css, /\.component-styling \.markdown-token-cluster \{[^}]*background: var\(--brick-color-surface-base\);/, "dense classes and tokens must receive a distinct scannable cluster surface");
});

test("rendered component documentation omits maintainer prose from the reading path", async () => {
  const response = await render("/components/button");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Choose with confidence/, "consumer guidance must be rendered");
  assert.match(html, /Maintainer resources/, "maintainer destinations must remain discoverable");
  assert.match(html, /aria-current="page"/, "the current component must be exposed in navigation");
  assert.doesNotMatch(html, /Button changelog|## Evidence|## Unreleased/, "raw evidence and release history must not be embedded in the component article");
});

test("icon-led cards and the Docs learning route use explicit composition patterns", async () => {
  const homepageSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const atomSource = await readFile(new URL("../app/atom/page.tsx", import.meta.url), "utf8");
  const docsSource = await readFile(new URL("../app/docs/page.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(homepageSource, /<Card\.Header className="icon-card-header">/, "homepage feature cards must opt into the shared icon composition");
  assert.match(atomSource, /<Card\.Header className="icon-card-header">/, "Atom ownership cards must opt into the shared icon composition");
  assert.match(css, /\.icon-card-header \{ grid-template-columns: minmax\(0, 1fr\); gap: \.8rem; \}/, "icon card headers must own a comfortable explicit vertical gap");
  assert.match(docsSource, /Guides · v\{source\.version\}/, "guides version badge must use the conventional version prefix");
  assert.match(docsSource, /Recommended learning route[\s\S]*Build confidence in four moves/, "documentation overview must explain the intended onboarding sequence");
  assert.match(css, /\.docs-path-heading \{ display: grid; gap: \.65rem;/, "the overview route description must sit below the learning-route title on the same reading axis");
  assert.match(css, /\.docs-path-card \{[^}]*min-height: 0;/, "overview guide cards must derive height from their content rather than an oversized presentation minimum");
  assert.match(docsSource, /<Card\.Header className="docs-path-card-header">[\s\S]*\{path\.step\} · \{path\.time\}/, "guide cards must expose their sequence and learning intent");
  assert.match(docsSource, /docs-path-outcome[\s\S]*\{path\.outcome\}/, "each guide path must identify its concrete reader outcome");
  assert.match(docsSource, /<Link className="pillar-link" href=\{path\.href\}>Read guide<ArrowRight/, "documentation cards must use the animated editorial link pattern");
  assert.match(docsSource, /<WebsiteButton href="\/components\/" endIcon=\{<ArrowRight[^>]*\/>\}>Explore components<\/WebsiteButton>/, "documentation closing CTA must retain primary button emphasis through the server-safe website adapter");
  assert.doesNotMatch(docsSource, /variant="ghost"/, "documentation path actions must not reintroduce padded ghost buttons");
});

test("reader-facing guides pair visual orientation with practical guidance", async () => {
  const visualSource = await readFile(new URL("../app/components/GuideVisual.tsx", import.meta.url), "utf8");
  const guideSource = await readFile(new URL("../app/docs/[slug]/page.tsx", import.meta.url), "utf8");
  const guides = JSON.parse(await readFile(new URL("../content/guides.json", import.meta.url), "utf8"));
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(guideSource, /\{ id: "guide-map", label: "Guide map" \}[\s\S]*<GuideVisual slug=/, "every guide must expose its visual orientation panel to the page outline");
  for (const component of ["GettingStartedMap", "ThemeMap", "AccessibilityMap", "CompositionMap"]) {
    assert.match(visualSource, new RegExp(`function ${component}\\(`), `${component} must remain a distinct reader-facing composition`);
  }
  assert.match(visualSource, /No provider required[\s\S]*React 18 and 19[\s\S]*Tree-shakable exports/, "getting started must summarize its setup contract at a glance");
  assert.match(visualSource, /variant="outline"><Check[\s\S]*No provider required/, "setup qualities must use quiet outlined badges rather than dark nested fills");
  assert.match(visualSource, /as="p" variant="body-lg" tone="secondary" align="center" wrap="balance">\{copy\.body\}/, "guide summaries must render as centered paragraphs rather than inheriting the uppercase eyebrow span style");
  assert.match(visualSource, /as="h2" id="guide-map-title" variant="title-lg" align="center" wrap="balance">\{copy\.title\}/, "wrapped guide-map titles must explicitly center their lines");
  assert.match(visualSource, /Brand choices[\s\S]*Semantic roles[\s\S]*Stable output/, "theming must visualize the semantic-token pipeline");
  assert.match(visualSource, /Atom[\s\S]*Mechanism[\s\S]*Brick[\s\S]*Visible states[\s\S]*Your app[\s\S]*Meaning/, "accessibility must show its three responsibility owners");
  assert.match(visualSource, /Application[\s\S]*Layout[\s\S]*Brick parts/, "composition must visualize the application-to-component boundary");
  assert.match(guides.accessibility.body, /Field\.Description[\s\S]*Field\.Error[\s\S]*complete the task with only a keyboard/, "accessibility must include a consumer example and an actionable test path");
  assert.match(guides.composition.body, /Grid\.Root[\s\S]*The Grid owns page arrangement[\s\S]*lightest owner/, "composition must connect public code to ownership guidance");
  assert.match(guides["getting-started"].body, /Confirm your setup[\s\S]*keyboard focus is visible/, "getting started must include a concrete setup checkpoint");
  assert.match(guides.theming.body, /data-brick-theme="studio"[\s\S]*resting, hover, pressed, focus, disabled, and invalid/, "theming must show scope and a release checklist");
  assert.match(css, /@media \(max-width: 640px\)[\s\S]*\.guide-setup-track, \.guide-theme-map, \.guide-a11y-map, \.guide-composition-map \{ grid-template-columns: 1fr; \}/, "all four visual guides must stack at the narrow-mobile boundary");
  assert.match(css, /\.guide-visual-heading \{[^}]*justify-items: center;[^}]*text-align: center;/, "each guide eyebrow, title, and summary must share one centered visual axis above its map");
  assert.match(css, /\.guide-visual-heading h2 \{ width: 100%; \}/, "guide-map titles must own the full introduction width before centering wrapped lines");
  assert.match(css, /\.guide-visual-heading p \{[^}]*width: 100%;[^}]*color: var\(--brick-color-text-secondary\);[^}]*font-size: 1rem;[^}]*line-height: 1\.65;/, "guide summaries must retain full-width alignment and readable secondary hierarchy beneath the primary title");
  assert.match(css, /\.guide-proof-row \.brick-badge \{[^}]*background: transparent;/, "setup qualities must not layer a heavy badge fill over the guide surface");
  assert.match(css, /\.guide-proof-row \{[^}]*justify-content: center;/, "setup qualities must remain centered beneath the three-step map");
});

test("documentation syntax highlighting remains a build-time Brick adapter", async () => {
  const markdownSource = await readFile(new URL("../app/components/MarkdownArticle.tsx", import.meta.url), "utf8");
  const adapterSource = await readFile(new URL("../app/components/HighlightedCodeBlock.tsx", import.meta.url), "utf8");
  const generatorSource = await readFile(new URL("../scripts/generate-syntax-tokens.mjs", import.meta.url), "utf8");
  const previewSource = await readFile(new URL("../app/components/ComponentPreview.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const manifest = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  const cache = JSON.parse(await readFile(new URL("../content/syntax-tokens.json", import.meta.url), "utf8"));
  assert.match(markdownSource, /pre: \(\{ children \}\) => <MarkdownCodeBlock[^>]*>/, "Markdown fences must route through the highlighted Brick adapter");
  assert.doesNotMatch(markdownSource, /code-frame|<pre>/, "documentation rendering must not recreate a website-owned code surface");
  assert.match(adapterSource, /<CodeBlock\.Root[\s\S]*<CodeBlock\.Language \/>[\s\S]*<CodeBlock\.CopyTrigger[\s\S]*<CodeBlock\.Content/, "the adapter must retain Brick anatomy, explicit language, copy behavior, and overflow ownership");
  assert.match(adapterSource, /value=\{source\}/, "copy must retain the raw source rather than reading presentation tokens");
  assert.match(markdownSource, /let codeExampleIndex = 0;[\s\S]*index=\{\+\+codeExampleIndex\}/, "each article must assign a stable unique ordinal to its Code Block landmarks");
  assert.match(markdownSource, /labelPrefix[\s\S]*languageNames\[language\][\s\S]*code example \$\{index\}/, "Code Block landmark names must combine an optional section prefix, readable language name, and ordinal");
  assert.match(adapterSource, /<CodeBlock\.Content aria-label=\{label\}>/, "the website adapter must pass the unique authored label to Brick's overflow landmark");
  assert.doesNotMatch(adapterSource, /aria-label=\{`\$\{language\} code example`\}/, "the adapter must not repeat one landmark name for every example of the same language");
  assert.match(adapterSource, /idle: \{ label: "Copy", icon: Copy \}[\s\S]*copying: \{ label: "Copying", icon: LoaderCircle \}[\s\S]*copied: \{ label: "Copied", icon: Check \}[\s\S]*error: \{ label: "Retry", icon: RotateCcw \}/, "copy presentation must expose useful progress, success, and recovery states");
  assert.match(adapterSource, /onStatusChange=\{\(\{ status \}\) => setCopyStatus\(status\)\}/, "the visual copy state must be driven by Atom's clipboard status contract");
  assert.match(css, /\.syntax-copy-trigger \{ min-inline-size: 5\.8rem;/, "the stateful copy action must not shift width as its label changes");
  assert.match(css, /\.syntax-copy-trigger\[data-state="copied"\][\s\S]*--brick-color-success-soft/, "successful copy feedback must receive a distinct semantic treatment");
  assert.match(generatorSource, /from "shiki\/core"[\s\S]*from "shiki\/engine\/javascript"/, "content generation must use the fine-grained Shiki core and JavaScript engine");
  assert.doesNotMatch(JSON.stringify(manifest.dependencies), /shiki/, "the deployed website runtime must not depend on Shiki");
  assert.equal(manifest.devDependencies.shiki, "^4.4.1", "the build-time highlighter must remain explicit and versioned");
  assert.ok(cache.entries.length > 300, "the committed cache must cover the complete source-backed documentation corpus");
  assert.deepEqual([...new Set(cache.entries.map((entry) => entry.language))].sort(), ["bash", "css", "html", "text", "ts", "tsx"], "only the documented language set should be generated");
  for (const token of ["foreground", "comment", "keyword", "string", "constant", "function", "type", "property", "punctuation"]) {
    assert.match(css, new RegExp(`--brick-syntax-${token}: #[0-9a-f]{6};`, "i"), `the website syntax theme must define ${token}`);
  }
  assert.match(css, /\.brick-code-block-pre span \{ color: CanvasText !important;/, "Forced Colors must collapse decorative token colors to system text");
  assert.match(previewSource, /case "code-block"[\s\S]*--brick-syntax-type/, "the dedicated Code Block example must demonstrate the same syntax palette");
});

test("homepage hero retains its height-aware first-viewport contract", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /padding-block: clamp\(2\.75rem, 6dvh, 5rem\)/, "hero vertical rhythm must respond to viewport height");
  assert.match(css, /min-height: clamp\(30rem, 66dvh, 35rem\)/, "workspace must compress only within its usable height range");
  assert.match(css, /@media \(min-width: 1321px\) and \(max-height: 820px\)/, "short wide desktop windows must receive an explicit hero layout policy");
  assert.match(css, /@media \(max-width: 1320px\)/, "hero must stack before the live composition becomes cramped");
  assert.match(css, /min-height: calc\(100svh - var\(--site-header-height\)\)/, "stacked conversion content must own the initial viewport before the demo begins");
  assert.match(css, /\.hero-proof \.brick-badge \{ gap: \.35rem; \}/, "package badges must separate their status icon from their label");
  assert.match(css, /\.hero-proof \{ width: 100%; justify-content: center; \}/, "only narrow-mobile package badges must move onto a centered axis");
  const homepageSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(homepageSource, /Live Brick composition/, "stacked hero must identify the live component demonstration");
  assert.match(homepageSource, /Meet Northstar, built entirely with Brick/, "stacked demo eyebrow must introduce a titled section");
  assert.match(homepageSource, /demo website project assembled from published Brick components/, "stacked hero must explain the demonstration context");
  assert.match(homepageSource, /Brick v\{source\.version\} is here/, "release eyebrow must present the version with its conventional prefix");
  assert.match(homepageSource, /<ul className="hero-proof"/, "package qualities must retain list semantics while using badges");
  const workspaceSource = await readFile(new URL("../app/components/ProductWorkspace.tsx", import.meta.url), "utf8");
  assert.match(workspaceSource, /setActiveSection\(id\)/, "workspace navigation must update its selected view");
  assert.match(workspaceSource, /aria-pressed=\{activeSection === id\}/, "workspace navigation must expose its selected state");
  assert.match(workspaceSource, /<BrandMark compact \/>/, "workspace title bar must carry Brick identity");
  assert.match(workspaceSource, /workspace-preview-summary/, "preview dialog must use a structured product summary");
  assert.match(workspaceSource, /workspace-publish-checklist/, "publish dialog must use a structured launch checklist");
  assert.doesNotMatch(workspaceSource, /<Dialog\.Body><Badge/, "dialog bodies must not stretch a status badge as their primary layout");
});

test("site search opens with an explicit initial focus target", async () => {
  const headerSource = await readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8");
  assert.match(headerSource, /const searchInputRef = useRef<HTMLInputElement>\(null\)/, "site search must retain a native input focus target");
  assert.match(headerSource, /<Dialog\.Content[^>]*initialFocus=\{searchInputRef\}/, "Dialog must own initial search focus through its published focus contract");
  assert.match(headerSource, /<Input[\s\S]*ref=\{searchInputRef\}/, "the search field must receive the Dialog initial-focus ref");
  assert.doesNotMatch(headerSource, /<Input[\s\S]*autoFocus/, "native autofocus must not race the Dialog focus lifecycle");
});

const routes = [
  ["/", /Build interfaces that already feel finished/i],
  ["/docs", /Build with Brick/i],
  ["/components", /75 component owners/i],
  ["/components/button", /Maintainer resources/i],
  ["/components/visually-hidden", /Maintainer resources/i],
  ["/docs/getting-started", /Getting started/i],
  ["/themes", /Change the voice, not the component/i],
  ["/atom", /Behavior beneath the surface/i],
];

for (const [pathname, expected] of routes) {
  test(`server-renders ${pathname}`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, expected);
    assert.match(html, /Brick UI/);
    assert.doesNotMatch(html, /vinext-starter|Your site is taking shape/);
    if (pathname === "/docs") {
      assert.match(html, /href="#guide-paths"/, "Docs overview rail must link to its guide-path section");
      assert.match(html, /id="guide-paths"/, "Docs overview section must expose the rail's matching anchor target");
    }
    if (pathname === "/docs/getting-started") {
      assert.match(html, /href="#install-brick"/, "guide rail must link to the first authored guide heading");
      assert.match(html, /<h2 id="install-brick">Install Brick<\/h2>/, "guide heading must expose the rail's matching anchor target");
      assert.match(html, /class="brick-code-block"[^>]*data-language="bash"/, "guide fences must render through the published Brick Code Block");
      assert.match(html, /var\(--brick-syntax-(?:keyword|string|function|punctuation)\)/, "server-rendered guide code must contain build-time syntax tokens");
    }
    if (pathname === "/components/button") {
      assert.match(html, /href="#live-example"/, "component rail must link to the live package example");
      assert.match(html, /id="live-example"/, "the live package example must expose the rail's matching target");
      assert.match(html, /href="#choose-this-component"/, "component rail must include the consumer usage decision");
      assert.match(html, /id="choose-this-component"/, "component guidance must expose the rail's matching target");
      assert.match(html, /class="brick-table"/, "component API matrices must render through the published Brick Table");
    }
    if (pathname === "/components/visually-hidden") {
      assert.doesNotMatch(html, /<h2[^>]*>Examples<\/h2>/, "a playground redirect must not appear as a consumer Examples section");
      assert.match(html, />Playground<\/span>/, "the playground destination must remain available in Maintainer resources");
    }
    if (pathname === "/") {
      assert.match(html, /<link rel="icon" href="\/favicon\.svg" type="image\/svg\+xml"\s*\/?>/, "favicon must resolve against the current host");
      assert.doesNotMatch(html, /https:\/\/brick-ui\.com\/favicon\.svg/, "favicon must not depend on the future custom domain");
      assert.match(html, /aria-keyshortcuts="Meta\+K Control\+K"/, "search trigger must expose its implemented keyboard shortcuts");
      assert.match(html, /aria-label="Search Brick documentation"/, "search trigger must retain a name when its visible label is hidden");
      assert.match(html, /<kbd class="shortcut">⌘K<\/kbd>/, "search shortcut must be presented as a key command");
      assert.match(html, /octicon-mark-github/, "GitHub action must use the recognizable GitHub mark");
      const inputs = [...html.matchAll(/<input\b[^>]*>/g)].map((match) => match[0]);
      assert.ok(inputs.length > 0, "homepage must render its workspace filter");
      for (const input of inputs) {
        assert.match(input, /\s(?:id|name)="[^"]+"/, "every homepage input must have browser autofill identity");
      }
      assert.equal((html.match(/<main\b/g) ?? []).length, 1, "homepage must have exactly one main landmark");
      const headingLevels = [...html.matchAll(/<h([1-6])\b/g)].map((match) => Number(match[1]));
      assert.equal(headingLevels[0], 1, "homepage heading hierarchy must start at h1");
      for (let index = 1; index < headingLevels.length; index += 1) {
        assert.ok(headingLevels[index] <= headingLevels[index - 1] + 1, `homepage heading order skips from h${headingLevels[index - 1]} to h${headingLevels[index]}`);
      }
    }
  });
}
