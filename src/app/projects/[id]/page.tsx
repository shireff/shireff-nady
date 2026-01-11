import React from 'react';
import ProjectDetailHero from '@/components/features/projects/ProjectDetailHero';
import Image from 'next/image';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { Github, ArrowLeft, Calendar, Tag, ExternalLink, Share2, ArrowRight, Database } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { projectService } from '@/services/projects';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import ProjectADR from '@/components/features/ProjectADR';

import { siteConfig } from '@/config/site';

// Use ISR (Incremental Static Regeneration)
export const revalidate = 60; // Revalidate every minute instead of every hour

// Pre-render existing projects at build time
export async function generateStaticParams() {
  try {
    const response = await projectService.getAll();
    const projects = response.data || [];
    return projects.map((project: { id: string }) => ({
      id: project.id.toString(),
    }));
  } catch (error) {
    console.error('[generateStaticParams] Failed to fetch projects:', error);
    // Return empty array to skip pre-rendering projects that fail to fetch
    // They will be rendered on-demand during request time (ISR)
    return [];
  }
}

// SEO: Generate dynamic metadata for each project
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const project = await projectService.getById(id);
    if (!project) return { title: 'Project Not Found' };

    return {
      title: `${project.title} | ${siteConfig.name} Projects`,
      description: project.desc.substring(0, 160),
      openGraph: {
        title: project.title,
        description: project.desc,
        images: project.img ? [project.img] : [siteConfig.ogImage],
        url: `${siteConfig.url}/projects/${project.id}`,
      },
      alternates: {
        canonical: `${siteConfig.url}/projects/${project.id}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: project.title,
        description: project.desc,
        images: project.img ? [project.img] : [siteConfig.ogImage],
      }
    };
  } catch (error) {
    return { title: 'Project Details' };
  }
}

const getDefaultTags = (category: string): string[] => {
  const cat = category.toLowerCase();
  if (cat.includes('next')) return ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'];
  if (cat.includes('node')) return ['Node.js', 'Express', 'MongoDB', 'REST API'];
  if (cat.includes('react')) return ['React', 'Redux Toolkit', 'Axios', 'Tailwind'];
  if (cat.includes('mobile')) return ['React Native', 'Expo', 'Firebase', 'NativeWind'];
  if (cat.includes('ui')) return ['Figma', 'Astro', 'Tailwind', 'CSS3'];
  return ['JavaScript', 'HTML5', 'CSS3', 'Git'];
};

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let project = null;

  try {
    console.log(`[ProjectDetail] Fetching project ${id} from provider...`);
    project = await projectService.getById(id);
    console.log(`[ProjectDetail] Successfully fetched project: ${project?.title}`);
  } catch (error) {
    console.error(`[ProjectDetail] Failed to fetch project ${id} from ${process.env.NEXT_PUBLIC_API_URL || 'LOCALHOST'}:`, error);
  }

  if (!project) {
    notFound();
  }

  // Schema for rich product/software result
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title,
    "description": project.desc,
    "image": project.img || siteConfig.ogImage,
    "applicationCategory": project.category,
    "operatingSystem": "Web",
    "url": `${siteConfig.url}/projects/${project.id}`,
    ...(project.git && { "codeRepository": project.git }),
    "author": {
      "@type": "Person",
      "name": siteConfig.author.name
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="pb-24">
      <Script
        id="project-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      {/* Hero Header */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        {project.img ? (
          <ProjectDetailHero src={project.img} alt={project.title} />
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900 to-emerald-900">
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent" />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 pb-16">
          <Link href="/projects">
            <button
              className="flex items-center gap-3 text-zinc-500 hover:text-foreground transition-all mb-10 group bg-glass-bg w-fit px-4 py-2 rounded-full border border-glass-border"
            >
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Return to Lab</span>
            </button>
          </Link>

          <div className="space-y-6">
            <span
              className="px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-600/30 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]"
            >
              {project.category}
            </span>
            <h1
              className="text-5xl md:text-8xl font-black italic tracking-tighter text-foreground"
            >
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-16">
            <div className="space-y-8">
              <h2 className="text-3xl font-black italic border-l-4 border-blue-500 pl-6 uppercase tracking-wider text-foreground">Details.</h2>
              {project.desc.split('\n\n').map((para, i) => (
                <p key={i} className="text-zinc-500 dark:text-zinc-400 text-xl leading-relaxed font-medium">{para}</p>
              ))}
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-black italic border-l-4 border-blue-500 pl-6 uppercase tracking-wider text-zinc-300">Technology Stack</h2>
              <div className="flex flex-wrap gap-4">
                {(project.tags && project.tags.length > 0 ? project.tags : getDefaultTags(project.category)).map(tag => (
                  <div key={tag} className="glass-card px-6 py-3 flex items-center gap-3 text-foreground border-glass-border shadow-xl hover:border-blue-500/30 transition-all">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    <span className="font-bold uppercase tracking-widest text-xs tracking-tighter">{tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architectural Decisions Section */}
            <ProjectADR project={project} />
          </div>

          <aside className="space-y-10">
            <Card className="border-blue-500/10 bg-blue-500/5 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">About this Project</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="p-4 rounded-2xl bg-glass-bg text-zinc-500 border border-glass-border">
                    <Calendar size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">Created on</p>
                    <p className="font-bold text-foreground text-lg italic uppercase tracking-tighter">{formatDate(project.createdAt)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="p-4 rounded-2xl bg-glass-bg text-zinc-500 border border-glass-border">
                    <Tag size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">Deployment Status</p>
                    <p className="font-bold text-emerald-400 text-lg uppercase tracking-widest">Live</p>
                  </div>
                </div>

                <div className="pt-8 space-y-4">
                  {project.demo ? (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="block">
                      <Button className="w-full gap-3 py-6 rounded-2xl font-black italic shadow-xl shadow-blue-600/20" size="lg">
                        VIEW LIVE <ExternalLink size={20} />
                      </Button>
                    </a>
                  ) : (
                    <div className="glass-card border-amber-500/20 bg-amber-500/5 p-6 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                        <p className="text-amber-400 font-bold uppercase tracking-widest text-xs">
                          No Demo Available
                        </p>
                      </div>
                      <p className="text-amber-300/60 text-sm mt-3 font-medium">
                        This project doesn't have a live demo at the moment.
                      </p>
                    </div>
                  )}

                  {project.git ? (
                    <a href={project.git} target="_blank" rel="noreferrer" className="block">
                      <Button variant="outline" className="w-full gap-3 py-6 rounded-2xl font-black italic border-glass-border hover:bg-glass-bg" size="lg">
                        SOURCE CODE <Github size={20} />
                      </Button>
                    </a>
                  ) : (
                    <div className="glass-card border-purple-500/20 bg-purple-500/5 p-6 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                        <p className="text-purple-400 font-bold uppercase tracking-widest text-xs">
                          Private Repository
                        </p>
                      </div>
                      <p className="text-purple-300/60 text-sm mt-3 font-medium">
                        This repo is private for a client.
                      </p>
                    </div>
                  )}

                  <Link href={`/projects/${project.id}/flow`} className="block pt-4">
                    <button className="w-full p-6 rounded-2xl bg-gradient-to-br from-blue-600/10 to-emerald-600/10 border border-glass-border hover:border-blue-500/30 transition-all flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                          <Share2 size={20} />
                        </div>
                        <div className="text-left">
                          <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">How it works</p>
                          <p className="font-bold text-foreground text-lg italic tracking-tighter uppercase">Explore Logic Map</p>
                        </div>
                      </div>
                      <ArrowRight size={20} className="text-zinc-500 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all" />
                    </button>
                  </Link>

                  {project.hasDatabaseDiagram && (
                    <Link href={`/projects/${project.id}/database-diagram`} className="block pt-4">
                      <button className="w-full p-6 rounded-2xl bg-gradient-to-br from-purple-600/10 to-pink-600/10 border border-glass-border hover:border-purple-500/30 transition-all flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
                            <Database size={20} />
                          </div>
                          <div className="text-left">
                            <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">Architecture</p>
                            <p className="font-bold text-foreground text-lg italic tracking-tighter uppercase">View Database Diagram</p>
                          </div>
                        </div>
                        <ArrowRight size={20} className="text-zinc-500 group-hover:text-purple-400 transform group-hover:translate-x-1 transition-all" />
                      </button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </div>
  );
}
