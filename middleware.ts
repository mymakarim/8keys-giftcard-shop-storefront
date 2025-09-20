import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of protected routes that require authentication
const protectedRoutes = [
  '/checkout',
  '/orders',
  '/profile',
  '/settings',
  '/history',
  '/wallet'
]

// Check if JWT token is expired
function isTokenExpired(token: string): boolean {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    const { exp } = JSON.parse(jsonPayload)
    return Date.now() >= exp * 1000
  } catch {
    return true
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (isProtectedRoute) {
    // Check for authentication token
    const token = request.cookies.get('_medusa_jwt')?.value
    
    if (!token || isTokenExpired(token)) {
      // Redirect to auth page with return URL
      const authUrl = new URL('/auth', request.url)
      authUrl.searchParams.set('redirect', pathname)
      
      console.log(`Middleware: Redirecting unauthenticated user from ${pathname} to auth page`)
      return NextResponse.redirect(authUrl)
    }
    
    console.log(`Middleware: Allowing authenticated access to ${pathname}`)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
} 