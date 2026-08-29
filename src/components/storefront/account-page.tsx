"use client";

import Link from "next/link";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoTier } from "@/components/demo/demo-tier-provider";
import { CommercialCtaSection } from "@/components/demo/commercial-cta";

export function AccountPage() {
  const { features, label, basePath, tier } = useDemoTier();

  if (!features.customerAccount) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-display text-4xl text-brand-cream">Compte client</h1>
        <p className="mt-3 text-brand-cream/60">
          Disponible à partir de la formule Pro. Vous êtes en démo {label}.
        </p>
        <Button asChild className="mt-6" variant="gold">
          <Link href="/demo/pro">Voir la démo Pro</Link>
        </Button>
        <p className="mt-4">
          <Link href={basePath} className="text-sm text-brand-orange hover:underline">
            ← Retour au menu
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <Link href={basePath} className="text-sm text-brand-cream/50 hover:text-brand-orange">
        ← Retour au menu
      </Link>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/20">
          <User className="h-6 w-6 text-brand-orange" />
        </div>
        <div>
          <h1 className="font-display text-3xl text-brand-cream">Mon compte</h1>
          <p className="text-sm text-brand-cream/50">Démo {label}</p>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <Card title="Profil" body="Jean Dupont · client@speedapero.demo · 06 12 34 56 78" />
        <Card title="Adresses" body="12 rue de la Dark Kitchen, 30000 Nîmes" />
        <Card title="Historique" body="3 commandes récentes · dernière #1042" />
        {features.loyalty && (
          <Card title="Fidélité" body="238 points · prochain reward à 300 pts" highlight />
        )}
        {features.customerCredit && (
          <Card title="Crédit client" body="5,00 € disponibles sur votre compte" highlight />
        )}
        {tier === "premium" && (
          <Card title="Préférences" body="Notifications push · PWA activable" />
        )}
      </div>

      <div className="mt-10">
        <CommercialCtaSection
          tier={tier}
          title={`Compte ${label} — intéressant ?`}
          subtitle="On active le même parcours pour vos vrais clients."
        />
      </div>
    </div>
  );
}

function Card({
  title,
  body,
  highlight,
}: {
  title: string;
  body: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        highlight
          ? "border-brand-gold/30 bg-brand-gold/5"
          : "border-white/10 bg-brand-anthracite"
      }`}
    >
      <p className="text-xs font-bold uppercase tracking-wide text-brand-cream/40">{title}</p>
      <p className="mt-1 text-sm text-brand-cream/80">{body}</p>
    </div>
  );
}
