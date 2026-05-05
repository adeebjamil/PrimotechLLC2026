'use client';

import { FaWhatsapp, FaPhoneAlt, FaRegEnvelope } from 'react-icons/fa';

export default function FloatingContact() {
    return (
        <div className="fixed bottom-10 right-10 z-[200] flex flex-col items-end gap-3 group">
            {/* Stacked quick-action buttons — animate bottom to top on hover */}
            <div className="flex flex-col items-end gap-3
                opacity-0 translate-y-10 pointer-events-none
                group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
                transition-all duration-500 ease-out">

                {/* Email */}
                <a
                    href="mailto:sales@primotech-llc.com"
                    className="flex items-center gap-3 bg-white border border-gray-100 shadow-xl rounded-2xl px-5 py-3 hover:bg-[#001F3F] hover:border-[#001F3F] transition-all duration-300 group/btn"
                    style={{ transitionDelay: '100ms' }}
                >
                    <span className="text-[#001F3F] group-hover/btn:text-white text-[13px] font-bold tracking-wide whitespace-nowrap">
                        sales@primotech-llc.com
                    </span>
                    <div className="w-9 h-9 bg-[#001F3F] group-hover/btn:bg-[#14C8D4] rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                        <FaRegEnvelope className="text-white text-sm" />
                    </div>
                </a>

                {/* Phone */}
                <a
                    href="tel:+971528796664"
                    className="flex items-center gap-3 bg-white border border-gray-100 shadow-xl rounded-2xl px-5 py-3 hover:bg-[#001F3F] hover:border-[#001F3F] transition-all duration-300 group/btn"
                    style={{ transitionDelay: '50ms' }}
                >
                    <span className="text-[#001F3F] group-hover/btn:text-white text-[13px] font-bold tracking-wide whitespace-nowrap">
                        +971 52 879 6664
                    </span>
                    <div className="w-9 h-9 bg-[#001F3F] group-hover/btn:bg-[#14C8D4] rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                        <FaPhoneAlt className="text-white text-sm" />
                    </div>
                </a>

                {/* WhatsApp */}
                <a
                    href="https://wa.me/971528796664"
                    className="flex items-center gap-3 bg-white border border-gray-100 shadow-xl rounded-2xl px-5 py-3 hover:bg-[#25d366] hover:border-[#25d366] transition-all duration-300 group/btn"
                    style={{ transitionDelay: '0ms' }}
                >
                    <span className="text-[#001F3F] group-hover/btn:text-white text-[13px] font-bold tracking-wide whitespace-nowrap">
                        Chat on WhatsApp
                    </span>
                    <div className="w-9 h-9 bg-[#25d366] rounded-xl flex items-center justify-center flex-shrink-0">
                        <FaWhatsapp className="text-white text-sm" />
                    </div>
                </a>
            </div>

            {/* Trigger Button */}
            <div className="relative w-16 h-16 bg-[#14C8D4] rounded-[1.5rem] flex items-center justify-center shadow-[0_10px_40px_rgba(20,200,212,0.4)] cursor-pointer transition-all duration-500 hover:scale-110 group-hover:rotate-45">
                <svg className="w-7 h-7 text-[#001F3F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#001F3F] rounded-full border-2 border-white animate-ping opacity-75" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#001F3F] rounded-full border-2 border-white" />
            </div>
        </div>
    );
}
