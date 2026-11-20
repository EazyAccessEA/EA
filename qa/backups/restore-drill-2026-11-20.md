# Restore drill, 20 Nov 2026

Server: hetzner (37.27.194.158). Backup: `/srv/hermes/backup.sh`, nightly 03:17 UTC, restic to Hetzner Object Storage, keeps 7 daily, 4 weekly, 6 monthly.

1. `restic restore latest --include /srv/farm-companion-db` from snapshot `806cbd52` (2026-11-20 03:17 UTC) into `/tmp/restore-drill`: 954.5 KiB, no errors.
2. Loaded `farm-companion.dump` into a throwaway `postgis/postgis:16-3.4-alpine` container with no network (`pg_restore --clean --if-exists --no-owner`): no errors.
3. Compared exact row counts for every user table, drill against live: 10 tables each, 16,268 rows, every count identical (`farms` 3,504, `farm_categories` 3,123, `images` 1,104, `categories` 35).
4. Removed the container and `/tmp/restore-drill`.

Result: pass. Time to restore and verify: under 5 minutes.

Not covered: Hermes and Honcho data (same snapshot, not restored), Farm Companion's Meilisearch and Redis (not backed up), Flintmere (separate server, `flintmere-prod`, not checked).

## Second copy: Cloudflare R2, same day

Bucket `eazyaccess-backups`, EU jurisdiction (EEUR). Own restic repo `1aa7615351`, own password and keys in `/root/.r2-backup.env` on the server (mode 600; the password is also in the owner's password manager). `backup.sh` backs up to R2 after Hetzner with the same retention, and logs `r2 second copy: ok` or `** R2 SECOND COPY FAILED **`.

1. First R2 snapshot `bc5d92b3`: 145,705 files, 9.693 GiB, 3.298 GiB stored. `restic check`: no errors.
2. Same drill from R2: restored the Farm Companion dump, loaded it into a throwaway container, compared with live. 10 tables, 16,268 rows, identical. Cleaned up.
3. Ran `backup.sh` end to end at 18:43 UTC: both dumps, Hetzner backup and R2 copy all ok, in 41 seconds.

Result: pass. R2 free tier is 10 GB; 3.3 GB is used.

## Failure alert

`/srv/hermes/backup-check.sh`, cron 09:00 UTC, log `/var/log/backup-check.log`. Reads today's run in `/var/log/hermes-restic.log` and pushes to ntfy (topic in `/root/.backup-alert.env`) if no run happened, the run didn't finish, the R2 copy didn't succeed, or any line says FAILED, ABORTED, NOT FOUND or not configured. Status lines only, never data. Tested on 20 Nov with a forced failure and a missing run: both alerted. Crontab backup: `/root/crontab.bak-2026-11-20`.

Not covered: if the whole server is down, the check can't run either. An uptime monitor is the fix for that.
