"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Project } from '@/types';
import { generateADR } from '@/lib/adr-generator';

interface ProjectADRProps {
    project: Project;
}

export default function ProjectADR({ project }: ProjectADRProps) {
    const [isOpen, setIsOpen] = useState(false);
    const adrs = generateADR(project);

    if (adrs.length === 0) return null;

    return (
        <div className="mt-16 space-y-8">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-4 group transition-all duration-300 w-full"
            >
                <h2 className="text-2xl font-black italic border-l-4 border-blue-500 pl-6 uppercase tracking-wider text-zinc-300 group-hover:text-white transition-colors">
                    Behind the Build
                </h2>
                <div className="flex-grow h-[1px] bg-white/5" />
                <div className={`p-2 rounded-lg ${isOpen ? 'bg-blue-600 text-white' : 'bg-white/5 text-zinc-500'} group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                    <ChevronDown
                        size={20}
                        className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 pb-4">
                            {adrs.map((adr, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glass-card p-8 border-white/5 space-y-6 relative overflow-hidden group/adr"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-3xl rounded-full" />

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-400">
                                                <FileText size={14} />
                                            </div>
                                            <h4 className="text-sm font-black text-white uppercase tracking-wider">
                                                {adr.decision}
                                            </h4>
                                        </div>
                                        <p className="text-xs text-zinc-500 leading-relaxed italic">
                                            &ldquo;{adr.context}&rdquo;
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] block">Other paths I considered</span>
                                            <div className="flex flex-wrap gap-2">
                                                {adr.alternatives.map((alt, i) => (
                                                    <span key={i} className="px-3 py-1 rounded-full bg-white/5 text-[9px] text-zinc-400 border border-white/5 font-bold">
                                                        {alt}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 pt-2">
                                            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 space-y-2">
                                                <div className="flex items-center gap-2 text-emerald-400">
                                                    <CheckCircle2 size={12} />
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500/80">The Upside</span>
                                                </div>
                                                <p className="text-[10px] text-zinc-400 leading-relaxed font-medium">
                                                    {adr.consequences.positive}
                                                </p>
                                            </div>
                                            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 space-y-2">
                                                <div className="flex items-center gap-2 text-amber-400">
                                                    <AlertTriangle size={12} />
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-amber-500/80">The Struggle</span>
                                                </div>
                                                <p className="text-[10px] text-zinc-400 leading-relaxed font-medium">
                                                    {adr.consequences.tradeoffs}
                                                </p>
                                            </div>
                                        </div>

                                        {/* NEW: What I'm learned Insights Layer */}
                                        <div className="pt-6 border-t border-white/5 space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-[1px] flex-grow bg-blue-500/20" />
                                                <span className="text-[8px] font-black text-blue-500 uppercase tracking-[0.3em]">The Retrospective</span>
                                                <div className="h-[1px] flex-grow bg-blue-500/20" />
                                            </div>

                                            <div className="space-y-4">
                                                <div className="space-y-1.5">
                                                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">If I did it again</span>
                                                    <p className="text-[10px] text-zinc-300 leading-relaxed font-medium italic border-l-2 border-blue-500/30 pl-3">
                                                        &ldquo;{adr.changeToday}&rdquo;
                                                    </p>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">Why it worked then</span>
                                                    <p className="text-[10px] text-zinc-400 leading-relaxed font-medium pl-3">
                                                        {adr.pastRationale}
                                                    </p>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block">The Takeaway</span>
                                                    <p className="text-[10px] text-emerald-400/80 leading-relaxed font-bold bg-emerald-500/5 px-3 py-2 rounded-lg border border-emerald-500/10">
                                                        {adr.learning}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
