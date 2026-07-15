import { NextRequest, NextResponse } from 'next/server';
import { verifyJwtToken } from '@/lib/auth';

const protectedPaths = ['/dashboard', '/question-bank', '/exam-interface', '/analytics', '/leaderboard', '/study-groups'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const token = request.cookies.get('exampeakai-token')?.value;
    if (!token) {
      const loginUrl = new URL('/sign-up-login-screen', request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      verifyJwtToken(token);
      return NextResponse.next();
    } catch (error) {
      const loginUrl = new URL('/sign-up-login-screen', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/question-bank/:path*', '/exam-interface/:path*', '/analytics/:path*', '/leaderboard/:path*', '/study-groups/:path*'],
};
