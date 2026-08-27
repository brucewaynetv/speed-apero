import { notFound } from "next/navigation";
import { parseAdminTier, canAccessAdminFeature } from "@/lib/admin/features";
import { UpgradePlaceholder } from "@/components/admin/upgrade-placeholder";
import { createSupabaseAdmin } from "@/lib/db/supabase";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: Promise<{ tier: string }>;
}

export default async function DriversPage({ params }: PageProps) {
  const { tier: tierParam } = await params;
  const tier = parseAdminTier(tierParam);
  if (!tier) notFound();

  if (!canAccessAdminFeature(tier, "drivers")) {
    return <UpgradePlaceholder tier={tier} feature="Livreurs" requiredTier="premium" />;
  }

  const supabase = createSupabaseAdmin();
  const { data: drivers } = await supabase.from("Driver").select("*").order("name");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl text-brand-cream">Livreurs</h1>
        <p className="text-brand-cream/50">Gestion de l&apos;équipe de livraison</p>
      </div>
      {(drivers ?? []).length === 0 ? (
        <p className="text-brand-cream/50">Aucun livreur configuré</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {(drivers ?? []).map((driver) => (
            <li key={driver.id} className="rounded-2xl border border-white/10 bg-brand-anthracite p-4">
              <p className="font-semibold text-brand-cream">{driver.name}</p>
              <p className="text-sm text-brand-cream/60">{driver.phone}</p>
              <Badge className="mt-2" variant={driver.status === "AVAILABLE" ? "gold" : "outline"}>
                {driver.status}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
