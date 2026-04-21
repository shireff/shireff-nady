import React from "react";
import Script from "next/script";
import { headers } from "next/headers";
import ProjectList from "@/components/features/projects/ProjectList";
import { projectService } from "@/services/projects";

import { Metadata } from "next";

import { siteConfig } from "@/config/site";

// Use ISR (Incremental Static Regeneration) to balance performance and freshness
export const revalidate = 60; // Revalidate every minute

export const metadata: Metadata = {
  title: `Projects | ${siteConfig.name} - Portfolio`,
  description: `${siteConfig.description} - Explore projects by ${siteConfig.seo.keywords
    .filter((k) => k.includes("Developer") || k.includes("مطور"))
    .slice(0, 5)
    .join(", ")}`,
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
};

export default async function ProjectsPage() {
  const headersList = await headers();
  const accept = headersList.get("accept") ?? "";
  if (accept.includes("text/markdown")) {
    const { generateMarkdown } = await import("@/lib/markdown-generator");
    const md = await generateMarkdown("/projects");
    return new Response(md, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "x-markdown-tokens": String(Math.ceil(md.length / 4)),
        Vary: "Accept",
      },
    }) as unknown as React.ReactElement;
  }

  let projects: import("@/types").Project[] = [];
  let pagination: import("@/types").PaginationMeta | undefined;

  try {
    // Server-side fetch: Content available immediately in initial HTML
    const response = await projectService.getAll();
    projects = response.data;
    pagination = {
      page: response.page,
      totalPages: response.totalPages,
      total: response.total,
      limit: 10, // Assuming default
      count: response.count,
    };
  } catch (error) {
    console.error(
      `[ProjectsPage] Failed to fetch projects on server (API: ${process.env.NEXT_PUBLIC_API_URL}):`,
      error,
    );
  }

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}/projects#collection`,
    name: `Projects Portfolio - ${siteConfig.author.name}`,
    description: `A showcase of high-performance web applications, SaaS platforms, and digital instruments built by ${siteConfig.author.name}.`,
    url: `${siteConfig.url}/projects`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
    },
    author: {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
    },
    publisher: {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
    },
    hasPart: projects.map((p) => ({
      "@type": "SoftwareApplication",
      name: p.title,
      url: `${siteConfig.url}/projects/${p.id}`,
      description: p.desc,
      image: {
        "@type": "ImageObject",
        url: p.img,
        creditText: siteConfig.author.name,
        copyrightNotice: `Copyright (c) 2026 ${siteConfig.author.name}. All rights reserved.`,
        license: `${siteConfig.url}/verification`,
        acquireLicensePage: `${siteConfig.url}/contact`,
      },
      author: {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.author.name,
      },
    })),
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <Script
        id="collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Hidden SEO keywords */}
      <div className="sr-only" aria-hidden="true">
        <h2>
          {siteConfig.seo.keywords
            .filter(
              (k) =>
                k.includes("Portfolio") ||
                k.includes("Project") ||
                k.includes("بورتفوليو"),
            )
            .join(", ")}
        </h2>
      </div>

      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-7xl font-black tracking-tight italic uppercase">
          Projects.
        </h1>
        <p className="text-zinc-400 text-lg">
          A selection of projects I've built, ranging from complex SaaS
          platforms to unique web experiments.
        </p>
      </div>

      {/* Pass initial data to client component for interactivity */}
      <ProjectList initialProjects={projects} initialPagination={pagination} />
    </div>
  );
}
