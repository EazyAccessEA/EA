import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { handleContact, INBOX } from "../src/contact.js";

function env({ limitOk = true, sendFails = false, autoReplyFails = false } = {}) {
  const sent = [];
  let calls = 0;
  return {
    sent,
    TURNSTILE_SECRET: "test-secret",
    CONTACT_RL: { limit: async () => ({ success: limitOk }) },
    EMAIL: {
      send: async (m) => {
        calls++;
        if (sendFails && calls === 1) throw Object.assign(new Error("boom"), { code: "E_INTERNAL" });
        if (autoReplyFails && calls === 2) throw Object.assign(new Error("boom"), { code: "E_INTERNAL" });
        sent.push(m);
        return { messageId: "m" + calls };
      },
    },
  };
}
const turnstile = (ok) => async () => Response.json({ success: ok });
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
  assert.equal(e.sent[0].replyTo.email, "amina@example.co.uk");
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
  assert.ok(!/[\r\n]/.test(e.sent[0].replyTo.name));
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

test("no-JS form gets a 303 back to #contact", async () => {
  const r = await handleContact(post({}, { json: false }), env(), turnstile(true));
  assert.equal(r.status, 303);
  assert.match(r.headers.get("location"), /contact=sent#contact$/);
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
