'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2 } from 'lucide-react';
import { Experience } from '@/types';

interface ExperiencesTabProps {
    experiences: Experience[];
    onEdit: (exp: Experience) => void;
    onDelete: (id: string) => void;
}

const ExperiencesTab: React.FC<ExperiencesTabProps> = ({ experiences, onEdit, onDelete }) => {
    return (
        <motion.div
            key="experiences"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card overflow-hidden border-white/5 shadow-2xl"
        >
            <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/10 text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">
                    <tr>
                        <th className="px-8 py-6">Company / Experience</th>
                        <th className="px-8 py-6">Timeline</th>
                        <th className="px-8 py-6 text-right">Directives</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {experiences.map((exp) => (
                        <tr key={exp.id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-8 py-6">
                                <p className="font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-widest">{exp.position}</p>
                                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">{exp.company}</p>
                            </td>
                            <td className="px-8 py-6">
                                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{exp.period}</span>
                            </td>
                            <td className="px-8 py-6 text-right">
                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => onEdit(exp)}
                                        className="p-3 bg-white/5 hover:bg-blue-600 hover:text-white rounded-xl text-zinc-400 transition-all"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => onDelete(exp.id)}
                                        className="p-3 bg-white/5 hover:bg-red-600 hover:text-white rounded-xl text-zinc-400 transition-all"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {experiences.length === 0 && (
                        <tr>
                            <td colSpan={3} className="px-8 py-20 text-center text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-black">No timeline data recorded.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </motion.div>
    );
};

export default ExperiencesTab;
