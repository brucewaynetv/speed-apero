import { notFound } from "next/navigation";
import { parseAdminTier, canAccessAdminFeature } from "@/lib/admin/features";
import { UpgradePlaceholder } from "@/components/admin/upgrade-placeholder";
import { DriversBoard } from "@/components/admin/drivers-board";
import { prisma } from "@/lib/db/prisma";
import { isClientEdition } from "@/lib/product/edition";

interface PageProps {
  params: Promise<{ tier: string }>;
}

export default async function DriversPage({ params }: PageProps) {
  const { tier: tierParam } = await params;
  const tier = parseAdminTier(tierParam);
  if (!tier) notFound();

  if (!canAccessAdminFeature(tier, "drivers")) {
    if (isClientEdition()) notFound();
    return <UpgradePlaceholder tier={tier} feature="Livreurs" requiredTier="premium" />;
  }

  let drivers: { id: string; name: string; phone: string; status: string }[] = [];
  try {
    const rows = await prisma.driver.findMany({ orderBy: { name: "asc" } });
    drivers = rows.map((d) => ({
      id: d.id,
      name: d.name,
      phone: d.phone,
      status: d.status,
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
