import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface CloudflareEnv {
  DEVFEST_ASSETS: R2Bucket;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const extension = file.type === 'image/jpeg' ? 'jpg' : 'png';
    const filename = `frames/devfest-2025-frame-${timestamp}-${randomId}.${extension}`;

    // Get R2 bucket from Cloudflare environment
    const env = process.env as unknown as CloudflareEnv;
    const bucket = env.DEVFEST_ASSETS;

    if (!bucket) {
      return NextResponse.json(
        { error: 'R2 bucket not configured' },
        { status: 500 }
      );
    }

    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();

    // Upload to R2
    await bucket.put(filename, arrayBuffer, {
      httpMetadata: {
        contentType: file.type,
        cacheControl: 'public, max-age=31536000', // Cache for 1 year
      },
      customMetadata: {
        uploadedAt: new Date().toISOString(),
        source: 'devfest-frame-editor',
      },
    });

    // Generate public URL
    // Note: Replace this with your actual R2 custom domain or public URL pattern
    const publicUrl = `https://devfest-assets.gdgbaroda.com/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
    });

  } catch (error) {
    console.error('Error uploading to R2:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}