import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
    title: `Recommendations | ${siteConfig.name} - Portfolio`,
    description: `Read professional recommendations and feedback for Shireff Nady, highlighting expertise in front-end development and software engineering.`,
    alternates: {
        canonical: `${siteConfig.url}/recommendations`,
    },
    openGraph: {
        title: `Recommendations | ${siteConfig.name}`,
        description: `Read professional recommendations and feedback for Shireff Nady.`,
        url: `${siteConfig.url}/recommendations`,
        images: [`${siteConfig.url}/og-image.jpg`],
    }
};

export default function RecommendationsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
