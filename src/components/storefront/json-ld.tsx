import { RESTAURANT } from "@/lib/data/restaurant";

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: RESTAURANT.name,
  description:
    "Dark kitchen — burgers, kebabs, wraps et street food faits maison en livraison",
  servesCuisine: ["Street Food", "Burger", "Kebab"],
  priceRange: "€€",
  telephone: RESTAURANT.phoneDisplay,
  address: {
    "@type": "PostalAddress",
    addressLocality: RESTAURANT.city,
    postalCode: RESTAURANT.postalCode,
    addressRegion: "Gard",
    addressCountry: "FR",
  },
};

export function RestaurantJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
    />
  );
}
