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
  assert.match(css, /\.docs-sidebar a, \.docs-rail a \{[^}]*min-height: 2\.35rem;[^}]*font-size: \.9rem;[^}]*line-height: 1\.35;/, "documentation links must not use compact metadata-sized text or targets");
  assert.match(css, /\.docs-nav-label, \.docs-rail > span \{[^}]*font-size: \.75rem;[^}]*line-height: 1\.4;/, "documentation rail labels must retain a readable supporting scale");
  assert.match(css, /@media \(max-width: 1180px\)[\s\S]*\.docs-rail \{ display: none; \}/, "the right rail must leave the layout before text zoom compresses the article");
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*\.docs-shell \{ display: block; \}/, "the remaining documentation navigation must reflow before narrow layouts");
});

test("icon-led cards use one explicit composition pattern", async () => {
  const homepageSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const atomSource = await readFile(new URL("../app/atom/page.tsx", import.meta.url), "utf8");
  const docsSource = await readFile(new URL("../app/docs/page.tsx", import.meta.url), "utf8");
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(homepageSource, /<Card\.Header className="icon-card-header">/, "homepage feature cards must opt into the shared icon composition");
  assert.match(atomSource, /<Card\.Header className="icon-card-header">/, "Atom ownership cards must opt into the shared icon composition");
  assert.match(docsSource, /<Card\.Header className="icon-card-header">/, "documentation path cards must opt into the shared icon composition");
  assert.match(css, /\.icon-card-header \{ grid-template-columns: minmax\(0, 1fr\); gap: \.8rem; \}/, "icon card headers must own a comfortable explicit vertical gap");
  assert.match(docsSource, /Documentation · v\{source\.version\}/, "documentation version badge must use the conventional version prefix");
  assert.match(docsSource, /<Link className="pillar-link" href=\{path\.href\}>Read guide<ArrowRight/, "documentation cards must use the animated editorial link pattern");
  assert.doesNotMatch(docsSource, /variant="ghost"/, "documentation path actions must not reintroduce padded ghost buttons");
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

const routes = [
  ["/", /Build interfaces that already feel finished/i],
  ["/components", /75 component owners/i],
  ["/components/button", /View source documentation/i],
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
