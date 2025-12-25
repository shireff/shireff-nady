'use client';

import React from 'react';
import { Mail, Smartphone } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function ContactChannels() {
    const whatsappUrl = siteConfig.links.whatsapp;
    const whatsappDisplay = siteConfig.author.whatsapp;

    return (
        <div className="space-y-12">
            <h2 className="text-3xl font-black italic border-l-4 border-blue-500 pl-6 uppercase tracking-wider text-zinc-300">Direct Channels</h2>

            <div className="space-y-6">
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block group"
                >
                    <div className="glass-card p-8 flex items-center gap-6 border-white/5 group-hover:border-emerald-500/30 transition-all bg-emerald-500/5 group-hover:bg-emerald-500/10">
                        <div className="p-4 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                            <Smartphone size={32} />
                        </div>
                        <div>
                            <p className="text-[10px] text-emerald-500 uppercase font-black tracking-widest mb-1">WhatsApp Instant</p>
                            <p className="font-bold text-white text-2xl tracking-tight">{whatsappDisplay}</p>
                        </div>
                    </div>
                </a>

                <a href={`mailto:${siteConfig.author.email}`} className="block group">
                    <div className="glass-card p-8 flex items-center gap-6 border-white/5 group-hover:border-blue-500/30 transition-all bg-blue-500/5 group-hover:bg-blue-500/10">
                        <div className="p-4 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/20">
                            <Mail size={32} />
                        </div>
                        <div>
                            <p className="text-[10px] text-blue-500 uppercase font-black tracking-widest mb-1">Email Node</p>
                            <p className="font-bold text-white text-2xl tracking-tight">{siteConfig.author.email}</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}
