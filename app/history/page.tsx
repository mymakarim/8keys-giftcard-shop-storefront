'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { 
  Package, 
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Copy,
  Download,
  Filter,
  Search,
  Calendar,
  CreditCard,
  Gift,
  ExternalLink,
  AlertCircle,
  Gamepad2,
  Bitcoin
} from '../../components/icons'
import { useState, useEffect } from 'react'
import { getLocalOrders } from '../../lib/data/orders'
import { useAuth } from '../../lib/auth-context'

const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_SERVER_URL || 'http://localhost:3000'

export default function HistoryPage() {
  const [showCodes, setShowCodes] = useState<{ [key: string]: boolean }>({})
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { customer, loading: authLoading } = useAuth()
  const [modalOpen, setModalOpen] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true)
      let fetchedOrders = []
      if (customer?.id) {
        try {
          const response = await fetch(`${WEBHOOK_URL}/orders/customer/${customer.id}`)
          console.log("--------------------------------",response, WEBHOOK_URL)
          const result = await response.json()
          fetchedOrders = (result.orders || []).map((order: any) => ({
            id: order.order_id,
            date: order.created_at,
            status: order.status,
            platform: order.items && order.items[0] ? order.items[0].platform : 'Unknown',
            amount: order.total_amount ? `$${Number(order.total_amount).toFixed(2)}` : '',
            crypto: order.crypto_currency || '',
            cryptoAmount: order.crypto_amount ? `${order.crypto_amount} ${order.crypto_currency}` : '',
            giftCards: [],
            transactionHash: order.payment_intent_id || '',
            processingFee: '',
          }))
        } catch (e) {
          console.error('Failed to fetch orders from webhook server:', e)
        }
      } else {
        fetchedOrders = getLocalOrders()
      }
      setOrders(fetchedOrders)
      setLoading(false)
    }
    if (!authLoading) fetchOrders()
  }, [customer, authLoading])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-gaming-neon bg-gaming-neon/20'
      case 'processing': return 'text-gaming-gold bg-gaming-gold/20'
      case 'failed': return 'text-red-400 bg-red-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle
      case 'processing': return Clock
      case 'failed': return XCircle
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
    // Could add toast notification here
  }

  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.platform.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'amount':
        return parseFloat(b.amount.replace('$', '')) - parseFloat(a.amount.replace('$', ''))
      case 'platform':
        return a.platform.localeCompare(b.platform)
      default:
        return 0
    }
  })

  const handleAccordionToggle = async (orderId: string) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
      setOrderDetails(null);
      return;
    }
    setExpandedOrderId(orderId);
    setOrderDetails(null);
    try {
      const response = await fetch(`${WEBHOOK_URL}/order/${orderId}`);
      const details = await response.json();
      setOrderDetails(details.order || details);
    } catch (e) {
      setOrderDetails({ error: 'Failed to fetch order details.' });
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-xl font-gaming font-bold text-gray-400 mb-2">Loading your order history...</span>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen transition-colors duration-500 dark:bg-gaming-darker light:bg-gradient-to-br light:from-blue-50/80 light:via-white light:to-purple-50/80 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dark theme background */}
        <div className="dark:block hidden absolute inset-0 bg-gradient-to-br from-gaming-purple/10 via-transparent to-gaming-cyan/10" />
        <div className="dark:block hidden absolute top-1/4 left-10 w-72 h-72 bg-gaming-purple/5 rounded-full blur-3xl animate-pulse" />
        <div className="dark:block hidden absolute bottom-1/4 right-10 w-96 h-96 bg-gaming-cyan/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Light theme background */}
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
                <button className="btn-neon">
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
                    <option value="processing">Processing</option>
                    <option value="failed">Failed</option>
                  </select>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="select-cyber"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="amount">Sort by Amount</option>
                    <option value="platform">Sort by Platform</option>
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
                          <h3 className="text-xl font-gaming font-bold text-white">{order.id}</h3>
                          <p className="text-gray-400">{order.platform}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <div className="text-2xl font-gaming font-bold text-white">{order.amount}</div>
                          <div className="text-sm text-gray-400">{order.cryptoAmount}</div>
                        </div>
                        
                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                          <StatusIcon className="w-4 h-4" />
                          <span className="font-semibold capitalize">{order.status}</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-white mb-3 flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-gaming-cyan" />
                          Order Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Date:</span>
                            <span className="text-white">{new Date(order.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Time:</span>
                            <span className="text-white">{new Date(order.date).toLocaleTimeString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Processing Fee:</span>
                            <span className="text-white">{order.processingFee}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-white mb-3 flex items-center">
                          <Bitcoin className="w-5 h-5 mr-2 text-gaming-gold" />
                          Payment Details
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Cryptocurrency:</span>
                            <span className="text-white">{order.crypto}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Amount:</span>
                            <span className="text-white">{order.cryptoAmount}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Transaction:</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-white font-mono text-xs">
                                {order.transactionHash.slice(0, 10)}...
                              </span>
                              <button
                                onClick={() => copyToClipboard(order.transactionHash)}
                                className="p-1 hover:bg-gaming-purple/20 rounded"
                              >
                                <Copy className="w-4 h-4 text-gaming-cyan" />
                              </button>
                              <button className="p-1 hover:bg-gaming-purple/20 rounded">
                                <ExternalLink className="w-4 h-4 text-gaming-cyan" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Gift Cards */}
                    {order.giftCards.length > 0 ? (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-white flex items-center">
                            <Gift className="w-5 h-5 mr-2 text-gaming-neon" />
                            Gift Card Codes ({order.giftCards.length})
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
                          {order.giftCards.map((card: any, cardIndex: any) => (
                            <div key={cardIndex} className="p-4 rounded-lg border transition-all duration-300 dark:bg-gaming-dark/50 dark:border-gaming-purple/30 light:bg-gray-50 light:border-gray-200">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <span className="transition-colors duration-300 dark:text-white light:text-gray-900 font-semibold">{card.value}</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      card.status === 'active' ? 'bg-gaming-neon/20 text-gaming-neon' :
                                      card.status === 'redeemed' ? 'dark:bg-gray-500/20 dark:text-gray-400 light:bg-gray-200 light:text-gray-600' :
                                      'bg-gaming-gold/20 text-gaming-gold'
                                    }`}>
                                      {card.status}
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-center space-x-2">
                                    <code className="text-gaming-cyan font-mono text-sm bg-gaming-darker px-2 py-1 rounded">
                                      {showCodes[order.id] ? card.code : '••••-••••-••••-••••'}
                                    </code>
                                    {showCodes[order.id] && card.status !== 'pending' && (
                                      <button
                                        onClick={() => copyToClipboard(card.code)}
                                        className="p-1 hover:bg-gaming-purple/20 rounded"
                                      >
                                        <Copy className="w-4 h-4 text-gaming-cyan" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : order.status === 'failed' ? (
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <XCircle className="w-6 h-6 text-red-400" />
                          <div>
                            <h4 className="font-semibold text-red-400">Order Failed</h4>
                            <p className="text-gray-300 text-sm">{order.failureReason}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-gaming-gold/10 border border-gaming-gold/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-6 h-6 text-gaming-neon" />
                          <div>
                            <h4 className="font-semibold text-gaming-neon">Completed Order</h4>
                            <p className="text-gray-300 text-sm">You purchased gift card(s) successfully!</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <button
                      className={`btn-secondary mt-2 ${expandedOrderId === order.id ? 'bg-gaming-gold text-gaming-dark' : ''}`}
                      onClick={() => handleAccordionToggle(order.id)}
                    >
                      {expandedOrderId === order.id ? 'Hide Details' : 'View Details'}
                    </button>
                    {expandedOrderId === order.id && (
                      <div className="gaming-card mt-4 p-4 border border-gaming-cyan/30 bg-gaming-dark/80 rounded-lg">
                        {orderDetails ? (
                          orderDetails.error ? (
                            <div className="text-red-500">{orderDetails.error}</div>
                          ) : (
                            <div>
                              <h2 className="text-xl font-bold mb-2">Order Details</h2>
                              <div className="mb-2"><b>Order ID:</b> {orderDetails.order_id}</div>
                              <div className="mb-2"><b>Status:</b> {orderDetails.status}</div>
                              <div className="mb-2"><b>Date:</b> {orderDetails.created_at ? new Date(orderDetails.created_at).toLocaleString() : ''}</div>
                              <div className="mb-2"><b>Total:</b> €{parseFloat(orderDetails.total_amount).toFixed(2)}</div>
                              <div className="mb-2"><b>Payment Method:</b> {orderDetails.payment_method}</div>
                              <div className="mb-2"><b>Products:</b></div>
                              <ul className="list-disc pl-5">
                                {orderDetails.items && orderDetails.items.map((item: any) => (
                                  <li key={item.product_id}>
                                    {item.name} ({item.platform}) x{item.quantity} - €{(item.price_cents / 100).toFixed(2)}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        ) : (
                          <div>Loading...</div>
                        )}
                      </div>
                    )}
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
                <button className="btn-neon">
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
  )
} 
