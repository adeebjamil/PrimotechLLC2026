import Hero from '@/app/components/Home/Hero';
import LatestProducts from '@/app/components/Home/LatestProducts';
import ProductSeriesShowcase from '@/app/components/Home/ProductSeriesShowcase';
import IndustryRecognition from '@/app/components/Home/IndustryRecognition';
import FAQ from '@/app/components/Home/FAQ';
import HomeContact from '@/app/components/Home/HomeContact';
import FeaturedProducts from '@/app/components/Home/FeaturedProducts';
import CategorySection from '@/app/components/Home/CategorySection';
import WhyChooseUs from '@/app/components/Home/WhyChooseUs';

export default function Home() {
  return (
    <main>
      <Hero />
      <LatestProducts />
      <ProductSeriesShowcase />
      <IndustryRecognition />
      <FAQ />
      <HomeContact />
    </main>
  );
}