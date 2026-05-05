'use client';

const toc = [
    { num: 'I', label: 'Scope Of Information Collection' },
    { num: 'II', label: 'Methods Of Information Collection' },
    { num: 'III', label: 'Use Of Information' },
    { num: 'IV', label: 'Sharing Of Information' },
    { num: 'V', label: 'Storage And Protection Of Information' },
    { num: 'VI', label: 'Your Rights' },
    { num: 'VII', label: 'Third Party Services' },
    { num: 'VIII', label: 'Transfer Of Personal Information Outside Of Your Jurisdiction' },
    { num: 'IX', label: 'Privacy Of Minors' },
    { num: 'X', label: 'Use Of Cookies' },
    { num: 'XI', label: 'Contact Us' },
    { num: 'XII', label: 'Revision Of Privacy Policy' },
];

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Banner */}
            <section className="bg-[#001F3F] pt-36 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#14C8D4]/10 rounded-full blur-[120px] -mr-64 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#14C8D4]/10 rounded-full blur-[100px] -ml-32 -mb-32" />
                </div>
                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-[#14C8D4]/10 border border-[#14C8D4]/30 text-[#14C8D4] px-5 py-2 rounded-full text-sm font-bold tracking-widest uppercase mb-8">
                        Legal
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        Privacy <span className="text-[#14C8D4]">Policy</span>
                    </h1>
                    <p className="text-gray-300 text-lg font-medium max-w-2xl mx-auto">
                        Protecting your personal data and privacy is our highest priority.
                    </p>
                    <p className="mt-6 text-gray-400 text-sm font-semibold">
                        Effective Date: <span className="text-[#14C8D4]">July 2, 2025</span>
                        &nbsp;|&nbsp;
                        Last Updated: <span className="text-[#14C8D4]">July 2, 2025</span>
                    </p>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-6 py-20">

                {/* Introduction */}
                <div className="mb-14">
                    <h2 className="text-2xl font-black text-[#001F3F] mb-5">Introduction</h2>
                    <div className="space-y-4 text-gray-600 leading-relaxed font-medium">
                        <p>
                            At <strong className="text-[#001F3F]">PrimoTech LLC</strong> (&quot;PrimoTech&quot; or &quot;we/us&quot;), protecting your personal data and privacy remains our highest priority. This Privacy Policy, effective as of <strong className="text-[#001F3F]">July 2, 2025</strong>, explains how we collect, use, share, store, and safeguard your information. By reviewing this document, you will understand our data handling practices as they relate to the PrimoTech products and services you use.
                        </p>
                        <p>
                            We encourage you to read and understand this Privacy Policy before using any PrimoTech services. Your continued use of our services after July 2, 2025, indicates your acceptance of the practices described herein. If you disagree with any part of this policy, please discontinue use of PrimoTech products and services immediately.
                        </p>
                        <p>
                            This Privacy Policy applies to information collected through our website, electronic communications between you and our platform, and mobile or desktop applications downloaded from our site. By accessing our website after July 2, 2025, you consent to our processing of your personal data as outlined in this policy.
                        </p>
                        <p>
                            If you have any questions or feedback regarding this Privacy Policy or your personal data, please contact us at{' '}
                            <a href="mailto:sales@primotech-llc.com" className="text-[#14C8D4] hover:underline font-bold">sales@primotech-llc.com</a>.
                        </p>
                    </div>
                </div>

                {/* Table of Contents */}
                <div className="bg-[#f8fafc] border border-gray-100 rounded-3xl p-8 mb-16">
                    <h3 className="text-[#001F3F] font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-3">
                        <span className="w-8 h-[2px] bg-[#14C8D4]" />
                        This Policy Will Help You Understand The Following
                    </h3>
                    <ol className="space-y-3">
                        {toc.map((item) => (
                            <li key={item.num}>
                                <a
                                    href={`#section-${item.num}`}
                                    className="flex items-center gap-3 text-gray-600 hover:text-[#001F3F] font-semibold transition-colors group"
                                >
                                    <span className="w-8 h-8 rounded-lg bg-[#001F3F] text-[#14C8D4] text-xs font-black flex items-center justify-center flex-shrink-0 group-hover:bg-[#14C8D4] group-hover:text-[#001F3F] transition-colors">
                                        {item.num}
                                    </span>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Sections */}
                <div className="space-y-16">

                    {/* I */}
                    <section id="section-I">
                        <SectionTitle num="I" title="Scope Of Information Collection" />
                        <div className="space-y-4 text-gray-600 leading-relaxed font-medium">
                            <p>As of July 2, 2025, when you interact with PrimoTech services, we may collect both personal and non-personal information.</p>
                            <p>
                                <strong className="text-[#001F3F]">Personal information</strong> means any data relating to an identifiable individual that could reveal their identity when combined with other details. This includes, but is not limited to, names, gender, identification numbers, birthdates, addresses, phone numbers, email addresses, mailing addresses, and personal video content.
                            </p>
                            <p>
                                <strong className="text-[#001F3F]">Non-personal information</strong> refers to data that cannot directly identify a specific individual. Examples include professional details, language preferences, postal codes, area codes, serial numbers, URLs, automatically logged access data (browser type, domain, browsing patterns, referring pages, IP addresses, navigation paths), unique product identifiers, video content without personal elements, device connection location and time zone, geographic location, mobile carrier identification, device software platforms, and hardware details.
                            </p>
                        </div>
                    </section>

                    {/* II */}
                    <section id="section-II">
                        <SectionTitle num="II" title="Methods Of Information Collection" />
                        <div className="space-y-6 text-gray-600 leading-relaxed font-medium">
                            <SubHeading text="(I) PrimoTech Collects Your Personal Information Through The Following Methods:" />

                            <SubSection num="2.1" title="Account creation and product activation">
                                When you create an account or register for PrimoTech services after July 2, 2025, you agree to provide personal details. We collect usernames, passwords, email addresses, and mobile numbers to comply with legal requirements. When activating products that require PrimoTech service connection and account linking, we may request product names, verification codes, and serial numbers. Refusing to provide this information may prevent you from using our services as intended.
                            </SubSection>

                            <SubSection num="2.2" title="Application login">
                                We collect device type, user ID, device count, login method, app usage time, concurrent live view count, device model, OS version, and network info.
                            </SubSection>

                            <SubSection num="2.3" title="Video saving">
                                If you choose to save video clips, live streams, images, or alerts, we collect screenshots from your camera and deliver them to you. You may disable this in your account settings.
                            </SubSection>

                            <SubSection num="2.4" title="Message alerts">
                                We may collect unique device identifiers to send accurate notifications. You can disable this feature and clear the identifier at any time.
                            </SubSection>

                            <SubSection num="2.5" title="Device addition">
                                We may collect device serial numbers, registration codes, passwords, models, and Wi-Fi info for network setup and device binding.
                            </SubSection>

                            <SubSection num="2.6" title="Device access service">
                                To ensure proper operation, we collect device model, unique ID, IP address, MAC address, software version, network access type, location data (if supported), and operation logs.
                            </SubSection>

                            <SubSection num="2.7" title="Other scenarios">
                                <ul className="mt-2 space-y-2 pl-2">
                                    {[
                                        'Real-time preview (device serial, IP, port, video stream info)',
                                        'Analysis/comparison (face, human, license plate, vehicle, fingerprint data)',
                                        'Device sharing (serial, nickname, shared user info)',
                                        'Device control (serial, status, operation data)',
                                        'Customer support (contact info, device details, account verification)',
                                        'Security monitoring at PrimoTech device locations',
                                        'Job applications via our website (resume info)',
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="mt-1.5 w-2 h-2 rounded-full bg-[#14C8D4] flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </SubSection>

                            <SubHeading text="(II) Non-personal information collection:" />

                            <SubSection num="2.8" title="Service usage analysis">
                                We collect non-personal data using industry-standard methods to improve user experience, prevent misuse, and ensure service reliability. This includes cookies, web beacons, pixel tags, and similar technologies for settings, advertising, and log/device data collection.
                            </SubSection>

                            <SubSection num="2.9" title="User content processing">
                                When you use recording or streaming features, we may record and transmit video/audio with your consent, including screenshots and data for identification.
                            </SubSection>
                        </div>
                    </section>

                    {/* III */}
                    <section id="section-III">
                        <SectionTitle num="III" title="Use Of Information" />
                        <div className="space-y-3 text-gray-600 leading-relaxed font-medium">
                            <p>As of July 2, 2025, PrimoTech may use your personal information for the following purposes:</p>
                            <ul className="space-y-2 pl-2">
                                {[
                                    'Responding to your requests and providing customer support',
                                    'Processing job applications',
                                    'Enhancing website security (identity verification, fraud detection, data backup)',
                                    'Conducting audits, data analysis, and research',
                                    'Sending updates about products and services (with your consent)',
                                    'Improving user experience and service design (with your consent)',
                                    'Complying with legal obligations and protecting our interests',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="mt-1.5 w-2 h-2 rounded-full bg-[#14C8D4] flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* IV */}
                    <section id="section-IV">
                        <SectionTitle num="IV" title="Sharing Of Information" />
                        <div className="space-y-4 text-gray-600 leading-relaxed font-medium">
                            <div className="bg-[#001F3F]/5 border-l-4 border-[#14C8D4] rounded-xl p-5">
                                <p className="font-black text-[#001F3F]">We do not sell your personal information to third parties and never will.</p>
                            </div>
                            <p>Access to your personal data is limited to those who need it, and our staff are required to maintain confidentiality and protect your information as described in this policy.</p>
                            <p>We may share your personal information in these cases:</p>
                            <ul className="space-y-2 pl-2">
                                {[
                                    'With PrimoTech affiliates as needed to fulfill the purposes described in this policy',
                                    'With authorized partners to improve customer service and experience (e.g., SMS providers, device manufacturers, cloud service providers)',
                                    'When you choose to share videos, identity, or location data with others',
                                    'To comply with laws and provide better service',
                                    'When required by law (e.g., national security, public safety, investigations, emergencies, legal proceedings)',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="mt-1.5 w-2 h-2 rounded-full bg-[#14C8D4] flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* V */}
                    <section id="section-V">
                        <SectionTitle num="V" title="Storage And Protection Of Information" />
                        <div className="space-y-6 text-gray-600 leading-relaxed font-medium">
                            <SubHeading text="(I) Storage duration and location" />
                            <p>Your personal data is stored only for the purposes described in this policy and retained as long as you use our services, unless a longer period is required by law or you authorize it.</p>

                            <SubHeading text="(II) Data protection" />
                            <p>We maintain a dedicated security team and implement administrative, technical, and physical safeguards, including encryption, access controls, internal audits, and regular security assessments. We hold <strong className="text-[#001F3F]">ISO27001 certification</strong> and use third-party security evaluations. However, no system is completely secure, and we cannot guarantee absolute protection.</p>
                            <p>You are responsible for keeping your login credentials confidential. In the event of a security incident, we will notify you via push notification or announcement.</p>
                        </div>
                    </section>

                    {/* VI */}
                    <section id="section-VI">
                        <SectionTitle num="VI" title="Your Rights" />
                        <div className="space-y-4 text-gray-600 leading-relaxed font-medium">
                            <p>As of July 2, 2025, you may access and update your personal information through your account or by contacting <a href="mailto:sales@primotech-llc.com" className="text-[#14C8D4] hover:underline font-bold">sales@primotech-llc.com</a>. Subject to applicable law, you have the right to:</p>
                            <ul className="space-y-2 pl-2">
                                {[
                                    'Access or correct your personal data',
                                    'Delete your personal data',
                                    'Change or withdraw consent',
                                    'Close your account',
                                    'Request copies of your data',
                                    'Opt out of direct marketing and cookies',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="mt-1.5 w-2 h-2 rounded-full bg-[#14C8D4] flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p>If you are an EU resident, you may also have rights to consent, access, rectification, data portability, and erasure. You may contact data protection authorities if you have concerns about our practices.</p>
                        </div>
                    </section>

                    {/* VII */}
                    <section id="section-VII">
                        <SectionTitle num="VII" title="Third Party Services" />
                        <div className="space-y-4 text-gray-600 leading-relaxed font-medium">
                            <p>Our services may link to or use third-party websites or features, including:</p>
                            <ul className="space-y-2 pl-2">
                                {[
                                    'Social sharing buttons that may collect data',
                                    'Third-party SDKs for notifications, location, security, and encryption',
                                    'Partner services for enhanced features',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="mt-1.5 w-2 h-2 rounded-full bg-[#14C8D4] flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p>We share information only for legitimate, necessary, and specific purposes. Third-party providers must maintain confidentiality and security. This policy does not cover third-party cookies or data practices.</p>
                        </div>
                    </section>

                    {/* VIII */}
                    <section id="section-VIII">
                        <SectionTitle num="VIII" title="Transfer Of Personal Information Outside Of Your Jurisdiction" />
                        <div className="space-y-4 text-gray-600 leading-relaxed font-medium">
                            <p>If your personal data is transferred outside your jurisdiction after July 2, 2025, we comply with all applicable laws. For EU data, we use standard contractual clauses or other GDPR safeguards. As a global company, we may transfer data to PrimoTech subsidiaries or third-party providers worldwide, always maintaining appropriate protections.</p>
                        </div>
                    </section>

                    {/* IX */}
                    <section id="section-IX">
                        <SectionTitle num="IX" title="Privacy Of Minors" />
                        <div className="space-y-4 text-gray-600 leading-relaxed font-medium">
                            <p>We do not offer services to individuals under 18 (or the minimum age in your jurisdiction). Accounts registered by minors will be deleted, and any data collected from minors without parental consent will be removed. Parents or guardians may contact us to review, delete, or restrict their child&apos;s data.</p>
                        </div>
                    </section>

                    {/* X */}
                    <section id="section-X">
                        <SectionTitle num="X" title="Use Of Cookies" />
                        <div className="space-y-4 text-gray-600 leading-relaxed font-medium">
                            <p>We use cookies and similar technologies to remember preferences, improve advertising, and collect non-identifying information. This helps us understand usage, diagnose issues, and enhance our services. You can configure your browser to reject cookies.</p>
                        </div>
                    </section>

                    {/* XI */}
                    <section id="section-XI">
                        <SectionTitle num="XI" title="Contact Us" />
                        <div className="space-y-4 text-gray-600 leading-relaxed font-medium">
                            <p>For any questions or comments about this Privacy Policy or your personal data, contact us at <a href="mailto:sales@primotech-llc.com" className="text-[#14C8D4] hover:underline font-bold">sales@primotech-llc.com</a>. We will respond within <strong className="text-[#001F3F]">15 business days</strong> after verifying your identity.</p>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <a href="mailto:sales@primotech-llc.com" className="flex items-center gap-4 p-5 bg-[#f8fafc] rounded-2xl border border-gray-100 hover:border-[#14C8D4] transition-colors group">
                                    <div className="w-11 h-11 bg-[#001F3F] rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-[#14C8D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Email</p>
                                        <p className="text-[#001F3F] font-bold text-sm">sales@primotech-llc.com</p>
                                    </div>
                                </a>
                                <a href="tel:+971528796664" className="flex items-center gap-4 p-5 bg-[#f8fafc] rounded-2xl border border-gray-100 hover:border-[#14C8D4] transition-colors group">
                                    <div className="w-11 h-11 bg-[#001F3F] rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-[#14C8D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Phone</p>
                                        <p className="text-[#001F3F] font-bold text-sm">+971 52 879 6664</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* XII */}
                    <section id="section-XII">
                        <SectionTitle num="XII" title="Revision Of Privacy Policy" />
                        <div className="space-y-4 text-gray-600 leading-relaxed font-medium">
                            <p>This Privacy Policy is effective as of July 2, 2025. We may update this policy from time to time, and any changes will become part of this document. When updates occur, we will notify you via push notifications or pop-ups at login. We will only collect, use, or store your personal data under the revised policy after you accept the changes.</p>
                        </div>
                    </section>

                </div>

                {/* Last Updated Footer */}
                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm font-semibold">
                        Last Updated: <span className="text-[#001F3F]">July 02, 2025</span>
                    </p>
                    <a href="/terms" className="text-sm font-bold text-[#14C8D4] hover:underline">
                        View Terms of Service →
                    </a>
                </div>

                {/* CTA */}
                <div className="mt-10 bg-[#001F3F] rounded-3xl p-10 text-center">
                    <h3 className="text-2xl font-black text-white mb-3">Have Questions?</h3>
                    <p className="text-gray-300 font-medium mb-8">Our team is ready to help clarify any concerns about your data privacy.</p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-3 bg-[#14C8D4] text-[#001F3F] px-8 py-4 rounded-full font-black text-lg hover:bg-white transition-all duration-300 hover:shadow-xl"
                    >
                        Contact Us
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </section>
        </main>
    );
}

/* ── Reusable sub-components ─────────────────────────────────── */

function SectionTitle({ num, title }: { num: string; title: string }) {
    return (
        <div className="flex items-center gap-4 mb-6">
            <div className="w-11 h-11 bg-[#001F3F] rounded-xl flex items-center justify-center text-[#14C8D4] font-black text-xs flex-shrink-0">
                {num}
            </div>
            <h2 className="text-xl md:text-2xl font-black text-[#001F3F]">{title}</h2>
        </div>
    );
}

function SubHeading({ text }: { text: string }) {
    return (
        <p className="font-black text-[#001F3F] text-[15px] mt-4">{text}</p>
    );
}

function SubSection({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
    return (
        <div className="pl-4 border-l-2 border-[#14C8D4]/40">
            <p className="font-black text-[#001F3F] mb-1">
                {num}. {title}
            </p>
            <div className="text-gray-600">{children}</div>
        </div>
    );
}
