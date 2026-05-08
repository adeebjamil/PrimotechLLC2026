import dbConnect from '@/lib/dbConnect';
import SubCategory from '@/models/SubCategory';
import Product from '@/models/Product';
import SubcategoryContent from './SubcategoryContent';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
    const { category, subcategory } = await params;
    await dbConnect();
    const subcategoryData = await SubCategory.findOne({ slug: subcategory });

    if (!subcategoryData) {
        return { title: 'Sub-Category Not Found' };
    }

    return {
        title: `${subcategoryData.name} | Professional Security Equipment - PrimoTech LLC`,
        description: `Explore our specialized ${subcategoryData.name} range in the ${category} category. High-performance, enterprise-grade security solutions from PrimoTech LLC.`,
        keywords: [
            `${subcategoryData.name} UAE`, `${subcategoryData.name} Dubai`, `Professional ${subcategoryData.name}`,
            `${subcategoryData.name} Price UAE`, `${subcategoryData.name} Installation`,
            "Security Equipment", "PrimoTech LLC", "CCTV Middle East", "Surveillance Solutions Dubai",
            "Industrial Security Camera", "IP Surveillance UAE", "NVR Systems Dubai", "4K Security Camera UAE",
            "Professional Surveillance Tech", "Security Hardware Supplier Dubai", "Advanced Monitoring UAE",
            "Business Security Systems", "Residential CCTV Dubai", "AI Surveillance Technology",
            "4K Security Cameras Dubai", "Access Control Systems UAE", "Video Management Software",
            "Cloud CCTV Storage UAE", "Mobile Security App Dubai", "Authorized Uniarch Dealer",
            "Electronic Security Solutions", "Advanced Surveillance Tech", "CCTV Maintenance UAE",
            "Network Security Cameras", "Digital Video Recorders", "Abu Dhabi CCTV Supplier",
            "Sharjah Security Systems", "SIRA Approved CCTV", "DPS Certified Security UAE",
            "High Definition Surveillance", "Remote Monitoring Dubai", "Security Consultation UAE",
            "IoT Security Devices", "Smart Surveillance UAE", "Thermal Security Cameras",
            "PTZ Camera Solutions", "Intrusion Detection Systems", "Video Intercom Systems",
            "Security Integration UAE", "Enterprise Security Dubai", "Retail Security Solutions",
            "Bank Security Systems UAE", "Warehouse Surveillance", "Office Security CCTV",
            "Home Automation Dubai", "Wireless IP Cameras UAE", "CCTV Accessories Supplier"
        ],
        alternates: {
            canonical: `/products/${category}/${subcategory}`,
        },
    };
}

const SubcategoryPage = async ({ params }: { params: any }) => {
    const { category, subcategory } = await params;
    await dbConnect();
    
    // Fetch Subcategory Data
    const subcategoryData = await SubCategory.findOne({ slug: subcategory });

    if (!subcategoryData) {
        notFound();
    }

    // Fetch Products for this subcategory (Server-Side)
    const products = await Product.find({ 
        subCategory: subcategoryData.name,
        status: 'published' 
    }).lean();

    // CollectionPage Schema
    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": subcategoryData.name,
        "description": subcategoryData.description || `Specialized security solutions from the ${subcategoryData.name} series.`,
        "url": `https://primotech-llc.com/products/${category}/${subcategory}`,
        "mainEntity": {
            "@type": "ItemList",
            "itemListElement": products.map((prod: any, index: number) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `https://primotech-llc.com/products/${category}/${subcategory}/${prod.slug}`,
                "name": prod.name
            }))
        }
    };

    return (
        <main className="bg-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
            />
            <SubcategoryContent 
                subcategoryData={JSON.parse(JSON.stringify(subcategoryData))} 
                categorySlug={category} 
                initialProducts={JSON.parse(JSON.stringify(products))}
            />
        </main>
    );
};

export default SubcategoryPage;
