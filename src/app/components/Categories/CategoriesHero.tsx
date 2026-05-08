'use client';

import { FaHome, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

interface Category {
    _id: string;
    name: string;
    image1: string;
    slug: string;
}

interface HeroProps {
    category?: Category;
}

const Hero = ({ category }: HeroProps) => {
    return (
        <section className="relative overflow-hidden bg-[#001F3F] min-h-[60vh] md:min-h-[70vh] flex items-center pt-24">
            {/* Immersive Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105"
                style={{
                    backgroundImage: `url('${category?.image1 || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2000&q=80'}')`
                }}
            ></div>

            {/* Premium Multi-layered Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#001F3F] via-[#001F3F]/80 to-transparent z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F] via-transparent to-transparent z-0"></div>

            {/* High-Tech Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" 
                style={{ backgroundImage: 'radial-gradient(#14C8D4 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
                <div className="max-w-4xl">
                    {/* Integrated Breadcrumbs */}
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.3em] text-[#14C8D4] mb-10 overflow-x-auto whitespace-nowrap no-scrollbar py-2">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-2 font-bold shrink-0"><FaHome className="text-sm" /> Home</Link>
                        <FaChevronRight className="text-[8px] text-white/30 shrink-0" />
                        <Link href="/products" className="hover:text-white transition-colors font-bold shrink-0">Products</Link>
                        <FaChevronRight className="text-[8px] text-white/30 shrink-0" />
                        <span className="text-white/60 font-bold shrink-0">{category?.name}</span>
                    </div>

                    {/* Category Identifier */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-px bg-[#14C8D4]/50"></div>
                        <span className="text-[#14C8D4] font-black uppercase tracking-[0.4em] text-[10px]">Premium Solution</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-[1.1] md:leading-[0.85] tracking-tighter drop-shadow-2xl uppercase">
                        {category?.name?.split(' ')[0]}<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#14C8D4] to-[#14C8D4]">
                            {category?.name?.split(' ').slice(1).join(' ')}
                        </span>
                    </h1>

                    {/* Description Paragraph */}
                    <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mt-10 leading-relaxed font-medium drop-shadow-lg border-l-4 border-[#14C8D4] pl-8">
                        Experience industrial-grade {category?.name} technology designed for uncompromising surveillance and security infrastructure.
                    </p>

                    {/* Floating Tech Elements */}
                    <div className="mt-16 flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#14C8D4]/10 border border-[#14C8D4]/20 flex items-center justify-center text-[#14C8D4]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            </div>
                            <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">Certified Hardware</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#14C8D4]/10 border border-[#14C8D4]/20 flex items-center justify-center text-[#14C8D4]">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <span className="text-white/60 text-[10px] font-black uppercase tracking-widest">Smart AI Integration</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Glow and Divider */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#14C8D4]/50 to-transparent"></div>
        </section>
    );
};

export default Hero;