'use client';

import React from 'react';
import { siteConfig } from '@/config/site';

export default function AvailabilityCard() {
    return (
        <div className="glass-card p-6 md:p-10 border-white/5 space-y-6">
            <h3 className="text-xl font-black italic uppercase tracking-widest text-zinc-300">Availability</h3>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2">Timezone</p>
                    <p className="text-white font-bold text-sm sm:text-base">{siteConfig.author.location === 'Egypt' ? 'GMT+2 (Egypt)' : siteConfig.author.location}</p>
                </div>
                <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2">Status</p>
                    <p className="text-emerald-400 font-bold flex items-center gap-2 text-sm sm:text-base">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        AVAILABLE
                    </p>
                </div>
            </div>
        </div>
    );
}
