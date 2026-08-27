import { notFound } from "next/navigation";
import { parseAdminTier, canAccessAdminFeature } from "@/lib/admin/features";
import { UpgradePlaceholder } from "@/components/admin/upgrade-placeholder";
import { createSupabaseAdmin } from "@/lib/db/supabase";

interface PageProps {
  params: Promise<{ tier: string }>;
}

export default async function MarketingPage({ params }: PageProps) {
  const { tier: tierParam } = await params;
  const tier = parseAdminTier(tierParam);
  if (!tier) notFound();

  if (!canAccessAdminFeature(tier, "marketingBanners")) {
    return <UpgradePlaceholder tier={tier} feature="Marketing" requiredTier="pro" />;
  }

  const supabase = createSupabaseAdmin();
  const { data: banners } = await supabase
    .from("MarketingBanner")
    .select("*")
    .order("sortOrder", { ascending: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl text-brand-cream">Marketing</h1>
        <p className="text-brand-cream/50">Bannières et messages promotionnels sur le site</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {(banners ?? []).map((banner) => (
          <article
            key={banner.id}
            className="rounded-2xl border border-white/10 p-5"
            style={{ backgroundColor: `${banner.bgColor}15` }}
          >
            <h2 className="font-semibold text-brand-cream">{banner.title}</h2>
            <p className="mt-1 text-sm text-brand-cream/70">{banner.message}</p>
            <span
              className={`mt-3 inline-block rounded px-2 py-0.5 text-xs font-bold ${
                banner.isActive ? "bg-green-500/20 text-green-400" : "bg-white/10 text-brand-cream/40"
              }`}
            >
              {banner.isActive ? "Active" : "Inactive"}
            </span>
          </article>
        ))}
      </div>
      <p className="text-xs text-brand-cream/30">
        Édition complète des bannières — prochaine itération
      </p>
    </div>
  );
}
