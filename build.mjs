// Wraps each page fragment in pages/ with the shared head, header, menu and footer, and writes public/.
// A fragment starts with <!--{json}--> : title, description, nav (work|how|contact), main (class),
// turnstile (bool), sticky (default true), draw (bool, home wordmark).
import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";

const SRC = "pages", OUT = "public", ORIGIN = "https://eazyaccess.org";
const files = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? files(join(d, f)) : f.endsWith(".html") ? [join(d, f)] : []));
const route = (rel) => "/" + rel.replace(/\.html$/, "").replace(/(^|\/)index$/, "$1");
const dot = (w = 8, h = 16) => `<span class="dot" aria-hidden="true"><svg viewBox="0 0 10 20" width="${w}" height="${h}"><path d="M8.5 1.5L1.5 18.5"/></svg></span>`;
const cur = (m, k) => (m.nav === k ? ' aria-current="page"' : "");

// Footer wordmark, inline so CSS and main.js can outline it and move the reveal mask (see styles.css "Giant wordmark").
// Paths come from the brand file, so the outlined wordmark stays the single source.
const [LETTERS, SLASH] = ["#F3F3F1", "#E8663A"].map((f) => readFileSync(join(OUT, "brand/wordmark-white.svg"), "utf8").match(new RegExp(`fill="${f}" d="([^"]+)"`))[1]);
const FOOT_MARK = `<div class="foot-mark" aria-hidden="true"><svg viewBox="0 -700 4886 920" focusable="false"><defs><path id="fm-l" d="${LETTERS}"/><path id="fm-s" d="${SLASH}"/>`
  + `<radialGradient id="fm-g" gradientUnits="userSpaceOnUse" cx="-999" cy="-999" r="720"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#fff" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>`
  + `<mask id="fm-m" maskUnits="userSpaceOnUse" x="0" y="-700" width="4886" height="920"><rect x="0" y="-700" width="4886" height="920" fill="url(#fm-g)"/></mask></defs>`
  + `<use href="#fm-l" class="fm-line"/><use href="#fm-l" class="fm-bg"/><g class="fm-lit" mask="url(#fm-m)"><use href="#fm-l" class="fm-fill"/></g>`
  + `<use href="#fm-s" class="fm-slash"/><use href="#fm-s" class="fm-hot" mask="url(#fm-m)"/></svg></div>`;

const BAND = `<section class="band" aria-labelledby="band-title">
  <div class="band-inner">
    <div><h2 id="band-title">Let's <em>talk.</em></h2><p>Tell us what you need. The person who'd build your site replies within two working days.</p></div>
    <div class="band-actions"><a class="band-cta" href="/contact"><span class="roll">Start a project</span>${dot(9, 18)}</a><a class="band-email" href="mailto:info@eazyaccess.org">info@eazyaccess.org</a></div>
  </div>
</section>`;

// Tools section: tiles grouped by job, and one card per tool (the first open; main.js switches them).
const SITES = {
  farmcompanion: ["Farm Companion", "#F2D9A4", "#1E1A12"], sagheerah: ["Sagheerah", "#0E3B33", "#F4EDE4"],
  flintmere: ["Flintmere", "#F2C230", "#141416"], deeper: ["deeper.tools", "#D52B1E", "#FFFFFF"],
  pageperfect: ["PagePerfect", "#F3F3F1", "#141416"], callandconsequence: ["Call and Consequence", "#E9DFCB", "#1C1A16"],
};
// WCAG contrast: pick ink or white text, whichever reads better on every stop of the brand colour.
const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
function textOn(stops) {
  const worst = (fg) => Math.min(...stops.map((s) => ratio(lum(s), lum(fg))));
  return worst("#141416") >= worst("#FFFFFF") ? "#141416" : "#FFFFFF";
}
const fill = (stops) => (stops.length > 1 ? `linear-gradient(120deg,${stops.join(",")})` : stops[0]);

function tools() {
  const { groups } = JSON.parse(readFileSync("tools.json", "utf8"));
  const open = "Cloudflare Workers";
  let tiles = "", cards = "", rail = "", total = 0;
  for (const [group, list] of groups) {
    tiles += `<div class="stack-group"><p class="stack-label">${group}</p><div class="stack-tiles">`;
    rail += `<button type="button" class="rail-btn" data-first="${total}">${group}</button>`; // phones: jump to the group's first card
    total += list.length;
    list.forEach(([name, why, used, colour], i) => {
      const id = "tool-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const on = name === open;
      const stops = colour.split(" ");
      const brand = `--tb:${fill(stops)};--tf:${textOn(stops)}`;
      tiles += `<button type="button" class="tile" aria-pressed="${on}" aria-controls="${id}" tabindex="${on ? 0 : -1}" style="${brand}">${name}</button>`; // one tab stop; arrows move between tiles
      const chips = used.map((s) => s === "site"
        ? `<li><span class="chip chip-site">This site</span></li>`
        : `<li><a class="chip" href="/work/${s}" style="--dot:${SITES[s][1]}">${SITES[s][0]}</a></li>`).join("")
        + (used.length > 3 ? `<li class="more" aria-hidden="true"><span class="chip chip-site">+${used.length - 3} more</span></li>` : ""); // phones show three
      let k = 0; // letters roll in one by one; each word stays whole so a phone never breaks "Workers" mid-word
      const letters = name.split(" ").map((word) => `<span class="w">${[...word].map((ch) => `<span style="--k:${k++}">${ch}</span>`).join("")}</span>`).join(" ");
      cards += `<article class="tool-card" id="${id}" style="${brand}"${on ? "" : " hidden"}><p class="tool-kicker">${group} <span aria-hidden="true">/</span> ${i + 1} of ${list.length}</p><h3 aria-label="${name}"><span class="tool-name" aria-hidden="true">${letters}</span></h3><p class="tool-why">${why}</p><p class="tool-used">Used on</p><ul class="used-list">${chips}</ul><p class="tool-giant" aria-hidden="true" data-giant="${name.split(" ")[0]}"></p></article>`;
    });
    tiles += `</div></div>`;
  }
  return `<div class="stack"><div class="stack-rail" aria-label="Jump to a group">${rail}</div><div class="stack-groups">${tiles}</div><div class="tool-cards" aria-live="polite">${cards}</div>`
    + `<div class="stack-count"><p><span class="n">1</span> of ${total}</p><span class="bar" aria-hidden="true"><i></i></span>`
    + `<button type="button" class="deck-btn" data-step="-1" aria-label="Previous tool">←</button><button type="button" class="deck-btn" data-step="1" aria-label="Next tool">→</button></div></div>`;
}

// Structured data: one JSON-LD graph per page. Facts only from CLAUDE.md; the registered details go on
// legal pages only (Companies Act disclosure rule), and no email or phone (anti-harvesting).
const decode = (s) => s.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
const ORG_ID = `${ORIGIN}/#org`;
// Our social profiles: footer links and the Organization's sameAs.
const SOCIAL = [["Instagram", "https://www.instagram.com/eazyaccessuk/"], ["Threads", "https://www.threads.com/@eazyaccessuk"], ["Facebook", "https://www.facebook.com/profile.php?id=61596628206529"], ["LinkedIn", "https://www.linkedin.com/company/eazyaccessuk/"]];
function schema(m, body, path) {
  const org = {
    "@type": "Organization", "@id": ORG_ID, name: "eazy/access", url: `${ORIGIN}/`, logo: `${ORIGIN}/apple-touch-icon.png`,
    description: "A small UK studio that designs and builds websites, shops and tools.", areaServed: "GB",
    knowsAbout: ["Web design", "Web development", "Online shops", "Web apps"], sameAs: SOCIAL.map(([, u]) => u),
  };
  if (m.main === "legal") Object.assign(org, {
    legalName: "EAZY ACCESS LTD",
    identifier: { "@type": "PropertyValue", propertyID: "Companies House company number", value: "13205428" },
    address: { "@type": "PostalAddress", streetAddress: "71–75 Shelton Street, Covent Garden", addressLocality: "London", postalCode: "WC2H 9JQ", addressCountry: "GB" },
  });
  const type = { "/": "WebPage", "/work/": "CollectionPage", "/how-we-work": "AboutPage", "/contact": "ContactPage" }[path] || "WebPage";
  const name = m.title === "home" ? "eazy/access · Web design and build, UK" : decode(m.title);
  const graph = [org, { "@type": type, "@id": `${ORIGIN}${path}#page`, url: `${ORIGIN}${path}`, name, description: decode(m.description), inLanguage: "en-GB", isPartOf: { "@id": `${ORIGIN}/#site` }, about: { "@id": ORG_ID } }];
  if (path === "/") graph.push({ "@type": "WebSite", "@id": `${ORIGIN}/#site`, url: `${ORIGIN}/`, name: "eazy/access", publisher: { "@id": ORG_ID }, inLanguage: "en-GB" });
  const live = body.match(/<dt>Live at<\/dt><dd><a[^>]*href="([^"]+)"/);
  if (path.startsWith("/work/") && live) {
    const slug = path.slice(6);
    graph.push({ "@type": "CreativeWork", "@id": `${ORIGIN}${path}#work`, name: decode(m.title), url: live[1], description: decode(m.description), creator: { "@id": ORG_ID }, image: `${ORIGIN}/work/${slug}-desktop.webp`, mainEntityOfPage: { "@id": `${ORIGIN}${path}#page` } });
    graph.push({ "@type": "BreadcrumbList", itemListElement: [["Home", "/"], ["Work", "/work/"], [decode(m.title), path]].map(([n, u], i) => ({ "@type": "ListItem", position: i + 1, name: n, item: ORIGIN + u })) });
  }
  return `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c")}</script>`;
}

// The /sitemap page: every page, grouped, titled from its own front matter, so it never goes stale.
function siteList() {
  const legal = ["/privacy", "/terms", "/terms-of-business", "/cookies"];
  const all = files(SRC).map((f) => {
    const r = route(relative(SRC, f));
    const t = JSON.parse(readFileSync(f, "utf8").match(/^<!--(\{.*?\})-->/s)[1]).title;
    return [r, t === "home" ? "Home" : t];
  }).filter(([r]) => r !== "/404" && r !== "/sitemap");
  const group = (name, list) => `<h2>${name}</h2><ul>${list.map(([r, t]) => `<li><a href="${r}">${t}</a></li>`).join("")}</ul>`;
  const order = (a, b) => (a[0] === "/" ? -1 : b[0] === "/" ? 1 : a[0].localeCompare(b[0]));
  return group("Pages", all.filter(([r]) => !r.startsWith("/work/") && !legal.includes(r)).sort(order))
    + group("Work", all.filter(([r]) => r.startsWith("/work/")).sort(order))
    + group("Legal", legal.map((r) => all.find(([x]) => x === r)).filter(Boolean));
}

function page(m, body, path) {
  body = body.replace("<!--#band-->", BAND).replace("<!--#tools-->", () => tools()).replace("<!--#sitemap-->", () => siteList());
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
<meta property="og:type" content="website">
<meta property="og:url" content="${ORIGIN}${path}">
<meta property="og:image" content="${ORIGIN}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="eazy/access: Websites people actually use.">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<!-- Adobe Fonts web project (Degular, Degular Display, IvyPresto Display). Must use Adobe's embed; never self-host. -->
<link rel="preconnect" href="https://use.typekit.net" crossorigin>
<link rel="preconnect" href="https://p.typekit.net" crossorigin>
<script>
  // Adobe Fonts' CSS embed, inserted by script so it never holds up the first paint. Unlike the JS kit
  // (which downloads all 42 faces in the project), the browser fetches only the faces a page uses.
  var l=document.createElement("link");l.rel="stylesheet";l.href="https://use.typekit.net/arw2hlv.css";document.head.appendChild(l);
</script>
<noscript><link rel="stylesheet" href="https://use.typekit.net/arw2hlv.css"></noscript>
<link rel="stylesheet" href="/styles.css">
${path === "/404" ? "" : schema(m, body, path) + "\n"}${m.draw ? `<script>document.documentElement.classList.add("mark-on");try{sessionStorage.getItem("drawn")?document.documentElement.classList.add("drawn"):sessionStorage.setItem("drawn","1")}catch(e){}</script>\n` : ""}${m.turnstile ? `<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>\n` : ""}<script src="/main.js" defer></script>
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

<div class="menu" id="menu" role="dialog" aria-modal="true" aria-label="Menu" hidden>
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
${m.sticky === false ? "" : `<a class="sticky-talk" href="/contact">Let's talk · replies in 2 working days${dot(9, 18)}</a>\n`}</main>

<footer class="footer">
  <div class="foot-top">
    <div class="foot-studio">
      <p class="foot-lede">A small UK studio that designs and builds websites, shops and tools. One person, from first message to launch.</p>
      <p class="status foot-status" data-status>UK time</p>
      <div><a class="big-email light" href="mailto:info@eazyaccess.org">info@eazyaccess.org</a><p class="foot-phone" data-phone="44679894370" hidden><a></a></p></div>
    </div>
    <div class="foot-cols">
      <nav aria-labelledby="foot-pages"><p class="foot-label" id="foot-pages">Pages</p><a href="/work/">Work</a><a href="/how-we-work">How we work</a><a href="/contact">Contact</a></nav>
      <nav aria-labelledby="foot-follow"><p class="foot-label" id="foot-follow">Follow</p>${SOCIAL.map(([n, u]) => `<a href="${u}" rel="me">${n}</a>`).join("")}<span class="foot-wa" data-phone="44679894370" data-wa hidden><a>WhatsApp</a></span></nav>
    </div>
  </div>
  <div class="foot-base">
    <p class="foot-copy">${m.main === "legal" ? "EAZY ACCESS LTD · Registered in England and Wales, company number 13205428 · ICO registration ZC137268" : `© ${new Date().getFullYear()} eazy/access · Web design and build, UK`}</p>
    <nav class="foot-legal" aria-label="Legal"><a href="/privacy">Privacy</a><a href="/terms">Terms of use</a><a href="/terms-of-business">Terms of business</a><a href="/cookies">Cookies</a><a href="/sitemap">Sitemap</a></nav>
    <p class="foot-note">No tracking cookies</p>
  </div>
${path === "/" ? "" : `  ${FOOT_MARK}\n`}</footer>
</body>
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

// Security headers (public/_headers). The CSP allows only this site, Adobe Fonts and Cloudflare Turnstile,
// and pins each inline script by its hash, so no other inline script can run.
const built = files(OUT).map((f) => readFileSync(f, "utf8"));
const hashes = new Set();
for (const html of built)
  for (const [, js] of html.matchAll(/<script>([\s\S]*?)<\/script>/g))
    hashes.add(`'sha256-${createHash("sha256").update(js).digest("base64")}'`);
const csp = [
  "default-src 'self'",
  `script-src 'self' ${[...hashes].join(" ")} https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline' https://use.typekit.net https://p.typekit.net", // inline style attributes carry each project's colours
  "font-src 'self' https://use.typekit.net",
  "img-src 'self' data: https://p.typekit.net",
  "connect-src 'self' https://use.typekit.net https://p.typekit.net https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "frame-ancestors 'none'", "base-uri 'self'", "form-action 'self'", "object-src 'none'",
].join("; ");
writeFileSync(join(OUT, "_headers"), `/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Content-Security-Policy: ${csp}
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
`);
// Sitemap of every real page (not the 404), and a robots.txt that points to it.
// lastmod = the source file's last commit date; today if it has uncommitted edits or git isn't there.
const today = new Date().toISOString().slice(0, 10);
const lastmod = (f) => {
  try {
    if (execFileSync("git", ["status", "--porcelain", "--", f], { encoding: "utf8" }).trim()) return today;
    return execFileSync("git", ["log", "-1", "--format=%cs", "--", f], { encoding: "utf8" }).trim() || today;
  } catch { return today; }
};
const urls = files(SRC).map((f) => [route(relative(SRC, f)), lastmod(f)]).filter(([r]) => r !== "/404").sort();
writeFileSync(join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, d]) => `  <url><loc>${ORIGIN}${u}</loc><lastmod>${d}</lastmod></url>`).join("\n")}
</urlset>
`);
writeFileSync(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);
console.log(`built ${files(SRC).length} pages; ${hashes.size} inline scripts pinned in the CSP; sitemap of ${urls.length}`);
