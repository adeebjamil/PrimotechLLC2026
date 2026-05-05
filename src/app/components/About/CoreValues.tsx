'use client';

import React from 'react';
import { FaShieldAlt, FaMousePointer, FaBriefcase } from 'react-icons/fa';

const CoreValues = () => {
    const values = [
        {
            icon: FaShieldAlt,
            title: 'Safety',
            description: 'Security is at the core of everything we do. We prioritize the integrity and confidentiality of your data, ensuring that your security ecosystem remains protected from potential threats through advanced encryption and robust protection protocols.',
            iconBg: 'bg-red-100',
            iconColor: 'text-red-500'
        },
        {
            icon: FaMousePointer,
            title: 'User Experience',
            description: 'We prioritize exceptional user experience, ensuring our products are intuitive and accessible. Our design philosophy centers on simplicity, enabling effortless navigation and control to create a seamless, hassle-free interaction with advanced security technology.',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-500'
        },
        {
            icon: FaBriefcase,
            title: 'Professional Excellence',
            description: 'With extensive R&D capabilities and dedicated research centers, we maintain the highest standards of professionalism. Our commitment to excellence has earned prestigious industry recognition and awards for innovative security solutions.',
            iconBg: 'bg-green-100',
            iconColor: 'text-green-500'
        }
    ];

    return (
        <section className="py-24 bg-gray-50/50 px-6 md:px-20">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extralight text-[#1e3a5f] mb-4">
                        Our <span className="font-bold">Core Values</span>
                    </h2>
                    <div className="w-20 h-[3px] bg-[#00c2b2] mx-auto mb-8"></div>
                    <p className="text-[#4d5765] max-w-2xl mx-auto font-light">
                        The fundamental principles that drive our commitment to excellence and innovation
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((val, i) => (
                        <div key={i} className="bg-white rounded-[30px] p-10 shadow-sm border border-gray-100 flex flex-col items-start transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <div className={`w-14 h-14 ${val.iconBg} ${val.iconColor} rounded-xl flex items-center justify-center text-2xl mb-8`}>
                                <val.icon />
                            </div>
                            <h3 className="text-2xl font-bold text-[#1e3a5f] mb-6">{val.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-light">
                                {val.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoreValues;
