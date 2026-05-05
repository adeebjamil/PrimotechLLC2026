'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// ==================== TYPES ====================
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

// ==================== ICONS COMPONENT ====================
const Icons = {
    BoxOpen: () => (
        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
    ),
};

// ==================== LOADING SKELETON ====================
const ProductSkeleton = () => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <div className="relative bg-gray-100 aspect-[4/3] animate-pulse"></div>
            <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
        </div>
    );
};

// ==================== PRODUCT CARD COMPONENT ====================
const ProductCard = ({ product, categorySlug }: { product: Product; categorySlug: string }) => {
    const subcategorySlug = product.subCategory.toLowerCase().replace(/\s+/g, '-');
    return (
        <Link href={`/products/${categorySlug}/${subcategorySlug}/${product.slug}`} className="group block">
            <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                {/* Image Container */}
                <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 aspect-[4/3] overflow-hidden">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                </div>

                {/* Name Section */}
                <div className="p-5">
                    <h3 className="font-bold text-base text-gray-800 group-hover:text-teal-600 transition-colors">
                        {product.name}
                    </h3>
                </div>
            </div>
        </Link>
    );
};

// ==================== MAIN PRODUCTS LISTING COMPONENT ====================
const CategoriesProductsListing = ({ categoryName }: { categoryName?: string }) => {
    const params = useParams();
    const categorySlug = params?.category as string;

    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<{ name: string; slug: string }[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const [prodRes, catRes] = await Promise.all([
                fetch(categoryName ? `/api/products?category=${encodeURIComponent(categoryName)}` : `/api/products`),
                fetch('/api/categories')
            ]);
            
            const prodData = await prodRes.json();
            const catData = await catRes.json();
            
            if (prodData.success) {
                setProducts(prodData.data.filter((p: Product) => p.status === 'published'));
            }
            if (catData.success) {
                setCategories(catData.data.filter((c: any) => c.status === 'published'));
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to load products. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [categoryName]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
            {/* Page Header */}
            <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="text-left">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                        {categoryName || 'Our Collection'}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                        Discover premium security solutions designed for excellence.
                    </p>
                </div>
                
                {/* Category Switcher Dropdown */}
                <div className="relative min-w-[240px]">
                    <label className="block text-[10px] font-black text-teal-600 uppercase mb-2 tracking-widest">Switch Category</label>
                    <div className="relative">
                        <select 
                            value={categorySlug || ''}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val) window.location.href = `/products/${val}`;
                            }}
                            className="w-full bg-white border-2 border-gray-100 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 outline-none focus:border-teal-500 transition-all appearance-none cursor-pointer shadow-sm pr-10"
                        >
                            <option value="">Select Category</option>
                            {categories.map(c => (
                                <option key={c.slug} value={c.slug}>{c.name}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <ProductSkeleton key={i} />
                    ))}
                </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
                <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={fetchData}
                        className="px-8 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors font-semibold"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && products.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-md mb-6">
                        <Icons.BoxOpen />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        We are currently updating our catalog for this category.
                    </p>
                </div>
            )}

            {/* Products Grid */}
            {!isLoading && !error && products.length > 0 && (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} categorySlug={categorySlug} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default CategoriesProductsListing;