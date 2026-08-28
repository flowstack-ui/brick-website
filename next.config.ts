import type { NextConfig } from "next";

const sharedSecurityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), geolocation=(), microphone=(), payment=(), usb=()" },
];

const pageSecurityHeaders = [
  ...sharedSecurityHeaders,
  { key: "X-Frame-Options", value: "DENY" },
];

const blockPreviewHeaders = [
  ...sharedSecurityHeaders,
  { key: "Access-Control-Allow-Origin", value: "*" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Content-Security-Policy",
    value: "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self' data:; connect-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'self'",
  },
  { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
  { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      { source: "/block-previews/:path*", headers: blockPreviewHeaders },
      { source: "/:path((?!block-previews/).*)", headers: pageSecurityHeaders },
      ...["/llms.txt", "/llms-full.txt"].map((source) => ({
        source,
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      })),
      {
        source: "/brick-social-card.jpg",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
