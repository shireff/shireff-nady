import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/settings.json');

export async function GET() {
  try {
    if (!fs.existsSync(dataPath)) {
      return NextResponse.json({ heroImageUrl: null });
    }
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    return NextResponse.json({ heroImageUrl: data.heroImageUrl });
  } catch (error) {
    console.error('Error reading home image:', error);
    return NextResponse.json({ heroImageUrl: null });
  }
}
