'use client';

import React from 'react';
import { FaAward, FaGlobe, FaHeart } from 'react-icons/fa';

const KeyHighlights = () => {
    const highlights = [
        {
            icon: FaAward,
            title: 'Industry Leadership',
            desc: 'Founded in 2020, with 15+ years of security expertise',
            color: 'text-teal-500',
            bg: 'bg-teal-50'
        },
        {
            icon: FaGlobe,
            title: 'Global Innovation',
            desc: 'Leading IoT solutions and security technology worldwide',
            color: 'text-blue-600',
            bg: 'bg-blue-50'
        },
        {
            icon: FaHeart,
            title: 'Community Impact',
            desc: 'Dedicated to improving lives through accessible technology',
            color: 'text-green-500',
            bg: 'bg-green-50'
        }
    ];

    return (
        <section className="py-24 bg-white px-6 md:px-20">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extralight text-[#1e3a5f] mb-4">
                        Key <span className="font-bold">Highlights</span>
                    </h2>
                    <div className="w-20 h-[3px] bg-[#00c2b2] mx-auto mb-8"></div>
                    <p className="text-[#4d5765] max-w-2xl mx-auto font-light">
                        Celebrating our milestones and impact in the security technology landscape
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {highlights.map((item, i) => (
                        <div key={i} className="bg-white rounded-[30px] p-12 shadow-sm border border-gray-50 text-center flex flex-col items-center transition-all duration-300 hover:shadow-lg">
                            <div className={`w-16 h-16 ${item.bg} ${item.color} rounded-full flex items-center justify-center text-3xl mb-8`}>
                                <item.icon />
                            </div>
                            <h3 className="text-lg font-bold text-[#1e3a5f] mb-6">{item.title}</h3>
                            <p className="text-slate-500 text-sm font-light leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default KeyHighlights;
