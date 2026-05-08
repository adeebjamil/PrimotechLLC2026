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
    default: "PrimoTech LLC | #1 CCTV & Security Solutions Supplier in Middle East",
    template: "%s | PrimoTech LLC"
  },
  description: "PrimoTech LLC is the leading supplier of high-performance CCTV, Uniarch products, and advanced surveillance solutions in the Middle East. Secure your future with our award-winning technology.",
  keywords: [
    "CCTV Middle East", "Security Solutions UAE", "Uniarch Products", "Surveillance Systems", "PrimoTech LLC", "CCTV Supplier Dubai",
    "Hikvision Partner UAE", "IP Camera Dubai", "NVR Systems Middle East", "Wireless Surveillance Kits UAE", "Panda P Series", 
    "Rainbow Light Camera", "Night Vision Security", "Industrial Monitoring Solutions", "Smart Home Security UAE", "CCTV Installation Dubai", 
    "Business Security Systems", "Residential CCTV UAE", "AI Powered Surveillance", "4K Security Cameras Dubai", "Access Control Systems UAE", 
    "Video Management Software", "Cloud CCTV Storage", "Mobile Security App UAE", "Authorized Uniarch Dealer", "Security Equipment Supplier", 
    "Electronic Security Solutions", "Advanced Surveillance Tech", "CCTV Maintenance UAE", "Network Security Cameras", "Digital Video Recorders", 
    "Abu Dhabi CCTV Supplier", "Sharjah Security Systems", "SIRA Approved CCTV", "DPS Certified Security UAE", "High Definition Surveillance", 
    "Remote Monitoring Dubai", "Security Consultation UAE", "IoT Security Devices", "Smart Surveillance UAE", "Thermal Security Cameras", 
    "PTZ Camera Solutions", "Intrusion Detection Systems", "Video Intercom Systems", "Security Integration UAE", "Enterprise Security Dubai", 
    "Retail Security Solutions", "Bank Security Systems UAE", "Warehouse Surveillance", "Office Security CCTV", "Home Automation Dubai", 
    "Wireless IP Cameras UAE", "CCTV Accessories Supplier", "Solar Powered CCTV UAE", "Explosion Proof Cameras", "Marine Security Systems"
  ],
  authors: [{ name: "PrimoTech LLC" }],
  creator: "PrimoTech LLC",
  publisher: "PrimoTech LLC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "PrimoTech LLC | Advanced Security & CCTV Solutions",
    description: "Leading supplier of industrial-grade CCTV and surveillance systems in the Middle East.",
    url: "https://primotech-llc.com",
    siteName: "PrimoTech LLC",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrimoTech LLC | Security Solutions",
    description: "Secure your future with UAE's most trusted security partner.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "PrimoTech LLC",
              "url": "https://primotech-llc.com",
              "logo": "https://primotech-llc.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+971-52-879-6664",
                "contactType": "customer service",
                "areaServed": "AE",
                "availableLanguage": "en"
              },
              "sameAs": [
                "https://www.facebook.com/primotechllc",
                "https://www.linkedin.com/company/primotechllc"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "PrimoTech LLC",
              "image": "https://primotech-llc.com/logo.png",
              "@id": "https://primotech-llc.com",
              "url": "https://primotech-llc.com",
              "telephone": "+971-52-879-6664",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Shop 23, Musthafa Building, Satellite Market, Deira, Dubai",
                "addressLocality": "Dubai",
                "addressRegion": "Dubai",
                "addressCountry": "AE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 25.27,
                "longitude": 55.31
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "18:00"
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
