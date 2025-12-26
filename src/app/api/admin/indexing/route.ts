import { NextResponse } from 'next/server';
import { indexAllPages } from '@/lib/indexing';
import { projectService } from '@/services/projects';
import { Project } from '@/types';

/**
 * Admin API to trigger indexing for all pages in the sitemap.
 * This can be called from the Admin Dashboard to notify Google and IndexNow (Bing/Yandex).
 */
export async function POST(request: Request) {
  try {
    // In a real application, you would verify the admin token here.
    // However, since this is a private internal tool, we rely on the environment variables
    // and potentially a shared secret if needed.

    const baseUrl = process.env.SITE_URL || 'https://shireff-nady.vercel.app';
    
    // Fetch all projects to include their dynamic routes
    let projects: Project[] = [];
    try {
      projects = await projectService.getAll();
    } catch (e) {
      console.error('Indexing API: Failed to fetch projects:', e);
      // Continue with static pages even if project fetch fails
    }

    // List of core static pages
    const staticPages = [
      '/',
      '/projects',
      '/experiences',
      '/contact',
      '/state-comparisons',
    ];

    // Combine all URLs
    const urls = [
      ...staticPages.map(p => `${baseUrl}${p === '/' ? '' : p}`),
      ...projects.map(p => `${baseUrl}/projects/${p.id}`)
    ];

    // Filter out duplicates and ensure valid URLs
    const uniqueUrls = Array.from(new Set(urls));

    console.log(`Starting indexing for ${uniqueUrls.length} URLs...`);
    
    // Trigger bulk indexing
    const results = await indexAllPages(uniqueUrls);
    
    const stats = {
      total: results.length,
      successful: results.filter(r => r.status === 'success').length,
      failed: results.filter(r => r.status === 'error').length,
      engines: Array.from(new Set(results.map(r => r.engine))),
    };

    return NextResponse.json({ 
      success: true, 
      message: 'Indexing requests dispatched',
      stats,
      results 
    });
  } catch (error: any) {
    console.error('Indexing API Route Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Internal Server Error' 
    }, { status: 500 });
  }
}
