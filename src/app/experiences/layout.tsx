import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Professional Experience - Shireff Nady | Career Timeline',
    description: 'Explore Shireff Nady\'s professional journey, work experience, and career milestones in front-end development and web technologies.',
    keywords: [
        'Shireff Nady experience',
        'front-end developer career',
        'professional experience',
        'work history',
        'developer timeline',
        'React developer experience',
        'web development career',
    ],
    openGraph: {
        title: 'Professional Experience - Shireff Nady',
        description: 'Discover the professional journey and career milestones of front-end developer Shireff Nady.',
        url: 'https://shireff-nady.vercel.app/experiences',
        siteName: 'Shireff Nady | Front-End Developer',
        type: 'profile',
        locale: 'en_US',
        images: [
            {
                url: 'https://shireff-nady.vercel.app/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Shireff Nady Professional Experience',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Professional Experience - Shireff Nady',
        description: 'Career timeline and professional milestones in front-end development.',
        images: ['https://shireff-nady.vercel.app/og-image.jpg'],
        creator: '@shireffnady',
    },
    alternates: {
        canonical: 'https://shireff-nady.vercel.app/experiences',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ExperiencesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
