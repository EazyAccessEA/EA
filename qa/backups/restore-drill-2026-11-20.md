# Restore drill, 20 Nov 2026

Server: hetzner (37.27.194.158). Backup: `/srv/hermes/backup.sh`, nightly 03:17 UTC, restic to Hetzner Object Storage, keeps 7 daily, 4 weekly, 6 monthly.

1. `restic restore latest --include /srv/farm-companion-db` from snapshot `806cbd52` (2026-11-20 03:17 UTC) into `/tmp/restore-drill`: 954.5 KiB, no errors.
2. Loaded `farm-companion.dump` into a throwaway `postgis/postgis:16-3.4-alpine` container with no network (`pg_restore --clean --if-exists --no-owner`): no errors.
3. Compared exact row counts for every user table, drill against live: 10 tables each, 16,268 rows, every count identical (`farms` 3,504, `farm_categories` 3,123, `images` 1,104, `categories` 35).
4. Removed the container and `/tmp/restore-drill`.

Result: pass. Time to restore and verify: under 5 minutes.

Not covered: Hermes and Honcho data (same snapshot, not restored), Farm Companion's Meilisearch and Redis (not backed up), Flintmere (separate server, `flintmere-prod`, not checked).
