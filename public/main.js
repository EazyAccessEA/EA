// eazy/access: shared behaviour. Each block runs only on pages that have its elements.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

// UK status line. Working hours confirmed by the owner, 17 Nov 2026.
const HOURS = { days: [1, 2, 3, 4, 5], open: 9 * 60, close: 17 * 60 + 30 }; // Mon–Fri 09:00–17:30 UK
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
for (const a of $$("[data-u][data-d]")) a.href = `mailto:${a.dataset.u}@${a.dataset.d}`;
for (const el of $$("[data-phone]")) {
  const d = [...el.dataset.phone].reverse().join(""); // stored reversed in the HTML
  const a = $("a", el);
  a.href = `tel:+44${d.slice(1)}`;
  a.textContent = `${d.slice(0, 5)} ${d.slice(5)}`;
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
  $("main").inert = open;
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

// Sticky contact bar (phones) hides when the "Let's talk" band is on screen: never two primary actions
const sticky = $(".sticky-talk"), band = $(".band");
if (sticky && band) new IntersectionObserver(([e]) => sticky.classList.toggle("hide", e.isIntersecting), { threshold: 0.15 }).observe(band);

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
  const open = (id, push = true) => {
    const k = Math.max(0, ids.indexOf(id));
    deck.classList.add("started");
    place(k);
    if (phone.matches) requestAnimationFrame(() => deck.scrollTo({ left: sheets[k].offsetLeft - 8, behavior: still || !push ? "instant" : "smooth" }));
    if (push) history.replaceState(null, "", k ? `#${ids[k]}` : location.pathname);
  };
  for (const a of $$("[data-open]", deck)) a.addEventListener("click", (e) => { e.preventDefault(); open(a.dataset.open); });
  document.addEventListener("keydown", (e) => {
    if (phone.matches || !["ArrowLeft", "ArrowRight"].includes(e.key) || e.target.closest("input,textarea,select,.menu")) return;
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
    $$(".tile", stack).forEach((t) => t.setAttribute("aria-pressed", String(t === tile)));
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
  rail.forEach((b) => b.addEventListener("click", () =>
    cards.scrollTo({ left: deck[+b.dataset.first].offsetLeft - deck[0].offsetLeft, behavior: still ? "instant" : "smooth" })));
  mark();
}

// Contact form: works without JS (the Worker redirects back); with JS it stays on the page
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
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    showErrors();
    statusEl.className = "form-status";
    sendBtn.disabled = true; statusEl.textContent = "Sending…";
    try {
      const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { accept: "application/json" } });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        form.reset();
        statusEl.classList.add("ok");
        statusEl.textContent = "Sent. A person will reply within two working days. We've also emailed you to confirm it arrived.";
      } else {
        showErrors(data.errors);
        statusEl.classList.add("bad");
        statusEl.textContent = data.errors?.form || "Please check the highlighted fields.";
      }
      window.turnstile?.reset();
    } catch {
      statusEl.classList.add("bad");
      statusEl.textContent = `It didn't send. Please email ${MAIL} directly.`;
    } finally { sendBtn.disabled = false; }
  });
  const flag = new URLSearchParams(location.search).get("contact");
  const msg = { sent: ["ok", "Sent. A person will reply within two working days."], invalid: ["bad", "Please check the form and try again."], slow: ["bad", "Too many messages. Please wait a minute or email us."], failed: ["bad", `It didn't send. Please email ${MAIL} directly.`] }[flag];
  if (msg) { statusEl.classList.add(msg[0]); statusEl.textContent = msg[1]; }
}
