import TermsOfService from "../components/Layout/TermsOfService";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Terms of Service | PrimoTech LLC — CCTV Supplier Dubai UAE",
    description: "Read the Terms of Service for PrimoTech LLC, Dubai's #1 CCTV and security camera supplier. Understand your rights and obligations when using our website, purchasing products, and using our security services in the UAE.",
    alternates: { canonical: "/terms" },
    keywords: [
        "PrimoTech terms of service", "CCTV supplier terms UAE", "security camera purchase terms",
        "PrimoTech LLC legal", "UAE security supplier terms", "Dubai CCTV terms"
    ],
    openGraph: {
        title: "Terms of Service | PrimoTech LLC Dubai",
        description: "Terms and conditions for purchasing CCTV and security camera products from PrimoTech LLC, Dubai.",
        url: "https://primotech-llc.com/terms"
    }
};

export default function TermsPage() {
    const termsSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Terms of Service | PrimoTech LLC",
        "description": "Terms of Service for PrimoTech LLC, Dubai's authorized Uniarch CCTV and security solutions supplier.",
        "url": "https://primotech-llc.com/terms",
        "publisher": {
            "@type": "Organization",
            "@id": "https://primotech-llc.com/#organization",
            "name": "PrimoTech LLC"
        },
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://primotech-llc.com" },
                { "@type": "ListItem", "position": 2, "name": "Terms of Service", "item": "https://primotech-llc.com/terms" }
            ]
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(termsSchema) }}
            />
            <TermsOfService />
        </>
    );
}
