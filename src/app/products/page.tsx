import ProductsHero from '@/app/components/Products/ProductsHero';
import CategoriesListing from '@/app/components/Categories/CategoriesListing';
import ProductsCTA from '@/app/components/Products/ProductsCTA';
import dbConnect from '@/lib/dbConnect';
import Category from '@/models/Category';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "All Products | Premium CCTV & Security Systems UAE - PrimoTech LLC",
    description: "Explore PrimoTech LLC's complete range of high-definition CCTV cameras, NVRs, wireless surveillance kits, and industrial security solutions. Your one-stop shop for professional surveillance technology in Dubai.",
    keywords: [
        "Security Products UAE", "CCTV Camera Range Dubai", "NVR Systems Middle East", "Wireless Security Kits UAE",
        "Industrial Surveillance Solutions", "PrimoTech Product Catalog", "Professional Security Hardware",
        "Hikvision UAE Products", "Uniarch Dubai Supplier", "IP Camera Catalog UAE", "Security System Accessories",
        "Advanced Monitoring Tech", "Integrated Security Dubai", "Professional CCTV Supplier",
        "Security Hardware UAE", "Surveillance Technology Dubai", "CCTV Installation Hardware",
        "Business Security UAE", "Residential Surveillance Dubai", "AI Powered Security Cameras",
        "4K Security Systems UAE", "Access Control Dubai", "Video Intercom UAE",
        "SIRA Approved CCTV Dubai", "DPS Certified Security UAE", "Security Hardware Distributor",
        "Electronic Security UAE", "Advanced Surveillance Tech Dubai", "CCTV Maintenance Hardware",
        "Network Security Dubai", "Digital Video Recorders UAE", "Remote Monitoring Hardware",
        "Security Consultation Dubai", "IoT Security UAE", "Smart Surveillance Dubai",
        "Thermal Security Cameras UAE", "PTZ Camera Dubai", "Intrusion Detection UAE",
        "Video Management Dubai", "Enterprise Security UAE", "Retail Security Dubai",
        "Bank Security Systems UAE", "Warehouse Surveillance Dubai", "Office Security CCTV",
        "Home Automation Dubai", "Wireless IP Camera UAE", "CCTV Accessories Dubai",
        "Solar Powered CCTV Dubai", "Explosion Proof Cameras UAE", "Marine Security Systems"
    ],
    alternates: {
        canonical: "/products",
    },
};

const Products = async () => {
    await dbConnect();
    const categories = await Category.find({ status: 'published' }).sort({ order: 1 }).lean();

    // CollectionPage Schema
    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "PrimoTech LLC Product Catalog",
        "description": "Full range of professional security and surveillance solutions from PrimoTech LLC.",
        "url": "https://primotech-llc.com/products",
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": categories.map((cat: any, index: number) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `https://primotech-llc.com/products/${cat.slug}`,
                "name": cat.name
            }))
        }
    };

    return (
        <main className="bg-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
            />
            <ProductsHero />
            <CategoriesListing initialCategories={JSON.parse(JSON.stringify(categories))} />
            <ProductsCTA />
        </main>
    );
};

export default Products;