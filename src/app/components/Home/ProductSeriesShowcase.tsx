'use client';

import { FaArrowRight, FaWifi, FaServer, FaShieldAlt } from 'react-icons/fa';

interface SeriesItem {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    icon: any;
    image: string;
    link: string;
}

const ProductSeriesShowcase = () => {
    const series: SeriesItem[] = [
        {
            id: 1,
            title: 'Panda P Series',
            subtitle: 'Wireless Security Made Simple',
            description: 'Experience seamless wireless surveillance with our advanced Wi-Fi cameras featuring HD video quality, night vision, and smartphone connectivity.',
            icon: FaWifi,
            image: '/ProductSeriesShowcase/Panda P Series.png',
            link: '/products/wi-fi-camera/panda-p-series'
        },
        {
            id: 2,
            title: 'Dual Light Rainbow',
            subtitle: 'Professional Network Surveillance',
            description: 'Advanced IP camera systems with Network Video Recorders for enterprise-grade security solutions and monitoring.',
            icon: FaServer,
            image: '/ProductSeriesShowcase/Dual Light Rainbow.png',
            link: '/products/ip-vr-solutions/dual-light-rainbow'
        },
        {
            id: 3,
            title: 'Analog Cameras',
            subtitle: 'Next-Generation Protection',
            description: 'Complete smart security solutions with AI-powered features, cloud storage, and seamless integration capabilities.',
            icon: FaShieldAlt,
            image: '/ProductSeriesShowcase/Analog Cameras.png',
            link: '/products/analog-cameras/analog-fixed-lens-cameras'
        }
    ];

    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header Area */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-[2px] bg-[#14C8D4]"></div>
                            <span className="text-[#14C8D4] font-black uppercase tracking-[0.4em] text-xs">Innovation in Security</span>
                        </div>
                        <h2 className="text-5xl lg:text-7xl font-black text-[#001F3F] tracking-tighter leading-[0.9]">
                            Advanced Series <br/> <span className="text-[#14C8D4]">Solutions</span>
                        </h2>
                    </div>
                    <p className="text-gray-500 font-medium text-lg max-w-sm leading-relaxed">
                        Discover our specialized product lines engineered for specific security requirements and environments.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {series.map((item) => (
                        <div 
                            key={item.id}
                            className="group relative h-[650px] rounded-[3.5rem] overflow-hidden bg-[#001F3F] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] hover:-translate-y-4 transition-all duration-700 border border-white/5"
                        >
                            {/* Product Image Layer - Floating and Large */}
                            <div className="absolute top-12 left-0 right-0 h-[300px] flex items-center justify-center z-10">
                                <div className="relative w-full h-full transform group-hover:scale-110 group-hover:-translate-y-4 transition-all duration-1000 ease-out p-12">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(20,200,212,0.3)]"
                                    />
                                </div>
                            </div>

                            {/* Background Decorative Elements */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F] via-[#001F3F]/80 to-transparent z-0"></div>
                            <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#14C8D4]/10 rounded-full blur-3xl group-hover:bg-[#14C8D4]/20 transition-all duration-1000"></div>

                            {/* Content */}
                            <div className="relative h-full p-12 flex flex-col justify-end z-20">
                                {/* Icon Badge */}
                                <div className="w-14 h-14 rounded-2xl bg-[#14C8D4]/10 backdrop-blur-md border border-[#14C8D4]/20 flex items-center justify-center mb-8 transform group-hover:rotate-[360deg] transition-all duration-1000">
                                    <item.icon className="text-xl text-[#14C8D4]" />
                                </div>

                                <span className="text-[#14C8D4] font-black uppercase tracking-widest text-[10px] mb-4">
                                    {item.subtitle}
                                </span>
                                
                                <h3 className="text-4xl font-black text-white mb-6 tracking-tight">
                                    {item.title}
                                </h3>

                                <p className="text-gray-400 font-medium leading-relaxed mb-10 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                    {item.description}
                                </p>

                                <a 
                                    href={item.link}
                                    className="inline-flex items-center gap-4 text-white font-black text-lg group/btn"
                                >
                                    <span className="relative">
                                        Learn more 
                                        <span className="absolute -bottom-1 left-0 w-0 h-1 bg-[#14C8D4] transition-all duration-300 group-hover/btn:w-full"></span>
                                    </span>
                                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-[#14C8D4] group-hover/btn:border-[#14C8D4] transition-all">
                                        <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default ProductSeriesShowcase;
