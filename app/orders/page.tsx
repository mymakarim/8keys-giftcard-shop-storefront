'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import ProtectedPage from '../../components/ProtectedPage'
import Loading from '../../components/Loading'
import { getLocalOrders } from '../../lib/data/orders'
import { 
  Package, 
  Search, 
  Filter, 
  Calendar, 
  Download, 
  ExternalLink,
  Copy,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  CreditCard,
  Bitcoin,
  Gift,
  Gamepad2
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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCodes, setShowCodes] = useState<{ [key: string]: boolean }>({})
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date')

  useEffect(() => {
    // Load orders from localStorage
    const loadOrders = () => {
      try {
        const localOrders = getLocalOrders()
        setOrders(localOrders)
      } catch (error) {
        console.error('Error loading orders:', error)
        setOrders([])
      } finally {
        setIsLoading(false)
      }
    }

    loadOrders()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-gaming-neon bg-gaming-neon/20'
      case 'pending': return 'text-gaming-gold bg-gaming-gold/20'
      case 'failed': return 'text-red-400 bg-red-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle
      case 'pending': return Clock
      case 'failed': return AlertCircle
      default: return AlertCircle
    }
  }

  const toggleCodeVisibility = (orderId: string) => {
    setShowCodes(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.products.some(product => 
                           product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.platform.toLowerCase().includes(searchTerm.toLowerCase())
                         )
    return matchesStatus && matchesSearch
  })

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'amount':
        return b.totalAmount - a.totalAmount
      case 'status':
        return a.status.localeCompare(b.status)
      default:
        return 0
    }
  })

  if (isLoading) {
    return <Loading text="Loading your orders..." size="lg" fullScreen />
  }

  return (
    <ProtectedPage redirectTo="/auth?redirect=/orders">
      <main className="min-h-screen transition-colors duration-500 dark:bg-gaming-darker light:bg-gradient-to-br light:from-blue-50/80 light:via-white light:to-purple-50/80 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="dark:block hidden absolute inset-0 bg-gradient-to-br from-gaming-purple/10 via-transparent to-gaming-cyan/10" />
          <div className="dark:block hidden absolute top-1/4 left-10 w-72 h-72 bg-gaming-purple/5 rounded-full blur-3xl animate-pulse" />
          <div className="dark:block hidden absolute bottom-1/4 right-10 w-96 h-96 bg-gaming-cyan/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          
          <div className="light:block hidden absolute top-1/4 left-10 w-72 h-72 bg-blue-200/15 rounded-full blur-3xl animate-pulse" />
          <div className="light:block hidden absolute bottom-1/4 right-10 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        <Navigation />
        
        <div className="pt-16 relative z-10">
          {/* Header */}
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8"
              >
                <div className="mb-6 lg:mb-0">
                  <h1 className="text-3xl md:text-5xl font-gaming font-bold mb-2 transition-colors duration-300 dark:text-white light:text-gray-900">
                    Order <span className="cyber-text">History</span>
                  </h1>
                  <p className="text-xl transition-colors duration-300 dark:text-gray-300 light:text-gray-600">
                    Track your purchases and manage your gift cards
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="btn-secondary">
                    <Download className="w-5 h-5" />
                    Export Orders
                  </button>
                  <button 
                    onClick={() => window.location.href = '/gift-cards'}
                    className="btn-neon"
                  >
                    <Gift className="w-5 h-5" />
                    Buy Gift Cards
                  </button>
                </div>
              </motion.div>

              {/* Filters and Search */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="gaming-card mb-8"
              >
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input-cyber pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="select-cyber"
                    >
                      <option value="all">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                    
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="select-cyber"
                    >
                      <option value="date">Sort by Date</option>
                      <option value="amount">Sort by Amount</option>
                      <option value="status">Sort by Status</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Orders List */}
          <section className="pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-6">
                {sortedOrders.map((order, index) => {
                  const StatusIcon = getStatusIcon(order.status)
                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="gaming-card"
                    >
                      {/* Order Header */}
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 pb-6 border-b border-gaming-purple/20">
                        <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                          <div className="p-3 bg-gaming-purple/20 rounded-lg">
                            <Gamepad2 className="w-8 h-8 text-gaming-cyan" />
                          </div>
                          <div>
                            <h3 className="text-xl font-gaming font-bold transition-colors duration-300 dark:text-white light:text-gray-900">{order.id}</h3>
                            <p className="transition-colors duration-300 dark:text-gray-400 light:text-gray-500">
                              {order.products.length} item(s) • {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <div className="text-2xl font-gaming font-bold transition-colors duration-300 dark:text-white light:text-gray-900">
                              ${order.totalAmount.toFixed(2)}
                            </div>
                            <div className="text-sm transition-colors duration-300 dark:text-gray-400 light:text-gray-500">
                              {order.cryptoAmount.toFixed(6)} {order.cryptoCurrency}
                            </div>
                          </div>
                          
                          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                            <StatusIcon className="w-4 h-4" />
                            <span className="font-semibold capitalize">{order.status}</span>
                          </div>
                        </div>
                      </div>

                      {/* Order Products */}
                      <div className="mb-6">
                        <h4 className="font-semibold transition-colors duration-300 dark:text-white light:text-gray-900 mb-3 flex items-center">
                          <Package className="w-5 h-5 mr-2 text-gaming-cyan" />
                          Products Ordered
                        </h4>
                        <div className="space-y-2">
                          {order.products.map((product, productIndex) => (
                            <div key={productIndex} className="flex items-center justify-between p-3 rounded-lg border transition-all duration-300 dark:bg-gaming-dark/30 dark:border-gaming-purple/20 light:bg-gray-50/50 light:border-gray-200">
                              <div className="flex items-center space-x-3">
                                <Gift className="w-6 h-6 text-gaming-gold" />
                                <div>
                                  <div className="font-medium transition-colors duration-300 dark:text-white light:text-gray-900">{product.name}</div>
                                  <div className="text-sm transition-colors duration-300 dark:text-gray-400 light:text-gray-500">
                                    {product.platform} • Quantity: {product.quantity}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold transition-colors duration-300 dark:text-white light:text-gray-900">
                                  ${(product.price_cents / 100 * product.quantity).toFixed(2)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Gift Card Keys or Error */}
                      {order.status === 'completed' && order.giftCardKeys && order.giftCardKeys.length > 0 ? (
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold transition-colors duration-300 dark:text-white light:text-gray-900 flex items-center">
                              <Gift className="w-5 h-5 mr-2 text-gaming-neon" />
                              Gift Card Codes ({order.giftCardKeys.length})
                            </h4>
                            <button
                              onClick={() => toggleCodeVisibility(order.id)}
                              className="flex items-center space-x-2 text-gaming-cyan hover:text-gaming-neon transition-colors"
                            >
                              {showCodes[order.id] ? (
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
                          </div>
                          
                          <div className="space-y-3">
                            {order.giftCardKeys.map((key, keyIndex) => {
                              const product = order.products.find(p => p.productId === key.productId)
                              return (
                                <div key={keyIndex} className="p-4 rounded-lg border transition-all duration-300 dark:bg-gaming-dark/50 dark:border-gaming-purple/30 light:bg-gray-50 light:border-gray-200">
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-3 mb-2">
                                        <span className="transition-colors duration-300 dark:text-white light:text-gray-900 font-semibold">
                                          {product?.name || 'Unknown Product'}
                                        </span>
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gaming-neon/20 text-gaming-neon">
                                          Active
                                        </span>
                                      </div>
                                      
                                      <div className="flex items-center space-x-2">
                                        <code className="text-gaming-cyan font-mono text-sm px-2 py-1 rounded transition-colors duration-300 dark:bg-gaming-darker light:bg-white light:border light:border-gray-200">
                                          {showCodes[order.id] ? key.code : '••••-••••-••••-••••'}
                                        </code>
                                        {showCodes[order.id] && (
                                          <button
                                            onClick={() => copyToClipboard(key.code)}
                                            className="p-1 rounded transition-all duration-300 dark:hover:bg-gaming-purple/20 light:hover:bg-blue-100"
                                          >
                                            <Copy className="w-4 h-4 text-gaming-cyan" />
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      ) : order.status === 'failed' ? (
                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <XCircle className="w-6 h-6 text-red-400" />
                            <div>
                              <h4 className="font-semibold text-red-400">Order Failed</h4>
                              <p className="transition-colors duration-300 dark:text-gray-300 light:text-gray-600 text-sm">
                                {order.error || 'Unable to deliver gift card keys'}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : order.status === 'pending' ? (
                        <div className="p-4 bg-gaming-gold/10 border border-gaming-gold/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Clock className="w-6 h-6 text-gaming-gold" />
                            <div>
                              <h4 className="font-semibold text-gaming-gold">Processing Order</h4>
                              <p className="transition-colors duration-300 dark:text-gray-300 light:text-gray-600 text-sm">Your gift cards are being processed and will be delivered shortly</p>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </motion.div>
                  )
                })}
              </div>

              {sortedOrders.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center py-12"
                >
                  <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-gaming font-bold text-gray-400 mb-2">No Orders Found</h3>
                  <p className="text-gray-500 mb-6">
                    {searchTerm || filterStatus !== 'all' 
                      ? 'No orders match your current filters.' 
                      : 'You haven\'t made any purchases yet.'}
                  </p>
                  <button 
                    onClick={() => window.location.href = '/gift-cards'}
                    className="btn-neon"
                  >
                    <Gift className="w-5 h-5" />
                    Start Shopping
                  </button>
                </motion.div>
              )}
            </div>
          </section>
        </div>
        
        <Footer />
      </main>
    </ProtectedPage>
  )
} 