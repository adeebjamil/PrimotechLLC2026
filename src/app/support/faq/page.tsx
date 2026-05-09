import { Metadata } from 'next';
import FAQPageClient from './FAQPageClient';

export const metadata: Metadata = {
    title: "FAQ | CCTV & Security Camera Support Dubai - PrimoTech LLC",
    description: "Find answers to frequently asked questions about Uniarch CCTV cameras, NVR setup, network configuration, mobile app, AI detection, warranty, and installation. PrimoTech LLC — Dubai's authorized security supplier.",
    alternates: { canonical: "/support/faq" },
    keywords: [
        "CCTV FAQ Dubai", "Uniarch camera support", "NVR troubleshooting UAE", "IP camera setup Dubai",
        "CCTV network configuration", "Uniarch mobile app guide", "security camera warranty UAE",
        "CCTV installation guide Dubai", "how to setup NVR UAE", "surveillance support Middle East",
        "PrimoTech FAQ", "camera offline troubleshoot", "AI detection CCTV", "CCTV password change",
        "remote CCTV access UAE", "Uniarch app P2P setup", "CCTV firmware update",
        "export CCTV footage USB", "cloud storage CCTV UAE", "outdoor camera installation tips"
    ],
    openGraph: {
        title: "FAQ | CCTV Camera Support & Troubleshooting - PrimoTech LLC Dubai",
        description: "Expert answers on Uniarch CCTV, NVR setup, mobile app connectivity, AI detection, warranty & installation. PrimoTech LLC, Dubai's #1 authorized security dealer.",
        url: "https://primotech-llc.com/support/faq",
        images: [{ url: "https://primotech-llc.com/og-image.png", width: 1200, height: 630, alt: "PrimoTech LLC FAQ Support" }]
    }
};

export default function FAQPage() {
    const faqPageSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "name": "PrimoTech LLC Security Camera FAQ",
        "description": "Frequently asked questions about Uniarch CCTV systems, NVR setup, network configuration, and technical support from PrimoTech LLC Dubai.",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How do I change the admin password on my Uniarch camera?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Log into the camera's web interface, go to Security > User List, select the admin account, click Edit, enter the new password and confirm. Use a complex password with uppercase letters, numbers, and symbols for better security."
                }
            },
            {
                "@type": "Question",
                "name": "What is the default IP address for Uniarch cameras?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The default IP address is 192.168.1.64 and DHCP is enabled by default. To change it, access the device's web interface and go to Network > TCP/IP Settings to configure a static IP or enable DHCP."
                }
            },
            {
                "@type": "Question",
                "name": "How do I connect Uniarch cameras to the mobile app?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Download the Uniarch app from the App Store or Google Play. Create an account, tap '+' and select 'Scan QR Code'. Scan the QR code on your NVR or camera. Ensure P2P status is 'Online' in network settings for remote access."
                }
            },
            {
                "@type": "Question",
                "name": "What should I do if my camera shows 'Offline' in the mobile app?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Check physical connections and power. Verify the NVR has internet access. Go to Network > P2P on the device web interface and check if status is 'Online'. Try restarting your router and device. Ensure firewall isn't blocking ports 80, 443."
                }
            },
            {
                "@type": "Question",
                "name": "How do I configure Human and Vehicle AI detection on Uniarch cameras?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Access device settings via browser or NVR. Go to Smart Event > Intrusion Detection or Crossline Detection. Enable the feature, draw your detection zone, select 'Human' and/or 'Vehicle' under Detection Target. Set sensitivity to 50-70 and configure push notifications."
                }
            },
            {
                "@type": "Question",
                "name": "What warranty does PrimoTech LLC offer on Uniarch products?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "PrimoTech LLC offers a 3-year limited warranty covering hardware defects and technical support on most Uniarch products. Extended warranty plans are available. Contact sales@primotech-llc.com for warranty registration."
                }
            },
            {
                "@type": "Question",
                "name": "What are the best practices for outdoor CCTV camera installation?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Use IP67-rated weatherproof cameras. Mount on surfaces that can support 3x the device weight. Keep at least 3 feet from trees. Use waterproof cable glands. For PoE cameras, use outdoor-rated Ethernet and surge protection."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
            />
            <FAQPageClient />
        </>
    );
}
