'use client';

import React from 'react';
import { Mail, Smartphone } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function ContactChannels() {
    const whatsappUrl = siteConfig.links.whatsapp;
    const whatsappDisplay = siteConfig.author.whatsapp;

    return (
        <div className="space-y-8 md:space-y-12">
            <h2 className="text-2xl md:text-3xl font-black italic border-l-4 border-blue-500 pl-4 md:pl-6 uppercase tracking-wider text-zinc-300">Direct Channels</h2>

            <div className="space-y-4 md:space-y-6">
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block group"
                >
                    <div className="glass-card p-5 sm:p-6 md:p-8 flex items-center gap-4 sm:gap-6 border-white/5 group-hover:border-emerald-500/30 transition-all bg-emerald-500/5 group-hover:bg-emerald-500/10">
                        <div className="p-3 md:p-4 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 shrink-0">
                            <Smartphone size={24} className="md:w-8 md:h-8" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] text-emerald-500 uppercase font-black tracking-widest mb-1">WhatsApp Instant</p>
                            <p className="font-bold text-white text-lg sm:text-xl md:text-2xl tracking-tight truncate">{whatsappDisplay}</p>
                        </div>
                    </div>
                </a>

                <a href={`mailto:${siteConfig.author.email}`} className="block group">
                    <div className="glass-card p-5 sm:p-6 md:p-8 flex items-center gap-4 sm:gap-6 border-white/5 group-hover:border-blue-500/30 transition-all bg-blue-500/5 group-hover:bg-blue-500/10">
                        <div className="p-3 md:p-4 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/20 shrink-0">
                            <Mail size={24} className="md:w-8 md:h-8" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] text-blue-500 uppercase font-black tracking-widest mb-1">Email Node</p>
                            <p className="font-bold text-white text-lg sm:text-xl md:text-2xl tracking-tight truncate">{siteConfig.author.email}</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}
