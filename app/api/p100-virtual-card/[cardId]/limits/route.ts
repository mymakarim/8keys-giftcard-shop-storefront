import { NextRequest, NextResponse } from 'next/server'
import { p100Service } from '../../../../../lib/p100'

// Get card limits
export async function GET(
  request: NextRequest,
  { params }: { params: { cardId: string } }
) {
  try {
    const { cardId } = params
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

    console.log('Fetching P100 card limits:', { externalUserId, cardId })

    // Get card limits via P100 API
    const limits = await p100Service.getCardLimits(externalUserId, cardId)

    console.log('P100 card limits fetched for card:', cardId)

    return NextResponse.json({
      success: true,
      limits: limits
    })

  } catch (error: any) {
    console.error('P100 get card limits error:', error)

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

    if (error.message?.includes('P434')) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Card not found',
          errorCode: 'P434',
          details: 'The specified card does not exist'
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch card limits',
        details: error.message || 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
}

// Update card limits
export async function PATCH(
  request: NextRequest,
  { params }: { params: { cardId: string } }
) {
  try {
    const { cardId } = params
    const body = await request.json()
    
    const {
      externalUserId,
      monthlyTrxAll,
      dailyTrxAll,
      monthlyTrxAtm,
      dailyTrxAtm,
      monthlyTrxEcom,
      dailyTrxEcom
    } = body

    if (!externalUserId) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing externalUserId'
        },
        { status: 400 }
      )
    }

    // Validate that all limit values are provided and are numbers
    const limits = {
      monthlyTrxAll,
      dailyTrxAll,
      monthlyTrxAtm,
      dailyTrxAtm,
      monthlyTrxEcom,
      dailyTrxEcom
    }

    for (const [key, value] of Object.entries(limits)) {
      if (typeof value !== 'number' || value < 0) {
        return NextResponse.json(
          { 
            success: false,
            error: `Invalid ${key}`,
            details: `${key} must be a non-negative number`
          },
          { status: 400 }
        )
      }
    }

    // Validate that daily limits don't exceed monthly limits
    if (dailyTrxAll > monthlyTrxAll) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid daily limit',
          details: 'Daily transaction limit cannot exceed monthly limit'
        },
        { status: 400 }
      )
    }

    if (dailyTrxAtm > monthlyTrxAtm) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid daily ATM limit',
          details: 'Daily ATM limit cannot exceed monthly ATM limit'
        },
        { status: 400 }
      )
    }

    if (dailyTrxEcom > monthlyTrxEcom) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid daily ecommerce limit',
          details: 'Daily ecommerce limit cannot exceed monthly ecommerce limit'
        },
        { status: 400 }
      )
    }

    console.log('Updating P100 card limits:', { externalUserId, cardId, limits })

    // Update card limits via P100 API
    const result = await p100Service.updateCardLimits({
      externalUserId,
      cardId,
      ...limits
    })

    console.log('P100 card limits updated successfully for card:', cardId)

    return NextResponse.json({
      success: true,
      message: result.message || 'Card limits updated successfully',
      limits: limits
    })

  } catch (error: any) {
    console.error('P100 update card limits error:', error)

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

    if (error.message?.includes('P434')) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Card not found',
          errorCode: 'P434',
          details: 'The specified card does not exist'
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to update card limits',
        details: error.message || 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
} 