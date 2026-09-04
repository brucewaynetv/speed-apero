import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { prisma } from "@/lib/db/prisma";
import { fetchAdminOrders } from "@/lib/orders/queries";
import type { OrderStatus } from "@/lib/orders/status";

export async function GET(request: Request) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as OrderStatus | null;
    const limit = Math.min(Number(searchParams.get("limit") ?? 50), 100);

    if (!status) {
      const data = await fetchAdminOrders(limit);
      return NextResponse.json(data);
    }

    const orders = await prisma.order.findMany({
      where: { status },
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: { options: true },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    return NextResponse.json(
      orders.map((o) => ({
        ...o,
        createdAt: o.createdAt.toISOString(),
        updatedAt: o.updatedAt.toISOString(),
      }))
    );
  } catch (error) {
    console.error("Admin orders fetch error:", error);
    return NextResponse.json({ error: "Erreur" }, { status: 500 });
  }
}
