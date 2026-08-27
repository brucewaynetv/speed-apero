import { fetchAdminOrders } from "@/lib/orders/queries";
import { KitchenBoard } from "@/components/admin/kitchen-board";

export default async function KitchenPage() {
  const orders = await fetchAdminOrders(100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl text-brand-cream">Mode cuisine</h1>
        <p className="text-brand-cream/50">
          Vue kanban · mise à jour automatique toutes les 10 secondes
        </p>
      </div>
      <KitchenBoard initialOrders={orders} />
    </div>
  );
}
