'use client';

import { FaVideo, FaInfoCircle, FaYoutube, FaPlay } from 'react-icons/fa';

const videos = [
    {
        id: 'F7OsptSrtOg',
        title: 'UNBOXING | Uniarch Wired Security Camera',
        description: 'Experience 1080p HD super video quality with the latest Uniarch wired solutions.',
        category: 'Unboxing',
        tag: '1080p HD'
    },
    {
        id: 'dNsWCI8RENE',
        title: "Unboxing Uniarch's Outdoor Bullet Camera",
        description: 'Explore the IP67 waterproofing and rugged build of the Outdoor Bullet series.',
        category: 'Unboxing',
        tag: 'IP67 Waterproof'
    },
    {
        id: 'uPOZNVVzbLs',
        title: 'Uniarch Panda S3S Dual Lens Wi-Fi PT Camera',
        description: 'S3S Dual - Dual Lens for Complete Protection and 360° coverage.',
        category: 'Product Demo',
        tag: 'Dual Lens'
    },
    {
        id: 'vwJMFP3MiFM',
        title: 'Unboxing Panda S3E & S3E Pro',
        description: 'Detailed look at the Wi-Fi PT Camera S3E & S3E Pro series features.',
        category: 'Unboxing',
        tag: 'Wi-Fi PT'
    }
];

export default function VideoLibraryClient() {
    return (
        <main className="min-h-screen bg-[#fcfdfe]">
            {/* Enhanced Hero Section */}
            <section className="relative pt-40 pb-32 overflow-hidden bg-[#001F3F]">
                {/* Dynamic Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#14C8D4]/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#14C8D4]/5 rounded-full blur-[100px]"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(#14C8D4 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                    </div>
                </div>

                {/* Floating Abstract Shapes */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-20 left-[10%] w-32 h-32 border-2 border-[#14C8D4]/20 rounded-3xl rotate-12 animate-float"></div>
                    <div className="absolute bottom-20 right-[15%] w-24 h-24 border-2 border-[#14C8D4]/10 rounded-full animate-float-delayed"></div>
                    <div className="absolute top-1/3 right-[5%] w-16 h-16 bg-[#14C8D4]/10 rounded-2xl -rotate-12 blur-sm"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col items-center text-center">
                        {/* Animated Badge */}
                        <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2.5 rounded-full mb-10 shadow-2xl animate-fadeIn">
                            <div className="relative">
                                <FaVideo className="text-[#14C8D4] text-sm relative z-10" />
                                <div className="absolute inset-0 bg-[#14C8D4] blur-md opacity-50 animate-ping"></div>
                            </div>
                            <span className="text-white font-black text-[10px] uppercase tracking-[0.3em]">Visual Learning Hub</span>
                        </div>

                        <h1 className="text-[64px] md:text-[88px] font-black text-white mb-8 leading-[0.9] tracking-tighter animate-slideUp">
                            Technical <br className="hidden md:block" />
                            <span className="bg-gradient-to-r from-[#14C8D4] via-white to-[#14C8D4] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                                Video Library
                            </span>
                        </h1>

                        <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed mb-12 animate-fadeInDelayed">
                            Master your security system with our premium collection of
                            <span className="text-white mx-1.5">visual demonstrations</span>,
                            unboxings, and expert-led configuration guides.
                        </p>

                        <div className="flex items-center gap-6 animate-fadeInDelayed">
                            <div className="w-1.5 h-12 bg-gradient-to-b from-transparent via-[#14C8D4] to-transparent"></div>
                            <div className="text-left">
                                <p className="text-white font-bold text-sm uppercase tracking-widest mb-1">Expert Content</p>
                                <p className="text-gray-500 text-xs font-bold">24/7 Technical Support Available</p>
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    @keyframes float {
                        0%, 100% { transform: translateY(0) rotate(12deg); }
                        50% { transform: translateY(-20px) rotate(15deg); }
                    }
                    @keyframes float-delayed {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-30px); }
                    }
                    @keyframes gradient {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    @keyframes slideUp {
                        from { opacity: 0; transform: translateY(40px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    .animate-float { animation: float 6s ease-in-out infinite; }
                    .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
                    .animate-gradient { animation: gradient 6s linear infinite; }
                    .animate-slideUp { animation: slideUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
                    .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
                    .animate-fadeInDelayed { opacity: 0; animation: fadeIn 1s ease-out 0.4s forwards; }
                `}</style>
            </section>

            {/* Video Grid */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {videos.map((video, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,31,63,0.1)] transition-all duration-700 hover:-translate-y-2"
                        >
                            <div className="aspect-video relative overflow-hidden bg-black">
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${video.id}`}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <div className="p-10">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="bg-gray-50 text-[#001F3F] px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider border border-gray-100">
                                        {video.category}
                                    </span>
                                    <div className="flex items-center gap-2 text-gray-400 font-bold text-xs">
                                        <FaInfoCircle className="text-[#14C8D4]" />
                                        {video.tag}
                                    </div>
                                </div>

                                <h2 className="text-2xl font-black text-[#001F3F] mb-4 group-hover:text-[#14C8D4] transition-colors leading-tight">
                                    {video.title}
                                </h2>

                                <p className="text-gray-500 font-medium leading-relaxed text-base">
                                    {video.description}
                                </p>

                                <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
                                    <a
                                        href={`https://youtu.be/${video.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 text-[#001F3F] font-black text-sm hover:text-[#14C8D4] transition-all group/link"
                                    >
                                        <FaYoutube className="text-xl text-[#FF0000]" />
                                        Watch on YouTube
                                    </a>

                                    <div className="flex items-center gap-2 text-[#14C8D4] text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        Playing Now <FaPlay className="text-[8px] animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="pb-24 px-6">
                <div className="max-w-5xl mx-auto bg-[#001F3F] rounded-[3rem] p-16 relative overflow-hidden text-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#14C8D4]/10 blur-[80px] rounded-full"></div>

                    <div className="relative z-10">
                        <h2 className="text-4xl font-black text-white mb-6">Can&apos;t find what you&apos;re looking for?</h2>
                        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto font-medium leading-relaxed">
                            Our technical team is available 24/7 to help you with any setup or configuration queries you might have.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <a
                                href="/support/faq"
                                className="bg-white text-[#001F3F] px-10 py-4 rounded-full font-black text-lg hover:bg-[#14C8D4] transition-all hover:shadow-xl active:scale-95 w-full sm:w-auto text-center"
                            >
                                Visit FAQ
                            </a>
                            <a
                                href="/contact"
                                className="bg-transparent border-2 border-white/20 text-white px-10 py-4 rounded-full font-black text-lg hover:border-[#14C8D4] hover:text-[#14C8D4] transition-all w-full sm:w-auto text-center"
                            >
                                Contact Support
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
