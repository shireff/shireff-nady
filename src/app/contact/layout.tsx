import { siteConfig } from '@/config/site';
import { Metadata } from 'next';
import Script from 'next/script';

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
    const contactPageSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": `${siteConfig.url}/contact#contactpage`,
        "name": `Contact ${siteConfig.author.name}`,
        "description": `Get in touch with ${siteConfig.author.name} for front-end development projects, consulting, or technical collaborations.`,
        "url": `${siteConfig.url}/contact`,
        "isPartOf": {
            "@type": "WebSite",
            "@id": `${siteConfig.url}/#website`
        },
        "about": {
            "@type": "Person",
            "@id": `${siteConfig.url}/#person`,
            "name": siteConfig.author.name,
            "email": siteConfig.author.email,
            "telephone": siteConfig.author.phone,
            "url": siteConfig.url
        },
        "mainEntity": {
            "@type": "Person",
            "@id": `${siteConfig.url}/#person`,
            "name": siteConfig.author.name,
            "email": siteConfig.author.email,
            "telephone": siteConfig.author.phone,
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": siteConfig.author.phone,
                "contactType": "Customer Service",
                "email": siteConfig.author.email,
                "availableLanguage": ["English", "Arabic"],
                "areaServed": "Worldwide"
            }
        }
    };

    return (
        <>
            <Script
                id="contact-page-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
            />
            
            {/* Hidden SEO keywords */}
            <div className="sr-only" aria-hidden="true">
                <h2>{siteConfig.seo.keywords.filter(k => k.includes('Hire') || k.includes('Freelance') || k.includes('توظيف')).join(', ')}</h2>
            </div>
            
            {children}
        </>
    );
}
