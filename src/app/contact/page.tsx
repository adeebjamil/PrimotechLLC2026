import ContactHero from '@/app/components/Contact/ContactHero';
import ConnectOptions from '@/app/components/Contact/ConnectOptions';
import GetInTouchForm from '@/app/components/Contact/GetInTouchForm';
import LocationSection from '@/app/components/Contact/LocationSection';

export default function ContactPage() {
  return (
    <main className="w-full bg-white">
      <ContactHero />
      <ConnectOptions />
      <GetInTouchForm />
      <LocationSection />
    </main>
  );
}
