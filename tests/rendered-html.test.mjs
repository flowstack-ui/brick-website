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
  assert.match(headerSource, /<BrandMark \/>/, "drawer must retain Brick identity");
  assert.match(headerSource, /<NavList\.Root/, "drawer navigation must use the published Brick navigation primitive");
  assert.match(headerSource, /Build interfaces from pieces that belong together\./, "drawer must retain its product-specific title");
  assert.match(headerSource, /pathname\.startsWith\(href\)/, "drawer must identify the current product section");
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
