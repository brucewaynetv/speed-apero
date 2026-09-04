import { notFound } from "next/navigation";
import { Award, Star } from "lucide-react";
import { parseAdminTier, canAccessAdminFeature } from "@/lib/admin/features";
import { UpgradePlaceholder } from "@/components/admin/upgrade-placeholder";
import { DEMO_LOYALTY_CUSTOMERS } from "@/lib/admin/demo-ops";
import { LOYALTY_TIERS } from "@/lib/demo/account-demo";
import { cn } from "@/lib/utils";
import { isClientEdition } from "@/lib/product/edition";

interface PageProps {
  params: Promise<{ tier: string }>;
}

export default async function FidelitePage({ params }: PageProps) {
  const { tier: tierParam } = await params;
  const tier = parseAdminTier(tierParam);
  if (!tier) notFound();

  if (!canAccessAdminFeature(tier, "loyalty")) {
    if (isClientEdition()) notFound();
    return <UpgradePlaceholder tier={tier} feature="Fidélité" requiredTier="premium" />;
  }

  const totalPoints = DEMO_LOYALTY_CUSTOMERS.reduce((s, c) => s + c.points, 0);
  const goldMembers = DEMO_LOYALTY_CUSTOMERS.filter((c) => c.tier === "Or").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-4xl text-brand-cream">Fidélité</h1>
        <p className="text-brand-cream/50">
          Programme Premium — paliers, points et clients engagés
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-brand-gold/25 bg-brand-gold/5 p-5">
          <p className="text-xs uppercase tracking-wide text-brand-cream/40">Membres</p>
          <p className="mt-1 font-display text-3xl text-brand-gold">
            {DEMO_LOYALTY_CUSTOMERS.length}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-brand-anthracite p-5">
          <p className="text-xs uppercase tracking-wide text-brand-cream/40">Points en circulation</p>
          <p className="mt-1 font-display text-3xl text-brand-cream">{totalPoints}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-brand-anthracite p-5">
          <p className="text-xs uppercase tracking-wide text-brand-cream/40">Membres Or</p>
          <p className="mt-1 font-display text-3xl text-brand-cream">{goldMembers}</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {LOYALTY_TIERS.map((t) => (
          <div
            key={t.name}
            className="rounded-2xl border border-brand-gold/20 bg-brand-anthracite p-4"
          >
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-brand-gold" />
              <p className="font-semibold text-brand-cream">{t.name}</p>
            </div>
            <p className="mt-1 text-xs text-brand-cream/40">dès {t.minPoints} pts</p>
            <ul className="mt-3 space-y-1">
              {t.perks.map((p) => (
                <li key={p} className="text-xs text-brand-cream/60">
                  · {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-brand-anthracite text-left text-xs uppercase tracking-wider text-brand-cream/40">
            <tr>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Palier</th>
              <th className="px-4 py-3">Points</th>
              <th className="px-4 py-3">Commandes</th>
            </tr>
          </thead>
          <tbody>
            {DEMO_LOYALTY_CUSTOMERS.map((c) => (
              <tr key={c.email} className="border-t border-white/5">
                <td className="px-4 py-3">
                  <p className="font-medium text-brand-cream">{c.name}</p>
                  <p className="text-xs text-brand-cream/40">{c.email}</p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold",
                      c.tier === "Or"
                        ? "border-brand-gold/40 text-brand-gold"
                        : c.tier === "Argent"
                          ? "border-white/20 text-brand-cream/80"
                          : "border-white/10 text-brand-cream/50"
                    )}
                  >
                    <Star className="h-3 w-3" />
                    {c.tier}
                  </span>
                </td>
                <td className="px-4 py-3 font-display text-lg text-brand-orange">{c.points}</td>
                <td className="px-4 py-3 text-brand-cream/60">{c.orders}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
