import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { handleContact, INBOX, RESEND_URL } from "../src/contact.js";

let current; // the env of the running test (tests run one at a time)
function env({ limitOk = true, sendFails = false, autoReplyFails = false, recipientOk = true, key = "re_test" } = {}) {
  const sent = [];
  let calls = 0;
  current = {
    sent,
    TURNSTILE_SECRET: "test-secret",
    RESEND_API_KEY: key,
    CONTACT_RL: { limit: async () => ({ success: limitOk }) },
    AUTOREPLY_RL: { limit: async () => ({ success: recipientOk }) },
    _send(body) {
      calls++;
      if ((sendFails && calls === 1) || (autoReplyFails && calls === 2)) return new Response("fail", { status: 500 });
      sent.push(body);
      return Response.json({ id: "m" + calls });
    },
  };
  return current;
}
// Fake network: Turnstile siteverify answers `ok`; Resend records the email it was asked to send.
const turnstile = (ok) => async (url, init) =>
  url === RESEND_URL ? current._send(JSON.parse(init.body)) : Response.json({ success: ok });
function post(fields, { json = true, headers = {} } = {}) {
  const f = new FormData();
  const base = { name: "Amina", email: "amina@example.co.uk", message: "We need a new site for our bakery.", need: "new-site", budget: "3-8k", timeline: "1-3-months", "cf-turnstile-response": "tok" };
  for (const [k, v] of Object.entries({ ...base, ...fields })) if (v !== undefined) f.append(k, v);
  return new Request("https://eazyaccess.org/api/contact", { method: "POST", body: f, headers: { accept: json ? "application/json" : "text/html", "cf-connecting-ip": "1.2.3.4", ...headers } });
}

test("happy path: enquiry to inbox with reply-to, then auto-reply", async () => {
  const e = env();
  const r = await handleContact(post({}), e, turnstile(true));
  assert.equal(r.status, 200);
  assert.equal(e.sent.length, 2);
  assert.equal(e.sent[0].to, INBOX);
  assert.equal(e.sent[0].reply_to, "amina@example.co.uk");
  assert.equal(e.sent[0].from, "eazy/access <enquiries@eazyaccess.org>");
  assert.match(e.sent[1].text, /two working days/);
});

test("gate A: missing or failed Turnstile -> 403, nothing sent", async () => {
  for (const [fields, ok] of [[{ "cf-turnstile-response": undefined }, true], [{}, false]]) {
    const e = env();
    const r = await handleContact(post(fields), e, turnstile(ok));
    assert.equal(r.status, 403);
    assert.equal(e.sent.length, 0);
  }
});

test("gate B: bad email, huge message, unknown chip -> 400", async () => {
  for (const fields of [{ email: "not-an-email" }, { message: "x".repeat(5001) }, { need: "hack" }, { budget: "1m" }, { name: "" }]) {
    const e = env();
    const r = await handleContact(post(fields), e, turnstile(true));
    assert.equal(r.status, 400, JSON.stringify(fields).slice(0, 40));
    assert.equal(e.sent.length, 0);
  }
});

test("gate B: header injection in name is flattened into one line", async () => {
  const e = env();
  await handleContact(post({ name: "Eve\r\nBcc: victim@example.com" }), e, turnstile(true));
  assert.ok(!/[\r\n]/.test(e.sent[0].subject));
  assert.ok(!("bcc" in e.sent[0]));
  assert.ok(!/[\r\n]/.test(e.sent[0].text.split("\n")[0]));
});

test("gate B: oversized body rejected before parsing", async () => {
  const e = env();
  const r = await handleContact(post({}, { headers: { "content-length": "50000" } }), e, turnstile(true));
  assert.equal(r.status, 400);
});

test("gate C: send failure -> 502, never 200", async () => {
  const e = env({ sendFails: true });
  const r = await handleContact(post({}), e, turnstile(true));
  assert.equal(r.status, 502);
  assert.match((await r.json()).errors.form, /info@eazyaccess\.org/);
});

test("gate C: auto-reply failure still 200 (enquiry delivered)", async () => {
  const e = env({ autoReplyFails: true });
  const r = await handleContact(post({}), e, turnstile(true));
  assert.equal(r.status, 200);
  assert.equal(e.sent[0].to, INBOX);
});

test("gate D: over rate limit -> 429, nothing sent", async () => {
  const e = env({ limitOk: false });
  const r = await handleContact(post({}), e, turnstile(true));
  assert.equal(r.status, 429);
  assert.equal(e.sent.length, 0);
});

test("gate E: worker never logs the request body", () => {
  const src = readFileSync(new URL("../src/contact.js", import.meta.url), "utf8");
  assert.ok(!/console\.\w+\([^)]*(form|data|message|summary|d\.)/.test(src));
});

test("no-JS form gets a 303 back to the contact page", async () => {
  const r = await handleContact(post({}, { json: false }), env(), turnstile(true));
  assert.equal(r.status, 303);
  assert.equal(new URL(r.headers.get("location")).pathname + new URL(r.headers.get("location")).search, "/contact?contact=sent");
});

test("GET -> 405", async () => {
  const r = await handleContact(new Request("https://eazyaccess.org/api/contact"), env(), turnstile(true));
  assert.equal(r.status, 405);
});

test("worker entry exports only default (workerd rejects other named exports)", async () => {
  const mod = await import("../src/worker.js");
  assert.deepEqual(Object.keys(mod), ["default"]);
});

test("auto-reply never echoes visitor content or name (no spam relay)", async () => {
  const e = env();
  await handleContact(post({ name: "Win a prize http://evil.example", message: "Click http://evil.example to claim your prize now" }), e, turnstile(true));
  const reply = e.sent[1];
  assert.equal(typeof reply.to, "string");
  assert.ok(!/evil|prize/.test(JSON.stringify(reply)));
});

test("body cap holds without Content-Length (chunked upload) -> 400, nothing sent", async () => {
  const e = env();
  const big = "x".repeat(30000);
  const stream = new ReadableStream({ start(c) { c.enqueue(new TextEncoder().encode(`name=a&email=a%40b.co&message=${big}`)); c.close(); } });
  const req = new Request("https://eazyaccess.org/api/contact", { method: "POST", body: stream, duplex: "half", headers: { accept: "application/json", "content-type": "application/x-www-form-urlencoded", "cf-connecting-ip": "1.2.3.4" } });
  assert.equal(req.headers.get("content-length"), null);
  const r = await handleContact(req, e, turnstile(true));
  assert.equal(r.status, 400);
  assert.equal(e.sent.length, 0);
});

test("recipient over auto-reply cap -> enquiry still delivered, no auto-reply", async () => {
  const e = env({ recipientOk: false });
  const r = await handleContact(post({}), e, turnstile(true));
  assert.equal(r.status, 200);
  assert.equal(e.sent.length, 1);
  assert.equal(e.sent[0].to, INBOX);
});

test("no Resend key configured -> 502 and the email address shown, never a fake 200", async () => {
  const e = env({ key: "" });
  const r = await handleContact(post({}), e, turnstile(true));
  assert.equal(r.status, 502);
  assert.match((await r.json()).errors.form, /info@eazyaccess\.org/);
});

test("Resend request carries the key and our fixed From address", async () => {
  let seen;
  const e = env();
  const net = async (url, init) => { if (url === RESEND_URL) { seen = init; return current._send(JSON.parse(init.body)); } return Response.json({ success: true }); };
  await handleContact(post({}), e, net);
  assert.equal(seen.headers.authorization, "Bearer re_test");
  assert.equal(JSON.parse(seen.body).from, "eazy/access <enquiries@eazyaccess.org>");
});

test("emails use the branded layout: wordmark from this site's origin, plain-text part kept", async () => {
  const e = env();
  await handleContact(post({}), e, turnstile(true));
  for (const m of e.sent) {
    assert.match(m.html, /<img[^>]+src="https:\/\/eazyaccess\.org\/brand\/wordmark-email\.png"/);
    assert.match(m.html, /#F3F3F1/i);
    assert.ok(m.text && m.text.length > 20);
  }
});

test("auto-reply carries the company details the law asks for on business email", async () => {
  const e = env();
  await handleContact(post({}), e, turnstile(true));
  const r = e.sent[1];
  for (const s of ["EAZY ACCESS LTD", "13205428", "England and Wales", "71–75 Shelton Street"]) {
    assert.ok(r.html.includes(s), s);
    assert.ok(r.text.includes(s), s);
  }
});

test("enquiry email escapes visitor markup", async () => {
  const e = env();
  await handleContact(post({ name: "<b>Eve</b>", message: "Hello <script>alert(1)</script> there, a site please" }), e, turnstile(true));
  assert.ok(!/<script>|<b>Eve/.test(e.sent[0].html));
  assert.match(e.sent[0].html, /&lt;script&gt;/);
});
