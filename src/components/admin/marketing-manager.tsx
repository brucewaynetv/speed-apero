"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DEMO_BANNERS } from "@/lib/admin/demo-ops";
import { cn } from "@/lib/utils";

interface Banner {
  id: string;
  title: string;
  message: string;
  bgColor: string;
  isActive: boolean;
}

interface MarketingManagerProps {
  initialBanners: Banner[];
}

export function MarketingManager({ initialBanners }: MarketingManagerProps) {
  const seed =
    initialBanners.length > 0
      ? initialBanners.map((b) => ({
          id: b.id,
          title: b.title,
          message: b.message,
          bgColor: b.bgColor || "#ff7300",
          isActive: Boolean(b.isActive),
        }))
      : DEMO_BANNERS;

  const [banners, setBanners] = useState(seed);
  const [editingId, setEditingId] = useState<string | null>(null);

  function toggle(id: string) {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b))
    );
    toast.success("Visibilité mise à jour (démo locale)");
  }

  function updateField(id: string, field: "title" | "message" | "bgColor", value: string) {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  }

  const active = banners.filter((b) => b.isActive);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-brand-orange/25 bg-brand-orange/5 p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-brand-orange">
          Aperçu storefront
        </p>
        <div className="mt-3 space-y-2">
          {active.length === 0 ? (
            <p className="text-sm text-brand-cream/40">Aucune bannière active</p>
          ) : (
            active.map((b) => (
              <div
                key={b.id}
                className="rounded-xl px-4 py-3 text-sm font-medium text-white"
                style={{ backgroundColor: b.bgColor }}
              >
                <span className="font-bold">{b.title}</span>
                <span className="opacity-90"> — {b.message}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {banners.map((banner) => {
          const editing = editingId === banner.id;
          return (
            <article
              key={banner.id}
              className={cn(
                "rounded-2xl border p-5",
                banner.isActive ? "border-white/15 bg-brand-anthracite" : "border-white/5 opacity-70"
              )}
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <span
                  className={cn(
                    "rounded px-2 py-0.5 text-xs font-bold",
                    banner.isActive
                      ? "bg-green-500/20 text-green-400"
                      : "bg-white/10 text-brand-cream/40"
                  )}
                >
                  {banner.isActive ? "Active" : "Inactive"}
                </span>
                <div
                  className="h-6 w-6 rounded-full border border-white/20"
                  style={{ backgroundColor: banner.bgColor }}
                />
              </div>

              {editing ? (
                <div className="space-y-2">
                  <input
                    value={banner.title}
                    onChange={(e) => updateField(banner.id, "title", e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-brand-black px-3 py-2 text-sm text-brand-cream"
                  />
                  <textarea
                    value={banner.message}
                    onChange={(e) => updateField(banner.id, "message", e.target.value)}
                    rows={2}
                    className="w-full rounded-lg border border-white/10 bg-brand-black px-3 py-2 text-sm text-brand-cream"
                  />
                  <label className="flex items-center gap-2 text-xs text-brand-cream/50">
                    Couleur
                    <input
                      type="color"
                      value={banner.bgColor}
                      onChange={(e) => updateField(banner.id, "bgColor", e.target.value)}
                      className="h-8 w-12 cursor-pointer rounded border-0 bg-transparent"
                    />
                  </label>
                </div>
              ) : (
                <>
                  <h2 className="font-semibold text-brand-cream">{banner.title}</h2>
                  <p className="mt-1 text-sm text-brand-cream/70">{banner.message}</p>
                </>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" variant="secondary" onClick={() => toggle(banner.id)}>
                  {banner.isActive ? "Désactiver" : "Activer"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (editing) {
                      setEditingId(null);
                      toast.success("Bannière enregistrée (démo)");
                    } else {
                      setEditingId(banner.id);
                    }
                  }}
                >
                  {editing ? "Enregistrer" : "Éditer"}
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
