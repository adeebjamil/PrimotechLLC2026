import React from 'react';
import AboutHero from '@/app/components/About/AboutHero';
import AboutIntro from '@/app/components/About/AboutIntro';
import CoreValues from '@/app/components/About/CoreValues';
import KeyHighlights from '@/app/components/About/KeyHighlights';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About Us | PrimoTech LLC - Security Technology Experts UAE",
    description: "Learn about PrimoTech LLC, a leading IoT and security solutions manufacturer in Dubai with 15+ years of expertise. We specialize in high-performance CCTV, surveillance systems, and advanced security integration across the Middle East.",
    keywords: [
        "About PrimoTech LLC", "Security Experts UAE", "CCTV Manufacturers Dubai", "Surveillance Technology Leaders",
        "IoT Solutions UAE", "Security System Integration", "Middle East Security Supplier", "Industrial Monitoring Experts",
        "Residential Security Systems UAE", "Enterprise Surveillance Dubai", "Security Innovation Middle East",
        "Advanced Security Technology", "Certified Security Partners UAE", "Surveillance Hardware Dubai",
        "Digital Transformation Security", "Smart Surveillance UAE", "Security Consulting Dubai",
        "Hikvision Partner UAE", "Uniarch Dealer Dubai", "SIRA Approved Security", "DPS Certified Systems",
        "Professional CCTV Installation", "Security Maintenance UAE", "Access Control Experts",
        "Video Management Software UAE", "Cloud Surveillance Dubai", "Security Automation UAE",
        "CCTV Technology Leaders", "Network Surveillance Dubai", "Security Hardware Supplier",
        "Dubai Silicon Oasis Security", "UAE Tech Innovators", "Electronic Security Experts",
        "High Definition CCTV UAE", "Remote Monitoring Experts Dubai", "Security Strategy UAE",
        "Integrated Security Solutions", "Middle East CCTV Market Leaders", "PrimoTech Mission",
        "Security Technology Democratization", "Affordable Professional CCTV", "Premium Surveillance UAE",
        "Security Equipment Engineering", "Dubai Security Solutions Provider", "Trusted CCTV Partner UAE"
    ],
    alternates: {
        canonical: "/about",
    },
};

const AboutPage = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "mainEntity": {
            "@type": "Organization",
            "name": "PrimoTech LLC",
            "description": "Leading manufacturer and supplier of advanced security and IoT solutions in the Middle East.",
            "url": "https://primotech-llc.com",
            "logo": "https://primotech-llc.com/logo.png",
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+971-52-879-6664",
                "contactType": "customer service",
                "areaServed": "AE",
                "availableLanguage": "en"
            },
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Shop 23, Musthafa Building, Satellite Market, Deira",
                "addressLocality": "Dubai",
                "addressRegion": "Dubai",
                "postalCode": "00000",
                "addressCountry": "AE"
            }
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Section 1: Hero Section */}
            <AboutHero />

            {/* Section 2: Company Introduction */}
            <AboutIntro />

            {/* Section 3: Core Values Section */}
            <CoreValues />

            {/* Section 4: Key Highlights Section */}
            <KeyHighlights />

            {/* CTA Section */}
            <section className="py-24 text-center bg-gray-50/30">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-extralight text-[#1e3a5f] mb-8">
                        Ready to <span className="font-bold">secure your future?</span>
                    </h2>
                    <a 
                        href="/contact" 
                        className="inline-flex items-center gap-3 bg-[#00c2b2] text-white px-10 py-5 rounded-full font-bold text-lg uppercase tracking-widest hover:bg-[#00a89a] transition-all shadow-xl shadow-[#00c2b2]/20"
                    >
                        Work with us
                    </a>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;
