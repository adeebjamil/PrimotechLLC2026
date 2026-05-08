'use client';

import { useState, useMemo } from "react";
import { FaPlus, FaMinus, FaLightbulb, FaTools, FaShieldAlt, FaNetworkWired, FaCog, FaMicrochip, FaSearch } from "react-icons/fa";

type Category =
  | "All Categories"
  | "General"
  | "Network"
  | "Features"
  | "Support"
  | "Warranty"
  | "Installation"
  | "Maintenance";

interface FAQ {
  category: Exclude<Category, "All Categories">;
  question: string;
  answer: string;
}


interface FAQListingProps {
    searchQuery: string;
}

const faqs: FAQ[] = [
    {
      category: "General",
      question: "How to change the login password of admin user and manage user accounts?",
      answer: "To change the admin password, log into the camera's web interface using your current credentials. Go to 【Security】>【User List】. Select the admin account and click 'Edit'. Enter the new password and confirm it. Save changes to apply. For better security, we suggest using a complex password that includes uppercase letters, numbers, and symbols. You can also create and manage additional user accounts from this section with custom permissions for each user.",
    },
    {
      category: "Network",
      question: "How to modify the IP address of Uniarch product and configure advanced network settings?",
      answer: "The default IP address is 192.168.1.64 and DHCP is enabled by default. To change it, access the device's web interface and go to 【Network】>【TCP/IP Settings】. Choose DHCP for automatic assignment or select static mode to set a fixed IP address. Enter the IP, subnet mask, and gateway if using static mode. Configure DNS servers if needed. Save your settings and restart the device.",
    },
    {
      category: "Support",
      question: "How to connect my cameras to the Uniarch mobile app for remote viewing?",
      answer: "Download the Uniarch app from the App Store or Google Play. Create an account and log in. Tap the '+' icon and select 'Scan QR Code'. Scan the QR code on the NVR or camera label. If the device is on the same network, it will be added automatically. Ensure P2P status is 'Online' in the device's network settings to enable remote access outside your home network.",
    },
    {
      category: "Network",
      question: "What should I do if my camera shows 'Offline' in the mobile app?",
      answer: "First, check the physical connection (cable or WiFi signal). Ensure the camera is powered on. Check if the NVR is connected to the internet. Go to the device's web interface > Network > P2P and verify if the status is 'Online'. If it's offline, try restarting your router and the device. Ensure your firewall isn't blocking ports 80, 443, or the custom media ports.",
    },
    {
      category: "Features",
      question: "How to configure Human and Vehicle detection (AI) for accurate alerts?",
      answer: "Access the device settings via web browser or NVR. Go to 【Smart Event】>【Intrusion Detection】 or 【Crossline Detection】. Enable the feature and draw your detection area. In the 'Detection Target' section, select 'Human' and/or 'Vehicle'. Adjust the sensitivity (recommend 50-70). Set up the 'Linkage Method' to send push notifications to your mobile app. This significantly reduces false alarms from shadows or animals.",
    },
    {
      category: "Features",
      question: "How can I retrieve and export recorded footage from my NVR to a USB drive?",
      answer: "Connect a FAT32-formatted USB drive to the NVR's USB port. On the local monitor, go to 【Playback】. Select the camera and the date/time range. Click the 'Backup' or 'Export' button. Select the desired clips and choose the export format (MP4 recommended for universal playback). Once the progress bar finishes, you can safely remove the USB drive and view the files on any PC.",
    },
    {
      category: "Features",
      question: "Does PrimoTech support cloud storage and what are the available recording options?",
      answer: "Yes, our cameras support multiple storage methods. Cloud storage offers end-to-end encryption and options for 7, 30, or 90-day plans. Local storage via SD card is supported up to 256GB. Devices also work with NAS and FTP for backups. Cloud features include motion-triggered recording, AI event tagging, and cross-platform sync.",
    },
    {
      category: "Support",
      question: "Where can I download manuals, firmware updates, and additional software tools?",
      answer: "Visit our official website and go to the Downloads section. Select your product category and model. You'll find manuals (PDF), firmware updates with release notes, configuration tools, mobile apps (iOS/Android), and SDKs. Register your product to receive update alerts.",
    },
    {
      category: "Warranty",
      question: "What is the warranty period and what does the coverage include?",
      answer: "PrimoTech offers a 3-year limited warranty covering hardware defects and technical support. Critical systems may qualify for advanced replacement. Covered parts include lenses, sensors, and internal electronics. Extended warranty plans are available, adding up to 2 additional years.",
    },
    {
      category: "Installation",
      question: "What are the recommended installation practices for outdoor cameras?",
      answer: "Install cameras in locations with proper weather protection (IP67-rated). Use strong mounting surfaces that can handle 3x device weight. Keep at least 3 feet away from trees to avoid obstruction. Use waterproof cable glands for all wiring. For PoE, use outdoor-rated Ethernet and surge protection.",
    }
];

const categories: { name: Category; icon: any }[] = [
  { name: "All Categories", icon: FaLightbulb },
  { name: "General", icon: FaCog },
  { name: "Network", icon: FaNetworkWired },
  { name: "Features", icon: FaMicrochip },
  { name: "Support", icon: FaTools },
  { name: "Warranty", icon: FaShieldAlt },
  { name: "Installation", icon: FaTools },
  { name: "Maintenance", icon: FaTools },
];

const FAQListing = ({ searchQuery }: FAQListingProps) => {
    const [activeCategory, setActiveCategory] = useState<Category>("All Categories");
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [helpfulFeedback, setHelpfulFeedback] = useState<Record<number, boolean>>({});
    const [showPopup, setShowPopup] = useState(false);

    // Load feedback from localStorage on mount
    useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('faq_feedback');
            if (saved) setHelpfulFeedback(JSON.parse(saved));
        }
    });

    const handleHelpful = (index: number) => {
        const newFeedback = { ...helpfulFeedback, [index]: true };
        setHelpfulFeedback(newFeedback);
        localStorage.setItem('faq_feedback', JSON.stringify(newFeedback));
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
    };

    const filteredFaqs = useMemo(() => {
        return faqs.filter(faq => {
            const matchesCategory = activeCategory === "All Categories" || faq.category === activeCategory;
            const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    return (
        <section className="py-24 bg-white relative">
            {/* Thank You Popup */}
            <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] transition-all duration-500 ${showPopup ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                <div className="bg-[#001F3F] text-white px-8 py-4 rounded-2xl shadow-2xl border border-green-500/30 flex items-center gap-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-[#001F3F]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <span className="font-black text-sm uppercase tracking-widest">Thank you for your feedback!</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Sidebar Filters */}
                    <div className="w-full lg:w-1/4">
                        <div className="sticky top-32">
                            <h3 className="text-[#001F3F] font-black text-xs uppercase tracking-[0.2em] mb-8">Categories</h3>
                            <div className="space-y-2">
                                {categories.map((cat) => {
                                    const Icon = cat.icon;
                                    return (
                                        <button
                                            key={cat.name}
                                            onClick={() => setActiveCategory(cat.name)}
                                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                                                activeCategory === cat.name 
                                                ? 'bg-[#001F3F] text-white shadow-xl shadow-[#001F3F]/10' 
                                                : 'text-gray-500 hover:bg-gray-50 hover:text-[#001F3F]'
                                            }`}
                                        >
                                            <Icon className={`text-lg ${activeCategory === cat.name ? 'text-[#14C8D4]' : 'text-gray-400'}`} />
                                            {cat.name}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Help Box */}
                            <div className="mt-12 p-8 bg-[#f8fafc] rounded-[2rem] border border-gray-100">
                                <h4 className="text-[#001F3F] font-black mb-3">Still stuck?</h4>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">Our support heroes are ready to assist you personally.</p>
                                <a 
                                    href="/contact" 
                                    className="block text-center py-4 bg-[#14C8D4] text-[#001F3F] rounded-xl font-black text-sm hover:shadow-lg transition-all active:scale-95"
                                >
                                    Get In Touch
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Content */}
                    <div className="w-full lg:w-3/4">
                        <div className="mb-10 flex items-center justify-between">
                            <h2 className="text-3xl font-black text-[#001F3F]">
                                {activeCategory === 'All Categories' ? 'Frequently Asked Questions' : activeCategory}
                            </h2>
                            <span className="text-gray-400 font-bold text-sm uppercase tracking-widest bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">
                                {filteredFaqs.length} Results
                            </span>
                        </div>

                        {filteredFaqs.length > 0 ? (
                            <div className="space-y-4">
                                {filteredFaqs.map((faq, index) => (
                                    <div 
                                        key={index}
                                        className={`group border rounded-[2rem] transition-all duration-500 ${
                                            openIndex === index 
                                            ? 'border-[#14C8D4] bg-[#fcfdfe] shadow-[0_20px_50px_rgba(20,200,212,0.1)]' 
                                            : 'border-gray-100 bg-white hover:border-gray-200'
                                        }`}
                                    >
                                        <button
                                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                            className="w-full flex items-center justify-between p-8 text-left outline-none"
                                        >
                                            <span className={`text-xl font-black transition-colors ${openIndex === index ? 'text-[#001F3F]' : 'text-gray-600 group-hover:text-[#001F3F]'}`}>
                                                {faq.question}
                                            </span>
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${openIndex === index ? 'bg-[#001F3F] text-[#14C8D4] rotate-180' : 'bg-gray-50 text-gray-400'}`}>
                                                {openIndex === index ? <FaMinus /> : <FaPlus />}
                                            </div>
                                        </button>
                                        
                                        <div className={`overflow-hidden transition-all duration-500 ${openIndex === index ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="px-8 pb-8 pt-2">
                                                <div className="bg-white p-8 rounded-3xl border border-gray-50">
                                                    <p className="text-gray-500 text-lg font-medium leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                    <div className="mt-8 flex items-center gap-6">
                                                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Was this helpful?</span>
                                                        {helpfulFeedback[index] ? (
                                                            <span className="text-xs font-black text-[#14C8D4] uppercase tracking-widest flex items-center gap-2">
                                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                                                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                                                </svg>
                                                                Feedback Submitted
                                                            </span>
                                                        ) : (
                                                            <div className="flex items-center gap-4">
                                                                <button 
                                                                    onClick={() => handleHelpful(index)}
                                                                    className="text-xs font-black text-[#001F3F] hover:text-[#14C8D4] transition-colors"
                                                                >
                                                                    YES
                                                                </button>
                                                                <span className="text-gray-200">/</span>
                                                                <button className="text-xs font-black text-[#001F3F] hover:text-red-500 transition-colors">NO</button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                    <FaSearch className="text-gray-300 text-2xl" />
                                </div>
                                <h3 className="text-xl font-black text-[#001F3F] mb-2">No matching questions found</h3>
                                <p className="text-gray-500 font-medium">Try searching for something else or browse categories.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQListing;
