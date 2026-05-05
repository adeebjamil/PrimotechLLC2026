'use client';

import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';

interface Technology {
    _id?: string;
    title: string;
    icon: string;
    description: string;
}

interface Category {
    _id: string;
    name: string;
    slug: string;
    description1: string;
    description2: string;
    image1: string;
    image2: string;
    technologies: Technology[];
}

const CategoryDetails = ({ category }: { category: Category }) => {
    return (
        <div className="w-full bg-white">
            {/* Section 1: Intro */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#14C8D4]/10 text-[#14C8D4] text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-[#14C8D4]/20">
                            Core Solutions
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#001F3F] leading-[1.1] tracking-tight">
                            Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#001F3F] to-[#14C8D4]">{category.name}</span> Systems
                        </h2>
                        <div className="w-24 h-2 bg-gradient-to-r from-[#001F3F] to-[#14C8D4] rounded-full"></div>
                        <p className="text-lg text-gray-500 leading-relaxed font-medium max-w-xl">
                            {category.description1}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-6 pt-4">
                            {['Enterprise Ready', '24/7 Reliability', 'AI Enhanced', 'Secure Link'].map((point) => (
                                <div key={point} className="flex items-center gap-3 group">
                                    <div className="w-6 h-6 rounded-lg bg-[#14C8D4]/10 flex items-center justify-center text-[#14C8D4] group-hover:bg-[#14C8D4] group-hover:text-white transition-colors">
                                        <FaCheckCircle className="text-sm" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#001F3F]">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-[#001F3F]/10 to-[#14C8D4]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                        <div className="relative aspect-square rounded-full overflow-hidden shadow-2xl border-8 border-white group-hover:-translate-y-4 transition-transform duration-700 bg-gray-50 flex items-center justify-center">
                            <Image
                                src={category.image1 || '/api/placeholder/800/1000'}
                                alt={category.name}
                                fill
                                className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/20 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Features Grid */}
            <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#14C8D4]/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#001F3F]/5 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/2"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 relative group">
                            <div className="relative aspect-square rounded-full overflow-hidden shadow-2xl border-8 border-white group-hover:scale-[0.98] transition-transform duration-700 bg-white flex items-center justify-center">
                                <Image
                                    src={category.image2 || '/api/placeholder/800/600'}
                                    alt="Technical Specifications"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-[#001F3F]/10"></div>
                            </div>
                            {/* Floating Card */}
                            <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2rem] shadow-2xl border border-gray-100 max-w-xs hidden md:block animate-bounce-slow">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-[#14C8D4] rounded-2xl flex items-center justify-center text-[#001F3F]">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    </div>
                                    <h4 className="font-black text-[#001F3F] text-lg">Peak Performance</h4>
                                </div>
                                <p className="text-gray-500 text-sm font-medium">Engineered for absolute stability in mission-critical environments.</p>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-8">
                            <div className="w-16 h-1.5 bg-[#14C8D4] rounded-full"></div>
                            <h2 className="text-4xl md:text-5xl font-black text-[#001F3F] tracking-tight leading-tight">
                                Why Invest in <span className="text-[#14C8D4]">{category.name}?</span>
                            </h2>
                            <p className="text-lg text-gray-500 leading-relaxed font-medium">
                                {category.description2}
                            </p>
                            
                            <div className="space-y-6 pt-4">
                                {['Military-Grade Encryption', 'Intelligent Motion Tracking', 'Cloud-First Architecture'].map((feature) => (
                                    <div key={feature} className="flex items-center gap-4 group/item">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-[#14C8D4] shadow-sm group-hover/item:bg-[#14C8D4] group-hover/item:text-white transition-all duration-300">
                                            <FaCheckCircle />
                                        </div>
                                        <span className="text-sm font-black uppercase tracking-widest text-[#001F3F]">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default CategoryDetails;