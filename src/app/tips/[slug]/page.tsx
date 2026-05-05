'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaArrowLeft, FaShareAlt, FaBookmark, FaUser, FaLinkedinIn } from 'react-icons/fa';
import { tipsData } from '../tipsData';

const TipDetail = () => {
    const { slug } = useParams();
    const article = tipsData.find(a => a.slug === slug);

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-[#001F3F] mb-6">Article Not Found</h1>
                    <Link href="/tips" className="text-[#14C8D4] font-bold hover:underline flex items-center justify-center gap-2">
                        <FaArrowLeft /> Back to Tips
                    </Link>
                </div>
            </div>
        );
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.subtitle,
                url: window.location.href,
            }).catch(() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <main className="min-h-screen bg-white">
            {/* Header / Hero */}
            <header className="relative pt-32 pb-20 px-6 md:px-12 lg:px-24 bg-gray-50 overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <Link href="/tips" className="inline-flex items-center gap-2 text-[#14C8D4] font-black uppercase tracking-widest text-[10px] mb-12 hover:gap-4 transition-all group">
                        <FaArrowLeft /> Back to Articles
                    </Link>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                        <span className="bg-[#001F3F] text-[#14C8D4] px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest">
                            {article.category}
                        </span>
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-black uppercase tracking-widest border-l border-gray-200 pl-4">
                            <FaCalendarAlt className="text-[#14C8D4]" />
                            {article.date}
                        </div>
                        <div className="text-gray-400 text-xs font-black uppercase tracking-widest border-l border-gray-200 pl-4">
                            {article.readTime}
                        </div>
                        <div className="text-[#14C8D4] text-xs font-black uppercase tracking-widest border-l border-gray-200 pl-4">
                            {article.center}
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#001F3F] leading-[1.1] mb-10 tracking-tighter">
                        {article.title}
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed max-w-3xl">
                        {article.subtitle}
                    </p>
                </div>
                
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#14C8D4]/5 rounded-full blur-[100px]"></div>
            </header>

            {/* Main Image */}
            <section className="px-6 md:px-12 lg:px-24 -mt-10 mb-20">
                <div className="max-w-5xl mx-auto relative h-[400px] md:h-[600px] rounded-[3.5rem] overflow-hidden shadow-2xl">
                    <Image 
                        src={article.image} 
                        alt={article.title} 
                        fill
                        className="object-cover"
                    />
                </div>
            </section>

            {/* Content Section */}
            <article className="px-6 md:px-12 lg:px-24 pb-32">
                <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* Left Side: Sidebar info */}
                    <div className="lg:col-span-3 space-y-12">
                        <div className="space-y-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Expert Author</p>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-[#001F3F] rounded-full flex items-center justify-center text-[#FFD700] shadow-lg border border-[#FFD700]/20">
                                    <FaUser className="text-2xl" />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-[#001F3F] leading-tight">{article.expertName}</p>
                                    <p className="text-[10px] font-bold text-gray-400 mt-1">{article.expertRole}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Share This</p>
                            <div className="flex gap-4">
                                <button 
                                    onClick={handleShare}
                                    className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#001F3F] hover:bg-[#14C8D4] hover:text-[#001F3F] transition-all shadow-md border border-gray-100 group/share"
                                    title="Share Article"
                                >
                                    <FaShareAlt className="text-xl group-hover/share:scale-110 transition-transform" />
                                </button>
                                <a 
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ''}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#001F3F] hover:bg-[#0077b5] hover:text-white transition-all shadow-md border border-gray-100 group/linkedin"
                                    title="Share on LinkedIn"
                                >
                                    <FaLinkedinIn className="text-xl group-hover/linkedin:scale-110 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Main Content */}
                    <div className="lg:col-span-9 space-y-12">
                        <div className="prose prose-xl prose-slate max-w-none">
                            <div className="space-y-10">
                                {article.fullContent.map((paragraph, idx) => (
                                    <p key={idx} className={`${idx === 0 ? 'text-2xl text-[#001F3F] font-bold' : 'text-gray-600 font-medium'} leading-relaxed`}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-3 mt-16 pt-12 border-t border-gray-100">
                                {article.tags.map((tag) => (
                                    <span key={tag} className="text-[11px] font-black text-[#14C8D4] bg-[#14C8D4]/5 px-4 py-2 rounded-full uppercase tracking-widest border border-[#14C8D4]/10">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </article>

            {/* Next Articles */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-3xl font-black text-[#001F3F] mb-12">Read Next</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {tipsData.filter(a => a.slug !== slug).slice(0, 2).map((a, idx) => (
                            <Link href={`/tips/${a.slug}`} key={idx} className="group bg-white p-6 rounded-[2.5rem] flex items-center gap-8 border border-gray-100 hover:shadow-xl transition-all">
                                <div className="relative w-32 h-32 rounded-3xl overflow-hidden shrink-0 shadow-lg">
                                    <Image src={a.image} alt={a.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-[#14C8D4] uppercase tracking-widest mb-3">{a.category}</p>
                                    <h4 className="text-xl font-black text-[#001F3F] leading-tight transition-colors">{a.title}</h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default TipDetail;
