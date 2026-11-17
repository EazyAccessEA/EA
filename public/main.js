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

// /work: the hovered project's phone follows the pointer (fine pointers only; keyboard focus too)
const list = $(".work-list"), preview = $(".preview");
if (list && preview && matchMedia("(hover:hover) and (pointer:fine)").matches) {
  const img = $("img", preview);
  let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
  const loop = () => {
    const k = still ? 1 : 0.18;
    x += (tx - x) * k; y += (ty - y) * k;
    preview.style.setProperty("--px", `${x}px`); preview.style.setProperty("--py", `${y}px`);
    raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(loop) : 0;
  };
  const aim = (px, py) => { tx = px + 24; ty = py - 240; if (!raf) raf = requestAnimationFrame(loop); };
  const show = (a) => {
    $$("a", list).forEach((l) => l.classList.toggle("on", l === a));
    list.classList.add("hovering");
    img.src = a.dataset.preview;
    preview.style.setProperty("--pbg", a.style.getPropertyValue("--bg"));
    preview.classList.add("on");
  };
  const hide = () => { list.classList.remove("hovering"); $$("a", list).forEach((l) => l.classList.remove("on")); preview.classList.remove("on"); };
  $$("a", list).forEach((a) => {
    a.addEventListener("pointerenter", (e) => {
      if (!preview.classList.contains("on")) { x = e.clientX + 24; y = e.clientY - 240; }
      show(a); aim(e.clientX, e.clientY);
    });
    a.addEventListener("focus", () => { const r = a.getBoundingClientRect(); x = tx = r.left + r.width * 0.55; y = ty = r.top - 180; loop(); show(a); });
  });
  list.addEventListener("pointermove", (e) => aim(e.clientX, e.clientY));
  list.addEventListener("pointerleave", hide);
  list.addEventListener("focusout", (e) => { if (!list.contains(e.relatedTarget)) hide(); });
}

// /work: the ticker drifts, speeds up with scrolling, then eases back
const track = $(".ticker-track");
if (track && !still) {
  const anim = track.getAnimations()[0];
  let lastY = scrollY, rate = 1, raf = 0;
  const settle = () => {
    rate += (1 - rate) * 0.06;
    if (anim) anim.playbackRate = rate;
    raf = Math.abs(rate - 1) > 0.01 ? requestAnimationFrame(settle) : 0;
  };
  addEventListener("scroll", () => {
    const v = Math.abs(scrollY - lastY); lastY = scrollY;
    rate = Math.min(6, Math.max(rate, 1 + v / 12));
    if (!raf) raf = requestAnimationFrame(settle);
  }, { passive: true });
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
      statusEl.textContent = "It didn't send. Please email info@eazyaccess.org directly.";
    } finally { sendBtn.disabled = false; }
  });
  const flag = new URLSearchParams(location.search).get("contact");
  const msg = { sent: ["ok", "Sent. A person will reply within two working days."], invalid: ["bad", "Please check the form and try again."], slow: ["bad", "Too many messages. Please wait a minute or email us."], failed: ["bad", "It didn't send. Please email info@eazyaccess.org directly."] }[flag];
  if (msg) { statusEl.classList.add(msg[0]); statusEl.textContent = msg[1]; }
}
