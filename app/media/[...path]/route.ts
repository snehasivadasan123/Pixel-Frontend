import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    // Await the params since it is a Promise in recent Next.js versions (though in 14 it might not be, safe to await)
    const { path } = await params;

    if (!path || path.length === 0) {
        return new NextResponse('Not Found', { status: 404 });
    }

    const backendUrl = process.env.API_URL;
    if (!backendUrl) {
        return new NextResponse('API_URL not configured', { status: 500 });
    }

    // Construct the backend URL: e.g. https://ngrok-url/media/wardrobe/file.png
    // The route is /media/[...path], so 'path' contains ['wardrobe', 'file.png']
    const targetUrl = `${backendUrl}/media/${path.join('/')}`;

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'ngrok-skip-browser-warning': 'true',
            },
        });

        if (!response.ok) {
            return new NextResponse(`Failed to fetch image: ${response.statusText}`, { status: response.status });
        }

        const contentType = response.headers.get('Content-Type') || 'application/octet-stream';
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();

        return new NextResponse(arrayBuffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=3600',
            },
        });

    } catch (error) {
        console.error('Error proxying media:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
