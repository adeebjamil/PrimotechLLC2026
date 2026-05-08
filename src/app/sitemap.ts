import { MetadataRoute } from 'next';
import dbConnect from '@/lib/dbConnect';
import Category from '@/models/Category';
import SubCategory from '@/models/SubCategory';
import Product from '@/models/Product';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://primotech-llc.com';
  
  await dbConnect();
  const categories = await Category.find({ status: 'published' });
  const subcategories = await SubCategory.find({ status: 'published' });
  const products = await Product.find({ status: 'published' });

  const slugify = (text: string) => 
    text.toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/products',
    '/support',
    '/support/faq',
    '/partner',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const categoryRoutes = categories.map((cat) => ({
    url: `${baseUrl}/products/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const subcategoryRoutes = subcategories.map((sub) => {
    const parentSlug = slugify(sub.parentCategory);
    return {
      url: `${baseUrl}/products/${parentSlug}/${sub.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    };
  });

  const productRoutes = products.map((prod) => {
    const categorySlug = slugify(prod.category);
    const subcategorySlug = slugify(prod.subCategory);
    return {
      url: `${baseUrl}/products/${categorySlug}/${subcategorySlug}/${prod.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    };
  });

  return [...staticRoutes, ...categoryRoutes, ...subcategoryRoutes, ...productRoutes];
}
