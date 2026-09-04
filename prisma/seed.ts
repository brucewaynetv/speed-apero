import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  CATALOG_CATEGORIES,
  CATALOG_PRODUCTS,
  DELIVERY_ZONES,
  OPENING_HOURS,
} from "../src/lib/data/catalog";

const prisma = new PrismaClient();

const PRODUCT_IMAGES: Record<string, string> = {
  "smash-original": "https://images.unsplash.com/photo-1568901347635-c4030f17a265?w=600&q=80",
  "double-smash": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=80",
};

async function main() {
  console.log("🌱 Seeding Speed Apéro database...");

  await prisma.orderItemOption.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.productOptionValue.deleteMany();
  await prisma.productOptionGroup.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.deliveryZone.deleteMany();
  await prisma.openingHour.deleteMany();
  await prisma.promotionUsage.deleteMany();
  await prisma.promotion.deleteMany();
  await prisma.marketingBanner.deleteMany();
  await prisma.loyaltyTransaction.deleteMany();
  await prisma.customerLoyalty.deleteMany();
  await prisma.customerCredit.deleteMany();
  await prisma.customerProfile.deleteMany();
  await prisma.address.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.driver.deleteMany();
  await prisma.user.deleteMany();
  await prisma.restaurantSettings.deleteMany();

  await prisma.restaurantSettings.create({
    data: {
      name: "Speed Apéro",
      tagline: "Du fait maison. Du goût. Livré chez vous.",
      phone: "04 00 00 00 00",
      email: "contact@speedapero.fr",
      address: "Dark Kitchen, Gard, France",
    },
  });

  const categoryMap = new Map<string, string>();

  for (const cat of CATALOG_CATEGORIES) {
    if (cat.slug === "populaires") continue;
    const created = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        emoji: cat.emoji,
        sortOrder: cat.sortOrder,
      },
    });
    categoryMap.set(cat.slug, created.id);
  }

  for (const product of CATALOG_PRODUCTS) {
    const categoryId = categoryMap.get(product.categorySlug);
    if (!categoryId) continue;

    const created = await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        priceCents: product.priceCents,
        allergens: product.allergens,
        badge: product.badge,
        isPopular: product.isPopular ?? false,
        categoryId,
        images: {
          create: {
            url: PRODUCT_IMAGES[product.slug] ?? product.image ?? "/images/food/food-spread.jpg",
            alt: product.name,
          },
        },
        optionGroups: product.optionGroups
          ? {
              create: product.optionGroups.map((group, gi) => ({
                name: group.name,
                required: group.required,
                minSelect: group.minSelect,
                maxSelect: group.maxSelect,
                sortOrder: gi,
                values: {
                  create: group.options.map((opt, oi) => ({
                    name: opt.name,
                    priceCents: opt.priceCents,
                    isDefault: opt.isDefault ?? false,
                    sortOrder: oi,
                  })),
                },
              })),
            }
          : undefined,
      },
    });
    void created;
  }

  for (const zone of DELIVERY_ZONES) {
    await prisma.deliveryZone.create({
      data: {
        name: zone.name,
        postalCodes: zone.postalCodes,
        deliveryFeeCents: zone.deliveryFeeCents,
        minimumCents: zone.minimumCents,
        estimatedMinutes: zone.estimatedMinutes,
      },
    });
  }

  for (const hour of OPENING_HOURS) {
    await prisma.openingHour.create({ data: hour });
  }

  await prisma.promotion.createMany({
    data: [
      {
        code: "BIENVENUE10",
        type: "PERCENTAGE",
        value: 10,
        minOrderCents: 1500,
        maxUses: 100,
      },
      {
        code: "LIVRAISON0",
        type: "FREE_DELIVERY",
        value: 0,
        minOrderCents: 2000,
      },
    ],
  });

  await prisma.marketingBanner.createMany({
    data: [
      { title: "Livraison offerte ce soir", message: "Code LIVRAISON0 dès 20€", bgColor: "#FF7300", sortOrder: 0 },
      { title: "Menu Smash à 14,90 €", message: "Smash Original + Frites", bgColor: "#D71920", sortOrder: 1 },
      { title: "Nouveau dessert disponible", message: "Tiramisu Spéculoos maison", bgColor: "#F5B51B", sortOrder: 2 },
    ],
  });

  const passwordHash = await bcrypt.hash("demo2026", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@speedapero.demo",
      passwordHash,
      role: "ADMIN",
    },
  });

  const client = await prisma.user.create({
    data: {
      email: "client@speedapero.demo",
      passwordHash,
      role: "CUSTOMER",
      profile: {
        create: {
          firstName: "Jean",
          lastName: "Dupont",
          phone: "06 12 34 56 78",
        },
      },
      loyalty: {
        create: { points: 238 },
      },
      credits: {
        create: {
          amountCents: 1500,
          description: "Crédit fidélité",
        },
      },
    },
  });

  await prisma.driver.createMany({
    data: [
      { name: "Karim B.", phone: "06 11 22 33 44", status: "AVAILABLE" },
      { name: "Sophie M.", phone: "06 55 66 77 88", status: "DELIVERING" },
      { name: "Thomas L.", phone: "06 99 88 77 66", status: "OFFLINE" },
    ],
  });

  const products = await prisma.product.findMany({ take: 3 });

  if (products.length >= 2) {
    await prisma.order.create({
      data: {
        orderNumber: 1042,
        status: "PREPARING",
        type: "DELIVERY",
        paymentMethod: "CASH_ON_DELIVERY",
        paymentStatus: "PENDING",
        subtotalCents: 3180,
        deliveryFeeCents: 350,
        totalCents: 3530,
        customerFirstName: "Marie",
        customerLastName: "Martin",
        customerPhone: "06 98 76 54 32",
        customerEmail: "marie@example.com",
        deliveryStreet: "12 rue des Oliviers",
        deliveryPostalCode: "30200",
        deliveryCity: "Bagnols-sur-Cèze",
        userId: client.id,
        items: {
          create: [
            {
              productId: products[0]!.id,
              productName: products[0]!.name,
              quantity: 2,
              unitPriceCents: products[0]!.priceCents,
              totalCents: products[0]!.priceCents * 2,
              options: {
                create: [{ groupName: "Sauce", optionName: "Algérienne", priceCents: 0 }],
              },
            },
            {
              productId: products[1]!.id,
              productName: products[1]!.name,
              quantity: 1,
              unitPriceCents: products[1]!.priceCents,
              totalCents: products[1]!.priceCents,
            },
          ],
        },
      },
    });
  }

  console.log("✅ Seed completed!");
  console.log(`   Admin: admin@speedapero.demo / demo2026`);
  console.log(`   Client: client@speedapero.demo / demo2026`);
  void admin;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
