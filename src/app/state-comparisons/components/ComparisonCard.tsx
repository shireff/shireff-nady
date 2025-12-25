'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Split } from 'lucide-react';
import ComparisonSlider from '@/components/ui/ComparisonSlider';
import { StateComparison } from '@/types';

interface ComparisonCardProps {
    item: StateComparison;
}

export default function ComparisonCard({ item }: ComparisonCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-400 font-bold text-[10px] uppercase tracking-widest">
                        <Split size={14} /> State Migration
                    </div>
                    <h2 className="text-3xl font-black italic tracking-tight uppercase">{item.title}</h2>
                </div>
                <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                    {item.category}
                </span>
            </div>

            <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl">
                {item.desc}
            </p>

            <div className="relative rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl aspect-[16/9] lg:aspect-[21/9]">
                <ComparisonSlider
                    beforeImage={item.beforeImg}
                    afterImage={item.afterImg}
                />

                {/* Quality Badges */}
                <div className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-black text-white/50 uppercase tracking-[0.2em] pointer-events-none">
                    Legacy Infrastructure
                </div>
                <div className="absolute top-6 right-6 px-4 py-2 rounded-xl bg-blue-600/60 backdrop-blur-md border border-blue-400/20 text-[9px] font-black text-white uppercase tracking-[0.2em] pointer-events-none">
                    Optimized Architecture
                </div>
            </div>
        </motion.div>
    );
}
