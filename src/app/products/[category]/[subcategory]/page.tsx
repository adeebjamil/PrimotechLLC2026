'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import SubcategoryProductsListing from '@/app/components/Categories/SubcategoryProductsListing';
import { FaChevronRight, FaHome } from 'react-icons/fa';
import Link from 'next/link';

const SubcategoryPage = () => {
    const params = useParams();
    const [subcategoryData, setSubcategoryData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubcategory = async () => {
            if (params?.subcategory) {
                try {
                    setLoading(true);
                    const response = await fetch('/api/subcategories');
                    const data = await response.json();
                    if (data.success) {
                        const found = data.data.find((s: any) => s.slug === params.subcategory);
                        setSubcategoryData(found);
                    }
                } catch (error) {
                    console.error('Error fetching subcategory:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchSubcategory();
    }, [params?.subcategory]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-12 h-12 border-4 border-[#14C8D4] border-t-transparent rounded-full animate-spin"></div>
        </div>;
    }

    if (!subcategoryData) {
        return (
            <div className="py-40 text-center">
                <h1 className="text-2xl font-bold">Sub-Category Not Found</h1>
                <p>Checked slug: {params?.subcategory}</p>
                <Link href="/products" className="text-blue-500 underline">Back to products</Link>
            </div>
        );
    }

    const categorySlug = params?.category as string;

    return (
        <main className="bg-white">
            {/* Premium Header */}
            <div className="relative bg-[#001F3F] pt-40 pb-32 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#14C8D4]/5 rounded-full -mr-96 -mt-96 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#14C8D4]/5 rounded-full -ml-48 -mb-48 blur-2xl"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                            {/* Refined Breadcrumbs */}
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#14C8D4] mb-12 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                                <Link href="/" className="hover:text-white transition-colors flex items-center gap-2"><FaHome className="text-xs" /> Home</Link>
                                <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                                <Link href="/products" className="hover:text-white transition-colors">Products</Link>
                                <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                                <Link href={`/products/${categorySlug}`} className="hover:text-white transition-colors">{categorySlug?.replace(/-/g, ' ')}</Link>
                                <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                                <span className="text-white">{subcategoryData.name}</span>
                            </div>

                            {/* Title Section */}
                            <div className="relative group mb-8">
                                <div className="absolute -inset-4 bg-gradient-to-r from-[#14C8D4]/0 via-[#14C8D4]/10 to-[#14C8D4]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-xl"></div>
                                <h1 className="relative text-5xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-none">
                                    {subcategoryData.name.split(' ').map((word: string, i: number) => (
                                        <span key={i} className={i === 0 ? "block" : "text-transparent bg-clip-text bg-gradient-to-r from-white to-[#14C8D4]"}>
                                            {word}{' '}
                                        </span>
                                    ))}
                                </h1>
                            </div>

                            <p className="text-xl text-white/60 max-w-2xl leading-relaxed font-medium mb-12">
                                {subcategoryData.description || `Discover our state-of-the-art ${subcategoryData.name} solutions, precision-engineered for professional-grade security and reliability.`}
                            </p>

                            {/* Tech Specs Summary Bar */}
                            <div className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-12">
                                <div className="flex flex-col items-center lg:items-start">
                                    <span className="text-[10px] font-black text-[#14C8D4] uppercase tracking-widest mb-1">Status</span>
                                    <span className="text-white font-bold">In Stock</span>
                                </div>
                                <div className="w-px h-10 bg-white/10 hidden md:block"></div>
                                <div className="flex flex-col items-center lg:items-start">
                                    <span className="text-[10px] font-black text-[#14C8D4] uppercase tracking-widest mb-1">Grade</span>
                                    <span className="text-white font-bold">Enterprise</span>
                                </div>
                                <div className="w-px h-10 bg-white/10 hidden md:block"></div>
                                <div className="flex flex-col items-center lg:items-start">
                                    <span className="text-[10px] font-black text-[#14C8D4] uppercase tracking-widest mb-1">Support</span>
                                    <span className="text-white font-bold">24/7 Expert</span>
                                </div>
                            </div>
                        </div>

                        {/* Subcategory Image Display */}
                        <div className="relative flex justify-center lg:justify-end">
                            <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                                {/* Glowing rings */}
                                <div className="absolute inset-0 border-2 border-[#14C8D4]/20 rounded-full animate-pulse-slow"></div>
                                <div className="absolute inset-4 border border-[#14C8D4]/10 rounded-full animate-pulse-slow delay-700"></div>
                                
                                <div className="absolute inset-8 bg-gradient-to-br from-white to-gray-50 rounded-full shadow-2xl overflow-hidden p-12 border border-white/20 group">
                                    <div className="absolute inset-0 bg-[#001F3F]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <img 
                                        src={subcategoryData.image || '/api/placeholder/400/400'} 
                                        alt={subcategoryData.name} 
                                        className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110"
                                    />
                                </div>

                                {/* Floating badges */}
                                <div className="absolute -top-4 right-0 bg-[#001F3F] text-[#14C8D4] text-[8px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-2xl border border-white/10">
                                    Pro Grade
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Texture for Body */}
            <div className="relative bg-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.3]"></div>
                <SubcategoryProductsListing subcategoryName={subcategoryData.name} categorySlug={categorySlug} subcategorySlug={params.subcategory as string} />
            </div>
        </main>
    );
};

export default SubcategoryPage;
