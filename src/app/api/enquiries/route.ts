import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Enquiry from '@/models/Enquiry';
import { isAuthenticated } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    if (!await isAuthenticated()) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const enquiry = await Enquiry.findById(id);
      if (!enquiry) {
        return NextResponse.json({ success: false, message: 'Enquiry not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: enquiry });
    }

    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: enquiries });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Automatically set priority based on message length or type if not provided
    if (!body.priority) {
      body.priority = body.type === 'quote' ? 'high' : 'medium';
    }

    const enquiry = await Enquiry.create(body);
    return NextResponse.json({ success: true, data: enquiry }, { status: 201 });
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

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(id, updateData, { new: true });
    if (!enquiry) {
      return NextResponse.json({ success: false, message: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: enquiry });
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

    const enquiry = await Enquiry.findByIdAndDelete(id);
    if (!enquiry) {
      return NextResponse.json({ success: false, message: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
