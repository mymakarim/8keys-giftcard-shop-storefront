import { NextRequest, NextResponse } from 'next/server'
import { p100Service } from '@/lib/p100'
import type { P100WebhookPayload } from '@/lib/p100'

export async function POST(request: NextRequest) {
  try {
    // Get the raw body and signature
    const body = await request.text()
    const signature = request.headers.get('x-p100-signature')

    if (!signature) {
      console.error('Missing P100 signature header')
      return NextResponse.json(
        { error: 'Missing signature header' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    const isValid = p100Service.verifyWebhook(body, signature)
    if (!isValid) {
      console.error('Invalid P100 webhook signature')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    // Parse the webhook payload
    const payload: P100WebhookPayload = JSON.parse(body)

    console.log('Received P100 webhook:', {
      event: payload.event,
      paymentId: payload.data.id,
      status: payload.data.status,
      amount: payload.data.amount,
      currency: payload.data.currency,
    })

    // Process the webhook
    await p100Service.processWebhook(payload)

    // Log successful processing
    console.log('P100 webhook processed successfully:', payload.event)

    return NextResponse.json(
      { success: true, message: 'Webhook processed successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing P100 webhook:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
} 