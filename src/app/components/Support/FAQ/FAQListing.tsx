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

const FAQListing = () => {
    const [activeCategory, setActiveCategory] = useState<Category>("All Categories");
    const [searchQuery, setSearchQuery] = useState("");
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const filteredFaqs = useMemo(() => {
        return faqs.filter(faq => {
            const matchesCategory = activeCategory === "All Categories" || faq.category === activeCategory;
            const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    return (
        <section className="py-24 bg-white">
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
                                        
                                        <div className={`overflow-hidden transition-all duration-500 ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="px-8 pb-8 pt-2">
                                                <div className="bg-white p-8 rounded-3xl border border-gray-50">
                                                    <p className="text-gray-500 text-lg font-medium leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                    <div className="mt-8 flex items-center gap-6">
                                                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Was this helpful?</span>
                                                        <div className="flex items-center gap-4">
                                                            <button className="text-xs font-black text-[#001F3F] hover:text-[#14C8D4] transition-colors">YES</button>
                                                            <span className="text-gray-200">/</span>
                                                            <button className="text-xs font-black text-[#001F3F] hover:text-red-500 transition-colors">NO</button>
                                                        </div>
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
