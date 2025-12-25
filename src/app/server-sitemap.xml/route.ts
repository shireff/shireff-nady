import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { projectService } from '@/services/projects';
import { Project } from '@/types';

export const dynamic = 'force-dynamic';

function normalizeImage(url: string | undefined | null, baseUrl: string) {
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

  // 1. Personal Images (Hardcoded to ensure validity)
  const personalImages = [
    {
      loc: `${baseUrl}/personal/shireff-1.jpg`,
      title: 'Shireff Nady - Front-End Engineer',
    },
    {
      loc: `${baseUrl}/personal/shireff-2.jpg`,
      title: 'Shireff Nady - Web Developer',
    },
    {
      loc: `${baseUrl}/personal/shireff-3.jpg`,
      title: 'Shireff - Senior Front-End Engineer',
    },
    {
      loc: `${baseUrl}/personal/shireff-4.jpg`,
      title: 'Shireff Nady - React Specialist',
    },
    {
      loc: `${baseUrl}/personal/shireff-5.jpg`,
      title: 'Shireff Nady - Full Stack Developer',
    },
  ];

  const fields = [
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
      lastmod: project.createdAt || new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
    };

    if (imageUrl) {
      entry.images = [{
        loc: imageUrl,
        title: project.title || 'Project Image',
      }];
    }

    fields.push(entry);
  }

  // Cast to any to handle custom image structure if strict typing complains
  return getServerSideSitemap(fields as any);
}
