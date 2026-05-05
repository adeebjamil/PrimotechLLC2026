import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import SubCategory from '@/models/SubCategory';
import { isAuthenticated } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const parentCategory = searchParams.get('parentCategory');

    let query = {};
    if (parentCategory) {
      query = { parentCategory };
    }

    const subcategories = await SubCategory.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: subcategories });
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
    const subcategory = await SubCategory.create(body);
    return NextResponse.json({ success: true, data: subcategory }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
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

    const subcategory = await SubCategory.findByIdAndUpdate(id, updateData, { new: true });
    if (!subcategory) {
      return NextResponse.json({ success: false, message: 'SubCategory not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: subcategory });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
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

    const subcategory = await SubCategory.findByIdAndDelete(id);
    if (!subcategory) {
      return NextResponse.json({ success: false, message: 'SubCategory not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'SubCategory deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
