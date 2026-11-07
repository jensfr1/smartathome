#!/usr/bin/env bash
# Bereitet den Luanti-Server vor bzw. aktualisiert VoxeLibre.
#
#   ./setup.sh            Ersteinrichtung (VoxeLibre laden, Config kopieren)
#   ./setup.sh --update   VoxeLibre auf die neueste Version aktualisieren
#                         (Welten bleiben erhalten; vorher Backup empfohlen)
set -euo pipefail

cd "$(dirname "$0")"

CONTENTDB_URL="https://content.luanti.org/packages/Wuzzy/mineclone2/download/"
GAME_ID="mineclone2"          # technische ID von VoxeLibre
DATA_DIR="./data"
GAME_DIR="$DATA_DIR/games/$GAME_ID"

for cmd in curl unzip; do
  command -v "$cmd" >/dev/null || { echo "Fehlt: $cmd  ->  sudo apt install $cmd"; exit 1; }
done

[[ -f .env ]] || { cp .env.example .env; echo ".env aus .env.example erstellt."; }
# shellcheck disable=SC1091
set -a; source .env; set +a

mkdir -p "$DATA_DIR"/{games,mods,worlds,main-config}

if [[ -d "$GAME_DIR" && "${1:-}" != "--update" ]]; then
  echo "VoxeLibre ist bereits installiert ($(grep -m1 '^version' "$GAME_DIR/game.conf" 2>/dev/null || echo 'Version unbekannt'))."
  echo "Zum Aktualisieren: ./setup.sh --update"
else
  tmp="$(mktemp -d)"
  trap 'rm -rf "$tmp"' EXIT
  echo "Lade VoxeLibre von ContentDB (~85 MB) ..."
  curl -fL --progress-bar -o "$tmp/voxelibre.zip" "$CONTENTDB_URL"
  unzip -q "$tmp/voxelibre.zip" -d "$tmp/extract"
  [[ -f "$tmp/extract/$GAME_ID/game.conf" ]] || { echo "Unerwarteter Archivinhalt – Abbruch."; exit 1; }
  rm -rf "$GAME_DIR"
  mv "$tmp/extract/$GAME_ID" "$GAME_DIR"
  echo "VoxeLibre installiert: $(grep -m1 '^version' "$GAME_DIR/game.conf" || true)"
fi

if [[ ! -f "$DATA_DIR/main-config/minetest.conf" ]]; then
  cp minetest.conf "$DATA_DIR/main-config/minetest.conf"
  echo "minetest.conf nach $DATA_DIR/main-config/ kopiert."
fi

# Dateien dem Container-Benutzer geben (PUID/PGID aus .env)
if [[ "$(stat -c '%u:%g' "$DATA_DIR")" != "${PUID:-1000}:${PGID:-1000}" ]] || [[ "${1:-}" == "--update" ]]; then
  if [[ $EUID -eq 0 ]]; then chown -R "${PUID:-1000}:${PGID:-1000}" "$DATA_DIR"
  else sudo chown -R "${PUID:-1000}:${PGID:-1000}" "$DATA_DIR" || true; fi
fi

echo
echo "Fertig. Starten mit:  docker compose up -d"
echo "Logs ansehen mit:     docker compose logs -f"
