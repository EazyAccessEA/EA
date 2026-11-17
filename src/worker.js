// Entry only: workerd treats every named export as a handler, so logic lives in contact.js.
import { handleContact } from "./contact.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") return handleContact(request, env, fetch, ctx);
    const res = await env.ASSETS.fetch(request);
    // Local dev swaps in Cloudflare's test site key (TURNSTILE_SITEKEY in .dev.vars); production keeps the real key in the HTML.
    if (env.TURNSTILE_SITEKEY && (res.headers.get("content-type") || "").includes("text/html")) {
      return new HTMLRewriter()
        .on(".cf-turnstile", { element: (el) => el.setAttribute("data-sitekey", env.TURNSTILE_SITEKEY) })
        .transform(res);
    }
    return res;
  },
};
