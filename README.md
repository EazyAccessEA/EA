# eazy/access

The website at eazyaccess.org, for a small UK studio that designs and builds websites, shops and tools.

| Path | What it holds |
|------|---------------|
| `pages/` | The page sources. `build.mjs` turns them into `public/`. |
| `public/` | The built site, served as static files. |
| `src/` | The Cloudflare Worker: it serves `public/` and handles the contact form at `/api/contact`. |
| `test/` | Tests for the build and the Worker. |
| `uptime/` | A separate Worker that checks the site is up. |
| `inventory/` | Social posts, ads and other material that isn't part of the site. |
| `qa/` | Scripts that check the live site. |

## Build and test

```bash
npm test
```

This builds `public/` and then runs the tests.

## Deploy

Deploys are by hand:

```bash
npx wrangler@4 deploy
```

DNS for eazyaccess.org changes only with the owner's approval.
