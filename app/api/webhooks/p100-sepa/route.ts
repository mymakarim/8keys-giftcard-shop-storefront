import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Get the webhook payload
    const payload = await request.json()
    
    console.log('Received P100 SEPA transfer webhook:', payload)

    // Forward to webhook server for processing
    const webhookServerUrl = process.env.NEXT_PUBLIC_WEBHOOK_SERVER_URL || 'https://webhook.88808880.xyz'
    
    const response = await fetch(`${webhookServerUrl}/p100/sepa-transfer-webhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.error('Failed to forward SEPA transfer webhook to webhook server')
      return NextResponse.json(
        { error: 'Failed to process webhook' },
        { status: 500 }
      )
    }

    const result = await response.json()
    console.log('SEPA transfer webhook processed successfully')

    return NextResponse.json(
      { success: true, message: 'SEPA transfer webhook processed successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing P100 SEPA transfer webhook:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 