import Hero from '@/app/components/Home/Hero';
import LatestProducts from '@/app/components/Home/LatestProducts';
import ProductSeriesShowcase from '@/app/components/Home/ProductSeriesShowcase';
import IndustryRecognition from '@/app/components/Home/IndustryRecognition';
import FAQ from '@/app/components/Home/FAQ';
import HomeContact from '@/app/components/Home/HomeContact';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export default async function Home() {
  await dbConnect();
  const products = await Product.find({ status: 'published' }).sort({ createdAt: -1 }).limit(10).lean();

  return (
    <main>
      <h1 className="sr-only">PrimoTech LLC | Leading CCTV & Security Solutions Supplier in the Middle East</h1>
      <Hero />
      <LatestProducts initialProducts={JSON.parse(JSON.stringify(products))} />
      <ProductSeriesShowcase />
      <IndustryRecognition />
      <FAQ />
      <HomeContact />
    </main>
  );
}