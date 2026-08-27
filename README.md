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

## Déploiement production

| URL | Statut |
|-----|--------|
| https://speed-apero.netlify.app | ✅ En ligne |
| https://speed-apero.gothamdev.fr | ⏳ DNS à configurer |

### DNS requis (chez votre registrar, comme pour `boost.gothamdev.fr`)

```
Type   Nom          Valeur
CNAME  speed-apero  speed-apero.netlify.app
```

Le domaine custom est déjà configuré côté Netlify. Dès que le CNAME est actif, le SSL Let's Encrypt sera provisionné automatiquement.

### Infrastructure

- **Hébergement** : Netlify (projet `speed-apero`)
- **Base de données** : Supabase PostgreSQL (`cnowljsvllujntnfrlpe`)
- **Admin Netlify** : https://app.netlify.com/projects/speed-apero

### Redéployer

Chaque push sur `main` déclenche automatiquement le déploiement via GitHub Actions.

```bash
git push origin main
```

Déploiement manuel si besoin :

```bash
npm run build
npx netlify deploy --prod
```

> Sur Windows, déployer depuis un chemin **sans espaces** si le CLI Netlify échoue en local.

### CI/CD (GitHub → Netlify)

- **Dépôt** : https://github.com/brucewaynetv/speed-apero
- **Branche de production** : `main`
- Chaque `git push origin main` déclenche un build + déploiement automatique sur Netlify
- **Dashboard builds** : https://app.netlify.com/projects/speed-apero/deploys

Variables d'environnement configurées sur Netlify (production) :
`NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Hébergement (sous-domaine gothamdev.fr)

Voir section **Déploiement production** ci-dessus.

## Phase 1 — Livré

- Architecture monorepo Next.js
- Design system Speed Apéro (couleurs, typos, composants)
- Page comparateur `/demo`
- Storefront complet (hero, menu, catégories, produits, options)
- Panier fonctionnel (drawer desktop / bottom sheet mobile)
- Checkout 4 étapes + API commandes
- Seed complet (produits, zones, horaires, comptes)
- Système de tiers avec sélecteur de formule

## Prochaines phases

- Admin dashboard + mode cuisine
- Espace client (Pro)
- Fidélité, livreurs, tracking (Premium)
- PWA · Stripe · Notifications
