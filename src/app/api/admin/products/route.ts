import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createSupabaseAdmin } from "@/lib/db/supabase";
import { fetchProducts, slugExists } from "@/lib/products/queries";
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
    const now = new Date().toISOString();
    const id = uuidv4();

    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("Product")
      .insert({
        id,
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
        updatedAt: now,
      })
      .select("*, category:Category(id, name, slug, emoji, sortOrder)")
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Product create error:", error);
    return NextResponse.json({ error: "Erreur création produit" }, { status: 500 });
  }
}
