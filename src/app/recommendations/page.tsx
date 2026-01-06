'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Linkedin, Star, ShieldCheck, Award, Loader2, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { testimonialService, Testimonial } from '@/services/testimonials';

export default function RecommendationsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const data = await testimonialService.getAll();
                setTestimonials(data);
            } catch (err) {
                console.error("Failed to load testimonials:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    return (
        <main className="min-h-screen bg-[#030712] pt-32 pb-24 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16">
                    <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group mb-8">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Back to Overview</span>
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] w-fit"
                            >
                                Feedback & Praises
                            </motion.div>
                            <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter text-white">
                                RECOMMENDATIONS
                            </h1>
                            <p className="max-w-xl text-zinc-500 font-medium text-lg italic">
                                A few words from the people I&apos;ve worked with and helped over the years.
                            </p>
                        </div>

                        {!isLoading && (
                            <div className="bg-white/[0.03] border border-white/5 px-8 py-6 rounded-[32px] backdrop-blur-xl">
                                <div className="text-3xl font-black text-white italic tracking-tighter mb-1">
                                    {testimonials.length} REVIEWS
                                </div>
                                <div className="text-[10px] text-blue-500 font-black uppercase tracking-[0.3em]">
                                    LinkedIn Verified
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-6">
                        <div className="relative">
                            <Loader2 className="animate-spin text-blue-600" size={64} />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-500/20 blur-xl animate-pulse" />
                        </div>
                        <p className="text-zinc-500 font-black uppercase tracking-[0.5em] text-[10px] animate-pulse">Loading feedback...</p>
                    </div>
                ) : testimonials.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {testimonials.map((test, i) => (
                                <motion.div
                                    key={test.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="relative group h-full"
                                >
                                    {/* Premium Card Container */}
                                    <div className="h-full glass-card-premium p-10 border-white/10 bg-white/[0.01] backdrop-blur-3xl group-hover:border-blue-500/40 transition-all duration-700 relative flex flex-col overflow-hidden rounded-[40px]">

                                        {/* Decorative Background Elements */}
                                        <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-600/10 blur-[80px] rounded-full group-hover:bg-blue-600/20 transition-all duration-700" />
                                        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-600/10 blur-[80px] rounded-full group-hover:bg-indigo-600/20 transition-all duration-700" />

                                        {/* Top Bar with Stars & Quote */}
                                        <div className="flex justify-between items-start mb-10 relative z-10">
                                            <div className="flex flex-col items-start gap-1.5 mt-4">
                                                <div className="flex gap-1">
                                                    {[...Array(5)].map((_, starI) => (
                                                        <Star key={starI} size={14} className="text-amber-400 fill-amber-400" />
                                                    ))}
                                                </div>
                                                <div className="flex flex-col items-start gap-1.5">
                                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                                                        <ShieldCheck size={10} className="text-blue-400" />
                                                        <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest leading-none">Verified</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/5">
                                                        <Linkedin size={8} className="text-zinc-500" />
                                                        <span className="text-[7px] font-black text-zinc-500 uppercase tracking-[0.2em]">Synced from LinkedIn</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-white/5 p-5 rounded-3xl group-hover:bg-blue-600 transition-all duration-500 shadow-2xl shadow-black/40">
                                                <Quote size={28} className="text-blue-400 group-hover:text-white fill-current/10" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-grow relative z-10">
                                            <p className="text-zinc-300 text-lg leading-relaxed font-medium mb-12 italic group-hover:text-white transition-colors">
                                                &ldquo;{test.content}&rdquo;
                                            </p>
                                        </div>

                                        {/* Footer with Avatar & Info */}
                                        <div className="pt-10 border-t border-white/5 flex items-center justify-between mt-auto relative z-10">
                                            <div className="flex items-center gap-6">
                                                {/* Avatar with Glow */}
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-blue-500/40 blur-xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400 overflow-hidden relative z-10">
                                                        {test.avatar ? (
                                                            <Image
                                                                src={test.avatar.replace(/^http:\/\//, 'https://')}
                                                                alt={test.name}
                                                                fill
                                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                                sizes="64px"
                                                            />
                                                        ) : (
                                                            <span className="font-black text-lg">{test.name.charAt(0)}</span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="space-y-1.5">
                                                    <h4 className="font-black text-white text-base uppercase tracking-wider group-hover:text-blue-400 transition-colors">
                                                        {test.name}
                                                    </h4>
                                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-tight">
                                                        {test.role}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Award size={10} className="text-blue-600" />
                                                        <span className="text-[9px] text-zinc-600 font-black uppercase tracking-widest leading-none">
                                                            {test.relationship}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <a
                                                href={test.linkedinUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-4 rounded-3xl bg-white/5 border border-white/5 text-zinc-600 hover:text-white hover:bg-[#0077b5] hover:border-blue-400 transition-all group/link"
                                            >
                                                <Linkedin size={24} className="group-hover/link:scale-110 transition-transform" />
                                            </a>
                                        </div>

                                        <div className="mt-8 flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity">
                                            <span className="text-[9px] text-zinc-700 font-black uppercase tracking-widest">
                                                Certified: {new Date(test.date).toLocaleDateString()}
                                            </span>
                                            <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500/50 to-transparent rounded-full" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="text-center py-40 rounded-[64px] border border-dashed border-white/10 bg-white/[0.01]">
                        <RefreshCw size={48} className="mx-auto text-zinc-800 mb-6" />
                        <h3 className="text-xl font-black text-zinc-600 uppercase tracking-widest">Nothing here yet</h3>
                        <p className="text-zinc-700 font-bold uppercase tracking-widest text-[10px] mt-2">I&apos;m currently pulling my latest recommendations from LinkedIn!</p>
                    </div>
                )}
            </div>
        </main>
    );
}

const RefreshCw = ({ size, className }: { size?: number, className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M8 16H3v5" />
    </svg>
);
