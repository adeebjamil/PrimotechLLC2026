'use client';

import { FaArrowRight, FaCamera, FaHeadset, FaHandshake, FaBook, FaEnvelope } from 'react-icons/fa';

interface InfoCard {
    id: number;
    badge: string;
    title: string;
    description: string;
    linkText: string;
    linkHref: string;
    icon: any;
    color: string;
}

const HomeInfoCards = () => {
    const cards: InfoCard[] = [
        {
            id: 1,
            badge: 'Products',
            title: 'Explore Our Full Range',
            description: 'Discover our complete lineup of security products including cameras, NVRs, transmission systems, and essential accessories for every application.',
            linkText: 'View All Products',
            linkHref: '/products',
            icon: FaCamera,
            color: 'from-blue-500 to-cyan-400'
        },
        {
            id: 2,
            badge: 'Support',
            title: "We're Here to Help",
            description: 'Access our support center for troubleshooting guides, FAQs, and direct assistance. Get the help you need—when you need it.',
            linkText: 'Get Support',
            linkHref: '/support',
            icon: FaHeadset,
            color: 'from-purple-500 to-indigo-400'
        },
        {
            id: 3,
            badge: 'Partner With Us',
            title: 'Grow Together',
            description: 'Join our partner program to unlock exclusive benefits and business opportunities. Collaborate, expand, and succeed with us.',
            linkText: 'Become a Partner',
            linkHref: '/partner',
            icon: FaHandshake,
            color: 'from-orange-500 to-yellow-400'
        }
    ];

    return (
        <section className="py-24 px-6 lg:px-16 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {cards.map((card) => (
                    <div 
                        key={card.id}
                        className="group relative bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-3 flex flex-col"
                    >
                        <div className={`w-20 h-20 bg-gradient-to-br ${card.color} rounded-3xl flex items-center justify-center text-white mb-10 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                            <card.icon className="text-3xl" />
                        </div>
                        <span className="text-[#14C8D4] font-black uppercase tracking-[0.3em] text-[10px] mb-4">
                            {card.badge}
                        </span>
                        <h3 className="text-3xl font-black text-[#001F3F] mb-6 leading-tight tracking-tighter">
                            {card.title}
                        </h3>
                        <p className="text-gray-500 text-base font-medium leading-relaxed mb-10 flex-grow">
                            {card.description}
                        </p>
                        <div className="pt-8 border-t border-gray-50">
                            <a 
                                href={card.linkHref}
                                className="inline-flex items-center gap-4 text-[#001F3F] font-black text-lg group/link"
                            >
                                <span className="relative">
                                    {card.linkText}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-[#14C8D4] transition-all duration-300 group-hover/link:w-full"></span>
                                </span>
                                <div className="w-10 h-10 rounded-full bg-[#f0fdfe] flex items-center justify-center text-[#14C8D4] group-hover/link:bg-[#14C8D4] group-hover/link:text-white transition-all">
                                    <FaArrowRight className="text-sm group-hover/link:translate-x-1 transition-transform" />
                                </div>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HomeInfoCards;
