'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

interface Slide {
    label: string;
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage: string;
    foregroundImage?: string;
}

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const slides: Slide[] = [
        {
            label: "Explore Our Full Range",
            title: "Products",
            description: "Discover our complete lineup of security products including cameras, NVRs, transmission systems, and essential accessories for every application.",
            ctaText: "View All Products",
            ctaLink: "/products",
            backgroundImage: "https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=2000",
            foregroundImage: "/herofirstimage.png"
        },
        {
            label: "We're Here to Help",
            title: "Support",
            description: "Access our support center for troubleshooting guides, FAQs, and direct assistance. Get the help you need—when you need it.",
            ctaText: "Get Support",
            ctaLink: "/support",
            backgroundImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000",
            foregroundImage: "/herosecondimage.png"
        },
        {
            label: "Grow Together",
            title: "Partner With Us",
            description: "Join our partner program to unlock exclusive benefits and business opportunities. Collaborate, expand, and succeed with us.",
            ctaText: "Become a Partner",
            ctaLink: "/partner",
            backgroundImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000",
            foregroundImage: "/herothirdimage.png"
        },
        {
            label: "Learn and Improve",
            title: "Tips & Guides",
            description: "Explore in‑depth articles, how‑tos, and best practices to get the most out of your security systems. Knowledge at your fingertips.",
            ctaText: "Browse Guides",
            ctaLink: "/tips",
            backgroundImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=2000",
            foregroundImage: "/herofourthimage.png"
        },
        {
            label: "Let's Connect",
            title: "Contact Us",
            description: "Have questions or need help? Reach out to our team for sales, support, or general inquiries. We're ready to assist you.",
            ctaText: "Contact Us",
            ctaLink: "/contact",
            backgroundImage: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80&w=2000",
            foregroundImage: "/herofifthimage.png"
        }
    ];

    const nextSlide = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        setTimeout(() => setIsAnimating(false), 800);
    }, [slides.length, isAnimating]);

    const prevSlide = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        setTimeout(() => setIsAnimating(false), 800);
    }, [slides.length, isAnimating]);

    const goToSlide = (index: number) => {
        if (isAnimating || index === currentSlide) return;
        setIsAnimating(true);
        setCurrentSlide(index);
        setTimeout(() => setIsAnimating(false), 800);
    };

    useEffect(() => {
        timerRef.current = setInterval(nextSlide, 7000);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [nextSlide]);

    const currentData = slides[currentSlide];

    return (
        <section className="relative w-full h-[90vh] lg:h-screen min-h-[600px] overflow-hidden bg-[#001F3F]">
            {/* Background Images with Cross-fade */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-out transform ${
                        index === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                    }`}
                >
                    <Image
                        src={slide.backgroundImage}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />
                    {/* Darker, more refined overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#001F3F]/90 via-[#001F3F]/60 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/80 via-transparent to-transparent"></div>
                </div>
            ))}

            {/* Content Container */}
            <div className="relative z-20 h-full container mx-auto px-6 lg:px-20 flex items-center">
                <div className={`w-full grid grid-cols-1 ${currentData.foregroundImage ? 'lg:grid-cols-2' : ''} gap-12 items-center`}>
                    
                    <div className={`${currentData.foregroundImage ? '' : 'max-w-3xl'}`}>
                        {/* Slide Indicator Bar */}
                        <div className="flex space-x-2 mb-8">
                            {slides.map((_, index) => (
                                <div 
                                    key={index} 
                                    className={`h-1 transition-all duration-500 rounded-full ${
                                        index === currentSlide ? 'w-12 bg-[#3B7597]' : 'w-4 bg-white/30'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Animated Label */}
                        <div className="overflow-hidden mb-4">
                            <p className={`text-[#3B7597] text-lg font-bold tracking-[0.2em] uppercase transition-all duration-700 ${isAnimating ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                                {currentData.label}
                            </p>
                        </div>

                        {/* Animated Title */}
                        <div className="overflow-hidden mb-2">
                            <h2 className={`text-white text-6xl md:text-8xl font-black leading-[0.8] transition-all duration-700 delay-100 ${isAnimating ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                                {currentData.title}
                            </h2>
                        </div>

                        {/* Animated Description */}
                        <div className="overflow-hidden mb-10">
                            <p className={`text-gray-200 text-xl md:text-2xl leading-relaxed max-w-2xl transition-all duration-700 delay-200 ${isAnimating ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                                {currentData.description}
                            </p>
                        </div>

                        {/* Animated CTA */}
                        <div className={`transition-all duration-700 delay-300 ${isAnimating ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`}>
                            <a
                                href={currentData.ctaLink}
                                className="inline-flex items-center group bg-[#3B7597] hover:bg-[#0FB2BD] text-[#001F3F] px-10 py-5 rounded-full font-black text-xl transition-all duration-300 shadow-xl shadow-[#3B7597]/20 hover:shadow-[#3B7597]/40 hover:-translate-y-1"
                            >
                                {currentData.ctaText}
                                <svg
                                    className="ml-3 w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Optional Foreground Image (Right Side) */}
                    {currentData.foregroundImage && (
                        <div className={`hidden lg:flex justify-center opacity-100`}>
                            <div className="relative w-full aspect-square max-w-xl">
                                <Image
                                    src={currentData.foregroundImage}
                                    alt={`${currentData.title} - PrimoTech LLC Security Solutions`}
                                    fill
                                    className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation Controls - Desktop Bottom Right */}
            <div className="absolute bottom-12 right-12 lg:right-20 z-30 hidden md:flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-white/50 font-bold text-xl">
                    <span className="text-white">0{currentSlide + 1}</span>
                    <span className="w-8 h-[1px] bg-white/30"></span>
                    <span>0{slides.length}</span>
                </div>
                
                <div className="flex space-x-4">
                    <button
                        onClick={prevSlide}
                        className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#3B7597] hover:border-[#3B7597] hover:text-[#001F3F] transition-all duration-300 group"
                    >
                        <svg className="w-6 h-6 transform group-active:scale-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#3B7597] hover:border-[#3B7597] hover:text-[#001F3F] transition-all duration-300 group"
                    >
                        <svg className="w-6 h-6 transform group-active:scale-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation - Center Bottom */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 md:hidden flex items-center space-x-6">
                <button
                    onClick={prevSlide}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div className="flex space-x-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentSlide ? 'bg-[#3B7597] w-6' : 'bg-white/40'
                            }`}
                        />
                    ))}
                </div>
                <button
                    onClick={nextSlide}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#3B7597]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#3B7597]/5 rounded-full blur-3xl pointer-events-none"></div>

            <style jsx>{`
                @keyframes progress {
                    from { width: 0%; }
                    to { width: 100%; }
                }
                .progress-active {
                    animation: progress 7s linear forwards;
                }
            `}</style>
        </section>
    );
};

export default Hero;