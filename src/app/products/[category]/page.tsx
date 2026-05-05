'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CategoriesHero from '@/app/components/Categories/CategoriesHero';
import CategoriesDetails from '@/app/components/Categories/CategoriesDetails';
import SubCategoriesListing from '@/app/components/Categories/SubCategoriesListing';
import InnovationHub from '@/app/components/Categories/InnovationHub';
import Link from 'next/link';

const CategoryPage = () => {
    const params = useParams();
    const [categoryData, setCategoryData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategory = async () => {
            if (params?.category) {
                try {
                    setLoading(true);
                    const response = await fetch(`/api/categories?slug=${params.category}`);
                    const data = await response.json();
                    if (data.success) {
                        setCategoryData(data.data);
                    }
                } catch (error) {
                    console.error('Error fetching category:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchCategory();
    }, [params?.category]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-12 h-12 border-4 border-[#14C8D4] border-t-transparent rounded-full animate-spin"></div>
        </div>;
    }

    if (!categoryData) {
        return (
            <div className="py-40 text-center">
                <h1 className="text-2xl font-bold">Category Not Found</h1>
                <p>Slug: {params?.category}</p>
                <Link href="/products" className="text-blue-500 underline">Back to products</Link>
            </div>
        );
    }

    return (
        <main>
            <CategoriesHero category={categoryData} />
            <CategoriesDetails category={categoryData} />
            <SubCategoriesListing categoryName={categoryData.name} categorySlug={categoryData.slug} />
            <InnovationHub technologies={categoryData.technologies} categoryName={categoryData.name} />
        </main>
    );
};

export default CategoryPage;