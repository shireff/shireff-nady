'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Rocket, Download } from 'lucide-react';
import Button from '@/components/ui/Button';
import { siteConfig } from '@/config/site';
import { generateBlurDataURL, shouldUnoptimizeImage, getImageSizes } from '@/lib/imageUtils';

interface HeroProps {
    initialHeroImage: string;
    defaultHeroImage: string;
}

const Hero: React.FC<HeroProps> = ({
    initialHeroImage,
    defaultHeroImage
}) => {
    // Internal state management for image fallback and loading
    const [heroImage, setHeroImage] = useState<string>(initialHeroImage || defaultHeroImage);
    const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

    const handleImageError = () => {
        if (!hasError) {
            setHeroImage(defaultHeroImage);
            setHasError(true);
            setIsImageLoading(false);
        }
    };

    return (
        <section className="relative min-h-[90vh] flex items-center px-4 md:px-6 overflow-hidden">
            {/* Background Ambient Elements */}
            <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse transition-all -z-10" />
            <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-emerald-600/10 blur-[100px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                {/* LEFT: Content Area */}
                <div className="space-y-8 md:space-y-10 order-2 lg:order-1 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-blue-500/20 text-blue-400 text-xs md:text-sm font-bold uppercase tracking-[0.2em]"
                    >
                        <Rocket size={14} className="animate-bounce md:w-4 md:h-4" />
                        <span>Front-End Developer</span>
                    </motion.div>

                    <div className="space-y-4 md:space-y-6">
                        <h1
                            className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black italic tracking-tighter leading-[0.9] uppercase"
                        >
                            Building <br />
                            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent p-1">
                                Great <br /> Softwares
                            </span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 1, scale: 1, rotate: 0 }}
                            className="text-zinc-400 text-lg md:text-2xl max-w-2xl font-medium leading-relaxed mx-auto lg:mx-0"
                        >
                            I build fast, reliable web apps with clean design and attention to detail.
                        </motion.p>
                    </div>

                    <motion.div

                        initial={{ opacity: 1, scale: 1, rotate: 0 }}
                        className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4"
                    >
                        <Link href="/projects">
                            <Button size="lg" className="h-14 md:h-16 px-6 md:px-10 gap-2 md:gap-3 rounded-full font-black italic text-base md:text-lg shadow-2xl shadow-blue-500/20 group">
                                VIEW MY WORK <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform md:w-[22px] md:h-[22px]" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="glass" size="lg" className="h-14 md:h-16 px-6 md:px-10 rounded-full font-black italic text-base md:text-lg border-white/5 hover:bg-white/10">
                                CONTACT
                            </Button>
                        </Link>
                        <a
                            href={siteConfig.links.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button variant="outline" size="lg" className="h-14 md:h-16 px-6 md:px-10 rounded-full font-black italic text-base md:text-lg border-white/10 hover:bg-white/5 flex items-center gap-2">
                                <Download size={18} className="md:w-5 md:h-5" />
                                MY RESUME
                            </Button>
                        </a>
                    </motion.div>
                </div>

                {/* RIGHT: Visual Element */}
                <div className="relative flex justify-center items-center order-1 lg:order-2">
                    <motion.div
                        initial={{ opacity: 1, scale: 1, rotate: 0 }}
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
                                    {/* Removed skeleton to allow immediate image appearance */}
                                    <Image
                                        key={heroImage}
                                        src={heroImage}
                                        alt={`${siteConfig.name} - Front-End Developer`}
                                        fill
                                        sizes={getImageSizes('hero')}
                                        priority
                                        placeholder="blur"
                                        blurDataURL={generateBlurDataURL(heroImage)}
                                        unoptimized={shouldUnoptimizeImage(heroImage)}
                                        onLoad={() => setIsImageLoading(false)}
                                        onError={handleImageError}
                                        className={`object-cover transition-all duration-500 scale-110 group-hover:scale-100 opacity-100 grayscale hover:grayscale-0`}
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
