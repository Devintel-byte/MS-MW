import { NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';

const utapi = new UTApi();

export async function POST(request: Request) {
  try {
    const { image } = await request.json();
    
    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    // Convert base64 to blob
    const base64Data = image.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    const file = new File([buffer], `memory-${Date.now()}.jpg`, {
      type: 'image/jpeg',
    });

    // Upload to UploadThing
    const response = await utapi.uploadFiles(file);
    
    if (!response.data?.url) {
      throw new Error('Upload failed');
    }

    return NextResponse.json({ imageUrl: response.data.url });
    
  } catch (error) {
    console.error('[UPLOAD_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}