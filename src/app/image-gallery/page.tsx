import { Metadata } from 'next';
import Script from 'next/script';
import { siteConfig } from '@/config/site';

// SEO Metadata
export const metadata: Metadata = {
    title: `Image Gallery | ${siteConfig.name}`,
    description: `Professional portfolio images and photography of ${siteConfig.author.name} - Full-Stack Developer, Software Engineer, and Web Development Expert`,
    openGraph: {
        title: `Image Gallery | ${siteConfig.name}`,
        description: 'Professional portfolio images and photography showcasing web development projects and expertise',
        images: siteConfig.personalImages.map(img => ({
            url: `${siteConfig.url}${img.url}`,
            alt: img.alt,
        })),
        url: `${siteConfig.url}/image-gallery`,
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
        },
    },
};

/**
 * Image Gallery Page for SEO
 * 
 * This page is optimized for Google Images indexing. It combines a visually hidden
 * SEO container (that keeps images in the DOM at non-zero size) with a tiny visible
 * thumbnail gallery to satisfy Google's visibility requirements.
 */
export default function ImageGalleryPage() {
    // Structured data for images
    const imageSchema = {
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: `${siteConfig.author.name} Portfolio Image Gallery`,
        description: `Professional portfolio images of ${siteConfig.author.name} - Full-Stack Developer`,
        url: `${siteConfig.url}/image-gallery`,
        author: {
            '@type': 'Person',
            name: siteConfig.author.name,
            url: siteConfig.url,
        },
        image: siteConfig.personalImages.map(img => ({
            '@type': 'ImageObject',
            url: `${siteConfig.url}${img.url}`,
            caption: img.title,
            description: img.alt,
            contentUrl: `${siteConfig.url}${img.url}`,
        })),
    };

    return (
        <main className="relative min-h-screen bg-black">
            {/* Structured Data for Google */}
            <Script
                id="image-gallery-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
            />

            {/* 1. SEO Image Container: Hidden but present in DOM with non-zero dimensions */}
            <div
                aria-hidden="true"
                className="absolute inset-0 z-[-1] opacity-[0.01] pointer-events-none overflow-hidden"
                style={{ height: '1px', width: '1px' }}
            >
                <h1>{siteConfig.author.name} Professional Portfolio Images</h1>
                <p>
                    Professional photography and portfolio images of {siteConfig.author.name}, showcasing
                    expertise in full-stack web development, software engineering, and modern
                    web technologies.
                </p>

                {siteConfig.personalImages.map((image) => (
                    <figure key={image.url} itemScope itemType="https://schema.org/ImageObject">
                        <img
                            src={image.url}
                            alt={image.alt}
                            title={image.title}
                            loading="eager" // Load these for indexing
                            width={1200}
                            height={1200}
                            itemProp="contentUrl"
                        />
                        <figcaption itemProp="caption">{image.title}</figcaption>
                        <meta itemProp="name" content={image.title} />
                        <meta itemProp="description" content={image.alt} />
                    </figure>
                ))}

                {/* Additional semantic context */}
                <article itemScope itemType="https://schema.org/Person">
                    <h2 itemProp="name">{siteConfig.author.name}</h2>
                    <p itemProp="description">{siteConfig.description}</p>
                    <meta itemProp="url" content={siteConfig.url} />
                </article>
            </div>

            {/* 2. Main Page Content (Visually Appealing) */}
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden relative p-6">
                {/* Background Blobs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] pointer-events-none animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px] pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

                <div className="relative z-10 p-8 md:p-12 max-w-2xl mx-auto text-center space-y-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl">
                    <div className="space-y-3">
                        <h1 className="text-4xl md:text-6xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-sm">
                            Portfolio Assets
                        </h1>
                        <div className="h-1.5 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                    </div>

                    <p className="text-base md:text-lg text-gray-400 leading-relaxed font-light">
                        This repository directory contains indexed professional assets for{' '}
                        <span className="text-white font-medium">{siteConfig.author.name}</span>.
                        The content here is optimized for search visibility.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="/"
                            className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-2xl transition-all duration-300 border border-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-95 overflow-hidden"
                        >
                            <span className="relative z-10">Back to Portfolio</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </a>
                    </div>
                </div>

                {/* 3. Tiny Thumbnail Gallery for Google Visibility (Bottom) */}
                <div className="mt-12 md:mt-16 z-10 max-w-4xl w-full px-4">
                    <h2 className="text-xs uppercase tracking-[0.3em] text-gray-500 font-bold mb-6 text-center">
                        Indexed Visual Assets
                    </h2>
                    <div className="grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-3 justify-center opacity-40 hover:opacity-100 transition-opacity duration-500">
                        {siteConfig.personalImages.map((image, idx) => (
                            <div
                                key={`thumb-${idx}`}
                                className="aspect-square relative rounded-md overflow-hidden bg-white/5 border border-white/10 group cursor-default"
                            >
                                <img
                                    src={image.url}
                                    alt={image.alt}
                                    title={image.title}
                                    className="object-cover w-full h-full filter grayscale group-hover:grayscale-0 transition-all duration-300 scale-110 group-hover:scale-100"
                                    loading="lazy"
                                />
                                {/* Tooltip on hover */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1">
                                    <span className="text-[6px] text-white text-center leading-tight">VIEW</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

