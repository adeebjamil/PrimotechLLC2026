'use client';

import React from 'react';
import { FaMapMarkerAlt, FaCompass } from 'react-icons/fa';

const LocationSection = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2">
                        <div className="inline-flex items-center gap-2 bg-[#001F3F]/5 border border-[#001F3F]/10 px-5 py-2.5 rounded-full mb-8">
                            <FaMapMarkerAlt className="text-[#14C8D4] text-sm" />
                            <span className="text-[#001F3F] font-black text-xs uppercase tracking-[0.25em]">Visit Our Showroom</span>
                        </div>
                        <h2 className="text-5xl font-black text-[#001F3F] mb-8 leading-tight">Find Us in <span className="text-[#14C8D4]">Dubai</span></h2>
                        <p className="text-gray-500 text-xl font-medium leading-relaxed mb-10">
                            Visit our flagship showroom to see Primotech products in action and get hands-on consultation from our security experts. We provide live demonstrations of our AI-powered surveillance systems.
                        </p>
                        
                        <div className="bg-[#f8fafc] p-10 rounded-[3rem] border border-gray-100 flex items-start gap-8">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm border border-gray-50">
                                <FaCompass className="text-[#14C8D4] text-2xl" />
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-[#001F3F] mb-2">Dubai Office</h4>
                                <p className="text-gray-500 font-medium leading-relaxed mb-6">
                                    Sultan Khalifa Al Habtoor Sheds, Warehouse no 98 - Nadd Al Hamar - Dubai
                                </p>
                                <a 
                                    href="https://www.google.com/maps/place/Mustafa+Building+Materials+Company/@25.190361,55.3739898,797m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e5f434b80f4bb19:0x2926ff4d4ba2c4f!8m2!3d25.190361!4d55.3739898!16s%2Fg%2F11bbwnj9np?hl=en&entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-[#14C8D4] font-black uppercase tracking-widest text-xs hover:text-[#001F3F] transition-colors"
                                >
                                    Open in Google Maps
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div className="lg:w-1/2 w-full">
                        <div className="aspect-video lg:aspect-square bg-gray-100 rounded-[4rem] overflow-hidden shadow-2xl relative group">
                            {/* Google Maps Iframe - Correct Embed URL */}
                            <iframe 
                                src="https://maps.google.com/maps?q=25.190361,55.3739898&z=16&output=embed"
                                className="w-full h-full border-0" 
                                allowFullScreen={true} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            
                            <div className="absolute inset-0 pointer-events-none border-[10px] border-white/5 rounded-[4rem]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocationSection;
