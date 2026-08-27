import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Mail } from "lucide-react";
import { fetchAdminOrder } from "@/lib/orders/queries";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { OrderStatusActions } from "@/components/admin/order-status-actions";
import { formatMoney } from "@/lib/pricing/money";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminOrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  const order = await fetchAdminOrder(id);
  if (!order) notFound();

  const created = new Date(order.createdAt).toLocaleString("fr-FR");

  return (
    <div className="space-y-6">
      <Link
        href="/admin/commandes"
        className="inline-flex items-center gap-2 text-sm text-brand-cream/60 hover:text-brand-orange"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux commandes
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-5xl text-brand-orange">#{order.orderNumber}</h1>
            <OrderStatusBadge status={order.status} />
          </div>
          <p className="mt-1 text-brand-cream/50">{created}</p>
        </div>
        <p className="font-display text-4xl text-brand-gold">{formatMoney(order.totalCents)}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-brand-anthracite p-5">
          <h2 className="mb-3 font-accent text-sm font-bold uppercase tracking-wide text-brand-cream/50">
            Client
          </h2>
          <p className="text-lg font-semibold text-brand-cream">
            {order.customerFirstName} {order.customerLastName}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-brand-cream/70">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-orange" />
              {order.customerPhone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-orange" />
              {order.customerEmail}
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-white/10 bg-brand-anthracite p-5">
          <h2 className="mb-3 font-accent text-sm font-bold uppercase tracking-wide text-brand-cream/50">
            {order.type === "DELIVERY" ? "Livraison" : "Retrait sur place"}
          </h2>
          {order.type === "DELIVERY" && order.deliveryStreet ? (
            <div className="flex gap-2 text-sm text-brand-cream/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
              <div>
                <p>{order.deliveryStreet}</p>
                {order.deliveryComplement && <p>{order.deliveryComplement}</p>}
                <p>
                  {order.deliveryPostalCode} {order.deliveryCity}
                </p>
                {order.deliveryInstructions && (
                  <p className="mt-2 rounded bg-brand-orange/10 px-2 py-1 text-brand-orange">
                    {order.deliveryInstructions}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-brand-cream/70">Retrait en dark kitchen</p>
          )}
        </section>
      </div>

      <section className="rounded-2xl border border-white/10 bg-brand-anthracite p-5">
        <h2 className="mb-4 font-accent text-sm font-bold uppercase tracking-wide text-brand-cream/50">
          Articles
        </h2>
        <ul className="space-y-4">
          {order.items?.map((item) => (
            <li key={item.id} className="flex justify-between gap-4 border-b border-white/5 pb-4 last:border-0">
              <div>
                <p className="font-semibold text-brand-cream">
                  {item.quantity}× {item.productName}
                </p>
                {item.options?.length > 0 && (
                  <ul className="mt-1 text-sm text-brand-cream/50">
                    {item.options.map((opt) => (
                      <li key={opt.id}>
                        {opt.groupName}: {opt.optionName}
                        {opt.priceCents > 0 && ` (+${formatMoney(opt.priceCents)})`}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <p className="font-semibold text-brand-gold">{formatMoney(item.totalCents)}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-1 border-t border-white/10 pt-4 text-sm">
          <div className="flex justify-between text-brand-cream/60">
            <span>Sous-total</span>
            <span>{formatMoney(order.subtotalCents)}</span>
          </div>
          {order.deliveryFeeCents > 0 && (
            <div className="flex justify-between text-brand-cream/60">
              <span>Livraison</span>
              <span>{formatMoney(order.deliveryFeeCents)}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold text-brand-cream">
            <span>Total</span>
            <span>{formatMoney(order.totalCents)}</span>
          </div>
        </div>
      </section>

      {!["DELIVERED", "CANCELLED"].includes(order.status) && (
        <section className="rounded-2xl border border-brand-orange/20 bg-brand-orange/5 p-5">
          <h2 className="mb-3 font-accent text-sm font-bold uppercase tracking-wide text-brand-orange">
            Actions
          </h2>
          <OrderStatusActions
            orderId={order.id}
            currentStatus={order.status}
            orderType={order.type}
          />
        </section>
      )}
    </div>
  );
}
