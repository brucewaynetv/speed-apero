import { notFound } from "next/navigation";
import { parseAdminTier, getAdminBasePath } from "@/lib/admin/features";
import { fetchCategories, fetchProduct } from "@/lib/products/queries";
import { ProductForm } from "@/components/admin/product-form";

interface PageProps {
  params: Promise<{ tier: string; id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { tier: tierParam, id } = await params;
  const tier = parseAdminTier(tierParam);
  if (!tier) notFound();

  const [product, categories] = await Promise.all([fetchProduct(id), fetchCategories()]);
  if (!product) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-4xl text-brand-cream">Modifier — {product.name}</h1>
        <p className="text-brand-cream/50">
          <a href={`${getAdminBasePath(tier)}/produits`} className="text-brand-orange hover:underline">
            ← Retour à la liste
          </a>
        </p>
      </div>
      <ProductForm tier={tier} categories={categories} product={product} />
    </div>
  );
}
