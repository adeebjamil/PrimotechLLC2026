import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import Enquiry from '@/models/Enquiry';
import Subscriber from '@/models/Subscriber';
import Contact from '@/models/Contact';
import Category from '@/models/Category';
import SubCategory from '@/models/SubCategory';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
    try {
        if (!await isAuthenticated()) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        await dbConnect();

        const [
            productCount,
            enquiryCount,
            subscriberCount,
            contactCount,
            categoryCount,
            subCategoryCount
        ] = await Promise.all([
            Product.countDocuments(),
            Enquiry.countDocuments(),
            Subscriber.countDocuments(),
            Contact.countDocuments(),
            Category.countDocuments(),
            SubCategory.countDocuments()
        ]);

        return NextResponse.json({
            success: true,
            data: {
                products: productCount,
                enquiries: enquiryCount,
                subscribers: subscriberCount,
                contacts: contactCount,
                categories: categoryCount,
                subcategories: subCategoryCount
            }
        });
    } catch (error: any) {
        console.error('Stats API Error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch stats' },
            { status: 500 }
        );
    }
}
