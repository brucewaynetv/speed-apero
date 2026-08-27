import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { fetchCategories } from "@/lib/products/queries";

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const categories = await fetchCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Categories fetch error:", error);
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}
