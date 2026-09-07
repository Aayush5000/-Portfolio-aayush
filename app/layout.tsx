import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Archivo, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { contact, isLive, site, socials } from "@/lib/config";

/* Display: Archivo — an engineered grotesque, used heavy and tight.
   Body: Instrument Sans — crisp and readable at small sizes on a dark ground.
   Data: IBM Plex Mono — the vernacular of notebooks, tables and query output. */
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.shortTitle,
  authors: [{ name: "Aayush Mishra" }],
  creator: "Aayush Mishra",
  keywords: [
    "Aayush Mishra",
    "data analyst",
    "data science",
    "AI",
    "machine learning",
    "Python",
    "SQL",
    "pandas",
    "TensorFlow",
    "Power BI",
    "data analyst portfolio",
    "Galgotias University",
    "Faridabad",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.shortTitle,
    title: site.title,
    description: site.description,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "Aayush Mishra — Data Analyst, Data Science and AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [site.ogImage],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07080a",
  colorScheme: "dark",
};

/** Structured data. Every field below is stated on the résumé — nothing added. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Aayush Mishra",
  description: site.description,
  url: site.url,
  email: `mailto:${contact.email}`,
  telephone: contact.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Faridabad",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Galgotias University",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Greater Noida",
      addressCountry: "IN",
    },
  },
  knowsAbout: [
    "Data analysis",
    "Data cleaning",
    "Data visualization",
    "Statistical analysis",
    "Machine learning",
    "Python",
    "SQL",
    "TensorFlow",
    "Power BI",
  ],
  sameAs: socials.filter((s) => isLive(s.url)).map((s) => s.url),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrumentSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-ink text-bone antialiased">
        {/* Marks the document as scripted before first paint, so scroll reveals
            only hide content when there is JavaScript available to show it. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />

        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <div className="noise" aria-hidden="true" />
        <ScrollProgress />
        <Navbar />

        <main id="main">{children}</main>

        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
