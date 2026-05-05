import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Contact from '@/models/Contact';
import { isAuthenticated } from '@/lib/auth';

// GET: Fetch all contact submissions
export async function GET() {
    try {
        if (!await isAuthenticated()) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        await dbConnect();
        const submissions = await Contact.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: submissions }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// POST: Create a new contact submission
export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        
        const submission = await Contact.create(body);

        return NextResponse.json({ success: true, data: submission }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// PATCH: Update submission status
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

        const updatedSubmission = await Contact.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedSubmission) {
            return NextResponse.json({ success: false, message: 'Submission not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedSubmission }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

// DELETE: Remove a submission
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

        const deletedSubmission = await Contact.findByIdAndDelete(id);

        if (!deletedSubmission) {
            return NextResponse.json({ success: false, message: 'Submission not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Submission deleted successfully' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
