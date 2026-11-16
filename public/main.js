// eazy/access: menu, live UK status, sticky contact bar, contact form.
// Working hours are an assumption until the owner confirms them.
const HOURS = { days: [1, 2, 3, 4, 5], open: 9 * 60, close: 17 * 60 + 30 }; // Mon–Fri 09:00–17:30 UK

// UK status line
function ukStatus() {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(new Date()).map((p) => [p.type, p.value]));
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(parts.weekday);
  const mins = Number(parts.hour) * 60 + Number(parts.minute);
  const open = HOURS.days.includes(day) && mins >= HOURS.open && mins < HOURS.close;
  const text = open ? `UK · ${parts.hour}:${parts.minute} · We're in today`
    : `UK · ${parts.hour}:${parts.minute} · Back next working day`;
  document.querySelectorAll("[data-status]").forEach((el) => { el.textContent = text; el.classList.toggle("open", open); });
}
ukStatus(); setInterval(ukStatus, 30_000);

// Menu: real dialog behaviour, focus trapped, Esc closes, focus returns
const menu = document.getElementById("menu");
const openBtn = document.querySelector(".menu-btn");
const closeBtn = menu.querySelector(".close-btn");
function setMenu(open) {
  menu.hidden = !open;
  openBtn.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
  document.querySelector("main").inert = open;
  if (open) closeBtn.focus(); else openBtn.focus();
}
openBtn.addEventListener("click", () => setMenu(true));
closeBtn.addEventListener("click", () => setMenu(false));
menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
menu.addEventListener("keydown", (e) => {
  if (e.key === "Escape") return setMenu(false);
  if (e.key !== "Tab") return;
  const f = [...menu.querySelectorAll("a,button")];
  if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
  else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
});

// Sticky contact bar hides once the contact section is on screen (never two primary actions)
const sticky = document.querySelector(".sticky-talk");
new IntersectionObserver(([e]) => sticky.classList.toggle("hide", e.isIntersecting), { threshold: 0.15 })
  .observe(document.getElementById("contact"));

// Contact form: works without JS (Worker redirects back); with JS, stays on the page
const form = document.querySelector(".form-card");
const statusEl = form.querySelector(".form-status");
const sendBtn = form.querySelector(".send");
function showErrors(errors = {}) {
  for (const name of ["name", "email", "message"]) {
    const input = form.elements[name], err = document.getElementById(`e-${name}`);
    if (errors[name]) { err.textContent = errors[name]; err.hidden = false; input.setAttribute("aria-invalid", "true"); input.setAttribute("aria-describedby", err.id); }
    else { err.hidden = true; input.removeAttribute("aria-invalid"); }
  }
}
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
      window.turnstile?.reset();
    } else {
      showErrors(data.errors);
      statusEl.classList.add("bad");
      statusEl.textContent = data.errors?.form || "Please check the highlighted fields.";
      window.turnstile?.reset();
    }
  } catch {
    statusEl.classList.add("bad");
    statusEl.textContent = "It didn't send. Please email info@eazyaccess.org directly.";
  } finally { sendBtn.disabled = false; }
});

// No-JS fallback result shown from the Worker's redirect flag
const flag = new URLSearchParams(location.search).get("contact");
if (flag) {
  const msg = { sent: ["ok", "Sent. A person will reply within two working days."], invalid: ["bad", "Please check the form and try again."], slow: ["bad", "Too many messages. Please wait a minute or email us."], failed: ["bad", "It didn't send. Please email info@eazyaccess.org directly."] }[flag];
  if (msg) { statusEl.classList.add(msg[0]); statusEl.textContent = msg[1]; }
}
