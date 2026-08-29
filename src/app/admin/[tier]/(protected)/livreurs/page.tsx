import { notFound } from "next/navigation";
import { parseAdminTier, canAccessAdminFeature } from "@/lib/admin/features";
import { UpgradePlaceholder } from "@/components/admin/upgrade-placeholder";
import { DriversBoard } from "@/components/admin/drivers-board";
import { createSupabaseAdmin } from "@/lib/db/supabase";

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

  let drivers: { id: string; name: string; phone: string; status: string }[] = [];
  try {
    const supabase = createSupabaseAdmin();
    const { data } = await supabase.from("Driver").select("*").order("name");
    drivers = (data ?? []).map((d) => ({
      id: String(d.id),
      name: String(d.name ?? ""),
      phone: String(d.phone ?? ""),
      status: String(d.status ?? "OFFLINE"),
    }));
  } catch {
    drivers = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl text-brand-cream">Livreurs</h1>
        <p className="text-brand-cream/50">
          Flotte, dispatch des courses et carte live — formule Premium
        </p>
      </div>
      <DriversBoard initialDrivers={drivers} />
    </div>
  );
}
