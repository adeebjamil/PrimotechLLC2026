import ProductsHero from '@/app/components/Products/ProductsHero';
import CategoriesListing from '@/app/components/Categories/CategoriesListing';
import ProductsCTA from '@/app/components/Products/ProductsCTA';
import { FaChevronRight, FaHome } from 'react-icons/fa';
import Link from 'next/link';

const Products = () => {
    return (
        <>
            <ProductsHero />
            <CategoriesListing />
            <ProductsCTA />
        </>
    );
};

export default Products;