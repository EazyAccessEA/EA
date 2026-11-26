# DocuSeal email layout

Agreements are signed in DocuSeal at sign.eazyaccess.org (docuseal/docuseal:3.4.0, container `docuseal` on the Hetzner server, `ssh hetzner`). It sends its emails through Resend over SMTP (smtp.resend.com, port 587; Hetzner blocks 465 and 25), from info@eazyaccess.org.

`mailer.html.erb` replaces DocuSeal's own `app/views/layouts/mailer.html.erb`, so every DocuSeal email uses our house layout: the wordmark, the #F3F3F1 ground, a white card and the company details. DocuSeal's own settings can't do this: an email body only allows plain paragraphs, bold, italics and links, and the logo needs DocuSeal Pro.

DocuSeal's attribution line stays at the bottom, as its licence's additional terms require. DocuSeal is AGPL-3.0, and this file is our only change to it. Its source is published here.

## On the server

The file lives at `/opt/docuseal/overrides/mailer.html.erb` and is mounted read-only into the container:

    -v /opt/docuseal/overrides/mailer.html.erb:/app/app/views/layouts/mailer.html.erb:ro

To change the layout, edit this file, copy it to the server, then `docker restart docuseal`.

**Before upgrading DocuSeal,** compare its new `app/views/layouts/mailer.html.erb` with the 3.4.0 original. It only yields the body and renders `shared/mailer_attribution`. If upstream changes it, update this file to match first.

## Email wording

Settings → Personalization holds the wording for three emails, set on 26 Nov 2026:

- **Signing request** (to each signer): "{template.name}: ready for you to sign", with a "Read and sign" button.
- **Signed copy** (to every signer, once everyone has signed): "{template.name}: your signed copy". It's sent automatically, with the signed PDF and the signing record (audit log) attached.
- **Completed** (to us): "Signed: {template.name}", with a link to it in DocuSeal and "Next: send the first invoice".

The emails come from "eazy/access" <info@eazyaccess.org>, the DocuSeal user and account name. Automatic reminders need DocuSeal Pro, so they're off.

## Backups

DocuSeal's data is in the server's nightly restic backup, `/srv/hermes/backup.sh`, which runs at 03:17 UTC:

- The live SQLite database is copied with SQLite's online backup API to `/opt/docuseal/data/docuseal/backup/db.sqlite3`, and the copy must pass `PRAGMA integrity_check`. The log line is "docuseal db copy: …, integrity ok". On failure it reads "docuseal db copy FAILED", and the 09:00 check (`/srv/hermes/backup-check.sh`) sends an ntfy alert.
- `/opt/docuseal/data` goes to both restic repositories, Hetzner Object Storage (hel1) and Cloudflare R2 (EU), without the live database file. The attachments (the PDFs) are included, and so is `docuseal.env`, whose SECRET_KEY_BASE is needed to read DocuSeal's encrypted settings, such as the SMTP key.
- A restore test on 26 Nov 2026 matched the server from both copies: the same database checksum and all 48 attachment files.

**To restore:** stop the container, restore `/opt/docuseal/data` from the latest snapshot, copy `backup/db.sqlite3` over `db.sqlite3`, then start the container.

## Uptime

`uptime/src/index.js` checks https://sign.eazyaccess.org/ every 5 minutes, with the other sites.
