import { siteConfig } from '@/config/site';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: `${siteConfig.name} - Projects | Front-End Developer`,
    description: `Explore a curated collection of web applications, SaaS platforms, and digital solutions built by ${siteConfig.author.name} using React, Next.js, TypeScript, and modern web technologies.`,
    keywords: [
        'portfolio projects',
        'web development projects',
        'React projects',
        'Next.js applications',
        'SaaS platforms',
        'front-end projects',
        'JavaScript applications',
        'TypeScript projects',
        `${siteConfig.author.name} projects`,
    ],
    openGraph: {
        title: `${siteConfig.name} - Projects | Front-End Developer`,
        description: 'A showcase of high-performance web applications and digital instruments built with modern technologies.',
        url: `${siteConfig.url}/projects`,
        siteName: `${siteConfig.name} | Front-End Developer`,
        type: 'website',
        locale: siteConfig.locale,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: `${siteConfig.author.name} Projects Portfolio`,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `Projects Portfolio - ${siteConfig.name}`,
        description: 'Explore web applications and SaaS platforms built with React, Next.js, and TypeScript.',
        images: [siteConfig.ogImage],
        creator: siteConfig.author.twitter,
    },
    alternates: {
        canonical: `${siteConfig.url}/projects`,
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
