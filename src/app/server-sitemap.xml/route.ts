import { getServerSideSitemap } from 'next-sitemap';
import { projectService } from '@/services/projects';
import { Project } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const baseUrl = 'https://shireff-nady.vercel.app';
  let projects: Project[] = [];

  try {
    projects = await projectService.getAll();
  } catch (error) {
    console.error('Sitemap Error:', error);
  }

  // Define Personal Images for SEO (attached to Homepage)
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
    // --- Homepage with Personal Images ---
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
    // --- Dynamic Project Pages ---
    ...projects.map((project) => ({
      loc: `${baseUrl}/projects/${project.id}`,
      lastmod: project.createdAt || new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
      images: project.img ? [{ loc: project.img, title: project.title }] : undefined,
    })),
  ];

  // Cast fields to any to bypass strict ISitemapField type checks for the custom image structure
  return getServerSideSitemap(fields as any);
}
