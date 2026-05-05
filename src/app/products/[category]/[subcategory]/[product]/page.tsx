'use client';

import { useParams } from 'next/navigation';
import ProductDetail from '@/app/components/Products/ProductDetail';

const ProductPage = () => {
    return (
        <main className="bg-white min-h-screen">
            <ProductDetail />
        </main>
    );
};

export default ProductPage;
