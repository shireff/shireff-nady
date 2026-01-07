import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
    title: `Verification Hub | ${siteConfig.name}`,
    description: `Evidence-based proof of professional skills, technical decisions, and verified recommendations for ${siteConfig.author.name}.`,
    alternates: {
        canonical: `${siteConfig.url}/verification`,
    },
};

export default function VerificationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
