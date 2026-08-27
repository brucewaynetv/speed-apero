"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { OrderStatusActions } from "@/components/admin/order-status-actions";
import { formatMoney } from "@/lib/pricing/money";
import type { DemoTier } from "@/lib/demo/tiers";
import { getAdminBasePath } from "@/lib/admin/features";
import type { AdminOrder } from "@/lib/orders/types";

interface OrdersListProps {
  tier: DemoTier;
  initialOrders: AdminOrder[];
  pollInterval?: number;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function OrdersList({ tier, initialOrders, pollInterval = 15000 }: OrdersListProps) {
  const base = getAdminBasePath(tier);
  const [orders, setOrders] = useState(initialOrders);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/orders?limit=50");
      if (res.ok) {
        const data = (await res.json()) as AdminOrder[];
        setOrders(data);
      }
    } catch {
      /* ignore poll errors */
    }
  }, []);

  useEffect(() => {
    const id = setInterval(fetchOrders, pollInterval);
    return () => clearInterval(id);
  }, [fetchOrders, pollInterval]);

  async function refresh() {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  }

  const active = orders.filter(
    (o) => !["DELIVERED", "CANCELLED"].includes(o.status)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-brand-cream/60">
          {active.length} commande{active.length !== 1 ? "s" : ""} active
        </p>
        <Button variant="ghost" size="sm" onClick={refresh} disabled={refreshing}>
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Actualiser
        </Button>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-brand-anthracite p-12 text-center">
          <p className="text-brand-cream/50">Aucune commande pour le moment</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-2xl border border-white/10 bg-brand-anthracite p-4 transition-colors hover:border-brand-orange/20"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`${base}/commandes/${order.id}`}
                      className="font-display text-2xl text-brand-orange hover:underline"
                    >
                      #{order.orderNumber}
                    </Link>
                    <OrderStatusBadge status={order.status} />
                    <span className="rounded bg-white/5 px-2 py-0.5 text-xs text-brand-cream/60">
                      {order.type === "DELIVERY" ? "Livraison" : "Retrait"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-brand-cream/80">
                    {order.customerFirstName} {order.customerLastName} · {order.customerPhone}
                  </p>
                  <p className="text-xs text-brand-cream/40">{formatTime(order.createdAt)}</p>
                </div>
                <p className="font-accent text-xl font-bold text-brand-gold">
                  {formatMoney(order.totalCents)}
                </p>
              </div>

              <ul className="mt-3 space-y-1 border-t border-white/5 pt-3 text-sm text-brand-cream/70">
                {order.items?.slice(0, 3).map((item) => (
                  <li key={item.id}>
                    {item.quantity}× {item.productName}
                  </li>
                ))}
                {(order.items?.length ?? 0) > 3 && (
                  <li className="text-brand-cream/40">
                    +{(order.items?.length ?? 0) - 3} autre(s)
                  </li>
                )}
              </ul>

              {!["DELIVERED", "CANCELLED"].includes(order.status) && (
                <div className="mt-3 border-t border-white/5 pt-3">
                  <OrderStatusActions
                    orderId={order.id}
                    currentStatus={order.status}
                    orderType={order.type}
                    compact
                    onUpdated={fetchOrders}
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
