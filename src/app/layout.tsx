import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Metadata } from "next";
import { AuthProvider } from "@/lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shireff-nady.vercel.app"),
  title:
    "Shireff Nady - Front-End Developer | Web Developer | JavaScript & React",
  description:
    "Shireff Nady is a front-end developer skilled in HTML, CSS, Tailwind, JavaScript, React, and more. Explore projects, coding insights, and development tips.",
  icons: {
    icon: "https://shireff-nady.vercel.app/og-image.jpg",
    apple: "https://shireff-nady.vercel.app/og-image.jpg",
    shortcut: "https://shireff-nady.vercel.app/og-image.jpg",
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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/icons/icomoon/style.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
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

        {/* Schema: Person */}
        <Script
          id="json-ld-person"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Shireff Nady",
              jobTitle: "Front-End Developer",
              description:
                "Shireff Nady is a professional front-end developer with 3+ years of experience using React, Next.js, TypeScript, and modern web technologies to build responsive, high-performance applications.",
              url: "https://shireff-nady.vercel.app/",
              image: "https://shireff-nady.vercel.app/og-image.jpg",
              sameAs: [
                "https://www.linkedin.com/in/shireffnady/",
                "https://github.com/shireff",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Freelance / Open Source",
                url: "https://shireff-nady.vercel.app/",
              },
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "Digital Egypt Builders Initiative (DEBI)",
              },
              knowsAbout: [
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
            }),
          }}
        />

        {/* Schema: Website */}
        <Script
          id="json-ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Shireff Nady Portfolio",
              url: "https://shireff-nady.vercel.app",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://shireff-nady.vercel.app/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
