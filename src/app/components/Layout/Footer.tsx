'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
    FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube, 
    FaWhatsapp, FaPhoneAlt, FaRegEnvelope, FaMapMarkerAlt, 
    FaArrowRight, FaChevronRight, FaCheckCircle 
} from 'react-icons/fa';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), source: 'footer' })
            });

            const data = await res.json();
            if (data.success) {
                setIsSubscribed(true);
                setEmail('');
            } else {
                alert(data.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Newsletter error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <footer className="bg-white text-[#001F3F] border-t-[5px] border-[#001F3F] pt-24 pb-12 px-6 md:px-12 lg:px-24 relative overflow-hidden">
            {/* Background Decorative Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#14C8D4]/5 rounded-full blur-[150px] -mr-64 -mt-64 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#14C8D4]/5 rounded-full blur-[150px] -ml-64 -mb-64 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
                    
                    {/* Column 1: Brand Info (4 cols) */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="flex items-center">
                            <div className="relative w-48 h-16 bg-gray-50 p-3 rounded-2xl border border-gray-100 group hover:bg-white hover:shadow-xl transition-all duration-500 overflow-hidden">
                                <Image 
                                    src="/logo.png" 
                                    alt="PrimoTech Logo" 
                                    fill
                                    sizes="192px"
                                    className="object-contain p-2"
                                />
                            </div>
                        </div>

                        <p className="text-gray-500 text-lg leading-relaxed font-medium max-w-sm">
                            Leading provider of advanced security camera solutions and surveillance technology, empowering businesses with smarter protection.
                        </p>

                        <div className="space-y-6">
                            <a href="mailto:sales@primotech-llc.com" className="flex items-center gap-5 text-gray-500 hover:text-[#14C8D4] transition-all group">
                                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#001F3F] group-hover:bg-[#001F3F] group-hover:text-white transition-all duration-500 shadow-sm border border-gray-100">
                                    <FaRegEnvelope className="text-xl" />
                                </div>
                                <span className="font-bold tracking-wide">sales@primotech-llc.com</span>
                            </a>
                            <a href="tel:+971528796664" className="flex items-center gap-5 text-gray-500 hover:text-[#14C8D4] transition-all group">
                                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#001F3F] group-hover:bg-[#001F3F] group-hover:text-white transition-all duration-500 shadow-sm border border-gray-100">
                                    <FaPhoneAlt className="text-xl" />
                                </div>
                                <span className="font-bold tracking-wide">+971 52 879 6664</span>
                            </a>
                            <div className="flex items-start gap-5 text-gray-500">
                                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#001F3F] shrink-0 shadow-sm border border-gray-100">
                                    <FaMapMarkerAlt className="text-xl" />
                                </div>
                                <span className="font-bold leading-relaxed tracking-wide">
                                    Shop 23, Musthafa Building,<br/>Satellite Market, Deira, Dubai
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Products (2 cols) */}
                    <div className="lg:col-span-2">
                        <h3 className="text-[#001F3F] font-black text-xs uppercase tracking-[0.4em] mb-12 flex items-center gap-4">
                            <span className="w-8 h-[2px] bg-[#14C8D4]"></span>
                            Products
                        </h3>
                        <ul className="space-y-6">
                            {[
                                "Panda P Series", "Dual Light Cameras", "Analog Cameras", 
                                "Network Switches", "Accessories"
                            ].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-500 hover:text-[#001F3F] transition-all text-[15px] font-bold flex items-center gap-3 group">
                                        <FaChevronRight className="text-[10px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#14C8D4]" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Support & Company (3 cols) */}
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-4">
                        <div>
                            <h3 className="text-[#001F3F] font-black text-xs uppercase tracking-[0.4em] mb-12 flex items-center gap-4">
                                <span className="w-8 h-[2px] bg-[#14C8D4]"></span>
                                Support
                            </h3>
                            <ul className="space-y-6">
                                {[
                                    { label: "FAQ", href: "/support/faq" },
                                    { label: "Video Library", href: "/support/video" },
                                    { label: "Tips & Guides", href: "/tips" }
                                ].map((item) => (
                                    <li key={item.label}>
                                        <a href={item.href} className="text-gray-500 hover:text-[#001F3F] transition-all text-[15px] font-bold flex items-center gap-3 group">
                                            <FaChevronRight className="text-[10px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#14C8D4]" />
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-[#001F3F] font-black text-xs uppercase tracking-[0.4em] mb-12 flex items-center gap-4">
                                <span className="w-8 h-[2px] bg-[#14C8D4]"></span>
                                Company
                            </h3>
                            <ul className="space-y-6">
                                {[
                                    { label: "About Us", href: "#" },
                                    { label: "Contact Us", href: "/contact" },
                                    { label: "Partner", href: "/partner" }
                                ].map((item) => (
                                    <li key={item.label}>
                                        <a href={item.href} className="text-gray-500 hover:text-[#001F3F] transition-all text-[15px] font-bold flex items-center gap-3 group">
                                            <FaChevronRight className="text-[10px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#14C8D4]" />
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Column 4: Newsletter (3 cols) */}
                    <div className="lg:col-span-3 space-y-10">
                        <h3 className="text-[#001F3F] font-black text-xs uppercase tracking-[0.4em] mb-12 flex items-center gap-4">
                            <span className="w-8 h-[2px] bg-[#14C8D4]"></span>
                            Newsletter
                        </h3>
                        <p className="text-gray-500 text-[15px] font-bold leading-relaxed">
                            Get updates and special offers delivered to your inbox.
                        </p>
                        {isSubscribed ? (
                            <div className="bg-green-50 border border-green-100 p-6 rounded-[2rem] animate-in fade-in zoom-in duration-500">
                                <p className="text-green-700 font-black text-sm flex items-center gap-3">
                                    <FaCheckCircle className="text-xl animate-bounce" /> Thank you for subscribing!
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="relative group">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your Email Address"
                                    required
                                    disabled={isSubmitting}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-[#14C8D4] focus:bg-white transition-all font-bold placeholder:text-gray-400 disabled:opacity-50"
                                />
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#001F3F] rounded-xl flex items-center justify-center text-white hover:bg-[#14C8D4] hover:text-[#001F3F] transition-all shadow-xl group-hover:scale-105 disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <FaArrowRight />
                                    )}
                                </button>
                            </form>
                        )}

                        <div className="flex items-center gap-4">
                            {[
                                { icon: FaFacebookF, label: 'Facebook' },
                                { icon: FaInstagram, label: 'Instagram' },
                                { icon: FaTwitter, label: 'Twitter' },
                                { icon: FaLinkedinIn, label: 'LinkedIn' },
                                { icon: FaYoutube, label: 'YouTube' }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#001F3F] hover:bg-[#14C8D4] hover:text-[#001F3F] transition-all duration-500 shadow-sm border border-gray-100"
                                    aria-label={social.label}
                                >
                                    <social.icon className="text-lg" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-gray-400 text-sm font-bold tracking-wide">
                        Copyright © 2026 <span className="text-[#001F3F]">PrimoTech</span>. All rights reserved.
                    </p>
                    <div className="flex gap-12">
                        <a href="/privacy" className="text-gray-400 hover:text-[#001F3F] text-sm font-bold transition-all tracking-wide">Privacy Policy</a>
                        <a href="/terms" className="text-gray-400 hover:text-[#001F3F] text-sm font-bold transition-all tracking-wide">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>

    );
};

export default Footer;