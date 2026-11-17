// Branded email layout. Email clients ignore web fonts and strip <style>, so everything is
// inline, table-based, and falls back to system sans. Colours are the site tokens.

export const COMPANY = {
  name: "EAZY ACCESS LTD",
  line: "EAZY ACCESS LTD · Registered in England and Wales, company number 13205428 · Registered office: 71–75 Shelton Street, Covent Garden, London WC2H 9JQ",
};
const INK = "#0B0B0C", TEXT2 = "#3F3F44", TEXT3 = "#5E5E62", GROUND = "#F3F3F1", RULE = "#E2E2DF", ORANGE = "#E65B2C";
const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const SERIF = "Georgia,'Times New Roman',serif";

export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export function layout({ origin, preheader, body }) {
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"></head>
<body style="margin:0;padding:0;background:${GROUND}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${GROUND}"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
<tr><td style="padding:0 4px 20px"><a href="${origin}/" style="text-decoration:none"><img src="${origin}/brand/wordmark-email.png" width="140" height="27" alt="eazy/access" style="display:block;border:0;width:140px;height:auto"></a></td></tr>
<tr><td style="background:#FFFFFF;border-radius:20px;padding:36px 32px;font:400 17px/1.55 ${SANS};color:${INK}">${body}</td></tr>
<tr><td style="padding:20px 4px 0;font:400 12px/1.5 ${SANS};color:${TEXT3}">${esc(COMPANY.line)}</td></tr>
</table></td></tr></table></body></html>`;
}

export const heading = (plain, accent) =>
  `<h1 style="margin:0 0 16px;font:600 30px/1.1 ${SANS};letter-spacing:-.01em;color:${INK}">${esc(plain)} <span style="font:italic 400 32px ${SERIF};color:${ORANGE}">${esc(accent)}</span></h1>`;
export const para = (html) => `<p style="margin:0 0 14px;color:${TEXT2}">${html}</p>`;
export const rule = `<div style="height:1px;background:${RULE};margin:24px 0"></div>`;
export const row = (label, valueHtml) =>
  `<tr><td style="padding:10px 0;border-top:1px solid ${RULE};width:96px;vertical-align:top;font:500 14px ${SANS};color:${TEXT3}">${esc(label)}</td><td style="padding:10px 0;border-top:1px solid ${RULE};font:400 16px/1.5 ${SANS};color:${INK}">${valueHtml}</td></tr>`;
export const table = (rows) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 20px">${rows}</table>`;
export const quote = (text) =>
  `<div style="background:${GROUND};border-radius:14px;padding:18px 20px;white-space:pre-wrap;font:400 16px/1.6 ${SANS};color:${INK}">${esc(text)}</div>`;
export const link = (href, label) => `<a href="${esc(href)}" style="color:${INK};text-decoration:underline">${esc(label)}</a>`;
