'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Linkedin, Star, ShieldCheck, Award, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { testimonialService, Testimonial } from '@/services/testimonials';

export default function Recommendations() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const data = await testimonialService.getAll();
                setTestimonials(data);
            } catch (err) {
                console.error("Failed to load testimonials:", err);
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    return (
        <section className="relative py-32 overflow-hidden bg-background">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
            <div className="absolute -top-[20%] -left-[10%] w-[40%] h-[60%] bg-blue-500/5 blur-[120px] rounded-full" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center mb-24 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md relative group"
                    >
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse group-hover:bg-blue-500/40 transition-all" />
                        <ShieldCheck size={14} className="text-blue-400 relative z-10" />
                        <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] relative z-10">
                            Verified Feedback
                        </span>
                        <div className="h-4 w-[1px] bg-blue-500/30 relative z-10" />
                        <span className="text-white text-[9px] font-black bg-blue-600 px-2 py-0.5 rounded italic relative z-10">PRO</span>
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-foreground uppercase leading-none">
                        Reviews.
                    </h2>
                    <p className="max-w-2xl text-zinc-500 font-medium text-lg leading-relaxed">
                        Real feedback from the people I&apos;ve built products with, pulled directly from LinkedIn.
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="animate-spin text-blue-500" size={40} />
                        <p className="text-zinc-500 font-black uppercase tracking-widest text-xs">Getting feedback...</p>
                    </div>
                ) : testimonials.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <AnimatePresence>
                                {testimonials.slice(0, 3).map((test, i) => (
                                    <motion.div
                                        key={test.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="relative group h-full"
                                    >
                                        {/* Premium Card Container */}
                                        <div className="h-full glass-card-premium p-10 border-glass-border backdrop-blur-3xl group-hover:border-blue-500/40 transition-all duration-700 relative flex flex-col overflow-hidden rounded-[32px]">

                                            {/* Decorative Background Elements */}
                                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full group-hover:bg-blue-600/20 transition-all duration-700" />
                                            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-indigo-600/10 blur-3xl rounded-full group-hover:bg-indigo-600/20 transition-all duration-700" />

                                            {/* Top Bar with Stars & Quote */}
                                            <div className="flex justify-between items-start mb-10">
                                                <div className="flex flex-col items-start gap-1 mt-4">
                                                    <div className="flex gap-1">
                                                        {[...Array(5)].map((_, starI) => (
                                                            <Star key={starI} size={12} className="text-amber-400 fill-amber-400" />
                                                        ))}
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Feedback</span>
                                                        <div className="flex items-center gap-1.5 py-0.5 px-2 rounded-md bg-blue-500/5 border border-blue-500/10 w-fit">
                                                            <Linkedin size={8} className="text-blue-400" />
                                                            <span className="text-[7px] font-black text-blue-400 uppercase tracking-[0.2em]">LinkedIn Verified</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-glass-bg p-4 rounded-2xl group-hover:bg-blue-600 transition-all duration-500 shadow-xl shadow-glass-l2">
                                                    <Quote size={24} className="text-blue-500 group-hover:text-white fill-current/10" />
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-grow relative z-10">
                                                <p className="text-zinc-500 dark:text-zinc-300 text-lg leading-relaxed font-medium mb-10 italic line-clamp-5 group-hover:text-foreground transition-colors">
                                                    &ldquo;{test.content}&rdquo;
                                                </p>
                                            </div>

                                            {/* Footer with Avatar & Info */}
                                            <div className="pt-8 border-t border-glass-border flex items-center justify-between mt-auto">
                                                <div className="flex items-center gap-5">
                                                    {/* Avatar with Glow */}
                                                    <div className="relative">
                                                        <div className="absolute inset-0 bg-blue-500/40 blur-xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        <div className="w-16 h-16 rounded-3xl bg-glass-bg border border-glass-border flex items-center justify-center text-zinc-400 overflow-hidden relative z-10">
                                                            {test.avatar ? (
                                                                <Image
                                                                    src={test.avatar.replace(/^http:\/\//, 'https://')}
                                                                    alt={test.name}
                                                                    fill
                                                                    unoptimized={test.avatar.includes('licdn.com')}
                                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                                />
                                                            ) : (
                                                                <span className="font-black text-xs">{test.name.charAt(0)}</span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1">
                                                        <h4 className="font-black text-foreground text-sm uppercase tracking-wider line-clamp-1 group-hover:text-blue-500 transition-colors">
                                                            {test.name}
                                                        </h4>
                                                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-tight line-clamp-1">
                                                            {test.role}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <div className="w-1 h-1 rounded-full bg-blue-500" />
                                                            <span className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">
                                                                {test.relationship}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <a
                                                    href={test.linkedinUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="p-3 rounded-2xl bg-glass-bg border border-glass-border text-zinc-500 hover:text-white hover:bg-blue-600 hover:border-blue-400 transition-all group/link"
                                                >
                                                    <Linkedin size={20} className="group-hover/link:scale-110 transition-transform" />
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {testimonials.length > 3 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="mt-16 flex justify-center"
                            >
                                <Link
                                    href="/recommendations"
                                    className="group relative inline-flex items-center gap-3 px-10 py-4 bg-glass-bg border border-glass-border rounded-full hover:bg-blue-600 transition-all duration-500"
                                >
                                    <span className="text-xs font-black uppercase tracking-[0.3em] text-foreground group-hover:text-white">Read More</span>
                                    <Award className="w-4 h-4 text-blue-500 group-hover:text-white group-hover:rotate-12 transition-all" />

                                    {/* Badge for count */}
                                    <span className="absolute -top-3 -right-3 px-2 py-1 bg-blue-600 rounded-lg text-[9px] font-black text-white shadow-lg border border-blue-400/20">
                                        +{testimonials.length - 3} MORE
                                    </span>
                                </Link>
                            </motion.div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20 px-10 rounded-[40px] border border-dashed border-glass-border bg-glass-bg">
                        <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Nothing here yet!</p>
                    </div>
                )}


            </div>
        </section>
    );
}
