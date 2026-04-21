/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.shireff.dev",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,

  // Default values for all pages
  changefreq: "weekly",
  priority: 0.7,

  // Exclude admin and API routes from sitemap
  exclude: ["/admin", "/admin/*", "/api/*", "/server-sitemap.xml"],

  // Custom transformation for specific routes
  transform: async (config, path) => {
    // Custom priority and changefreq for different pages
    const customConfig = {
      "/": {
        priority: 1.0,
        changefreq: "daily",
      },
      "/projects": {
        priority: 0.9,
        changefreq: "weekly",
      },
      "/image-gallery": {
        priority: 0.4,
        changefreq: "weekly",
      },
      "/experiences": {
        priority: 0.8,
        changefreq: "monthly",
      },
      "/contact": {
        priority: 0.8,
        changefreq: "monthly",
      },
      "/state-comparisons": {
        priority: 0.7,
        changefreq: "monthly",
      },
    };

    // Check if path matches any custom config
    const custom = customConfig[path];

    // For dynamic project pages
    if (path.startsWith("/projects/")) {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.85,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      };
    }

    return {
      loc: path,
      changefreq: custom?.changefreq || config.changefreq,
      priority: custom?.priority || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },

  // Robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: ["/", "/personal/*"],
        disallow: ["/admin", "/api"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/personal/*"],
        disallow: ["/admin", "/api"],
      },
      {
        userAgent: "Bingbot",
        allow: ["/", "/personal/*"],
        disallow: ["/admin", "/api"],
      },
      {
        userAgent: "GPTBot",
        allow: ["/"],
        disallow: ["/admin", "/api"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: ["/"],
        disallow: ["/admin", "/api"],
      },
      {
        userAgent: "Claude-Web",
        allow: ["/"],
        disallow: ["/admin", "/api"],
      },
      {
        userAgent: "anthropic-ai",
        allow: ["/"],
        disallow: ["/admin", "/api"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/"],
        disallow: ["/admin", "/api"],
      },
      {
        userAgent: "Applebot-Extended",
        allow: ["/"],
        disallow: ["/admin", "/api"],
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL || "https://www.shireff.dev"}/server-sitemap.xml`,
    ],
    // Prepend Content-Signal directive before all User-agent blocks
    transformRobotsTxt: async (_, robotsTxt) => {
      const contentSignal =
        "# Content Signals - AI usage preferences\nContent-Signal: ai-train=no, search=yes, ai-input=yes\n\n";
      return contentSignal + robotsTxt;
    },
  },
};
