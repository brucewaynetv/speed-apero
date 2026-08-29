# Speed Apéro — Plateforme de commande en ligne

Plateforme de commande propriétaire pour la dark kitchen **Speed Apéro**, avec trois démos commerciales (Starter / Pro / Premium) sur une seule base de code.

## Démarrage rapide

```bash
npm install
npx prisma db push
npm run db:seed
npm run dev
```

Ouvrir [http://localhost:3000/demo](http://localhost:3000/demo)

## Routes principales

| Route | Description |
|-------|-------------|
| `/demo` | Comparateur des 3 formules |
| `/demo/starter` | Démo Starter (500 €) |
| `/demo/pro` | Démo Pro (800 €) — recommandée |
| `/demo/premium` | Démo Premium (1 200 €) |
| `/demo/[tier]/checkout` | Tunnel de commande |
| `/admin` | Choix de la formule admin |
| `/admin/starter/login` | Admin Starter (500 €) |
| `/admin/pro/login` | Admin Pro (800 €) — recommandé |
| `/admin/premium/login` | Admin Premium (1 200 €) |
| `/admin/[tier]/produits` | Gestion produits (CRUD) |

## Comptes de démonstration

- **Admin** : `admin@speedapero.demo` / `demo2026`
- **Client** : `client@speedapero.demo` / `demo2026`

## Scripts

```bash
npm run dev        # Serveur de développement
npm run build      # Build production
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run db:seed    # Données de démo
```

## Stack

- Next.js 16 · TypeScript · Tailwind CSS v4
- Prisma · SQLite (dev) / PostgreSQL (prod)
- Zustand (panier) · Zod · React Hook Form
- shadcn/ui · Lucide · Sonner

## Déploiement production (VPS legeekshop)

| URL | Statut |
|-----|--------|
| https://speed-apero.gothamdev.fr | VPS `152.228.237.29` (PM2 port 3010) |
| https://speed-apero.netlify.app | Legacy — à désactiver (crédits) |

### DNS (LWS / gothamdev.fr)

Remplacer le CNAME Netlify par un enregistrement **A** :

```
Type   Nom           Valeur
A      speed-apero   152.228.237.29
```

Puis SSL sur le VPS :

```bash
ssh -i ~/.ssh/legeekshop_vps ubuntu@152.228.237.29 \
  "sudo certbot --nginx -d speed-apero.gothamdev.fr --non-interactive --agree-tos -m contact@gothamdev.fr --redirect"
```

### Redéployer sur le VPS

```bash
npm run deploy:vps
```

Prérequis : clé SSH `%USERPROFILE%\.ssh\legeekshop_vps`, fichier `.env` local (Supabase + `AUTH_SECRET`).

### Infrastructure

- **Hébergement** : VPS OVH legeekshop (`152.228.237.29`)
- **Process** : PM2 `speed-apero` → `127.0.0.1:3010`
- **Proxy** : Nginx `speed-apero.gothamdev.fr`
- **Base de données** : Supabase PostgreSQL (`cnowljsvllujntnfrlpe`)
- **Releases** : `/opt/speed-apero-releases/` · runtime `/opt/speed-apero/current`

### Couper Netlify (recommandé)

Dans Netlify → Site `speed-apero` → **Deploys** → Stop builds / unlink Git, pour ne plus consommer de crédits.

## Phase 1 — Livré

- Architecture monorepo Next.js
- Design system Speed Apéro (couleurs, typos, composants)
- Page comparateur `/demo`
- Storefront complet (hero, menu, catégories, produits, options)
- Panier fonctionnel (drawer desktop / bottom sheet mobile)
- Checkout 4 étapes + API commandes
- Seed complet (produits, zones, horaires, comptes)
- Système de tiers avec sélecteur de formule
- Déploiement Netlify + CI/CD GitHub

## Phase 2 — Livré

- **3 admins démo** : Starter / Pro / Premium (`/admin`)
- **Gestion commandes** + changement de statut
- **Mode cuisine** (Pro+) — kanban temps réel
- **Gestion produits** — ajout, modification, désactivation
- **Marketing, livreurs, analytics** — selon formule
- Auth session sécurisée + API admin protégée

### Variable Netlify requise

Ajoutez `AUTH_SECRET` (min. 32 caractères aléatoires) dans les variables d'environnement Netlify.

## Prochaines phases

- Espace client (Pro)
- Fidélité, livreurs, tracking (Premium)
- PWA · Stripe · Notifications
