import { NextResponse } from 'next/server';
import { verifyJwtToken } from '@/lib/auth';

export async function GET(request: Request) {
  const token = request.headers.get('cookie')
    ?.split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith('exampeakai-token='))
    ?.split('=')[1];

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = verifyJwtToken(token);
    return NextResponse.json({ user: payload });
  } catch (error) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
