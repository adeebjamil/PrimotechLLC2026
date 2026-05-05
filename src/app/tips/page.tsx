'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaArrowRight, FaChevronRight, FaFilter } from 'react-icons/fa';
import { tipsData } from './tipsData';

const TipsPage = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = useMemo(() => {
        const cats = tipsData.map(article => article.category);
        return ['All', ...Array.from(new Set(cats))];
    }, []);

    const filteredArticles = useMemo(() => {
        if (activeCategory === 'All') return tipsData;
        return tipsData.filter(article => article.category === activeCategory);
    }, [activeCategory]);

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-24 lg:py-32 bg-[#001F3F] overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#14C8D4]/5 rounded-full blur-[150px] -mr-64 -mt-64"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#14C8D4]/5 rounded-full blur-[150px] -ml-64 -mb-64"></div>
                
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#14C8D4]/10 rounded-full mb-10 border border-[#14C8D4]/20 backdrop-blur-sm">
                        <span className="text-[#14C8D4] font-black uppercase tracking-[0.4em] text-[10px]">Tips & Guides</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-10 tracking-tighter leading-[0.85]">
                        Expert <br/> <span className="text-[#14C8D4]">Insights</span>
                    </h1>
                    <p className="text-gray-400 text-xl md:text-2xl max-w-4xl mx-auto font-medium leading-relaxed mb-12">
                        Expert insights and practical solutions for your security technology needs. Discover comprehensive guides to enhance your experience.
                    </p>
                    <button className="bg-[#14C8D4] hover:bg-white text-[#001F3F] px-12 py-5 rounded-full font-black text-lg transition-all duration-500 shadow-xl flex items-center gap-4 mx-auto group">
                        Explore Articles
                        <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            </section>

            {/* Filter Section */}
            <section className="pt-20 px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto border-b border-gray-100 pb-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="flex items-center gap-4 text-[#001F3F]">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-xl">
                                <FaFilter className="text-[#14C8D4]" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black">Filter Guides</h3>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Select a category to browse</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-500 ${
                                        activeCategory === cat 
                                        ? 'bg-[#001F3F] text-[#14C8D4] shadow-xl shadow-[#001F3F]/20' 
                                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-20 px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                        {filteredArticles.map((article, idx) => (
                            <Link 
                                href={`/tips/${article.slug}`} 
                                key={idx}
                                className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <Image 
                                        src={article.image} 
                                        alt={article.title} 
                                        fill
                                        className="object-cover transition-transform duration-700"
                                    />
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-[#14C8D4] text-[#001F3F] px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-10 flex flex-col flex-grow">
                                    <div className="flex items-center gap-3 text-gray-400 text-xs font-black uppercase tracking-widest mb-6">
                                        <FaCalendarAlt className="text-[#14C8D4]" />
                                        {article.date}
                                    </div>
                                    <h2 className="text-2xl font-black text-[#001F3F] mb-6 leading-tight transition-colors">
                                        {article.title}
                                    </h2>
                                    <p className="text-gray-500 font-medium leading-relaxed mb-8 flex-grow line-clamp-3">
                                        {article.description}
                                    </p>
                                    <div className="flex items-center gap-3 text-[#001F3F] font-black uppercase tracking-widest text-[10px] transition-all">
                                        Read Full Article
                                        <FaChevronRight className="text-[#14C8D4]" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default TipsPage;
