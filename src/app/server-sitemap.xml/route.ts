import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { projectService } from '@/services/projects';
import { comparisonService } from '@/services/comparisons';
import { siteConfig } from '@/config/site';
import { Project, StateComparison } from '@/types';

export const dynamic = 'force-dynamic';

/**
 * Normalizes image URLs to ensure they are absolute strings.
 */
function getAbsoluteImageUrl(url: string | undefined | null, baseUrl: string): string | null {
  if (!url || url === 'undefined' || url === 'null') return null;
  if (url.startsWith('http')) return url;
  if (url.startsWith('/')) return `${baseUrl}${url}`;
  return `${baseUrl}/${url}`;
}

/**
 * Safely creates a URL object. Returns undefined if invalid.
 */
function safeUrl(urlStr: string | null): URL | undefined {
  if (!urlStr) return undefined;
  try {
    return new URL(urlStr);
  } catch (e) {
    console.error('Sitemap Error: Invalid URL', urlStr);
    return undefined;
  }
}

export async function GET(request: Request) {
  const baseUrl = siteConfig.url;
  let projects: Project[] = [];
  let comparisons: StateComparison[] = [];

  try {
    const [projectsRes, comparisonsRes] = await Promise.all([
      projectService.getAll(),
      comparisonService.getAll({ isActive: true })
    ]);
    projects = projectsRes.data || [];
    comparisons = comparisonsRes || [];
  } catch (error) {
    console.error('Sitemap Error: Failed to fetch data', error);
  }

  // 1. Personal Images from siteConfig
  const personalImages = siteConfig.personalImages
    .map((img) => ({
      loc: safeUrl(getAbsoluteImageUrl(img.url, baseUrl)),
      title: img.title
    }))
    .filter((img): img is { loc: URL; title: string } => !!img.loc);

  // 2. Project Images (Top 10 for general indexing)
  const topProjectImages = projects
    .filter(p => !!p.img)
    .slice(0, 10)
    .map(p => ({
      loc: safeUrl(getAbsoluteImageUrl(p.img, baseUrl)),
      title: `${p.title} - Project Evolution`
    }))
    .filter((img): img is { loc: URL; title: string } => !!img.loc);

  // 3. Combined Gallery Images
  const galleryImages = [...personalImages, ...topProjectImages];

  const fields: ISitemapField[] = [
    // --- Homepage with all key images attached ---
    {
      loc: `${baseUrl}/`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
      images: galleryImages,
    },
    // --- Static Core Pages ---
    {
      loc: `${baseUrl}/projects`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.9,
    },
    {
      loc: `${baseUrl}/experiences`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/state-comparisons`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
      images: comparisons.flatMap(c => [
        { loc: safeUrl(getAbsoluteImageUrl(c.beforeImg, baseUrl)), title: `${c.title} - Before` },
        { loc: safeUrl(getAbsoluteImageUrl(c.afterImg, baseUrl)), title: `${c.title} - After` }
      ]).filter((img): img is { loc: URL; title: string } => !!img.loc)
    },
    {
      loc: `${baseUrl}/image-gallery`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.4,
      images: galleryImages,
    },
    {
      loc: `${baseUrl}/recommendations`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/verification`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      loc: `${baseUrl}/contact-hub`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.5,
    },
  ];

  // --- Dynamic Project Pages with Validated Images ---
  for (const project of projects) {
    const absUrl = getAbsoluteImageUrl(project.img, baseUrl);
    const urlObj = safeUrl(absUrl);
    
    // 1. Core Project Page
    const entry: ISitemapField = {
      loc: `${baseUrl}/projects/${project.id}`,
      lastmod: project.createdAt ? new Date(project.createdAt).toISOString() : new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
    };

    if (urlObj) {
      entry.images = [{
        loc: urlObj,
        title: project.title || 'Project Detail',
      }];
    }

    fields.push(entry);

    // 2. Project Flow Page
    fields.push({
      loc: `${baseUrl}/projects/${project.id}/flow`,
      lastmod: project.createdAt ? new Date(project.createdAt).toISOString() : new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.6,
    });
  }

  return getServerSideSitemap(fields);
}
