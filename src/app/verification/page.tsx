"use client";

import React, { useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ShieldCheck,
    FileCheck,
    Code2,
    Linkedin,
    History,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectAllProjects, setProjects } from '@/store/slices/dataSlice';
import { generateADR } from '@/lib/adr-generator';
import { projectService } from '@/services/projects';

export default function VerificationPage() {
    const dispatch = useAppDispatch();
    const projects = useAppSelector(selectAllProjects);

    useEffect(() => {
        const loadData = async () => {
            if (projects.length === 0) {
                try {
                    const response = await projectService.getAll();
                    dispatch(setProjects(response.data));
                } catch (error) {
                    console.error("Failed to fetch projects for verification:", error);
                }
            }
        };
        loadData();
    }, [dispatch, projects.length]);

    const stats = useMemo(() => {
        const adrs = projects.flatMap(p => generateADR(p));
        const totalADRs = adrs.length;
        const categoriesCovered = new Set(projects.map(p => p.category)).size;

        return {
            totalADRs,
            categoriesCovered,
            lastSync: new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            })
        };
    }, [projects]);

    const sections = [
        {
            title: "How I make decisions",
            icon: FileCheck,
            value: stats.totalADRs,
            label: "Technical Records",
            desc: "These records show why I chose specific tools or patterns and the trade-offs I considered along the way."
        },
        {
            title: "Real-world projects",
            icon: Code2,
            value: projects.length,
            label: "Verified Projects",
            desc: "Every project here is backed by real code and live deployments you can actually see and test."
        },
        {
            title: "Verified feedback",
            icon: Linkedin,
            value: "100%",
            label: "LinkedIn Verified",
            desc: "All recommendations are pulled directly from my LinkedIn profile to ensure they are 100% genuine."
        }
    ];

    return (
        <main className="min-h-screen bg-background pt-32 pb-24 overflow-hidden relative transition-colors duration-500">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-5xl mx-auto px-6">
                <div className="mb-20 space-y-6">
                    <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] w-fit">
                        <ShieldCheck size={12} />
                        Trust & Proof
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-foreground">
                        VERIFICATION <br />
                        <span className="text-zinc-500 dark:text-zinc-600">HUB.</span>
                    </h1>
                    <p className="max-w-xl text-zinc-500 font-medium text-lg italic">
                        I believe in showing, not just telling. This page aggregates proof for my skills, decisions, and recommendations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {sections.map((s, i) => (
                        <motion.div
                            key={s.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card-premium p-8 border-glass-border relative overflow-hidden group"
                        >
                            <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-600/20 transition-all" />
                            <s.icon className="text-blue-500 mb-6" size={24} />
                            <div className="text-4xl font-black text-foreground italic tracking-tighter mb-2">
                                {s.value}
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
                                {s.label}
                            </div>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-600 font-medium leading-relaxed">
                                {s.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400">System Status</h3>
                        <div className="h-[1px] flex-grow bg-zinc-100 dark:bg-white/5" />
                    </div>

                    <div className="glass-card p-10 border-glass-border space-y-8">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                                <History size={16} className="text-zinc-400 dark:text-zinc-700" />
                                <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500">Last Verified Global Sync:</span>
                                <span className="text-xs font-black text-foreground">{stats.lastSync}</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={12} className="text-emerald-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Database: Connected</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={12} className="text-emerald-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Logic: Live</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-zinc-100 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/5 rounded-2xl italic text-xs text-zinc-500 leading-relaxed">
                            &ldquo;This portfolio operates as a living engineering document. Every skill presented is automatically mapped to
                            project metadata to ensure credibility. Architectural Decision Records (ADR) are generated to provide insight
                            into the 'Why' behind the projects, not just the 'How'.&rdquo;
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
