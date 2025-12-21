import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIHelper from "@/components/ui/AIHelper";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#02040a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://shireff-nady.vercel.app"),
  title: {
    default: "Shireff Nady - Front-End Developer | Web Developer | JavaScript & React Expert",
    template: "%s | Shireff Nady - Front-End Developer",
  },
  description:
    "Shireff Nady is a skilled front-end developer specializing in HTML5, CSS3, Tailwind CSS, JavaScript, TypeScript, React.js, Next.js, and modern web technologies. Explore innovative projects, coding insights, and professional web development solutions.",
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
    title: 'Shireff Nady',
  },
  other: {
    'msapplication-TileColor': '#02040a',
    'msapplication-TileImage': '/fav/ms-icon-144x144.png',
    'msapplication-config': '/fav/browserconfig.xml',
  },
  authors: [{ name: "Shireff Nady", url: "https://shireff-nady.vercel.app" }],
  creator: "Shireff Nady",
  publisher: "Shireff Nady",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  keywords: [
    "Shireff Nady",
    "Front-End Developer",
    "Web Developer",
    "Full Stack Developer",
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React.js",
    "React Developer",
    "Next.js",
    "Next.js Developer",
    "Redux",
    "Redux Toolkit",
    "State Management",
    "Bootstrap",
    "Tailwind CSS",
    "Responsive Design",
    "Mobile-First Design",
    "Git",
    "GitHub",
    "Version Control",
    "jQuery",
    "AJAX",
    "REST API",
    "JSON",
    "Cypress",
    "Unit Testing",
    "E2E Testing",
    "Integration Testing",
    "Test-Driven Development",
    "Node.js",
    "Express.js",
    "Web Performance",
    "SEO Optimization",
    "Accessibility",
    "WCAG",
    "Progressive Web Apps",
    "PWA",
    "Single Page Applications",
    "SPA",
    "Web Components",
    "Modern Web Development",
    "Frontend Architecture",
    "UI/UX Development",
    "Portfolio",
    "Egypt Developer",
    "Freelance Developer",
  ],
  alternates: {
    canonical: "https://shireff-nady.vercel.app/",
  },
  verification: {
    google: "QajwK8zAMPQjckKLANrD_5YFHjDsCJRns24cWmLSMsE",
  },
  openGraph: {
    title: "Shireff Nady - Front-End Developer & Web Developer",
    description:
      "Shireff Nady, a skilled front-end developer specializing in HTML, CSS, JavaScript, React, Next.js, Tailwind CSS, and modern web technologies. Discover innovative web development projects and solutions.",
    url: "https://shireff-nady.vercel.app/",
    siteName: "Shireff Nady | Front-End Developer",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://shireff-nady.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shireff Nady Portfolio - Front-End Developer",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shireff Nady | Front-End Developer",
    description: "Front-End Developer skilled in React, Next.js, TypeScript, and modern web technologies.",
    images: ["https://shireff-nady.vercel.app/og-image.jpg"],
    creator: "@shireffnady",
    site: "@shireffnady",
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
    "name": "Shireff Nady",
    "jobTitle": "Front-End Developer",
    "description": "Shireff Nady is a skilled front-end developer specializing in HTML5, CSS3, JavaScript, TypeScript, React.js, Next.js, and modern web technologies.",
    "url": "https://shireff-nady.vercel.app",
    "image": "https://shireff-nady.vercel.app/og-image.jpg",
    "email": "shireffn369@gmail.com",
    "telephone": "+201274068946",
    "sameAs": [
      "https://www.linkedin.com/in/shireffnady",
      "https://github.com/shireff",
      "https://twitter.com/shireffnady"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance / Open Source"
    },
    "knowsAbout": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Redux",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "SEO Optimization",
      "Web Performance",
      "Responsive Design",
      "Accessibility",
      "Testing"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Your University/College" // Update with actual education
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "EG",
      "addressLocality": "Egypt"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Shireff Nady - Front-End Developer Portfolio",
    "url": "https://shireff-nady.vercel.app",
    "description": "Professional portfolio showcasing web development projects, skills, and experience of Shireff Nady.",
    "author": {
      "@type": "Person",
      "name": "Shireff Nady"
    },
    "inLanguage": "en-US",
    "copyrightYear": new Date().getFullYear(),
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://shireff-nady.vercel.app/projects?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Shireff Nady - Web Development Services",
    "description": "Professional front-end development services specializing in React, Next.js, and modern web technologies.",
    "url": "https://shireff-nady.vercel.app",
    "image": "https://shireff-nady.vercel.app/og-image.jpg",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "EG"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "availableLanguage": ["English", "Arabic"],
    "serviceType": [
      "Web Development",
      "Front-End Development",
      "React Development",
      "Next.js Development",
      "UI/UX Implementation",
      "Web Performance Optimization",
      "SEO Optimization"
    ]
  };

  return (
    <html lang="en" className="dark">
      <head>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXX"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXX');
          `}
        </Script>
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
        <div className="noise-overlay" />
        <Navbar />
        <main className="flex-grow pt-24">
          {children}
        </main>
        <Footer />
        <AIHelper />
      </body>
    </html>
  );
}
