'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Project } from '@/types';

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
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
                            <img
                                src={project.img}
                                alt={project.title}
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-900/40 to-emerald-900/40 flex items-center justify-center p-6 text-center">
                                <span className="text-xl font-bold text-zinc-300">
                                    {project.title}
                                </span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <Link href={`/projects/${project.id}`}>
                                <Button variant="glass" size="sm">
                                    Explore
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex-grow space-y-4">
                        <div className="flex justify-between items-start">
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest px-2 py-1 rounded bg-blue-400/10 border border-blue-400/20">
                                {project.category}
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

                        <h3 className="text-2xl font-bold">{project.title}</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
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
