'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Rocket, Download } from 'lucide-react';
import Button from '@/components/ui/Button';
import { siteConfig } from '@/config/site';

interface HeroProps {
    heroImage: string;
    isImageLoading: boolean;
    setIsImageLoading: (val: boolean) => void;
    defaultHeroImage: string;
    setHeroImage: (val: string) => void;
}

const Hero: React.FC<HeroProps> = ({
    heroImage,
    isImageLoading,
    setIsImageLoading,
    defaultHeroImage,
    setHeroImage
}) => {
    return (
        <section className="relative min-h-[90vh] flex items-center px-6 overflow-hidden">
            {/* Background Ambient Elements */}
            <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse transition-all -z-10" />
            <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-emerald-600/10 blur-[100px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
                {/* LEFT: Content Area */}
                <div className="space-y-10 order-2 lg:order-1 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-blue-500/20 text-blue-400 text-sm font-bold uppercase tracking-[0.2em]"
                    >
                        <Rocket size={16} className="animate-bounce" />
                        <span>Front-End Developer</span>
                    </motion.div>

                    <div className="space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter leading-[0.85] uppercase"
                        >
                            Engineering <br />
                            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                                Digital <br /> Excellence
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-zinc-400 text-xl md:text-2xl max-w-2xl font-medium leading-relaxed mx-auto lg:mx-0"
                        >
                            Architecting high-performance web systems with meticulous
                            visual design and state-of-the-art engineering.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4"
                    >
                        <Link href="/projects">
                            <Button size="lg" className="h-16 px-10 gap-3 rounded-full font-black italic text-lg shadow-2xl shadow-blue-500/20 group">
                                EXPLORE LAB <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="glass" size="lg" className="h-16 px-10 rounded-full font-black italic text-lg border-white/5 hover:bg-white/10">
                                CONNECT
                            </Button>
                        </Link>
                        <a
                            href={siteConfig.links.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button variant="outline" size="lg" className="h-16 px-10 rounded-full font-black italic text-lg border-white/10 hover:bg-white/5 flex items-center gap-2">
                                <Download size={20} />
                                DOWNLOAD CV
                            </Button>
                        </a>
                    </motion.div>
                </div>

                {/* RIGHT: Visual Element */}
                <div className="relative flex justify-center items-center order-1 lg:order-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: 'circOut' }}
                        className="relative z-10"
                    >
                        {/* Outer Glow Halo */}
                        <div className="absolute -inset-10 bg-blue-500/20 blur-[80px] rounded-full animate-pulse transition-opacity" />

                        {/* Profile Container */}
                        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px]">
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="w-full h-full rounded-full glass-card-premium p-4 md:p-6 shadow-[0_0_50px_rgba(59,130,246,0.3)] overflow-hidden"
                            >
                                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/10 group bg-zinc-900/50 flex items-center justify-center relative">
                                    {isImageLoading && (
                                        <div className="absolute inset-0 z-20 flex items-center justify-center bg-zinc-900">
                                            <div className="w-full h-full animate-pulse bg-gradient-to-br from-blue-500/10 to-emerald-500/10" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                                            </div>
                                        </div>
                                    )}
                                    <motion.img
                                        key={heroImage}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: isImageLoading ? 0 : 1 }}
                                        transition={{ duration: 0.5 }}
                                        src={heroImage}
                                        alt={siteConfig.name}
                                        onLoad={() => setIsImageLoading(false)}
                                        onError={() => {
                                            setHeroImage(defaultHeroImage);
                                            setIsImageLoading(false);
                                        }}
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                                    />
                                </div>
                            </motion.div>

                            {/* Animated Orbitals / Tech Icons (Decorative) */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                className="absolute -inset-8 border border-dashed border-blue-500/20 rounded-full pointer-events-none"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="absolute -inset-16 border border-dashed border-emerald-500/10 rounded-full pointer-events-none"
                            />

                            {/* Floating Indicators */}
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                                className="absolute top-[10%] -right-4 md:-right-8 px-4 py-2 glass-card-premium border-blue-500/30 shadow-xl"
                            >
                                <span className="text-[10px] font-black tracking-widest text-blue-400 uppercase">React & Next Dev</span>
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                className="absolute bottom-[20%] -left-4 md:-left-8 px-4 py-2 glass-card-premium border-emerald-500/30 shadow-xl"
                            >
                                <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase">UI/UX Architect</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
