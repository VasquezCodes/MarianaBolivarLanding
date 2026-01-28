import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
        return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    if (!request.body) {
        return NextResponse.json({ error: 'File body is required' }, { status: 400 });
    }

    // ⚠️ Vercel Blob has a 4.5MB limit for server-side uploads.
    // Ideally, large files should use client-side uploads, but for simplicity
    // and per user request, we are using this first.

    try {
        const blob = await put(filename, request.body, {
            access: 'public',
            addRandomSuffix: true,
        });

        return NextResponse.json(blob);
    } catch (error) {
        console.error("Error uploading to Blob:", error);
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}
