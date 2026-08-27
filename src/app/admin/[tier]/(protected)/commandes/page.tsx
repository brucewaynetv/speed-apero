import { notFound } from "next/navigation";
import { parseAdminTier } from "@/lib/admin/features";
import { fetchAdminOrders } from "@/lib/orders/queries";
import { OrdersList } from "@/components/admin/orders-list";

interface PageProps {
  params: Promise<{ tier: string }>;
}

export default async function TierAdminOrdersPage({ params }: PageProps) {
  const { tier: tierParam } = await params;
  const tier = parseAdminTier(tierParam);
  if (!tier) notFound();

  const orders = await fetchAdminOrders(50);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl text-brand-cream">Commandes</h1>
        <p className="text-brand-cream/50">Historique et suivi en temps réel</p>
      </div>
      <OrdersList tier={tier} initialOrders={orders} />
    </div>
  );
}
