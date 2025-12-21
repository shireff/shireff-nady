import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact - Shireff Nady | Get in Touch',
    description: 'Get in touch with Shireff Nady for web development projects, collaborations, or inquiries. Available for freelance work and consulting.',
    keywords: [
        'contact Shireff Nady',
        'hire front-end developer',
        'web developer contact',
        'freelance developer',
        'React developer hire',
        'Next.js consultant',
        'web development services',
    ],
    openGraph: {
        title: 'Contact Shireff Nady - Front-End Developer',
        description: 'Ready to start your next project? Get in touch for web development services and consultations.',
        url: 'https://shireff-nady.vercel.app/contact',
        siteName: 'Shireff Nady | Front-End Developer',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: 'https://shireff-nady.vercel.app/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Contact Shireff Nady',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Shireff Nady',
        description: 'Get in touch for web development projects and collaborations.',
        images: ['https://shireff-nady.vercel.app/og-image.jpg'],
        creator: '@shireffnady',
    },
    alternates: {
        canonical: 'https://shireff-nady.vercel.app/contact',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
