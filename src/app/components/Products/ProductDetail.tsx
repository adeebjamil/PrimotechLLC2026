'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import RelatedProducts from './RelatedProducts';
import { 
    FaCheckCircle, 
    FaTimes, 
    FaArrowRight, 
    FaHome, 
    FaChevronRight, 
    FaBolt, 
    FaShareAlt,
    FaCheck
} from 'react-icons/fa';
import Link from 'next/link';

interface Product {
    _id: string;
    name: string;
    slug: string;
    category: string;
    subCategory: string;
    subTitle?: string;
    description: string;
    images: string[];
    keyFeatures: string[];
    keyHighlights?: string[];
}

const ProductDetail = () => {
    const params = useParams();
    const productSlug = params?.product as string;
    const categorySlug = params?.category as string;
    const subcategorySlug = params?.subcategory as string;
    
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [copied, setCopied] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    // OFFICIAL BRAND THEME
    const brandColor = '#001F3F'; // Deep Navy
    const accentColor = '#14C8D4'; // Cyan

    useEffect(() => {
        const fetchProduct = async () => {
            if (productSlug) {
                try {
                    setLoading(true);
                    const response = await fetch(`/api/products?slug=${productSlug}`);
                    const data = await response.json();
                    if (data.success) {
                        setProduct(data.data);
                        setFormData(prev => ({ ...prev, subject: `Inquiry: ${data.data.name}` }));
                    }
                } catch (error) {
                    console.error('Error fetching product:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchProduct();
    }, [productSlug]);

    const handleShare = async () => {
        const shareUrl = window.location.href;
        const shareTitle = `${product?.name} — PrimoTech LLC`;
        const shareText = `Check out the ${product?.name} from PrimoTech LLC — Dubai's authorized Uniarch security camera supplier.`;

        // Use native Web Share API if available (mobile / modern browsers)
        if (navigator.share) {
            try {
                await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
                return;
            } catch {
                // fallback to panel if user cancels
            }
        }
        setShowShare((prev) => !prev);
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            // fallback
            const input = document.createElement('input');
            input.value = window.location.href;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEnquirySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product) return;

        try {
            setIsSubmitting(true);
            const response = await fetch('/api/enquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    type: 'quote',
                    productName: product.name,
                    productId: product._id,
                    priority: 'high'
                })
            });
            const data = await response.json();
            if (data.success) {
                setIsSubmitted(true);
                setFormData({ fullName: '', email: '', phone: '', subject: `Inquiry: ${product.name}`, message: '' });
            }
        } catch (error) {
            console.error('Error sending enquiry:', error);
            alert('Failed to send request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="py-40 flex flex-col items-center justify-center bg-white min-h-[70vh]">
                <div className="w-16 h-16 border-4 border-gray-100 border-t-[#14C8D4] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="py-40 px-6 text-center">
                <h1 className="text-4xl font-bold text-[#001F3F]">Product Not Found</h1>
                <Link href="/products" className="mt-8 inline-block text-gray-500 hover:text-[#14C8D4]">Back to Catalog</Link>
            </div>
        );
    }

    return (
        <div className="w-full bg-[#F8F9FA] selection:bg-[#14C8D4]/20">
            
            {/* HERO SECTION - REVERTED TO NAVY/CYAN THEME */}
            <section className="relative bg-[#001F3F] pt-32 pb-40 overflow-hidden text-center">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,transparent_1px)] [background-size:40px_40px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    {/* Breadcrumbs Capsule */}
                    <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-black/20 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-black uppercase tracking-widest text-white mt-12 mb-10">
                        <Link href="/" className="hover:text-[#14C8D4] transition-colors flex items-center gap-1.5">Home</Link>
                        <FaChevronRight className="text-[7px] opacity-40" />
                        <Link href="/products" className="hover:text-[#14C8D4] transition-colors">Products</Link>
                        <FaChevronRight className="text-[7px] opacity-40" />
                        <Link href={`/products/${categorySlug}`} className="hover:text-[#14C8D4] transition-colors">{categorySlug?.replace(/-/g, ' ')}</Link>
                        <FaChevronRight className="text-[7px] opacity-40" />
                        <Link href={`/products/${categorySlug}/${subcategorySlug}`} className="hover:text-[#14C8D4] transition-colors">{product.subCategory}</Link>
                        <FaChevronRight className="text-[7px] opacity-40" />
                        <span className="opacity-70">{product.name}</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-tight">
                        {product.name}
                    </h1>

                    {product.subTitle && (
                        <p className="text-[#14C8D4] text-lg md:text-xl font-black uppercase tracking-[0.4em] mb-10">
                            {product.subTitle}
                        </p>
                    )}

                    <div className="flex flex-wrap justify-center items-center gap-4 text-white font-bold text-sm">
                        <span className="opacity-60 uppercase tracking-widest text-[10px]">Model: {product.name}</span>
                        <div className="flex items-center gap-2 bg-white text-[#001F3F] px-5 py-2.5 rounded-xl shadow-lg border border-white">
                            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                <FaCheck className="text-[10px] text-white" />
                            </div>
                            <span className="uppercase tracking-widest text-[10px] font-black">Verified Authentic</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN CONTENT CARD */}
            <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-20 mb-12">
                <div className="bg-white rounded-[3rem] shadow-2xl p-8 md:p-10 lg:p-12 border border-white overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        
                        {/* LEFT: Image Area */}
                        <div className="lg:col-span-5 flex flex-col items-center">
                            <div className="w-full aspect-square bg-[#F3F4F6] rounded-[2.5rem] p-12 relative flex items-center justify-center group overflow-hidden border border-gray-100">
                                <Image 
                                    src={product.images[activeImage]} 
                                    alt={product.name} 
                                    fill
                                    className="object-contain p-12 relative z-10 transition-transform duration-700 group-hover:scale-110" 
                                />
                            </div>
                            
                            {/* Share Button + Panel */}
                            <div className="relative mt-8">
                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-3 px-6 py-3 bg-gray-50 hover:bg-[#001F3F] hover:text-white text-gray-500 rounded-xl transition-all duration-300 font-bold text-xs border border-gray-100 shadow-sm group"
                                >
                                    <FaShareAlt className="text-sm group-hover:text-[#14C8D4] transition-colors" />
                                    Share Product
                                </button>

                                {/* Share Dropdown Panel */}
                                {showShare && (
                                    <div className="absolute left-0 top-full mt-3 z-50 bg-white rounded-2xl border border-gray-100 shadow-2xl p-4 w-64 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Share via</p>

                                        {/* Copy Link */}
                                        <button
                                            onClick={handleCopyLink}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all text-left group"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-[#001F3F] transition-colors">
                                                {copied ? (
                                                    <FaCheck className="text-green-500 text-xs" />
                                                ) : (
                                                    <svg className="w-3.5 h-3.5 text-gray-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                )}
                                            </div>
                                            <span className="text-sm font-bold text-gray-700">
                                                {copied ? 'Link Copied!' : 'Copy Link'}
                                            </span>
                                        </button>

                                        {/* WhatsApp */}
                                        <a
                                            href={`https://wa.me/?text=${encodeURIComponent(`${product.name} — PrimoTech LLC\n${window.location.href}`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all group"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366] transition-colors">
                                                <svg className="w-4 h-4 text-[#25D366] group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                                </svg>
                                            </div>
                                            <span className="text-sm font-bold text-gray-700">WhatsApp</span>
                                        </a>

                                        {/* Email */}
                                        <a
                                            href={`mailto:?subject=${encodeURIComponent(`${product.name} — PrimoTech LLC`)}&body=${encodeURIComponent(`I found this product and thought you might be interested:\n\n${product.name}\n${window.location.href}`)}`}
                                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all group"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-[#14C8D4]/10 flex items-center justify-center group-hover:bg-[#14C8D4] transition-colors">
                                                <svg className="w-3.5 h-3.5 text-[#14C8D4] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-bold text-gray-700">Email</span>
                                        </a>

                                        {/* Close */}
                                        <button
                                            onClick={() => setShowShare(false)}
                                            className="w-full mt-1 text-center text-[10px] font-black text-gray-300 hover:text-gray-500 uppercase tracking-widest py-1 transition-colors"
                                        >
                                            Close
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT: Highlights Area */}
                        <div className="lg:col-span-7 flex flex-col">
                            <div className="mb-8">
                                <span className="text-[#14C8D4] font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">
                                    {product.category} &gt; {product.subCategory}
                                </span>
                                <h2 className="text-4xl md:text-5xl font-black text-[#001F3F] leading-tight mb-8">
                                    {product.subTitle || product.name}
                                </h2>

                                <p className="text-gray-500 text-lg leading-relaxed mb-10 font-medium">
                                    {product.description}
                                </p>

                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#14C8D4] border border-gray-100">
                                        <FaBolt className="text-sm" />
                                    </div>
                                    <h3 className="text-xl font-black text-[#001F3F] tracking-tight">Key Highlights</h3>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {(product.keyHighlights || []).map((highlight, idx) => (
                                        <div key={idx} className="p-5 rounded-2xl bg-white border border-gray-100 hover:border-[#14C8D4]/20 transition-all hover:shadow-lg group">
                                            <span className="text-[10px] font-black text-[#14C8D4] uppercase tracking-widest mb-3 block">Point {idx + 1}</span>
                                            <p className="text-sm text-[#001F3F] font-bold leading-relaxed">
                                                {highlight}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features & Custom Solution Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 pt-12 border-t border-gray-100">
                        {/* Technical Features */}
                        <div>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#14C8D4] border border-gray-100">
                                    <FaCheckCircle className="text-sm" />
                                </div>
                                <h3 className="text-xl font-black text-[#001F3F] tracking-tight">Technical Features</h3>
                            </div>
                            <div className="space-y-2">
                                {product.keyFeatures.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50/50 rounded-xl border-l-4 border-[#14C8D4] group hover:bg-gray-50 transition-all">
                                        <div className="w-2 h-2 rounded-full bg-[#14C8D4]"></div>
                                        <span className="text-sm font-bold text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Custom Solution Box */}
                        <div className="flex flex-col justify-center">
                            <div className="p-10 rounded-[2.5rem] bg-[#001F3F] border border-white/10 shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#14C8D4]/10 rounded-bl-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000"></div>
                                <div className="relative z-10">
                                    <h4 className="text-2xl font-black text-white mb-4 tracking-tight">Need a custom solution?</h4>
                                    <p className="text-white/60 font-medium leading-relaxed mb-10 text-sm">
                                        Our experts can help you design the perfect security system tailored to your specific requirements.
                                    </p>
                                    <button 
                                        onClick={() => setShowForm(true)}
                                        className="inline-flex items-center gap-4 px-10 py-5 bg-[#14C8D4] text-[#001F3F] rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-2xl hover:shadow-[#14C8D4]/40 transition-all active:scale-95 group/btn"
                                    >
                                        Get a Free Quote
                                        <FaArrowRight className="group-hover/btn:translate-x-2 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RELATED ECOSYSTEM */}
            <div className="bg-white border-t border-gray-100">
                <RelatedProducts 
                    currentCategory={product.category} 
                    currentProductId={product._id} 
                />
            </div>

            {/* ENQUIRY MODAL - REDESIGNED */}
            {showForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl transition-all duration-500">
                    <div className="bg-white rounded-[3rem] w-full max-w-lg p-8 md:p-10 shadow-2xl relative overflow-hidden">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#14C8D4]/5 rounded-full -mr-32 -mt-32"></div>
                        
                        <button 
                            onClick={() => {
                                setShowForm(false);
                                setTimeout(() => setIsSubmitted(false), 500);
                            }} 
                            className="absolute top-8 right-8 text-gray-300 hover:text-[#001F3F] transition-all hover:scale-125 z-50"
                        >
                            <FaTimes className="text-2xl" />
                        </button>
                        
                        {isSubmitted ? (
                            <div className="py-12 text-center animate-in fade-in zoom-in duration-500 relative z-10">
                                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-100">
                                    <FaCheckCircle className="text-5xl text-green-500 animate-pulse" />
                                </div>
                                <h3 className="text-4xl font-black text-[#001F3F] mb-4 tracking-tighter">Request Received</h3>
                                <p className="text-gray-500 font-medium mb-10 max-w-sm mx-auto leading-relaxed">
                                    Our technical team has received your inquiry for <span className="text-[#001F3F] font-bold">{product.name}</span>. We will analyze your requirements and contact you shortly.
                                </p>
                                <button 
                                    onClick={() => {
                                        setShowForm(false);
                                        setTimeout(() => setIsSubmitted(false), 500);
                                    }} 
                                    className="px-12 py-5 bg-[#001F3F] text-[#14C8D4] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#14C8D4] hover:text-[#001F3F] transition-all shadow-xl active:scale-95"
                                >
                                    Close Panel
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="mb-6 relative z-10">
                                    <h3 className="text-3xl font-black mb-4 text-[#001F3F] tracking-tighter leading-tight">Get a Product Quote</h3>
                                    
                                    {/* Auto-fetched Product Details Area */}
                                    <div className="flex items-center gap-5 p-4 bg-gray-50 rounded-[1.5rem] border border-gray-100 shadow-inner group">
                                        <div className="w-20 h-20 relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex-shrink-0">
                                            <Image 
                                                src={product.images[0]} 
                                                alt={product.name}
                                                fill 
                                                className="object-contain p-2 group-hover:scale-110 transition-transform duration-500" 
                                            />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <h4 className="text-lg font-black text-[#001F3F] leading-tight truncate">{product.name}</h4>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                                                {product.category} &gt; {product.subCategory}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <form onSubmit={handleEnquirySubmit} className="space-y-4 relative z-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <input name="fullName" required placeholder="John Doe" value={formData.fullName} onChange={handleInputChange} className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#14C8D4] outline-none text-sm font-bold transition-all placeholder:text-gray-300" />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                            <input name="email" type="email" required placeholder="john@company.com" value={formData.email} onChange={handleInputChange} className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#14C8D4] outline-none text-sm font-bold transition-all placeholder:text-gray-300" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                        <input name="phone" required placeholder="+971 -- --- ----" value={formData.phone} onChange={handleInputChange} className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#14C8D4] outline-none text-sm font-bold transition-all placeholder:text-gray-300" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Requirement Details</label>
                                        <textarea name="message" rows={2} placeholder="Tell us about your project requirements..." value={formData.message} onChange={handleInputChange} className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-[#14C8D4] outline-none text-sm font-bold resize-none transition-all placeholder:text-gray-300" />
                                    </div>
                                    
                                    <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-[#001F3F] text-[#14C8D4] rounded-xl font-black text-[11px] uppercase tracking-[0.4em] hover:shadow-2xl hover:shadow-[#14C8D4]/20 transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50">
                                        {isSubmitting ? <div className="w-6 h-6 border-2 border-[#14C8D4] border-t-transparent rounded-full animate-spin"></div> : (
                                            <>Send Quote Request <FaArrowRight className="text-[10px]" /></>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;