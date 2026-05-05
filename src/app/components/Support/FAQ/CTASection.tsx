'use client';

import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaBook, FaArrowRight } from 'react-icons/fa';

const CTASection = () => {
    return (
        <section className="bg-white py-24 px-6 border-t border-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="bg-[#001F3F] rounded-[4rem] p-12 md:p-20 relative overflow-hidden text-center">
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#14C8D4]/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#14C8D4]/5 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
                    
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-[40px] md:text-[56px] font-black text-white mb-6 leading-tight tracking-tight">
                            Still have <span className="text-[#14C8D4]">questions?</span>
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl mb-16 font-medium leading-relaxed">
                            Can't find the answer you're looking for? Our dedicated support team is available 24/7 to provide personalized assistance.
                        </p>

                        {/* Support Channels */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
                            <div className="group bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/10 hover:border-[#14C8D4]/30 transition-all">
                                <div className="w-14 h-14 bg-[#14C8D4]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#14C8D4] group-hover:text-[#001F3F] transition-all">
                                    <FaEnvelope className="text-[#14C8D4] group-hover:text-inherit text-xl" />
                                </div>
                                <h4 className="text-white font-black text-lg mb-2">Email Support</h4>
                                <p className="text-gray-500 text-sm font-medium">response within 24hrs</p>
                            </div>

                            <div className="group bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/10 hover:border-[#14C8D4]/30 transition-all">
                                <div className="w-14 h-14 bg-[#14C8D4]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#14C8D4] group-hover:text-[#001F3F] transition-all">
                                    <FaPhoneAlt className="text-[#14C8D4] group-hover:text-inherit text-xl" />
                                </div>
                                <h4 className="text-white font-black text-lg mb-2">Phone Support</h4>
                                <p className="text-gray-500 text-sm font-medium">Mon-Fri, 9am-6pm</p>
                            </div>

                            <div className="group bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/10 hover:border-[#14C8D4]/30 transition-all">
                                <div className="w-14 h-14 bg-[#14C8D4]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#14C8D4] group-hover:text-[#001F3F] transition-all">
                                    <FaBook className="text-[#14C8D4] group-hover:text-inherit text-xl" />
                                </div>
                                <h4 className="text-white font-black text-lg mb-2">Live Chat</h4>
                                <p className="text-gray-500 text-sm font-medium">Instant help online</p>
                            </div>
                        </div>

                        <a 
                            href="/contact" 
                            className="inline-flex items-center gap-4 bg-[#14C8D4] text-[#001F3F] px-12 py-5 rounded-full font-black text-xl hover:bg-white transition-all hover:shadow-2xl hover:shadow-[#14C8D4]/20 active:scale-95"
                        >
                            Contact Support Team
                            <FaArrowRight className="text-lg" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
