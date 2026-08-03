import assert from "node:assert/strict";
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
  });
}
