const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Speed Apéro",
  description:
    "Dark kitchen — burgers, kebabs, wraps et street food faits maison en livraison",
  servesCuisine: ["Street Food", "Burger", "Kebab"],
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
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
