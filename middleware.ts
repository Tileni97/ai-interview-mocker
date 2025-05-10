import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from './firebase/admin';

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value || '';
  
  // If there's no session cookie, redirect to login
  if (!sessionCookie) {
    return redirectToLogin(request);
  }

  try {
    // Verify the session cookie
    await adminAuth.verifySessionCookie(sessionCookie, true);
    return NextResponse.next();
  } catch (error) {
    // Session cookie is invalid or expired
    return redirectToLogin(request);
  }
}

function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = '/login';
  url.searchParams.set('from', request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

// Add the paths that should be protected
export const config = {
  matcher: [
    // Protected routes that require authentication
    '/dashboard/:path*',
    '/profile/:path*',
    // Add other protected routes as needed
  ],
};