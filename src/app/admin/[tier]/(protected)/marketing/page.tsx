import { notFound } from "next/navigation";
import { parseAdminTier, canAccessAdminFeature } from "@/lib/admin/features";
import { UpgradePlaceholder } from "@/components/admin/upgrade-placeholder";
import { MarketingManager } from "@/components/admin/marketing-manager";
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

  let banners: {
    id: string;
    title: string;
    message: string;
    bgColor: string;
    isActive: boolean;
  }[] = [];

  try {
    const supabase = createSupabaseAdmin();
    const { data } = await supabase
      .from("MarketingBanner")
      .select("*")
      .order("sortOrder", { ascending: true });
    banners = (data ?? []).map((b) => ({
      id: String(b.id),
      title: String(b.title ?? ""),
      message: String(b.message ?? ""),
      bgColor: String(b.bgColor ?? "#ff7300"),
      isActive: Boolean(b.isActive),
    }));
  } catch {
    banners = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl text-brand-cream">Marketing</h1>
        <p className="text-brand-cream/50">
          Bannières, codes promo, popup 1ʳᵉ commande et campagnes
        </p>
      </div>
      <MarketingManager initialBanners={banners} />
    </div>
  );
}
