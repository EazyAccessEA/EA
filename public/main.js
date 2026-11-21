// eazy/access: shared behaviour. Each block runs only on pages that have its elements.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

// UK status line. Working hours confirmed by the owner, 20 Nov 2026.
const HOURS = { days: [1, 2, 3, 4, 5], open: 9 * 60, close: 17 * 60 }; // Mon–Fri 09:00–17:00 UK
function ukStatus() {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(new Date()).map((p) => [p.type, p.value]));
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.weekday);
  const mins = Number(parts.hour) * 60 + Number(parts.minute);
  const open = HOURS.days.includes(day) && mins >= HOURS.open && mins < HOURS.close;
  const text = `UK · ${parts.hour}:${parts.minute} · ${open ? "We're in today" : "Back next working day"}`;
  $$("[data-status]").forEach((el) => { el.textContent = text; el.classList.toggle("open", open); });
}
ukStatus(); setInterval(ukStatus, 30_000);

// Contact details are rebuilt here, so harvesters reading the HTML never see them
const MAIL = ["info", "eazyaccess.org"].join("@");
for (const a of $$("[data-u][data-d]")) {
  a.href = `mailto:${a.dataset.u}@${a.dataset.d}`;
  const at = $("[data-at]", a); if (at) at.textContent = "@"; // a real @, so copying the address works
}
for (const el of $$("[data-phone]")) {
  const d = [...el.dataset.phone].reverse().join(""); // stored reversed in the HTML
  const a = $("a", el);
  if ("wa" in el.dataset) { // WhatsApp: open a chat with a message already typed
    a.href = `https://wa.me/44${d.slice(1)}?text=${encodeURIComponent("Hi, I found you on eazyaccess.org. I'd like to talk about a website.")}`;
  } else {
    a.href = `tel:+44${d.slice(1)}`;
    a.textContent = `${d.slice(0, 5)} ${d.slice(5)}`;
  }
  el.hidden = false;
}

// Letter roll: split each .roll into letters; the readable text stays in aria-label
for (const el of $$(".roll")) {
  const text = el.textContent;
  const host = el.closest("a,button") || el;
  host.classList.add("roll-host");
  if (!host.hasAttribute("aria-label")) host.setAttribute("aria-label", host.textContent.trim());
  const wrap = document.createElement("span");
  wrap.className = "roll-in"; wrap.setAttribute("aria-hidden", "true");
  [...text].forEach((c, i) => { const s = document.createElement("span"); s.className = "ch"; s.style.setProperty("--i", i); s.textContent = c; wrap.append(s); });
  el.replaceChildren(wrap);
}

// Menu: real dialog behaviour, focus trapped, Esc closes, focus returns
const menu = $("#menu"), openBtn = $(".menu-btn"), closeBtn = menu && $(".close-btn", menu);
function setMenu(open) {
  menu.hidden = !open;
  openBtn.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
  for (const el of $$("main, .site-header, .footer, .sticky-talk")) el.inert = open; // only the menu is reachable while open
  (open ? closeBtn : openBtn).focus();
}
if (menu) {
  openBtn.addEventListener("click", () => setMenu(true));
  closeBtn.addEventListener("click", () => setMenu(false));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  menu.addEventListener("keydown", (e) => {
    if (e.key === "Escape") return setMenu(false);
    if (e.key !== "Tab") return;
    const f = $$("a,button", menu);
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
    else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
  });
}

// Nav indicator: glides to the hovered link, otherwise rests on the current page
const pill = $(".nav-pill");
if (pill) {
  const ind = $(".nav-ind", pill), links = $$("a", pill), current = $("[aria-current]", pill);
  let first = true;
  const moveTo = (a) => {
    if (!a) return ind.classList.remove("on");
    if (first) { ind.classList.add("instant"); first = false; requestAnimationFrame(() => requestAnimationFrame(() => ind.classList.remove("instant"))); }
    ind.style.setProperty("--x", `${a.offsetLeft}px`);
    ind.style.setProperty("--w", `${a.offsetWidth}px`);
    ind.classList.add("on");
  };
  links.forEach((a) => { a.addEventListener("pointerenter", () => moveTo(a)); a.addEventListener("focus", () => moveTo(a)); });
  pill.addEventListener("pointerleave", () => moveTo(current));
  pill.addEventListener("focusout", (e) => { if (!pill.contains(e.relatedTarget)) moveTo(current); });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => moveTo(current));
}

// Home hero: the big wordmark stands in for the header one while it's on screen (html.mark-on, set early in <head>)
const giant = $(".giant");
if (giant) new IntersectionObserver(([e]) => document.documentElement.classList.toggle("mark-on", e.isIntersecting)).observe(giant);

// Home hero: the slash grid, after 21st.dev Grid Pulse by carolina (MIT), redrawn in our style.
// Columns lean at the slash's 22.1° and one sits on the wordmark's slash. Once per visit a pulse runs along
// that column; cells light where a mouse passes (a tap on phones). Opacity only, nothing lights behind text.
const hero = $(".hero");
if (hero && giant) {
  const T = Math.tan(22.1 * Math.PI / 180), grid = document.createElement("div");
  const lines = document.createElement("b"); // the hairlines; redrawn on resize without touching lit cells
  grid.className = "hero-grid"; grid.setAttribute("aria-hidden", "true"); grid.append(lines); hero.prepend(grid);
  let c, cx, cy, avoid = [], last = "";
  const layout = () => {
    const h = hero.getBoundingClientRect(), g = giant.getBoundingClientRect(), W = h.width, H = h.height;
    c = innerWidth < 821 ? 28 : 44;
    cx = g.left - h.left + g.width * 1995 / 4886; // slash centre, from the wordmark's viewBox
    cy = g.top - h.top + g.height * 455 / 920;
    // nothing lights behind text, the wordmark or the phone's Let's talk bar
    avoid = [...$$("h1, .intro, .tag, .giant", hero), $(".sticky-talk")].filter((el) => el && getComputedStyle(el).display !== "none").map((el) => { const r = el.getBoundingClientRect(); return [r.left - h.left - 6, r.top - h.top - 6, r.right - h.left + 6, r.bottom - h.top + 6]; });
    let d = "";
    for (let k = Math.floor((-cy * T - cx) / c) - 1; ; k++) {
      const x = cx - c / 2 + k * c; if (x - (H - cy) * T > W) break;
      d += `M${(x + cy * T).toFixed(1)} 0L${(x - (H - cy) * T).toFixed(1)} ${H}`;
    }
    for (let y = cy - c / 2 - Math.floor((cy - c / 2) / c) * c; y < H; y += c) d += `M0 ${y.toFixed(1)}H${W}`;
    lines.innerHTML = `<svg width="${W}" height="${H}"><path d="${d}" fill="none" stroke="#0B0B0C" stroke-opacity=".07"/></svg>`;
  };
  const light = (i, j, peak, delay = 0, duration = 600) => {
    const y = cy + j * c - c / 2, x = cx + i * c - c / 2 - (y - cy) * T - c * T, w = c + c * T;
    if (y + c < 0 || y > hero.clientHeight || avoid.some(([a, b, r, z]) => x < r && x + w > a && y < z && y + c > b)) return false;
    const el = document.createElement("i");
    el.style.cssText = `width:${w}px;height:${c}px;transform:translate(${x}px,${y}px);clip-path:polygon(${c * T}px 0,100% 0,${c}px 100%,0 100%)`;
    grid.append(el);
    el.animate([{ opacity: peak }, { opacity: 0 }], { duration, delay, easing: "ease-out" }).finished.finally(() => el.remove());
    return true;
  };
  layout();
  new ResizeObserver(layout).observe(hero);
  if (!still) {
    if (!document.documentElement.classList.contains("drawn")) {
      // The pulse, once the wordmark has settled: 1.45 s to 2.55 s, then still. It runs out from the slash into
      // open grid and stops at the first cell behind text, so no stray cells appear on the far side of the copy.
      const pulse = () => {
        const rows = Math.ceil(Math.max(cy, hero.clientHeight - cy) / c), step = Math.min(50, 600 / rows);
        const lag = wipe && wipe.startTime != null ? document.timeline.currentTime - wipe.startTime : 0;
        const skip = Math.ceil(giant.getBoundingClientRect().height * 0.6 / c); // cells still under the wordmark
        for (const dir of [1, -1]) for (let k = 1; k <= rows; k++) {
          const j = k * dir, t = Math.max(0, 1450 - lag + k * step);
          if (light(0, j, 0.85, t, 500)) { if (k % 3 === 0) light(-dir, j, 0.3, t + 40, 500); }
          else if (k > skip) break;
        }
      };
      // Time the pulse from the CSS sequence's own start (known once the wipe is ready), not from this script
      const wipe = giant.getAnimations().find((a) => a.animationName === "wipe");
      wipe ? wipe.ready.then(pulse) : pulse();
    }
    const at = (e) => {
      const h = hero.getBoundingClientRect(), x = e.clientX - h.left, y = e.clientY - h.top;
      const j = Math.round((y - cy) / c), i = Math.round((x - cx + (y - cy) * T) / c), key = i + "," + j;
      if (key !== last || e.type === "pointerdown") { last = key; light(i, j, 0.85); }
    };
    hero.addEventListener("pointermove", (e) => e.pointerType === "mouse" && at(e));
    hero.addEventListener("pointerdown", (e) => e.pointerType !== "mouse" && at(e));
  }
}

// Sticky contact bar (phones) hides when the "Let's talk" band is on screen: never two primary actions
// It also steps aside while the phone tools deck or the footer is on screen, so it never covers the deck's counter or the company details.
const sticky = $(".sticky-talk");
if (sticky) {
  const seen = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
    sticky.classList.toggle("hide", seen.size > 0);
  }, { threshold: 0.15 });
  [$(".band"), $(".tool-cards"), $(".footer")].forEach((el) => el && io.observe(el)); // the footer: it never covers the company details on the legal pages
}

// /work: sliding sheets. Desktop: the open sheet sits in front, the others fold into edges either side.
// Phone: a swipe deck. Every edge and list row is a real link, so all of this is progressive enhancement.
const deck = $(".sheets");
if (deck) {
  const sheets = $$(".sheet", deck), ids = sheets.map((s) => s.dataset.sheet);
  const dots = $$(".dots i");
  const phone = matchMedia("(max-width:820px)");
  const place = (k) => {
    sheets.forEach((s, i) => {
      s.style.left = i <= k ? `calc(${i} * var(--edge))` : `calc(100% - ${sheets.length - i} * var(--edge))`;
      s.classList.toggle("on", i === k);
      $(".sheet-body", s).inert = !phone.matches && i !== k;
    });
    dots.forEach((d, i) => d.classList.toggle("on", i === k));
  };
  const say = $(".sheets-live");
  const open = (id, push = true) => {
    const k = Math.max(0, ids.indexOf(id));
    deck.classList.add("started");
    place(k);
    if (push && say) say.textContent = `Sheet ${k + 1} of ${ids.length}: ${sheets[k].getAttribute("aria-label") || "All work"}`;
    if (phone.matches) requestAnimationFrame(() => deck.scrollTo({ left: sheets[k].offsetLeft - 8, behavior: still || !push ? "instant" : "smooth" }));
    if (push) history.replaceState(null, "", k ? `#${ids[k]}` : location.pathname);
  };
  for (const a of $$("[data-open]", deck)) a.addEventListener("click", (e) => { e.preventDefault(); open(a.dataset.open); });
  deck.addEventListener("keydown", (e) => { // only while focus is inside the sheets, so page scrolling and screen readers keep their arrows
    if (phone.matches || !["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const k = ids.indexOf($(".sheet.on", deck).dataset.sheet) + (e.key === "ArrowRight" ? 1 : -1);
    if (k < 0 || k >= ids.length) return;
    e.preventDefault(); open(ids[k]);
    $(".sheet.on .sheet-body a", deck)?.focus();
  });
  deck.addEventListener("scroll", () => {
    if (!phone.matches) return;
    const k = Math.round(deck.scrollLeft / (sheets[0].offsetWidth + 8));
    dots.forEach((d, i) => d.classList.toggle("on", i === k));
  }, { passive: true });
  phone.addEventListener("change", () => open(location.hash.slice(1) || "list", false));
  open(location.hash.slice(1) || "list", false);
}

// Home: one reflection per working day. Without JS the first one shows.
const notes = $$("[data-note]");
if (notes.length) {
  const days = Math.floor(Date.now() / 864e5) + 3; // days since Mon 29 Dec 1969 (1 Jan 1970 was a Thursday)
  const workdays = Math.floor(days / 7) * 5 + Math.min(days % 7, 4); // Mon–Fri step on; weekends keep Friday's note
  notes.forEach((n, i) => { n.hidden = i !== workdays % notes.length; });
  // The figure draws itself once, when the card is half in view: structure first, then the fix in orange.
  // Without IntersectionObserver, or with reduced motion, it stays on its last frame (no class added).
  const fig = $(".note-card:not([hidden]) .note-fig");
  if (fig && "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    fig.classList.add("armed");
    new IntersectionObserver(([e], io) => {
      if (!e.isIntersecting) return;
      fig.classList.add("play"); io.disconnect();
    }, { threshold: 0.5 }).observe(fig);
  }
}

// Home: tools. Desktop: a tile opens its card. Phones: every card sits in a swipe deck (CSS shows them all),
// with a rail that jumps to a group and a counter that follows the swipe.
const stack = $(".stack");
if (stack) {
  const cards = $(".tool-cards", stack);
  let layer = 1, settle;
  const show = (tile, animate = false) => {
    const next = $("#" + tile.getAttribute("aria-controls"));
    const prev = $(".tool-card:not([hidden])", cards);
    $$(".tile", stack).forEach((t) => { t.setAttribute("aria-pressed", String(t === tile)); t.tabIndex = t === tile ? 0 : -1; });
    if (next === prev) return;
    next.hidden = false;
    if (!animate || still || !prev) { if (prev) prev.hidden = true; return; }
    // The colour spreads from the left edge, the side nearest the tiles, level with the tile picked
    const t = tile.getBoundingClientRect(), c = cards.getBoundingClientRect();
    next.style.setProperty("--from", `0% ${Math.round(Math.min(Math.max((t.top + t.height / 2 - c.top) / c.height, 0), 1) * 100)}%`);
    next.style.zIndex = ++layer; // the newest card always sits on top, however fast the clicks
    next.classList.remove("opening"); void next.offsetWidth; next.classList.add("opening");
    clearTimeout(settle);
    settle = setTimeout(() => { // once the colour has spread (450ms), drop the cards underneath
      $$(".tool-card", cards).forEach((c) => { c.hidden = c !== next; });
    }, 480);
    setTimeout(() => next.classList.remove("opening"), 900);
  };
  stack.addEventListener("click", (e) => { const t = e.target.closest(".tile"); if (t) show(t, true); });
  // The 26 tiles are one tab stop: arrow keys move focus between them, Home/End jump, Enter or Space opens
  const tiles = $$(".tile", stack);
  $(".stack-groups", stack).addEventListener("keydown", (e) => {
    const i = tiles.indexOf(document.activeElement);
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    const to = e.key === "Home" ? 0 : e.key === "End" ? tiles.length - 1 : step ? (i + step + tiles.length) % tiles.length : -1;
    if (i < 0 || to < 0) return;
    e.preventDefault();
    tiles.forEach((t, k) => { t.tabIndex = k === to ? 0 : -1; });
    tiles[to].focus();
  });

  const deck = $$(".tool-card", cards), rail = $$(".rail-btn", stack), railEl = $(".stack-rail", stack);
  const count = $(".stack-count", stack), n = $(".n", count);
  const at = () => Math.min(deck.length - 1, Math.round(cards.scrollLeft / (deck[0].offsetWidth + 12)));
  const mark = () => {
    const k = at();
    n.textContent = k + 1;
    count.style.setProperty("--p", (k + 1) / deck.length);
    const g = rail.filter((b) => +b.dataset.first <= k).pop();
    rail.forEach((b) => b.setAttribute("aria-current", String(b === g)));
    railEl.scrollTo({ left: g.offsetLeft - rail[0].offsetLeft, behavior: still ? "instant" : "smooth" });
  };
  cards.addEventListener("scroll", () => { clearTimeout(cards.t); cards.t = setTimeout(mark, 80); }, { passive: true });
  const go = (k) => cards.scrollTo({ left: deck[k].offsetLeft - deck[0].offsetLeft, behavior: still ? "instant" : "smooth" });
  rail.forEach((b) => b.addEventListener("click", () => go(+b.dataset.first)));
  $$(".deck-btn", stack).forEach((b) => b.addEventListener("click", () => go(Math.min(deck.length - 1, Math.max(0, at() + +b.dataset.step)))));
  mark();
}

// Contact form: with JS it stays on the page. Without JS the spam check cannot run, so a noscript note offers the email address.
const form = $(".form-card");
if (form) {
  const statusEl = $(".form-status", form), sendBtn = $(".send", form);
  const showErrors = (errors = {}) => {
    for (const name of ["name", "email", "message"]) {
      const input = form.elements[name], err = document.getElementById(`e-${name}`);
      if (errors[name]) { err.textContent = errors[name]; err.hidden = false; input.setAttribute("aria-invalid", "true"); input.setAttribute("aria-describedby", err.id); }
      else { err.hidden = true; input.removeAttribute("aria-invalid"); }
    }
  };
  // Show a result where the visitor can see it, and give it focus so keyboard and screen-reader users land on it
  const reveal = (el) => {
    if (!el.matches("input,textarea,select,button,a")) el.setAttribute("tabindex", "-1"); // only the status needs it; fields stay in the tab order
    el.scrollIntoView({ block: "center", behavior: still ? "instant" : "smooth" });
    el.focus({ preventScroll: true });
  };
  let sending = false;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (sending) return;
    showErrors();
    statusEl.className = "form-status";
    sending = true; sendBtn.setAttribute("aria-disabled", "true"); statusEl.textContent = "Sending…"; // aria-disabled keeps focus on the button
    try {
      const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { accept: "application/json" } });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        form.reset();
        statusEl.classList.add("ok");
        // Only claim the confirmation email when the server says it went (gate C)
        statusEl.textContent = "Sent. Someone will reply within two working days." + (data.confirmed ? " We've also emailed you to confirm it arrived." : "");
        reveal(statusEl);
      } else {
        showErrors(data.errors);
        statusEl.classList.add("bad");
        statusEl.textContent = data.errors?.form || "Please check the highlighted fields.";
        reveal($("[aria-invalid=true]", form) || statusEl);
      }
      window.turnstile?.reset();
    } catch {
      statusEl.classList.add("bad");
      statusEl.textContent = `It didn't send. Please email ${MAIL} directly.`;
      reveal(statusEl);
    } finally { sending = false; sendBtn.removeAttribute("aria-disabled"); }
  });
  const flag = new URLSearchParams(location.search).get("contact");
  const msg = { sent: ["ok", "Sent. Someone will reply within two working days."], invalid: ["bad", "Please check the form and try again."], slow: ["bad", "Too many messages. Please wait a minute or email us."], failed: ["bad", `It didn't send. Please email ${MAIL} directly.`] }[flag];
  if (msg) { statusEl.classList.add(msg[0]); statusEl.textContent = msg[1]; reveal(statusEl); }
}

// Footer wordmark, after 21st.dev "Text Hover Effect" by Aceternity (MIT): a soft disc (the mask's radial gradient)
// fills the outline. Desktop: it eases after the pointer. Touch: it runs once up the slash, in viewBox units.
const fm = $(".foot-mark");
if (fm && !still) {
  const svg = $("svg", fm), g = $("#fm-g", fm);
  let x = 0, y = 0, tx = 0, ty = 0, raf = 0, last = 0;
  const put = (a, b) => { g.setAttribute("cx", a.toFixed(0)); g.setAttribute("cy", b.toFixed(0)); };
  const ease = (now) => {
    const a = 1 - 0.82 ** (Math.min(now - (last || now - 16.7), 50) / 16.7); last = now; // same feel at 60 Hz and 120 Hz
    x += (tx - x) * a; y += (ty - y) * a; put(x, y);
    raf = Math.abs(tx - x) + Math.abs(ty - y) > 2 ? requestAnimationFrame(ease) : (last = 0);
  };
  if (matchMedia("(hover: hover)").matches) {
    fm.addEventListener("pointermove", (e) => {
      const r = svg.getBoundingClientRect();
      if (!r.width) return;
      tx = (e.clientX - r.left) / r.width * 4886; ty = (e.clientY - r.top) / r.height * 920 - 700;
      if (!fm.classList.contains("on")) { x = tx; y = ty; put(x, y); fm.classList.add("on"); }
      if (!raf) raf = requestAnimationFrame(ease);
    });
    fm.addEventListener("pointerleave", () => fm.classList.remove("on"));
  } else if ("IntersectionObserver" in window && !(() => { try { return sessionStorage.getItem("fm-pulse"); } catch { return 0; } })()) {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect(); fm.classList.add("on");
      try { sessionStorage.setItem("fm-pulse", "1"); } catch {} // once per visit, like the hero
      // Along the slash's own 22.1° axis (centres 1834.5,150 to 2155,-640), run on past both ends: 1794,250 to 2204,-760
      const t0 = performance.now(), D = 1100;
      const run = (now) => {
        const k = Math.min((now - t0) / D, 1), p = 1 - (1 - k) ** 3;
        put(1794 + 410 * p, 250 - 1010 * p);
        if (k < 1) requestAnimationFrame(run); else fm.classList.remove("on");
      };
      requestAnimationFrame(run);
    }, { threshold: 0.6 });
    io.observe(fm);
  }
}
