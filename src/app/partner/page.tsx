'use client';

import Image from 'next/image';
import { FaHandshake, FaGraduationCap, FaAward, FaPhoneAlt, FaEnvelope, FaGlobe, FaArrowRight } from 'react-icons/fa';

const PartnerPage = () => {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-24 lg:py-32 bg-[#001F3F] overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#14C8D4]/5 rounded-full blur-[150px] -mr-64 -mt-64"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#14C8D4]/5 rounded-full blur-[150px] -ml-64 -mb-64"></div>
                
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#14C8D4]/10 rounded-full mb-10 border border-[#14C8D4]/20 backdrop-blur-sm">
                        <span className="text-[#14C8D4] font-black uppercase tracking-[0.4em] text-[10px]">Partnership Program</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-10 tracking-tighter leading-[0.85]">
                        Become Our <br/> <span className="text-[#14C8D4]">Partner</span>
                    </h1>
                    <p className="text-gray-400 text-xl md:text-2xl max-w-4xl mx-auto font-medium leading-relaxed">
                        Join our growing network of trusted partners and distributors. We offer comprehensive support, training programs, and marketing resources to help you succeed in the security technology market.
                    </p>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-24 px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        {
                            icon: FaHandshake,
                            title: "Competitive Margins",
                            desc: "Attractive profit margins and volume-based incentives designed to maximize your business growth."
                        },
                        {
                            icon: FaGraduationCap,
                            title: "Training & Support",
                            desc: "Comprehensive training programs and dedicated technical support to ensure your team's success."
                        },
                        {
                            icon: FaAward,
                            title: "Quality Products",
                            desc: "Access to cutting-edge security technology solutions that set industry standards for performance."
                        }
                    ].map((benefit, idx) => (
                        <div key={idx} className="group bg-gray-50 p-12 rounded-[3rem] border border-gray-100 transition-all duration-500 hover:bg-white hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-4">
                            <div className="w-16 h-16 bg-[#001F3F] rounded-2xl flex items-center justify-center text-[#14C8D4] mb-10 shadow-xl group-hover:bg-[#14C8D4] group-hover:text-[#001F3F] transition-all duration-500">
                                <benefit.icon className="text-2xl" />
                            </div>
                            <h3 className="text-2xl font-black text-[#001F3F] mb-6">{benefit.title}</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">
                                {benefit.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Partner Details */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
                <div className="max-w-7xl mx-auto space-y-24">
                    {/* Lovosis Technology */}
                    <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-xl border border-gray-100 flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/3 flex flex-col items-center text-center">
                            <div className="relative w-56 h-56 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-gray-100 shadow-inner group overflow-hidden p-8">
                                <Image 
                                    src="/partner/lovosis.png" 
                                    alt="Lovosis Technology" 
                                    fill
                                    className="object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <h2 className="text-3xl font-black text-[#001F3F] mb-2">Lovosis Technology</h2>
                            <span className="text-[#14C8D4] font-black uppercase tracking-[0.3em] text-[10px]">Tier-One Partner</span>
                        </div>
                        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <p className="text-xs font-black uppercase tracking-widest text-gray-400">Company Profile</p>
                                    <p className="text-gray-600 font-medium leading-relaxed">
                                        Lovosis Technology is a leading provider of innovative IT solutions and services, empowering businesses with cutting-edge technology.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-xs font-black uppercase tracking-widest text-gray-400">Contact Details</p>
                                    <div className="space-y-4">
                                        <a href="tel:+971509162488" className="flex items-center gap-4 text-[#001F3F] font-bold group">
                                            <FaPhoneAlt className="text-[#14C8D4]" />
                                            +971 50 916 2488
                                        </a>
                                        <a href="mailto:sales@lovosis.com" className="flex items-center gap-4 text-[#001F3F] font-bold group">
                                            <FaEnvelope className="text-[#14C8D4]" />
                                            sales@lovosis.com
                                        </a>
                                        <a href="https://lovosis.com/" target="_blank" className="flex items-center gap-4 text-[#001F3F] font-bold group">
                                            <FaGlobe className="text-[#14C8D4]" />
                                            lovosis.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:flex bg-gray-50 rounded-[3rem] p-10 border border-dashed border-gray-200 flex-col justify-center gap-6">
                                <p className="text-[#14C8D4] font-black uppercase tracking-[0.3em] text-[10px]">Credentials</p>
                                <ul className="space-y-4">
                                    {[
                                        "Authorized Distributor",
                                        "Technical Excellence",
                                        "Premium Support",
                                        "24/7 Logistics"
                                    ].map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-[#001F3F] font-bold text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#14C8D4]"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Spottive Technologies */}
                    <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-xl border border-gray-100 flex flex-col lg:flex-row-reverse gap-16 items-center">
                        <div className="lg:w-1/3 flex flex-col items-center text-center">
                            <div className="relative w-56 h-56 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-gray-100 shadow-inner group overflow-hidden p-8">
                                <Image 
                                    src="/partner/spottive.png" 
                                    alt="Spottive Technologies" 
                                    fill
                                    className="object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <h2 className="text-3xl font-black text-[#001F3F] mb-2">Spottive Technologies</h2>
                            <span className="text-[#14C8D4] font-black uppercase tracking-[0.3em] text-[10px]">Smart Solutions Partner</span>
                        </div>
                        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-8 text-right lg:text-left">
                                <div className="space-y-4">
                                    <p className="text-xs font-black uppercase tracking-widest text-gray-400">Company Profile</p>
                                    <p className="text-gray-600 font-medium leading-relaxed">
                                        Spottive Technologies specializes in smart solutions and digital transformation for enterprises across various industries.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-xs font-black uppercase tracking-widest text-gray-400">Contact Details</p>
                                    <div className="space-y-4 flex flex-col items-end lg:items-start">
                                        <a href="tel:+971552341712" className="flex items-center gap-4 text-[#001F3F] font-bold group">
                                            <FaPhoneAlt className="text-[#14C8D4]" />
                                            +971 55 234 1712
                                        </a>
                                        <a href="mailto:sales@spottive.com" className="flex items-center gap-4 text-[#001F3F] font-bold group">
                                            <FaEnvelope className="text-[#14C8D4]" />
                                            sales@spottive.com
                                        </a>
                                        <a href="https://spottive.com/" target="_blank" className="flex items-center gap-4 text-[#001F3F] font-bold group">
                                            <FaGlobe className="text-[#14C8D4]" />
                                            spottive.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:flex bg-gray-50 rounded-[3rem] p-10 border border-dashed border-gray-200 flex-col justify-center gap-6">
                                <p className="text-[#14C8D4] font-black uppercase tracking-[0.3em] text-[10px]">Expertise</p>
                                <ul className="space-y-4">
                                    {[
                                        "Digital Innovation",
                                        "Enterprise Solutions",
                                        "Strategic Consulting",
                                        "Smart Integration"
                                    ].map((item) => (
                                        <li key={item} className="flex items-center gap-3 text-[#001F3F] font-bold text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#14C8D4]"></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="relative rounded-[4rem] overflow-hidden bg-[#001F3F] py-24 px-12 md:px-24 text-center shadow-2xl">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-[#14C8D4]/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                        
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-5xl md:text-7xl font-black text-white mb-10 leading-[0.9] tracking-tighter uppercase">
                                Interested in <br/> <span className="text-[#14C8D4]">Partnership?</span>
                            </h2>
                            <p className="text-gray-400 text-xl font-medium leading-relaxed mb-16">
                                Ready to join our partner network? Contact us today to learn more about partnership opportunities and how we can help grow your business together.
                            </p>
                            <a 
                                href="/contact"
                                className="inline-flex items-center gap-6 bg-[#14C8D4] hover:bg-white text-[#001F3F] px-14 py-7 rounded-[2rem] font-black text-2xl transition-all duration-500 shadow-xl group"
                            >
                                Contact Partnership Team
                                <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default PartnerPage;
