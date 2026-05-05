import { FaPhoneAlt, FaDownload, FaShieldAlt, FaRocket, FaBookOpen } from 'react-icons/fa';

const ProductsCTA = () => {
    return (
        <section className="relative bg-white py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* High-End Background Accents */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#001F3F]/[0.02] -skew-x-12 transform origin-top-right"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-[#14C8D4]/5 blur-[120px] rounded-full"></div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="bg-[#001F3F] rounded-[3rem] p-8 md:p-16 lg:p-20 shadow-[0_40px_80px_rgba(0,31,63,0.15)] relative overflow-hidden group">
                    {/* Inner Decorative Glow */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#14C8D4]/10 rounded-full blur-[100px] group-hover:bg-[#14C8D4]/20 transition-colors duration-700"></div>
                    
                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#14C8D4]/10 rounded-full mb-8 border border-[#14C8D4]/20">
                                <span className="text-[#14C8D4] font-black uppercase tracking-[0.3em] text-[9px]">Need Expert Help?</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                                Can't Find the <span className="text-[#14C8D4]">Right Solution?</span>
                            </h2>
                            <p className="text-lg text-white/70 mb-12 leading-relaxed max-w-xl">
                                Our security engineers are standing by to help you design the perfect infrastructure for your specific operational requirements.
                            </p>

                            <div className="grid sm:grid-cols-3 gap-6 mb-12">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#14C8D4]">
                                        <FaShieldAlt className="text-xl" />
                                    </div>
                                    <h4 className="text-white font-bold text-sm uppercase tracking-wider">Expert Advice</h4>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#14C8D4]">
                                        <FaRocket className="text-xl" />
                                    </div>
                                    <h4 className="text-white font-bold text-sm uppercase tracking-wider">Quick Setup</h4>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#14C8D4]">
                                        <FaBookOpen className="text-xl" />
                                    </div>
                                    <h4 className="text-white font-bold text-sm uppercase tracking-wider">Full Docs</h4>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10 hover:border-[#14C8D4]/30 transition-all group/card">
                                <h3 className="text-2xl font-black text-white mb-6">Talk to an Engineer</h3>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="tel:+971528796664"
                                        className="flex-1 px-8 py-5 bg-[#14C8D4] text-[#001F3F] rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white transition-all shadow-xl shadow-[#14C8D4]/20 hover:shadow-white/20 active:scale-95"
                                    >
                                        <FaPhoneAlt />
                                        Call Now
                                    </a>
                                    <a
                                        href="/contact"
                                        className="flex-1 px-8 py-5 bg-white text-[#001F3F] rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#14C8D4] transition-all active:scale-95"
                                    >
                                        Get Quote
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/10 flex items-center justify-between group/catalog">
                                <div>
                                    <h4 className="text-white font-black text-lg mb-1">Full Product Catalog</h4>
                                    <p className="text-white/50 text-xs">Download our 2026 security guide (PDF, 24MB)</p>
                                </div>
                                <a 
                                    href="/assets/catalog.pdf" 
                                    className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white hover:bg-[#14C8D4] hover:text-[#001F3F] transition-all group-hover/catalog:scale-110"
                                >
                                    <FaDownload />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsCTA;