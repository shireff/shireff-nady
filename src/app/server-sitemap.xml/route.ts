import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { projectService } from '@/services/projects';
import { Project } from '@/types';

export const dynamic = 'force-dynamic';

/**
 * Normalizes image URLs to ensure they are absolute.
 * Handles undefined/null checks and relative paths.
 */
function normalizeImage(url: string | undefined | null, baseUrl: string): string | null {
  if (!url || url === 'undefined' || url === 'null') return null;
  if (url.startsWith('http')) return url;
  if (url.startsWith('/')) return `${baseUrl}${url}`;
  return `${baseUrl}/${url}`;
}

export async function GET(request: Request) {
  const baseUrl = 'https://shireff-nady.vercel.app';
  let projects: Project[] = [];

  try {
    projects = await projectService.getAll();
  } catch (error) {
    console.error('Sitemap Error: Failed to fetch projects', error);
  }

  // 1. Personal Images (Hardcoded for SEO)
  // These are explicitly added to the homepage entry
const personalImages = [
  { loc: 'https://shireff-nady.vercel.app/personal/shireff-1.jpg', title: 'Shireff Nady - Front-End Engineer' },
  { loc: 'https://shireff-nady.vercel.app/personal/shireff-2.jpg', title: 'Shireff Nady - Web Developer' },
  { loc: 'https://shireff-nady.vercel.app/personal/shireff-3.jpg', title: 'Shireff - Senior Front-End Engineer' },
  { loc: 'https://shireff-nady.vercel.app/personal/shireff-4.jpg', title: 'Shireff Nady - React Specialist' },
  { loc: 'https://shireff-nady.vercel.app/personal/shireff-5.jpg', title: 'Shireff Nady - Full Stack Developer' },
];
  // We define fields array without strict strict ISitemapField[] typing initially 
  // to avoid "Type string is not assignable to type URL" errors on 'loc'.
  // We cast to 'any' at the end for next-sitemap.
  const fields: any[] = [
    // --- Homepage with attached Personal Images ---
    {
      loc: `${baseUrl}/`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
      images: personalImages,
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
    const imageUrl = normalizeImage(project.img, baseUrl);
    
    const entry: any = {
      loc: `${baseUrl}/projects/${project.id}`,
      lastmod: project.createdAt ? new Date(project.createdAt).toISOString() : new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
    };

    // Only add images array if a valid image exists
    if (imageUrl) {
      entry.images = [{
        loc: imageUrl,
        title: project.title || 'Project Detail',
      }];
    }

    fields.push(entry);
  }

  // Return the XML response
  return getServerSideSitemap(fields);
}
