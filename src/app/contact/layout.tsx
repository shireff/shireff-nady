import { siteConfig } from '@/config/site';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: `Contact | ${siteConfig.name} - Portfolio`,
    description: `Get in touch with ${siteConfig.author.name} for front-end development projects, consulting, or technical collaborations.`,
    alternates: {
        canonical: `${siteConfig.url}/contact`,
    }
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
