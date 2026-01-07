import React from 'react';
import { notFound } from 'next/navigation';
import { projectService } from '@/services/projects';
import { generateADR } from '@/lib/adr-generator';
import ProjectVisualFlow from '@/components/features/projects/ProjectVisualFlow';
import Link from 'next/link';
import { ArrowLeft, Share2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    try {
        const project = await projectService.getById(id);
        if (!project) return { title: 'Project Flow Not Found' };

        return {
            title: `Architecture Flow: ${project.title} | ${siteConfig.name}`,
            description: `Explore the architectural decisions, logic map, and technical flow of ${project.title}. Built by ${siteConfig.name}.`,
            alternates: {
                canonical: `${siteConfig.url}/projects/${id}/flow`,
            },
            openGraph: {
                title: `Logic Map: ${project.title}`,
                description: `Deep dive into the architecture of ${project.title}`,
                images: project.img ? [project.img] : [`${siteConfig.url}/og-image.jpg`],
            }
        };
    } catch (error) {
        return { title: 'Project Architecture Flow' };
    }
}

export default async function ProjectFlowPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let project = null;

    try {
        project = await projectService.getById(id);
    } catch (error) {
        console.error(`[ProjectFlow] Failed to fetch project ${id}:`, error);
    }

    if (!project) {
        notFound();
    }

    const adrs = generateADR(project);

    return (
        <main className="min-h-screen bg-background pt-32 pb-24 relative overflow-hidden transition-colors duration-500">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-20">
                    <Link href={`/projects/${id}`}>
                        <button className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400 hover:text-foreground transition-all group bg-glass-bg px-5 py-2.5 rounded-full border border-glass-border backdrop-blur-sm">
                            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Return to Project</span>
                        </button>
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="h-[1px] w-12 bg-zinc-100 dark:bg-white/10 hidden md:block" />
                        <h1 className="text-zinc-400 dark:text-zinc-500 font-bold text-sm uppercase tracking-[0.3em]">
                            Documentation / <span className="text-foreground">Architecture Flow</span>
                        </h1>
                    </div>
                </div>

                <ProjectVisualFlow adrs={adrs} projectTitle={project.title} />

                <div className="mt-32 p-12 glass-card-premium border-glass-border rounded-[32px] text-center space-y-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5 -z-10" />
                    <h3 className="text-3xl font-black italic tracking-tighter text-foreground">READY TO AUDIT THIS CODE?</h3>
                    <p className="max-w-xl mx-auto text-zinc-600 dark:text-zinc-500 font-medium">
                        This flow is derived directly from production metadata. You can explore the source code or initiate a live demo to verify these architectural patterns.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                        {project.git && (
                            <a href={project.git} target="_blank" rel="noreferrer">
                                <Button className="rounded-full px-8 py-6 font-black italic uppercase tracking-widest text-xs">
                                    Inspect Source Repo
                                </Button>
                            </a>
                        )}
                        {project.demo && (
                            <a href={project.demo} target="_blank" rel="noreferrer">
                                <Button variant="outline" className="rounded-full px-8 py-6 font-black italic uppercase tracking-widest text-xs border-zinc-200 dark:border-white/10">
                                    Launch Environment
                                </Button>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
