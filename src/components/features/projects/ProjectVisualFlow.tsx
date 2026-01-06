"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Target,
    Zap,
    RotateCcw,
    History,
    Lightbulb,
    AlertTriangle,
    ArrowRight
} from 'lucide-react';
import { ADR } from '@/lib/adr-generator';

interface ProjectVisualFlowProps {
    adrs: ADR[];
    projectTitle: string;
}

export default function ProjectVisualFlow({ adrs, projectTitle }: ProjectVisualFlowProps) {
    if (!adrs || adrs.length === 0) return null;

    return (
        <div className="space-y-16 py-10">
            <div className="flex flex-col items-center text-center space-y-4 mb-20">
                <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">
                    Behind the Build
                </div>
                <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-foreground uppercase leading-none">
                    How I Built <span className="text-blue-500">{projectTitle.split(' ')[0]}</span>.
                </h2>
                <p className="max-w-2xl text-zinc-500 text-base font-medium leading-relaxed">
                    Every project is a series of choices. Here is a heatmap of the critical paths I took,
                    the hurdles I cleared, and what I’d do differently today.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto px-4">
                {adrs.map((adr, index) => (
                    <DecisionHeatmapBox key={index} adr={adr} index={index} />
                ))}
            </div>
        </div>
    );
}

function DecisionHeatmapBox({ adr, index }: { adr: ADR; index: number }) {
    // Use index to vary the "Heat" intensity visually
    const heatLevel = ["#3b82f6", "#10b981", "#f59e0b"][index % 3];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative"
        >
            <div className="glass-card-premium p-8 border-glass-border relative group overflow-hidden">
                {/* Heat Background Glow */}
                <div
                    className="absolute -top-24 -left-24 w-64 h-64 blur-[100px] rounded-full opacity-20 group-hover:opacity-30 transition-opacity"
                    style={{ backgroundColor: heatLevel }}
                />

                <div className="relative z-10 space-y-10">
                    {/* Main Context & Decision */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-8 space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.4em]">Core Path {index + 1}</span>
                                <div className="h-[1px] flex-grow bg-zinc-100 dark:bg-white/5" />
                            </div>
                            <h3 className="text-3xl font-black text-foreground italic tracking-tighter uppercase leading-none group-hover:text-blue-500 transition-colors">
                                {adr.decision}
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed font-medium pl-6 border-l-2 border-blue-500/20 italic">
                                {adr.context}
                            </p>
                        </div>

                        <div className="lg:col-span-4 bg-glass-bg rounded-2xl p-6 border border-glass-border space-y-4 transition-colors">
                            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                <Lightbulb size={16} />
                                <span className="text-[10px] font-black uppercase tracking-widest leading-none pt-0.5">The Logic</span>
                            </div>
                            <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                                {adr.rationale}
                            </p>
                        </div>
                    </div>

                    {/* Impact Heatmap Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4 p-6 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/5 border border-emerald-500/10 dark:border-emerald-500/10 group/item">
                            <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
                                <Zap size={18} className="fill-emerald-400/20" />
                                <h4 className="text-xs font-black uppercase tracking-widest pt-0.5">The Upside</h4>
                            </div>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                                {adr.consequences.positive}
                            </p>
                        </div>

                        <div className="space-y-4 p-6 rounded-2xl bg-amber-500/5 dark:bg-amber-500/5 border border-amber-500/10 dark:border-amber-500/10 group/item">
                            <div className="flex items-center gap-3 text-amber-600 dark:text-amber-500">
                                <AlertTriangle size={18} />
                                <h4 className="text-xs font-black uppercase tracking-widest pt-0.5">The Struggle</h4>
                            </div>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                                {adr.consequences.tradeoffs}
                            </p>
                        </div>

                        <div className="space-y-4 p-6 rounded-2xl bg-blue-500/5 dark:bg-blue-500/5 border border-blue-500/10 dark:border-blue-500/10 group/item">
                            <div className="flex items-center gap-3 text-blue-500 dark:text-blue-400">
                                <RotateCcw size={18} />
                                <h4 className="text-xs font-black uppercase tracking-widest pt-0.5">If I did it again</h4>
                            </div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-300 font-bold italic leading-relaxed">
                                &ldquo;{adr.changeToday}&rdquo;
                            </p>
                        </div>
                    </div>

                    {/* Learnings & Context Footer */}
                    <div className="pt-8 border-t border-glass-border grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="flex items-center gap-6">
                            <div className="flex -space-x-2">
                                {adr.alternatives.slice(0, 3).map((alt, i) => (
                                    <div key={i} className="px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-[9px] font-bold text-zinc-500 uppercase tracking-wider backdrop-blur-xl transition-colors">
                                        {alt}
                                    </div>
                                ))}
                            </div>
                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Other forks in the road</span>
                        </div>

                        <div className="flex items-center gap-4 justify-end">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-glass-bg border border-glass-border">
                                <History size={14} className="text-zinc-400 dark:text-zinc-600" />
                                <span className="text-[11px] text-zinc-500 font-medium tracking-tight">The takeaway:</span>
                                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-black italic uppercase tracking-tighter">
                                    {adr.learning.split(' ')[0]}... {adr.learning.split(' ').slice(-3).join(' ')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Connector Arrow for the flow */}
            {index < 2 && (
                <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
                    <div className="w-[1px] h-8 bg-zinc-500" />
                    <ArrowRight className="rotate-90 text-zinc-500" size={16} />
                </div>
            )}
        </motion.div>
    );
}
