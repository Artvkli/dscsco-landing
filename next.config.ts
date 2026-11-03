
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve the landing page under /landing
  basePath: "/landing",

  reactStrictMode: true,
  poweredByHeader: false,

  // Persian is the default language
  async redirects() {
    return [
      {
        source: "/",
        destination: "/fa",
        permanent: false,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
