import { NextResponse } from 'next/server'
import { getCustomerFromToken } from '../../../lib/auth-server'

export async function GET() {
  const user = await getCustomerFromToken()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }
  return NextResponse.json(user)
} 