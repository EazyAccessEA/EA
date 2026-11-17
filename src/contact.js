// eazyaccess.org — static page plus one contact endpoint.
// Gates (PLAN.md): A Turnstile, B validation, C honest success, D rate limit, E no storage.
import { COMPANY, esc, layout, heading, para, row, table, quote, link } from "./email.js";

export const INBOX = "info@eazyaccess.org";
export const MAX_BODY = 20000;
export const FROM = { email: "enquiries@eazyaccess.org", name: "eazy/access" };
export const NEEDS = ["new-site", "redesign", "shop", "fix-or-speed", "not-sure"];
export const BUDGETS = ["under-3k", "3-8k", "8-20k", "20k-plus", "not-sure"];
export const TIMELINES = ["asap", "1-3-months", "3-6-months", "flexible"];

const EMAIL_RE = /^[^\s@<>"',;]{1,64}@[^\s@<>"',;]{1,190}\.[a-z]{2,24}$/i;
const oneLine = (s) => String(s ?? "").replace(/[\r\n\t]+/g, " ").trim();

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

// Resend HTTP API (free tier). Mail stays on Google Workspace; Resend only signs as eazyaccess.org.
export const RESEND_URL = "https://api.resend.com/emails";
async function sendMail(env, fetchFn, msg) {
  if (!env.RESEND_API_KEY) throw Object.assign(new Error("no api key"), { code: "NO_KEY" });
  const r = await fetchFn(RESEND_URL, {
    method: "POST",
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify({ from: `${FROM.name} <${FROM.email}>`, ...msg }),
  });
  if (!r.ok) throw Object.assign(new Error("resend failed"), { code: `HTTP_${r.status}` });
}

function reply(request, status, payload) {
  const wantsJson = (request.headers.get("accept") || "").includes("application/json");
  if (wantsJson) return Response.json(payload, { status });
  // No-JS fallback: back to the page with a status flag.
  const flag = status === 200 ? "sent" : status === 429 ? "slow" : status === 400 ? "invalid" : "failed";
  return Response.redirect(new URL(`/contact?contact=${flag}`, request.url).toString(), 303);
}

export async function handleContact(request, env, fetchFn = fetch) {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: { allow: "POST" } });
  const len = Number(request.headers.get("content-length") || 0);
  if (len > MAX_BODY) return reply(request, 400, { ok: false, errors: { form: "Message too long." } });

  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const { success: underLimit } = await env.CONTACT_RL.limit({ key: ip });
  if (!underLimit) return reply(request, 429, { ok: false, errors: { form: "Too many messages. Please wait a minute or email us directly." } });

  // Read the body with a hard byte cap: Content-Length can be absent or wrong (chunked uploads).
  let form;
  try {
    const reader = request.body?.getReader();
    const chunks = [];
    let total = 0;
    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_BODY) {
        await reader.cancel();
        return reply(request, 400, { ok: false, errors: { form: "Message too long." } });
      }
      chunks.push(value);
    }
    const body = new Blob(chunks);
    form = await new Response(body, { headers: { "content-type": request.headers.get("content-type") || "" } }).formData();
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
  const origin = new URL(request.url).origin;
  try {
    await sendMail(env, fetchFn, {
      to: INBOX,
      reply_to: d.email,
      subject: `Enquiry: ${d.name} (${d.need})`,
      text: `From: ${d.name} <${d.email}>\n${summary}`,
      html: layout({
        origin,
        preheader: `${d.name}: ${NEED_LABEL[d.need]}`,
        body: heading("New", "enquiry.")
          + table(row("From", esc(d.name)) + row("Email", link(`mailto:${d.email}`, d.email)) + row("Needs", esc(NEED_LABEL[d.need])))
          + quote(d.message)
          + `<p style="margin:20px 0 0;font-size:14px;color:#5E5E62">Reply to this email to answer them directly.</p>`,
      }),
    });
  } catch (e) {
    console.error("enquiry send failed", e?.code); // code only, never the body (gate E)
    return reply(request, 502, { ok: false, errors: { form: `It didn't send. Please email ${INBOX} directly.` } });
  }

  // The enquiry is delivered; an auto-reply failure must not report failure to the visitor.
  // Cap auto-replies per recipient so nobody can use the form to mail-bomb an address from many IPs.
  const { success: recipientOk } = await env.AUTOREPLY_RL.limit({ key: `to:${d.email}` });
  if (!recipientOk) return reply(request, 200, { ok: true });
  try {
    await sendMail(env, fetchFn, {
      to: d.email, // no visitor-chosen display name (anti-relay)
      reply_to: INBOX,
      subject: "We've got your message",
      // Fixed text only: never echo visitor content to an address we haven't verified (anti-relay).
      text: `Thanks for getting in touch. You'll get a reply from the person who'd build your site, within two working days.\n\nTo add anything, reply to this email.\n\neazy/access\n${INBOX}\n\n${COMPANY.line}`,
      html: layout({
        origin,
        preheader: "A reply is coming within two working days.",
        body: heading("Thanks for", "getting in touch.")
          + para("You'll get a reply from the person who'd build your site, within two working days.")
          + para("To add anything, reply to this email.")
          + `<p style="margin:24px 0 0;color:#0B0B0C">eazy/access<br>${link(`mailto:${INBOX}`, INBOX)}</p>`,
      }),
    });
  } catch (e) {
    console.error("auto-reply failed", e?.code);
  }
  return reply(request, 200, { ok: true });
}
