'use client';

import React from 'react';

const AboutHero = () => {
    // Mock image URLs based on the visual layout
    const images = [
        'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=600'
    ];

    return (
        <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-white">
            {/* Image Grid Background */}
            <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-6 grid-rows-2 gap-0 opacity-40">
                {images.map((img, i) => (
                    <div key={i} className="relative w-full h-full">
                        <img 
                            src={img} 
                            alt={`About ${i}`} 
                            className="w-full h-full object-cover filter grayscale-[30%]"
                        />
                    </div>
                ))}
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 bg-gradient-to-b from-white/20 via-white/10 to-white/60">
                <h1 className="text-4xl md:text-6xl font-extralight text-[#1e3a5f] mb-4 tracking-tight">
                    Life in <span className="font-bold">Focus</span>
                </h1>
                <div className="w-24 h-[3px] bg-[#00c2b2] mb-8"></div>
                <p className="text-[#1e3a5f] text-lg md:text-xl max-w-3xl leading-relaxed font-light">
                    Advancing security technology to create safer communities and empower individuals worldwide
                </p>
            </div>
        </section>
    );
};

export default AboutHero;
