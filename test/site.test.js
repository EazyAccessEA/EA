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
  for (const r of ["/", "/work/", "/how-we-work", "/contact", "/privacy", "/cookies", "/terms", "/terms-of-business"])
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

test("tools: the count in the home copy matches tools.json", () => {
  const { groups } = JSON.parse(readFileSync(new URL("../tools.json", import.meta.url), "utf8"));
  const n = groups.reduce((a, [, list]) => a + list.length, 0);
  const words = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
  const say = (k) => (k <= 20 ? words[k] : ["", "", "twenty", "thirty", "forty"][Math.floor(k / 10)] + (k % 10 ? "-" + words[k % 10] : ""));
  const home = pages.find((p) => p.rel === "index.html").html;
  assert.match(home, new RegExp(`>${say(n)} tools`, "i"));
  assert.equal((home.match(/class="tile"/g) || []).length, n);
});

test("tools: every card's text passes WCAG AA (4.5:1) on its brand colour", () => {
  const lum = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
  const home = pages.find((p) => p.rel === "index.html").html;
  const bad = [];
  for (const [, id, tb, tf] of home.matchAll(/<article class="tool-card" id="([^"]+)" style="--tb:([^;]+);--tf:(#[0-9A-F]{6})"/gi))
    for (const stop of tb.match(/#[0-9A-F]{6}/gi)) {
      const [a, b] = [lum(stop), lum(tf)];
      const r = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      if (r < 4.5) bad.push(`${id} ${tf} on ${stop}: ${r.toFixed(2)}`);
    }
  assert.ok(home.includes('class="tool-card"'));
  assert.deepEqual(bad, []);
});

test("contact details never appear in page source or scripts (anti-harvesting)", () => {
  const js = readFileSync(join(OUT, "main.js"), "utf8");
  for (const { rel, html } of [...pages, { rel: "main.js", html: js }]) {
    assert.ok(!/info@eazyaccess\.org/i.test(html), `${rel}: raw email`);
    assert.ok(!/0?7349\s?897\s?644|447349897644/.test(html.replace(/[\s-]/g, "")), `${rel}: raw phone`);
  }
});

// SEO gates (qa/seo): structured data says only what CLAUDE.md confirms, and registered details stay on legal pages.
const ORIGIN = "https://eazyaccess.org";
const ld = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
const real = pages.filter((p) => p.rel !== "404.html");

test("SEO-B: every real page has one JSON-LD graph naming the studio", () => {
  for (const p of real) {
    const blocks = ld(p.html);
    assert.equal(blocks.length, 1, p.rel);
    const org = blocks[0]["@graph"].find((n) => n["@id"] === `${ORIGIN}/#org`);
    assert.ok(org, `${p.rel}: no Organization`);
    assert.equal(org.name, "eazy/access");
    assert.equal(org.url, `${ORIGIN}/`);
    const page = blocks[0]["@graph"].find((n) => n["@type"] === "WebPage" || n["@type"] === "AboutPage" || n["@type"] === "ContactPage" || n["@type"] === "CollectionPage");
    assert.equal(page?.url, ORIGIN + routeOf(p.rel), `${p.rel}: WebPage url`);
  }
});

test("SEO-B: legal pages carry the registered facts, exactly as CLAUDE.md states them", () => {
  for (const p of real.filter((p) => /^(privacy|terms|terms-of-business|cookies)\.html$/.test(p.rel))) {
    const org = ld(p.html)[0]["@graph"].find((n) => n["@id"] === `${ORIGIN}/#org`);
    assert.equal(org.legalName, "EAZY ACCESS LTD", p.rel);
    assert.equal(org.identifier?.value, "13205428", p.rel);
  }
});

test("SEO-C: company number and registered office appear on legal pages only", () => {
  for (const p of pages.filter((p) => !/^(privacy|terms|terms-of-business|cookies)\.html$/.test(p.rel))) {
    assert.ok(!/13205428|Shelton Street|EAZY ACCESS LTD/.test(p.html), p.rel);
  }
});

test("SEO-B: each work page describes its project and links to the live site it shows", () => {
  for (const p of real.filter((p) => /^work\/(?!index)/.test(p.rel))) {
    const g = ld(p.html)[0]["@graph"];
    const work = g.find((n) => n["@type"] === "CreativeWork");
    const live = p.html.match(/<dt>Live at<\/dt><dd><a[^>]*href="([^"]+)"/)[1];
    assert.equal(work?.url, live, p.rel);
    assert.equal(work.creator?.["@id"], `${ORIGIN}/#org`, p.rel);
    assert.ok(g.some((n) => n["@type"] === "BreadcrumbList"), `${p.rel}: breadcrumb`);
  }
});

test("SEO-B: no contact detail or invented proof leaks through structured data", () => {
  for (const p of real) {
    const s = JSON.stringify(ld(p.html));
    assert.ok(!/@eazyaccess|telephone|aggregateRating|review|award/i.test(s), p.rel);
  }
});

test("SEO: every sitemap URL has an ISO lastmod", () => {
  const xml = readFileSync(join(OUT, "sitemap.xml"), "utf8");
  const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  assert.ok(urls.length >= 13);
  for (const u of urls) assert.match(u, /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/, u);
});
