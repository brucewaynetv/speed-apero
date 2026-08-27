import { notFound } from "next/navigation";
import { parseAdminTier } from "@/lib/admin/features";
import { fetchProducts } from "@/lib/products/queries";
import { ProductsManager } from "@/components/admin/products-manager";

interface PageProps {
  params: Promise<{ tier: string }>;
}

export default async function TierProductsPage({ params }: PageProps) {
  const { tier: tierParam } = await params;
  const tier = parseAdminTier(tierParam);
  if (!tier) notFound();

  const products = await fetchProducts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl text-brand-cream">Produits</h1>
        <p className="text-brand-cream/50">Gérez votre carte — ajout, modification, désactivation</p>
      </div>
      <ProductsManager tier={tier} initialProducts={products} />
    </div>
  );
}
