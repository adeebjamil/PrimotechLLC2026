'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Product {
    _id: string;
    name: string;
    slug: string;
    category: string;
    images: string[];
}

const LatestProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);
    const isPausedRef = useRef(false);

    const gradients = [
        'from-purple-100/50 to-purple-200/50',
        'from-emerald-100/50 to-emerald-200/50',
        'from-amber-100/50 to-amber-200/50',
        'from-blue-100/50 to-blue-200/50',
        'from-rose-100/50 to-rose-200/50',
        'from-cyan-100/50 to-cyan-200/50',
    ];

    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                if (data.success && data.data && data.data.length > 0) {
                    // Filter to ensure products have names and images
                    const validProducts = data.data.filter((p: Product) => p.name && p.images?.length > 0);
                    // Use all valid products, and triple them for the infinite scroll
                    setProducts([...validProducts, ...validProducts, ...validProducts]);
                }
            } catch (error) {
                console.error('Error fetching latest products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLatest();
    }, []);

    // Auto-scroll logic
    useEffect(() => {
        if (!products.length || !scrollRef.current) return;

        const scrollContainer = scrollRef.current;
        let animationFrameId: number;
        let scrollPos = scrollContainer.scrollLeft;

        const scroll = () => {
            if (!isPausedRef.current) {
                scrollPos += 0.8; // Speed of scroll
                if (scrollPos >= scrollContainer.scrollWidth / 3) {
                    scrollPos = 0;
                }
                scrollContainer.scrollLeft = scrollPos;
            } else {
                scrollPos = scrollContainer.scrollLeft;
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);
        return () => cancelAnimationFrame(animationFrameId);
    }, [products]);

    if (loading || products.length === 0) return null;

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-[100vw] mx-auto">
                <div className="text-center mb-16 px-6">
                    <h2 className="text-5xl lg:text-6xl font-black text-[#001F3F] mb-6 tracking-tight">
                        The latest must-have products
                    </h2>
                    <div className="w-24 h-1.5 bg-[#14C8D4] mx-auto rounded-full shadow-[0_0_10px_rgba(20,200,212,0.3)]"></div>
                </div>

                {/* Carousel Container */}
                <div 
                    ref={scrollRef}
                    onMouseEnter={() => isPausedRef.current = true}
                    onMouseLeave={() => isPausedRef.current = false}
                    className="flex gap-8 overflow-hidden whitespace-nowrap px-8 py-10 no-scrollbar cursor-pointer"
                >
                    {products.map((product, idx) => (
                        <div 
                            key={`${product._id}-${idx}`}
                            onClick={() => window.location.href = `/products/${product.category}/${product.slug}`}
                            className={`flex-shrink-0 w-[300px] h-[400px] rounded-[2.5rem] bg-gradient-to-b ${gradients[idx % gradients.length]} p-6 flex flex-col justify-between shadow-xl shadow-black/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 group`}
                        >
                            {/* Inner Image Container */}
                            <div className="bg-white rounded-3xl p-6 h-[220px] flex items-center justify-center relative shadow-inner overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-transparent opacity-50"></div>
                                <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-700">
                                    <Image
                                        src={product.images[0] || 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=600&fit=crop'}
                                        alt={product.name}
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="pt-6 px-2 space-y-2">
                                <p className="text-rose-600 font-black text-[10px] uppercase tracking-[0.2em]">
                                    {product.category}
                                </p>
                                <h3 className="text-xl font-black text-[#001F3F] leading-tight whitespace-normal line-clamp-2">
                                    {product.name}
                                </h3>
                                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest truncate">
                                    {product.slug}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Know More Button */}
                <div className="mt-20 text-center">
                    <button 
                        onClick={() => window.location.href = '/products'}
                        className="group relative inline-flex items-center gap-3 px-12 py-5 bg-[#001F3F] text-white rounded-full font-black text-lg hover:bg-[#14C8D4] transition-all duration-300 shadow-[0_20px_40px_rgba(0,31,63,0.2)] hover:shadow-[0_20px_40px_rgba(20,200,212,0.3)] hover:-translate-y-1 active:scale-95"
                    >
                        <span>Know More</span>
                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default LatestProducts;
