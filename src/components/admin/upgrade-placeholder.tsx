import Link from "next/link";
import { Lock } from "lucide-react";
import type { DemoTier } from "@/lib/demo/tiers";
import { getAdminBasePath, getTierMeta } from "@/lib/admin/features";
import { Button } from "@/components/ui/button";

interface UpgradePlaceholderProps {
  tier: DemoTier;
  feature: string;
  requiredTier: DemoTier;
}

export function UpgradePlaceholder({ tier, feature, requiredTier }: UpgradePlaceholderProps) {
  const meta = getTierMeta(requiredTier);
  const base = getAdminBasePath(tier);

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-brand-gold/30 bg-brand-gold/5 p-10 text-center">
      <Lock className="mx-auto mb-4 h-10 w-10 text-brand-gold" />
      <h2 className="font-display text-3xl text-brand-cream">{feature}</h2>
      <p className="mt-2 text-brand-cream/60">
        Disponible à partir de la formule{" "}
        <strong className="text-brand-gold">{meta.label}</strong> ({meta.price} €)
      </p>
      {tier !== requiredTier && (
        <Button asChild className="mt-6" variant="gold">
          <Link href={`/admin/${requiredTier}/login`}>Voir la démo {meta.label}</Link>
        </Button>
      )}
      <p className="mt-4">
        <Link href={base} className="text-sm text-brand-cream/40 hover:text-brand-orange">
          ← Retour au dashboard
        </Link>
      </p>
    </div>
  );
}
