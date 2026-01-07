import { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
    title: `Contact Hub | ${siteConfig.name}`,
    description: `Connect with Shireff Nady through LinkedIn, GitHub, WhatsApp, or direct call. One-stop hub for all professional contact channels.`,
    alternates: {
        canonical: `${siteConfig.url}/contact-hub`,
    },
};

export default function ContactHubLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
