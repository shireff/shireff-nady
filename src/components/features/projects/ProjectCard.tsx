'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Project } from '@/types';
import { normalizeCategory } from '@/lib/utils';

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ translateY: -8 }}
        >
            <Card className="h-full group hover:border-blue-500/30 transition-all duration-500 flex flex-col">
                <CardContent className="p-0 flex flex-col h-full">
                    <div className="relative aspect-video overflow-hidden rounded-lg mb-6">
                        {project.img ? (
                            <>
                                {isLoading && (
                                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/40 backdrop-blur-[2px]">
                                        <div className="w-full h-full animate-pulse bg-gradient-to-br from-blue-500/5 via-foreground/5 to-emerald-500/5" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-6 h-6 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                                        </div>
                                    </div>
                                )}
                                <Image
                                    src={project.img}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    unoptimized={project.img.includes('licdn.com')}
                                    className={`object-cover transition-all duration-700 group-hover:scale-110 ${isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
                                    onLoad={() => setIsLoading(false)}
                                />
                            </>
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-900/40 to-emerald-900/40 flex items-center justify-center p-6 text-center">
                                <span className="text-xl font-bold text-zinc-300">
                                    {project.title}
                                </span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] flex items-center justify-center gap-4">
                            <Link href={`/projects/${project.id}`}>
                                <Button variant="glass" size="sm">
                                    Explore
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex-grow space-y-4 px-6 pb-6">
                        <div className="flex justify-between items-start">
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest px-2 py-1 rounded bg-blue-400/10 border border-blue-400/20">
                                {normalizeCategory(project.category)}
                            </span>
                            <div className="flex gap-2">
                                {project.git && (
                                    <a
                                        href={project.git}
                                        className="text-zinc-500 hover:text-white transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Github size={18} />
                                    </a>
                                )}
                                {project.demo && (
                                    <a
                                        href={project.demo}
                                        className="text-zinc-500 hover:text-white transition-colors"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <ExternalLink size={18} />
                                    </a>
                                )}
                            </div>
                        </div>

                        <h3 className="text-2xl font-black text-foreground uppercase italic tracking-tighter leading-none">{project.title}</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed line-clamp-3">
                            {project.desc}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-2">
                            {project.tags?.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-zinc-500 font-bold uppercase tracking-wider border border-white/5"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
