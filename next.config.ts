import type { NextConfig } from "next";

const EDITIONS = ["starter", "pro", "premium"] as const;
type Edition = (typeof EDITIONS)[number];

function resolveClientEdition(): Edition | null {
  const mode = process.env.NEXT_PUBLIC_APP_MODE?.toLowerCase();
  const editionRaw = process.env.NEXT_PUBLIC_PRODUCT_EDITION?.toLowerCase() ?? "";
  const isClient = mode === "client" || (Boolean(editionRaw) && mode !== "sales");
  if (!isClient) return null;
  return EDITIONS.includes(editionRaw as Edition) ? (editionRaw as Edition) : "starter";
}

function buildRedirects() {
  const edition = resolveClientEdition();
  if (!edition) {
    return [
      { source: "/starter", destination: "/demo/starter", permanent: false },
      { source: "/pro", destination: "/demo/pro", permanent: false },
      { source: "/premium", destination: "/demo/premium", permanent: false },
    ];
  }

  const others = EDITIONS.filter((e) => e !== edition);
  const locked = others.flatMap((t) => [
    { source: `/demo/${t}`, destination: `/demo/${edition}`, permanent: false },
    {
      source: `/demo/${t}/:path*`,
      destination: `/demo/${edition}/:path*`,
      permanent: false,
    },
    { source: `/admin/${t}`, destination: `/admin/${edition}`, permanent: false },
    {
      source: `/admin/${t}/:path*`,
      destination: `/admin/${edition}/:path*`,
      permanent: false,
    },
    { source: `/${t}`, destination: `/demo/${edition}`, permanent: false },
  ]);

  return [
    { source: "/", destination: `/demo/${edition}`, permanent: false },
    { source: "/admin", destination: `/admin/${edition}`, permanent: false },
    { source: "/admin/login", destination: `/admin/${edition}/login`, permanent: false },
    { source: "/checkout", destination: `/demo/${edition}/checkout`, permanent: false },
    { source: "/compte", destination: `/demo/${edition}/compte`, permanent: false },
    {
      source: "/commande/:id",
      destination: `/demo/${edition}/commande/:id`,
      permanent: false,
    },
    ...locked,
  ];
}

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return buildRedirects();
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cnowljsvllujntnfrlpe.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
