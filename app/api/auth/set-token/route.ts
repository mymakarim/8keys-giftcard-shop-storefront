import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()
    
    if (!token) {
      console.log('setToken: No token provided in request')
      return NextResponse.json({ error: 'Token is required' }, { status: 400 })
    }

    console.log('setToken: Setting token in cookie, length:', token.length)
    const cookieStore = cookies()
    
    // Get the host from the request for domain setting
    const host = request.headers.get('host')
    const isProduction = process.env.NODE_ENV === 'production'
    const isHTTPS = request.headers.get('x-forwarded-proto') === 'https' || 
                   request.url.startsWith('https') || 
                   isProduction
    
    console.log('setToken: Environment:', { 
      host, 
      isProduction, 
      isHTTPS,
      nodeEnv: process.env.NODE_ENV,
      forwardedProto: request.headers.get('x-forwarded-proto')
    })
    
    // Set httpOnly cookie with production-friendly settings
    const cookieOptions = {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      sameSite: 'lax' as const, // Changed from 'strict' to 'lax' for better compatibility
      secure: isHTTPS, // Use HTTPS detection instead of just NODE_ENV
      path: '/',
      // Don't set domain for localhost, but allow it for production
      ...(host && !host.includes('localhost') && !host.includes('127.0.0.1') ? { domain: `.${host.split(':')[0]}` } : {})
    }
    
    console.log('setToken: Cookie options:', cookieOptions)
    
    cookieStore.set('_medusa_jwt', token, cookieOptions)
    
    console.log('setToken: Cookie set successfully')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error setting auth token:', error)
    return NextResponse.json({ error: 'Failed to set token' }, { status: 500 })
  }
} 