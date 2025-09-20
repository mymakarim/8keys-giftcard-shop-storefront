'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import ProtectedPage from '../../components/ProtectedPage'
import Loading from '../../components/Loading'
import { 
  User, 
  Mail, 
  Settings, 
  History, 
  Wallet, 
  Shield, 
  Edit,
  Eye,
  EyeOff,
  Download,
  Calendar,
  Star,
  Award,
  ArrowRight,
  Package,
  CreditCard,
  Globe,
  Bell,
  Copy,
  Gift
} from '../../components/icons'

interface UserProfile {
  id: string
  email: string
  createdAt: string
  totalOrders: number
  totalSpent: number
  preferredCurrency: string
  notifications: {
    email: boolean
    orderUpdates: boolean
    promotions: boolean
  }
}

interface Order {
  id: string
  date: string
  status: 'completed' | 'pending' | 'failed'
  items: {
    name: string
    platform: string
    amount: number
    quantity: number
    codes?: string[]
  }[]
  total: number
  cryptoAmount: string
  cryptoCurrency: string
}

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [showCodes, setShowCodes] = useState<{ [key: string]: boolean }>({})
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      setProfile({
        id: 'user_123',
        email: 'gamer@example.com',
        createdAt: '2024-01-15',
        totalOrders: 12,
        totalSpent: 650,
        preferredCurrency: 'BTC',
        notifications: {
          email: true,
          orderUpdates: true,
          promotions: false
        }
      })

      setOrders([
        {
          id: 'order_001',
          date: '2024-03-15',
          status: 'completed',
          items: [{
            name: 'Steam Gift Card',
            platform: 'Steam',
            amount: 50,
            quantity: 2,
            codes: ['STEAM-XXXX-XXXX-XXXX', 'STEAM-YYYY-YYYY-YYYY']
          }],
          total: 100,
          cryptoAmount: '0.0025',
          cryptoCurrency: 'BTC'
        },
        {
          id: 'order_002',
          date: '2024-03-10',
          status: 'completed',
          items: [{
            name: 'Xbox Gift Card',
            platform: 'Xbox',
            amount: 25,
            quantity: 1,
            codes: ['XBOX-ZZZZ-ZZZZ-ZZZZ']
          }],
          total: 25,
          cryptoAmount: '0.00063',
          cryptoCurrency: 'BTC'
        },
        {
          id: 'order_003',
          date: '2024-03-08',
          status: 'pending',
          items: [{
            name: 'PlayStation Gift Card',
            platform: 'PlayStation',
            amount: 100,
            quantity: 1
          }],
          total: 100,
          cryptoAmount: '0.0025',
          cryptoCurrency: 'BTC'
        }
      ])

      setIsLoading(false)
    }, 1500)
  }, [])

  const toggleCodeVisibility = (orderId: string) => {
    setShowCodes(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-gaming-neon'
      case 'pending': return 'text-gaming-gold'
      case 'failed': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-gaming-neon/20 border-gaming-neon/30'
      case 'pending': return 'bg-gaming-gold/20 border-gaming-gold/30'
      case 'failed': return 'bg-red-400/20 border-red-400/30'
      default: return 'bg-gray-400/20 border-gray-400/30'
    }
  }

  if (isLoading) {
    return <Loading text="Loading your profile..." size="lg" fullScreen />
  }

  return (
    <ProtectedPage redirectTo="/auth?redirect=/profile">
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-gaming font-bold mb-4">
                <span className="transition-colors duration-300 dark:text-white light:text-gray-900">Your</span>
                <span className="cyber-text"> Profile</span>
              </h1>
              <p className="text-xl transition-colors duration-300 dark:text-gray-300 light:text-gray-600">
                Manage your account and view your gaming gift card history
              </p>
            </div>

            {/* Profile Overview */}
            {profile && (
              <div className="gaming-card mb-8">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="w-20 h-20 bg-gaming-purple/20 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-gaming-cyan" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-gaming font-bold text-white">{profile.email}</h2>
                    <p className="text-gray-400">Member since {new Date(profile.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30">
                    <div className="text-2xl font-gaming font-bold text-gaming-cyan">{profile.totalOrders}</div>
                    <div className="text-sm text-gray-400">Total Orders</div>
                  </div>
                  <div className="text-center p-4 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30">
                    <div className="text-2xl font-gaming font-bold text-gaming-neon">${profile.totalSpent}</div>
                    <div className="text-sm text-gray-400">Total Spent</div>
                  </div>
                  <div className="text-center p-4 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30">
                    <div className="text-2xl font-gaming font-bold text-gaming-gold">{profile.preferredCurrency}</div>
                    <div className="text-sm text-gray-400">Preferred Crypto</div>
                  </div>
                  <div className="text-center p-4 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30">
                    <div className="flex items-center justify-center">
                      <Star className="w-6 h-6 text-gaming-gold mr-2" />
                      <span className="text-2xl font-gaming font-bold text-white">VIP</span>
                    </div>
                    <div className="text-sm text-gray-400">Member Status</div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-8 bg-gaming-dark/50 p-1 rounded-lg border border-gaming-purple/30">
              {[
                { id: 'overview', label: 'Overview', icon: User },
                { id: 'orders', label: 'Order History', icon: Calendar },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gaming-purple/30 text-gaming-cyan border border-gaming-cyan/30'
                      : 'text-gray-400 hover:text-white hover:bg-gaming-purple/10'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="gaming-card">
                    <h3 className="text-xl font-gaming font-bold text-white mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30">
                          <div className="flex items-center space-x-4">
                            <Award className="w-8 h-8 text-gaming-cyan" />
                            <div>
                              <div className="font-semibold text-white">{order.items[0].name}</div>
                              <div className="text-sm text-gray-400">{new Date(order.date).toLocaleDateString()}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-white">${order.total}</div>
                            <div className={`text-sm ${getStatusColor(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="gaming-card">
                    <h3 className="text-xl font-gaming font-bold transition-colors duration-300 dark:text-white light:text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button className="p-4 rounded-lg border transition-all duration-300 dark:bg-gaming-dark/50 dark:border-gaming-purple/30 dark:hover:border-gaming-cyan/50 light:bg-gray-50 light:border-gray-200 light:hover:border-blue-400 text-left">
                        <Award className="w-8 h-8 text-gaming-cyan mb-2" />
                        <div className="font-semibold transition-colors duration-300 dark:text-white light:text-gray-900">Browse Gift Cards</div>
                        <div className="text-sm transition-colors duration-300 dark:text-gray-400 light:text-gray-500">Explore our collection</div>
                      </button>
                      <button className="p-4 rounded-lg border transition-all duration-300 dark:bg-gaming-dark/50 dark:border-gaming-purple/30 dark:hover:border-gaming-cyan/50 light:bg-gray-50 light:border-gray-200 light:hover:border-blue-400 text-left">
                        <CreditCard className="w-8 h-8 text-gaming-neon mb-2" />
                        <div className="font-semibold transition-colors duration-300 dark:text-white light:text-gray-900">Quick Purchase</div>
                        <div className="text-sm transition-colors duration-300 dark:text-gray-400 light:text-gray-500">Buy instantly</div>
                      </button>
                      <button className="p-4 rounded-lg border transition-all duration-300 dark:bg-gaming-dark/50 dark:border-gaming-purple/30 dark:hover:border-gaming-cyan/50 light:bg-gray-50 light:border-gray-200 light:hover:border-blue-400 text-left">
                        <Download className="w-8 h-8 text-gaming-gold mb-2" />
                        <div className="font-semibold transition-colors duration-300 dark:text-white light:text-gray-900">Download History</div>
                        <div className="text-sm transition-colors duration-300 dark:text-gray-400 light:text-gray-500">Export your data</div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="gaming-card">
                  <h3 className="text-xl font-gaming font-bold text-white mb-6">Order History</h3>
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="p-6 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBg(order.status)}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </div>
                            <div className="text-gray-400">
                              <Calendar className="w-4 h-4 inline mr-2" />
                              {new Date(order.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-white">${order.total}</div>
                            <div className="text-sm text-gray-400">
                              {order.cryptoAmount} {order.cryptoCurrency}
                            </div>
                          </div>
                        </div>

                        {order.items.map((item, index) => (
                          <div key={index} className="border-t border-gaming-purple/20 pt-4">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="font-semibold text-white">{item.name}</h4>
                                <p className="text-gray-400">{item.platform} • ${item.amount} × {item.quantity}</p>
                              </div>
                            </div>

                            {item.codes && item.codes.length > 0 && (
                              <div className="mt-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-gray-300">Gift Card Codes:</span>
                                  <button
                                    onClick={() => toggleCodeVisibility(order.id)}
                                    className="flex items-center space-x-2 text-sm text-gaming-cyan hover:text-gaming-neon transition-colors"
                                  >
                                    {showCodes[order.id] ? (
                                      <>
                                        <EyeOff className="w-4 h-4" />
                                        <span>Hide</span>
                                      </>
                                    ) : (
                                      <>
                                        <Eye className="w-4 h-4" />
                                        <span>Show</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                                
                                {showCodes[order.id] && (
                                  <div className="space-y-2">
                                    {item.codes.map((code, codeIndex) => (
                                      <div key={codeIndex} className="flex items-center space-x-2 p-3 bg-gaming-darker rounded border border-gaming-purple/30">
                                        <code className="flex-1 text-gaming-cyan font-mono text-sm">
                                          {code}
                                        </code>
                                        <button
                                          onClick={() => copyToClipboard(code)}
                                          className="p-2 rounded bg-gaming-purple/20 text-gaming-cyan hover:bg-gaming-purple/30 transition-colors"
                                        >
                                          <Copy className="w-4 h-4" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && profile && (
                <div className="space-y-6">
                  <div className="gaming-card">
                    <h3 className="text-xl font-gaming font-bold text-white mb-6">Account Settings</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="email"
                            value={profile.email}
                            className="input-cyber flex-1"
                            readOnly
                          />
                          <button className="btn-neon px-4 py-2">
                            Update
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Preferred Cryptocurrency
                        </label>
                        <select className="input-cyber">
                          <option value="BTC">Bitcoin (BTC)</option>
                          <option value="ETH">Ethereum (ETH)</option>
                          <option value="LTC">Litecoin (LTC)</option>
                          <option value="BCH">Bitcoin Cash (BCH)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="gaming-card">
                    <h3 className="text-xl font-gaming font-bold transition-colors duration-300 dark:text-white light:text-gray-900 mb-6">Notification Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg border transition-all duration-300 dark:bg-gaming-dark/50 dark:border-gaming-purple/30 light:bg-gray-50 light:border-gray-200">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-gaming-cyan" />
                          <div>
                            <div className="font-medium transition-colors duration-300 dark:text-white light:text-gray-900">Email Notifications</div>
                            <div className="text-sm transition-colors duration-300 dark:text-gray-400 light:text-gray-500">Receive important updates via email</div>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={profile.notifications.email} />
                          <div className="w-11 h-6 transition-colors duration-300 dark:bg-gaming-dark light:bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gaming-cyan"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30">
                        <div className="flex items-center space-x-3">
                          <Bell className="w-5 h-5 text-gaming-neon" />
                          <div>
                            <div className="font-medium text-white">Order Updates</div>
                            <div className="text-sm text-gray-400">Get notified about order status changes</div>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={profile.notifications.orderUpdates} />
                          <div className="w-11 h-6 bg-gaming-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gaming-cyan"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30">
                        <div className="flex items-center space-x-3">
                          <Gift className="w-5 h-5 text-gaming-gold" />
                          <div>
                            <div className="font-medium text-white">Promotional Offers</div>
                            <div className="text-sm text-gray-400">Receive special deals and discounts</div>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={profile.notifications.promotions} />
                          <div className="w-11 h-6 bg-gaming-dark peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gaming-cyan"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="gaming-card">
                    <h3 className="text-xl font-gaming font-bold transition-colors duration-300 dark:text-white light:text-gray-900 mb-6">Security</h3>
                    <div className="space-y-4">
                      <button className="w-full p-4 rounded-lg border transition-all duration-300 dark:bg-gaming-dark/50 dark:border-gaming-purple/30 dark:hover:border-gaming-cyan/50 light:bg-gray-50 light:border-gray-200 light:hover:border-blue-400 text-left">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-gaming-neon" />
                          <div>
                            <div className="font-medium transition-colors duration-300 dark:text-white light:text-gray-900">Two-Factor Authentication</div>
                            <div className="text-sm transition-colors duration-300 dark:text-gray-400 light:text-gray-500">Add an extra layer of security to your account</div>
                          </div>
                        </div>
                      </button>
                      
                      <button className="w-full p-4 rounded-lg border transition-all duration-300 dark:bg-gaming-dark/50 dark:border-gaming-purple/30 dark:hover:border-gaming-cyan/50 light:bg-gray-50 light:border-gray-200 light:hover:border-blue-400 text-left">
                        <div className="flex items-center space-x-3">
                          <Download className="w-5 h-5 text-gaming-gold" />
                          <div>
                            <div className="font-medium transition-colors duration-300 dark:text-white light:text-gray-900">Download Account Data</div>
                            <div className="text-sm transition-colors duration-300 dark:text-gray-400 light:text-gray-500">Export all your account information and order history</div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </ProtectedPage>
  )
} 