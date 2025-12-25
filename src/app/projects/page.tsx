import React from 'react';
import Script from 'next/script';
import ProjectList from '@/components/features/projects/ProjectList';
import { projectService } from '@/services/projects';

// Force dynamic rendering if the API response is not static
export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  let projects: import('@/types').Project[] = [];
  try {
    projects = await projectService.getAll();
  } catch (error) {
    console.error("Failed to fetch projects on server:", error);
    // Even if it fails, we render the page with empty list or whatever fallback is appropriate.
    // Ideally we would trigger a not-found or error boundary, but let's be graceful.
  }

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Projects Portfolio - Shireff Nady",
    "description": "A showcase of high-performance web applications, SaaS platforms, and digital instruments built by Shireff Nady.",
    "url": "https://shireff-nady.vercel.app/projects",
    "publisher": {
      "@type": "Person",
      "name": "Shireff Nady"
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <Script
        id="collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-7xl font-black tracking-tight">PROJECTS.</h1>
        <p className="text-zinc-400 text-lg">
          A collection of digital instruments designed and built to solve complex problems.
        </p>
      </div>

      <ProjectList initialProjects={projects} />
    </div>
  );
}
