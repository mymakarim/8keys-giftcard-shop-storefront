import { NextRequest, NextResponse } from 'next/server'
import { p100Service } from '../../../../lib/p100'

// Get card details
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

    console.log('Fetching P100 card details:', { externalUserId, cardId })

    // Get card details via P100 API
    const cardDetails = await p100Service.getCardDetails(externalUserId, cardId)

    console.log('P100 card details fetched for card:', cardId)

    return NextResponse.json({
      success: true,
      card: cardDetails
    })

  } catch (error: any) {
    console.error('P100 get card details error:', error)

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
        error: 'Failed to fetch card details',
        details: error.message || 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
}

// Update card (PIN, limits, etc.)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { cardId: string } }
) {
  try {
    const { cardId } = params
    const body = await request.json()
    
    const {
      externalUserId,
      action,
      pin,
      limits
    } = body

    if (!externalUserId || !action) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields',
          details: 'externalUserId and action are required'
        },
        { status: 400 }
      )
    }

    console.log('Updating P100 card:', { externalUserId, cardId, action })

    let result
    switch (action) {
      case 'updatePin':
        if (!pin || !/^\d{4}$/.test(pin)) {
          return NextResponse.json(
            { 
              success: false,
              error: 'Invalid PIN format',
              details: 'PIN must be exactly 4 digits'
            },
            { status: 400 }
          )
        }
        result = await p100Service.updateCardPin({
          externalUserId,
          cardId,
          pin
        })
        break

      case 'updateLimits':
        if (!limits) {
          return NextResponse.json(
            { 
              success: false,
              error: 'Missing limits data',
              details: 'Limits object is required for updateLimits action'
            },
            { status: 400 }
          )
        }
        result = await p100Service.updateCardLimits({
          externalUserId,
          cardId,
          ...limits
        })
        break

      case 'block':
        result = await p100Service.blockCard({
          externalUserId,
          cardId
        })
        break

      case 'unblock':
        result = await p100Service.unblockCard({
          externalUserId,
          cardId
        })
        break

      default:
        return NextResponse.json(
          { 
            success: false,
            error: 'Invalid action',
            details: 'Action must be one of: updatePin, updateLimits, block, unblock'
          },
          { status: 400 }
        )
    }

    console.log(`P100 card ${action} successful for card:`, cardId)

    return NextResponse.json({
      success: true,
      message: result.message || `Card ${action} successful`,
      action: action
    })

  } catch (error: any) {
    console.error('P100 card update error:', error)

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
        error: 'Failed to update card',
        details: error.message || 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
}

// Delete card
export async function DELETE(
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

    console.log('Deleting P100 card:', { externalUserId, cardId })

    // Delete card via P100 API
    const result = await p100Service.deleteCard({
      externalUserId,
      cardId
    })

    console.log('P100 card deleted successfully:', cardId)

    return NextResponse.json({
      success: true,
      message: result.message || 'Card deleted successfully'
    })

  } catch (error: any) {
    console.error('P100 delete card error:', error)

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
        error: 'Failed to delete card',
        details: error.message || 'Unknown error occurred'
      },
      { status: 500 }
    )
  }
} 