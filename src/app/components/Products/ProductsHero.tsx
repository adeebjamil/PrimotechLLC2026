'use client';

import { FaHome, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

interface ProductsHeroProps {
    title?: string;
    image?: string;
}

const ProductsHero = ({ title, image }: ProductsHeroProps) => {
    return (
        <section
            className="relative overflow-hidden bg-[#001F3F] min-h-[60vh] md:min-h-[70vh] flex items-center pt-20"
        >
            {/* High-Tech Background Image with Parallax-like feel */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 transition-transform duration-[10s] hover:scale-110"
                style={{
                    backgroundImage: `url('${image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2000&q=80'}')`
                }}
            ></div>

            {/* Premium Multi-layered Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#001F3F] via-[#001F3F]/80 to-transparent z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F] via-transparent to-transparent z-0"></div>
            
            {/* Animated Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" 
                style={{ backgroundImage: 'radial-gradient(#14C8D4 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
                <div className="max-w-4xl">
                    {/* Integrated Breadcrumbs */}
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#14C8D4] mb-10 animate-fadeIn">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-2"><FaHome className="text-sm" /> Home</Link>
                        <FaChevronRight className="text-[8px] text-white/30" />
                        <span className="text-white/60">Products</span>
                    </div>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#14C8D4]/10 rounded-full mb-8 border border-[#14C8D4]/20 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14C8D4] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#14C8D4]"></span>
                        </span>
                        <span className="text-[#14C8D4] font-black uppercase tracking-[0.3em] text-[9px]">Enterprise Solutions</span>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-6xl sm:text-7xl md:text-9xl font-black text-white mb-8 leading-[0.85] tracking-tighter drop-shadow-2xl">
                        {title || 'OUR'}<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#14C8D4] to-[#14C8D4]">PRODUCTS</span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mt-10 leading-relaxed font-medium drop-shadow-lg border-l-4 border-[#14C8D4] pl-8">
                        Deploying next-generation security and networking infrastructure. Engineered for absolute reliability and industrial-grade performance in the toughest environments.
                    </p>

                    {/* Decorative Element */}
                    <div className="mt-16 flex items-center gap-4">
                        <div className="w-20 h-1 bg-gradient-to-r from-[#14C8D4] to-transparent rounded-full"></div>
                        <div className="w-3 h-3 border-2 border-[#14C8D4] rotate-45"></div>
                    </div>
                </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#14C8D4]/50 to-transparent"></div>
        </section>
    );
};

export default ProductsHero;
