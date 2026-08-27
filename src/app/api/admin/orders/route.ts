import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { createSupabaseAdmin } from "@/lib/db/supabase";

export async function GET(request: Request) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = Math.min(Number(searchParams.get("limit") ?? 50), 100);

    const supabase = createSupabaseAdmin();
    let query = supabase
      .from("Order")
      .select("*, items:OrderItem(*, options:OrderItemOption(*))")
      .order("createdAt", { ascending: false })
      .limit(limit);

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json(data ?? []);
  } catch (error) {
    console.error("Admin orders fetch error:", error);
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}
