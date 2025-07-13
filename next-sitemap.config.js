/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://shireff-nady.vercel.app",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "monthly",
  priority: 0.7,
  exclude: [],
  transform: async (config, path) => {
    if (path === "/") {
      return {
        loc: `${config.siteUrl}${path}`,
        changefreq: config.changefreq,
        priority: 1.0,
        lastmod: new Date().toISOString(),
        alternateRefs: [],
        images: [
          {
            loc: "https://shireff-nady.vercel.app/og-image.jpg",
            title: "Shireff Nady Front-End Developer",
          },
        ],
      };
    }

    return {
      loc: `${config.siteUrl}${path}`,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [],
    };
  },
};
