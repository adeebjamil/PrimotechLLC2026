'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SubCategory {
    _id: string;
    name: string;
    slug: string;
    parentCategory: string;
    image?: string;
    status: string;
}

const SubCategoryCard = ({ subcategory, categorySlug }: { subcategory: SubCategory; categorySlug: string }) => {
    return (
        <Link href={`/products/${categorySlug}/${subcategory.slug}`} className="group block">
            <div className="relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2">
                <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 aspect-[4/3] overflow-hidden p-6 flex items-center justify-center">
                    <img
                        src={subcategory.image || '/api/placeholder/400/300'}
                        alt={subcategory.name}
                        onError={(e) => { e.currentTarget.src = '/api/placeholder/400/300'; }}
                        className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute bottom-4 right-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="bg-[#14C8D4] text-[#001F3F] px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                            Explore Series
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </div>
                </div>

                <div className="p-8 text-center">
                    <h3 className="font-black text-2xl text-[#001F3F] mb-3 group-hover:text-[#14C8D4] transition-colors">
                        {subcategory.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                        Explore our high-performance range of {subcategory.name} solutions designed for advanced security needs.
                    </p>
                </div>
            </div>
        </Link>
    );
};

const SubCategoriesListing = ({ categoryName, categorySlug, initialSubcategories = [] }: { categoryName: string; categorySlug: string; initialSubcategories?: SubCategory[] }) => {
    const [isLoading, setIsLoading] = useState(initialSubcategories.length === 0);
    const [subcategories, setSubcategories] = useState<SubCategory[]>(initialSubcategories);
    const [filteredSubcategories, setFilteredSubcategories] = useState<SubCategory[]>(initialSubcategories);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (initialSubcategories.length > 0 && subcategories.length > 0) return;
            
            try {
                setIsLoading(true);
                const res = await fetch(`/api/subcategories?parentCategory=${encodeURIComponent(categoryName)}`);
                const data = await res.json();
                if (data.success) {
                    const published = data.data.filter((s: SubCategory) => s.status === 'published');
                    setSubcategories(published);
                    setFilteredSubcategories(published);
                }
            } catch (err) {
                console.error('Error fetching subcategories:', err);
            } finally {
                setIsLoading(false);
            }
        };

        if (categoryName && initialSubcategories.length === 0) {
            fetchData();
        }
    }, [categoryName, initialSubcategories.length, subcategories.length]);

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
            <div className="text-center mb-16">
                <h2 className="text-[10px] font-black text-[#14C8D4] uppercase tracking-[0.2em] mb-4">
                    Product Series
                </h2>
                <h3 className="text-4xl md:text-5xl font-black text-[#001F3F] mb-6">
                    Select a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#001F3F] to-[#14C8D4]">Sub-Category</span>
                </h3>
                <div className="w-24 h-1.5 bg-gradient-to-r from-[#001F3F] to-[#14C8D4] mx-auto rounded-full mb-8"></div>
                
                {/* Search Bar */}
                <div className="max-w-xl mx-auto mb-12 relative group">
                    <input 
                        type="text" 
                        placeholder={`Search in ${categoryName}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-[#001F3F] focus:outline-none focus:border-[#14C8D4] transition-all shadow-sm focus:shadow-xl focus:shadow-[#14C8D4]/5"
                    />
                    <svg className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#14C8D4] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    Browse through our specialized {categoryName} series to find the perfect solution.
                </p>
            </div>

            {isLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse bg-gray-100 rounded-[2rem] aspect-[4/5]"></div>
                    ))}
                </div>
            )}

            {!isLoading && filteredSubcategories.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-300">
                    <p className="text-gray-500 font-black text-xs uppercase tracking-widest">No product series match your search.</p>
                </div>
            )}

            {!isLoading && filteredSubcategories.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredSubcategories.map((sub) => (
                        <SubCategoryCard key={sub._id} subcategory={sub} categorySlug={categorySlug} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default SubCategoriesListing;
