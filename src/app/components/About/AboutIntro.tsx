'use client';

import React from 'react';

const AboutIntro = () => {
    return (
        <section className="py-24 bg-white px-6 md:px-20">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extralight text-[#1e3a5f] mb-4">
                        About <span className="font-bold">PrimoTech LLC</span>
                    </h2>
                    <div className="w-20 h-[3px] bg-[#00c2b2] mx-auto"></div>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Text Content */}
                    <div className="lg:w-1/2 space-y-8">
                        <p className="text-[#1e3a5f]/80 text-lg leading-relaxed">
                            Pioneering accessible security solutions for the modern world
                        </p>
                        <p className="text-[#4d5765] leading-relaxed">
                            PrimoTech LLC was established in 2020 as a leading IoT product manufacturer and solution provider with more than <span className="text-[#00c2b2] font-bold">15 years of expertise in security technology</span>. We are dedicated to democratizing advanced security solutions, making them accessible to individuals and communities worldwide.
                        </p>
                        <p className="text-[#4d5765] leading-relaxed">
                            Our commitment extends beyond technology—we believe that thoughtful innovations in security can create meaningful positive changes in how people interact with their environment, ultimately <span className="font-bold text-[#1e3a5f]">improving the lives of individuals and communities</span>.
                        </p>
                    </div>

                    {/* Stats Box */}
                    <div className="lg:w-1/2 w-full">
                        <div className="bg-[#f0f9ff] rounded-[40px] p-12 md:p-16 shadow-sm border border-blue-50/50">
                            <div className="grid grid-cols-2 gap-y-12 gap-x-8">
                                <div className="text-center">
                                    <div className="text-4xl font-light text-[#00c2b2] mb-2">2020</div>
                                    <div className="text-[10px] font-bold text-[#1e3a5f]/60 uppercase tracking-widest">Founded</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-light text-[#4285f4] mb-2">15+</div>
                                    <div className="text-[10px] font-bold text-[#1e3a5f]/60 uppercase tracking-widest">Years Expertise</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-light text-[#34a853] mb-2">Global</div>
                                    <div className="text-[10px] font-bold text-[#1e3a5f]/60 uppercase tracking-widest">Reach</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-light text-[#a855f7] mb-2">IoT</div>
                                    <div className="text-[10px] font-bold text-[#1e3a5f]/60 uppercase tracking-widest">Innovation</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutIntro;
