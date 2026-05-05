'use client';

import { useState, useEffect } from 'react';

// Featured Product Interface
interface FeaturedProduct {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    badge?: 'NEW' | 'HOT' | 'SALE' | '';
}

// Featured Product Card Component
const FeaturedProductCard = ({ product }: { product: FeaturedProduct }) => {
    const categorySlug = product.category
        .toLowerCase()
        .replace(/\s*&\s*/g, '-and-')
        .replace(/\s+/g, '-');
    const productSlug = product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    return (
        <a
            href={`/products/${categorySlug}/${productSlug}`}
            className="group relative bg-white rounded-3xl shadow-lg hover:shadow-[0_20px_50px_rgba(20,200,212,0.15)] transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[#3B7597]/50 flex-shrink-0 w-full sm:w-[320px] md:w-[340px] lg:w-full block cursor-pointer hover:-translate-y-2"
        >
            {/* Image Container - Larger and More Prominent */}
            <div className="relative bg-gray-50 aspect-video overflow-hidden flex items-center justify-center">
                {/* Decorative Background Shape */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#3B7597] to-[#001F3F]"></div>
                </div>

                {/* Badge - Redesigned */}
                {product.badge && (
                    <div className="absolute top-5 left-5 z-20">
                        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold text-white backdrop-blur-md shadow-lg ${product.badge === 'NEW' ? 'bg-[#3B7597]' :
                            product.badge === 'HOT' ? 'bg-red-500' :
                                product.badge === 'SALE' ? 'bg-orange-500' :
                                    'bg-[#001F3F]'
                            }`}>
                            {product.badge}
                        </span>
                    </div>
                )}

                {/* Product Image */}
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Sophisticated Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Content Section - Refined */}
            <div className="p-7">
                {/* Category Pill */}
                <div className="inline-block mb-3">
                    <span className="text-[10px] font-black text-[#3B7597] bg-[#f0fdfe] px-3 py-1.5 rounded-full uppercase tracking-widest border border-[#3B7597]/10">
                        {product.category}
                    </span>
                </div>

                {/* Title - Enhanced Typography */}
                <h3 className="text-xl font-black text-[#001F3F] mb-3 group-hover:text-[#3B7597] transition-colors duration-300 line-clamp-2 leading-tight">
                    {product.name}
                </h3>

                {/* Description - Better Styling */}
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4 font-medium">
                    {product.description}
                </p>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#3B7597] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
        </a>
    );
};

// Main Featured Products Section Component
const FeaturedProducts = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                if (data.success) {
                    // Take the first 4 products as featured
                    const mappedProducts = data.data.slice(0, 4).map((p: any, index: number) => ({
                        id: p._id,
                        name: p.name,
                        category: p.category,
                        description: p.description,
                        image: p.images?.[0] || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
                        badge: index === 0 ? 'HOT' : index === 1 ? 'NEW' : ''
                    }));
                    setFeaturedProducts(mappedProducts);
                }
            } catch (error) {
                console.error('Error fetching featured products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Auto-scroll every 5 seconds (for mobile carousel)
    useEffect(() => {
        if (featuredProducts.length === 0) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % Math.ceil(featuredProducts.length / 3));
        }, 5000);
        return () => clearInterval(timer);
    }, [featuredProducts]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % Math.ceil(featuredProducts.length / 3));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + Math.ceil(featuredProducts.length / 3)) % Math.ceil(featuredProducts.length / 3));
    };

    if (loading) {
        return (
            <div className="py-20 lg:py-28 px-6 lg:px-8 bg-gray-50 flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium animate-pulse">Loading Premium Products...</p>
                </div>
            </div>
        );
    }

    if (featuredProducts.length === 0) return null;

    return (
        <section className="relative py-20 lg:py-28 px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
            {/* Modern Background Elements */}
            <div className="absolute top-20 right-0 w-80 h-80 bg-teal-100 rounded-full blur-3xl opacity-20 -mr-40 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-15 -ml-48 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Premium Section Header */}
                <div className="text-center mb-16 lg:mb-20">
                    <div className="inline-flex items-center justify-center gap-3 mb-6">
                        <div className="flex-shrink-0 h-px w-10 bg-gradient-to-r from-transparent to-[#3B7597]"></div>
                        <span className="text-sm font-black text-[#3B7597] uppercase tracking-[0.4em]">
                            Our Collection
                        </span>
                        <div className="flex-shrink-0 h-px w-10 bg-gradient-to-l from-transparent to-[#3B7597]"></div>
                    </div>

                    <h2 className="text-5xl lg:text-7xl font-black text-[#001F3F] mb-6 leading-tight tracking-tighter">
                        Featured Solutions
                    </h2>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
                        Explore our top-tier security systems, engineered for maximum performance and reliability.
                    </p>
                </div>

                {/* Desktop Grid View */}
                <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {featuredProducts.slice(0, 4).map((product) => (
                        <FeaturedProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Mobile/Tablet Carousel View */}
                <div className="lg:hidden relative mb-12">
                    <div className="overflow-hidden rounded-3xl">
                        <div
                            className="flex gap-6 transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {featuredProducts.map((product) => (
                                <FeaturedProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>

                    {/* Enhanced Carousel Controls */}
                    <div className="flex justify-center items-center gap-5 mt-10">
                        {/* Previous Button */}
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 bg-white border border-gray-100 rounded-full flex items-center justify-center hover:bg-[#3B7597] hover:text-white hover:border-[#3B7597] transition-all duration-300 shadow-lg active:scale-90"
                            aria-label="Previous products"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Dots Indicator */}
                        <div className="flex gap-3">
                            {[...Array(Math.ceil(featuredProducts.length / 3))].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    className={`rounded-full transition-all duration-500 ${currentIndex === i ? 'bg-[#3B7597] w-10 h-2.5' : 'bg-gray-200 w-2.5 h-2.5'
                                        }`}
                                    aria-label={`Go to slide ${i + 1}`}
                                ></button>
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 bg-white border border-gray-100 rounded-full flex items-center justify-center hover:bg-[#3B7597] hover:text-white hover:border-[#3B7597] transition-all duration-300 shadow-lg active:scale-90"
                            aria-label="Next products"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Premium CTA Button */}
                <div className="text-center mt-16 lg:mt-24">
                    <a href="/products" className="inline-flex items-center gap-4 px-14 py-5 bg-[#001F3F] text-white rounded-full font-black text-xl hover:bg-[#3B7597] transition-all duration-500 group shadow-2xl hover:shadow-[#3B7597]/30 hover:-translate-y-2">
                        Discover Full Catalog
                        <svg className="w-6 h-6 transform group-hover:translate-x-3 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;