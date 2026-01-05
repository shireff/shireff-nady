'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash2 } from 'lucide-react';
import { StateComparison } from '@/types';
import GlassEmptyState from '@/components/ui/GlassEmptyState';
import { Database } from 'lucide-react';

interface ComparisonsTabProps {
    comparisons: StateComparison[];
    onEdit: (comp: StateComparison) => void;
    onDelete: (id: string) => void;
}

import AdminFilterBar from './AdminFilterBar';
import { useAppSelector } from '@/store/hooks';

const ComparisonsTab: React.FC<ComparisonsTabProps> = ({ comparisons, onEdit, onDelete }) => {
    const { searchQuery } = useAppSelector((state) => state.admin.filters);

    const filteredComparisons = comparisons.filter((comp) =>
        comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <AdminFilterBar />
            <motion.div
                key="comparisons"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card overflow-hidden border-white/5 shadow-2xl"
            >
                <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/10 text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">
                        <tr>
                            <th className="px-8 py-6">Comparison Node</th>
                            <th className="px-8 py-6">Status</th>
                            <th className="px-8 py-6 text-right">Directives</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredComparisons.map((comp) => (
                            <tr key={comp.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-8 py-6">
                                    <p className="font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-widest">{comp.title}</p>
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">{comp.category}</p>
                                </td>
                                <td className="px-8 py-6">
                                    {comp.isActive ? (
                                        <span className="text-emerald-400 text-[9px] font-black uppercase tracking-widest">ACTIVE</span>
                                    ) : (
                                        <span className="text-zinc-600 text-[9px] font-black uppercase tracking-widest">INACTIVE</span>
                                    )}
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => onEdit(comp)}
                                            className="p-3 bg-white/5 hover:bg-blue-600 hover:text-white rounded-xl text-zinc-400 transition-all"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(comp.id)}
                                            className="p-3 bg-white/5 hover:bg-red-600 hover:text-white rounded-xl text-zinc-400 transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredComparisons.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-8 py-20">
                                    <GlassEmptyState
                                        title="No nodes detected"
                                        description="No architectural comparison nodes match the current search parameters."
                                        icon={Database}
                                        className="bg-transparent border-none shadow-none p-0"
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
};

export default ComparisonsTab;
