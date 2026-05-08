'use client';

import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs: FAQItem[] = [
        {
            question: "What types of security solutions does PrimoTech LLC offer?",
            answer: "PrimoTech LLC provides a comprehensive range of security solutions, including high-definition IP cameras, Analog systems, Network Video Recorders (NVRs), wireless surveillance kits (Panda P Series), and specialized industrial-grade monitoring equipment."
        },
        {
            question: "Are your cameras compatible with mobile devices?",
            answer: "Yes, all our modern security systems feature seamless smartphone connectivity. You can monitor your property in real-time, receive alerts, and playback footage directly from your iOS or Android devices using our dedicated secure applications."
        },
        {
            question: "Do you provide technical support after purchase?",
            answer: "Absolutely. We pride ourselves on our 'Trusted Partnership' model. We offer global technical support, comprehensive documentation, and direct assistance to ensure your security systems operate at peak performance with 99.9% uptime."
        },
        {
            question: "What is the warranty period for your products?",
            answer: "Our products come with a standard industrial-grade warranty. Specific durations vary by product series, but most our enterprise-level hardware includes an extensive 2-3 year warranty backed by our tier-one manufacturing partners."
        },
        {
            question: "How can I become a PrimoTech partner?",
            answer: "We are always looking to expand our global network. You can apply through our Partner Program portal on the website or contact our sales team directly to discuss collaboration opportunities and exclusive business benefits."
        }
    ];
    
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#001F3F]/5 rounded-full mb-6 border border-[#001F3F]/10">
                        <span className="text-[#001F3F] font-black uppercase tracking-[0.4em] text-[10px]">Support Center</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-[#001F3F] mb-6 tracking-tighter leading-[1.1] md:leading-tight">
                        Frequently Asked <span className="text-[#14C8D4]">Questions</span>
                    </h2>
                    <p className="text-gray-500 text-lg font-medium">
                        Everything you need to know about our products and services.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index}
                            className={`group border rounded-[2rem] transition-all duration-500 ${
                                openIndex === index 
                                ? 'border-[#14C8D4] bg-gray-50/50 shadow-[0_20px_40px_rgba(20,200,212,0.05)]' 
                                : 'border-gray-100 bg-white hover:border-gray-200'
                            }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 md:px-8 py-6 md:py-8 flex items-center justify-between text-left"
                            >
                                <span className={`text-lg md:text-xl font-black transition-colors duration-300 ${
                                    openIndex === index ? 'text-[#001F3F]' : 'text-[#001F3F]/80 group-hover:text-[#001F3F]'
                                }`}>
                                    {faq.question}
                                </span>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                                    openIndex === index 
                                    ? 'bg-[#14C8D4] text-white rotate-180' 
                                    : 'bg-gray-100 text-[#001F3F] group-hover:bg-[#001F3F] group-hover:text-white'
                                }`}>
                                    {openIndex === index ? <FaMinus /> : <FaPlus />}
                                </div>
                            </button>
                            
                            <div 
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                    openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                }`}
                            >
                                <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                                    <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed max-w-3xl">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer CTA */}
                <div className="mt-20 text-center p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] bg-[#001F3F] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#14C8D4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <p className="text-white text-2xl font-black mb-8 relative z-10">Still have more questions?</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
                        <a 
                            href="/support/faq"
                            className="inline-flex items-center gap-4 bg-[#14C8D4] text-[#001F3F] px-12 py-5 rounded-full font-black text-lg hover:bg-white transition-all duration-300 shadow-xl"
                        >
                            Know More FAQ's
                        </a>
                        <a 
                            href="/contact"
                            className="inline-flex items-center gap-4 bg-transparent border-2 border-white/20 text-white px-10 py-5 rounded-full font-black text-lg hover:border-[#14C8D4] hover:text-[#14C8D4] transition-all duration-300"
                        >
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
