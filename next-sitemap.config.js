/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://shireff-nady.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 5000,
  
  // Default values for all pages
  changefreq: 'weekly',
  priority: 0.7,
  
  // Exclude admin and API routes from sitemap
  exclude: [
    '/admin',
    '/admin/*',
    '/api/*',
    '/server-sitemap.xml',
  ],
  
  // Custom transformation for specific routes
  transform: async (config, path) => {
    // Custom priority and changefreq for different pages
    const customConfig = {
      '/': {
        priority: 1.0,
        changefreq: 'daily',
      },
      '/projects': {
        priority: 0.9,
        changefreq: 'weekly',
      },
      '/experiences': {
        priority: 0.8,
        changefreq: 'monthly',
      },
      '/contact': {
        priority: 0.8,
        changefreq: 'monthly',
      },
      '/state-comparisons': {
        priority: 0.7,
        changefreq: 'monthly',
      },
    };

    // Check if path matches any custom config
    const custom = customConfig[path];
    
    // For dynamic project pages
    if (path.startsWith('/projects/')) {
      return {
        loc: path,
        changefreq: 'weekly',
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
        userAgent: '*',
        allow: ['/', '/personal/*'],
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/personal/*'],
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/', '/personal/*'],
        disallow: ['/admin', '/api'],
      },
    ],
    additionalSitemaps: [
      // Add additional sitemaps here if you have dynamic server-side generated sitemaps
      // 'https://shireff-nady.vercel.app/server-sitemap.xml',
    ],
  },
}

