import { test } from "node:test";
import assert from "node:assert/strict";
import { check, decide, run } from "../src/index.js";

const noWait = async () => {};
const res = (status) => ({ status, ok: status < 400 });

test("check: a blip that recovers on retry is not a failure", async () => {
  let n = 0;
  assert.equal(await check("u", async () => res(++n === 1 ? 503 : 200), noWait), null);
});

test("check: two failures in a row are reported, certificate errors included", async () => {
  assert.equal(await check("u", async () => res(503), noWait), "HTTP 503");
  assert.equal(await check("u", async () => { throw new TypeError("cert"); }, noWait), "connection or certificate error");
});

test("decide: alerts only on change, never twice for the same outage", () => {
  const a = decide({}, [["A", "HTTP 500"], ["B", null]]);
  assert.deepEqual(a.msgs, ["DOWN: A (HTTP 500)"]);
  const b = decide(a.nowDown, [["A", "HTTP 500"], ["B", null]]);
  assert.deepEqual(b.msgs, []);
  const c = decide(b.nowDown, [["A", null], ["B", null]]);
  assert.deepEqual(c.msgs, ["BACK UP: A"]);
});

function kv(init) { const m = new Map(init); return { get: async (k) => m.get(k) ?? null, put: async (k, v) => m.set(k, v), m }; }

test("run: a failed alert send does not save state, so the alert retries next run", async () => {
  const env = { STATE: kv(), ALERT_URL: "https://ntfy.example/t" };
  const fetchFn = async (url) => (url === env.ALERT_URL ? res(500) : url.includes("eazyaccess.org") ? res(502) : res(200));
  await run(env, fetchFn, noWait);
  assert.equal(env.STATE.m.has("down"), false);
});

test("run: a new outage sends one alert and saves state", async () => {
  const sent = [];
  const env = { STATE: kv(), ALERT_URL: "https://ntfy.example/t" };
  const fetchFn = async (url, init) => { if (url === env.ALERT_URL) { sent.push(init.body); return res(200); } return url.includes("eazyaccess.org") ? res(502) : res(200); };
  await run(env, fetchFn, noWait);
  await run(env, fetchFn, noWait);
  assert.deepEqual(sent, ["DOWN: eazyaccess.org (HTTP 502)"]);
  assert.match(env.STATE.m.get("down"), /eazyaccess\.org/);
});
