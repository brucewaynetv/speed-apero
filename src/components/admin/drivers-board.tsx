"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEMO_DRIVERS } from "@/lib/admin/demo-ops";
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

const STATUS_LABEL: Record<DriverStatus, string> = {
  AVAILABLE: "Disponible",
  DELIVERING: "En course",
  OFFLINE: "Hors ligne",
};

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

  const [drivers, setDrivers] = useState(seed);

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
    toast.success("Statut livreur mis à jour (démo)");
  }

  const available = drivers.filter((d) => d.status === "AVAILABLE").length;
  const delivering = drivers.filter((d) => d.status === "DELIVERING").length;

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <Metric label="Disponibles" value={String(available)} />
        <Metric label="En course" value={String(delivering)} />
        <Metric label="Équipe" value={String(drivers.length)} />
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
              <div>
                <p className="font-semibold text-brand-cream">{driver.name}</p>
                <p className="text-sm text-brand-cream/55">{driver.phone}</p>
                {driver.zone && (
                  <p className="mt-1 text-xs text-brand-cream/40">Zone · {driver.zone}</p>
                )}
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
              {driver.rating != null && <span>★ {driver.rating}</span>}
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
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-brand-anthracite p-4">
      <p className="text-xs uppercase tracking-wide text-brand-cream/40">{label}</p>
      <p className="mt-1 font-display text-3xl text-brand-cream">{value}</p>
    </div>
  );
}
