import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const apiKey = process.env.P100_API_KEY // Or use a server-only env var
  const apiUrl = 'https://partner-api-stage.p100.io/v1/user/balances/crypto-and-fiat'
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey || '',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to register with P100', details: err?.message || err }, { status: 500 })
  }
} 