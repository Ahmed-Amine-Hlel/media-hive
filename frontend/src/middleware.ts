import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'token';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  const authToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!authToken && pathname !== '/signin') {
    url.pathname = '/signin';
    return NextResponse.redirect(url);
  }

  if (authToken && pathname === '/signin') {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  if (authToken && pathname === '/') {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard', '/signin'],
};
