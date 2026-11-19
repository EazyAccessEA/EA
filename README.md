# Eazy Access

Parent brand site for **eazyaccess.org** — a sovereign portfolio of tools for British life.

## Repository layout

| Path | Purpose |
|------|---------|
| `site/` | Next.js 14 app (App Router, TypeScript, Tailwind) |
| `eazyaccess-complete.jsx` | Original build / portfolio spec (reference) |
| `eazyaccess-brand.jsx` | Original brand system spec (reference) |

## Run the site locally

```bash
cd site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
cd site
npm run build
npm start
```

## Deploy

The app is configured for production at `eazyaccess.org` (see `metadataBase` and sitemap in `site/src/app/`). Deploy `site/` to [Vercel](https://vercel.com) or any Node host that supports Next.js 14.
# EA
