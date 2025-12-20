module.exports = {
  siteUrl: 'https://shireff-nady.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/server-sitemap.xml'], // Exclude dynamic server-side sitemaps if any
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://shireff-nady.vercel.app/server-sitemap.xml', // If you have dynamic pages
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin'], // Disallow admin area
      },
    ],
  },
}
