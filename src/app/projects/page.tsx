import React from 'react';
import Script from 'next/script';
import ProjectList from '@/components/features/projects/ProjectList';
import { projectService } from '@/services/projects';

import { Metadata } from 'next';

import { siteConfig } from '@/config/site';

// Use ISR (Incremental Static Regeneration) to balance performance and freshness
export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: `Projects | ${siteConfig.name} - Portfolio`,
  description: siteConfig.description,
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  }
};

export default async function ProjectsPage() {
  let projects: import('@/types').Project[] = [];

  try {
    // Server-side fetch: Content available immediately in initial HTML
    projects = await projectService.getAll();
  } catch (error) {
    console.error("Failed to fetch projects on server:", error);
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
    },
    "hasPart": projects.map(p => ({
      "@type": "SoftwareApplication",
      "name": p.title,
      "url": `https://shireff-nady.vercel.app/projects/${p.id}`,
      "description": p.desc,
      "image": p.img
    }))
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

      {/* Pass initial data to client component for interactivity */}
      <ProjectList initialProjects={projects} />
    </div>
  );
}
