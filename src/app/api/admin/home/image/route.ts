import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/settings.json');

export async function PUT(request: Request) {
  try {
    // Basic auth check - in a real app, verify the JWT
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { heroImageUrl } = body;

    if (!heroImageUrl || typeof heroImageUrl !== 'string') {
      return NextResponse.json({ error: 'Invalid image URL' }, { status: 400 });
    }

    const settings = {
      heroImageUrl: heroImageUrl.trim(),
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(dataPath, JSON.stringify(settings, null, 2));

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating home image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
