import { SupportSection } from '@/app/components/Support/SupportSection';
import { FaqVideoSection } from '@/app/components/Support/FaqVideoSection';
import { ContactCTA } from '@/app/components/Support/ContactCTA';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Technical Support & Resources | PrimoTech LLC UAE",
    description: "Access technical support, installation guides, and FAQ resources for PrimoTech LLC security systems. Get expert help for CCTV configuration, surveillance hardware, and software integration in Dubai.",
    keywords: [
        "PrimoTech Technical Support", "CCTV Installation Guides UAE", "Security System FAQ Dubai",
        "Surveillance Hardware Help", "CCTV Troubleshooting UAE", "Security Software Integration Support",
        "Technical Resources PrimoTech", "Security App Configuration Dubai", "NVR Setup Guide UAE",
        "IP Camera Troubleshooting Dubai", "Security Hardware Manuals UAE", "Video Management Support",
        "Remote Monitoring Setup Guide", "Surveillance System Maintenance UAE", "CCTV Technical Experts",
        "Security System Help Desk Dubai", "Hikvision Technical Support UAE", "Uniarch Support Resources",
        "SIRA Approved System Support", "DPS Certified Security Help", "CCTV Networking Guide UAE",
        "Security Integration Troubleshooting", "Smart Surveillance Help Dubai", "Electronic Security Support",
        "CCTV Firmware Update UAE", "Security System Diagnostic Dubai", "CCTV Repair Support UAE",
        "Technical Training Security Dubai", "Surveillance Best Practices UAE", "Security System Audit Support",
        "Access Control Troubleshooting UAE", "Video Intercom Support Dubai", "Intrusion Detection Help",
        "Security Automation Support UAE", "Wireless CCTV Setup Support", "Solar CCTV Maintenance UAE",
        "Professional Security Support Dubai", "Middle East Security Resources", "Dubai Tech Support CCTV",
        "PrimoTech LLC Help Center", "Security System User Guides", "CCTV Monitoring Support Dubai",
        "UAE Security Tech Help", "Integrated Security Troubleshooting", "High-End CCTV Support UAE",
        "Trusted Security Support Partner", "Dubai Security Solutions Help", "CCTV Software Manuals UAE"
    ],
    alternates: {
        canonical: "/support",
    },
};

export default function SupportPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "PrimoTech LLC Technical Support",
        "description": "Technical support resources, FAQs, and contact options for PrimoTech LLC customers.",
        "mainEntity": {
            "@type": "ContactPoint",
            "telephone": "+971-52-879-6664",
            "contactType": "technical support",
            "areaServed": "AE",
            "availableLanguage": "en"
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Support Hero Section */}
            <SupportSection />

            {/* FAQ & Video Support Section */}
            <FaqVideoSection />

            {/* Contact CTA Section */}
            <ContactCTA />
        </main>
    );
}
