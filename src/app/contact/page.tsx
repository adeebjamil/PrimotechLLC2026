import ContactHero from '@/app/components/Contact/ContactHero';
import ConnectOptions from '@/app/components/Contact/ConnectOptions';
import GetInTouchForm from '@/app/components/Contact/GetInTouchForm';
import LocationSection from '@/app/components/Contact/LocationSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Contact Us | PrimoTech LLC Dubai - Support & Sales UAE",
    description: "Connect with PrimoTech LLC for professional CCTV installation, security system consultation, and technical support in Dubai. Visit our Silicon Oasis office or contact our expert sales team for high-end surveillance solutions.",
    keywords: [
        "Contact PrimoTech LLC", "Security System Support UAE", "CCTV Sales Dubai", "Security Consultation UAE",
        "Dubai Silicon Oasis Security Office", "Surveillance Technical Support", "Request CCTV Quote Dubai",
        "Security System Installation Contact", "PrimoTech Sales Team", "Customer Service Security UAE",
        "Emergency Security Support Dubai", "B2B Security Sales UAE", "Residential Security Consultation",
        "Industrial Surveillance Support", "Access Control Support UAE", "Video Intercom Installation Dubai",
        "SIRA Approved Security Support", "DPS Certified Systems UAE", "Hire Security Experts Dubai",
        "Best CCTV Supplier Contact", "UAE Security Tech Support", "Security Hardware Maintenance",
        "Dubai Security System Design", "Remote Monitoring Setup Support", "Security Integration Consultation",
        "Hikvision Support UAE", "Uniarch Support Dubai", "PrimoTech Contact Details",
        "Dubai Security Office Location", "CCTV Installation Quote UAE", "Security System Repair Dubai",
        "Enterprise Security Solutions Contact", "Retail Security Support UAE", "Warehouse Surveillance Help",
        "Office Security CCTV Contact", "Smart Home Security Support", "Wireless CCTV Support UAE",
        "CCTV Accessories Sales Dubai", "Solar CCTV Support UAE", "Professional Security Partner Contact",
        "UAE Tech Support Security", "Dubai CCTV Experts Contact", "Security System Upgrade Dubai",
        "Electronic Security Support UAE", "CCTV Configuration Help Dubai", "Security Business Contact UAE",
        "Trusted Security Partner Dubai", "PrimoTech LLC Dubai Address", "UAE Security Hotline"
    ],
    alternates: {
        canonical: "/contact",
    },
};

export default function ContactPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "mainEntity": {
            "@type": "LocalBusiness",
            "name": "PrimoTech LLC",
            "image": "https://primotech-llc.com/logo.png",
            "telephone": "+971-52-879-6664",
            "email": "sales@primotech-llc.com",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Shop 23, Musthafa Building, Satellite Market, Deira",
                "addressLocality": "Dubai",
                "addressRegion": "Dubai",
                "postalCode": "00000",
                "addressCountry": "AE"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 25.27,
                "longitude": 55.31
            },
            "url": "https://primotech-llc.com/contact",
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
                ],
                "opens": "09:00",
                "closes": "18:00"
            }
        }
    };

    return (
        <main className="w-full bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ContactHero />
            <ConnectOptions />
            <GetInTouchForm />
            <LocationSection />
        </main>
    );
}
