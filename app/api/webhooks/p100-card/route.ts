import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Get the webhook payload
    const payload = await request.json()
    
    console.log('Received P100 card webhook:', payload)

    // Determine webhook type from URL path or payload
    const { pathname } = new URL(request.url)
    const isActivation = pathname.includes('activation')
    const is3DS = pathname.includes('3ds')
    
    // Extract webhook data
    const {
      externalUserId,
      cardId,
      code
    } = payload

    // Validate required fields
    if (!externalUserId || !code) {
      return NextResponse.json(
        { error: 'Missing required fields: externalUserId and code are required' },
        { status: 400 }
      )
    }

    // For activation webhooks, cardId is also required
    if (isActivation && !cardId) {
      return NextResponse.json(
        { error: 'Missing required field: cardId is required for activation webhook' },
        { status: 400 }
      )
    }

    // Forward to webhook server for processing
    const webhookServerUrl = process.env.NEXT_PUBLIC_WEBHOOK_SERVER_URL || 'https://webhook.88808880.xyz'
    
    let forwardUrl
    if (isActivation) {
      forwardUrl = `${webhookServerUrl}/update-card-activation`
    } else if (is3DS) {
      forwardUrl = `${webhookServerUrl}/update-card-3ds`
    } else {
      // Default to 3DS if not specified
      forwardUrl = `${webhookServerUrl}/update-card-3ds`
    }
    
    const response = await fetch(forwardUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        externalUserId,
        cardId,
        code
      }),
    })

    if (!response.ok) {
      console.error('Failed to forward card webhook to webhook server')
      return NextResponse.json(
        { error: 'Failed to process webhook' },
        { status: 500 }
      )
    }

    const result = await response.json()
    console.log('Card webhook processed successfully')

    return NextResponse.json(
      { success: true, message: 'Card webhook processed successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing P100 card webhook:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 