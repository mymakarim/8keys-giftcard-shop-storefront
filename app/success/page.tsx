'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import ProtectedPage from '../../components/ProtectedPage'
import Loading from '../../components/Loading'
import { getOrderById } from '../../lib/data/orders'
import { getInvoiceDownloadUrl } from '../../lib/config'
import { 
  Check, 
  Copy, 
  Eye, 
  EyeOff, 
  Download, 
  ExternalLink,
  Gift,
  Gamepad2,
  Wallet,
  ArrowRight
} from '../../components/icons'

interface Order {
  id: string
  date: string
  status: 'completed' | 'failed' | 'pending'
  products: Array<{
    productId: string
    name: string
    platform: string
    quantity: number
    price_cents: number
  }>
  totalAmount: number
  cryptoAmount: number
  cryptoCurrency: string
  userEmail: string
  giftCardKeys?: Array<{
    code: string
    productId: string
  }>
  error?: string
}

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showKeys, setShowKeys] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  useEffect(() => {
    const orderId = searchParams.get('orderId')
    if (!orderId) {
      router.push('/orders')
      return
    }

    const loadOrder = () => {
      try {
        const orderData = getOrderById(orderId)
        if (orderData) {
          setOrder(orderData)
        } else {
          router.push('/orders')
        }
      } catch (error) {
        console.error('Error loading order:', error)
        router.push('/orders')
      } finally {
        setIsLoading(false)
      }
    }

    loadOrder()
  }, [searchParams, router])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(text)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const downloadKeys = () => {
    if (!order?.giftCardKeys) return

    const content = order.giftCardKeys.map(key => 
      `${key.productId}: ${key.code}`
    ).join('\n')

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `gift-cards-${order.id}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return <Loading text="Loading your order..." size="lg" fullScreen />
  }

  if (!order) {
    return null
  }

  return (
    <ProtectedPage redirectTo="/auth?redirect=/success">
      <main className="min-h-screen transition-colors duration-500 dark:bg-gaming-darker light:bg-gradient-to-br light:from-blue-50/80 light:via-white light:to-purple-50/80 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="dark:block hidden absolute inset-0 bg-gradient-to-br from-gaming-purple/10 via-transparent to-gaming-cyan/10" />
          <div className="dark:block hidden absolute top-1/4 left-10 w-72 h-72 bg-gaming-neon/5 rounded-full blur-3xl animate-pulse" />
          <div className="dark:block hidden absolute bottom-1/4 right-10 w-96 h-96 bg-gaming-cyan/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          
          <div className="light:block hidden absolute top-1/4 left-10 w-72 h-72 bg-green-200/15 rounded-full blur-3xl animate-pulse" />
          <div className="light:block hidden absolute bottom-1/4 right-10 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <Navigation />
        
        <div className="pt-16 relative z-10">
          <section className="py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Success Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <div className="p-8 bg-gaming-neon/10 rounded-full w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                  <Check className="w-16 h-16 text-gaming-neon" />
                </div>
                <h1 className="text-4xl md:text-6xl font-gaming font-bold mb-4 text-gaming-neon">
                  Purchase <span className="cyber-text">Successful!</span>
                </h1>
                <p className="text-xl transition-colors duration-300 dark:text-gray-300 light:text-gray-600">
                  Your gift card codes have been delivered successfully
                </p>
                <div className="mt-4 p-3 rounded-lg bg-gaming-cyan/10 border border-gaming-cyan/30">
                  <p className="text-sm transition-colors duration-300 dark:text-gray-300 light:text-gray-600">
                    Order ID: <span className="font-mono text-gaming-cyan">{order.id}</span>
                  </p>
                </div>
              </motion.div>

              {/* Order Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="gaming-card mb-8"
              >
                <h2 className="text-2xl font-gaming font-bold mb-6 transition-colors duration-300 dark:text-white light:text-gray-900">
                  Order Details
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 transition-colors duration-300 dark:text-white light:text-gray-900">Purchase Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="transition-colors duration-300 dark:text-gray-400 light:text-gray-600">Date:</span>
                        <span className="transition-colors duration-300 dark:text-white light:text-gray-900">
                          {new Date(order.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="transition-colors duration-300 dark:text-gray-400 light:text-gray-600">Status:</span>
                        <span className="text-gaming-neon font-semibold">{order.status}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="transition-colors duration-300 dark:text-gray-400 light:text-gray-600">Total Amount:</span>
                        <span className="transition-colors duration-300 dark:text-white light:text-gray-900">
                          ${order.totalAmount.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="transition-colors duration-300 dark:text-gray-400 light:text-gray-600">Crypto Amount:</span>
                        <span className="transition-colors duration-300 dark:text-white light:text-gray-900">
                          {order.cryptoAmount.toFixed(6)} {order.cryptoCurrency}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4 transition-colors duration-300 dark:text-white light:text-gray-900">Products Purchased</h3>
                    <div className="space-y-3">
                      {order.products.map((product, index) => (
                        <div key={index} className="p-3 rounded-lg border transition-all duration-300 dark:bg-gaming-dark/50 dark:border-gaming-purple/30 light:bg-gray-50/80 light:border-gray-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold transition-colors duration-300 dark:text-white light:text-gray-900">{product.name}</div>
                              <div className="text-sm transition-colors duration-300 dark:text-gray-400 light:text-gray-500">{product.platform}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold transition-colors duration-300 dark:text-white light:text-gray-900">
                                ${(product.price_cents / 100).toFixed(2)}
                              </div>
                              <div className="text-sm transition-colors duration-300 dark:text-gray-400 light:text-gray-500">
                                Qty: {product.quantity}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Download Invoice Button */}
                <div className="mt-6 flex justify-center">
                  <a
                    href={getInvoiceDownloadUrl(order.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-neon flex items-center space-x-2"
                    download
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Invoice (PDF)</span>
                  </a>
                </div>
              </motion.div>

              {/* Gift Card Keys */}
              {order.giftCardKeys && order.giftCardKeys.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="gaming-card mb-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-gaming font-bold transition-colors duration-300 dark:text-white light:text-gray-900">
                      Your Gift Card Codes
                    </h2>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setShowKeys(!showKeys)}
                        className="flex items-center space-x-2 text-gaming-cyan hover:text-gaming-neon transition-colors"
                      >
                        {showKeys ? (
                          <>
                            <EyeOff className="w-4 h-4" />
                            <span>Hide Codes</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4" />
                            <span>Show Codes</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={downloadKeys}
                        className="flex items-center space-x-2 text-gaming-cyan hover:text-gaming-neon transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {order.giftCardKeys.map((key, index) => (
                      <div key={index} className="p-4 rounded-lg border transition-all duration-300 dark:bg-gaming-dark/50 dark:border-gaming-purple/30 light:bg-gray-50/80 light:border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="text-left">
                            <div className="font-semibold transition-colors duration-300 dark:text-white light:text-gray-900">
                              Product ID: {key.productId}
                            </div>
                            <div className="text-sm transition-colors duration-300 dark:text-gray-400 light:text-gray-500">
                              Gift Card Code
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <code className="px-3 py-2 rounded transition-colors duration-300 dark:bg-gaming-darker dark:text-gaming-cyan light:bg-white light:text-blue-600 font-mono">
                              {showKeys ? key.code : '••••••••••••••••'}
                            </code>
                            {showKeys && (
                              <button
                                onClick={() => copyToClipboard(key.code)}
                                className="p-2 rounded transition-all duration-300 dark:hover:bg-gaming-purple/20 light:hover:bg-blue-100"
                                title={copiedKey === key.code ? 'Copied!' : 'Copy code'}
                              >
                                <Copy className="w-4 h-4 text-gaming-cyan" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button
                  onClick={() => router.push('/gift-cards')}
                  className="btn-secondary"
                >
                  <Gift className="w-5 h-5 mr-2" />
                  Buy More Gift Cards
                </button>
                <button
                  onClick={() => router.push('/orders')}
                  className="btn-neon"
                >
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  View Order History
                </button>
              </motion.div>

              {/* Email Confirmation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-8 p-4 rounded-lg border transition-all duration-300 dark:bg-gaming-cyan/10 dark:border-gaming-cyan/30 light:bg-blue-50/80 light:border-blue-200"
              >
                <div className="flex items-center justify-center space-x-3">
                  <Wallet className="w-6 h-6 text-gaming-cyan" />
                  <span className="text-sm transition-colors duration-300 dark:text-gray-300 light:text-gray-600">
                    A confirmation email has been sent to <span className="font-semibold text-gaming-cyan">{order.userEmail}</span>
                  </span>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
        
        <Footer />
      </main>
    </ProtectedPage>
  )
} 