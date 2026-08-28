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
