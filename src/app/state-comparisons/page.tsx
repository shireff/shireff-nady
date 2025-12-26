import React from 'react';
import { Cpu } from 'lucide-react';
import { comparisonService } from '@/services/comparisons';
import { StateComparison } from '@/types';
import { MOCK_TECH_COMPARISONS } from '@/mocks/comparisons';

import TechComparisonCard from './components/TechComparisonCard';
import ComparisonCard from './components/ComparisonCard';

// ISR
export const revalidate = 3600;

export default async function ComparisonsPage() {
  let comparisons: StateComparison[] = [];

  try {
    comparisons = await comparisonService.getAll({ isActive: true });
  } catch (err) {
    console.error("Failed to fetch comparisons:", err);
  }

  // Use static mocks directly
  const techComparisons = MOCK_TECH_COMPARISONS;
  const hasContent = comparisons.length > 0 || techComparisons.length > 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 space-y-32">
      <div className="text-center space-y-8">
        <div
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
        >
          <Cpu size={16} /> EVOLUTIONARY BENCHMARKS
        </div>
        <h1 className="text-5xl md:text-9xl font-black italic tracking-tighter bg-gradient-to-b from-white to-zinc-800 bg-clip-text text-transparent">COMPARE.</h1>
        <p className="text-zinc-500 text-xl max-w-2xl mx-auto font-medium">
          A side-by-side technical evaluation of legacy system migrations and architectural enhancements.
        </p>
      </div>

      <div className="space-y-48">
        <div className="space-y-32">
          {/* Tech Comparisons (Static/Mock) */}
          {techComparisons.map((item) => (
            <TechComparisonCard key={item.id} item={item} />
          ))}

          {/* Dynamic Snapshots (From API) */}
          {comparisons.map((item) => (
            <ComparisonCard key={item.id} item={item} />
          ))}
        </div>

        {!hasContent && (
          <div className="text-center py-40 glass-card border-white/5 bg-white/5">
            <p className="text-zinc-600 font-black uppercase tracking-[0.3em] text-[10px]">No comparison snapshots detected in this repository.</p>
          </div>
        )}
      </div>
    </div>
  );
}
