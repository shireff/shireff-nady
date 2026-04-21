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
              '</api/markdown>; rel="alternate"; type="text/markdown"',
            ].join(", "),
          },
          {
            key: "Vary",
            value: "Accept",
          },
        ],
      },
      // Markdown route: allow agents to fetch directly
      {
        source: "/api/markdown",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Cache-Control",
            value: "public, s-maxage=300, stale-while-revalidate=600",
          },
        ],
      },
    ];
  },

  // Rewrite: serve markdown when Accept header contains text/markdown
  // Note: Next.js rewrites don't support header matching, so agents should
  // call /api/markdown?path=/ directly, or use the Link header alternate rel.

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
