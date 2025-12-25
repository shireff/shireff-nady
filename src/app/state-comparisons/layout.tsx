import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'State Comparisons | Shireff Nady - Portfolio',
    description: 'A technical side-by-side evaluation of migrations, architectural enhancements, and development benchmarks by Shireff Nady.',
    alternates: {
        canonical: 'https://shireff-nady.vercel.app/state-comparisons',
    }
};

export default function StateComparisonsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
