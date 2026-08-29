"use client";

import { useMemo, useState } from "react";
import {
  MapPin,
  Navigation,
  Phone,
  Plus,
  Star,
  Truck,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEMO_DRIVERS, DEMO_PENDING_DELIVERIES } from "@/lib/admin/demo-ops";
import { cn } from "@/lib/utils";

type DriverStatus = "AVAILABLE" | "DELIVERING" | "OFFLINE";

interface DriverRow {
  id: string;
  name: string;
  phone: string;
  status: DriverStatus;
  zone?: string;
  deliveriesToday?: number;
  rating?: number;
  currentOrder?: string;
  eta?: string;
}

interface PendingDelivery {
  id: string;
  orderNumber: number;
  customer: string;
  address: string;
  zone: string;
  eta: string;
  totalLabel: string;
  ready: boolean;
  assignedTo?: string;
}

const STATUS_LABEL: Record<DriverStatus, string> = {
  AVAILABLE: "Disponible",
  DELIVERING: "En course",
  OFFLINE: "Hors ligne",
};

type Tab = "fleet" | "dispatch" | "map";

interface DriversBoardProps {
  initialDrivers: { id: string; name: string; phone: string; status: string }[];
}

export function DriversBoard({ initialDrivers }: DriversBoardProps) {
  const seed: DriverRow[] =
    initialDrivers.length > 0
      ? initialDrivers.map((d, i) => ({
          id: d.id,
          name: d.name,
          phone: d.phone,
          status: (["AVAILABLE", "DELIVERING", "OFFLINE"].includes(d.status)
            ? d.status
            : "OFFLINE") as DriverStatus,
          zone: DEMO_DRIVERS[i % DEMO_DRIVERS.length]?.zone,
          deliveriesToday: DEMO_DRIVERS[i % DEMO_DRIVERS.length]?.deliveriesToday ?? 0,
          rating: DEMO_DRIVERS[i % DEMO_DRIVERS.length]?.rating ?? 4.8,
          currentOrder: d.status === "DELIVERING" ? "#1042" : undefined,
          eta: d.status === "DELIVERING" ? "12 min" : undefined,
        }))
      : DEMO_DRIVERS;

  const [tab, setTab] = useState<Tab>("fleet");
  const [drivers, setDrivers] = useState(seed);
  const [queue, setQueue] = useState<PendingDelivery[]>(DEMO_PENDING_DELIVERIES);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const available = drivers.filter((d) => d.status === "AVAILABLE");
  const delivering = drivers.filter((d) => d.status === "DELIVERING");
  const pendingReady = queue.filter((q) => q.ready && !q.assignedTo);

  const mapPins = useMemo(
    () => [
      { id: "kitchen", label: "Cuisine", x: 48, y: 52, kind: "kitchen" as const },
      ...delivering.map((d, i) => ({
        id: d.id,
        label: d.name.split(" ")[0],
        x: 35 + i * 18,
        y: 30 + (i % 2) * 25,
        kind: "driver" as const,
        eta: d.eta,
      })),
      ...queue
        .filter((q) => !q.assignedTo)
        .slice(0, 3)
        .map((q, i) => ({
          id: q.id,
          label: `#${q.orderNumber}`,
          x: 55 + i * 12,
          y: 20 + i * 15,
          kind: "order" as const,
        })),
    ],
    [delivering, queue]
  );

  function cycleStatus(id: string) {
    setDrivers((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        const next: DriverStatus =
          d.status === "AVAILABLE"
            ? "DELIVERING"
            : d.status === "DELIVERING"
              ? "OFFLINE"
              : "AVAILABLE";
        return {
          ...d,
          status: next,
          currentOrder: next === "DELIVERING" ? d.currentOrder ?? "#1042" : undefined,
          eta: next === "DELIVERING" ? d.eta ?? "10 min" : undefined,
        };
      })
    );
    toast.success("Statut livreur mis à jour");
  }

  function assign(orderId: string, driverId: string) {
    const driver = drivers.find((d) => d.id === driverId);
    if (!driver || driver.status !== "AVAILABLE") {
      toast.error("Choisissez un livreur disponible");
      return;
    }
    const order = queue.find((q) => q.id === orderId);
    setQueue((prev) =>
      prev.map((q) => (q.id === orderId ? { ...q, assignedTo: driver.name } : q))
    );
    setDrivers((prev) =>
      prev.map((d) =>
        d.id === driverId
          ? {
              ...d,
              status: "DELIVERING",
              currentOrder: order ? `#${order.orderNumber}` : "#—",
              eta: order?.eta ?? "15 min",
              deliveriesToday: (d.deliveriesToday ?? 0) + 1,
            }
          : d
      )
    );
    toast.success(`Course #${order?.orderNumber} → ${driver.name}`);
  }

  function autoDispatch() {
    const free = drivers.filter((d) => d.status === "AVAILABLE");
    const ready = queue.filter((q) => q.ready && !q.assignedTo);
    if (free.length === 0 || ready.length === 0) {
      toast.message("Rien à dispatcher", {
        description: "Besoin d'un livreur dispo + une commande prête",
      });
      return;
    }
    assign(ready[0].id, free[0].id);
  }

  function addDriver() {
    if (!newName.trim() || !newPhone.trim()) {
      toast.error("Nom et téléphone requis");
      return;
    }
    setDrivers((prev) => [
      {
        id: `drv_${Date.now()}`,
        name: newName.trim(),
        phone: newPhone.trim(),
        status: "AVAILABLE",
        zone: "Centre · Nîmes",
        deliveriesToday: 0,
        rating: 5,
      },
      ...prev,
    ]);
    setNewName("");
    setNewPhone("");
    toast.success("Livreur ajouté");
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "fleet", label: "Flotte" },
    { id: "dispatch", label: "Dispatch" },
    { id: "map", label: "Carte live" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-4">
        <Metric label="Disponibles" value={String(available.length)} accent="green" />
        <Metric label="En course" value={String(delivering.length)} accent="orange" />
        <Metric label="À dispatcher" value={String(pendingReady.length)} />
        <Metric label="Équipe" value={String(drivers.length)} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav className="flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold",
                tab === t.id
                  ? "border-brand-gold/50 bg-brand-gold/15 text-brand-gold"
                  : "border-white/10 text-brand-cream/50 hover:text-brand-cream"
              )}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <Button size="sm" variant="gold" onClick={autoDispatch}>
          <Navigation className="h-3.5 w-3.5" />
          Auto-dispatch
        </Button>
      </div>

      {tab === "fleet" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-brand-anthracite/60 p-4">
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-cream/40">
              <UserPlus className="h-3.5 w-3.5" />
              Ajouter un livreur
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nom"
                className="flex-1 rounded-xl border border-white/10 bg-brand-black/50 px-3 py-2 text-sm text-brand-cream"
              />
              <input
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="Téléphone"
                className="flex-1 rounded-xl border border-white/10 bg-brand-black/50 px-3 py-2 text-sm text-brand-cream"
              />
              <Button onClick={addDriver}>
                <Plus className="h-4 w-4" />
                Ajouter
              </Button>
            </div>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {drivers.map((driver) => (
              <li
                key={driver.id}
                className={cn(
                  "rounded-2xl border bg-brand-anthracite p-5",
                  driver.status === "AVAILABLE" && "border-green-500/25",
                  driver.status === "DELIVERING" && "border-brand-orange/30",
                  driver.status === "OFFLINE" && "border-white/10 opacity-70"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5">
                      <Truck className="h-5 w-5 text-brand-cream/60" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-cream">{driver.name}</p>
                      <p className="flex items-center gap-1 text-sm text-brand-cream/55">
                        <Phone className="h-3 w-3" />
                        {driver.phone}
                      </p>
                      {driver.zone && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-brand-cream/40">
                          <MapPin className="h-3 w-3" />
                          {driver.zone}
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant={
                      driver.status === "AVAILABLE"
                        ? "gold"
                        : driver.status === "DELIVERING"
                          ? "orange"
                          : "outline"
                    }
                  >
                    {STATUS_LABEL[driver.status]}
                  </Badge>
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-xs text-brand-cream/50">
                  <span>{driver.deliveriesToday ?? 0} courses aujourd&apos;hui</span>
                  {driver.rating != null && (
                    <span className="inline-flex items-center gap-0.5">
                      <Star className="h-3 w-3 text-brand-gold" />
                      {driver.rating}
                    </span>
                  )}
                </div>

                {driver.status === "DELIVERING" && driver.currentOrder && (
                  <div className="mt-3 rounded-xl border border-brand-orange/20 bg-brand-orange/5 px-3 py-2 text-sm">
                    <p className="font-medium text-brand-orange">
                      Course {driver.currentOrder}
                    </p>
                    <p className="text-xs text-brand-cream/50">ETA {driver.eta}</p>
                  </div>
                )}

                <Button
                  size="sm"
                  variant="secondary"
                  className="mt-4"
                  onClick={() => cycleStatus(driver.id)}
                >
                  Changer statut
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === "dispatch" && (
        <div className="space-y-3">
          <p className="text-sm text-brand-cream/50">
            Commandes prêtes à partir · assignez un livreur disponible
          </p>
          {queue.map((order) => (
            <div
              key={order.id}
              className={cn(
                "rounded-2xl border p-4",
                order.assignedTo
                  ? "border-green-500/25 bg-green-500/5"
                  : order.ready
                    ? "border-brand-orange/30 bg-brand-anthracite"
                    : "border-white/10 bg-brand-anthracite/50 opacity-70"
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display text-2xl text-brand-orange">
                      #{order.orderNumber}
                    </p>
                    <Badge variant={order.ready ? "gold" : "outline"}>
                      {order.ready ? "Prête" : "En cuisine"}
                    </Badge>
                    {order.assignedTo && (
                      <Badge variant="orange">→ {order.assignedTo}</Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-brand-cream/80">{order.customer}</p>
                  <p className="text-xs text-brand-cream/45">
                    {order.address} · {order.zone} · ETA {order.eta}
                  </p>
                </div>
                <p className="font-accent font-bold text-brand-gold">{order.totalLabel}</p>
              </div>

              {!order.assignedTo && order.ready && (
                <div className="mt-3 flex flex-wrap gap-2 border-t border-white/5 pt-3">
                  {available.length === 0 ? (
                    <p className="text-xs text-brand-cream/40">Aucun livreur disponible</p>
                  ) : (
                    available.map((d) => (
                      <Button
                        key={d.id}
                        size="sm"
                        variant="secondary"
                        onClick={() => assign(order.id, d.id)}
                      >
                        Assigner {d.name.split(" ")[0]}
                      </Button>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "map" && (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-brand-anthracite">
          <div className="relative aspect-[16/9] w-full bg-[#0d1117]">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,115,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,115,0,0.08) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,115,0,0.12),transparent_60%)]" />

            {mapPins.map((pin) => (
              <div
                key={pin.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              >
                <div
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[10px] font-bold shadow-lg",
                    pin.kind === "kitchen" && "bg-brand-gold text-brand-black",
                    pin.kind === "driver" && "bg-brand-orange text-white",
                    pin.kind === "order" && "bg-white/90 text-brand-black"
                  )}
                >
                  {pin.label}
                  {"eta" in pin && pin.eta ? ` · ${pin.eta}` : ""}
                </div>
                <div
                  className={cn(
                    "mx-auto mt-1 h-2 w-2 rounded-full",
                    pin.kind === "kitchen" && "bg-brand-gold",
                    pin.kind === "driver" && "bg-brand-orange animate-pulse",
                    pin.kind === "order" && "bg-white"
                  )}
                />
              </div>
            ))}

            <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 text-[10px] text-brand-cream/60">
              <span className="rounded bg-black/50 px-2 py-1">● Cuisine</span>
              <span className="rounded bg-black/50 px-2 py-1">● Livreur</span>
              <span className="rounded bg-black/50 px-2 py-1">● Commande</span>
            </div>
          </div>
          <p className="border-t border-white/5 px-4 py-3 text-xs text-brand-cream/40">
            Carte indicative démo Premium — positions simulées autour de la dark kitchen.
          </p>
        </div>
      )}
    </div>
  );
}

function Metric({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "green" | "orange";
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4",
        accent === "green" && "border-green-500/25 bg-green-500/5",
        accent === "orange" && "border-brand-orange/25 bg-brand-orange/5",
        !accent && "border-white/10 bg-brand-anthracite"
      )}
    >
      <p className="text-xs uppercase tracking-wide text-brand-cream/40">{label}</p>
      <p className="mt-1 font-display text-3xl text-brand-cream">{value}</p>
    </div>
  );
}
