'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

interface Product {
    _id: string;
    name: string;
    slug: string;
    category: string;
    subCategory: string;
    images: string[];
}

const RelatedProducts = ({ currentCategory, currentProductId }: { currentCategory: string, currentProductId: string }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                if (data.success) {
                    // Filter by category and exclude current product
                    const related = data.data.filter((p: any) => 
                        p.category === currentCategory && p._id !== currentProductId && p.status === 'published'
                    ).slice(0, 8);
                    setProducts(related);
                }
            } catch (error) {
                console.error('Error fetching related products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRelated();
    }, [currentCategory, currentProductId]);

    const nextSlide = () => {
        if (products.length <= 1) return;
        setCurrentIndex((prev) => (prev + 1) % products.length);
    };

    const prevSlide = () => {
        if (products.length <= 1) return;
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    if (loading || products.length === 0) return null;

    const getSlug = (str: string) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    return (
        <section className="py-32 px-6 bg-white overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-[#14C8D4]/5 rounded-full -ml-48 -mb-48 blur-3xl"></div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-1 bg-[#14C8D4] rounded-full"></div>
                            <span className="text-[#14C8D4] font-black uppercase tracking-[0.4em] text-[10px]">Intelligence Network</span>
                        </div>
                        <h2 className="text-5xl lg:text-7xl font-black text-[#001F3F] tracking-tighter leading-none">Compatible <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#001F3F] to-[#14C8D4]">Ecosystem</span></h2>
                    </div>
                    
                    <div className="flex gap-4">
                        <button onClick={prevSlide} className="w-16 h-16 rounded-full border border-gray-100 flex items-center justify-center text-[#001F3F] hover:bg-[#001F3F] hover:text-[#14C8D4] transition-all duration-500 group shadow-lg">
                            <FaArrowLeft className="group-active:scale-75 transition-transform" />
                        </button>
                        <button onClick={nextSlide} className="w-16 h-16 rounded-full border border-gray-100 flex items-center justify-center text-[#001F3F] hover:bg-[#001F3F] hover:text-[#14C8D4] transition-all duration-500 group shadow-lg">
                            <FaArrowRight className="group-active:scale-75 transition-transform" />
                        </button>
                    </div>
                </div>

                <div className="relative overflow-visible">
                    <div className="flex gap-10 transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentIndex * 350}px)` }}>
                        {products.map((p) => (
                                <Link 
                                    key={p._id} 
                                    href={`/products/${getSlug(p.category)}/${getSlug(p.subCategory)}/${p.slug}`}
                                    className="min-w-[320px] group bg-white rounded-[3rem] p-10 transition-all duration-700 hover:shadow-2xl hover:shadow-[#14C8D4]/10 border border-gray-50 flex flex-col group"
                                >
                                <div className="aspect-square relative mb-10 overflow-hidden rounded-full bg-gray-50 p-10 border border-gray-100 group-hover:border-[#14C8D4]/30 transition-colors duration-700">
                                    <Image 
                                        src={p.images[0] || '/api/placeholder/400/300'} 
                                        alt={p.name} 
                                        fill 
                                        sizes="(max-width: 768px) 100vw, 320px"
                                        className="object-contain transition-transform duration-1000"
                                    />
                                </div>
                                
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-2 h-2 rounded-full bg-[#14C8D4]"></div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{p.subCategory}</p>
                                    </div>
                                    <h3 className="text-2xl font-black text-[#001F3F] group-hover:text-[#14C8D4] transition-colors mb-4 line-clamp-2 leading-tight">{p.name}</h3>
                                </div>
                                
                                <div className="pt-8 border-t border-gray-50 flex items-center justify-start gap-4">
                                    <span className="text-[#001F3F] font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 group-hover:text-[#14C8D4] transition-colors">
                                        View Module
                                        <FaChevronRight className="text-[8px] transition-all" />
                                    </span>
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#001F3F] transition-all duration-500">
                                        <FaArrowRight className="text-sm" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RelatedProducts;
