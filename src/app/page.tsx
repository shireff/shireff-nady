import React from 'react';
import Script from 'next/script';
import { projectService } from '@/services/projects';
import { settingsService } from '@/services/settings';
import { siteConfig } from '@/config/site';

// Sections
import Hero from '@/components/sections/hero/Hero';
import Stats from '@/components/sections/stats/Stats';
import Skills from '@/components/sections/Skills';
import FeaturedProjects from '@/components/sections/projects/FeaturedProjects';
import Recommendations from '@/components/sections/testimonials/Recommendations';
import CTA from '@/components/sections/cta/CTA';
import HiddenGallery from '@/components/sections/HiddenGallery';

const DEFAULT_HERO_IMAGE = siteConfig.links.heroImageUrl;

// Revalidate every hour
export const revalidate = 3600;

export default async function Home() {
  let projects: import('@/types').Project[] = [];
  let heroImageUrl = DEFAULT_HERO_IMAGE;

  try {
    const [projectsResponse, homeSettings] = await Promise.all([
      projectService.getAll(),
      settingsService.getHomeImage()
    ]);

    projects = projectsResponse?.data || [];

    // Fallback to default if no image is returned or null
    if (homeSettings?.heroImageUrl) {
      heroImageUrl = homeSettings.heroImageUrl;
    }
  } catch (error) {
    console.error("Failed to fetch home data:", error);
  }

  const featuredProjects = projects.filter(p => p.isFeatured);

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${siteConfig.name} - Home`,
    "url": siteConfig.url,
    "description": `Welcome to the official portfolio of ${siteConfig.name}, a Senior Front-End Developer specialized in digital excellence.`,
    "author": {
      "@type": "Person",
      "name": siteConfig.name
    }
  };

  // Structured data for images to help Google Images
  const imageGallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": `${siteConfig.name} Professional Gallery`,
    "description": `Professional photos and project screenshots of ${siteConfig.name}`,
    "url": siteConfig.url,
    "image": [
      ...siteConfig.personalImages.map(img => ({
        "@type": "ImageObject",
        "url": img.url.startsWith('http') ? img.url : `${siteConfig.url}${img.url}`,
        "caption": img.title,
        "name": img.title
      })),
      ...projects.filter(p => p.img).slice(0, 10).map(p => ({
        "@type": "ImageObject",
        "url": p.img?.startsWith('http') ? p.img : `${siteConfig.url}${p.img}`,
        "caption": p.title,
        "name": p.title
      }))
    ]
  };

  return (
    <div className="space-y-32 pb-24">
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <Script
        id="image-gallery-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
      />

      <Hero
        initialHeroImage={heroImageUrl}
        defaultHeroImage={DEFAULT_HERO_IMAGE}
      />

      <Stats />

      <Skills projects={projects} />

      <FeaturedProjects projects={featuredProjects} isLoading={false} />

      <Recommendations />

      <CTA />

      {/* Hidden SEO Gallery for Google Indexing */}
      <HiddenGallery projects={projects} />
    </div>
  );
}
