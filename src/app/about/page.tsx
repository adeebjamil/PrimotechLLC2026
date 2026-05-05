'use client';

import React from 'react';
import AboutHero from '@/app/components/About/AboutHero';
import AboutIntro from '@/app/components/About/AboutIntro';
import CoreValues from '@/app/components/About/CoreValues';
import KeyHighlights from '@/app/components/About/KeyHighlights';

const AboutPage = () => {
    return (
        <main className="min-h-screen bg-white">
            {/* Section 1: Hero Section */}
            <AboutHero />

            {/* Section 2: Company Introduction */}
            <AboutIntro />

            {/* Section 3: Core Values Section */}
            <CoreValues />

            {/* Section 4: Key Highlights Section */}
            <KeyHighlights />

            {/* CTA Section */}
            <section className="py-24 text-center bg-gray-50/30">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-extralight text-[#1e3a5f] mb-8">
                        Ready to <span className="font-bold">secure your future?</span>
                    </h2>
                    <a 
                        href="/contact" 
                        className="inline-flex items-center gap-3 bg-[#00c2b2] text-white px-10 py-5 rounded-full font-bold text-lg uppercase tracking-widest hover:bg-[#00a89a] transition-all shadow-xl shadow-[#00c2b2]/20"
                    >
                        Work with us
                    </a>
                </div>
            </section>
        </main>
    );
};

export default AboutPage;
