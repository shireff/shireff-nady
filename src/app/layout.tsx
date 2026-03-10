import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIHelper from "@/components/ui/AIHelper";

import { siteConfig } from "@/config/site";
import { StoreProvider } from "@/store/Provider";
import { ThemeProvider } from "@/components/Provider/ThemeProvider";
import SWRProvider from "@/components/Provider/SWRProvider";
import NotificationManager from "@/components/ui/NotificationManager";
import { NotificationPrompt } from "@/components/features/notifications/NotificationPrompt";
import { getMimeType } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#02040a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: '/fav/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/fav/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/fav/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/fav/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
      { url: '/fav/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/fav/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/fav/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/fav/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/fav/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/fav/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/fav/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/fav/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/fav/favicon-96x96.png',
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/fav/apple-icon-precomposed.png',
      },
    ],
  },
  manifest: '/fav/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: siteConfig.name,
  },
  other: {
    'msapplication-TileColor': '#02040a',
    'msapplication-TileImage': '/fav/ms-icon-144x144.png',
    'msapplication-config': '/fav/browserconfig.xml',
  },
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  keywords: siteConfig.seo.keywords,
  alternates: {
    canonical: "./",
  },
  verification: {
    google: "QajwK8zAMPQjckKLANrD_5YFHjDsCJRns24cWmLSMsE",
  },
  openGraph: {
    title: `${siteConfig.author.name} - Front-End Developer & Web Developer`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: `${siteConfig.name} | Front-End Developer`,
    type: "website",
    locale: siteConfig.locale,
    alternateLocale: siteConfig.alternateLocale,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.author.name} Portfolio - Front-End Developer`,
        type: getMimeType(siteConfig.ogImage),
      },
      ...siteConfig.personalImages.map(img => ({
        url: `${siteConfig.url}${img.url}`,
        width: 800,
        height: 800,
        alt: img.title,
        type: getMimeType(img.url),
      }))
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Front-End Developer`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.author.twitter,
    site: siteConfig.author.twitter,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Comprehensive structured data for SEO
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": siteConfig.author.name,
    "alternateName": siteConfig.author.alternateName,
    "jobTitle": siteConfig.seo.structuredData.jobTitle,
    "description": siteConfig.description,
    "url": siteConfig.url,
    "image": [
      siteConfig.ogImage,
      ...siteConfig.personalImages.map(img => `${siteConfig.url}${img.url}`)
    ],
    "email": siteConfig.author.email,
    "telephone": siteConfig.author.phone,
    "sameAs": [
      siteConfig.author.linkedin,
      siteConfig.author.github,
      siteConfig.links.twitter
    ],
    "worksFor": {
      "@type": "Organization",
      "name": siteConfig.seo.structuredData.organization
    },
    "knowsAbout": siteConfig.seo.structuredData.knowsAbout,
    "knowsLanguage": siteConfig.seo.structuredData.knowsLanguage.map(lang => ({
      "@type": "Language",
      "name": lang.name,
      "alternateName": lang.code
    })),
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Professional Experience",
        "name": `${siteConfig.seo.structuredData.experienceYears}+ Years of Web Development Experience`
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "EG",
      "addressLocality": siteConfig.author.location
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": `${siteConfig.name} - Front-End Developer Portfolio`,
    "url": siteConfig.url,
    "description": siteConfig.description,
    "author": {
      "@type": "Person",
      "name": siteConfig.author.name
    },
    "inLanguage": siteConfig.languages.primary,
    "copyrightYear": new Date().getFullYear(),
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.url}/projects?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const professionalServiceSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": `${siteConfig.name} - Web Development Services`,
      "description": siteConfig.description,
      "url": siteConfig.url,
      "image": siteConfig.ogImage,
      "priceRange": siteConfig.seo.structuredData.priceRange,
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "EG"
      },
      "areaServed": {
        "@type": "Place",
        "name": siteConfig.seo.structuredData.areaServed
      },
      "availableLanguage": siteConfig.seo.structuredData.knowsLanguage.map(lang => lang.name),
      "serviceType": siteConfig.seo.structuredData.serviceTypes
    };


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Language Alternatives for SEO */}
        {siteConfig.languages.hrefLang.map((lang) => (
          <link key={lang.lang} rel="alternate" hrefLang={lang.lang} href={lang.url} />
        ))}
        
        {/* DNS Prefetch & Preconnect for Performance */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data Schemas */}
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="professional-service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {/* Semantic Image Injection for SEO - Visually Hidden */}
        <div
          className="sr-only"
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: '0',
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            borderWidth: '0'
          }}
        >
          <img src="/personal/shireff-1.webp" alt="Shireff Nady - Front-End Engineer" width="800" height="800" />
          <img src="/personal/shireff-2.webp" alt="Shireff Nady - Web Developer" width="800" height="800" />
          <img src="/personal/shireff-3.webp" alt="Shireff - Senior Front-End Engineer" width="800" height="800" />
          <img src="/personal/shireff-4.webp" alt="Shireff Nady - React Specialist" width="800" height="800" />
          <img src="/personal/shireff-5.webp" alt="Shireff Nady - Full Stack Developer" width="800" height="800" />
        </div>

        <div className="noise-overlay" />
        <StoreProvider>
          <SWRProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <NotificationManager />
              <Navbar />
              <main className="flex-grow pt-20">
                {children}
              </main>
              <Footer />
              <AIHelper />
              <NotificationPrompt />
            </ThemeProvider>
          </SWRProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
