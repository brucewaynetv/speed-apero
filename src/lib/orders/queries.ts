import { prisma } from "@/lib/db/prisma";
import type { AdminOrder } from "@/lib/orders/types";

function mapOrder(order: {
  id: string;
  orderNumber: number;
  status: string;
  type: string;
  paymentMethod: string;
  paymentStatus: string;
  subtotalCents: number;
  deliveryFeeCents: number;
  discountCents: number;
  totalCents: number;
  customerFirstName: string;
  customerLastName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryStreet: string | null;
  deliveryComplement: string | null;
  deliveryPostalCode: string | null;
  deliveryCity: string | null;
  deliveryInstructions: string | null;
  createdAt: Date;
  updatedAt: Date;
  items: {
    id: string;
    productName: string;
    quantity: number;
    unitPriceCents: number;
    totalCents: number;
    options: {
      id: string;
      groupName: string;
      optionName: string;
      priceCents: number;
    }[];
  }[];
}): AdminOrder {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    type: order.type as AdminOrder["type"],
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    subtotalCents: order.subtotalCents,
    deliveryFeeCents: order.deliveryFeeCents,
    discountCents: order.discountCents,
    totalCents: order.totalCents,
    customerFirstName: order.customerFirstName,
    customerLastName: order.customerLastName,
    customerPhone: order.customerPhone,
    customerEmail: order.customerEmail,
    deliveryStreet: order.deliveryStreet,
    deliveryComplement: order.deliveryComplement,
    deliveryPostalCode: order.deliveryPostalCode,
    deliveryCity: order.deliveryCity,
    deliveryInstructions: order.deliveryInstructions,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
    items: order.items.map((item) => ({
      id: item.id,
      productName: item.productName,
      quantity: item.quantity,
      unitPriceCents: item.unitPriceCents,
      totalCents: item.totalCents,
      options: item.options.map((o) => ({
        id: o.id,
        groupName: o.groupName,
        optionName: o.optionName,
        priceCents: o.priceCents,
      })),
    })),
  };
}

const orderInclude = {
  items: {
    include: { options: true },
    orderBy: { createdAt: "asc" as const },
  },
};

export async function fetchAdminOrders(limit = 50): Promise<AdminOrder[]> {
  try {
    const orders = await prisma.order.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      include: orderInclude,
    });
    return orders.map(mapOrder);
  } catch (e) {
    console.error("[fetchAdminOrders]", e);
    return [];
  }
}

export async function fetchAdminOrder(id: string): Promise<AdminOrder | null> {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: orderInclude,
    });
    return order ? mapOrder(order) : null;
  } catch (e) {
    console.error("[fetchAdminOrder]", e);
    return null;
  }
}

export async function countActiveOrders(): Promise<number> {
  try {
    return await prisma.order.count({
      where: {
        status: {
          in: ["NEW", "CONFIRMED", "PREPARING", "READY", "OUT_FOR_DELIVERY"],
        },
      },
    });
  } catch (e) {
    console.error("[countActiveOrders]", e);
    return 0;
  }
}

export async function countTodayOrders(): Promise<number> {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return await prisma.order.count({
      where: { createdAt: { gte: start } },
    });
  } catch (e) {
    console.error("[countTodayOrders]", e);
    return 0;
  }
}

export async function sumTodayRevenue(): Promise<number> {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const rows = await prisma.order.findMany({
      where: {
        createdAt: { gte: start },
        status: { not: "CANCELLED" },
      },
      select: { totalCents: true },
    });
    return rows.reduce((sum, o) => sum + o.totalCents, 0);
  } catch (e) {
    console.error("[sumTodayRevenue]", e);
    return 0;
  }
}
