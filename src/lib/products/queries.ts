import { createSupabaseAdmin } from "@/lib/db/supabase";

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
}

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
  const { data, error } = await supabase
    .from("Product")
    .select("*, category:Category(id, name, slug, emoji, sortOrder)")
    .order("sortOrder", { ascending: true });

  if (error) throw error;
  return (data ?? []) as AdminProduct[];
}

export async function fetchProduct(id: string): Promise<AdminProduct | null> {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("Product")
    .select("*, category:Category(id, name, slug, emoji, sortOrder)")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data as AdminProduct | null;
}

export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const supabase = createSupabaseAdmin();
  let query = supabase.from("Product").select("id").eq("slug", slug);
  if (excludeId) query = query.neq("id", excludeId);
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return !!data;
}
