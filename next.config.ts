import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
          protocol: 'https',
          hostname: 'placehold.co'
      }
    ],
  },
  
  // Redirect non-www to www
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'shireff.dev',
          },
        ],
        destination: 'https://www.shireff.dev/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
