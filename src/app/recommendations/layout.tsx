import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import Script from 'next/script';

export const metadata: Metadata = {
    title: `Recommendations | ${siteConfig.name} - Portfolio`,
    description: `Read professional recommendations and feedback for ${siteConfig.author.name}, highlighting expertise in front-end development and software engineering.`,
    alternates: {
        canonical: `${siteConfig.url}/recommendations`,
    },
    openGraph: {
        title: `Recommendations | ${siteConfig.name}`,
        description: `Read professional recommendations and feedback for ${siteConfig.author.name}.`,
        url: `${siteConfig.url}/recommendations`,
        images: [siteConfig.ogImage],
    }
};

export default function RecommendationsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const recommendationsPageSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${siteConfig.url}/recommendations#collection`,
        "name": `Professional Recommendations for ${siteConfig.author.name}`,
        "description": `Read professional recommendations and feedback for ${siteConfig.author.name}, highlighting expertise in front-end development and software engineering.`,
        "url": `${siteConfig.url}/recommendations`,
        "isPartOf": {
            "@type": "WebSite",
            "@id": `${siteConfig.url}/#website`
        },
        "about": {
            "@type": "Person",
            "@id": `${siteConfig.url}/#person`,
            "name": siteConfig.author.name
        },
        "mainEntity": {
            "@type": "Person",
            "@id": `${siteConfig.url}/#person`,
            "name": siteConfig.author.name,
            "jobTitle": siteConfig.seo.structuredData.jobTitle
        }
    };

    return (
        <>
            <Script
                id="recommendations-page-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(recommendationsPageSchema) }}
            />
            {children}
        </>
    );
}
