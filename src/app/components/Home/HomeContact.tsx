'use client';

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaArrowRight } from 'react-icons/fa';

const HomeContact = () => {
    return (
        <section className="relative w-full bg-white py-32 overflow-hidden">
            {/* Background Decorative Glows */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#14C8D4]/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Full-Width Decorative Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gray-100"></div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-100"></div>

            <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#001F3F]/5 rounded-full mb-10 border border-[#001F3F]/10 backdrop-blur-sm">
                    <span className="text-[#001F3F] font-black uppercase tracking-[0.4em] text-[10px]">Get In Touch</span>
                </div>
                
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-[#001F3F] mb-12 leading-[0.85] tracking-tighter">
                    Ready to Secure <br/> <span className="text-[#14C8D4]">Your Future?</span>
                </h2>
                
                <p className="text-gray-500 text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed mb-20 max-w-4xl mx-auto">
                    Have questions or need a custom security solution? Our experts are standing by to provide the guidance you need.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20">
                    <a 
                        href="/contact"
                        className="group inline-flex items-center gap-6 bg-[#001F3F] hover:bg-[#14C8D4] text-white hover:text-[#001F3F] px-14 py-7 rounded-[2rem] font-black text-2xl lg:text-3xl transition-all duration-500 shadow-2xl hover:-translate-y-2"
                    >
                        Contact Us Now
                        <div className="w-12 h-12 rounded-full bg-[#14C8D4] text-[#001F3F] flex items-center justify-center group-hover:bg-[#001F3F] group-hover:text-[#14C8D4] transition-all duration-500">
                            <FaArrowRight className="text-lg transform group-hover:translate-x-2 transition-transform" />
                        </div>
                    </a>
                    
                    <div className="flex items-center gap-8 text-left">
                        <div className="w-20 h-20 rounded-[1.5rem] bg-gray-50 border border-gray-100 flex items-center justify-center text-[#14C8D4] shadow-sm group hover:bg-[#001F3F] hover:text-white transition-all duration-500">
                            <FaPhoneAlt className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-xs mb-2">Support Line</p>
                            <p className="text-[#001F3F] text-3xl font-black tracking-tight">971 52 879 6664</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Floating Decorative Icons */}
            <div className="absolute bottom-10 left-10 opacity-[0.03] hidden lg:block">
                <FaPaperPlane className="text-[10rem] text-[#001F3F] -rotate-12" />
            </div>
            <div className="absolute top-10 right-10 opacity-[0.03] hidden lg:block">
                <FaEnvelope className="text-[10rem] text-[#001F3F] rotate-12" />
            </div>
        </section>
    );
};

export default HomeContact;
