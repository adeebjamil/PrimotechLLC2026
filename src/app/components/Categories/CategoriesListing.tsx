'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Category {
    _id: string;
    name: string;
    slug: string;
    description1: string;
    image1: string;
    status: string;
}

const CategoryCard = ({ category }: { category: Category }) => {
    return (
        <Link href={`/products/${category.slug}`} className="group block h-full">
            <div className="relative h-full bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-[0_30px_60px_rgba(0,31,63,0.12)] transition-all duration-700 hover:-translate-y-3 flex flex-col">
                {/* Image Container with sophisticated hover */}
                <div className="relative bg-gradient-to-br from-slate-50 to-slate-200 aspect-[4/3] overflow-hidden">
                    <Image
                        src={category.image1 || '/api/placeholder/400/300'}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 group-hover:rotate-1"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    
                    {/* Multi-layered Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/80 via-[#001F3F]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700"></div>
                    
                    {/* Floating Badge */}
                    <div className="absolute top-6 left-6">
                        <span className="bg-white/90 backdrop-blur-md text-[#001F3F] px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl border border-white/20">
                            Enterprise Ready
                        </span>
                    </div>

                    {/* View Details Badge */}
                    <div className="absolute bottom-6 right-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                        <span className="bg-[#14C8D4] text-[#001F3F] px-6 py-3 rounded-2xl text-[10px] uppercase tracking-[0.2em] font-black shadow-2xl flex items-center gap-3">
                            Explore
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-10 flex-1 flex flex-col">
                    <div className="mb-4 flex items-center gap-2">
                        <div className="w-8 h-[2px] bg-[#14C8D4]"></div>
                        <span className="text-[#14C8D4] text-[9px] font-black uppercase tracking-widest">Category</span>
                    </div>
                    <h3 className="font-black text-2xl text-[#001F3F] mb-4 group-hover:text-[#14C8D4] transition-colors leading-tight">
                        {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-6 flex-1">
                        {category.description1}
                    </p>
                    
                    <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-[#001F3F] transition-colors">View Series</span>
                        <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#001F3F] group-hover:bg-[#001F3F] group-hover:text-white transition-all duration-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const CategoriesListing = ({ initialCategories = [] }: { initialCategories?: Category[] }) => {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [filteredCategories, setFilteredCategories] = useState<Category[]>(initialCategories);
    const [loading, setLoading] = useState(initialCategories.length === 0);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            if (initialCategories.length > 0 && categories.length > 0) return;
            
            try {
                setLoading(true);
                const response = await fetch('/api/categories');
                const data = await response.json();
                if (data.success) {
                    const published = data.data.filter((c: Category) => c.status === 'published');
                    setCategories(published);
                    setFilteredCategories(published);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        
        if (initialCategories.length === 0) {
            fetchCategories();
        }
    }, [initialCategories.length, categories.length]);

    useEffect(() => {
        const filtered = categories.filter(cat => 
            cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.description1.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredCategories(filtered);
    }, [searchQuery, categories]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-32">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="animate-pulse bg-gray-50 rounded-[2.5rem] aspect-[4/5]"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#14C8D4]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#001F3F]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Container */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#14C8D4]/10 rounded-full mb-6 border border-[#14C8D4]/20">
                            <span className="text-[#14C8D4] font-black uppercase tracking-[0.3em] text-[9px]">Our Portfolio</span>
                        </div>
                        <h3 className="text-5xl md:text-6xl font-black text-[#001F3F] mb-8 leading-[1.1] tracking-tight">
                            Specialized <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#001F3F] to-[#14C8D4]">Security Solutions</span>
                        </h3>
                        <p className="text-lg text-gray-500 leading-relaxed font-medium">
                            Explore our diverse range of security and networking solutions tailored for enterprise, commercial, and residential needs.
                        </p>
                    </div>

                    {/* Enhanced Search Bar */}
                    <div className="w-full lg:w-[400px] relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#001F3F] to-[#14C8D4] rounded-3xl blur opacity-0 group-focus-within:opacity-10 transition-opacity duration-500"></div>
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search our solutions..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white border-2 border-gray-100 rounded-[1.5rem] py-5 pl-16 pr-8 text-sm font-bold text-[#001F3F] focus:outline-none focus:border-[#14C8D4] transition-all shadow-sm focus:shadow-2xl focus:shadow-[#14C8D4]/10"
                            />
                            <div className="absolute left-6 top-1/2 -translate-y-1/2">
                                <svg className="w-6 h-6 text-gray-300 group-focus-within:text-[#14C8D4] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {filteredCategories.map((category) => (
                        <CategoryCard key={category._id} category={category} />
                    ))}
                </div>

                {filteredCategories.length === 0 && (
                    <div className="text-center py-32 bg-gray-50 rounded-[4rem] border border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-400">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <h4 className="text-2xl font-black text-[#001F3F] mb-2">No Matching Solutions</h4>
                        <p className="text-gray-500 font-medium max-w-md mx-auto">We couldn't find any categories matching your search criteria. Try a different keyword.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CategoriesListing;