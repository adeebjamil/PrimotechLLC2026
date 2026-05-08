'use client';

import SubcategoryProductsListing from '@/app/components/Categories/SubcategoryProductsListing';
import { FaHome } from 'react-icons/fa';
import Link from 'next/link';

const SubcategoryContent = ({ subcategoryData, categorySlug, initialProducts }: { subcategoryData: any, categorySlug: string, initialProducts: any[] }) => {
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
                            <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-[#14C8D4] mb-8 md:mb-12 bg-white/5 backdrop-blur-md px-4 md:px-6 py-2.5 md:py-3 rounded-full border border-white/10 w-full lg:w-auto overflow-x-auto whitespace-nowrap no-scrollbar">
                                <Link href="/" className="hover:text-white transition-colors flex items-center gap-2 shrink-0"><FaHome className="text-xs" /> Home</Link>
                                <span className="w-1 h-1 bg-white/20 rounded-full shrink-0"></span>
                                <Link href="/products" className="hover:text-white transition-colors shrink-0">Products</Link>
                                <span className="w-1 h-1 bg-white/20 rounded-full shrink-0"></span>
                                <Link href={`/products/${categorySlug}`} className="hover:text-white transition-colors shrink-0">{categorySlug?.replace(/-/g, ' ')}</Link>
                                <span className="w-1 h-1 bg-white/20 rounded-full shrink-0"></span>
                                <span className="text-white shrink-0">{subcategoryData.name}</span>
                            </div>

                            {/* Title Section */}
                            <div className="relative group mb-6 md:mb-8">
                                <div className="absolute -inset-4 bg-gradient-to-r from-[#14C8D4]/0 via-[#14C8D4]/10 to-[#14C8D4]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-xl"></div>
                                <h1 className="relative text-3xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-tight md:leading-none">
                                    {subcategoryData.name.split(' ').map((word: string, i: number) => (
                                        <span key={i} className={i === 0 ? "block" : "text-transparent bg-clip-text bg-gradient-to-r from-white to-[#14C8D4]"}>
                                            {word}{' '}
                                        </span>
                                    ))}
                                </h1>
                            </div>

                            <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed font-medium mb-10 md:mb-12">
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
                        <div className="relative flex justify-center lg:justify-end mt-20 lg:mt-0">
                            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
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
                <SubcategoryProductsListing 
                    subcategoryName={subcategoryData.name} 
                    categorySlug={categorySlug} 
                    subcategorySlug={subcategoryData.slug} 
                    initialProducts={initialProducts}
                />
            </div>
        </main>
    );
};

export default SubcategoryContent;
