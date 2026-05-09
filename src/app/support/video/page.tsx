import { Metadata } from 'next';
import VideoLibraryClient from './VideoLibraryClient';

export const metadata: Metadata = {
    title: "Video Library | Uniarch CCTV Tutorials & Product Demos - PrimoTech LLC Dubai",
    description: "Watch expert Uniarch CCTV unboxing videos, product demonstrations, and security camera tutorials from PrimoTech LLC. Learn about the Panda S3S dual lens, Outdoor Bullet Camera, 1080p HD systems, and Wi-Fi PT cameras.",
    alternates: { canonical: "/support/video" },
    keywords: [
        "Uniarch CCTV video tutorial", "CCTV unboxing Dubai", "security camera demo UAE",
        "Panda S3S dual lens review", "Uniarch outdoor bullet camera", "1080p CCTV review",
        "IP67 waterproof camera video", "Wi-Fi PT camera tutorial", "Uniarch S3E setup guide",
        "CCTV product demo Middle East", "PrimoTech video library", "surveillance camera review UAE",
        "Uniarch camera unboxing", "security camera setup guide", "NVR setup video Dubai"
    ],
    openGraph: {
        title: "Video Library | Uniarch CCTV Tutorials & Demos - PrimoTech LLC",
        description: "Expert CCTV unboxing videos and product demonstrations. Uniarch cameras, NVRs and surveillance systems in action.",
        url: "https://primotech-llc.com/support/video",
        images: [{ url: "https://primotech-llc.com/og-image.png", width: 1200, height: 630, alt: "PrimoTech LLC Video Library" }]
    }
};

const videos = [
    {
        id: 'F7OsptSrtOg',
        title: 'UNBOXING | Uniarch Wired Security Camera',
        description: 'Experience 1080p HD super video quality with the latest Uniarch wired solutions.',
        category: 'Unboxing',
        tag: '1080p HD'
    },
    {
        id: 'dNsWCI8RENE',
        title: "Unboxing Uniarch's Outdoor Bullet Camera",
        description: 'Explore the IP67 waterproofing and rugged build of the Outdoor Bullet series.',
        category: 'Unboxing',
        tag: 'IP67 Waterproof'
    },
    {
        id: 'uPOZNVVzbLs',
        title: 'Uniarch Panda S3S Dual Lens Wi-Fi PT Camera',
        description: 'S3S Dual - Dual Lens for Complete Protection and 360° coverage.',
        category: 'Product Demo',
        tag: 'Dual Lens'
    },
    {
        id: 'vwJMFP3MiFM',
        title: 'Unboxing Panda S3E & S3E Pro',
        description: 'Detailed look at the Wi-Fi PT Camera S3E & S3E Pro series features.',
        category: 'Unboxing',
        tag: 'Wi-Fi PT'
    }
];

export default function VideoLibraryPage() {
    const videoListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "PrimoTech LLC Uniarch CCTV Video Library",
        "description": "Expert CCTV unboxing videos and product demonstrations from PrimoTech LLC, Dubai's authorized Uniarch dealer.",
        "url": "https://primotech-llc.com/support/video",
        "itemListElement": videos.map((video, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "VideoObject",
                "name": video.title,
                "description": video.description,
                "embedUrl": `https://www.youtube.com/embed/${video.id}`,
                "url": `https://youtu.be/${video.id}`,
                "thumbnailUrl": `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
                "uploadDate": "2024-01-01",
                "publisher": {
                    "@type": "Organization",
                    "name": "PrimoTech LLC",
                    "url": "https://primotech-llc.com",
                    "logo": { "@type": "ImageObject", "url": "https://primotech-llc.com/logo.png" }
                }
            }
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(videoListSchema) }}
            />
            <VideoLibraryClient />
        </>
    );
}
