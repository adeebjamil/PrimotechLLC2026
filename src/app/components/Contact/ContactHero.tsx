'use client';

import React from 'react';
import { FaHeadset } from 'react-icons/fa';

const ContactHero = () => {
    return (
        <section className="relative pt-32 pb-24 overflow-hidden bg-[#001F3F]">
            {/* Immersive Background Effects */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#14C8D4]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-[#14C8D4]/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 bg-[#14C8D4]/10 border border-[#14C8D4]/20 px-5 py-2.5 rounded-full mb-10">
                    <FaHeadset className="text-[#14C8D4] text-sm" />
                    <span className="text-[#14C8D4] font-black text-xs uppercase tracking-[0.25em]">Connect with Experts</span>
                </div>
                
                <h1 className="text-[64px] md:text-[86px] font-black text-white mb-8 leading-[0.9] tracking-tight">
                    We'd like to hear <span className="text-[#14C8D4]">from you,</span>
                </h1>
                
                <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
                    Ready to transform your business with cutting-edge technology solutions. Let's discuss how PrimoTech can secure your future.
                </p>
            </div>
        </section>
    );
};

export default ContactHero;
