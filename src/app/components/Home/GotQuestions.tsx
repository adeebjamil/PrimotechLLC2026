'use client';

import { FaArrowRight, FaHeadset } from 'react-icons/fa';

const GotQuestions = () => {
    return (
        <section className="w-full bg-[#001F3F] overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch">
                {/* LEFT SIDE - Content */}
                <div className="lg:w-1/2 w-full flex items-center justify-center px-8 lg:px-20 py-24 lg:py-32 relative">
                    {/* Decorative Element */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-[#3B7597]/10 rounded-full blur-[100px] -ml-32 -mt-32"></div>
                    
                    <div className="max-w-md relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-[#3B7597] rounded-2xl flex items-center justify-center text-[#001F3F] shadow-xl">
                                <FaHeadset className="text-2xl" />
                            </div>
                            <span className="text-[#3B7597] font-black uppercase tracking-[0.3em] text-xs">Support Center</span>
                        </div>

                        <h2 className="text-6xl lg:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
                            Got<br />questions?
                        </h2>

                        <p className="text-gray-400 text-xl mb-12 leading-relaxed font-medium">
                            Our technical experts are ready to assist you with any security solution inquiries.
                        </p>

                        <a
                            href="/support"
                            className="inline-flex items-center gap-4 bg-[#3B7597] hover:bg-white text-[#001F3F] px-10 py-5 rounded-2xl font-black text-xl group transition-all duration-500 shadow-2xl hover:-translate-y-2"
                        >
                            Get Help Now
                            <FaArrowRight className="transform group-hover:translate-x-2 transition-transform duration-500" />
                        </a>
                    </div>
                </div>

                {/* RIGHT SIDE - Image */}
                <div className="lg:w-1/2 w-full relative min-h-[500px]">
                    <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200"
                        alt="Customer Support Representative"
                        className="w-full h-full object-cover lg:rounded-l-[4rem]"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#001F3F]/60 to-transparent lg:rounded-l-[4rem]"></div>
                </div>
            </div>
        </section>
    );
};

export default GotQuestions;