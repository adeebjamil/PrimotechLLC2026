'use client';

// Support Section Component - Full-width Hero Style
const SupportSection = () => {
    return (
        <section className="relative w-full min-h-[500px] flex items-center overflow-hidden">
            {/* ===== Background Image ===== */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&h=600&fit=crop"
                    alt="Support Background"
                    className="w-full h-full object-cover"
                />

                {/* Dark Overlay - Teal/Blue tinted like the image */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-slate-900/80 to-slate-800/70"></div>
            </div>

            {/* ===== Content Container ===== */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 py-20">
                <div className="max-w-2xl">
                    {/* Main Heading */}
                    <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight uppercase">
                        SUPPORT
                    </h2>

                    {/* Description Text */}
                    <div className="space-y-3">
                        <p className="text-xl lg:text-2xl text-white/90 font-light leading-relaxed">
                            We prepared some information for you,
                        </p>
                        <p className="text-xl lg:text-2xl text-white/80 font-light leading-relaxed">
                            in case you run into certain problems and need help.
                        </p>
                    </div>

                    {/* Optional: CTA Button (can be added if needed) */}
                    <div className="mt-10">
                        <a
                            href="/support"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 transition-all duration-300 group"
                        >
                            Get Support
                            <svg
                                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Optional: Decorative Elements */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -z-0"></div>
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl -z-0"></div>
        </section>
    );
};

// Alternative Version with Support Cards Below (if you want to add support options)
const SupportSectionWithCards = () => {
    const supportOptions = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
            title: 'Live Chat',
            description: 'Chat with our support team in real-time',
            link: '/support/chat'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: 'Email Support',
            description: 'Send us an email and we\'ll respond within 24hrs',
            link: 'mailto:support@example.com'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            title: 'Documentation',
            description: 'Browse our comprehensive guides and FAQs',
            link: '/docs'
        }
    ];

    return (
        <section>
            {/* Hero Part (Same as above) */}
            <div className="relative w-full min-h-[500px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&h=600&fit=crop"
                        alt="Support Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-slate-900/80 to-slate-800/70"></div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 py-20">
                    <div className="max-w-2xl">
                        <h2 className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight uppercase">
                            SUPPORT
                        </h2>
                        <p className="text-xl lg:text-2xl text-white/90 font-light leading-relaxed mb-2">
                            We prepared some information for you,
                        </p>
                        <p className="text-xl lg:text-2xl text-white/80 font-light leading-relaxed">
                            in case you run into certain problems and need help.
                        </p>
                    </div>
                </div>
            </div>

            {/* Support Options Cards */}
            <div className="bg-gray-50 py-16 px-6 lg:px-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-32 relative z-20">
                        {supportOptions.map((option, index) => (
                            <a
                                key={index}
                                href={option.link}
                                className="group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    {option.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                                    {option.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed mb-4">
                                    {option.description}
                                </p>
                                <span className="inline-flex items-center gap-2 text-teal-600 font-semibold text-sm group-hover:gap-3 transition-all">
                                    Learn More
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export { SupportSection, SupportSectionWithCards };