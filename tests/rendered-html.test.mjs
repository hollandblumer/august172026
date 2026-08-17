import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the EWEy password gate", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>EWEy — Step Inside the Worlds You Love<\/title>/i);
  assert.match(html, /Private preview/);
  assert.match(html, /Step inside\./);
  assert.match(html, /type="password"/);
});

test("builds the standalone GitHub Pages entry", async () => {
  const [html] = await Promise.all([
    readFile(new URL("../dist-pages/index.html", import.meta.url), "utf8"),
    access(new URL("../dist-pages/ewey-reference.html", import.meta.url)),
    access(new URL("../dist-pages/favicon.svg", import.meta.url)),
  ]);

  assert.match(html, /\/august172026\/assets\/index-[^"']+\.js/);
  assert.match(html, /EWEy — Step Inside the Worlds You Love/);
});
