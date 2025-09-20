import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const cookieStore = cookies()
    
    // Clear the JWT token cookie
    cookieStore.delete('_medusa_jwt')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error clearing auth token:', error)
    return NextResponse.json({ error: 'Failed to clear token' }, { status: 500 })
  }
} 