'use client';

import CategoriesHero from '@/app/components/Categories/CategoriesHero';
import CategoriesDetails from '@/app/components/Categories/CategoriesDetails';
import SubCategoriesListing from '@/app/components/Categories/SubCategoriesListing';
import InnovationHub from '@/app/components/Categories/InnovationHub';

const CategoryContent = ({ categoryData, initialSubcategories }: { categoryData: any, initialSubcategories: any[] }) => {
    return (
        <main>
            <CategoriesHero category={categoryData} />
            <CategoriesDetails category={categoryData} />
            <SubCategoriesListing 
                categoryName={categoryData.name} 
                categorySlug={categoryData.slug} 
                initialSubcategories={initialSubcategories}
            />
            <InnovationHub technologies={categoryData.technologies} categoryName={categoryData.name} />
        </main>
    );
};

export default CategoryContent;
