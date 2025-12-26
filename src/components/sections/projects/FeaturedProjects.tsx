'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Project } from '@/types';
import ProjectSkeleton from '@/components/features/projects/ProjectSkeleton';

interface FeaturedProjectsProps {
    projects: Project[];
    isLoading?: boolean;
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects, isLoading }) => {
    return (
        <section className="px-6">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="flex justify-between items-end">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold">Featured Works</h2>
                        <p className="text-zinc-400">Handpicked projects that showcase technical depth.</p>
                    </div>
                    <Link href="/projects" className="hidden md:flex items-center gap-2 text-blue-400 font-medium hover:underline">
                        View All <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                        [1, 2, 3].map((i) => <ProjectSkeleton key={i} />)
                    ) : (
                        projects.map((project, i) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="h-full group hover:border-blue-500/50">
                                    <CardContent className="p-0">
                                        <div className="relative aspect-video overflow-hidden rounded-lg mb-6">
                                            {project.img ? (
                                                <Image
                                                    src={project.img}
                                                    alt={project.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-emerald-600/20 flex items-center justify-center p-6 text-center">
                                                    <span className="text-xl font-bold text-zinc-400">{project.title}</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                                <Link href={`/projects/${project.id}`}>
                                                    <Button variant="glass" size="sm">Details</Button>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-start">
                                                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">{project.category}</span>
                                                <div className="flex gap-2">
                                                    {project.git && <a href={project.git} className="text-zinc-500 hover:text-white transition-colors" target="_blank" rel="noreferrer"><Github size={16} /></a>}
                                                    {project.demo && <a href={project.demo} className="text-zinc-500 hover:text-white transition-colors" target="_blank" rel="noreferrer"><ExternalLink size={16} /></a>}
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-bold">{project.title}</h3>
                                            <p className="text-zinc-400 text-sm line-clamp-2">{project.desc}</p>
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {project.tags?.slice(0, 3).map(tag => (
                                                    <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
