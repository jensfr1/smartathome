#!/usr/bin/env bash
# Sichert Welten und Config nach ./backups/ (Server wird kurz gestoppt).
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p backups
file="backups/luanti-$(date +%Y%m%d-%H%M%S).tar.gz"
docker compose stop luanti
tar -czf "$file" data/worlds data/main-config data/mods
docker compose start luanti
echo "Backup erstellt: $file"
# Nur die letzten 10 Backups behalten
ls -1t backups/luanti-*.tar.gz | tail -n +11 | xargs -r rm --
