import { notFound } from "next/navigation";
import { parseAdminTier, canAccessAdminFeature } from "@/lib/admin/features";
import { fetchAdminOrders } from "@/lib/orders/queries";
import { KitchenBoard } from "@/components/admin/kitchen-board";
import { UpgradePlaceholder } from "@/components/admin/upgrade-placeholder";
import { isClientEdition } from "@/lib/product/edition";

interface PageProps {
  params: Promise<{ tier: string }>;
}

export default async function TierKitchenPage({ params }: PageProps) {
  const { tier: tierParam } = await params;
  const tier = parseAdminTier(tierParam);
  if (!tier) notFound();

  if (!canAccessAdminFeature(tier, "kitchenMode")) {
    if (isClientEdition()) notFound();
    return (
      <UpgradePlaceholder tier={tier} feature="Mode cuisine" requiredTier="pro" />
    );
  }

  const orders = await fetchAdminOrders(100);
  const active = orders.filter((o) => !["DELIVERED", "CANCELLED"].includes(o.status));
  const pending = active.filter((o) => o.status === "NEW" || o.status === "CONFIRMED").length;
  const preparing = active.filter((o) => o.status === "PREPARING").length;
  const ready = active.filter(
    (o) => o.status === "READY" || o.status === "OUT_FOR_DELIVERY"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-brand-cream">Mode cuisine</h1>
          <p className="text-brand-cream/50">
            Kanban tablette · refresh 10 s · plein écran · timer d&apos;attente
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Kpi label="File" value={String(pending)} />
          <Kpi label="En prep" value={String(preparing)} accent />
          <Kpi label="Prêtes" value={String(ready)} />
        </div>
      </div>
      <KitchenBoard tier={tier} initialOrders={orders} />
    </div>
  );
}

function Kpi({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-xl border px-4 py-2 text-center ${
        accent
          ? "border-brand-orange/40 bg-brand-orange/10"
          : "border-white/10 bg-brand-anthracite"
      }`}
    >
      <p className="text-[10px] font-bold uppercase tracking-wider text-brand-cream/40">
        {label}
      </p>
      <p
        className={`font-display text-2xl ${
          accent ? "text-brand-orange" : "text-brand-cream"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
