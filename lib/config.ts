// API Configuration
export const API_CONFIG = {
  // Medusa backend URL
  BACKEND_URL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000',
  
  // API endpoints
  ENDPOINTS: {
    INVOICES: '/store/invoices',
    GIFT_CARDS: '/store/gift-cards',
    ORDERS: '/store/orders'
  }
}

// Helper function to get full API URL
export const getApiUrl = (endpoint: string) => {
  return `${API_CONFIG.BACKEND_URL}${endpoint}`
}

// Helper function to get invoice download URL
export const getInvoiceDownloadUrl = (orderId: string) => {
  return `${API_CONFIG.BACKEND_URL}${API_CONFIG.ENDPOINTS.INVOICES}/${orderId}`
} 