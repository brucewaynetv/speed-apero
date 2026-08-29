"use client";

import { useMemo, useState } from "react";
import { MapPin, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useDemoTier } from "@/components/demo/demo-tier-provider";
import { PrepLabSection } from "@/components/storefront/prep-lab";

const STEPS = [
  { key: "received", label: "Reçue", desc: "Commande enregistrée" },
  { key: "preparing", label: "En cuisine", desc: "Préparation en cours" },
  { key: "ready", label: "Prête", desc: "Emballée et prête" },
  { key: "delivery", label: "En livraison", desc: "Livreur en route" },
  { key: "done", label: "Livrée", desc: "Bon appétit !" },
];

interface OrderTrackingProps {
  orderId: string;
  orderNumber?: number;
}

export function OrderTracking({ orderId, orderNumber }: OrderTrackingProps) {
  const { features, label } = useDemoTier();
  const [step, setStep] = useState(1);

  const visibleSteps = useMemo(() => {
    if (!features.drivers) {
      return STEPS.filter((s) => s.key !== "delivery");
    }
    return STEPS;
  }, [features.drivers]);

  if (!features.orderTracking) {
    return (
      <div className="rounded-2xl border border-white/10 bg-brand-anthracite p-8 text-center">
        <p className="text-brand-cream/60">
          Le suivi en direct est disponible en formule Premium.
        </p>
      </div>
    );
  }

  const preparing = visibleSteps[step]?.key === "preparing";

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-brand-orange/30 bg-brand-orange/5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Badge variant="orange">Suivi live · {label}</Badge>
            <h1 className="mt-2 font-display text-4xl text-brand-cream">
              Commande #{orderNumber ?? "—"}
            </h1>
            <p className="mt-1 text-sm text-brand-cream/50">Réf. {orderId.slice(0, 8)}…</p>
          </div>
          {features.drivers && (
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-brand-black/40 px-3 py-2 text-sm text-brand-cream/70">
              <Truck className="h-4 w-4 text-brand-orange" />
              Livreurs actifs
            </div>
          )}
        </div>

        {preparing && (
          <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#08080a] p-3">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-brand-orange">
              // kitchen_runtime · live prep
            </p>
            <PrepLabSection compact autoPlay />
          </div>
        )}

        <ol className="mt-8 space-y-3">
          {visibleSteps.map((s, i) => {
            const active = i <= step;
            const current = i === step;
            return (
              <li
                key={s.key}
                className={`flex items-start gap-3 rounded-xl border p-3 ${
                  current
                    ? "border-brand-orange/50 bg-brand-orange/10"
                    : active
                      ? "border-white/10 bg-brand-black/30"
                      : "border-white/5 opacity-40"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    active ? "bg-brand-orange text-white" : "bg-white/10 text-brand-cream/40"
                  }`}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-brand-cream">{s.label}</p>
                  <p className="text-xs text-brand-cream/50">{s.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>

        {step < visibleSteps.length - 1 && (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(s + 1, visibleSteps.length - 1))}
            className="mt-4 w-full rounded-lg border border-white/10 py-2 text-sm text-brand-cream/70 hover:border-brand-orange/40 hover:text-brand-orange"
          >
            Simuler l&apos;étape suivante (démo)
          </button>
        )}

        {features.drivers && step >= 3 && (
          <div className="mt-4 flex items-start gap-2 rounded-xl bg-brand-black/40 p-3 text-sm text-brand-cream/70">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
            Livreurs assigné · ETA ~12 min · zone Gard
          </div>
        )}
      </div>
    </div>
  );
}
