'use client';

import type { IconType } from 'react-icons';
import { FaCheckCircle, FaStar, FaBullseye, FaShieldAlt } from 'react-icons/fa';

// Feature Interface
interface FeatureTag {
    color: string;
    text: string;
}

interface Feature {
    id: number;
    icon: IconType;
    iconBg: string;
    iconColor: string;
    title: string;
    description: string;
    tags: FeatureTag[];
}

const WhyChooseUs = () => {
    const features: Feature[] = [
        {
            id: 1,
            icon: FaStar,
            iconBg: 'bg-red-50',
            iconColor: 'text-red-500',
            title: 'Award-Winning Design',
            description: 'Red Dot Design Award winner, recognized by IDSA for innovation and quality.',
            tags: [
                { color: 'bg-red-500', text: 'Red Dot Award' },
                { color: 'bg-gray-400', text: 'IDSA Certified' }
            ]
        },
        {
            id: 2,
            icon: FaBullseye,
            iconBg: 'bg-[#f0fdfe]',
            iconColor: 'text-[#14C8D4]',
            title: 'Industrial Performance',
            description: 'Best-in-class reliability engineered for demanding industrial environments with maximum uptime guarantee.',
            tags: [
                { color: 'bg-[#14C8D4]', text: 'Industrial Grade' },
                { color: 'bg-[#14C8D4]', text: '99.9% Uptime' }
            ]
        },
        {
            id: 3,
            icon: FaShieldAlt,
            iconBg: 'bg-green-50',
            iconColor: 'text-green-600',
            title: 'Trusted Partnership',
            description: 'Backed by tier-one manufacturers with global support, ensuring quality standards and technical excellence.',
            tags: [
                { color: 'bg-green-500', text: 'Global Support' },
                { color: 'bg-[#14C8D4]', text: 'Quality Assured' }
            ]
        }
    ];

    return (
        <section className="py-24 px-6 lg:px-16 max-w-7xl mx-auto relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#14C8D4]/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

            {/* ===== HEADER ===== */}
            <div className="text-center mb-20">
                {/* Industry Leader Badge */}
                <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-[#f0fdfe] rounded-full mb-8 border border-[#14C8D4]/20 shadow-sm transition-all hover:shadow-md">
                    <FaCheckCircle className="text-[#14C8D4] text-lg" />
                    <span className="text-sm font-black text-[#001F3F] uppercase tracking-widest">Industry Leader</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl lg:text-7xl font-black text-[#001F3F] mb-6 tracking-tighter leading-tight">
                    Why Choose <span className="text-[#14C8D4]">PrimoTech</span>
                </h1>

                {/* Subtitle Description */}
                <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium">
                    Setting industry standards through award-winning design, superior performance, and trusted partnerships.
                </p>
            </div>

            {/* ===== 3-COLUMN FEATURES GRID ===== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                {features.map((feature) => (
                    <div key={feature.id} className="text-center group p-8 rounded-3xl transition-all duration-500 hover:bg-gray-50/80">
                        {/* Icon Container (80x80px) */}
                        <div
                            className={`w-24 h-24 ${feature.iconBg} rounded-[2rem] mx-auto mb-8 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm`}
                        >
                            <feature.icon className={`text-4xl ${feature.iconColor}`} />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-black text-[#001F3F] mb-4">
                            {feature.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-500 leading-relaxed mb-8 font-medium">
                            {feature.description}
                        </p>

                        {/* Tags with Colored Dots */}
                        <div className="flex flex-wrap justify-center gap-5">
                            {feature.tags.map((tag, index) => (
                                <div key={index} className="flex items-center gap-2.5 group/tag">
                                    <span className={`w-2 h-2 ${tag.color} rounded-full flex-shrink-0 group-hover/tag:scale-150 transition-transform`}></span>
                                    <span className="text-sm font-bold text-gray-600 group-hover/tag:text-[#001F3F] transition-colors">{tag.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default WhyChooseUs;