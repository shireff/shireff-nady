import { getServerSideSitemap } from 'next-sitemap';
import { projectService } from '@/services/projects';

export async function GET(request: Request) {
  // Method to fetch data from your CMS or API
  let projects: import('@/types').Project[] = [];
  try {
    projects = await projectService.getAll();
  } catch (error) {
    console.error('Sitemap Error:', error);
  }

  const fields = projects.map((project) => ({
    loc: `https://shireff-nady.vercel.app/projects/${project.id}`,
    lastmod: project.createdAt || new Date().toISOString(),
    changefreq: 'weekly' as const,
    priority: 0.8,
  }));

  return getServerSideSitemap(fields);
}
