'use client';

// Contact CTA Section Component
const ContactCTA = () => {
    return (
        <section className="relative py-24 lg:py-32 px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-100 rounded-full blur-3xl opacity-20 -mr-40 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-15 -ml-48 pointer-events-none"></div>

            <div className="max-w-3xl mx-auto relative z-10 text-center">
                {/* Premium Section Divider */}
                <div className="inline-flex items-center justify-center gap-3 mb-8">
                    <div className="flex-shrink-0 h-px w-8 bg-gradient-to-r from-transparent to-teal-400"></div>
                    <span className="text-sm font-bold text-teal-600 uppercase tracking-[0.3em]">
                        Get In Touch
                    </span>
                    <div className="flex-shrink-0 h-px w-8 bg-gradient-to-l from-transparent to-teal-400"></div>
                </div>

                {/* Main Heading */}
                <h2 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
                    Contact Us
                </h2>

                {/* Description Text - Enhanced */}
                <div className="space-y-6 mb-12">
                    <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-medium">
                        If you have any problems and need personal consultations, or you want to learn more about our products,
                    </p>

                    <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-medium">
                        please contact us directly, we are always online and ready to talk to you. More sensitive to trigger IR cut.
                    </p>

                    <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-medium">
                        Automatically change the infrared light compensation intensity based on different image brightness to avoid figure overexposure.
                    </p>
                </div>

                {/* CTA Button - Premium Style */}
                <div className="flex justify-center">
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-3 px-12 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-bold text-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300 group shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                        Contact Us
                        <svg
                            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </a>
                </div>

                {/* Optional: Decorative Bottom Accent */}
                <div className="mt-16 pt-8 border-t border-gray-200/50">
                    <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">
                        Available 24/7 for your inquiries
                    </p>
                </div>
            </div>
        </section>
    );
};

export { ContactCTA };
