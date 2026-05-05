'use client';

import { FaTrophy, FaBolt, FaUsers, FaCheckCircle, FaGlobe } from 'react-icons/fa';

const IndustryRecognition = () => {
    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
            {/* Background Decorative Glows */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#14C8D4]/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#001F3F]/5 rounded-full mb-8 border border-[#001F3F]/10 backdrop-blur-sm">
                        <span className="text-[#001F3F] font-black uppercase tracking-[0.4em] text-[10px]">Industry Leader</span>
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-black text-[#001F3F] mb-8 tracking-tighter leading-tight">
                        Why Choose <br className="hidden md:block" /> <span className="text-[#14C8D4]">PrimoTech LLC</span>
                    </h2>
                    <p className="text-gray-500 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
                        Setting industry standards through award-winning design, superior performance, and trusted partnerships.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Award-Winning Design */}
                    <div className="group bg-gray-50 rounded-[3rem] p-12 border border-gray-100 transition-all duration-500 hover:bg-white hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-4">
                        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-10 shadow-lg group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                            <FaTrophy className="text-2xl" />
                        </div>
                        <h3 className="text-2xl font-black text-[#001F3F] mb-6">Award-Winning Design</h3>
                        <p className="text-gray-500 font-medium leading-relaxed mb-10">
                            Red Dot Design Award winner, recognized by IDSA for innovation and quality.
                        </p>
                        
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4 py-3 px-6 bg-white rounded-2xl border border-gray-100">
                                <FaCheckCircle className="text-red-500" />
                                <span className="text-[#001F3F] font-bold text-sm uppercase tracking-widest">Red Dot Award</span>
                            </div>
                            <div className="flex items-center gap-4 py-3 px-6 bg-white rounded-2xl border border-gray-100">
                                <FaCheckCircle className="text-red-500" />
                                <span className="text-[#001F3F] font-bold text-sm uppercase tracking-widest">IDSA Certified</span>
                            </div>
                        </div>
                    </div>

                    {/* Industrial Performance */}
                    <div className="group bg-gray-50 rounded-[3rem] p-12 border border-gray-100 transition-all duration-500 hover:bg-white hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-4">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-10 shadow-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                            <FaBolt className="text-2xl" />
                        </div>
                        <h3 className="text-2xl font-black text-[#001F3F] mb-6">Industrial Performance</h3>
                        <p className="text-gray-500 font-medium leading-relaxed mb-10">
                            Best-in-class reliability engineered for demanding industrial environments with maximum uptime guarantee.
                        </p>
                        
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4 py-3 px-6 bg-white rounded-2xl border border-gray-100">
                                <FaCheckCircle className="text-blue-500" />
                                <span className="text-[#001F3F] font-bold text-sm uppercase tracking-widest">Industrial Grade</span>
                            </div>
                            <div className="flex items-center gap-4 py-3 px-6 bg-white rounded-2xl border border-gray-100">
                                <FaCheckCircle className="text-blue-500" />
                                <span className="text-[#001F3F] font-bold text-sm uppercase tracking-widest">99.9% Uptime</span>
                            </div>
                        </div>
                    </div>

                    {/* Trusted Partnership */}
                    <div className="group bg-gray-50 rounded-[3rem] p-12 border border-gray-100 transition-all duration-500 hover:bg-white hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-4">
                        <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-10 shadow-xl group-hover:bg-green-600 group-hover:text-white transition-all duration-500">
                            <FaUsers className="text-2xl" />
                        </div>
                        <h3 className="text-2xl font-black text-[#001F3F] mb-6">Trusted Partnership</h3>
                        <p className="text-gray-500 font-medium leading-relaxed mb-10">
                            Backed by tier-one manufacturers with global support, ensuring quality standards and technical excellence.
                        </p>
                        
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4 py-3 px-6 bg-white rounded-2xl border border-gray-100">
                                <FaGlobe className="text-green-500" />
                                <span className="text-[#001F3F] font-bold text-sm uppercase tracking-widest">Global Support</span>
                            </div>
                            <div className="flex items-center gap-4 py-3 px-6 bg-white rounded-2xl border border-gray-100">
                                <FaCheckCircle className="text-green-500" />
                                <span className="text-[#001F3F] font-bold text-sm uppercase tracking-widest">Quality Assured</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default IndustryRecognition;
