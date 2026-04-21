import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },

  // Agent discovery headers (RFC 8288)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Link",
            value: [
              '</.well-known/api-catalog>; rel="api-catalog"',
              '</.well-known/mcp/server-card.json>; rel="mcp-server-card"',
              '</.well-known/agent-skills/index.json>; rel="agent-skills"',
              '</api/docs>; rel="service-doc"',
            ].join(", "),
          },
        ],
      },
    ];
  },

  // Redirect config
  async redirects() {
    return [
      // 1. Redirect /index to /
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
      // 2. Redirect non-www to www
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "shireff.dev",
          },
        ],
        destination: "https://www.shireff.dev/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
