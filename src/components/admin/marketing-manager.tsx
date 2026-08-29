"use client";

import { useMemo, useState } from "react";
import {
  Copy,
  Megaphone,
  Plus,
  Tag,
  Bell,
  Mail,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DEMO_BANNERS,
  DEMO_CAMPAIGNS,
  DEMO_POPUP,
  DEMO_PROMOS,
} from "@/lib/admin/demo-ops";
import { cn } from "@/lib/utils";

interface Banner {
  id: string;
  title: string;
  message: string;
  bgColor: string;
  isActive: boolean;
  link?: string;
}

interface Promo {
  id: string;
  code: string;
  type: "PERCENT" | "FIXED" | "FREE_DELIVERY";
  value: number;
  usedCount: number;
  maxUses: number;
  isActive: boolean;
  label: string;
}

type Tab = "banners" | "promos" | "popup" | "campaigns";

interface MarketingManagerProps {
  initialBanners: Banner[];
}

export function MarketingManager({ initialBanners }: MarketingManagerProps) {
  const [tab, setTab] = useState<Tab>("banners");

  const seedBanners =
    initialBanners.length > 0
      ? initialBanners.map((b) => ({
          id: b.id,
          title: b.title,
          message: b.message,
          bgColor: b.bgColor || "#ff7300",
          isActive: Boolean(b.isActive),
          link: b.link,
        }))
      : DEMO_BANNERS;

  const [banners, setBanners] = useState(seedBanners);
  const [promos, setPromos] = useState<Promo[]>(DEMO_PROMOS);
  const [popup, setPopup] = useState(DEMO_POPUP);
  const [campaigns, setCampaigns] = useState(DEMO_CAMPAIGNS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newPromoCode, setNewPromoCode] = useState("");

  const activeBanners = banners.filter((b) => b.isActive);
  const activePromos = promos.filter((p) => p.isActive).length;

  const tabs: { id: Tab; label: string; icon: typeof Megaphone }[] = [
    { id: "banners", label: "Bannières", icon: Megaphone },
    { id: "promos", label: "Codes promo", icon: Tag },
    { id: "popup", label: "Popup 1ʳᵉ commande", icon: Bell },
    { id: "campaigns", label: "Campagnes", icon: Mail },
  ];

  const stats = useMemo(
    () => [
      { label: "Bannières actives", value: String(activeBanners.length) },
      { label: "Codes actifs", value: String(activePromos) },
      { label: "Popup", value: popup.enabled ? "ON" : "OFF" },
      {
        label: "Campagnes",
        value: String(campaigns.filter((c) => c.status === "active").length),
      },
    ],
    [activeBanners.length, activePromos, popup.enabled, campaigns]
  );

  function toggleBanner(id: string) {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isActive: !b.isActive } : b))
    );
    toast.success("Bannière mise à jour");
  }

  function updateBanner(
    id: string,
    field: "title" | "message" | "bgColor" | "link",
    value: string
  ) {
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  }

  function addBanner() {
    const id = `ban_${Date.now()}`;
    setBanners((prev) => [
      {
        id,
        title: "Nouvelle offre",
        message: "Décrivez votre promo ici",
        bgColor: "#ff7300",
        isActive: false,
        link: "",
      },
      ...prev,
    ]);
    setEditingId(id);
    toast.success("Bannière créée");
  }

  function removeBanner(id: string) {
    setBanners((prev) => prev.filter((b) => b.id !== id));
    toast.message("Bannière supprimée");
  }

  function togglePromo(id: string) {
    setPromos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
    toast.success("Code promo mis à jour");
  }

  function addPromo() {
    const code = newPromoCode.trim().toUpperCase() || `PROMO${promos.length + 1}`;
    if (promos.some((p) => p.code === code)) {
      toast.error("Ce code existe déjà");
      return;
    }
    setPromos((prev) => [
      {
        id: `promo_${Date.now()}`,
        code,
        type: "PERCENT",
        value: 10,
        usedCount: 0,
        maxUses: 100,
        isActive: true,
        label: `Code ${code}`,
      },
      ...prev,
    ]);
    setNewPromoCode("");
    toast.success(`Code ${code} créé`);
  }

  function promoTypeLabel(p: Promo) {
    switch (p.type) {
      case "PERCENT":
        return `−${p.value} %`;
      case "FIXED":
        return `−${(p.value / 100).toFixed(0)} €`;
      case "FREE_DELIVERY":
        return "Livraison 0 €";
      default: {
        const _e: never = p.type;
        return _e;
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-white/10 bg-brand-anthracite p-4"
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-brand-cream/40">
              {s.label}
            </p>
            <p className="mt-1 font-display text-2xl text-brand-orange">{s.value}</p>
          </div>
        ))}
      </div>

      <nav className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold",
                active
                  ? "border-brand-orange/50 bg-brand-orange/15 text-brand-orange"
                  : "border-white/10 text-brand-cream/50 hover:text-brand-cream"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          );
        })}
      </nav>

      {tab === "banners" && (
        <div className="space-y-5">
          <div className="rounded-2xl border border-brand-orange/25 bg-brand-orange/5 p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                Aperçu storefront
              </p>
              <Button size="sm" onClick={addBanner}>
                <Plus className="h-3.5 w-3.5" />
                Ajouter
              </Button>
            </div>
            <div className="mt-3 space-y-2">
              {activeBanners.length === 0 ? (
                <p className="text-sm text-brand-cream/40">Aucune bannière active</p>
              ) : (
                activeBanners.map((b) => (
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
                    banner.isActive
                      ? "border-white/15 bg-brand-anthracite"
                      : "border-white/5 opacity-70"
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
                        onChange={(e) => updateBanner(banner.id, "title", e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-brand-black px-3 py-2 text-sm text-brand-cream"
                        placeholder="Titre"
                      />
                      <textarea
                        value={banner.message}
                        onChange={(e) => updateBanner(banner.id, "message", e.target.value)}
                        rows={2}
                        className="w-full rounded-lg border border-white/10 bg-brand-black px-3 py-2 text-sm text-brand-cream"
                        placeholder="Message"
                      />
                      <input
                        value={banner.link ?? ""}
                        onChange={(e) => updateBanner(banner.id, "link", e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-brand-black px-3 py-2 text-sm text-brand-cream"
                        placeholder="Lien (optionnel)"
                      />
                      <label className="flex items-center gap-2 text-xs text-brand-cream/50">
                        Couleur
                        <input
                          type="color"
                          value={banner.bgColor}
                          onChange={(e) => updateBanner(banner.id, "bgColor", e.target.value)}
                          className="h-8 w-12 cursor-pointer rounded border-0 bg-transparent"
                        />
                      </label>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-semibold text-brand-cream">{banner.title}</h2>
                      <p className="mt-1 text-sm text-brand-cream/70">{banner.message}</p>
                      {banner.link && (
                        <p className="mt-1 truncate text-xs text-brand-cream/35">{banner.link}</p>
                      )}
                    </>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button size="sm" variant="secondary" onClick={() => toggleBanner(banner.id)}>
                      {banner.isActive ? "Désactiver" : "Activer"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (editing) {
                          setEditingId(null);
                          toast.success("Bannière enregistrée");
                        } else setEditingId(banner.id);
                      }}
                    >
                      {editing ? "Enregistrer" : "Éditer"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-brand-red/80"
                      onClick={() => removeBanner(banner.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {tab === "promos" && (
        <div className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={newPromoCode}
              onChange={(e) => setNewPromoCode(e.target.value)}
              placeholder="Nouveau code (ex. WEEKEND15)"
              className="flex-1 rounded-xl border border-white/10 bg-brand-black/50 px-4 py-2.5 font-mono text-sm uppercase text-brand-cream placeholder:normal-case placeholder:text-brand-cream/30"
            />
            <Button onClick={addPromo}>
              <Plus className="h-4 w-4" />
              Créer
            </Button>
          </div>

          <div className="space-y-3">
            {promos.map((promo) => {
              const usage = Math.min(100, Math.round((promo.usedCount / promo.maxUses) * 100));
              return (
                <div
                  key={promo.id}
                  className={cn(
                    "rounded-2xl border bg-brand-anthracite p-4",
                    promo.isActive ? "border-white/15" : "border-white/5 opacity-60"
                  )}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-mono text-lg font-bold text-brand-orange">
                          {promo.code}
                        </p>
                        <Badge variant={promo.isActive ? "gold" : "outline"}>
                          {promoTypeLabel(promo)}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-brand-cream/60">{promo.label}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          void navigator.clipboard?.writeText(promo.code);
                          toast.success("Code copié");
                        }}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="sm" variant="secondary" onClick={() => togglePromo(promo.id)}>
                        {promo.isActive ? "Pause" : "Activer"}
                      </Button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="mb-1 flex justify-between text-[10px] text-brand-cream/40">
                      <span>
                        {promo.usedCount} / {promo.maxUses} utilisations
                      </span>
                      <span>{usage}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-brand-orange"
                        style={{ width: `${usage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === "popup" && (
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-3 rounded-2xl border border-white/10 bg-brand-anthracite p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl text-brand-cream">Configuration</h2>
              <button
                type="button"
                role="switch"
                aria-checked={popup.enabled}
                onClick={() => {
                  setPopup((p) => ({ ...p, enabled: !p.enabled }));
                  toast.success(popup.enabled ? "Popup désactivée" : "Popup activée");
                }}
                className={cn(
                  "relative h-7 w-12 rounded-full transition-colors",
                  popup.enabled ? "bg-brand-orange" : "bg-white/15"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white transition-transform",
                    popup.enabled && "translate-x-5"
                  )}
                />
              </button>
            </div>
            {(
              [
                ["title", "Titre"],
                ["message", "Message"],
                ["cta", "Bouton"],
                ["code", "Code promo"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="block text-xs text-brand-cream/45">
                {label}
                <input
                  value={popup[key]}
                  onChange={(e) => setPopup((p) => ({ ...p, [key]: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-white/10 bg-brand-black px-3 py-2 text-sm text-brand-cream"
                />
              </label>
            ))}
            <Button
              className="w-full"
              onClick={() => toast.success("Popup enregistrée (démo)")}
            >
              Enregistrer
            </Button>
          </div>

          <div className="flex items-center justify-center rounded-2xl border border-dashed border-white/15 bg-brand-black/40 p-8">
            {popup.enabled ? (
              <div className="w-full max-w-sm rounded-2xl border border-brand-orange/40 bg-brand-anthracite p-6 shadow-2xl shadow-brand-orange/20">
                <p className="text-center font-display text-2xl text-brand-orange">
                  {popup.title}
                </p>
                <p className="mt-3 text-center text-sm text-brand-cream/70">{popup.message}</p>
                <p className="mt-4 text-center font-mono text-lg font-bold text-brand-gold">
                  {popup.code}
                </p>
                <Button className="mt-5 w-full">{popup.cta}</Button>
              </div>
            ) : (
              <p className="text-sm text-brand-cream/40">Popup désactivée</p>
            )}
          </div>
        </div>
      )}

      {tab === "campaigns" && (
        <div className="space-y-3">
          <p className="text-sm text-brand-cream/50">
            Relances automatiques — email, SMS, push (aperçu démo Pro+)
          </p>
          {campaigns.map((c) => (
            <div
              key={c.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-brand-anthracite p-4"
            >
              <div>
                <p className="font-semibold text-brand-cream">{c.name}</p>
                <p className="text-xs text-brand-cream/45">
                  {c.channel}
                  {c.sent > 0 && ` · ${c.sent} envoyés · ${c.openRate}% ouverture`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    c.status === "active"
                      ? "gold"
                      : c.status === "scheduled"
                        ? "orange"
                        : "outline"
                  }
                >
                  {c.status === "active"
                    ? "Active"
                    : c.status === "scheduled"
                      ? "Planifiée"
                      : "Brouillon"}
                </Badge>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setCampaigns((prev) =>
                      prev.map((x) =>
                        x.id === c.id
                          ? {
                              ...x,
                              status:
                                x.status === "active"
                                  ? "draft"
                                  : x.status === "draft"
                                    ? "scheduled"
                                    : "active",
                            }
                          : x
                      )
                    );
                    toast.success("Statut campagne mis à jour");
                  }}
                >
                  Changer
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
