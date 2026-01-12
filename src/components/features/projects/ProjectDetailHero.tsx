'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProjectDetailHeroProps {
    src: string;
    alt: string;
}

export default function ProjectDetailHero({ src, alt }: ProjectDetailHeroProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="absolute inset-0 z-0">
            {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-background">
                    <div className="w-full h-full animate-pulse bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin shadow-[0_0_20px_rgba(59,130,246,0.2)]" />
                    </div>
                </div>
            )}
            <Image
                src={src}
                alt={alt}
                fill
                priority
                unoptimized={src.includes('licdn.com')}
                className={`object-cover transition-all duration-1000 ${isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
                sizes="100vw"
                onLoad={() => setIsLoading(false)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-20 transition-colors duration-500" />
        </div>
    );
}
