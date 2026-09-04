# Installer une édition Speed Apéro chez le client

Artefacts : `npm run build:editions` → `dist/editions/speed-apero-{starter|pro|premium}.tgz`

## Architecture

| Composant | Chez le client |
|-----------|----------------|
| App Next.js (standalone) | Leur VPS / Node |
| **PostgreSQL** | **Leur hébergement** (VPS, managed Postgres, etc.) |
| Nginx + SSL | Leur domaine |

La base locale Docker (`localhost:5433`) sert **uniquement au développement** Gotham.  
En production client : `DATABASE_URL` pointe vers **leur** Postgres.

## Prérequis

- Node.js 20+
- PostgreSQL 14+ accessible depuis l’app (même machine ou réseau privé)
- Nginx (ou autre reverse-proxy)
- PM2 recommandé

## 1. Base de données (hébergement client)

Créer une base + utilisateur Postgres, puis :

```bash
# Sur la machine qui a le code source / prisma, ou depuis le dossier extrait si prisma y est
# Exemple URL :
# postgresql://USER:PASSWORD@HOST:5432/speedapero?schema=public

npx prisma db push
npx prisma db seed   # ou : npm run db:seed
```

Compte seed (à changer après livraison) :
- Admin : `admin@speedapero.demo` / `demo2026`

## 2. Application

1. Extraire `speed-apero-{edition}.tgz` → ex. `/opt/speed-apero`
2. `cp .env.example .env` et renseigner :

```env
NEXT_PUBLIC_APP_MODE=client
NEXT_PUBLIC_PRODUCT_EDITION=pro   # ou starter / premium (déjà figé au build)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB?schema=public"
AUTH_SECRET="…32 caractères min…"
NEXT_PUBLIC_APP_URL="https://domaine-client.fr"
PORT=3010
HOSTNAME=0.0.0.0
```

3. `pm2 start ecosystem.config.cjs` (ou `node server.js`)
4. Nginx → `127.0.0.1:3010` + Certbot

## Édition figée

`NEXT_PUBLIC_PRODUCT_EDITION` est compilé dans le build.  
Ne pas mélanger Starter / Pro / Premium sur le même dossier sans rebuild.

## URLs

- Site : `https://domaine-client/`
- Admin : `https://domaine-client/admin`

## Mise à jour

Redeployer un artefact de **la même édition** + `prisma db push` si le schéma a évolué.
