import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  output: "standalone",
  generateMetadata: async () => ({
    title: "Shireff Nady | Front-End Developer",
    description:
      "Shireff Nady, a front-end developer skilled in HTML, CSS, JavaScript, React, and more.",
  }),

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
