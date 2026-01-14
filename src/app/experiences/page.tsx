import React from 'react';
import Script from 'next/script';
import ExperienceList from '@/components/features/experiences/ExperienceList';
import { experienceService } from '@/services/experiences';

import { Metadata } from 'next';

import { siteConfig } from '@/config/site';

// Use ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: `Experience | ${siteConfig.name} - Portfolio`,
  description: `A detailed timeline of ${siteConfig.name}’s professional journey, technical contributions, and career growth as a Front-End Developer.`,
  alternates: {
    canonical: `${siteConfig.url}/experiences`,
  }
};

export default async function ExperiencesPage() {
  let experiences: import('@/types').Experience[] = [];
  try {
    experiences = await experienceService.getAll();
  } catch (error) {
    console.error("Failed to fetch experiences:", error);
  }

  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Shireff Nady",
      "jobTitle": "Front-End Developer",
      "description": "Shireff Nady's professional journey as a developer.",
      "hasOccupation": experiences.map(exp => ({
        "@type": "OrganizationRole",
        "roleName": exp.position,
        "worksFor": {
          "@type": "Organization",
          "name": exp.company
        },
        "description": exp.description.join(' '),
        "skills": exp.technologies
      }))
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 md:py-20 space-y-12 md:space-y-20">
      <Script
        id="profile-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />

      <div className="text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-black italic tracking-tighter bg-gradient-to-b from-white to-zinc-800 bg-clip-text text-transparent underline decoration-blue-500/50 underline-offset-8 uppercase">My Career.</h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">A look at the places I've worked and the things I've built along the way.</p>
      </div>

      <ExperienceList experiences={experiences} />
    </div>
  );
}
