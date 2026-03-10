import { siteConfig } from '@/config/site';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: `State Comparisons | ${siteConfig.name} - Portfolio`,
    description: `A technical side-by-side evaluation of migrations, architectural enhancements, and development benchmarks by ${siteConfig.author.name}.`,
    alternates: {
        canonical: `${siteConfig.url}/state-comparisons`,
    }
};

export default function StateComparisonsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
