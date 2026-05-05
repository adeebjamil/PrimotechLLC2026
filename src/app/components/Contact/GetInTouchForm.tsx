'use client';

import React, { useState } from 'react';
import { FaPaperPlane, FaClock, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

const GetInTouchForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const submissionData = {
                fullName: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
                phone: formData.phone,
                subject: formData.subject,
                message: formData.message,
                // The API also accepts 'company' if we wanted to store it, 
                // but the current Contact model doesn't have it. 
                // I'll append it to the message or just ignore if not in schema.
            };

            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData)
            });

            const data = await res.json();
            if (data.success) {
                setIsSubmitted(true);
            } else {
                alert(data.message || "Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <section className="py-24 bg-[#f8fafc]">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="bg-white rounded-[4rem] p-16 text-center shadow-[0_50px_100px_-20px_rgba(0,31,63,0.05)] border border-gray-100 animate-in fade-in zoom-in duration-700">
                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10 border border-green-100 shadow-sm">
                            <FaCheckCircle className="text-5xl text-green-500 animate-bounce" />
                        </div>
                        <h2 className="text-5xl font-black text-[#001F3F] mb-6 tracking-tighter">Message Received!</h2>
                        <p className="text-gray-500 text-xl font-medium mb-12 max-w-xl mx-auto leading-relaxed">
                            Thank you for reaching out to <span className="text-[#001F3F] font-black">Primotech LLC</span>. Your inquiry has been logged in our system and our experts will contact you within 24 hours.
                        </p>
                        <button 
                            onClick={() => {
                                setIsSubmitted(false);
                                setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', subject: '', message: '' });
                            }}
                            className="inline-flex items-center gap-4 px-12 py-5 bg-[#001F3F] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#14C8D4] hover:text-[#001F3F] transition-all shadow-xl active:scale-95"
                        >
                            <FaArrowLeft className="text-xs" /> Send Another Message
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 bg-[#f8fafc]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-white rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,31,63,0.05)] border border-gray-100">
                    <div className="flex flex-col lg:flex-row">
                        {/* Left Side - Info */}
                        <div className="lg:w-1/3 bg-[#001F3F] p-16 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#14C8D4]/10 blur-[80px] rounded-full"></div>
                            <div className="relative z-10">
                                <h2 className="text-4xl font-black text-white mb-6">Get In Touch</h2>
                                <p className="text-gray-400 text-lg font-medium leading-relaxed mb-12">
                                    Ready to discuss your project? Fill out the form and our consultants will respond within 24 hours.
                                </p>
                                
                                <div className="space-y-8">
                                    <div className="flex items-center gap-4 text-white/60">
                                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                                            <FaClock className="text-[#14C8D4]" />
                                        </div>
                                        <span className="font-bold">Rapid Response Guaranteed</span>
                                    </div>
                                    <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                                        <p className="text-[#14C8D4] font-black text-sm uppercase tracking-widest mb-2">Our Promise</p>
                                        <p className="text-white text-sm font-medium leading-relaxed italic">
                                            "We'll respond within 24 hours with a personalized consultation tailored to your specific security needs."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Form */}
                        <div className="lg:w-2/3 p-12 md:p-16">
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-[#001F3F] uppercase tracking-widest ml-1">First Name *</label>
                                    <input 
                                        name="firstName"
                                        type="text" 
                                        placeholder="Enter your first name"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:outline-none focus:border-[#14C8D4] focus:bg-white transition-all font-medium"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-[#001F3F] uppercase tracking-widest ml-1">Last Name *</label>
                                    <input 
                                        name="lastName"
                                        type="text" 
                                        placeholder="Enter your last name"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:outline-none focus:border-[#14C8D4] focus:bg-white transition-all font-medium"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-[#001F3F] uppercase tracking-widest ml-1">Email Address *</label>
                                    <input 
                                        name="email"
                                        type="email" 
                                        placeholder="your.email@company.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:outline-none focus:border-[#14C8D4] focus:bg-white transition-all font-medium"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-[#001F3F] uppercase tracking-widest ml-1">Phone Number</label>
                                    <input 
                                        name="phone"
                                        type="tel" 
                                        placeholder="+1 (555) 123-4567"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:outline-none focus:border-[#14C8D4] focus:bg-white transition-all font-medium"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-black text-[#001F3F] uppercase tracking-widest ml-1">Company Name</label>
                                    <input 
                                        name="company"
                                        type="text" 
                                        placeholder="Your Company Name"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:outline-none focus:border-[#14C8D4] focus:bg-white transition-all font-medium"
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-black text-[#001F3F] uppercase tracking-widest ml-1">Subject *</label>
                                    <select 
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:outline-none focus:border-[#14C8D4] focus:bg-white transition-all font-medium appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="">Select inquiry type</option>
                                        <option value="sales">Sales & Partnerships</option>
                                        <option value="technical">Technical Support</option>
                                        <option value="general">General Inquiry</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs font-black text-[#001F3F] uppercase tracking-widest ml-1">Message *</label>
                                    <textarea 
                                        name="message"
                                        placeholder="Please describe your project requirements, questions, or how we can help you achieve your goals..."
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:outline-none focus:border-[#14C8D4] focus:bg-white transition-all font-medium min-h-[150px] resize-none"
                                        required
                                    ></textarea>
                                </div>
                                <div className="md:col-span-2 pt-4">
                                    <button 
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-[#001F3F] text-white py-5 rounded-2xl font-black text-xl hover:bg-[#14C8D4] hover:text-[#001F3F] transition-all shadow-xl active:scale-95 flex items-center justify-center gap-4 disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <>Send Message <FaPaperPlane className="text-base" /></>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GetInTouchForm;
