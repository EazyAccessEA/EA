# DocuSeal email layout

Agreements are signed in DocuSeal at sign.eazyaccess.org (docuseal/docuseal:3.4.0, container `docuseal` on the Hetzner server, `ssh hetzner`). It sends its emails through Resend over SMTP (smtp.resend.com, port 587; Hetzner blocks 465 and 25), from info@eazyaccess.org.

`mailer.html.erb` replaces DocuSeal's own `app/views/layouts/mailer.html.erb`, so every DocuSeal email uses our house layout: the wordmark, the #F3F3F1 ground, a white card and the company details. DocuSeal's own settings can't do this: an email body only allows plain paragraphs, bold, italics and links, and the logo needs DocuSeal Pro.

DocuSeal's attribution line stays at the bottom, as its licence's additional terms require. DocuSeal is AGPL-3.0, and this file is our only change to it. Its source is published here.

## On the server

The file lives at `/opt/docuseal/overrides/mailer.html.erb` and is mounted read-only into the container:

    -v /opt/docuseal/overrides/mailer.html.erb:/app/app/views/layouts/mailer.html.erb:ro

To change the layout, edit this file, copy it to the server, then `docker restart docuseal`.

**Before upgrading DocuSeal,** compare its new `app/views/layouts/mailer.html.erb` with the 3.4.0 original. It only yields the body and renders `shared/mailer_attribution`. If upstream changes it, update this file to match first.
