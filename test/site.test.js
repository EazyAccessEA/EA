// Gates G1, G3, G4 (PLAN.md "Split into pages"). Runs against the built public/ (npm test builds first).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../public/", import.meta.url));
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const pages = walk(OUT).filter((f) => f.endsWith(".html")).map((f) => ({ rel: relative(OUT, f), html: readFileSync(f, "utf8") }));
const routeOf = (rel) => "/" + rel.replace(/\.html$/, "").replace(/(^|\/)index$/, "$1");

function resolves(href) {
  const p = decodeURI(href.split(/[?#]/)[0]);
  if (p === "/") return existsSync(join(OUT, "index.html"));
  if (p.endsWith("/")) return existsSync(join(OUT, p, "index.html"));
  return existsSync(join(OUT, p)) || existsSync(join(OUT, p + ".html"));
}

test("there are real pages, not one long page", () => {
  for (const r of ["/", "/work/", "/how-we-work", "/contact", "/privacy", "/cookies", "/terms"])
    assert.ok(pages.some((p) => routeOf(p.rel) === r), r);
  assert.equal(pages.filter((p) => p.rel.startsWith("work/") && !p.rel.endsWith("index.html")).length, 6);
});

test("G3: every internal link resolves to a built file", () => {
  const bad = [];
  for (const p of pages)
    for (const [, href] of p.html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) if (!resolves(href)) bad.push(`${p.rel} → ${href}`);
  assert.deepEqual(bad, []);
});

test("G4: every page has its own title, a description and a canonical", () => {
  const titles = pages.map((p) => p.html.match(/<title>(.*?)<\/title>/)?.[1]);
  assert.equal(new Set(titles).size, pages.length, "duplicate or missing <title>");
  for (const p of pages) {
    assert.match(p.html, /<meta name="description" content="[^"]{20,}"/, p.rel);
    assert.match(p.html, new RegExp(`<link rel="canonical" href="https://eazyaccess\\.org${routeOf(p.rel).replace(/[/.]/g, "\\$&")}">`), p.rel);
  }
});

test("G4: main nav links are pages, never jump links", () => {
  for (const p of pages) {
    const nav = p.html.match(/<nav class="nav-pill"[\s\S]*?<\/nav>/)[0];
    assert.ok(!/href="#/.test(nav), p.rel);
  }
});

test("G1: every page with a Turnstile widget runs the Worker first (local key swap)", () => {
  const cfg = readFileSync(new URL("../wrangler.jsonc", import.meta.url), "utf8");
  const first = JSON.parse(cfg.match(/"run_worker_first":\s*(\[[^\]]*\])/)[1]);
  for (const p of pages.filter((p) => p.html.includes('class="cf-turnstile"'))) assert.ok(first.includes(routeOf(p.rel)), routeOf(p.rel));
});

test("contact details never appear in page source or scripts (anti-harvesting)", () => {
  const js = readFileSync(join(OUT, "main.js"), "utf8");
  for (const { rel, html } of [...pages, { rel: "main.js", html: js }]) {
    assert.ok(!/info@eazyaccess\.org/i.test(html), `${rel}: raw email`);
    assert.ok(!/0?7349\s?897\s?644|447349897644/.test(html.replace(/[\s-]/g, "")), `${rel}: raw phone`);
  }
});
