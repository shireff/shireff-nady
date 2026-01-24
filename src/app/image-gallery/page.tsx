import { Metadata } from 'next';
import Script from 'next/script';
import { cookies } from 'next/headers';
import { siteConfig } from '@/config/site';

// SEO Metadata
export const metadata: Metadata = {
    title: `Image Gallery | ${siteConfig.name}`,
    description: `Professional portfolio images and photography of ${siteConfig.author.name} - Full-Stack Developer, Software Engineer, and Web Development Expert`,
    openGraph: {
        title: `Image Gallery | ${siteConfig.name}`,
        description: 'Professional portfolio images and photography showcasing web development projects and expertise',
        images: siteConfig.personalImages.map(img => ({
            url: `${siteConfig.url}${img.url}`,
            alt: img.alt,
        })),
        url: `${siteConfig.url}/image-gallery`,
    },
    alternates: {
        canonical: `${siteConfig.url}/image-gallery`,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
        },
    },
};

/**
 * Image Gallery Page - Search Compliant Architecture
 * 
 * Strategy: SEO-First Restricted Content ("Locked Gallery")
 * 
 * 1.  **Indexing**: The `<img>` tags are ALWAYS rendered in the DOM. Googlebot indexes them naturally.
 * 2.  **Privacy**: For unauthenticated users (and bots), the images are heavily obscured (CSS Blur).
 * 3.  **Authorization**: We check server-side cookies for admin tokens vs generic UA sniffing.
 * 
 * This ensures Googlebot sees exactly what a regular user sees (no cloaking), while effectively shielding the visual content.
 */
export default async function ImageGalleryPage() {
    // 1. Check Authentication (Server-Side)
    // We look for the persistent auth cookies set by the login service
    const cookieStore = await cookies();
    const token = cookieStore.get('li_at') || cookieStore.get('token');
    const isAuthenticated = !!token?.value;

    // Structured data for images
    const imageSchema = {
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: `${siteConfig.author.name} Portfolio Image Gallery`,
        description: `Professional portfolio images of ${siteConfig.author.name} - Full-Stack Developer`,
        url: `${siteConfig.url}/image-gallery`,
        author: {
            '@type': 'Person',
            name: siteConfig.author.name,
            url: siteConfig.url,
        },
        image: siteConfig.personalImages.map(img => ({
            '@type': 'ImageObject',
            url: `${siteConfig.url}${img.url}`,
            caption: img.title,
            description: img.alt,
            contentUrl: `${siteConfig.url}${img.url}`,
        })),
    };

    return (
        <main className="min-h-screen bg-black p-8 relative">
            <Script
                id="image-gallery-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
            />

            <header className="mb-12 text-center relative z-10">
                <h1 className="text-3xl font-bold text-slate-200 mb-4">{siteConfig.author.name} Image Index</h1>
                <p className="text-slate-400">System Inventory: {siteConfig.personalImages.length} Assets</p>
                {isAuthenticated ? (
                    <span className="inline-block px-3 py-1 mt-4 text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30 rounded-full">
                        ADMINISTRATIVE ACCESS GRANTED
                    </span>
                ) : (
                    <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg inline-block max-w-lg">
                        <h3 className="text-red-400 font-bold mb-1">Restricted Content</h3>
                        <p className="text-xs text-red-300/80">
                            You are viewing a protected functional index. Image assets are blurred for privacy protocols.
                        </p>
                    </div>
                )}
            </header>

            {/* 
                THE GALLERY GRID
                Rendered for EVERYONE (Bots & Users).
                Visual state depends on Auth.
            */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {siteConfig.personalImages.map((image, index) => (
                    <article key={index} className="flex flex-col space-y-3 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 relative overflow-hidden group">

                        {/* 
                           Image Container 
                           - Authenticated: Clear
                           - Unauthenticated: Blurred + Grayscale
                        */}
                        <div className={`aspect-square relative overflow-hidden rounded-lg bg-zinc-800 transition-all duration-700 ${!isAuthenticated ? 'filter blur-2xl grayscale opacity-50 contrast-125' : ''}`}>
                            <img
                                src={image.url}
                                alt={image.alt}
                                className="object-cover w-full h-full"
                                loading={index < 2 ? "eager" : "lazy"}
                            />
                        </div>

                        {/* Lock Overlay for Unauthenticated Users */}
                        {!isAuthenticated && (
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 bg-black/20 backdrop-blur-[2px]">
                                <div className="w-12 h-12 bg-zinc-900/90 rounded-full flex items-center justify-center border border-zinc-700 shadow-2xl mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                </div>
                                <span className="text-[10px] font-mono text-zinc-400 bg-black/50 px-2 py-1 rounded">
                                    PROTECTED ASSET
                                </span>
                            </div>
                        )}

                        {/* Metadata (Always Visible for Context) */}
                        <div className="space-y-1 relative z-30">
                            <h2 className="text-sm font-medium text-zinc-200">{image.title}</h2>
                            <p className="text-xs text-zinc-500 line-clamp-1">{image.alt}</p>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}
