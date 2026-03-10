import { siteConfig } from '@/config/site';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: `${siteConfig.name} - Professional Experience | Career Timeline`,
    description: `Explore ${siteConfig.author.name}'s professional journey, work experience, and career milestones in front-end development and web technologies.`,
    keywords: [
        `${siteConfig.author.name} experience`,
        'front-end developer career',
        'professional experience',
        'work history',
        'developer timeline',
        'React developer experience',
        'web development career',
    ],
    openGraph: {
        title: `${siteConfig.name} - Professional Experience | Career Timeline`,
        description: `Discover the professional journey and career milestones of front-end developer ${siteConfig.author.name}.`,
        url: `${siteConfig.url}/experiences`,
        siteName: `${siteConfig.name} | Front-End Developer`,
        type: 'profile',
        locale: siteConfig.locale,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: `${siteConfig.author.name} Professional Experience`,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `Professional Experience - ${siteConfig.name}`,
        description: 'Career timeline and professional milestones in front-end development.',
        images: [siteConfig.ogImage],
        creator: siteConfig.author.twitter,
    },
    alternates: {
        canonical: `${siteConfig.url}/experiences`,
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
