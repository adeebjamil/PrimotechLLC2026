'use client';

// FAQ & Video Section Interface
interface SupportLink {
    id: number;
    title: string;
    description: string;
    link: string;
    icon: string;
}

// Support Card Component
const SupportCard = ({ item }: { item: SupportLink }) => {
    return (
        <a
            href={item.link}
            className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-teal-400 block p-12 cursor-pointer hover:-translate-y-1 h-full flex flex-col justify-between"
        >
            {/* Content */}
            <div>
                {/* Title */}
                <h3 className="text-4xl lg:text-5xl font-black text-gray-900 mb-5 group-hover:text-teal-600 transition-colors duration-300">
                    {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                    {item.description}
                </p>
            </div>

            {/* Arrow Icon */}
            <div className="mt-10 inline-flex items-center justify-center">
                <div className="w-14 h-14 rounded-full border-2 border-teal-400 flex items-center justify-center group-hover:bg-teal-500 group-hover:border-teal-500 transition-all duration-300">
                    <svg
                        className="w-6 h-6 text-teal-600 group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-0.5"
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
                </div>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </a>
    );
};

// Main FAQ & Video Section Component
const FaqVideoSection = () => {
    const supportLinks: SupportLink[] = [
        {
            id: 1,
            title: 'FAQ',
            description: 'Quick answers to frequently asked questions about Uniarch products.',
            link: '/support/faq',
            icon: 'question'
        },
        {
            id: 2,
            title: 'Video',
            description: 'Visual construction guidelines to help with installation and setup.',
            link: '/support/video',
            icon: 'video'
        }
    ];

    return (
        <section className="relative py-20 lg:py-28 px-6 lg:px-8 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-20 right-0 w-80 h-80 bg-teal-100 rounded-full blur-3xl opacity-20 -mr-40 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-15 -ml-48 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {supportLinks.map((item) => (
                        <SupportCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export { FaqVideoSection };
