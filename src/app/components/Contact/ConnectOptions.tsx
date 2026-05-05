'use client';

import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaTools, FaArrowRight } from 'react-icons/fa';

const ConnectOptions = () => {
    const options = [
        {
            title: 'General Inquiries',
            description: "Have questions about our products or services? Our team is ready to provide detailed information and guidance.",
            icon: FaEnvelope,
            btnText: 'Send Email',
            href: 'mailto:info@primotech-llc.com',
            color: '#14C8D4'
        },
        {
            title: 'Sales Team',
            description: "Ready to get started? Connect with our sales team for personalized solutions tailored to your business needs.",
            icon: FaPhoneAlt,
            btnText: 'Call Sales',
            href: 'tel:+971000000000',
            color: '#001F3F'
        },
        {
            title: 'Technical Support',
            description: "Need technical assistance? Our expert support team is available 24/7 to help resolve any issues quickly.",
            icon: FaTools,
            btnText: 'Get Support',
            href: '/support/faq',
            color: '#14C8D4'
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-[#001F3F] mb-6 tracking-tight">Talk to Sales</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
                        Choose the best way to reach our team. We're here to provide personalized solutions and answer all your questions about our services.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {options.map((option, index) => {
                        const Icon = option.icon;
                        return (
                            <div key={index} className="group p-10 rounded-[3rem] bg-[#f8fafc] border border-gray-100 transition-all duration-500 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,31,63,0.1)] hover:-translate-y-2">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-[#001F3F] transition-all duration-500">
                                    <Icon className="text-2xl text-[#14C8D4] group-hover:text-white" />
                                </div>
                                <h3 className="text-2xl font-black text-[#001F3F] mb-4">{option.title}</h3>
                                <p className="text-gray-500 font-medium leading-relaxed mb-8">
                                    {option.description}
                                </p>
                                <a 
                                    href={option.href}
                                    className="inline-flex items-center gap-3 text-[#001F3F] font-black text-sm uppercase tracking-widest group-hover:text-[#14C8D4] transition-all"
                                >
                                    {option.btnText} <FaArrowRight className="text-[10px]" />
                                </a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ConnectOptions;
