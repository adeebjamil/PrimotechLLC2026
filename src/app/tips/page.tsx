import { Metadata } from 'next';
import TipsClient from './TipsClient';

export const metadata: Metadata = {
    title: "Security Camera Tips & Guides | CCTV Expert Insights - PrimoTech LLC Dubai",
    description: "Expert CCTV security tips, installation guides, and surveillance best practices from PrimoTech LLC — Dubai's authorized Uniarch dealer. Learn how to maximize your security camera system performance.",
    alternates: { canonical: "/tips" },
    keywords: [
        "CCTV tips Dubai", "security camera guide UAE", "surveillance best practices",
        "Uniarch camera setup tips", "CCTV installation guide", "IP camera optimization",
        "NVR configuration tips", "CCTV outdoor placement guide", "security camera maintenance UAE",
        "wireless CCTV tips", "AI camera setup guide", "CCTV network tips Dubai",
        "security system guide Middle East", "camera night vision tips", "CCTV storage guide UAE"
    ],
    openGraph: {
        title: "Security Camera Tips & Expert Guides - PrimoTech LLC Dubai",
        description: "Expert CCTV tips, installation guides, and security camera best practices from Dubai's #1 authorized Uniarch dealer.",
        url: "https://primotech-llc.com/tips",
        images: [{ url: "https://primotech-llc.com/og-image.png", width: 1200, height: 630, alt: "PrimoTech LLC Security Tips" }]
    }
};

export default function TipsPage() {
    const tipsPageSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Security Camera Tips & Expert Guides | PrimoTech LLC",
        "description": "Expert CCTV installation tips, security camera guides, and surveillance best practices from PrimoTech LLC, Dubai's authorized Uniarch dealer.",
        "url": "https://primotech-llc.com/tips",
        "publisher": {
            "@type": "Organization",
            "@id": "https://primotech-llc.com/#organization",
            "name": "PrimoTech LLC",
            "url": "https://primotech-llc.com"
        },
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://primotech-llc.com" },
                { "@type": "ListItem", "position": 2, "name": "Tips & Guides", "item": "https://primotech-llc.com/tips" }
            ]
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(tipsPageSchema) }}
            />
            <TipsClient />
        </>
    );
}
