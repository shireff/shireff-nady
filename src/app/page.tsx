'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { projectService } from '@/services/projects';
import { Project } from '@/types';
import { settingsService } from '@/services/settings';
import { siteConfig } from '@/config/site';

// Sections
import Hero from '@/components/sections/hero/Hero';
import Stats from '@/components/sections/stats/Stats';
import Skills from '@/components/sections/Skills';
import FeaturedProjects from '@/components/sections/projects/FeaturedProjects';
import CTA from '@/components/sections/cta/CTA';

const DEFAULT_HERO_IMAGE = "https://media.licdn.com/dms/image/v2/D4E03AQHI2emfkXdeXQ/profile-displayphoto-shrink_800_800/B4EZaI2FxCHMAc-/0/1746052604728?e=1767830400&v=beta&t=-l4A36ias3qpuV4uIKc7q7V1vcZqMwuIceuT8hkYwag";

// Redux
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setProjects, setLoadingState } from '@/store/slices/dataSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  const { projects, isLoading: dataLoading } = useAppSelector((state) => state.data);
  const [heroImage, setHeroImage] = useState(DEFAULT_HERO_IMAGE);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const featuredProjects = projects.filter(p => p.isFeatured).length > 0
    ? projects.filter(p => p.isFeatured).slice(0, 3)
    : projects.slice(0, 3);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": `${siteConfig.name} Portfolio`,
    "url": siteConfig.url,
    "description": `Portfolio of ${siteConfig.name}, Senior Front-End Developer.`,
    "publisher": {
      "@type": "Person",
      "name": siteConfig.name
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.url}/projects?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

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

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(setLoadingState({ type: 'projects', loading: true }));
      projectService.getAll().then(data => {
        dispatch(setProjects(data));
      }).catch((error) => {
        console.error("Failed to fetch featured projects:", error);
        dispatch(setLoadingState({ type: 'projects', loading: false }));
      });
    }

    // Fetch Home Hero Image
    settingsService.getHomeImage().then(data => {
      if (data.heroImageUrl) {
        setHeroImage(data.heroImageUrl);
      }
    }).finally(() => {
      setIsImageLoading(false);
    });
  }, [dispatch, projects.length]);

  return (
    <div className="space-y-32 pb-24">
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />

      <Hero
        heroImage={heroImage}
        isImageLoading={isImageLoading}
        setIsImageLoading={setIsImageLoading}
        defaultHeroImage={DEFAULT_HERO_IMAGE}
        setHeroImage={setHeroImage}
      />

      <Stats />

      <Skills />

      <FeaturedProjects projects={featuredProjects} isLoading={dataLoading.projects} />

      <CTA />
    </div>
  );
}
