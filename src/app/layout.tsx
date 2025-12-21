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
  title:
    "Shireff Nady - Front-End Developer | Web Developer | JavaScript & React",
  description:
    "Shireff Nady is a front-end developer skilled in HTML, CSS, Tailwind, JavaScript, React, and more. Explore projects, coding insights, and development tips.",
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
  authors: [{ name: "Shireff Nady" }],
  creator: "Shireff Nady",
  publisher: "Shireff Nady",

  keywords: [
    "Shireff",
    "Shireff Nady",
    "Front-End Developer",
    "Web Developer",
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Redux",
    "Redux Toolkit",
    "Bootstrap",
    "Tailwind CSS",
    "Git",
    "GitHub",
    "jQuery",
    "AJAX",
    "JSON",
    "Cypress",
    "Unit Testing",
    "E2E Testing",
    "Integration Testing",
    "Node.js",
    "Express",
  ],
  alternates: {
    canonical: "https://shireff-nady.vercel.app/",
  },
  verification: {
    google: "G-XXXXXXXXX",
  },
  openGraph: {
    title: "Shireff Nady - Front-End Developer & Web Developer",
    description:
      "Shireff Nady, front-end developer skilled in HTML, CSS, JavaScript, React, Tailwind, and more. Discover my projects in web development.",
    url: "https://shireff-nady.vercel.app/",
    siteName: "Shireff Nady | Front-End Developer",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://shireff-nady.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shireff Nady Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shireff Nady | Front-End Developer",
    description: "Front-End Developer skilled in React, Next.js, and modern web.",
    images: ["https://shireff-nady.vercel.app/og-image.jpg"],
    creator: "@shireffnady",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Shireff Nady",
    "jobTitle": "Front-End Developer",
    "description": "Shireff Nady is a front-end developer skilled in HTML, CSS, JavaScript, React, and modern web technologies.",
    "url": "https://shireff-nady.vercel.app",
    "image": "https://shireff-nady.vercel.app/og-image.jpg",
    "sameAs": [
      "https://www.linkedin.com/in/shireffnady",
      "https://github.com/shireff"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance / Open Source"
    },
    "knowsAbout": [
      "React",
      "Next.js",
      "TypeScript",
      "SEO",
      "Performance",
      "Tailwind CSS",
      "Node.js"
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
