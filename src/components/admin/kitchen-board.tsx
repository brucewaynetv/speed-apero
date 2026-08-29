"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Maximize2,
  Minimize2,
  RefreshCw,
  Store,
  Truck,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { OrderStatusActions } from "@/components/admin/order-status-actions";
import { formatMoney } from "@/lib/pricing/money";
import { KITCHEN_COLUMNS, type OrderStatus } from "@/lib/orders/status";
import type { DemoTier } from "@/lib/demo/tiers";
import { getAdminBasePath } from "@/lib/admin/features";
import type { AdminOrder } from "@/lib/orders/types";
import { cn } from "@/lib/utils";

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

function waitMinutes(iso: string) {
  return Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 60000));
}

export function KitchenBoard({ tier, initialOrders }: KitchenBoardProps) {
  const base = getAdminBasePath(tier);
  const rootRef = useRef<HTMLDivElement>(null);
  const [orders, setOrders] = useState(
    initialOrders.filter((o) => !["DELIVERED", "CANCELLED"].includes(o.status))
  );
  const [refreshing, setRefreshing] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [tick, setTick] = useState(0);
  const prevCount = useRef(orders.length);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/orders?limit=100");
      if (res.ok) {
        const data = (await res.json()) as AdminOrder[];
        const next = data.filter((o) => !["DELIVERED", "CANCELLED"].includes(o.status));
        if (soundOn && next.length > prevCount.current) {
          try {
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = 880;
            gain.gain.value = 0.05;
            osc.start();
            osc.stop(ctx.currentTime + 0.15);
          } catch {
            /* ignore */
          }
        }
        prevCount.current = next.length;
        setOrders(next);
      }
    } catch {
      /* ignore */
    }
  }, [soundOn]);

  useEffect(() => {
    const id = setInterval(fetchOrders, 10000);
    return () => clearInterval(id);
  }, [fetchOrders]);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    function onFsChange() {
      setFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  async function refresh() {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  }

  async function toggleFullscreen() {
    const el = rootRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      await el.requestFullscreen?.();
    } else {
      await document.exitFullscreen?.();
    }
  }

  void tick;

  return (
    <div
      ref={rootRef}
      className={cn(
        "space-y-4",
        fullscreen && "min-h-screen bg-brand-black p-4 sm:p-6"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-accent text-sm uppercase tracking-widest text-brand-cream/50">
          Mode cuisine · auto 10 s · tablette ready
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSoundOn((s) => !s)}
            title="Alerte sonore nouvelle commande"
          >
            {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            <span className="hidden sm:inline">{soundOn ? "Son on" : "Son off"}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={toggleFullscreen}>
            {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            <span className="hidden sm:inline">
              {fullscreen ? "Quitter" : "Plein écran"}
            </span>
          </Button>
          <Button variant="ghost" size="sm" onClick={refresh} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {KITCHEN_COLUMNS.map(({ key, label }) => {
          const columnOrders = orders.filter((o) =>
            key.includes(o.status as OrderStatus)
          );

          return (
            <section
              key={label}
              className="flex min-h-[420px] flex-col rounded-2xl border border-white/10 bg-brand-anthracite/50"
            >
              <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <h2
                  className={cn(
                    "font-accent font-bold uppercase tracking-wide text-brand-cream",
                    fullscreen ? "text-base" : "text-sm"
                  )}
                >
                  {label}
                </h2>
                <span className="rounded-full bg-brand-orange/20 px-2.5 py-0.5 text-xs font-bold text-brand-orange">
                  {columnOrders.length}
                </span>
              </header>

              <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-3">
                {columnOrders.length === 0 ? (
                  <p className="py-12 text-center text-sm text-brand-cream/25">
                    File vide
                  </p>
                ) : (
                  columnOrders.map((order) => {
                    const waited = waitMinutes(order.createdAt);
                    const urgent = waited >= 15;
                    return (
                      <div
                        key={order.id}
                        className={cn(
                          "rounded-xl border bg-brand-black p-3 shadow-lg",
                          urgent
                            ? "border-brand-red/50 ring-1 ring-brand-red/30"
                            : "border-white/10"
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p
                              className={cn(
                                "font-display leading-none text-brand-orange",
                                fullscreen ? "text-5xl" : "text-3xl"
                              )}
                            >
                              #{order.orderNumber}
                            </p>
                            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-brand-cream/50">
                              {formatTime(order.createdAt)}
                              <span>·</span>
                              {order.type === "DELIVERY" ? (
                                <span className="inline-flex items-center gap-1">
                                  <Truck className="h-3 w-3" /> Livraison
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1">
                                  <Store className="h-3 w-3" /> Retrait
                                </span>
                              )}
                            </p>
                          </div>
                          <div className="text-right">
                            <OrderStatusBadge status={order.status} />
                            <p
                              className={cn(
                                "mt-1 font-mono text-xs font-bold",
                                urgent ? "text-brand-red" : "text-brand-cream/40"
                              )}
                            >
                              {waited} min
                            </p>
                          </div>
                        </div>

                        <ul
                          className={cn(
                            "mt-3 space-y-1.5",
                            fullscreen ? "text-base" : "text-sm"
                          )}
                        >
                          {order.items?.map((item) => (
                            <li key={item.id} className="text-brand-cream">
                              <span className="font-bold text-brand-gold">
                                {item.quantity}×
                              </span>{" "}
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
                    );
                  })
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
