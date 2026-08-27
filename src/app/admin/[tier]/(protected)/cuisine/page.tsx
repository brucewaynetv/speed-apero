import { notFound } from "next/navigation";
import { parseAdminTier, canAccessAdminFeature } from "@/lib/admin/features";
import { fetchAdminOrders } from "@/lib/orders/queries";
import { KitchenBoard } from "@/components/admin/kitchen-board";
import { UpgradePlaceholder } from "@/components/admin/upgrade-placeholder";

interface PageProps {
  params: Promise<{ tier: string }>;
}

export default async function TierKitchenPage({ params }: PageProps) {
  const { tier: tierParam } = await params;
  const tier = parseAdminTier(tierParam);
  if (!tier) notFound();

  if (!canAccessAdminFeature(tier, "kitchenMode")) {
    return (
      <UpgradePlaceholder tier={tier} feature="Mode cuisine" requiredTier="pro" />
    );
  }

  const orders = await fetchAdminOrders(100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl text-brand-cream">Mode cuisine</h1>
        <p className="text-brand-cream/50">
          Vue kanban · mise à jour automatique toutes les 10 secondes
        </p>
      </div>
      <KitchenBoard tier={tier} initialOrders={orders} />
    </div>
  );
}
