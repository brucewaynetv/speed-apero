import { fetchAdminOrders } from "@/lib/orders/queries";
import { OrdersList } from "@/components/admin/orders-list";

export default async function AdminOrdersPage() {
  const orders = await fetchAdminOrders(50);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl text-brand-cream">Commandes</h1>
        <p className="text-brand-cream/50">Historique et suivi en temps réel</p>
      </div>
      <OrdersList initialOrders={orders} />
    </div>
  );
}
