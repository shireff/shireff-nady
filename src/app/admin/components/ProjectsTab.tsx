'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/types';
import { normalizeCategory, getUniqueCategories } from "@/lib/utils";

interface ProjectsTabProps {
    projects: Project[];
    onEdit: (project: Project) => void;
    onDelete: (id: string) => void;
}

import AdminFilterBar from './AdminFilterBar';
import { useAppSelector } from '@/store/hooks';
import { useState } from 'react';

const ImageWithLoader: React.FC<{ src: string, alt: string }> = ({ src, alt }) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <div className="w-full h-full relative">
            {isLoading && (
                <div className="absolute inset-0 z-10 bg-zinc-800 animate-pulse flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                </div>
            )}
            <Image
                src={src}
                alt={alt}
                fill
                sizes="56px"
                className={`object-cover transition-all duration-500 ${isLoading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
};

const ProjectsTab: React.FC<ProjectsTabProps> = ({ projects, onEdit, onDelete }) => {
    const { searchQuery, category } = useAppSelector((state) => state.admin.filters);

    const filteredProjects = projects.filter((proj) => {
        const matchesSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            proj.desc.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = category === 'all' || normalizeCategory(proj.category) === category;
        return matchesSearch && matchesCategory;
    });

    const categories = getUniqueCategories(projects);

    return (
        <div className="space-y-6">
            <AdminFilterBar categories={categories} />
            <motion.div
                key="projects"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card overflow-hidden border-white/5 shadow-2xl"
            >
                <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/10 text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">
                        <tr>
                            <th className="px-8 py-6">Project Metadata</th>
                            <th className="px-8 py-6">Classification</th>
                            <th className="px-8 py-6">Status</th>
                            <th className="px-8 py-6 text-right">Directives</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredProjects.map((proj) => (
                            <tr key={proj.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 shadow-lg relative">
                                            {proj.img ? (
                                                <ImageWithLoader src={proj.img} alt={proj.title} />
                                            ) : (
                                                <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500">NO IMG</div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-widest">{proj.title}</p>
                                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1 text-ellipsis overflow-hidden max-w-[200px] whitespace-nowrap">{proj.desc}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">{normalizeCategory(proj.category)}</span>
                                </td>
                                <td className="px-8 py-6">
                                    {proj.isFeatured ? (
                                        <span className="flex items-center gap-2 text-blue-400 text-[9px] font-black uppercase tracking-widest">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                            FEATURED
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2 text-zinc-600 text-[9px] font-black uppercase tracking-widest">
                                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                                            STANDARD
                                        </span>
                                    )}
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onEdit(proj)}
                                            className="p-3 bg-white/5 hover:bg-blue-600 hover:text-white rounded-xl text-zinc-400 transition-all"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(proj.id)}
                                            className="p-3 bg-white/5 hover:bg-red-600 hover:text-white rounded-xl text-zinc-400 transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredProjects.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-8 py-20 text-center text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-black">No infrastructure matches the current scan parameters.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
};

export default ProjectsTab;
