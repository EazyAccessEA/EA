// eazyaccess.org — static page plus one contact endpoint.
// Gates (PLAN.md): A Turnstile, B validation, C honest success, D rate limit, E no storage.

export const INBOX = "info@eazyaccess.org";
export const FROM = { email: "enquiries@eazyaccess.org", name: "eazy/access" };
export const NEEDS = ["new-site", "redesign", "shop", "fix-or-speed", "not-sure"];
export const BUDGETS = ["under-3k", "3-8k", "8-20k", "20k-plus", "not-sure"];
export const TIMELINES = ["asap", "1-3-months", "3-6-months", "flexible"];

const EMAIL_RE = /^[^\s@<>"',;]{1,64}@[^\s@<>"',;]{1,190}\.[a-z]{2,24}$/i;
const oneLine = (s) => String(s ?? "").replace(/[\r\n\t]+/g, " ").trim();
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export function validate(f) {
  const name = oneLine(f.get("name"));
  const email = oneLine(f.get("email")).toLowerCase();
  const message = String(f.get("message") ?? "").replace(/\r\n?/g, "\n").trim();
  const need = String(f.get("need") ?? "");
  const budget = String(f.get("budget") ?? "not-sure");
  const timeline = String(f.get("timeline") ?? "flexible");
  const errors = {};
  if (name.length < 1 || name.length > 100) errors.name = "Please give your name.";
  if (email.length > 254 || !EMAIL_RE.test(email)) errors.email = "Please check your email address.";
  if (message.length < 10 || message.length > 5000) errors.message = "A sentence or two about the project, please (up to 5,000 characters).";
  if (!NEEDS.includes(need)) errors.need = "Please pick what you need.";
  if (!BUDGETS.includes(budget)) errors.budget = "Please pick a budget.";
  if (!TIMELINES.includes(timeline)) errors.timeline = "Please pick a timeline.";
  return { ok: Object.keys(errors).length === 0, errors, data: { name, email, message, need, budget, timeline } };
}

async function turnstileOk(token, ip, secret, fetchFn) {
  if (!token || !secret) return false;
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  try {
    const r = await fetchFn("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
    const j = await r.json();
    return j.success === true;
  } catch {
    return false;
  }
}

function reply(request, status, payload) {
  const wantsJson = (request.headers.get("accept") || "").includes("application/json");
  if (wantsJson) return Response.json(payload, { status });
  // No-JS fallback: back to the page with a status flag.
  const flag = status === 200 ? "sent" : status === 429 ? "slow" : status === 400 ? "invalid" : "failed";
  return Response.redirect(new URL(`/?contact=${flag}#contact`, request.url).toString(), 303);
}

export async function handleContact(request, env, fetchFn = fetch) {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: { allow: "POST" } });
  const len = Number(request.headers.get("content-length") || 0);
  if (len > 20000) return reply(request, 400, { ok: false, errors: { form: "Message too long." } });

  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const { success: underLimit } = await env.CONTACT_RL.limit({ key: ip });
  if (!underLimit) return reply(request, 429, { ok: false, errors: { form: "Too many messages. Please wait a minute or email us directly." } });

  let form;
  try {
    form = await request.formData();
  } catch {
    return reply(request, 400, { ok: false, errors: { form: "We couldn't read that form." } });
  }

  if (!(await turnstileOk(form.get("cf-turnstile-response"), ip, env.TURNSTILE_SECRET, fetchFn)))
    return reply(request, 403, { ok: false, errors: { form: "Spam check failed. Please try again or email us directly." } });

  const v = validate(form);
  if (!v.ok) return reply(request, 400, { ok: false, errors: v.errors });
  const d = v.data;

  const NEED_LABEL = { "new-site": "A new website", redesign: "A redesign", shop: "An online shop", "fix-or-speed": "Fix or speed up a site", "not-sure": "Not sure yet" };
  const summary = `${NEED_LABEL[d.need]}\n\n${d.message}`;
  try {
    await env.EMAIL.send({
      to: INBOX,
      from: FROM,
      replyTo: { email: d.email, name: d.name },
      subject: `Enquiry: ${d.name} (${d.need})`,
      text: `From: ${d.name} <${d.email}>\n${summary}`,
      html: `<p><b>From:</b> ${esc(d.name)} &lt;${esc(d.email)}&gt;</p><pre style="font:inherit;white-space:pre-wrap">${esc(summary)}</pre>`,
    });
  } catch (e) {
    console.error("enquiry send failed", e?.code); // code only, never the body (gate E)
    return reply(request, 502, { ok: false, errors: { form: `It didn't send. Please email ${INBOX} directly.` } });
  }

  // The enquiry is delivered; an auto-reply failure must not report failure to the visitor.
  try {
    await env.EMAIL.send({
      to: d.email, // no visitor-chosen display name (anti-relay)
      from: FROM,
      replyTo: INBOX,
      subject: "We've got your message",
      // Fixed text only: never echo visitor content to an address we haven't verified (anti-relay).
      text: `Thanks for getting in touch. You'll get a reply from the person who'd build your site, within two working days.\n\neazy/access\n${INBOX}`,
    });
  } catch (e) {
    console.error("auto-reply failed", e?.code);
  }
  return reply(request, 200, { ok: true });
}
