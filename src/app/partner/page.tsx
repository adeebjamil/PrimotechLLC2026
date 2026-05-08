import { Metadata } from 'next';
import PartnerContent from './PartnerContent';

export const metadata: Metadata = {
    title: "Partnership Program | Join UAE's Leading Security Network - PrimoTech LLC",
    description: "Join PrimoTech LLC's exclusive partnership program in the UAE. We offer competitive margins, technical training, and premium support for security system integrators, distributors, and IT consultants.",
    keywords: [
        "PrimoTech Partner Program", "CCTV Partnership UAE", "Security Distributor Dubai", "Join Security Network",
        "Lovosis Technology Partner", "Spottive Technologies Partner", "Security Integration UAE",
        "IT Consultant Dubai", "Become CCTV Dealer", "Surveillance Partnership Middle East",
        "Security System Reseller", "UAE Tech Partnership", "B2B Security Solutions", "Channel Partner UAE",
        "Security Equipment Distribution", "Partner Support Program", "CCTV Training UAE",
        "Wholesale Security Cameras Dubai", "Smart Home Partner UAE", "Enterprise Security Partner",
        "Authorized Dealer Program", "Security Technology Collaboration", "Grow Security Business UAE",
        "Technical Excellence Partner", "Reliable Security Supplier Dubai", "PrimoTech Network",
        "CCTV Sales Partner", "Surveillance Project Support", "Security Hardware Distribution",
        "Dubai Silicon Oasis Partners", "Middle East Security Ecosystem", "Professional CCTV Network",
        "Security Installation Partner", "Maintenance Contract Partner", "Access Control Partner UAE",
        "Video Intercom Distribution", "Smart Surveillance Partner", "Security Solutions Provider UAE",
        "Leading CCTV Partner Dubai", "Industrial Surveillance Partnership", "Electronic Security Network",
        "Security Strategy Collaboration", "UAE Business Partnership", "Strategic Security Partner",
        "High-End CCTV Network Dubai", "Trusted Security Partner UAE", "PrimoTech Distribution"
    ],
    alternates: {
        canonical: "/partner",
    },
};

const PartnerPage = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "PrimoTech LLC Partnership Program",
        "description": "Information about becoming a partner or distributor for PrimoTech LLC security solutions in the UAE.",
        "publisher": {
            "@type": "Organization",
            "name": "PrimoTech LLC",
            "logo": {
                "@type": "ImageObject",
                "url": "https://primotech-llc.com/logo.png"
            }
        },
        "mainEntity": {
            "@type": "ContactPoint",
            "telephone": "+971-52-879-6664",
            "contactType": "partnership team",
            "areaServed": "AE",
            "availableLanguage": "en"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PartnerContent />
        </>
    );
};

export default PartnerPage;
