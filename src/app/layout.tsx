import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/app/components/Layout/ConditionalLayout";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://primotech-llc.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "PrimoTech LLC | #1 CCTV & Security Camera Supplier in Dubai, UAE",
    template: "%s | PrimoTech LLC"
  },
  description: "PrimoTech LLC is Dubai's leading authorized supplier of Uniarch CCTV cameras, NVR systems, wireless surveillance kits, and advanced security solutions. Serving UAE, Middle East & GCC. Call +971 52 879 6664.",
  keywords: [
    // Brand & Identity
    "PrimoTech LLC", "PrimoTech Dubai", "PrimoTech security cameras", "PrimoTech UAE", "PrimoTech surveillance",
    // Core Products
    "CCTV cameras Dubai", "IP cameras UAE", "security cameras Middle East", "NVR systems Dubai", "DVR systems UAE",
    "Uniarch cameras Dubai", "Uniarch NVR UAE", "Uniarch authorized dealer", "Uniarch supplier Middle East",
    "Panda P Series cameras", "Panda S3S dual lens", "wireless CCTV kit UAE", "outdoor CCTV camera Dubai",
    "dual light security cameras", "analog cameras UAE", "4K security camera Dubai", "2MP 4MP 8MP cameras UAE",
    "night vision security camera", "PTZ camera Dubai", "dome camera UAE", "bullet camera Dubai",
    // Solutions & Services
    "CCTV installation Dubai", "security system installation UAE", "surveillance system supplier Dubai",
    "home security cameras Dubai", "office CCTV installation UAE", "warehouse surveillance Dubai",
    "retail security system UAE", "bank CCTV system Dubai", "hotel security cameras UAE",
    "industrial CCTV monitoring", "remote CCTV monitoring UAE", "AI security camera Dubai",
    "smart surveillance UAE", "mobile CCTV app Dubai", "cloud storage CCTV",
    // Location Specific
    "CCTV supplier Deira Dubai", "security camera Satellite Market", "CCTV Musthafa Building Dubai",
    "security system supplier Dubai Silicon Oasis", "Abu Dhabi CCTV supplier", "Sharjah security cameras",
    "GCC surveillance systems", "Middle East CCTV distributor", "UAE security solutions",
    // Compliance & Quality
    "SIRA approved CCTV Dubai", "DPS certified security UAE", "authorized Uniarch dealer UAE",
    "certified security camera supplier", "Hikvision partner UAE",
    // Network Accessories
    "network switches UAE", "PoE switch Dubai", "CCTV accessories supplier", "security camera accessories UAE",
    // AEO / GEO long-tail
    "best CCTV supplier in Dubai", "where to buy security cameras in UAE", "affordable surveillance cameras UAE",
    "CCTV camera price Dubai", "buy IP camera online UAE"
  ],
  authors: [{ name: "PrimoTech LLC", url: "https://primotech-llc.com" }],
  creator: "PrimoTech LLC",
  publisher: "PrimoTech LLC",
  category: "Security Technology",
  classification: "CCTV & Surveillance Equipment Supplier",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "PrimoTech LLC | Dubai's Leading CCTV & Security Camera Supplier",
    description: "Authorized Uniarch dealer & premier security solutions provider in Dubai, UAE. Shop IP cameras, NVRs, wireless CCTV kits & more. Visit us at Satellite Market, Deira, Dubai.",
    url: "https://primotech-llc.com",
    siteName: "PrimoTech LLC",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "https://primotech-llc.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "PrimoTech LLC - CCTV & Security Solutions Dubai"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "PrimoTech LLC | CCTV & Security Solutions Dubai UAE",
    description: "Dubai's #1 authorized Uniarch CCTV supplier. Shop IP cameras, NVRs, wireless surveillance kits. Call +971 52 879 6664.",
    images: ["https://primotech-llc.com/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Schema 1: Organization — AEO/GEO: helps Gemini/ChatGPT/Claude cite the brand */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://primotech-llc.com/#organization",
              "name": "PrimoTech LLC",
              "alternateName": ["PrimoTech", "Primo Tech LLC", "PrimoTech Dubai"],
              "url": "https://primotech-llc.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://primotech-llc.com/logo.png",
                "width": 300,
                "height": 100
              },
              "image": "https://primotech-llc.com/og-image.png",
              "description": "PrimoTech LLC is Dubai's authorized supplier of Uniarch CCTV cameras, NVR systems, IP cameras, and advanced security surveillance solutions serving UAE and the Middle East.",
              "email": "sales@primotech-llc.com",
              "telephone": "+971-52-879-6664",
              "priceRange": "$$",
              "currenciesAccepted": "AED",
              "paymentAccepted": "Cash, Credit Card, Bank Transfer",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Shop 23, Musthafa Building, Satellite Market, Deira",
                "addressLocality": "Dubai",
                "addressRegion": "Dubai",
                "addressCountry": "AE"
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+971-52-879-6664",
                  "contactType": "sales",
                  "areaServed": ["AE", "SA", "QA", "KW", "BH", "OM"],
                  "availableLanguage": ["en", "ar"],
                  "contactOption": "TollFree"
                },
                {
                  "@type": "ContactPoint",
                  "email": "sales@primotech-llc.com",
                  "contactType": "customer support",
                  "areaServed": "AE",
                  "availableLanguage": "en"
                }
              ],
              "knowsAbout": [
                "CCTV Security Systems",
                "IP Surveillance Cameras",
                "NVR DVR Systems",
                "Uniarch Products",
                "Network Video Recorders",
                "Wireless CCTV Kits",
                "Security System Installation Dubai",
                "AI Security Cameras",
                "PTZ Cameras UAE",
                "Smart Home Security"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "PrimoTech Security Product Catalog",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Uniarch IP Cameras" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "NVR Systems" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Panda P Series Wireless Kits" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Dual Light Cameras" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Analog Cameras" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Network Switches" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "CCTV Accessories" } }
                ]
              },
              "sameAs": [
                "https://www.uniarch.com"
              ]
            })
          }}
        />

        {/* Schema 2: LocalBusiness — GEO targeting for Dubai/UAE */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "Store"],
              "@id": "https://primotech-llc.com/#localbusiness",
              "name": "PrimoTech LLC",
              "image": "https://primotech-llc.com/og-image.png",
              "url": "https://primotech-llc.com",
              "telephone": "+971-52-879-6664",
              "email": "sales@primotech-llc.com",
              "description": "Authorized Uniarch CCTV camera dealer and security solutions supplier based in Deira, Dubai. Providing IP cameras, NVR systems, wireless surveillance kits, and complete security installations across UAE and the Middle East.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Shop 23, Musthafa Building, Satellite Market, Deira",
                "addressLocality": "Dubai",
                "addressRegion": "Dubai",
                "addressCountry": "AE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 25.2697,
                "longitude": 55.3095
              },
              "hasMap": "https://maps.google.com/?q=Satellite+Market+Deira+Dubai",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Saturday"],
                  "opens": "09:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Friday",
                  "opens": "14:00",
                  "closes": "18:00"
                }
              ],
              "areaServed": [
                { "@type": "Country", "name": "United Arab Emirates" },
                { "@type": "Country", "name": "Saudi Arabia" },
                { "@type": "Country", "name": "Qatar" },
                { "@type": "Country", "name": "Kuwait" },
                { "@type": "Country", "name": "Bahrain" },
                { "@type": "Country", "name": "Oman" }
              ],
              "servesCuisine": null,
              "priceRange": "$$",
              "currenciesAccepted": "AED",
              "paymentAccepted": "Cash, Credit Card, Bank Transfer"
            })
          }}
        />

        {/* Schema 3: WebSite with SearchAction — enables Google Sitelinks Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://primotech-llc.com/#website",
              "name": "PrimoTech LLC",
              "alternateName": "PrimoTech Security UAE",
              "url": "https://primotech-llc.com",
              "description": "Dubai's authorized CCTV camera supplier. Shop Uniarch IP cameras, NVR systems, wireless surveillance kits and more.",
              "inLanguage": "en-AE",
              "publisher": {
                "@id": "https://primotech-llc.com/#organization"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://primotech-llc.com/products?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
