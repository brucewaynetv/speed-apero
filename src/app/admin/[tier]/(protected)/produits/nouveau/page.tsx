import { notFound } from "next/navigation";
import { parseAdminTier, getAdminBasePath } from "@/lib/admin/features";
import { fetchCategories } from "@/lib/products/queries";
import { ProductForm } from "@/components/admin/product-form";

interface PageProps {
  params: Promise<{ tier: string }>;
}

export default async function NewProductPage({ params }: PageProps) {
  const { tier: tierParam } = await params;
  const tier = parseAdminTier(tierParam);
  if (!tier) notFound();

  const categories = await fetchCategories();
  if (categories.length === 0) {
    return (
      <p className="text-brand-cream/50">
        Aucune catégorie en base. Lancez le seed ou créez des catégories d&apos;abord.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl text-brand-cream">Nouveau produit</h1>
        <p className="text-brand-cream/50">
          <a href={`${getAdminBasePath(tier)}/produits`} className="text-brand-orange hover:underline">
            ← Retour à la liste
          </a>
        </p>
      </div>
      <ProductForm tier={tier} categories={categories} />
    </div>
  );
}
