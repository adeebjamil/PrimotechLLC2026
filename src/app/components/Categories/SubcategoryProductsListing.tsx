'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch, FaArrowRight, FaBoxOpen, FaInfoCircle } from 'react-icons/fa';

interface Product {
    _id: string;
    name: string;
    slug: string;
    category: string;
    subCategory: string;
    description: string;
    images: string[];
    status: string;
}

const ProductSkeleton = () => {
    return (
        <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm p-6">
            <div className="relative bg-gray-100 aspect-square rounded-full animate-pulse mb-8"></div>
            <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
        </div>
    );
};

const ProductCard = ({ product, categorySlug, subcategorySlug }: { product: Product; categorySlug: string, subcategorySlug: string }) => {
    return (
        <Link href={`/products/${categorySlug}/${subcategorySlug}/${product.slug}`} className="group block h-full">
            <div className="relative h-full bg-white rounded-[2.5rem] p-8 overflow-hidden border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(20,200,212,0.1)] transition-all duration-700 flex flex-col group">
                
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#14C8D4]/5 rounded-bl-[5rem] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>

                {/* Circular Image Container */}
                <div className="relative aspect-square mb-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-full border border-gray-100 shadow-inner group-hover:border-[#14C8D4]/30 transition-colors duration-500"></div>
                    <div className="absolute inset-4 rounded-full overflow-hidden flex items-center justify-center bg-white p-6 shadow-sm">
                        <img
                            src={product.images[0] || '/api/placeholder/400/300'}
                            alt={product.name}
                            onError={(e) => { e.currentTarget.src = '/api/placeholder/400/300'; }}
                            className="max-w-full max-h-full object-contain transition-transform duration-700"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-0.5 bg-[#14C8D4] rounded-full group-hover:w-12 transition-all duration-500"></div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{product.subCategory}</span>
                    </div>
                    
                    <h3 className="font-black text-2xl text-[#001F3F] mb-4 group-hover:text-[#14C8D4] transition-colors line-clamp-2 leading-tight">
                        {product.name}
                    </h3>
                    
                    <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed mb-8 flex-1">
                        {product.description || 'Explore the technical specifications and advanced features of this premium security solution.'}
                    </p>

                    <div className="flex items-center justify-start gap-4 pt-6 border-t border-gray-50">
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#001F3F] flex items-center gap-2 group-hover:text-[#14C8D4] transition-colors">
                            Explore Detail
                            <FaArrowRight className="text-[10px] transition-all duration-500" />
                        </span>
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#001F3F] transition-all duration-500">
                            <FaInfoCircle className="text-sm" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const SubcategoryProductsListing = ({ subcategoryName, categorySlug, subcategorySlug, initialProducts = [] }: { subcategoryName: string, categorySlug: string, subcategorySlug: string, initialProducts?: Product[] }) => {
    const [isLoading, setIsLoading] = useState(initialProducts.length === 0);
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        if (initialProducts.length > 0 && products.length > 0) return;
        
        try {
            setIsLoading(true);
            setError(null);

            const res = await fetch(`/api/products?subCategory=${encodeURIComponent(subcategoryName)}`);
            const data = await res.json();
            
            if (data.success) {
                const published = data.data.filter((p: Product) => p.status === 'published');
                setProducts(published);
                setFilteredProducts(published);
            } else {
                setError('Failed to load products. Please try again.');
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to load products. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [subcategoryName, initialProducts, products.length]);

    useEffect(() => {
        if (initialProducts.length === 0) {
            fetchData();
        }
    }, [fetchData, initialProducts.length]);

    useEffect(() => {
        const filtered = products.filter(prod => 
            prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            prod.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
            
            {/* Sophisticated Header & Search Area */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-24">
                <div className="max-w-2xl relative">
                    <div className="absolute -left-8 top-0 w-1 h-24 bg-gradient-to-b from-[#14C8D4] to-transparent hidden md:block"></div>
                    <h2 className="text-[10px] font-black text-[#14C8D4] uppercase tracking-[0.4em] mb-4">Product Ecosystem</h2>
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#001F3F] mb-6 tracking-tight">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#001F3F] via-[#14C8D4] to-[#001F3F] bg-[length:200%_auto] animate-gradient">Inventory</span>
                    </h3>
                    <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
                        Deep dive into our high-performance {subcategoryName} range, engineered for elite security and precision monitoring.
                    </p>
                </div>

                {/* Premium Search Component */}
                <div className="w-full lg:w-[450px] relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#14C8D4]/20 to-[#001F3F]/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative bg-white border-2 border-gray-100 rounded-[2rem] p-2 flex items-center transition-all duration-500 group-hover:border-[#14C8D4]/30 group-focus-within:border-[#14C8D4] shadow-sm group-focus-within:shadow-2xl">
                        <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-focus-within:bg-[#001F3F] group-focus-within:text-[#14C8D4] transition-all duration-500">
                            <FaSearch />
                        </div>
                        <input 
                            type="text" 
                            placeholder={`Search ${subcategoryName} devices...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1 bg-transparent border-none py-4 px-6 text-sm font-bold text-[#001F3F] focus:outline-none placeholder:text-gray-300"
                        />
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {[...Array(8)].map((_: any, i: number) => (
                        <ProductSkeleton key={i} />
                    ))}
                </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
                <div className="text-center py-32 bg-gray-50 rounded-[4rem] border border-dashed border-gray-200">
                    <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
                        <FaInfoCircle className="text-3xl" />
                    </div>
                    <h3 className="text-2xl font-black text-[#001F3F] mb-4">Technical Interruption</h3>
                    <p className="text-gray-500 mb-10 max-w-md mx-auto">{error}</p>
                    <button
                        onClick={fetchData}
                        className="px-10 py-4 bg-[#001F3F] text-white rounded-2xl hover:bg-[#14C8D4] hover:text-[#001F3F] transition-all font-black text-[10px] uppercase tracking-widest shadow-xl"
                    >
                        Re-establish Connection
                    </button>
                </div>
            )}

            {/* Empty State - Redesigned */}
            {!isLoading && !error && filteredProducts.length === 0 && (
                <div className="text-center py-40 bg-gradient-to-b from-gray-50 to-white rounded-[4rem] border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#14C8D4] to-transparent"></div>
                    <div className="relative z-10">
                        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl border border-gray-50 group-hover:scale-110 transition-transform duration-700">
                            <FaBoxOpen className="text-5xl text-gray-200 group-hover:text-[#14C8D4] transition-colors" />
                        </div>
                        <h3 className="text-3xl font-black text-[#001F3F] mb-4 tracking-tight">No Products Synchronized</h3>
                        <p className="text-gray-400 max-w-md mx-auto font-medium leading-relaxed mb-12">
                            We haven't cataloged any {subcategoryName} models in our digital ecosystem yet. Please check back shortly or explore our other security solutions.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href="/products" className="px-8 py-4 bg-[#001F3F] text-[#14C8D4] rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#14C8D4] hover:text-[#001F3F] transition-all shadow-xl">
                                Browse All Categories
                            </Link>
                            <Link href="/contact" className="px-8 py-4 bg-white border-2 border-gray-100 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-[#14C8D4] hover:text-[#001F3F] transition-all">
                                Request Catalog
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Results Grid */}
            {!isLoading && !error && filteredProducts.length > 0 && (
                <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <ProductCard 
                            key={product._id} 
                            product={product} 
                            categorySlug={categorySlug} 
                            subcategorySlug={subcategorySlug} 
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default SubcategoryProductsListing;

