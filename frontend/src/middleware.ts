import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

const AUTH_COOKIE_NAME = 'token';

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const {pathname} = url;

    const authToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;

    // Redirect unauthenticated users to /signin
    if (!authToken && pathname !== '/signin') {
        url.pathname = '/signin';
        return NextResponse.redirect(url);
    }

    // Redirect authenticated users trying to access /signin to /dashboard
    if (authToken && pathname === '/signin') {
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }

    // Redirect authenticated users accessing `/` to `/dashboard`
    if (authToken && pathname === '/') {
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard', '/signin'], // Include both / and /dashboard in the matcher
};
