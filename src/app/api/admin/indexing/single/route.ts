import { NextResponse } from 'next/server';
import { indexAllPages } from '@/lib/indexing';

/**
 * Admin API to trigger indexing for a specific URL.
 * Called when a specific resource (like a project) is created or updated.
 */
export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ 
        success: false, 
        error: 'URL is required' 
      }, { status: 400 });
    }

    // Trigger indexing for the single URL
    const results = await indexAllPages([url]);
    
    return NextResponse.json({ 
      success: true, 
      message: `Indexing request dispatched for ${url}`,
      results 
    });
  } catch (error: any) {
    console.error('Single Indexing API Route Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Internal Server Error' 
    }, { status: 500 });
  }
}
