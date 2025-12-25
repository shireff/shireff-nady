'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2 } from 'lucide-react';
import { Project } from '@/types';

interface ProjectsTabProps {
    projects: Project[];
    onEdit: (project: Project) => void;
    onDelete: (id: string) => void;
}

const ProjectsTab: React.FC<ProjectsTabProps> = ({ projects, onEdit, onDelete }) => {
    return (
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
                    {projects.map((proj) => (
                        <tr key={proj.id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                                        {proj.img ? (
                                            <img src={proj.img} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
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
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">{proj.category}</span>
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
                    {projects.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-8 py-20 text-center text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-black">No infrastructure detected. Initialize first project.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </motion.div>
    );
};

export default ProjectsTab;
