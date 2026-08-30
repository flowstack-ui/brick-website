import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("the public shell renders and contains its content across portable engines", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /Build interfaces that already feel finished/u })).toBeVisible();
  await expect(page.getByRole("main").getByRole("link", { name: "Get started" })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("the public shell has no serious or critical automated accessibility violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations.filter(({ impact }) => impact === "serious" || impact === "critical")).toEqual([]);
});

test("the paid Block detail exposes a live sandbox without exposing source", async ({ page }) => {
  const response = await page.goto("/blocks/application/feed/threaded-comments");
  expect(response?.status()).toBe(200);
  expect(response?.headers()["x-frame-options"]).toBe("DENY");

  await expect(page.getByRole("heading", { level: 1, name: "Threaded Comments Feed" })).toBeVisible();
  await expect(page.getByText("Source is locked")).toBeVisible();
  await expect(page.getByRole("button", { name: "Purchase access — coming soon" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Sign in to unlock — coming soon" })).toBeDisabled();
  await expect(page.getByText(/npx @flowstack-ui\/blocks/u)).toHaveCount(0);

  const previewResponse = await page.request.get("/block-previews/application-feed-threaded-comments/index.html");
  expect(previewResponse.status()).toBe(200);
  expect(previewResponse.headers()["x-frame-options"]).toBe("SAMEORIGIN");
  expect(previewResponse.headers()["access-control-allow-origin"]).toBe("*");
  expect(previewResponse.headers()["content-security-policy"]).toContain("connect-src 'none'");
  expect(previewResponse.headers()["x-robots-tag"]).toContain("noindex");

  const preview = page.frameLocator('iframe[title="Threaded Comments Feed live preview"]');
  await expect(preview.getByRole("feed", { name: "Product feedback discussion" })).toBeVisible();
  await expect(preview.getByRole("article", { name: /Morgan Lee/u })).toBeVisible();
  await expect(preview.getByRole("article", { name: /Theo North/u })).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("the paid Block page has no serious or critical automated accessibility violations", async ({ page }) => {
  await page.goto("/blocks/application/feed/threaded-comments");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations.filter(({ impact }) => impact === "serious" || impact === "critical")).toEqual([]);
});

test("narrow documentation and Block compositions preserve their intended rhythm", async ({ page }) => {
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });

    await page.goto("/components/color-picker");
    const toolbar = page.locator(".docs-mobile-toolbar");
    await expect(toolbar).toBeVisible();
    const [componentsBox, titleBox, sectionsBox] = await Promise.all([
      toolbar.getByRole("button", { name: "Components" }).boundingBox(),
      toolbar.locator(":scope > span").boundingBox(),
      toolbar.getByRole("button", { name: "Open sections on this page" }).boundingBox(),
    ]);
    expect(componentsBox).not.toBeNull();
    expect(titleBox).not.toBeNull();
    expect(sectionsBox).not.toBeNull();
    expect(componentsBox!.x + componentsBox!.width).toBeLessThanOrEqual(titleBox!.x);
    expect(titleBox!.x + titleBox!.width).toBeLessThanOrEqual(sectionsBox!.x);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);

    await page.goto("/blocks");
    const [catalogPreview, catalogCard] = await Promise.all([
      page.locator(".block-catalog-preview").boundingBox(),
      page.locator(".block-catalog-card").boundingBox(),
    ]);
    expect(catalogPreview).not.toBeNull();
    expect(catalogCard).not.toBeNull();
    expect(catalogPreview!.height).toBeGreaterThanOrEqual(240);
    expect(catalogPreview!.height).toBeLessThanOrEqual(256);
    expect(catalogCard!.x + catalogCard!.width).toBeLessThanOrEqual(width - 15);
    expect(Number.parseFloat(await page.locator(".blocks-hero h1").evaluate((element) => getComputedStyle(element).fontSize))).toBeLessThanOrEqual(40);
    expect(await page.locator(".block-catalog-card").evaluate((element) => getComputedStyle(element).display)).toBe("flex");
    expect(Number.parseFloat(await page.locator(".block-catalog-card .block-license-badges").evaluate((element) => getComputedStyle(element).gap))).toBeGreaterThanOrEqual(12);
    expect(Number.parseFloat(await page.locator(".block-catalog-actions").evaluate((element) => getComputedStyle(element).gap))).toBeGreaterThanOrEqual(16);

    await page.goto("/blocks/application/feed/threaded-comments");
    const [mainBox, headerBox, previewBox, accessBox, iframeBox] = await Promise.all([
      page.locator(".block-detail-page").boundingBox(),
      page.locator(".block-detail-header").boundingBox(),
      page.locator(".block-live-preview").boundingBox(),
      page.locator(".block-access-panel").boundingBox(),
      page.locator(".block-preview-frame iframe").boundingBox(),
    ]);
    expect(mainBox).not.toBeNull();
    expect(headerBox).not.toBeNull();
    expect(previewBox).not.toBeNull();
    expect(accessBox).not.toBeNull();
    expect(iframeBox).not.toBeNull();
    expect(headerBox!.y + headerBox!.height).toBeLessThan(previewBox!.y);
    expect(previewBox!.y + previewBox!.height).toBeLessThan(accessBox!.y);
    for (const box of [headerBox!, previewBox!, accessBox!]) {
      expect(box.x).toBeGreaterThanOrEqual(mainBox!.x - 1);
      expect(box.x + box.width).toBeLessThanOrEqual(mainBox!.x + mainBox!.width + 1);
    }
    expect(iframeBox!.height).toBeCloseTo(448, 2);
    expect(Number.parseFloat(await page.locator(".block-detail-header h1").evaluate((element) => getComputedStyle(element).fontSize))).toBeLessThanOrEqual(40);
    expect(Number.parseFloat(await page.locator(".block-preview-heading h2").evaluate((element) => getComputedStyle(element).fontSize))).toBeLessThanOrEqual(32);
    expect(await page.locator(".block-access-card").evaluate((element) => getComputedStyle(element).display)).toBe("flex");
    expect(Number.parseFloat(await page.locator(".block-detail-header .block-license-badges").evaluate((element) => getComputedStyle(element).gap))).toBeGreaterThanOrEqual(12);
    expect(Number.parseFloat(await page.locator(".block-access-actions").evaluate((element) => getComputedStyle(element).gap))).toBeGreaterThanOrEqual(16);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  }
});
