'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { Github, Globe, ArrowLeft, ChevronRight, Calendar, Tag, ExternalLink } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { projectService } from '@/services/projects';
import { Project } from '@/types';
import { formatDate } from '@/lib/utils';

const getDefaultTags = (category: string): string[] => {
  const cat = category.toLowerCase();
  if (cat.includes('next')) return ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'];
  if (cat.includes('node')) return ['Node.js', 'Express', 'MongoDB', 'REST API'];
  if (cat.includes('react')) return ['React', 'Redux Toolkit', 'Axios', 'Tailwind'];
  if (cat.includes('mobile')) return ['React Native', 'Expo', 'Firebase', 'NativeWind'];
  if (cat.includes('ui')) return ['Figma', 'Astro', 'Tailwind', 'CSS3'];
  return ['JavaScript', 'HTML5', 'CSS3', 'Git'];
};

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      projectService.getById(id as string)
        .then(setProject)
        .catch(() => {
          // Fallback for demo
          setProject({
            id: id as string,
            title: 'Quantum Dashboard',
            desc: 'Quantum Dashboard is a futuristic, high-performance administrative interface designed for deep-tech analytics. It features a fully responsive glassmorphism UI, real-time data visualization using Three.js and D3, and a robust state management system.\n\nThe project involved architecting a scalable frontend that could handle massive data streams without compromising on FPS or user experience. By utilizing Web Workers for data processing and React Server Components for initial rendering, we achieved a 40% improvement in perceived load times.',
            category: 'Web App',
            img: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=1200&q=80',
            tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
            isFeatured: true,
            createdAt: new Date().toISOString(),
            git: 'https://github.com',
            demo: 'https://example.com'
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const projectSchema = project ? {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title,
    "description": project.desc,
    "image": project.img || "https://shireff-nady.vercel.app/og-image.jpg",
    "applicationCategory": project.category,
    "operatingSystem": "Web",
    "url": `https://shireff-nady.vercel.app/projects/${project.id}`,
    ...(project.git && { "codeRepository": project.git }),
    "author": {
      "@type": "Person",
      "name": "Shireff Nady"
    }
  } : null;

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center text-zinc-400">Project not found</div>;

  return (
    <div className="pb-24">
      {projectSchema && (
        <Script
          id="project-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
        />
      )}
      {/* Hero Header */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          {project.img ? (
            <img src={project.img} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-emerald-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 pb-16">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()} 
            className="flex items-center gap-3 text-zinc-400 hover:text-white transition-all mb-10 group bg-white/5 w-fit px-4 py-2 rounded-full border border-white/5"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" /> 
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Return to Lab</span>
          </motion.button>
          
          <div className="space-y-6">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-600/30 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]"
            >
              {project.category}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-black italic tracking-tighter"
            >
              {project.title}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 space-y-16">
            <div className="space-y-8">
              <h2 className="text-3xl font-black italic border-l-4 border-blue-500 pl-6">SPECIFICATIONS.</h2>
              {project.desc.split('\n\n').map((para, i) => (
                <p key={i} className="text-zinc-400 text-xl leading-relaxed font-medium">{para}</p>
              ))}
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-black italic border-l-4 border-blue-500 pl-6 uppercase tracking-wider text-zinc-300">Technology Stack</h2>
              <div className="flex flex-wrap gap-4">
                {(project.tags && project.tags.length > 0 ? project.tags : getDefaultTags(project.category)).map(tag => (
                  <div key={tag} className="glass-card px-6 py-3 flex items-center gap-3 text-zinc-100 border-white/5 shadow-xl hover:border-blue-500/30 transition-all">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    <span className="font-bold uppercase tracking-widest text-xs">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-10">
            <Card className="border-blue-500/10 bg-blue-500/5 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Project Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex items-center gap-5">
                  <div className="p-4 rounded-2xl bg-black/40 text-zinc-400 border border-white/5">
                    <Calendar size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">Deployment Date</p>
                    <p className="font-bold text-white text-lg">{formatDate(project.createdAt)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-5">
                  <div className="p-4 rounded-2xl bg-black/40 text-zinc-400 border border-white/5">
                    <Tag size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-1">Deployment Status</p>
                    <p className="font-bold text-emerald-400 text-lg uppercase tracking-widest">Live</p>
                  </div>
                </div>

                <div className="pt-8 space-y-4">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="block">
                      <Button className="w-full gap-3 py-6 rounded-2xl font-black italic shadow-xl shadow-blue-600/20" size="lg">
                         INSTANTIATE DEMO <ExternalLink size={20} />
                      </Button>
                    </a>
                  )}
                  {project.git && (
                    <a href={project.git} target="_blank" rel="noreferrer" className="block">
                      <Button variant="outline" className="w-full gap-3 py-6 rounded-2xl font-black italic border-white/10 hover:bg-white/5" size="lg">
                        SOURCE CODE <Github size={20} />
                      </Button>
                    </a>
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
