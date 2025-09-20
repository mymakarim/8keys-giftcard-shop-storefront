'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import ProtectedPage from '../../components/ProtectedPage'
import Loading from '../../components/Loading'
import { 
  Wallet, 
  Bitcoin, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Minus,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  QrCode,
  RefreshCw,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle
} from '../../components/icons'
// Remove server-side imports
// import { getUserBalances, registerUserWithBalances, P100UserBalanceResponse, P100UserNotFoundError } from '../../lib/p100'
// import { getCustomerFromToken } from '../../lib/auth-server'

interface CryptoBalance {
  currency: string
  symbol: string
  balance: number
  usdValue: number
  change24h: number
  icon: string
  color: string
}

interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal' | 'payment'
  currency: string
  amount: number
  usdValue: number
  status: 'completed' | 'pending' | 'failed'
  date: string
  description: string
  txHash?: string
}

export default function WalletPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showBalances, setShowBalances] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [balances, setBalances] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const [totalUsdValue, setTotalUsdValue] = useState(0)
  const [externalUserId, setExternalUserId] = useState<string | null>(null)
  const [showRegistration, setShowRegistration] = useState(false)
  const [registrationError, setRegistrationError] = useState<string | null>(null)
  const [registrationLoading, setRegistrationLoading] = useState(false)
  const [registrationForm, setRegistrationForm] = useState<any | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [jwtError, setJwtError] = useState<string | null>(null)

  // Helper to map P100 crypto balances to UI format
  function mapP100CryptoBalancesToUI(p100: any) {
    return (p100.cryptoBalances || []).map((b: any) => ({
      type: 'crypto',
      currency: b.name.toUpperCase(),
      symbol: b.name.toUpperCase(),
      balance: parseFloat(b.amount),
      usdValue: b.rate ? parseFloat(b.amount) * b.rate : 0,
      change24h: 0, // Not available from P100
      icon: b.name === 'btc' ? '₿' : b.name === 'eth' ? 'Ξ' : b.name === 'ltc' ? 'Ł' : b.name === 'doge' ? 'Ð' : b.name === 'usdc' ? '$' : b.name === 'pol' ? '⧫' : '¤',
      color: b.name === 'btc' ? 'text-orange-400' : b.name === 'eth' ? 'text-blue-400' : b.name === 'ltc' ? 'text-gray-400' : b.name === 'doge' ? 'text-yellow-400' : b.name === 'usdc' ? 'text-green-400' : b.name === 'pol' ? 'text-purple-400' : 'text-gaming-cyan',
      address: b.wallet,
      networkConfig: b.networkConfig,
    }))
  }

  // Helper to map P100 fiat balances to UI format
  function mapP100FiatBalancesToUI(p100: any) {
    return (p100.fiatBalances || []).map((b: any) => ({
      type: 'fiat',
      currency: b.name.toUpperCase(),
      symbol: b.name.toUpperCase(),
      balance: parseFloat(b.amount),
      usdValue: b.rate ? parseFloat(b.amount) * b.rate : 0,
      change24h: 0,
      icon: '$',
      color: 'text-gaming-gold',
      iban: b.iban,
      status: b.status,
    }))
  }

  // Fetch user info from /api/user-info and set externalUserId
  useEffect(() => {
    async function loadUser() {
      setIsLoading(true)
      setJwtError(null)
      try {
        const res = await fetch('/api/user-info')
        if (!res.ok) {
          setJwtError('Could not get user info. Please log in again.')
          setIsLoading(false)
          return
        }
        const user = await res.json()
        setExternalUserId(user.id)
      } catch (e) {
        setJwtError('Could not get user info. Please log in again.')
      }
      setIsLoading(false)
    }
    loadUser()
  }, [])

  // Fetch balances when externalUserId is set
  useEffect(() => {
    if (!externalUserId) {
      setIsLoading(false)
      return
    }
    async function load() {
      setIsLoading(true)
      setFetchError(null)
      try {
        // Use backend proxy endpoint
        const res = await fetch(`/api/p100-balance?externalUserId=${externalUserId}`)
        const data = await res.json()
        if (!res.ok) {
          if (data.errorCode === 'P412') {
            setShowRegistration(true)
            setRegistrationForm({
              externalUserId,
              email: '',
              phone: '',
              firstName: '',
              lastName: '',
              address: '',
              city: '',
              postCode: '',
              country: '',
              citizenship: '',
              documentType: 'ID_CARD',
              documentNumber: '',
            })
          } else {
            setFetchError(data.errorMessage || data.error || 'Failed to fetch wallet balances.')
          }
          setIsLoading(false)
          return
        }
        const crypto = mapP100CryptoBalancesToUI(data)
        const fiat = mapP100FiatBalancesToUI(data)
        setBalances([...fiat, ...crypto])
        setTotalUsdValue([...fiat, ...crypto].reduce((sum: number, b: any) => sum + b.usdValue, 0))
        setShowRegistration(false)
      } catch (err: any) {
        setFetchError('Failed to fetch wallet balances.')
      }
      setIsLoading(false)
    }
    load()
  }, [externalUserId])

  // Registration form submit handler (proxy to backend)
  async function handleRegister(e: any) {
    e.preventDefault()
    setRegistrationError(null)
    setRegistrationLoading(true)
    try {
      const res = await fetch('/api/p100-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(registrationForm),
      })
      const data = await res.json()
      if (!res.ok) {
        setRegistrationError(data.errorMessage || data.errorName || data.error || 'Registration failed.')
        setRegistrationLoading(false)
        return
      }
      // After registration, fetch balances
      setExternalUserId(registrationForm.externalUserId)
      setShowRegistration(false)
    } catch (err: any) {
      setRegistrationError('Registration failed. Please check your details and try again.')
    }
    setRegistrationLoading(false)
  }

  // Registration form change handler
  function handleFormChange(e: any) {
    setRegistrationForm({ ...registrationForm, [e.target.name]: e.target.value })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit': return ArrowDownLeft
      case 'withdrawal': return ArrowUpRight
      case 'payment': return Minus
      default: return ArrowUpRight
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-gaming-neon'
      case 'pending': return 'text-gaming-gold'
      case 'failed': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle
      case 'pending': return RefreshCw
      case 'failed': return AlertCircle
      default: return RefreshCw
    }
  }

  // Remove the manual input form for externalUserId
  if (jwtError) {
    return (
      <div className="max-w-xl mx-auto mt-20 text-center text-red-500">{jwtError}</div>
    )
  }

  if (isLoading) {
    return <Loading text="Loading your wallet..." size="lg" fullScreen />
  }
  if (fetchError) {
    return <div className="max-w-xl mx-auto mt-20 text-center text-red-500">{fetchError}</div>
  }
  if (showRegistration && registrationForm) {
    return (
      <div className="max-w-xl mx-auto mt-20">
        <div className="gaming-card p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gaming-cyan">Register for Crypto Wallet</h2>
          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                <input type="text" name="firstName" value={registrationForm.firstName} onChange={handleFormChange} className="input-cyber" placeholder="First Name" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                <input type="text" name="lastName" value={registrationForm.lastName} onChange={handleFormChange} className="input-cyber" placeholder="Last Name" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input type="email" name="email" value={registrationForm.email} onChange={handleFormChange} className="input-cyber" placeholder="Email" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
              <input type="text" name="phone" value={registrationForm.phone} onChange={handleFormChange} className="input-cyber" placeholder="Phone" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
              <input type="text" name="address" value={registrationForm.address} onChange={handleFormChange} className="input-cyber" placeholder="Address" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                <input type="text" name="city" value={registrationForm.city} onChange={handleFormChange} className="input-cyber" placeholder="City" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Post Code</label>
                <input type="text" name="postCode" value={registrationForm.postCode} onChange={handleFormChange} className="input-cyber" placeholder="Post Code" required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
                <input type="text" name="country" value={registrationForm.country} onChange={handleFormChange} className="input-cyber" placeholder="Country (ISO 3166-1 alpha-2)" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Citizenship</label>
                <input type="text" name="citizenship" value={registrationForm.citizenship} onChange={handleFormChange} className="input-cyber" placeholder="Citizenship (ISO 3166-1 alpha-2)" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Document Type</label>
              <select name="documentType" value={registrationForm.documentType} onChange={handleFormChange} className="input-cyber" required>
                <option value="ID_CARD">ID Card</option>
                <option value="PASSPORT">Passport</option>
                <option value="RESIDENCE_PERMIT">Residence Permit</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Document Number</label>
              <input type="text" name="documentNumber" value={registrationForm.documentNumber} onChange={handleFormChange} className="input-cyber" placeholder="Document Number" required />
            </div>
            {registrationError && <div className="text-red-500">{registrationError}</div>}
            <button type="submit" className="btn-neon w-full" disabled={registrationLoading}>
              {registrationLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <ProtectedPage redirectTo="/auth?redirect=/wallet">
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
                <span className="transition-colors duration-300 dark:text-white light:text-gray-900">Crypto</span>
                <span className="cyber-text"> Wallet</span>
              </h1>
              <p className="text-xl transition-colors duration-300 dark:text-gray-300 light:text-gray-600">
                Manage your cryptocurrency balances and transaction history
              </p>
            </div>

            {/* Portfolio Overview */}
            <div className="gaming-card mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-gaming font-bold text-white">Portfolio Overview</h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowBalances(!showBalances)}
                    className="flex items-center space-x-2 text-gaming-cyan hover:text-gaming-neon transition-colors"
                  >
                    {showBalances ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    <span className="text-sm">{showBalances ? 'Hide' : 'Show'}</span>
                  </button>
                  <button className="p-2 rounded-lg bg-gaming-purple/20 text-gaming-cyan hover:bg-gaming-purple/30 transition-colors">
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="text-center mb-8">
                <div className="text-4xl font-gaming font-bold text-white mb-2">
                  {showBalances ? `$${totalUsdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '••••••'}
                </div>
                <div className="text-gray-400">Total Portfolio Value</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {balances.map((balance) => (
                  <motion.div
                    key={balance.symbol + balance.type}
                    className="p-6 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30 hover:border-gaming-cyan/50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`text-2xl ${balance.color}`}>{balance.icon}</div>
                        <div>
                          <div className="font-semibold text-white">{balance.currency}</div>
                          <div className="text-sm text-gray-400">{balance.symbol}</div>
                          {balance.type === 'fiat' && balance.iban && (
                            <div className="text-xs text-gaming-gold">IBAN: {balance.iban || 'N/A'}</div>
                          )}
                          {balance.type === 'fiat' && balance.status && (
                            <div className="text-xs text-gray-400">Status: {balance.status}</div>
                          )}
                        </div>
                      </div>
                      <div className={`flex items-center space-x-1 text-sm ${
                        balance.change24h >= 0 ? 'text-gaming-neon' : 'text-red-400'
                      }`}>
                        {balance.change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span>{balance.change24h >= 0 ? '+' : ''}{balance.change24h.toFixed(2)}%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Balance:</span>
                        <span className="text-white font-mono">
                          {showBalances ? balance.balance.toFixed(8) : '••••••••'} {balance.symbol}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">USD Value:</span>
                        <span className="text-gaming-cyan font-semibold">
                          {showBalances ? `$${balance.usdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '••••••'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="gaming-card mb-8">
              <h2 className="text-2xl font-gaming font-bold text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button className="p-4 bg-gaming-dark/50 rounded-lg border border-gaming-dark/30 hover:border-gaming-neon/50 transition-colors text-center">
                  <Plus className="w-8 h-8 text-gaming-neon mx-auto mb-2" />
                  <div className="font-semibold text-white">Deposit</div>
                  <div className="text-sm text-gray-400">Add funds</div>
                </button>
                <button className="p-4 bg-gaming-dark/50 rounded-lg border border-gaming-dark/30 hover:border-gaming-cyan/50 transition-colors text-center">
                  <ArrowUpRight className="w-8 h-8 text-gaming-cyan mx-auto mb-2" />
                  <div className="font-semibold text-white">Send</div>
                  <div className="text-sm text-gray-400">Transfer crypto</div>
                </button>
                <button className="p-4 bg-gaming-dark/50 rounded-lg border border-gaming-dark/30 hover:border-gaming-gold/50 transition-colors text-center">
                  <QrCode className="w-8 h-8 text-gaming-gold mx-auto mb-2" />
                  <div className="font-semibold text-white">Receive</div>
                  <div className="text-sm text-gray-400">Get address</div>
                </button>
                <button className="p-4 bg-gaming-dark/50 rounded-lg border border-gaming-dark/30 hover:border-gaming-purple/50 transition-colors text-center">
                  <Wallet className="w-8 h-8 text-gaming-purple mx-auto mb-2" />
                  <div className="font-semibold text-white">Purchase</div>
                  <div className="text-sm text-gray-400">Buy gift cards</div>
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-8 bg-gaming-dark/50 p-1 rounded-lg border border-gaming-purple/30">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'transactions', label: 'Transactions' },
                { id: 'addresses', label: 'Addresses' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 px-4 rounded-md transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gaming-purple/30 text-gaming-cyan border border-gaming-cyan/30'
                      : 'text-gray-400 hover:text-white hover:bg-gaming-purple/10'
                  }`}
                >
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
              {activeTab === 'transactions' && (
                <div className="gaming-card">
                  <h3 className="text-xl font-gaming font-bold text-white mb-6">Transaction History</h3>
                  <div className="space-y-4">
                    {transactions.map((tx) => {
                      const TransactionIcon = getTransactionIcon(tx.type)
                      const StatusIcon = getStatusIcon(tx.status)
                      
                      return (
                        <div key={tx.id} className="p-4 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className={`p-2 rounded-lg ${
                                tx.type === 'deposit' ? 'bg-gaming-neon/20 text-gaming-neon' :
                                tx.type === 'withdrawal' ? 'bg-gaming-cyan/20 text-gaming-cyan' :
                                'bg-gaming-gold/20 text-gaming-gold'
                              }`}>
                                <TransactionIcon className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="font-semibold text-white">{tx.description}</div>
                                <div className="text-sm text-gray-400">
                                  {new Date(tx.date).toLocaleDateString()} • {new Date(tx.date).toLocaleTimeString()}
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className={`font-bold ${tx.amount >= 0 ? 'text-gaming-neon' : 'text-white'}`}>
                                {tx.amount >= 0 ? '+' : ''}{tx.amount.toFixed(8)} {tx.currency}
                              </div>
                              <div className="text-sm text-gray-400">
                                ${Math.abs(tx.usdValue).toFixed(2)}
                              </div>
                              <div className={`flex items-center justify-end space-x-1 text-sm ${getStatusColor(tx.status)}`}>
                                <StatusIcon className="w-4 h-4" />
                                <span>{tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}</span>
                              </div>
                            </div>
                          </div>
                          
                          {tx.txHash && (
                            <div className="mt-3 pt-3 border-t border-gaming-purple/20">
                              <div className="flex items-center space-x-2 text-sm">
                                <span className="text-gray-400">TX Hash:</span>
                                <code className="text-gaming-cyan font-mono">{tx.txHash}</code>
                                <button
                                  onClick={() => copyToClipboard(tx.txHash!)}
                                  className="p-1 rounded text-gaming-cyan hover:text-gaming-neon transition-colors"
                                >
                                  <Copy className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="gaming-card">
                  <h3 className="text-xl font-gaming font-bold text-white mb-6">Receiving Addresses</h3>
                  <div className="space-y-6">
                    {balances
                      .filter((balance) => balance.type === 'crypto')
                      .map((balance) => (
                        <div key={balance.symbol} className="p-6 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className={`text-2xl ${balance.color}`}>{balance.icon}</div>
                              <div>
                                <div className="font-semibold text-white">{balance.currency}</div>
                                <div className="text-sm text-gray-400">{balance.symbol} Address</div>
                              </div>
                            </div>
                            <button className="btn-neon px-4 py-2" disabled={!balance.address}>
                              <QrCode className="w-4 h-4 mr-2" />
                              QR Code
                            </button>
                          </div>
                          <div className="flex items-center space-x-2 p-3 bg-gaming-darker rounded border border-gaming-purple/30">
                            <code className="flex-1 text-gaming-cyan font-mono text-sm break-all">
                              {balance.address ? balance.address : 'Not available yet'}
                            </code>
                            <button
                              onClick={() => balance.address && copyToClipboard(balance.address)}
                              className="p-2 rounded bg-gaming-purple/20 text-gaming-cyan hover:bg-gaming-purple/30 transition-colors"
                              disabled={!balance.address}
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-400 mt-2">
                            {balance.address
                              ? `Send only ${balance.currency} to this address.`
                              : 'Wallet address will be available after activation or first deposit.'}
                          </p>
                        </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="gaming-card">
                    <h3 className="text-xl font-gaming font-bold text-white mb-6">Recent Transactions</h3>
                    <div className="space-y-4">
                      {transactions.slice(0, 5).map((tx) => {
                        const TransactionIcon = getTransactionIcon(tx.type)
                        
                        return (
                          <div key={tx.id} className="flex items-center justify-between p-4 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30">
                            <div className="flex items-center space-x-4">
                              <div className={`p-2 rounded-lg ${
                                tx.type === 'deposit' ? 'bg-gaming-neon/20 text-gaming-neon' :
                                tx.type === 'withdrawal' ? 'bg-gaming-cyan/20 text-gaming-cyan' :
                                'bg-gaming-gold/20 text-gaming-gold'
                              }`}>
                                <TransactionIcon className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="font-semibold text-white">{tx.description}</div>
                                <div className="text-sm text-gray-400">{new Date(tx.date).toLocaleDateString()}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`font-bold ${tx.amount >= 0 ? 'text-gaming-neon' : 'text-white'}`}>
                                {tx.amount >= 0 ? '+' : ''}{tx.amount.toFixed(8)} {tx.currency}
                              </div>
                              <div className="text-sm text-gray-400">${Math.abs(tx.usdValue).toFixed(2)}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="gaming-card">
                    <h3 className="text-xl font-gaming font-bold text-white mb-6">Wallet Security</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gaming-neon/10 rounded-lg border border-gaming-neon/30">
                        <div className="flex items-center space-x-3 mb-2">
                          <CheckCircle className="w-5 h-5 text-gaming-neon" />
                          <span className="font-semibold text-gaming-neon">Encrypted Storage</span>
                        </div>
                        <p className="text-sm text-gray-400">Your private keys are encrypted and stored securely</p>
                      </div>
                      
                      <div className="p-4 bg-gaming-cyan/10 rounded-lg border border-gaming-cyan/30">
                        <div className="flex items-center space-x-3 mb-2">
                          <CheckCircle className="w-5 h-5 text-gaming-cyan" />
                          <span className="font-semibold text-gaming-cyan">Multi-Signature</span>
                        </div>
                        <p className="text-sm text-gray-400">Enhanced security with multi-signature protection</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
        
        <Footer />
      </main>
    </ProtectedPage>
  )
} 