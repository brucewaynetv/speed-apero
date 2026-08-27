"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Maximize2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { OrderStatusActions } from "@/components/admin/order-status-actions";
import { formatMoney } from "@/lib/pricing/money";
import { KITCHEN_COLUMNS, type OrderStatus } from "@/lib/orders/status";
import type { DemoTier } from "@/lib/demo/tiers";
import { getAdminBasePath } from "@/lib/admin/features";
import type { AdminOrder } from "@/lib/orders/types";

interface KitchenBoardProps {
  tier: DemoTier;
  initialOrders: AdminOrder[];
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function KitchenBoard({ tier, initialOrders }: KitchenBoardProps) {
  const base = getAdminBasePath(tier);
  const [orders, setOrders] = useState(
    initialOrders.filter((o) => !["DELIVERED", "CANCELLED"].includes(o.status))
  );
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/orders?limit=100");
      if (res.ok) {
        const data = (await res.json()) as AdminOrder[];
        setOrders(data.filter((o) => !["DELIVERED", "CANCELLED"].includes(o.status)));
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const id = setInterval(fetchOrders, 10000);
    return () => clearInterval(id);
  }, [fetchOrders]);

  async function refresh() {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-accent text-sm uppercase tracking-widest text-brand-cream/50">
          Rafraîchissement auto · 10 s
        </p>
        <Button variant="ghost" size="sm" onClick={refresh} disabled={refreshing}>
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {KITCHEN_COLUMNS.map(({ key, label }) => {
          const columnOrders = orders.filter((o) =>
            key.includes(o.status as OrderStatus)
          );

          return (
            <section
              key={label}
              className="flex min-h-[400px] flex-col rounded-2xl border border-white/10 bg-brand-anthracite/50"
            >
              <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <h2 className="font-accent text-sm font-bold uppercase tracking-wide text-brand-cream">
                  {label}
                </h2>
                <span className="rounded-full bg-brand-orange/20 px-2 py-0.5 text-xs font-bold text-brand-orange">
                  {columnOrders.length}
                </span>
              </header>

              <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-3">
                {columnOrders.length === 0 ? (
                  <p className="py-8 text-center text-xs text-brand-cream/30">—</p>
                ) : (
                  columnOrders.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-xl border border-white/10 bg-brand-black p-3 shadow-lg"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-display text-3xl leading-none text-brand-orange">
                            #{order.orderNumber}
                          </p>
                          <p className="mt-1 text-xs text-brand-cream/50">
                            {formatTime(order.createdAt)} ·{" "}
                            {order.type === "DELIVERY" ? "🛵" : "🏪"}
                          </p>
                        </div>
                        <OrderStatusBadge status={order.status} />
                      </div>

                      <ul className="mt-3 space-y-1.5 text-sm">
                        {order.items?.map((item) => (
                          <li key={item.id} className="text-brand-cream">
                            <span className="font-bold text-brand-gold">{item.quantity}×</span>{" "}
                            {item.productName}
                            {item.options?.length > 0 && (
                              <span className="block text-xs text-brand-cream/50">
                                {item.options.map((o) => o.optionName).join(", ")}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>

                      {order.deliveryInstructions && (
                        <p className="mt-2 rounded bg-brand-orange/10 px-2 py-1 text-xs text-brand-orange">
                          {order.deliveryInstructions}
                        </p>
                      )}

                      <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2">
                        <span className="text-sm font-bold text-brand-gold">
                          {formatMoney(order.totalCents)}
                        </span>
                        <Link href={`${base}/commandes/${order.id}`}>
                          <Maximize2 className="h-4 w-4 text-brand-cream/40 hover:text-brand-orange" />
                        </Link>
                      </div>

                      <div className="mt-2">
                        <OrderStatusActions
                          orderId={order.id}
                          currentStatus={order.status}
                          orderType={order.type}
                          compact
                          onUpdated={fetchOrders}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
