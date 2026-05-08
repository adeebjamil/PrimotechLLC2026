import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import ProductDetail from '@/app/components/Products/ProductDetail';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
    const { category, subcategory, product } = await params;
    await dbConnect();
    const productData = await Product.findOne({ slug: product });

    if (!productData) {
        return { title: 'Product Not Found' };
    }

    return {
        title: `${productData.name} | ${productData.subTitle || 'Premium Security Product'} - PrimoTech LLC`,
        description: productData.description.substring(0, 160),
        keywords: [
            `${productData.name} UAE`, `${productData.name} Price Dubai`, `${productData.name} Supplier Middle East`,
            `${productData.name} Specification`, `${productData.name} Features`, `${productData.name} Manual`,
            `${productData.subCategory} Solutions`, "PrimoTech LLC Security", "Professional CCTV Camera UAE",
            "Enterprise Surveillance Dubai", "Industrial Monitoring Systems", "AI Powered Security Cameras",
            "4K Surveillance Dubai", "Security System Integration", "High Definition Security UAE",
            "Best CCTV for Business Dubai", "Residential Surveillance Systems", "Night Vision Security UAE",
            "Thermal Camera Solutions Dubai", "IP Camera Supplier UAE", "NVR Systems Dubai",
            "Wireless Security Kits UAE", "Access Control UAE", "Video Intercom Dubai",
            "SIRA Approved CCTV Dubai", "DPS Certified Security UAE", "Security Hardware Supplier",
            "Electronic Security Dubai", "Advanced Surveillance Tech UAE", "CCTV Maintenance Dubai",
            "Network Security Dubai", "Digital Video Recorders UAE", "Remote Monitoring Dubai",
            "Security Consultation UAE", "IoT Security Dubai", "Smart Surveillance UAE",
            "Intrusion Detection Dubai", "Video Management UAE", "Enterprise Security Dubai",
            "Retail Security Dubai", "Bank Security Systems UAE", "Warehouse Surveillance Dubai",
            "Office Security CCTV UAE", "Home Automation Dubai", "Wireless IP Camera UAE",
            "CCTV Accessories Dubai", "Solar Powered CCTV UAE", "Explosion Proof Cameras UAE",
            "Marine Security Systems Dubai", "Professional Security Partner UAE", "Security Infrastructure Dubai"
        ],
        alternates: {
            canonical: `/products/${category}/${subcategory}/${product}`,
        },
    };
}

const ProductPage = async ({ params }: { params: any }) => {
    const { product } = await params;
    await dbConnect();
    const productData = await Product.findOne({ slug: product });

    if (!productData) {
        notFound();
    }

    // Product Schema (AEO/GEO) - Clean version without price/reviews/ratings
    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": productData.name,
        "image": productData.images,
        "description": productData.description,
        "sku": productData.name,
        "brand": {
            "@type": "Brand",
            "name": "PrimoTech LLC"
        },
        "manufacturer": "PrimoTech LLC",
        "category": productData.category
    };

    return (
        <main className="bg-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <ProductDetail />
        </main>
    );
};

export default ProductPage;
