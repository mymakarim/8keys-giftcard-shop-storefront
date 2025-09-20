import { getCurrentCustomer, getCurrentToken } from './customer'
import { useRouter } from 'next/navigation'

// Backend server URL - replace with your actual backend server URL
const BACKEND_SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL || 'https://api.88808880.xyz'

export interface OrderProduct {
  productId: string
  external_id: string
  quantity: number
  price_cents: number
  productVariant?: string
  name: string
  platform: string
}

export interface OrderRegistrationData {
  orderId: string
  customer: {
    id?: string
    email: string
    first_name?: string
    last_name?: string
    phone?: string
  }
  products: OrderProduct[]
  totalAmount: number
  cryptoAmount: number
  cryptoCurrency: string
  paymentIntentId?: string
  paymentMethod?: 'crypto' | 'sepa' | 'virtual_card'
  paymentData?: any
}

export interface DeliveredOrder {
  orderId: string
  success: boolean
  keys?: string[]
  giftCardKeys?: string[]
  invoiceUrl?: string
  message?: string
  error?: string
  customerId?: string
  emailSent?: boolean
  emailError?: string | null
  deliveryMessage?: string
}

/**
 * Register order with backend server to get gift card keys
 */
export async function registerOrderWithBackend(orderData: OrderRegistrationData): Promise<DeliveredOrder> {
  try {
    console.log('🚀 registerOrderWithBackend called with orderData:', orderData)
    console.log('🌐 BACKEND_SERVER_URL:', BACKEND_SERVER_URL)
    
    // Get Medusa publishable key from environment
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    console.log('🔑 Publishable key present:', !!publishableKey)
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    // Add Medusa publishable key if available
    if (publishableKey) {
      headers['x-publishable-api-key'] = publishableKey
    }
    
    const url = `${BACKEND_SERVER_URL}/store/gift-cards`
    console.log('📡 Making request to:', url)
    console.log('📋 Request headers:', headers)
    console.log('📦 Request body:', JSON.stringify(orderData, null, 2))
    
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData)
    })

    console.log('📨 Response status:', response.status)
    console.log('📨 Response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Backend server error:', errorText)
      throw new Error(`Backend server error: ${response.status} ${errorText}`)
    }

    const result = await response.json()
    console.log('✅ Backend server response:', result)

    if (result.success) {
      return {
        orderId: orderData.orderId,
        success: true,
        keys: result.keys || [],
        giftCardKeys: result.giftCardKeys || [],
        invoiceUrl: result.invoiceUrl,
        message: result.message,
        customerId: result.customerId,
        emailSent: result.emailSent,
        emailError: result.emailError,
        deliveryMessage: result.deliveryMessage
      }
    } else {
      return {
        orderId: orderData.orderId,
        success: false,
        error: result.error || 'Unknown error from backend server',
        message: result.message,
        emailSent: false,
        emailError: result.emailError || null,
        deliveryMessage: result.deliveryMessage
      }
    }
  } catch (error) {
    console.error('💥 Error registering order with backend:', error)
    return {
      orderId: orderData.orderId,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Generate a unique order ID
 */
export function generateOrderId(): string {
  const timestamp = Date.now()
  const microseconds = performance.now().toString().replace('.', '').slice(-6)
  const random = Math.random().toString(36).substring(2, 10).toUpperCase()
  return `ORD-${timestamp}-${microseconds}-${random}`
}

/**
 * Parse gift card keys from backend response
 * Keys are in format: "code:product_id,code:product_id"
 */
export function parseGiftCardKeys(keysString: string): Array<{ code: string; productId: string }> {
  if (!keysString || keysString === 'NO_KEYS_FOUND') {
    return []
  }

  return keysString.split(',').map(keyPair => {
    const [code, productId] = keyPair.split(':')
    return {
      code: code || 'INVALID_CODE',
      productId: productId || 'UNKNOWN_PRODUCT'
    }
  })
}

/**
 * Store order in localStorage for order history
 */
export function storeOrderLocally(orderData: OrderRegistrationData, deliveredOrder: DeliveredOrder) {
  try {
    const orders = getLocalOrders()
    const parsedKeys = deliveredOrder.keys ? parseGiftCardKeys(deliveredOrder.keys.join(',')) : []
    
    const order = {
      id: orderData.orderId,
      date: new Date().toISOString(),
      status: deliveredOrder.success ? 'completed' : 'failed',
      products: orderData.products,
      totalAmount: orderData.totalAmount,
      cryptoAmount: orderData.cryptoAmount,
      cryptoCurrency: orderData.cryptoCurrency,
      userEmail: orderData.customer.email,
      customerId: deliveredOrder.customerId || orderData.customer.id || 'guest_user',
      giftCardKeys: parsedKeys,
      error: deliveredOrder.error
    }

    orders.unshift(order) // Add to beginning of array
    localStorage.setItem('giftcard_orders', JSON.stringify(orders))
    
    return order
  } catch (error) {
    console.error('Error storing order locally:', error)
    return null
  }
}

/**
 * Get orders from localStorage
 */
export function getLocalOrders() {
  try {
    const ordersJson = localStorage.getItem('giftcard_orders')
    return ordersJson ? JSON.parse(ordersJson) : []
  } catch (error) {
    console.error('Error getting local orders:', error)
    return []
  }
}

/**
 * Get specific order by ID
 */
export function getOrderById(orderId: string) {
  const orders = getLocalOrders()
  return orders.find((order: any) => order.id === orderId)
}

/**
 * Get customer orders from backend
 */
export async function getCustomerOrders(customerId: string) {
  try {
    // Get Medusa publishable key from environment
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    // Add Medusa publishable key if available
    if (publishableKey) {
      headers['x-publishable-api-key'] = publishableKey
    }
    
    const response = await fetch(`${BACKEND_SERVER_URL}/store/customers/${customerId}/orders`, {
      method: 'GET',
      headers
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch customer orders: ${response.status}`)
    }

    const result = await response.json()
    return result.orders || []
  } catch (error) {
    console.error('Error fetching customer orders:', error)
    return []
  }
}

/**
 * Get order details from backend
 */
export async function getOrderDetails(orderId: string) {
  try {
    // Get Medusa publishable key from environment
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    // Add Medusa publishable key if available
    if (publishableKey) {
      headers['x-publishable-api-key'] = publishableKey
    }
    
    const response = await fetch(`${BACKEND_SERVER_URL}/store/orders/${orderId}`, {
      method: 'GET',
      headers
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch order details: ${response.status}`)
    }

    const result = await response.json()
    return result.order || null
  } catch (error) {
    console.error('Error fetching order details:', error)
    return null
  }
}

/**
 * Map frontend gift card IDs to external API product IDs
 * TODO: Replace these with REAL external IDs from your third-party API provider
 * You can get these from your API provider's product catalog
 */
export function getExternalProductId(internalId: string): string {
  const externalIdMap: Record<string, string> = {
    // TODO: Replace with REAL external IDs from your API provider
    // Steam Gift Cards - Get these from your third-party API provider
    'steam-10': '1234567890',   // REPLACE: Real external ID for Steam $10
    'steam-25': '1234567891',   // REPLACE: Real external ID for Steam $25
    'steam-50': '1234567892',   // REPLACE: Real external ID for Steam $50
    
    // Xbox Gift Cards - Get these from your third-party API provider
    'xbox-15': '2234567890',    // REPLACE: Real external ID for Xbox $15
    'xbox-25': '2234567891',    // REPLACE: Real external ID for Xbox $25
    'xbox-50': '2234567892',    // REPLACE: Real external ID for Xbox $50
    
    // Add more real mappings from your API provider...
  }
  
  const mappedId = externalIdMap[internalId]
  
  if (!mappedId) {
    console.warn(`No external ID mapping found for: ${internalId}. Using internal ID as fallback.`)
    return internalId // Fallback to internal ID
  }
  
  return mappedId
}

/**
 * Create a draft order using Medusa Admin API
 * This is the proper way to place orders in Medusa
 */
export async function createMedusaDraftOrder(orderData: OrderRegistrationData): Promise<DeliveredOrder> {
  try {
    console.log('Creating Medusa draft order:', orderData)
    
    // Get admin token (you'll need to implement admin authentication)
    // For now, we'll use the customer token and create via store API
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    // Add Medusa publishable key if available
    if (publishableKey) {
      headers['x-publishable-api-key'] = publishableKey
    }
    
    // For gift cards, we need to create products/variants first if they don't exist
    // Then create a cart and complete it
    
    // 1. Create or get cart
    const cartResponse = await fetch(`${BACKEND_SERVER_URL}/store/carts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email: orderData.customer.email,
        region_id: 'region_01JH5KXBHD6G6ZTDQ3FWJX6DFN', // You'll need to get the actual region ID
        currency_code: 'usd',
        sales_channel_id: null, // Optional
        metadata: {
          orderId: orderData.orderId,
          cryptoAmount: orderData.cryptoAmount,
          cryptoCurrency: orderData.cryptoCurrency
        }
      })
    })
    
    if (!cartResponse.ok) {
      const errorText = await cartResponse.text()
      throw new Error(`Failed to create cart: ${cartResponse.status} ${errorText}`)
    }
    
    const cartData = await cartResponse.json()
    const cartId = cartData.cart.id
    
    console.log('Cart created:', cartId)
    
    // 2. Add items to cart (this requires product variants to exist)
    // For now, we'll call our webhook server to handle the actual key generation
    // but we'll also create a proper Medusa order record
    
    // Call webhook server for key generation
    const webhookResponse = await fetch(`${BACKEND_SERVER_URL}/store/gift-cards`, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData)
    })
    
    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text()
      throw new Error(`Webhook server error: ${webhookResponse.status} ${errorText}`)
    }
    
    const webhookResult = await webhookResponse.json()
    
    // 3. Complete the cart (this would normally be done after payment)
    // For demo purposes, we'll mark it as completed
    
    return {
      orderId: orderData.orderId,
      success: webhookResult.success,
      keys: webhookResult.keys || [],
      giftCardKeys: webhookResult.giftCardKeys || [],
      invoiceUrl: webhookResult.invoiceUrl,
      message: webhookResult.message,
      customerId: webhookResult.customerId
    }
    
  } catch (error) {
    console.error('Error creating Medusa draft order:', error)
    return {
      orderId: orderData.orderId,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
} 
