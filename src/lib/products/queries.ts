import { createSupabaseAdmin } from "@/lib/db/supabase";
import type { ProductImageRecord } from "@/lib/products/images";

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  emoji: string | null;
  sortOrder: number;
}

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceCents: number;
  categoryId: string;
  allergens: string | null;
  badge: string | null;
  isPopular: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  category?: AdminCategory | null;
  images?: ProductImageRecord[];
}

const PRODUCT_SELECT_WITH_IMAGES =
  "*, category:Category(id, name, slug, emoji, sortOrder), images:ProductImage(id, productId, url, alt, sortOrder)";
const PRODUCT_SELECT_BASIC =
  "*, category:Category(id, name, slug, emoji, sortOrder)";

export async function fetchCategories(): Promise<AdminCategory[]> {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("Category")
    .select("id, name, slug, emoji, sortOrder")
    .eq("isActive", true)
    .order("sortOrder", { ascending: true });

  if (error) throw error;
  return (data ?? []) as AdminCategory[];
}

export async function fetchProducts(): Promise<AdminProduct[]> {
  const supabase = createSupabaseAdmin();

  const withImages = await supabase
    .from("Product")
    .select(PRODUCT_SELECT_WITH_IMAGES)
    .order("sortOrder", { ascending: true });

  if (!withImages.error) {
    return (withImages.data ?? []) as AdminProduct[];
  }

  console.warn("ProductImage join failed, fallback:", withImages.error.message);

  const fallback = await supabase
    .from("Product")
    .select(PRODUCT_SELECT_BASIC)
    .order("sortOrder", { ascending: true });

  if (fallback.error) throw fallback.error;
  return ((fallback.data ?? []) as AdminProduct[]).map((p) => ({
    ...p,
    images: [],
  }));
}

export async function fetchProduct(id: string): Promise<AdminProduct | null> {
  const supabase = createSupabaseAdmin();

  const withImages = await supabase
    .from("Product")
    .select(PRODUCT_SELECT_WITH_IMAGES)
    .eq("id", id)
    .maybeSingle();

  if (!withImages.error) {
    return withImages.data as AdminProduct | null;
  }

  const fallback = await supabase
    .from("Product")
    .select(PRODUCT_SELECT_BASIC)
    .eq("id", id)
    .maybeSingle();

  if (fallback.error) throw fallback.error;
  if (!fallback.data) return null;
  return { ...(fallback.data as AdminProduct), images: [] };
}

export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const supabase = createSupabaseAdmin();
  let query = supabase.from("Product").select("id").eq("slug", slug);
  if (excludeId) query = query.neq("id", excludeId);
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return !!data;
}
