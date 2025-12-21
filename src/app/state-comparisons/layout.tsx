import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Shireff Nady - State Comparisons | Interactive Demos',
    description: 'Explore interactive state comparison demonstrations and technical showcases by Shireff Nady.',
    keywords: [
        'state comparisons',
        'interactive demos',
        'web development demos',
        'technical showcase',
        'Shireff Nady demos',
    ],
    openGraph: {
        title: 'Shireff Nady - State Comparisons | Interactive Demos',
        description: 'Interactive demonstrations and technical showcases.',
        url: 'https://shireff-nady.vercel.app/state-comparisons',
        siteName: 'Shireff Nady | Front-End Developer',
        type: 'website',
        locale: 'en_US',
        images: [
            {
                url: 'https://shireff-nady.vercel.app/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'State Comparisons by Shireff Nady',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'State Comparisons - Shireff Nady',
        description: 'Interactive demonstrations and technical showcases.',
        images: ['https://shireff-nady.vercel.app/og-image.jpg'],
        creator: '@shireffnady',
    },
    alternates: {
        canonical: 'https://shireff-nady.vercel.app/state-comparisons',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function StateComparisonsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
