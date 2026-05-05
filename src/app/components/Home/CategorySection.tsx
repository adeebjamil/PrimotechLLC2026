'use client';

import { useState, useEffect } from 'react';
import type { IconType } from 'react-icons';
import { FaCamera, FaServer, FaBatteryFull } from 'react-icons/fa';

// Category Interface
interface Category {
    id: string;
    name: string;
    icon: IconType;
    description: string;
    image: string;
    itemCount: number;
    link: string;
    trending?: boolean;
}

// Redesigned Category Card - Modern Editorial Style with Prominent Image
const CategoryCard = ({ category }: { category: Category }) => (
    <a
        href={category.link}
        className="group relative bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-[0_20px_50px_rgba(20,200,212,0.1)] transition-all duration-500 hover:-translate-y-3 block border border-gray-100"
    >
        {/* Image Container - Takes up 65% of card */}
        <div className="relative h-72 overflow-hidden bg-gray-50">
            {/* Actual Image */}
            <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />

            {/* Gradient Overlay on Image */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Trending Badge - Top Left */}
            {category.trending && (
                <div className="absolute top-6 left-6 z-10">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#3B7597] text-[#001F3F] text-xs font-black uppercase tracking-widest rounded-full shadow-xl">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                        </svg>
                        Trending
                    </span>
                </div>
            )}

            {/* Icon Badge - Bottom Right of Image */}
            <div className="absolute bottom-6 right-6 z-10 w-16 h-16 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-[#3B7597] transition-all duration-500 border border-white/20">
                <category.icon className="text-3xl text-[#3B7597] group-hover:text-[#001F3F] transition-colors duration-500" />
            </div>
        </div>

        {/* Content Section - Below Image */}
        <div className="relative p-8 pb-10">
            {/* Category Name & Count Row */}
            <div className="flex items-start justify-between mb-4">
                <h3 className="text-3xl font-black text-[#001F3F] group-hover:text-[#3B7597] transition-colors duration-500 tracking-tight">
                    {category.name}
                </h3>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2 font-medium">
                {category.description}
            </p>

            {/* Action Row */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <span className="text-sm font-black text-[#3B7597] flex items-center gap-3 group-hover:gap-5 transition-all duration-500">
                    Browse Category
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </span>

                <span className="flex-shrink-0 ml-2 px-4 py-2 bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-widest rounded-full group-hover:bg-[#f0fdfe] group-hover:text-[#3B7597] transition-all border border-transparent group-hover:border-[#3B7597]/20">
                    {category.itemCount}+ items
                </span>
            </div>
        </div>

        {/* Bottom Accent Line - Appears on Hover */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#3B7597] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
    </a>
);

// Main Category Section Component
const CategorySection = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/categories');
                const data = await response.json();
                if (data.success) {
                    const mappedCats = data.data.map((cat: any) => {
                        // Map icon based on name
                        let Icon = FaCamera;
                        if (cat.name.toLowerCase().includes('server') || cat.name.toLowerCase().includes('ip')) Icon = FaServer;
                        if (cat.name.toLowerCase().includes('power') || cat.name.toLowerCase().includes('access')) Icon = FaBatteryFull;

                        return {
                            id: cat._id,
                            name: cat.name,
                            icon: Icon,
                            description: cat.description || 'Professional security solutions tailored for your needs',
                            image: cat.image1 || 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=800&q=80',
                            itemCount: 20, // Default for UI
                            link: `/products/${cat.slug}`,
                            trending: cat.name.toLowerCase().includes('wi-fi')
                        };
                    });
                    setCategories(mappedCats);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="py-24 px-6 lg:px-16 max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 border-4 border-[#3B7597] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[#001F3F] font-black uppercase tracking-widest text-sm animate-pulse">Loading Categories...</p>
                </div>
            </div>
        );
    }

    if (categories.length === 0) return null;

    return (
        <section className="py-24 px-6 lg:px-16 max-w-7xl mx-auto overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3B7597]/5 rounded-full blur-3xl -ml-48 -mb-48 pointer-events-none"></div>

            {/* ===== Header ===== */}
            <div className="text-center mb-20">
                <div className="inline-flex items-center gap-4 mb-8">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#3B7597]"></div>
                    <span className="text-sm font-black text-[#3B7597] uppercase tracking-[0.4em]">
                        Browse By
                    </span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#3B7597]"></div>
                </div>

                <h2 className="text-5xl lg:text-7xl font-black text-[#001F3F] mb-6 tracking-tighter">
                    Solutions
                </h2>
                <p className="text-gray-500 text-xl max-w-xl mx-auto font-medium">
                    Discover our complete range organized by solution type
                </p>
            </div>

            {/* ===== Categories Grid ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16 relative z-10">
                {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </section>
    );
};

export default CategorySection;