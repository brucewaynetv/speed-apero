import type { Metadata } from "next";
import { Bebas_Neue, Inter, JetBrains_Mono, Oswald } from "next/font/google";
import { Toaster } from "sonner";
import { RestaurantJsonLd } from "@/components/storefront/json-ld";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Speed Apéro — Burgers, Kebabs & Street Food en Livraison",
  description:
    "Commandez vos burgers, kebabs, wraps, loaded fries et desserts maison chez Speed Apéro.",
  keywords: ["burger", "kebab", "livraison", "street food", "Speed Apéro", "dark kitchen"],
  openGraph: {
    title: "Speed Apéro — Street Food en Livraison",
    description: "Du fait maison. Du goût. Livré chez vous.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${bebas.variable} ${inter.variable} ${oswald.variable} ${jetbrains.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-body antialiased">
        <RestaurantJsonLd />
        {children}
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            style: {
              background: "#151515",
              border: "1px solid rgba(255,115,0,0.3)",
              color: "#F7F2E8",
            },
          }}
        />
      </body>
    </html>
  );
}
