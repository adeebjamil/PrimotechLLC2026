'use client';

export default function TermsOfService() {
    const sections = [
        {
            title: '1. Acceptance of Terms',
            content: [
                'By accessing and using the PrimoTech LLC website (<strong>primotech-llc.com</strong>), you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please discontinue use of our website immediately.',
                'We reserve the right to update or modify these Terms at any time. Continued use of the website following any changes constitutes your acceptance of the revised Terms.',
            ],
        },
        {
            title: '2. About PrimoTech LLC',
            content: [
                'PrimoTech LLC is a leading authorized distributor and supplier of advanced CCTV surveillance and security solutions in the Middle East, including products from Uniarch and other premium brands.',
                'Our registered business address is: <strong>Shop 23, Musthafa Building, Satellite Market, Deira, Dubai, UAE.</strong>',
            ],
        },
        {
            title: '3. Use of the Website',
            content: [
                'You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You must not:',
                '• Use the website in any fraudulent or unlawful way.',
                '• Transmit any unsolicited or unauthorized advertising or promotional material.',
                '• Attempt to gain unauthorized access to any part of the website or its related systems.',
                '• Introduce viruses, trojans, worms, or other malicious code.',
                '• Scrape, copy, or reproduce any content without our prior written permission.',
            ],
        },
        {
            title: '4. Product Information & Availability',
            content: [
                'All product descriptions, specifications, images, and pricing displayed on this website are for informational purposes only and are subject to change without notice.',
                'We make every effort to ensure accuracy, but we do not warrant that product descriptions or other content on the website are error-free, complete, or current.',
                'Product availability is subject to stock and may vary. We reserve the right to limit quantities or refuse orders at our discretion.',
            ],
        },
        {
            title: '5. Quotations & Orders',
            content: [
                'Prices displayed on the website (if any) are indicative. Formal quotations are provided upon request and are valid for a period specified in the quotation document.',
                'An order is accepted only upon written confirmation from PrimoTech LLC. We reserve the right to decline any order for any reason.',
                'All sales are subject to our standard sales terms and conditions provided at the time of purchase.',
            ],
        },
        {
            title: '6. Intellectual Property',
            content: [
                'All content on this website, including text, graphics, logos, images, and software, is the property of PrimoTech LLC or its content suppliers and is protected by UAE and international intellectual property laws.',
                'You may not reproduce, distribute, modify, display, or create derivative works from any content on this site without our express written permission.',
                'Brand names and product names (e.g., Uniarch) are trademarks of their respective owners. PrimoTech LLC is an authorized distributor and does not claim ownership of third-party trademarks.',
            ],
        },
        {
            title: '7. Disclaimer of Warranties',
            content: [
                'This website and its content are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied, including but not limited to:',
                '• Implied warranties of merchantability or fitness for a particular purpose.',
                '• Accuracy, reliability, or completeness of any information on the website.',
                '• Uninterrupted or error-free access to the website.',
                'We do not warrant that the website will be free of viruses or other harmful components.',
            ],
        },
        {
            title: '8. Limitation of Liability',
            content: [
                'To the fullest extent permitted by applicable law, PrimoTech LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this website or its content.',
                'Our total liability to you for any claim arising out of or relating to these Terms or the use of our website shall not exceed the amount you paid us in the twelve (12) months preceding the claim.',
            ],
        },
        {
            title: '9. Third-Party Links',
            content: [
                'Our website may contain links to external websites for your convenience. PrimoTech LLC does not endorse, control, or assume responsibility for the content, privacy policies, or practices of any third-party websites.',
                'We encourage you to read the terms and privacy policies of any external sites you visit.',
            ],
        },
        {
            title: '10. Governing Law & Jurisdiction',
            content: [
                'These Terms of Service shall be governed by and construed in accordance with the laws of the <strong>United Arab Emirates</strong>.',
                'Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.',
            ],
        },
        {
            title: '11. Changes to These Terms',
            content: [
                'We reserve the right to amend these Terms of Service at any time. Changes will be posted on this page with an updated effective date. Your continued use of the website after any changes constitutes your acceptance of the new Terms.',
            ],
        },
        {
            title: '12. Contact Information',
            content: [
                'For any questions or concerns regarding these Terms of Service, please reach out to us:',
                '<strong>PrimoTech LLC</strong>',
                'Shop 23, Musthafa Building, Satellite Market, Deira, Dubai, UAE',
                'Email: <a href="mailto:sales@primotech-llc.com" class="text-[#14C8D4] hover:underline">sales@primotech-llc.com</a>',
                'Phone: <a href="tel:+971528796664" class="text-[#14C8D4] hover:underline">+971 52 879 6664</a>',
            ],
        },
    ];

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Banner */}
            <section className="bg-[#001F3F] pt-36 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#14C8D4] rounded-full blur-[120px] -mr-64 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#14C8D4] rounded-full blur-[100px] -ml-32 -mb-32" />
                </div>
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-[#14C8D4]/10 border border-[#14C8D4]/30 text-[#14C8D4] px-5 py-2 rounded-full text-sm font-bold tracking-widest uppercase mb-8">
                        Legal
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Terms of <span className="text-[#14C8D4]">Service</span>
                    </h1>
                    <p className="text-gray-300 text-lg font-medium max-w-2xl mx-auto">
                        Please read these terms carefully before using our website or services.
                    </p>
                    <p className="mt-6 text-gray-400 text-sm font-semibold">
                        Effective Date: <span className="text-[#14C8D4]">January 1, 2025</span> &nbsp;|&nbsp; Last Updated: <span className="text-[#14C8D4]">May 1, 2026</span>
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="max-w-4xl mx-auto px-6 py-20">
                {/* Intro */}
                <div className="bg-[#f8fafc] border-l-4 border-[#14C8D4] rounded-2xl p-8 mb-14">
                    <p className="text-gray-600 text-lg leading-relaxed font-medium">
                        These Terms of Service (&quot;Terms&quot;) govern your access to and use of the <strong className="text-[#001F3F]">PrimoTech LLC</strong> website and services. By using our website, you confirm that you are at least 18 years of age and have the legal capacity to enter into a binding agreement.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-10">
                    {sections.map((section, idx) => (
                        <div key={idx} className="group">
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-10 h-10 bg-[#001F3F] rounded-xl flex items-center justify-center text-[#14C8D4] font-black text-sm flex-shrink-0">
                                    {idx + 1}
                                </div>
                                <h2 className="text-xl md:text-2xl font-black text-[#001F3F]">{section.title}</h2>
                            </div>
                            <div className="ml-14 space-y-3 border-l-2 border-gray-100 pl-6">
                                {section.content.map((para, pIdx) => (
                                    <p
                                        key={pIdx}
                                        className="text-gray-600 leading-relaxed font-medium"
                                        dangerouslySetInnerHTML={{ __html: para }}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 bg-[#001F3F] rounded-3xl p-10 text-center">
                    <h3 className="text-2xl font-black text-white mb-3">Questions About Our Terms?</h3>
                    <p className="text-gray-300 font-medium mb-8">We are happy to clarify any points or provide additional information about our policies.</p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-3 bg-[#14C8D4] text-[#001F3F] px-8 py-4 rounded-full font-black text-lg hover:bg-white transition-all duration-300 hover:shadow-xl"
                    >
                        Get In Touch
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </section>
        </main>
    );
}
