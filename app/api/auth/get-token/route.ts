import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('_medusa_jwt')?.value
    
    // Debug logging
    const allCookies = cookieStore.getAll()
    const cookieNames = allCookies.map(c => c.name)
    
    console.log('getToken: All cookie names:', cookieNames)
    console.log('getToken: Looking for _medusa_jwt')
    console.log('getToken: Token found:', !!token)
    console.log('getToken: Token length:', token?.length || 0)
    
    if (token) {
      console.log('getToken: Token preview:', token.substring(0, 20) + '...')
    }
    
    // Also check if token exists under a different name (debugging)
    const medusaTokenVariants = allCookies.filter(c => 
      c.name.includes('medusa') || c.name.includes('jwt') || c.name.includes('token')
    )
    
    if (medusaTokenVariants.length > 0) {
      console.log('getToken: Found potential token cookies:', medusaTokenVariants.map(c => ({
        name: c.name,
        hasValue: !!c.value,
        valueLength: c.value?.length || 0
      })))
    }
    
    console.log('getToken: Token received:', token)
    return NextResponse.json({ 
      token: token || null,
      debug: {
        allCookieNames: cookieNames,
        medusaTokenVariants: medusaTokenVariants.map(c => c.name),
        tokenFound: !!token
      }
    })
  } catch (error) {
    console.error('Error getting auth token:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return NextResponse.json({ 
      token: null,
      error: errorMessage 
    })
  }
} 