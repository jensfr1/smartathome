# Luanti + VoxeLibre Server (Docker)

Eigener Luanti-Server (früher „Minetest“) mit dem Spiel **VoxeLibre** (früher „MineClone2“) –
Open Source, läuft im Heimnetz, keine Accounts bei Dritten nötig.

- Image: [`lscr.io/linuxserver/luanti`](https://hub.docker.com/r/linuxserver/luanti) (amd64 + arm64, also auch Raspberry Pi)
- Spiel: [VoxeLibre auf ContentDB](https://content.luanti.org/packages/Wuzzy/mineclone2/) – getestet mit Luanti 5.18.0 / VoxeLibre 0.92.4

## Inhalt

| Datei | Zweck |
|---|---|
| `docker-compose.yml` | Container-Definition |
| `.env.example` | Version, Port, Weltname, PUID/PGID |
| `minetest.conf` | Server-Einstellungen (Name, Survival/Kreativ, Admin …) |
| `setup.sh` | Ersteinrichtung: lädt VoxeLibre, kopiert Config. `--update` aktualisiert VoxeLibre |
| `backup.sh` | Sichert Welten + Config nach `backups/` (behält die letzten 10) |

## 1. Docker auf Debian installieren (falls noch nicht vorhanden)

```bash
sudo apt update
sudo apt install -y ca-certificates curl unzip
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] \
  https://download.docker.com/linux/debian $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo usermod -aG docker $USER   # danach einmal ab- und wieder anmelden
```

## 2. Server einrichten

```bash
git clone https://github.com/jensfr1/smartathome.git
cd smartathome/luanti
cp .env.example .env        # optional anpassen (Port, Weltname, PUID/PGID via `id`)
nano minetest.conf          # Servername, Admin-Name, Survival/Kreativ
./setup.sh                  # lädt VoxeLibre (~85 MB) nach data/games/mineclone2
docker compose up -d
docker compose logs -f      # warten auf: Server for gameid="mineclone2" listening on 0.0.0.0:30000
```

> Hinweis: `minetest.conf` wird nur beim ersten `./setup.sh` nach `data/main-config/` kopiert.
> Spätere Änderungen direkt in `data/main-config/minetest.conf` machen und `docker compose restart`.

Firewall (falls aktiv):

```bash
sudo ufw allow 30000/udp
```

## 3. Verbinden

1. Luanti-Client installieren: <https://www.luanti.org/downloads/> (Windows, macOS, Linux, Android; iOS-Version ist bislang eingeschränkt).
   Am besten dieselbe Version wie der Server (`LUANTI_VERSION` in `.env`).
2. Reiter **Spielen / Join Game** → Adresse: IP des Debian-Rechners (z. B. `192.168.1.50`), Port `30000`.
3. Mit dem Namen aus `name = …` in `minetest.conf` (Standard `admin`) **zuerst** einloggen und ein Passwort setzen – dieser Account hat alle Rechte.

Den Spiel-Inhalt (Texturen, Sounds) lädt der Client beim ersten Verbinden automatisch vom Server.

## Betrieb

| Aufgabe | Befehl |
|---|---|
| Starten / Stoppen | `docker compose up -d` / `docker compose down` |
| Logs | `docker compose logs -f` |
| Config neu laden | `docker compose restart` |
| Backup | `./backup.sh` (z. B. per Cron: `0 4 * * * cd /pfad/zu/luanti && ./backup.sh`) |
| VoxeLibre aktualisieren | `./backup.sh && ./setup.sh --update && docker compose restart` |
| Luanti aktualisieren | `LUANTI_VERSION` in `.env` erhöhen → `docker compose pull && docker compose up -d` |

Nützliche Chat-Befehle als Admin: `/grant <spieler> fly`, `/revoke <spieler> interact`, `/time 6000`,
`/teleport <spieler>`, `/kick <spieler>`, `/ban <spieler>`.

## Daten

Alles liegt in `./data` (gemappt auf `/config/.minetest` im Container):

```
data/
├── games/mineclone2/    VoxeLibre (wird bei --update ersetzt)
├── worlds/welt/         eure Welt – das Wichtigste im Backup
├── mods/                zusätzliche Mods
└── main-config/minetest.conf
```

## Hinweise

- **Erreichbarkeit von außen:** Standardmäßig nur im Heimnetz. Für Zugriff aus dem Internet UDP 30000 im Router weiterleiten
  – dann unbedingt `disallow_empty_password = true` beibehalten und ggf. `default_privs = shout` setzen.
- **Raspberry Pi / schwache Hardware:** in `minetest.conf` die Werte unter „Performance“ reduzieren (z. B. auf 6 / 6 / 2).
- **Welt-Generator:** VoxeLibre unterstützt `v6` nicht, daher ist `mg_name = v7` gesetzt. Gilt nur für neue Welten.
- **IPv6:** ist bewusst deaktiviert, weil Docker-Netze standardmäßig kein IPv6 haben (sonst startet der Server nicht).
