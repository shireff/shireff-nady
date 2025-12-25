import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { projectService } from '@/services/projects';
import { Project } from '@/types';

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
  const baseUrl = 'https://shireff-nady.vercel.app';
  let projects: Project[] = [];

  try {
    projects = await projectService.getAll();
  } catch (error) {
    console.error('Sitemap Error: Failed to fetch projects', error);
  }

  // 1. Personal Images
  // Ensure we use URL objects for 'loc' to satisfy next-sitemap strict types if required
  // and explicit string paths for clarity.
  const personalImageUrls = [
    { url: `${baseUrl}/personal/shireff-1.jpg`, title: 'Shireff Nady - Front-End Engineer' },
    { url: `${baseUrl}/personal/shireff-2.jpg`, title: 'Shireff Nady - Web Developer' },
    { url: `${baseUrl}/personal/shireff-3.jpg`, title: 'Shireff - Senior Front-End Engineer' },
    { url: `${baseUrl}/personal/shireff-4.jpg`, title: 'Shireff Nady - React Specialist' },
    { url: `${baseUrl}/personal/shireff-5.jpg`, title: 'Shireff Nady - Full Stack Developer' },
  ];

  const personalImages = personalImageUrls
    .map((img) => ({
      loc: safeUrl(img.url),
      title: img.title
    }))
    .filter((img): img is { loc: URL; title: string } => !!img.loc);

  const fields: ISitemapField[] = [
    // --- Homepage with attached Personal Images ---
    {
      loc: `${baseUrl}/`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
      images: personalImages, // Typescript accepts this if ISitemapField expects URL in loc
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
      changefreq: 'monthly',
      priority: 0.7,
    },
  ];

  // --- Dynamic Project Pages with Validated Images ---
  for (const project of projects) {
    const absUrl = getAbsoluteImageUrl(project.img, baseUrl);
    const urlObj = safeUrl(absUrl);
    
    // Explicitly define entry with a broader type to allow 'images' manipulation
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
  }

  return getServerSideSitemap(fields);
}
