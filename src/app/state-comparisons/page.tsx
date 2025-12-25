'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Split, Info, Cpu, Zap, Trophy, ShieldCheck, Scale } from 'lucide-react';
import ComparisonSlider from '@/components/ui/ComparisonSlider';
import { comparisonService } from '@/services/comparisons';
import { StateComparison, TechComparison } from '@/types';
import { MOCK_TECH_COMPARISONS } from '@/mocks/comparisons';

// Redux
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setComparisons, setLoadingState } from '@/store/slices/dataSlice';
import TechComparisonCard from './components/TechComparisonCard';
import ComparisonCard from './components/ComparisonCard';
import ComparisonSkeleton from './components/ComparisonSkeleton';

export default function ComparisonsPage() {
  const dispatch = useAppDispatch();
  const { comparisons, isLoading: dataLoading } = useAppSelector((state) => state.data);
  const isLoading = dataLoading.comparisons;
  const [techComparisons] = useState<TechComparison[]>(MOCK_TECH_COMPARISONS);

  useEffect(() => {
    if (comparisons.length === 0) {
      dispatch(setLoadingState({ type: 'comparisons', loading: true }));
      comparisonService.getAll({ isActive: true })
        .then(data => dispatch(setComparisons(data)))
        .catch(err => {
          console.error(err);
          dispatch(setLoadingState({ type: 'comparisons', loading: false }));
        });
    }
  }, [dispatch, comparisons.length]);

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
        {isLoading && comparisons.length === 0 ? (
          <div className="space-y-32">
            {[1, 2].map((i) => (
              <ComparisonSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="space-y-32">
            {/* Tech Comparisons (Static/Mock) */}
            {techComparisons.map((item) => (
              <TechComparisonCard key={item.id} item={item} />
            ))}

            {/* Dynamic Snapshots (From Redux/API) */}
            {comparisons.map((item) => (
              <ComparisonCard key={item.id} item={item} />
            ))}
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
