'use client';

import React from 'react';
import { FaQuestionCircle, FaSearch } from 'react-icons/fa';

interface HeroProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const Hero = ({ searchQuery, setSearchQuery }: HeroProps) => {
    return (
        <section className="relative pt-32 pb-24 overflow-hidden bg-[#001F3F]">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#14C8D4]/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#14C8D4]/5 blur-[100px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 bg-[#14C8D4]/10 border border-[#14C8D4]/20 px-5 py-2.5 rounded-full mb-10 animate-fadeIn">
                        <FaQuestionCircle className="text-[#14C8D4] text-sm" />
                        <span className="text-[#14C8D4] font-black text-xs uppercase tracking-[0.2em]">Support Center</span>
                    </div>

                    <h1 className="text-[64px] md:text-[86px] font-black text-white mb-8 leading-[0.9] tracking-tight">
                        Knowledge <span className="text-[#14C8D4]">Base</span>
                    </h1>
                    
                    <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed mb-12">
                        Everything you need to know about setting up and mastering your PrimoTech security ecosystem.
                    </p>

                    {/* Modern Search Bar */}
                    <div className="w-full max-w-2xl relative group">
                        <div className="absolute inset-0 bg-[#14C8D4]/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="relative flex items-center">
                            <FaSearch className="absolute left-8 text-gray-400 text-xl group-focus-within:text-[#14C8D4] transition-colors" />
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for answers (e.g. how to connect Wi-Fi...)"
                                className="w-full bg-white/5 border-2 border-white/10 text-white rounded-full py-6 pl-16 pr-8 text-lg font-medium focus:outline-none focus:border-[#14C8D4] focus:bg-white/10 transition-all placeholder:text-gray-500"
                            />
                        </div>
                    </div>
                    
                    <div className="mt-10 flex flex-wrap justify-center gap-4 text-gray-500 font-bold text-xs uppercase tracking-widest">
                        <span>Popular:</span>
                        <button onClick={() => setSearchQuery("WiFi")} className="text-white hover:text-[#14C8D4] transition-colors">WiFi Setup</button>
                        <span className="text-white/10">•</span>
                        <button onClick={() => setSearchQuery("Cloud")} className="text-white hover:text-[#14C8D4] transition-colors">Cloud Storage</button>
                        <span className="text-white/10">•</span>
                        <button onClick={() => setSearchQuery("Mobile")} className="text-white hover:text-[#14C8D4] transition-colors">Mobile App</button>
                        <span className="text-white/10">•</span>
                        <button onClick={() => setSearchQuery("Warranty")} className="text-white hover:text-[#14C8D4] transition-colors">Warranty</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
