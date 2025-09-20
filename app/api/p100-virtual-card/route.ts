import { NextRequest, NextResponse } from 'next/server'
import { p100Service } from '../../../lib/p100'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      externalUserId,
      label,
      pin
    } = body

    // Validate required fields
    if (!externalUserId || !label || !pin) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields',
          details: 'externalUserId, label, and pin are required'
        },
        { status: 400 }
      )
    }

    // Validate label length (3-30 characters)
    if (label.length < 3 || label.length > 30) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid label length',
          details: 'Label must be between 3 and 30 characters'
        },
        { status: 400 }
      )
    }

    // Validate PIN (4 digits)
    if (!/^\d{4}$/.test(pin)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid PIN format',
          details: 'PIN must be exactly 4 digits'
        },
        { status: 400 }
      )
    }

    console.log('Creating P100 virtual card:', {
      externalUserId,
      label,
      pinLength: pin.length
    })

    // Create virtual card via P100 API
    const cardResponse = await p100Service.createVirtualCard({
      externalUserId,
      label,
      pin
    })

    console.log('P100 virtual card created successfully:', {
      cardId: cardResponse.cardId,
      cardLastDigits: cardResponse.cardNumber.slice(-4)
    })

    return NextResponse.json({
      success: true,
      cardId: cardResponse.cardId,
      cardNumber: cardResponse.cardNumber,
      cvv: cardResponse.cvv,
      exp: cardResponse.exp,
      label: label,
      message: 'Virtual card created successfully'
    })

  } catch (error: any) {
    console.error('P100 virtual card creation error:', error)

    // Handle specific P100 errors
    if (error.message?.includes('P412')) {
      return NextResponse.json(
        { 
          success: false,
          error: 'User not found',
          errorCode: 'P412',
          details: 'The specified user does not exist in P100 system'
        },
        { status: 400 }
      )
    }

    if (error.message?.includes('P451')) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Country not supported',
          errorCode: 'P451',
          details: 'Virtual cards are not available for users from this country'
        },
        { status: 400 }
      )
    }

    if (error.message?.includes('P455')) {
      return NextResponse.json(
        { 
          success: false,
          error: 'User suspended',
          errorCode: 'P455',
          details: 'User account is suspended and cannot create virtual cards'
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        success: false,
        error: 'Virtual card creation failed',
        details: error.message || 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const externalUserId = searchParams.get('externalUserId')

    if (!externalUserId) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing externalUserId parameter'
        },
        { status: 400 }
      )
    }

    console.log('Fetching P100 user cards:', externalUserId)

    // Get all user cards via P100 API
    const cards = await p100Service.getUserCards(externalUserId)

    console.log('P100 user cards fetched:', cards.length)

    return NextResponse.json({
      success: true,
      cards: cards,
      count: cards.length
    })

  } catch (error: any) {
    console.error('P100 get user cards error:', error)

    // Handle specific P100 errors
    if (error.message?.includes('P412')) {
      return NextResponse.json(
        { 
          success: false,
          error: 'User not found',
          errorCode: 'P412',
          details: 'The specified user does not exist in P100 system'
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch user cards',
        details: error.message || 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
} 