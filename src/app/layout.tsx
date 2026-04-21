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
      { url: "/fav/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/fav/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/fav/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/fav/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/fav/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/fav/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/fav/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
      {
        url: "/fav/apple-icon-114x114.png",
        sizes: "114x114",
        type: "image/png",
      },
      {
        url: "/fav/apple-icon-120x120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        url: "/fav/apple-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        url: "/fav/apple-icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "/fav/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/fav/favicon-96x96.png",
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/fav/apple-icon-precomposed.png",
      },
    ],
  },
  manifest: "/fav/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: siteConfig.name,
  },
  other: {
    "msapplication-TileColor": "#02040a",
    "msapplication-TileImage": "/fav/ms-icon-144x144.png",
    "msapplication-config": "/fav/browserconfig.xml",
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
    // Canonical will be handled naturally by Next.js or per-page to avoid
    // pointing all subpages to the homepage which was causing indexing issues.
    languages: {
      "en-US": "/",
      "ar-EG": "/",
    },
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
      ...siteConfig.personalImages.map((img) => ({
        url: `${siteConfig.url}${img.url}`,
        width: 800,
        height: 800,
        alt: img.title,
        type: getMimeType(img.url),
      })),
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
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.author.name,
    alternateName: [
      ...siteConfig.author.alternateName,
      // Extract name variations from keywords
      ...siteConfig.seo.keywords
        .filter((k) => k.includes("Shireff") || k.includes("شريف"))
        .slice(0, 30),
    ],
    givenName: "Shireff",
    familyName: "Nady",
    jobTitle: [
      siteConfig.seo.structuredData.jobTitle,
      // Extract job titles from keywords
      ...siteConfig.seo.keywords
        .filter(
          (k) =>
            k.includes("Developer") ||
            k.includes("Engineer") ||
            k.includes("مطور") ||
            k.includes("مبرمج") ||
            k.includes("مهندس"),
        )
        .slice(0, 30),
    ],
    description: siteConfig.description,
    url: siteConfig.url,
    mainEntityOfPage: siteConfig.url,
    image: [
      {
        "@type": "ImageObject",
        url: siteConfig.ogImage,
        creditText: siteConfig.author.name,
        copyrightNotice: `Copyright (c) 2026 ${siteConfig.author.name}. All rights reserved.`,
        license: `${siteConfig.url}/verification`,
        acquireLicensePage: `${siteConfig.url}/contact`,
      },
      ...siteConfig.personalImages.map((img) => ({
        "@type": "ImageObject",
        url: `${siteConfig.url}${img.url}`,
        caption: img.title,
        creditText: siteConfig.author.name,
        copyrightNotice: `Copyright (c) 2026 ${siteConfig.author.name}. All rights reserved.`,
        license: `${siteConfig.url}/verification`,
        acquireLicensePage: `${siteConfig.url}/contact`,
      })),
    ],
    email: siteConfig.author.email,
    telephone: siteConfig.author.phone,
    sameAs: [
      siteConfig.author.linkedin,
      siteConfig.author.github,
      siteConfig.links.twitter,
      siteConfig.url,
    ],
    worksFor: {
      "@type": "Organization",
      name: siteConfig.seo.structuredData.organization,
    },
    knowsAbout: siteConfig.seo.structuredData.knowsAbout,
    knowsLanguage: siteConfig.seo.structuredData.knowsLanguage.map((lang) => ({
      "@type": "Language",
      name: lang.name,
      alternateName: lang.code,
    })),
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Professional Experience",
        name: `${siteConfig.seo.structuredData.experienceYears}+ Years of Web Development Experience`,
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "EG",
      addressLocality: siteConfig.author.location,
    },
    nationality: {
      "@type": "Country",
      name: "Egypt",
    },
    homeLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "EG",
      },
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    alternateName: ["Shireff", "Shireff Portfolio", "Shireff Dev"],
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
    },
    publisher: {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
    },
    inLanguage: siteConfig.languages.primary,
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/projects?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#service`,
    name: `${siteConfig.name} - Web Development Services`,
    alternateName: "Shireff Web Development",
    description: siteConfig.description,
    url: siteConfig.url,
    image: {
      "@type": "ImageObject",
      url: siteConfig.ogImage,
      creditText: siteConfig.author.name,
      copyrightNotice: `Copyright (c) 2026 ${siteConfig.author.name}. All rights reserved.`,
      license: `${siteConfig.url}/verification`,
      acquireLicensePage: `${siteConfig.url}/contact`,
    },
    priceRange: siteConfig.seo.structuredData.priceRange,
    provider: {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "EG",
    },
    areaServed: {
      "@type": "Place",
      name: siteConfig.seo.structuredData.areaServed,
    },
    availableLanguage: siteConfig.seo.structuredData.knowsLanguage.map(
      (lang) => lang.name,
    ),
    serviceType: siteConfig.seo.structuredData.serviceTypes,
    sameAs: [
      siteConfig.author.linkedin,
      siteConfig.author.github,
      siteConfig.links.twitter,
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${siteConfig.url}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Experience",
        item: `${siteConfig.url}/experiences`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Recommendations",
        item: `${siteConfig.url}/recommendations`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Contact",
        item: `${siteConfig.url}/contact`,
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Language Alternatives for SEO */}
        {siteConfig.languages.hrefLang.map((lang) => (
          <link
            key={lang.lang}
            rel="alternate"
            hrefLang={lang.lang}
            href={lang.url}
          />
        ))}

        {/* DNS Prefetch & Preconnect for Performance */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceSchema),
          }}
        />
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        {/* WebMCP - Expose site tools to AI agents via the browser */}
        <Script
          id="webmcp"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (!navigator.modelContext) return;
                const controller = new AbortController();
                navigator.modelContext.registerTool({
                  name: "get-projects",
                  description: "Retrieve all portfolio projects by Shireff Nady including title, description, tech stack, and links.",
                  inputSchema: { type: "object", properties: {}, required: [] },
                  execute: async () => {
                    const res = await fetch("https://api.shireff.dev/api/projects");
                    return res.json();
                  }
                }, { signal: controller.signal });
                navigator.modelContext.registerTool({
                  name: "get-experiences",
                  description: "Retrieve work experience history for Shireff Nady including company, role, and duration.",
                  inputSchema: { type: "object", properties: {}, required: [] },
                  execute: async () => {
                    const res = await fetch("https://api.shireff.dev/api/experiences");
                    return res.json();
                  }
                }, { signal: controller.signal });
                navigator.modelContext.registerTool({
                  name: "contact",
                  description: "Send a contact message to Shireff Nady.",
                  inputSchema: {
                    type: "object",
                    properties: {
                      name: { type: "string", description: "Sender name" },
                      email: { type: "string", description: "Sender email" },
                      message: { type: "string", description: "Message content" }
                    },
                    required: ["name", "email", "message"]
                  },
                  execute: async (args) => {
                    const res = await fetch("https://api.shireff.dev/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(args)
                    });
                    return res.json();
                  }
                }, { signal: controller.signal });
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {/* Semantic Image Injection for SEO - Visually Hidden */}
        <div
          className="sr-only"
          aria-hidden="true"
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: "0",
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            borderWidth: "0",
          }}
        >
          {/* Images with multilingual alt text for SEO */}
          {siteConfig.personalImages.map((img, i) => (
            <img key={i} src={img.url} alt={img.alt} width="800" height="800" />
          ))}

          {/* Hidden semantic keywords for multilingual SEO */}
          <div lang="en">
            <h2>{siteConfig.author.name} - Professional Web Developer</h2>
            <p>
              {siteConfig.seo.keywords
                .filter(
                  (k) =>
                    !k.includes("شريف") &&
                    !k.includes("مطور") &&
                    !k.includes("مبرمج"),
                )
                .slice(0, 50)
                .join(", ")}
              .
            </p>
          </div>

          <div lang="ar" dir="rtl">
            <h2>شريف نادي - مطور ويب محترف</h2>
            <p>
              {siteConfig.seo.keywords
                .filter(
                  (k) =>
                    k.includes("شريف") ||
                    k.includes("مطور") ||
                    k.includes("مبرمج"),
                )
                .join("، ")}
              .
            </p>
          </div>
        </div>

        <div className="noise-overlay" />
        <StoreProvider>
          <SWRProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <NotificationManager />
              <Navbar />
              <main className="flex-grow pt-20">{children}</main>
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
