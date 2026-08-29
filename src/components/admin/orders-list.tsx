"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { OrderStatusActions } from "@/components/admin/order-status-actions";
import { formatMoney } from "@/lib/pricing/money";
import type { DemoTier } from "@/lib/demo/tiers";
import { getAdminBasePath } from "@/lib/admin/features";
import type { AdminOrder } from "@/lib/orders/types";
import { cn } from "@/lib/utils";

interface OrdersListProps {
  tier: DemoTier;
  initialOrders: AdminOrder[];
  pollInterval?: number;
}

type FilterTab = "active" | "all" | "delivered" | "cancelled";
type TypeFilter = "all" | "DELIVERY" | "PICKUP";

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
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<FilterTab>("active");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      if (tab === "active" && ["DELIVERED", "CANCELLED"].includes(o.status)) return false;
      if (tab === "delivered" && o.status !== "DELIVERED") return false;
      if (tab === "cancelled" && o.status !== "CANCELLED") return false;
      if (typeFilter !== "all" && o.type !== typeFilter) return false;
      if (!q) return true;
      const hay = [
        String(o.orderNumber),
        o.customerFirstName,
        o.customerLastName,
        o.customerPhone,
        o.customerEmail ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [orders, query, tab, typeFilter]);

  const activeCount = orders.filter(
    (o) => !["DELIVERED", "CANCELLED"].includes(o.status)
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-brand-cream/60">
          {activeCount} active{activeCount !== 1 ? "s" : ""} · {filtered.length} affichée
          {filtered.length !== 1 ? "s" : ""}
        </p>
        <Button variant="ghost" size="sm" onClick={refresh} disabled={refreshing}>
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Actualiser
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-cream/35" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="N°, client, téléphone…"
            className="w-full rounded-xl border border-white/10 bg-brand-black/50 py-2.5 pl-10 pr-3 text-sm text-brand-cream placeholder:text-brand-cream/30 focus:border-brand-orange/40 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(
            [
              ["active", "Actives"],
              ["all", "Toutes"],
              ["delivered", "Livrées"],
              ["cancelled", "Annulées"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold",
                tab === id
                  ? "border-brand-orange/50 bg-brand-orange/15 text-brand-orange"
                  : "border-white/10 text-brand-cream/50 hover:text-brand-cream"
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
          className="rounded-xl border border-white/10 bg-brand-black/50 px-3 py-2 text-xs text-brand-cream/80"
        >
          <option value="all">Tous types</option>
          <option value="DELIVERY">Livraison</option>
          <option value="PICKUP">Retrait</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-brand-anthracite p-12 text-center">
          <p className="text-brand-cream/50">
            {orders.length === 0
              ? "Aucune commande pour le moment"
              : "Aucun résultat pour ces filtres"}
          </p>
          {orders.length === 0 && (
            <p className="mt-2 text-xs text-brand-cream/35">
              Passez une commande depuis le{" "}
              <Link href={`/demo/${tier}`} className="text-brand-orange hover:underline">
                storefront
              </Link>{" "}
              pour alimenter le flux.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => (
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
