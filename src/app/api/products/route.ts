import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import { isAuthenticated } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    const category = searchParams.get('category');

    if (id) {
      const product = await Product.findById(id);
      if (!product) {
        return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: product });
    }

    if (slug) {
      const product = await Product.findOne({ slug });
      if (!product) {
        return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: product });
    }

    const filter: any = {};
    if (category) {
      filter.category = category;
    }
    const subCategory = searchParams.get('subCategory');
    if (subCategory) {
      filter.subCategory = subCategory;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!await isAuthenticated()) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    await dbConnect();
    const body = await request.json();
    const product = await Product.create(body);
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    if (!await isAuthenticated()) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    await dbConnect();
    const body = await request.json();
    const { id, ...updateData } = body;

    const product = await Product.findByIdAndUpdate(id, updateData, { returnDocument: 'after' });
    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!await isAuthenticated()) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
