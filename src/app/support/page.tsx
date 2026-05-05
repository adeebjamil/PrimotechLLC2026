import { SupportSection } from '@/app/components/Support/SupportSection';
import { FaqVideoSection } from '@/app/components/Support/FaqVideoSection';
import { ContactCTA } from '@/app/components/Support/ContactCTA';

export default function SupportPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Support Hero Section */}
            <SupportSection />

            {/* FAQ & Video Support Section */}
            <FaqVideoSection />

            {/* Contact CTA Section */}
            <ContactCTA />
        </main>
    );
}
