import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Subscriber from '@/models/Subscriber';
import { isAuthenticated } from '@/lib/auth';

// GET: Fetch all subscribers
export async function GET() {
    try {
        if (!await isAuthenticated()) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        await dbConnect();
        const subscribers = await Subscriber.find({}).sort({ subscribedAt: -1 });
        return NextResponse.json({ success: true, data: subscribers }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// POST: Create a new subscriber
export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        
        // Basic validation
        if (!body.email) {
            return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
        }

        // Check if subscriber already exists
        const existingSubscriber = await Subscriber.findOne({ email: body.email.toLowerCase() });
        if (existingSubscriber) {
            return NextResponse.json({ 
                success: false, 
                message: 'This email is already subscribed' 
            }, { status: 400 });
        }

        const subscriber = await Subscriber.create({
            email: body.email,
            source: body.source || 'footer',
            ip: request.headers.get('x-forwarded-for') || '127.0.0.1',
            status: 'active',
            subscribedAt: new Date()
        });

        return NextResponse.json({ success: true, data: subscriber }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// PATCH: Update subscriber status
export async function PATCH(request: Request) {
    try {
        if (!await isAuthenticated()) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        await dbConnect();
        const body = await request.json();
        const { id, status } = body;

        if (!id || !status) {
            return NextResponse.json({ success: false, message: 'ID and status are required' }, { status: 400 });
        }

        const updatedSubscriber = await Subscriber.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedSubscriber) {
            return NextResponse.json({ success: false, message: 'Subscriber not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedSubscriber }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// DELETE: Remove a subscriber
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

        const deletedSubscriber = await Subscriber.findByIdAndDelete(id);

        if (!deletedSubscriber) {
            return NextResponse.json({ success: false, message: 'Subscriber not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Subscriber deleted successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
