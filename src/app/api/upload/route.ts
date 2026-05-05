import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { isAuthenticated } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    if (!await isAuthenticated()) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'auto', folder: 'primotech_uploads' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({ 
      success: true, 
      url: (result as any).secure_url 
    }, { status: 200 });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
