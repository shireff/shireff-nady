import React from 'react';
import { Metadata } from 'next';
import Script from 'next/script';
import { siteConfig } from '@/config/site';

// Configured Portfolio Images for Indexing
const indexedImages = [
    {
        url: '/personal/shireff-1.jpg',
        title: 'Shireff Nady - Professional Portfolio Photo 1',
        description: 'Shireff Nady professional headshot and portfolio photo showcasing web development expertise.',
        type: 'Portrait'
    },
    {
        url: '/personal/shireff-2.jpg',
        title: 'Shireff Nady - Professional Portfolio Photo 2',
        description: 'Shireff Nady software engineer and full-stack developer portrait.',
        type: 'Professional'
    },
    {
        url: '/personal/shireff-3.jpg',
        title: 'Shireff Nady - Professional Portfolio Photo 3',
        description: 'Shireff Nady web developer and software engineer professional photo.',
        type: 'Candid'
    },
    {
        url: '/personal/shireff-4.jpg',
        title: 'Shireff Nady - Professional Portfolio Photo 4',
        description: 'Shireff Nady full-stack developer and software architect portrait.',
        type: 'Studio'
    },
    {
        url: '/personal/shireff-5.jpg',
        title: 'Shireff Nady - Professional Portfolio Photo 5',
        description: 'Shireff Nady professional developer and technology consultant photo.',
        type: 'Workspace'
    },
];

export const metadata: Metadata = {
    title: `Digital Asset Index | ${siteConfig.name}`,
    description: 'Verified digital portfolio assets and professional identity verification for Shireff Nady. Technical index of portfolio imagery.',
    openGraph: {
        title: `Digital Asset Index | ${siteConfig.name}`,
        description: 'Digital asset verification and portfolio index for Shireff Nady.',
        images: indexedImages.map(img => ({
            url: `${siteConfig.url}${img.url}`,
            alt: img.description,
        })),
        url: `${siteConfig.url}/image-gallery`,
        type: 'profile',
    },
    alternates: {
        canonical: `${siteConfig.url}/image-gallery`,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function ImageGalleryPage() {
    // Schema.org ImageGallery for Rich Results
    const imageSchema = {
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: 'Shireff Nady Portfolio Assets',
        description: 'Collection of professional portfolio images for Shireff Nady.',
        url: `${siteConfig.url}/image-gallery`,
        author: {
            '@type': 'Person',
            name: siteConfig.author.name,
            url: siteConfig.url,
        },
        image: indexedImages.map(img => ({
            '@type': 'ImageObject',
            url: `${siteConfig.url}${img.url}`,
            caption: img.title,
            description: img.description,
            contentUrl: `${siteConfig.url}${img.url}`,
            name: img.title
        })),
    };

    return (
        <div className="min-h-screen bg-[#02040a] text-gray-300 font-mono p-8 md:p-12 relative overflow-hidden">
            <Script
                id="image-gallery-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
            />

            {/* Background Tech Elements */}
            <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none select-none">
                <div className="border border-green-500/30 w-32 h-32 rounded-full border-dashed animate-spin-slow"></div>
            </div>

            <div className="max-w-4xl mx-auto space-y-12 relative z-10">

                {/* Header: High Quality Content for Page Relevance */}
                <header className="space-y-4 border-b border-gray-800 pb-8">
                    <div className="inline-flex items-center space-x-2 text-green-500/80 mb-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-xs tracking-widest uppercase">System Online</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                        Digital Identity Verification
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
                        This repository serves as the authoritative source for the digital presence of <strong className="text-white">Shireff Nady</strong>.
                        It contains verified metadata and asset references used by search engines for entity resolution and portfolio indexing.
                    </p>
                </header>

                {/* Main Content: Detailed Professional Profile (For 'Page Quality') */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-white/90 border-l-2 border-blue-500 pl-4">Professional Abstract</h2>
                        <p className="leading-relaxed">
                            Shireff Nady is a distinguished <strong>Full-Stack Engineer</strong> and <strong>Web Architect</strong> specializing in high-performance React and Next.js ecosystems.
                            With deep expertise in modern frontend delivery, he builds enterprise-grade applications that prioritize speed, accessibility, and visual fidelity.
                        </p>
                        <p className="leading-relaxed">
                            This verification page confirms the authenticity of his portfolio assets across the web, ensuring that all indexed imagery correctly attributes to his professional profile.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Asset Registry Status</h2>
                        <div className="space-y-3">
                            {indexedImages.map((img, idx) => (
                                <div key={idx} className="flex items-center justify-between text-sm py-2 border-b border-white/5 last:border-0">
                                    <span className="text-blue-400 truncate max-w-[200px]">{img.url.split('/').pop()}</span>
                                    <span className="flex items-center space-x-2">
                                        <span className="text-xs text-gray-500">{img.type}</span>
                                        <span className="text-green-500 text-xs px-2 py-0.5 bg-green-500/10 rounded">Indexed</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Technical Crawler Area: The Actual Images (Hidden from User View) */}
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        width: '1px',
                        height: '1px',
                        padding: 0,
                        margin: '-1px',
                        overflow: 'hidden',
                        clip: 'rect(0, 0, 0, 0)',
                        whiteSpace: 'nowrap',
                        border: 0,
                        opacity: 0.01 // Ensures rendering but invisible
                    }}
                >
                    <h3>Crawled Assets</h3>
                    {indexedImages.map((image) => (
                        <div key={image.url}>
                            <img
                                src={image.url}
                                alt={image.description}
                                title={image.title}
                                width={1200}
                                height={1200}
                                loading="eager" // Force load for bot
                            />
                            <p>{image.description}</p>
                        </div>
                    ))}
                </div>

                <footer className="pt-12 text-xs text-gray-600 font-mono">
                    <p>UUID: {siteConfig.url}-GALLERY-INDEX</p>
                    <p>Generated: {new Date().toISOString()}</p>
                </footer>
            </div>
        </div>
    );
}
