// Uptime watch: every 5 minutes, check each site; push to ntfy (ALERT_URL secret) only when a site
// goes down or comes back. State (which sites are down) lives in KV and is written only on change.
export const SITES = [
  ["eazyaccess.org", "https://eazyaccess.org/"],
  ["Call and Consequence", "https://callandconsequence.com/"],
  ["Farm Companion", "https://www.farmcompanion.co.uk/"],
  ["deeper.tools", "https://deeper.tools/"],
  ["Flintmere site", "https://flintmere.com/"],
  ["Flintmere audit", "https://audit.flintmere.com/"],
  // app.flintmere.com is left out: the Shopify app has never been deployed (Flintmere STATUS.md). Add it back with that deploy.
  ["PagePerfect", "https://pageperfect.studio/"],
  ["Sagheerah shop", "https://shop.sagheerah.com/"],
  ["Hetzner server", "http://meilisearch-b4lhb1p7qjhmhhawwmeslr67.37.27.194.158.sslip.io/health"],
];

// One check: up if it answers under 400 within 10 s. A failure is retried once after 5 s, so a single blip doesn't page.
export async function check(url, fetchFn = fetch, wait = (ms) => new Promise((r) => setTimeout(r, ms))) {
  const once = async () => {
    try {
      const r = await fetchFn(url, { redirect: "follow", signal: AbortSignal.timeout(10_000), headers: { "user-agent": "eazyaccess-uptime" } });
      return r.status < 400 ? null : `HTTP ${r.status}`;
    } catch (e) {
      return e?.name === "TimeoutError" ? "no answer in 10 s" : "connection or certificate error";
    }
  };
  const first = await once();
  if (!first) return null;
  await wait(5_000);
  return await once();
}

// Pure: compare who was down with who is down now; return the messages to send and the new state.
export function decide(prevDown, results) {
  const nowDown = {};
  for (const [name, problem] of results) if (problem) nowDown[name] = problem;
  const msgs = [];
  for (const [name, problem] of Object.entries(nowDown)) if (!(name in prevDown)) msgs.push(`DOWN: ${name} (${problem})`);
  for (const name of Object.keys(prevDown)) if (!(name in nowDown)) msgs.push(`BACK UP: ${name}`);
  return { nowDown, msgs, changed: msgs.length > 0 };
}

// Once an hour, a quiet "still running" note to <ALERT_URL>-heartbeat, a channel no phone follows. The Hetzner
// server's 09:00 backup check reads it and alerts if it has gone silent, so the two watch each other.
export async function heartbeat(env, now, fetchFn = fetch) {
  if (!env.ALERT_URL || new Date(now).getUTCMinutes() >= 5) return false;
  await fetchFn(`${env.ALERT_URL}-heartbeat`, { method: "POST", body: `uptime monitor ran ${new Date(now).toISOString()}` }).catch(() => null);
  return true;
}

export async function run(env, fetchFn = fetch, wait, now = Date.now()) {
  await heartbeat(env, now, fetchFn);
  const results = await Promise.all(SITES.map(async ([name, url]) => [name, await check(url, fetchFn, wait)]));
  const prev = JSON.parse((await env.STATE.get("down")) || "{}");
  const { nowDown, msgs, changed } = decide(prev, results);
  console.log(JSON.stringify({ down: nowDown, msgs }));
  if (!changed) return { msgs };
  if (env.ALERT_URL) {
    const anyDown = Object.keys(nowDown).length > 0;
    const r = await fetchFn(env.ALERT_URL, { method: "POST", body: msgs.join("\n"), headers: { Title: anyDown ? "Site down" : "All sites back up", Priority: anyDown ? "high" : "default", Tags: anyDown ? "rotating_light" : "white_check_mark" } }).catch(() => null);
    if (!r?.ok) { console.error("alert send failed; state not saved so it retries next run"); return { msgs }; }
  }
  await env.STATE.put("down", JSON.stringify(nowDown));
  return { msgs };
}

export default { async scheduled(event, env, ctx) { ctx.waitUntil(run(env, fetch, undefined, event.scheduledTime)); } };
