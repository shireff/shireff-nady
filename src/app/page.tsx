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

const DEFAULT_HERO_IMAGE = "https://media.licdn.com/dms/image/v2/D4E03AQHI2emfkXdeXQ/profile-displayphoto-shrink_800_800/B4EZaI2FxCHMAc-/0/1746052604728?e=1767830400&v=beta&t=-l4A36ias3qpuV4uIKc7q7V1vcZqMwuIceuT8hkYwag";

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

  return (
    <div className="space-y-32 pb-24">
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
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
    </div>
  );
}
