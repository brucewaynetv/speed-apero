import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { fetchProducts, fetchProduct, slugExists } from "@/lib/products/queries";
import { upsertProductImage } from "@/lib/products/images";
import { slugify, uniqueProductSlug } from "@/lib/products/slug";

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const products = await fetchProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Products fetch error:", error);
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const body = (await request.json()) as {
      name?: string;
      description?: string;
      priceCents?: number;
      categoryId?: string;
      allergens?: string;
      badge?: string;
      isPopular?: boolean;
      isActive?: boolean;
      imageUrl?: string;
    };

    if (!body.name?.trim() || !body.categoryId || body.priceCents == null) {
      return NextResponse.json(
        { error: "Nom, catégorie et prix requis" },
        { status: 400 }
      );
    }

    const baseSlug = slugify(body.name);
    if (!baseSlug) {
      return NextResponse.json({ error: "Nom invalide" }, { status: 400 });
    }

    const slug = await uniqueProductSlug(baseSlug, (s) => slugExists(s));

    const created = await prisma.product.create({
      data: {
        name: body.name.trim(),
        slug,
        description: body.description?.trim() || body.name.trim(),
        priceCents: Math.round(body.priceCents),
        categoryId: body.categoryId,
        allergens: body.allergens?.trim() || null,
        badge: body.badge?.trim() || null,
        isPopular: body.isPopular ?? false,
        isActive: body.isActive ?? true,
        sortOrder: 0,
      },
    });

    if (body.imageUrl?.trim()) {
      await upsertProductImage(created.id, body.imageUrl.trim(), body.name.trim());
    }

    const product = await fetchProduct(created.id);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Product create error:", error);
    return NextResponse.json({ error: "Erreur création produit" }, { status: 500 });
  }
}
