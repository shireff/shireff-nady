import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Shireff Nady - Projects | Front-End Developer',
    description: 'Explore a curated collection of web applications, SaaS platforms, and digital solutions built by Shireff Nady using React, Next.js, TypeScript, and modern web technologies.',
    keywords: [
        'portfolio projects',
        'web development projects',
        'React projects',
        'Next.js applications',
        'SaaS platforms',
        'front-end projects',
        'JavaScript applications',
        'TypeScript projects',
        'Shireff Nady projects',
    ],
    openGraph: {
        title: 'Shireff Nady - Projects | Front-End Developer',
        description: 'A showcase of high-performance web applications and digital instruments built with modern technologies.',
        url: 'https://www.shireff.dev/projects',
        siteName: 'Shireff Nady | Front-End Developer',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: 'https://www.shireff.dev/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Shireff Nady Projects Portfolio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Projects Portfolio - Shireff Nady',
        description: 'Explore web applications and SaaS platforms built with React, Next.js, and TypeScript.',
        images: ['https://www.shireff.dev/og-image.jpg'],
        creator: '@shireffnady',
    },
    alternates: {
        canonical: 'https://www.shireff.dev/projects',
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
