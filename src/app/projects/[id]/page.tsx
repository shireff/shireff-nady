import React from 'react';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { Github, ArrowLeft, Calendar, Tag, ExternalLink } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { projectService } from '@/services/projects';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

// Generate metadata for SEO including specific project details
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const project = await projectService.getById(id);
    if (!project) return { title: 'Project Not Found' };

    return {
      title: `${project.title} | Shireff Nady Projects`,
      description: project.desc.substring(0, 160),
      openGraph: {
        title: project.title,
        description: project.desc,
        images: project.img ? [project.img] : [],
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
    project = await projectService.getById(id);
  } catch (error) {
    console.error(`Failed to fetch project ${id}:`, error);
  }

  if (!project) {
    notFound();
  }

  const projectSchema = {
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
        <div className="absolute inset-0 z-0">
          {project.img ? (
            <img src={project.img} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-emerald-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 pb-16">
          <Link href="/projects">
            <button
              className="flex items-center gap-3 text-zinc-400 hover:text-white transition-all mb-10 group bg-white/5 w-fit px-4 py-2 rounded-full border border-white/5"
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
              className="text-5xl md:text-8xl font-black italic tracking-tighter"
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
