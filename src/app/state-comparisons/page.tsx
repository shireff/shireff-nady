'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Split, Info, Cpu, Zap, Trophy, ShieldCheck, Scale } from 'lucide-react';
import ComparisonSlider from '@/components/ui/ComparisonSlider';
import { comparisonService } from '@/services/comparisons';
import { StateComparison, TechComparison } from '@/types';
import { MOCK_TECH_COMPARISONS } from '@/mocks/comparisons';

export default function ComparisonsPage() {
  const [comparisons, setComparisons] = useState<StateComparison[]>([]);
  const [techComparisons, setTechComparisons] = useState<TechComparison[]>(MOCK_TECH_COMPARISONS);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // comparisonService.getAll({ isActive: true }).then(setComparisons).finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 space-y-32">
      <div className="text-center space-y-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
        >
          <Cpu size={16} /> EVOLUTIONARY BENCHMARKS
        </motion.div>
        <h1 className="text-5xl md:text-9xl font-black italic tracking-tighter bg-gradient-to-b from-white to-zinc-800 bg-clip-text text-transparent">COMPARE.</h1>
        <p className="text-zinc-500 text-xl max-w-2xl mx-auto font-medium">
          A side-by-side technical evaluation of legacy system migrations and architectural enhancements.
        </p>
      </div>

      <div className="space-y-48">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6">
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-zinc-600 font-black uppercase tracking-[0.5em] text-[10px]">Synchronizing nodes...</p>
          </div>
        ) : (
          <div className="space-y-32">
            {/* Render Mock Tech Comparisons */}
            {techComparisons.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Background Glow */}
                <div className="absolute -inset-10 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 blur-[120px] rounded-full -z-10 group-hover:from-blue-500/10 transition-colors" />
                
                <div className="glass-card-premium p-8 md:p-12 space-y-10 border-white/5 hover:border-blue-500/20 transition-all duration-700">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-8">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-blue-400 font-black text-[10px] uppercase tracking-[0.3em]">
                        <Scale size={14} /> Technical Analysis
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black italic tracking-tight">{item.title}</h2>
                    </div>
                    {item.isTestData && (
                      <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[9px] font-black tracking-widest text-zinc-500 uppercase">Test Data</span>
                    )}
                  </div>

                  <p className="text-zinc-400 text-lg font-medium max-w-3xl leading-relaxed">{item.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                    {/* VS Badge */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 bg-black/80 flex items-center justify-center z-10 hidden md:flex">
                       <span className="text-[10px] font-black italic text-zinc-500">VS</span>
                    </div>

                    {/* Left Item */}
                    <div className={`p-8 rounded-3xl border transition-all duration-500 flex flex-col gap-4 ${item.winner === 'left' ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-white/5 bg-white/5'}`}>
                      <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-black uppercase tracking-tighter">{item.leftItem.name}</h3>
                        {item.winner === 'left' && <Trophy size={20} className="text-emerald-400" />}
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed">{item.leftItem.details}</p>
                    </div>

                    {/* Right Item */}
                    <div className={`p-8 rounded-3xl border transition-all duration-500 flex flex-col gap-4 ${item.winner === 'right' ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-white/5 bg-white/5'}`}>
                      <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-black uppercase tracking-tighter">{item.rightItem.name}</h3>
                        {item.winner === 'right' && <Trophy size={20} className="text-emerald-400" />}
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed">{item.rightItem.details}</p>
                    </div>
                  </div>

                  {/* Criteria Tags */}
                  <div className="flex flex-wrap items-center gap-3 pt-4">
                    <span className="text-[9px] font-black tracking-widest text-zinc-600 uppercase mr-2">Evaluation Criteria:</span>
                    {item.criteria.map((c, i) => (
                      <div key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold text-zinc-400 flex items-center gap-2">
                        <ShieldCheck size={12} className="text-blue-500" /> {c}
                      </div>
                    ))}
                    {item.winner === 'tie' && (
                      <div className="ml-auto px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">Result: Strategic Tie</div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Existing comparisons rendering (Commented out mapping to preserve code but not clutter) */}
            {/* 
            {comparisons.map((item, i) => (
              <motion.div key={item.id} ... />
            ))} 
            */}
          </div>
        )}

        {techComparisons.length === 0 && comparisons.length === 0 && !isLoading && (
          <div className="text-center py-40 glass-card border-white/5 bg-white/5">
             <p className="text-zinc-600 font-black uppercase tracking-[0.3em] text-[10px]">No comparison snapshots detected in this repository.</p>
          </div>
        )}
      </div>
    </div>
  );
}
