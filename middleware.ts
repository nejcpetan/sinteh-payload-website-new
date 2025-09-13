import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale, isValidLocale } from './src/lib/i18n/config'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for:
  // - API routes
  // - Static files (_next/static)
  // - Image optimization (_next/image)
  // - Favicon and other assets
  // - Payload admin routes
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/admin/') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  // Check if pathname already has a valid locale
  const segments = pathname.split('/')
  const potentialLocale = segments[1]

  // If pathname starts with a valid locale, allow it through
  if (potentialLocale && isValidLocale(potentialLocale)) {
    return NextResponse.next()
  }

  // If no locale or invalid locale, redirect to default locale
  const redirectUrl = new URL(`/${defaultLocale}${pathname}`, request.url)
  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - admin (Payload admin)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|admin).*)',
  ],
}
