import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const externalUserId = searchParams.get('externalUserId')
  if (!externalUserId) {
    return NextResponse.json({ error: 'Missing externalUserId' }, { status: 400 })
  }
  const apiKey = process.env.P100_API_KEY // Or use a server-only env var
  const apiUrl = `https://partner-api-stage.p100.io/v1/user/${externalUserId}/balances`
  try {
    const res = await fetch(apiUrl, {
      headers: {
        'x-api-key': apiKey || '',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch from P100', details: err?.message || err }, { status: 500 })
  }
} 