'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Smartphone, Linkedin, Github, ArrowRight, ExternalLink } from 'lucide-react';

export default function ContactHub() {
    const contactLinks = [
        {
            name: 'WhatsApp',
            handle: '+201274068946',
            url: 'https://wa.me/201274068946',
            icon: MessageSquare,
            color: 'from-emerald-600/20 to-emerald-400/20',
            border: 'border-emerald-500/20',
            iconColor: 'text-emerald-400',
        },
        {
            name: 'LinkedIn',
            handle: 'Shireff Nady',
            url: 'https://www.linkedin.com/in/shireffnady/',
            icon: Linkedin,
            color: 'from-blue-600/20 to-blue-400/20',
            border: 'border-blue-500/20',
            iconColor: 'text-blue-400',
        },
        {
            name: 'GitHub',
            handle: 'Shireff',
            url: 'https://github.com/shireff',
            icon: Github,
            color: 'from-zinc-600/20 to-zinc-400/20',
            border: 'border-zinc-500/20',
            iconColor: 'text-white',
        },
        {
            name: 'Phone Call',
            handle: '+201274068946',
            url: 'tel:+201274068946',
            icon: Smartphone,
            color: 'from-sky-600/20 to-sky-400/20',
            border: 'border-sky-500/20',
            iconColor: 'text-sky-400',
        },
    ];

    return (
        <div className="min-h-screen bg-[#02040a] text-white flex flex-col items-center px-6 py-12 md:py-24">
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-blue-600/5 blur-[100px] rounded-full" />
                <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-emerald-600/5 blur-[100px] rounded-full" />
            </div>

            <div className="max-w-md w-full relative z-10 space-y-12">
                {/* Profile / Header */}
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-24 h-24 rounded-full mx-auto p-1 bg-gradient-to-r from-blue-500 to-emerald-500 shadow-2xl overflow-hidden mb-6"
                    >
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center p-1">
                            {/* Placeholder for Profile Img */}
                            <div className="w-full h-full rounded-full bg-zinc-800 animate-pulse" />
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-1"
                    >
                        <h1 className="text-3xl font-black italic tracking-tighter uppercase">Shireff Nady</h1>
                        <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px]">Senior Front-End Engineer</p>
                    </motion.div>
                </div>

                {/* Links Container */}
                <div className="space-y-4">
                    {contactLinks.map((link, idx) => (
                        <motion.a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="block group"
                        >
                            <div className={`relative overflow-hidden glass-card p-5 border ${link.border} bg-gradient-to-r ${link.color} flex items-center justify-between group-hover:scale-[1.02] transition-all duration-300`}>
                                <div className="flex items-center gap-5">
                                    <div className={`p-3 rounded-2xl bg-black/40 ${link.iconColor}`}>
                                        <link.icon size={24} />
                                    </div>
                                    <div>
                                        <h2 className="font-black italic text-sm tracking-widest uppercase">{link.name}</h2>
                                        <p className="text-zinc-400 text-xs font-medium">{link.handle}</p>
                                    </div>
                                </div>
                                <div className="p-2 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                                    <ExternalLink size={16} />
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Footer */}
                <div className="text-center pt-8">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-6">Transmitting Excellence since 2020</p>
                    <motion.button
                        onClick={() => window.location.href = '/'}
                        className="inline-flex items-center gap-2 text-blue-400 text-[10px] font-black uppercase tracking-widest hover:underline"
                    >
                        Back to Portfolio <ArrowRight size={14} />
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
