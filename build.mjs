// Wraps each page fragment in pages/ with the shared head, header, menu and footer, and writes public/.
// A fragment starts with <!--{json}--> : title, description, nav (work|how|contact), main (class),
// turnstile (bool), sticky (default true), draw (bool, home wordmark).
import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";

const SRC = "pages", OUT = "public", ORIGIN = "https://eazyaccess.org";
const files = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? files(join(d, f)) : f.endsWith(".html") ? [join(d, f)] : []));
const route = (rel) => "/" + rel.replace(/\.html$/, "").replace(/(^|\/)index$/, "$1");
const dot = (w = 8, h = 16) => `<span class="dot" aria-hidden="true"><svg viewBox="0 0 10 20" width="${w}" height="${h}"><path d="M8.5 1.5L1.5 18.5"/></svg></span>`;
const cur = (m, k) => (m.nav === k ? ' aria-current="page"' : "");

const BAND = `<section class="band" aria-labelledby="band-title">
  <div class="band-inner">
    <div><h2 id="band-title">Let's <em>talk.</em></h2><p>Tell us what you need. The person who'd build your site replies within two working days.</p></div>
    <div class="band-actions"><a class="band-cta" href="/contact"><span class="roll">Start a project</span>${dot(9, 18)}</a><a class="band-email" href="mailto:info@eazyaccess.org">info@eazyaccess.org</a></div>
  </div>
</section>`;

// Tools section: tiles grouped by job, and one card per tool (the first open; main.js switches them).
const SITES = {
  farmcompanion: ["FarmCompanion", "#F2D9A4", "#1E1A12"], sagheerah: ["Sagheerah", "#0E3B33", "#F4EDE4"],
  flintmere: ["Flintmere", "#F2C230", "#141416"], deeper: ["deeper.tools", "#D52B1E", "#FFFFFF"],
  pageperfect: ["PagePerfect", "#F3F3F1", "#141416"], callandconsequence: ["Call and Consequence", "#E9DFCB", "#1C1A16"],
};
function tools() {
  const { groups } = JSON.parse(readFileSync("tools.json", "utf8"));
  const open = "Cloudflare Workers";
  let tiles = "", cards = "";
  for (const [group, list] of groups) {
    tiles += `<div class="stack-group"><p class="stack-label">${group}</p><div class="stack-tiles">`;
    list.forEach(([name, why, used], i) => {
      const id = "tool-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const on = name === open;
      tiles += `<button type="button" class="tile" aria-pressed="${on}" aria-controls="${id}">${name}</button>`;
      const chips = used.map((s) => s === "site"
        ? `<li><span class="chip chip-site">This site</span></li>`
        : `<li><a class="chip" href="/work/${s}" style="--bg:${SITES[s][1]};--fg:${SITES[s][2]}">${SITES[s][0]}</a></li>`).join("");
      cards += `<article class="tool-card" id="${id}"${on ? "" : " hidden"}><p class="tool-kicker">${group} <span aria-hidden="true">/</span> ${i + 1} of ${list.length}</p><h3>${name}</h3><p class="tool-why">${why}</p><p class="tool-used">Used on</p><ul class="chips">${chips}</ul></article>`;
    });
    tiles += `</div></div>`;
  }
  return `<div class="stack"><div class="stack-groups">${tiles}</div><div class="tool-cards" aria-live="polite">${cards}</div></div>`;
}

function page(m, body, path) {
  body = body.replace("<!--#band-->", BAND).replace("<!--#tools-->", () => tools());
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${m.title === "home" ? "eazy/access · Web design and build, UK" : `${m.title} · eazy/access`}</title>
<meta name="description" content="${m.description}">
<link rel="canonical" href="${ORIGIN}${path}">
<meta property="og:title" content="${m.title === "home" ? "eazy/access · Web design and build, UK" : `${m.title} · eazy/access`}">
<meta property="og:description" content="${m.description}">
<link rel="icon" href="/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<!-- Adobe Fonts web project (Degular, Degular Display, IvyPresto Display). Must use Adobe's embed; never self-host. -->
<link rel="preconnect" href="https://use.typekit.net" crossorigin>
<link rel="preconnect" href="https://p.typekit.net" crossorigin>
<link rel="stylesheet" href="https://use.typekit.net/arw2hlv.css">
<link rel="stylesheet" href="/styles.css">
${m.draw ? `<script>try{sessionStorage.getItem("drawn")?document.documentElement.classList.add("drawn"):sessionStorage.setItem("drawn","1")}catch(e){}</script>\n` : ""}${m.turnstile ? `<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>\n` : ""}<script src="/main.js" defer></script>
</head>
<body${m.main === "legal" ? ' class="legal-page"' : ""}>
<a class="skip" href="#main">Skip to content</a>

<header class="site-header">
  <a class="wordmark" href="/" aria-label="eazy/access, home"><img src="/brand/wordmark-ink.svg" alt="" width="133" height="25"></a>
  <nav class="nav-pill" aria-label="Main">
    <span class="nav-ind" aria-hidden="true"></span><a class="roll" href="/work/"${cur(m, "work")}>Work</a><a class="roll" href="/how-we-work"${cur(m, "how")}>How we work</a><a class="roll" href="/contact"${cur(m, "contact")}>Contact</a>
  </nav>
  <a class="talk-pill" href="/contact"><span class="roll">Let's talk</span>${dot()}</a>
  <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu">Menu<span class="burger" aria-hidden="true"><i></i><i></i></span></button>
</header>

<div class="menu" id="menu" hidden>
  <div class="menu-top">
    <img src="/brand/wordmark-white.svg" alt="eazy/access" width="117" height="22">
    <button class="close-btn" type="button">Close<span class="x" aria-hidden="true">×</span></button>
  </div>
  <nav class="menu-links" aria-label="Menu">
    <a href="/work/" style="--i:0"><span class="t">Work</span> <small>six sites</small></a>
    <a href="/how-we-work" style="--i:1"><span class="t">How we work</span></a>
    <a href="/contact" class="accent" style="--i:2"><span class="t">Let's talk</span></a>
  </nav>
  <div class="menu-foot">
    <p class="status" data-status style="--i:3">UK time</p>
    <a style="--i:4" class="menu-email" href="mailto:info@eazyaccess.org">info@eazyaccess.org</a>
    <a class="cta-orange" style="--i:5" href="/contact">Start a project <span aria-hidden="true">/</span></a>
  </div>
</div>

<main id="main"${m.main ? ` class="${m.main}"` : ""}>
${body.trim()}
</main>

<footer class="footer">
  <div class="foot-top">
    <div><p class="muted">Start a project</p><a class="big-email light" href="mailto:info@eazyaccess.org">info@eazyaccess.org</a><p class="foot-phone" data-phone="44679894370" hidden><a></a></p></div>
    <nav aria-label="Footer"><a href="/work/">Work</a><a href="/how-we-work">How we work</a><a href="/contact">Contact</a></nav>
    <nav aria-label="Legal"><a href="/privacy">Privacy</a><a href="/cookies">Cookies</a><a href="/terms">Terms</a></nav>
  </div>
  <p class="muted small">${m.main === "legal" ? "EAZY ACCESS LTD · Registered in England and Wales, company number 13205428 · ICO registration ZC137268" : "eazy/access · Web design and build, UK · No tracking cookies"}</p>
</footer>
${m.sticky === false ? "" : `\n<a class="sticky-talk" href="/contact">Let's talk · replies in 2 working days${dot(9, 18)}</a>\n`}</body>
</html>
`;
}

// Anti-harvesting: the email never appears in the HTML. The "@" is drawn by CSS ([data-at]) and
// main.js rebuilds the mailto link from data-u/data-d. Without JS the link goes to the contact form.
const guard = (html) => html.replace(
  /<a([^>]*?) href="mailto:info@eazyaccess\.org"([^>]*)>info@eazyaccess\.org<\/a>/g,
  '<a$1 href="/contact" data-u="info" data-d="eazyaccess.org"$2>info<span data-at></span>eazyaccess.org</a>');

for (const file of files(SRC)) {
  const rel = relative(SRC, file);
  const src = readFileSync(file, "utf8");
  const m = JSON.parse(src.match(/^<!--(\{.*?\})-->/s)[1]);
  const out = join(OUT, rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, guard(page(m, src.replace(/^<!--.*?-->/s, ""), route(rel))));
}
console.log(`built ${files(SRC).length} pages`);
