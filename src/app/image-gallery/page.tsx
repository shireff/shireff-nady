import React from 'react';
import { Metadata } from 'next';
import Script from 'next/script';
import { siteConfig } from '@/config/site';

// Personal images configuration
const personalImages = [
    {
        url: '/personal/shireff-1.jpg',
        title: 'Shireff Nady - Professional Portfolio Photo 1',
        alt: 'Shireff Nady professional headshot and portfolio photo showcasing web development expertise',
    },
    {
        url: '/personal/shireff-2.jpg',
        title: 'Shireff Nady - Professional Portfolio Photo 2',
        alt: 'Shireff Nady software engineer and full-stack developer portrait',
    },
    {
        url: '/personal/shireff-3.jpg',
        title: 'Shireff Nady - Professional Portfolio Photo 3',
        alt: 'Shireff Nady web developer and software engineer professional photo',
    },
    {
        url: '/personal/shireff-4.jpg',
        title: 'Shireff Nady - Professional Portfolio Photo 4',
        alt: 'Shireff Nady full-stack developer and software architect portrait',
    },
    {
        url: '/personal/shireff-5.jpg',
        title: 'Shireff Nady - Professional Portfolio Photo 5',
        alt: 'Shireff Nady professional developer and technology consultant photo',
    },
];

// SEO Metadata
export const metadata: Metadata = {
    title: `Image Gallery | ${siteConfig.name}`,
    description: 'Professional portfolio images and photography of Shireff Nady - Full-Stack Developer, Software Engineer, and Web Development Expert',
    openGraph: {
        title: `Image Gallery | ${siteConfig.name}`,
        description: 'Professional portfolio images and photography showcasing web development projects and expertise',
        images: personalImages.map(img => ({
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
 * Hidden Image Gallery Page
 * 
 * This page exists solely for SEO purposes to help Google Images index
 * our personal portfolio photos. The images are hidden from users but
 * remain in the DOM with proper semantic markup for search engines.
 * 
 * Why this works:
 * - Images are in the DOM (crawlable)
 * - Proper alt and title attributes (SEO)
 * - Structured data for rich results
 * - Included in sitemap
 */
export default function ImageGalleryPage() {
    // Structured data for images
    const imageSchema = {
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: 'Shireff Nady Portfolio Image Gallery',
        description: 'Professional portfolio images of Shireff Nady - Full-Stack Developer',
        url: `${siteConfig.url}/image-gallery`,
        author: {
            '@type': 'Person',
            name: siteConfig.author.name,
            url: siteConfig.url,
        },
        image: personalImages.map(img => ({
            '@type': 'ImageObject',
            url: `${siteConfig.url}${img.url}`,
            caption: img.title,
            description: img.alt,
            contentUrl: `${siteConfig.url}${img.url}`,
        })),
    };

    return (
        <>
            {/* Structured Data for Google */}
            <Script
                id="image-gallery-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
            />

            {/* Hidden SEO-optimized images */}
            <div
                className="sr-only"
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
                }}
            >
                <h1>Shireff Nady Professional Portfolio Images</h1>
                <p>
                    Professional photography and portfolio images of Shireff Nady, showcasing
                    expertise in full-stack web development, software engineering, and modern
                    web technologies.
                </p>

                {personalImages.map((image, index) => (
                    <figure key={image.url}>
                        <img
                            src={image.url}
                            alt={image.alt}
                            title={image.title}
                            loading="lazy"
                            width={1200}
                            height={1200}
                            itemProp="image"
                        />
                        <figcaption>{image.title}</figcaption>
                    </figure>
                ))}

                {/* Additional semantic context for search engines */}
                <article itemScope itemType="https://schema.org/Person">
                    <h2 itemProp="name">Shireff Nady</h2>
                    <p itemProp="description">
                        Full-Stack Developer specializing in Next.js, React, Node.js, and modern
                        web technologies. Professional portfolio showcasing cutting-edge web
                        development projects and expertise.
                    </p>
                    <meta itemProp="url" content={siteConfig.url} />
                </article>
            </div>

            {/* Visible content for users who somehow land here */}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
                <div className="text-center space-y-8 px-6">
                    <h1 className="text-6xl font-black italic text-white">
                        Nothing to See Here
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        This page exists for search engine optimization purposes. Please visit
                        the main site to view the portfolio.
                    </p>
                    <a
                        href="/"
                        className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-600/50"
                    >
                        Go to Homepage
                    </a>
                </div>
            </div>
        </>
    );
}
