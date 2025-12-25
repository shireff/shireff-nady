import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact | Shireff Nady - Portfolio',
    description: 'Get in touch with Shireff Nady for front-end development projects, consulting, or technical collaborations.',
    alternates: {
        canonical: 'https://shireff-nady.vercel.app/contact',
    }
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
