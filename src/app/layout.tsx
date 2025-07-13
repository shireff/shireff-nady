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
  keywords: [
    "Shireff",
    "Shireff Nady",
    "Front-End Developer",
    "Web Developer",
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Tailwind",
    "Responsive Design",
    "Web Development",
    "Next.js",
    "TypeScript",
  ],
  openGraph: {
    title: "Shireff Nady - Front-End Developer & Web Developer",
    description:
      "Shireff Nady, front-end developer skilled in HTML, CSS, JavaScript, React, Tailwind, and more. Discover my projects in web development.",
    url: "https://shireff-nady.vercel.app/",
    siteName: "Shireff Nady | Front-End Developer",
    type: "website",
    images: [
      {
        url: "https://shireff-nady.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shireff Nady Portfolio",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://shireff-nady.vercel.app/" />

        <title>Shireff Nady | Front-End Developer</title>
        <meta
          name="description"
          content="Shireff Nady is a front-end developer skilled in HTML, CSS, JavaScript, React, Tailwind, and more."
        />

        <meta name="author" content="Shireff Nady" />
        <meta name="publisher" content="Shireff Nady" />
        <meta name="application-name" content="Shireff Nady Portfolio" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shireff-nady.vercel.app/" />
        <meta
          property="og:title"
          content="Shireff Nady | Front-End Developer"
        />
        <meta
          property="og:description"
          content="A Front-End Developer skilled in HTML, CSS, JavaScript, React, Tailwind, and more. View my projects."
        />
        <meta
          property="og:site_name"
          content="Shireff Nady | Front-End Developer"
        />
        <meta
          property="og:image"
          content="https://shireff-nady.vercel.app/og-image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="fb:app_id" content="1669257420448613" />
        <link
          rel="icon"
          href="https://shireff-nady.vercel.app/og-image.jpg"
          type="image/jpeg"
          sizes="32x32"
        />
        <link
          rel="apple-touch-icon"
          href="https://shireff-nady.vercel.app/og-image.jpg"
        />
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

        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "Person",
              name: "Shireff Nady",
              jobTitle: "Front-End Developer",
              url: "https://shireff-nady.vercel.app/",
              sameAs: [
                "https://www.linkedin.com/in/shireffnady/",
                "https://github.com/shireff",
              ],
              skills: [
                "HTML",
                "CSS",
                "JavaScript",
                "React",
                "Tailwind CSS",
                "Responsive Design",
                "Git",
                "TypeScript",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
