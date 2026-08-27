"use client";

import { useEffect, useState } from "react";
import { Gift, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoTier } from "@/components/demo/demo-tier-provider";

const STORAGE_KEY = "speed-apero-first-order-popup";

export function FirstOrderPopup() {
  const { features, label } = useDemoTier();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!features.firstOrderPopup) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(t);
  }, [features.firstOrderPopup]);

  function close() {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  if (!features.firstOrderPopup || !open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-brand-orange/40 bg-brand-anthracite p-6 shadow-2xl shadow-brand-orange/20">
        <button
          type="button"
          onClick={close}
          className="absolute right-3 top-3 rounded-lg p-1.5 text-brand-cream/50 hover:bg-white/5"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/20">
          <Gift className="h-6 w-6 text-brand-orange" />
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-brand-orange">
          Offre {label}
        </p>
        <h2 className="mt-1 font-display text-3xl text-brand-cream">
          -10 % sur votre 1ʳᵉ commande
        </h2>
        <p className="mt-2 text-sm text-brand-cream/60">
          Code <strong className="text-brand-gold">BIENVENUE10</strong> — disponible au checkout
          (formule Pro et Premium).
        </p>
        <Button className="mt-5 w-full" size="lg" onClick={close}>
          J&apos;en profite
        </Button>
      </div>
    </div>
  );
}
