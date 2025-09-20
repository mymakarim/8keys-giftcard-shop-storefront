'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Loading, { Spinner } from '../../components/Loading'
import ProtectedPage from '../../components/ProtectedPage'
import { useAuth } from '../../lib/auth-context'
import { 
  CreditCard, 
  Plus, 
  Eye, 
  EyeOff, 
  Copy, 
  Settings, 
  Lock, 
  Unlock, 
  Trash2,
  AlertCircle,
  CheckCircle,
  Clock,
  Shield,
  Zap
} from '../../components/icons'

interface VirtualCard {
  cardId: string
  status: 'ACTIVE' | 'LOCKED_BY_USER' | 'BLOCKED' | 'SUSPENDED' | 'DELETED'
  label: string
  cardLastDigits: string
}

interface VirtualCardDetails {
  status: 'ACTIVE' | 'LOCKED_BY_USER' | 'BLOCKED' | 'SUSPENDED' | 'DELETED'
  cardNumber: string
  cvv: string
  exp: string
}

interface CardLimits {
  monthlyTrxAll: number
  dailyTrxAll: number
  monthlyTrxAtm: number
  dailyTrxAtm: number
  monthlyTrxEcom: number
  dailyTrxEcom: number
}

export default function VirtualCardsPage() {
  const { customer } = useAuth()
  const [cards, setCards] = useState<VirtualCard[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCreateCard, setShowCreateCard] = useState(false)
  const [selectedCard, setSelectedCard] = useState<VirtualCard | null>(null)
  const [cardDetails, setCardDetails] = useState<VirtualCardDetails | null>(null)
  const [cardLimits, setCardLimits] = useState<CardLimits | null>(null)
  const [showCardDetails, setShowCardDetails] = useState(false)
  const [showCardNumber, setShowCardNumber] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [actionMessage, setActionMessage] = useState<string | null>(null)

  // Create card form state
  const [createCardForm, setCreateCardForm] = useState({
    label: '',
    pin: ''
  })

  // Fetch user's virtual cards
  const fetchCards = async () => {
    if (!customer?.id) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/p100-virtual-card?externalUserId=${customer.id}`)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to fetch cards')
      }
      
      const data = await response.json()
      setCards(data.cards || [])
    } catch (err) {
      console.error('Error fetching cards:', err)
      setError(err instanceof Error ? err.message : 'Failed to load cards')
    } finally {
      setIsLoading(false)
    }
  }

  // Create new virtual card
  const createCard = async () => {
    if (!customer?.id) return
    
    setIsProcessing(true)
    setError(null)
    
    try {
      const response = await fetch('/api/p100-virtual-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          externalUserId: customer.id,
          label: createCardForm.label,
          pin: createCardForm.pin
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || errorData.details || 'Failed to create card')
      }
      
      const data = await response.json()
      setActionMessage('Virtual card created successfully!')
      setCreateCardForm({ label: '', pin: '' })
      setShowCreateCard(false)
      
      // Refresh cards list
      await fetchCards()
    } catch (err) {
      console.error('Error creating card:', err)
      setError(err instanceof Error ? err.message : 'Failed to create card')
    } finally {
      setIsProcessing(false)
    }
  }

  // Fetch card details
  const fetchCardDetails = async (card: VirtualCard) => {
    if (!customer?.id) return
    
    setIsProcessing(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/p100-virtual-card/${card.cardId}?externalUserId=${customer.id}`)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to fetch card details')
      }
      
      const data = await response.json()
      setCardDetails(data.card)
      setSelectedCard(card)
      setShowCardDetails(true)
      
      // Also fetch card limits
      await fetchCardLimits(card)
    } catch (err) {
      console.error('Error fetching card details:', err)
      setError(err instanceof Error ? err.message : 'Failed to load card details')
    } finally {
      setIsProcessing(false)
    }
  }

  // Fetch card limits
  const fetchCardLimits = async (card: VirtualCard) => {
    if (!customer?.id) return
    
    try {
      const response = await fetch(`/api/p100-virtual-card/${card.cardId}/limits?externalUserId=${customer.id}`)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to fetch card limits')
      }
      
      const data = await response.json()
      setCardLimits(data.limits)
    } catch (err) {
      console.error('Error fetching card limits:', err)
    }
  }

  // Block/Unblock card
  const toggleCardBlock = async (card: VirtualCard) => {
    if (!customer?.id) return
    
    setIsProcessing(true)
    setError(null)
    
    try {
      const action = card.status === 'ACTIVE' ? 'block' : 'unblock'
      
      const response = await fetch(`/api/p100-virtual-card/${card.cardId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          externalUserId: customer.id,
          action: action
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to update card')
      }
      
      setActionMessage(`Card ${action}ed successfully!`)
      await fetchCards()
      
      // Close details if this card was selected
      if (selectedCard?.cardId === card.cardId) {
        setShowCardDetails(false)
        setSelectedCard(null)
        setCardDetails(null)
      }
    } catch (err) {
      console.error('Error toggling card block:', err)
      setError(err instanceof Error ? err.message : 'Failed to update card')
    } finally {
      setIsProcessing(false)
    }
  }

  // Delete card
  const deleteCard = async (card: VirtualCard) => {
    if (!customer?.id) return
    if (!confirm('Are you sure you want to delete this card? This action cannot be undone.')) return
    
    setIsProcessing(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/p100-virtual-card/${card.cardId}?externalUserId=${customer.id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to delete card')
      }
      
      setActionMessage('Card deleted successfully!')
      await fetchCards()
      
      // Close details if this card was selected
      if (selectedCard?.cardId === card.cardId) {
        setShowCardDetails(false)
        setSelectedCard(null)
        setCardDetails(null)
      }
    } catch (err) {
      console.error('Error deleting card:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete card')
    } finally {
      setIsProcessing(false)
    }
  }

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setActionMessage('Copied to clipboard!')
  }

  // Get status color and icon
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return { color: 'text-green-400', icon: CheckCircle, text: 'Active' }
      case 'LOCKED_BY_USER':
      case 'BLOCKED':
        return { color: 'text-red-400', icon: Lock, text: 'Blocked' }
      case 'SUSPENDED':
        return { color: 'text-yellow-400', icon: Clock, text: 'Suspended' }
      case 'DELETED':
        return { color: 'text-gray-400', icon: Trash2, text: 'Deleted' }
      default:
        return { color: 'text-gray-400', icon: AlertCircle, text: status }
    }
  }

  useEffect(() => {
    if (customer?.id) {
      fetchCards()
    }
  }, [customer?.id])

  // Clear action message after 3 seconds
  useEffect(() => {
    if (actionMessage) {
      const timer = setTimeout(() => {
        setActionMessage(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [actionMessage])

  if (isLoading) {
    return (
      <ProtectedPage redirectTo="/auth?redirect=/virtual-cards">
        <div className="min-h-screen bg-gradient-to-br from-gaming-dark via-gaming-purple to-gaming-dark">
          <Navigation />
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loading />
          </div>
          <Footer />
        </div>
      </ProtectedPage>
    )
  }

  return (
    <ProtectedPage redirectTo="/auth?redirect=/virtual-cards">
      <div className="min-h-screen bg-gradient-to-br from-gaming-dark via-gaming-purple to-gaming-dark">
        <Navigation />
        
        <div className="container mx-auto px-4 py-8 mt-16">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-gaming font-bold text-white mb-2">Virtual Cards</h1>
              <p className="text-gray-400">Manage your P100 virtual cards</p>
            </div>
            <button
              onClick={() => setShowCreateCard(true)}
              className="btn-neon"
              disabled={cards.length >= 10}
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Card
            </button>
          </div>

          {/* Action Message */}
          <AnimatePresence>
            {actionMessage && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="gaming-card bg-green-500/10 border-green-500/30 mb-6"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-green-300">{actionMessage}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          {error && (
            <div className="gaming-card bg-red-500/10 border-red-500/30 mb-6">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-red-400" />
                <span className="text-red-300">{error}</span>
              </div>
            </div>
          )}

          {/* Cards Grid */}
          {cards.length === 0 ? (
            <div className="gaming-card text-center py-12">
              <CreditCard className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-white mb-2">No Virtual Cards</h3>
              <p className="text-gray-400 mb-6">Create your first virtual card to get started</p>
              <button
                onClick={() => setShowCreateCard(true)}
                className="btn-neon"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Card
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card) => {
                const statusDisplay = getStatusDisplay(card.status)
                const StatusIcon = statusDisplay.icon
                
                return (
                  <motion.div
                    key={card.cardId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="gaming-card relative"
                  >
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`w-5 h-5 ${statusDisplay.color}`} />
                        <span className={`text-sm ${statusDisplay.color}`}>
                          {statusDisplay.text}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => fetchCardDetails(card)}
                          className="text-gaming-cyan hover:text-gaming-gold transition-colors"
                          disabled={isProcessing}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleCardBlock(card)}
                          className="text-gray-400 hover:text-white transition-colors"
                          disabled={isProcessing || card.status === 'DELETED'}
                        >
                          {card.status === 'ACTIVE' ? (
                            <Lock className="w-4 h-4" />
                          ) : (
                            <Unlock className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => deleteCard(card)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          disabled={isProcessing || card.status === 'DELETED'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Card Visual */}
                    <div className="relative mb-4">
                      <div className="bg-gradient-to-r from-gaming-gold to-gaming-neon rounded-lg p-6 aspect-[1.6/1] flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <CreditCard className="w-8 h-8 text-gaming-dark" />
                          <div className="text-gaming-dark text-sm font-semibold">
                            P100
                          </div>
                        </div>
                        <div>
                          <div className="text-gaming-dark text-lg font-mono">
                            •••• •••• •••• {card.cardLastDigits}
                          </div>
                          <div className="text-gaming-dark text-sm mt-2 font-semibold">
                            {card.label}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Info */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Label:</span>
                        <span className="text-white">{card.label}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Card ID:</span>
                        <span className="text-white font-mono text-sm">
                          {card.cardId.slice(0, 8)}...
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* Card Limit Info */}
          <div className="gaming-card mt-8">
            <h3 className="text-lg font-semibold text-white mb-4">Card Limits & Fees</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gaming-gold mb-3">Usage Limits</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Maximum 10 cards per user</li>
                  <li>• 5 cards per 24 hours</li>
                  <li>• 10 cards per 30 days</li>
                  <li>• 20 cards per year</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gaming-gold mb-3">Fees & Costs</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Monthly fee: €0.25 per card</li>
                  <li>• Creation: Free</li>
                  <li>• Transactions: Standard rates apply</li>
                  <li>• Currency: EUR</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Supported Countries */}
          <div className="gaming-card mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Supported Countries</h3>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-2 text-sm text-gray-300">
              {['AT', 'BE', 'BG', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GR', 'HR', 'HU', 'IE', 'IT', 'LT', 'LU', 'LV', 'MT', 'NL', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK'].map((country) => (
                <div key={country} className="bg-gaming-cyan/10 rounded px-2 py-1 text-center">
                  {country}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Create Card Modal */}
        <AnimatePresence>
          {showCreateCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setShowCreateCard(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="gaming-card max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-semibold text-white mb-6">Create Virtual Card</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Card Label (3-30 characters)
                    </label>
                    <input
                      type="text"
                      value={createCardForm.label}
                      onChange={(e) => setCreateCardForm({ ...createCardForm, label: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gaming-cyan/30 bg-gaming-dark/50 text-white placeholder-gray-400 focus:border-gaming-neon focus:outline-none transition-colors"
                      placeholder="Shopping Card"
                      maxLength={30}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      PIN (4 digits)
                    </label>
                    <input
                      type="password"
                      value={createCardForm.pin}
                      onChange={(e) => setCreateCardForm({ ...createCardForm, pin: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gaming-cyan/30 bg-gaming-dark/50 text-white placeholder-gray-400 focus:border-gaming-neon focus:outline-none transition-colors"
                      placeholder="1234"
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowCreateCard(false)}
                    className="btn-secondary"
                    disabled={isProcessing}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createCard}
                    disabled={isProcessing || !createCardForm.label || createCardForm.pin.length !== 4}
                    className="btn-neon"
                  >
                    {isProcessing ? (
                      <>
                        <Spinner className="w-5 h-5 mr-2" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5 mr-2" />
                        Create Card
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card Details Modal */}
        <AnimatePresence>
          {showCardDetails && selectedCard && cardDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => {
                setShowCardDetails(false)
                setSelectedCard(null)
                setCardDetails(null)
                setCardLimits(null)
                setShowCardNumber(false)
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="gaming-card max-w-lg w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-semibold text-white mb-6">Card Details</h3>
                
                {/* Card Visual */}
                <div className="bg-gradient-to-r from-gaming-gold to-gaming-neon rounded-lg p-6 aspect-[1.6/1] flex flex-col justify-between mb-6">
                  <div className="flex justify-between items-start">
                    <CreditCard className="w-8 h-8 text-gaming-dark" />
                    <div className="text-gaming-dark text-sm font-semibold">P100</div>
                  </div>
                  <div>
                    <div className="text-gaming-dark text-lg font-mono">
                      {showCardNumber ? cardDetails.cardNumber : '•••• •••• •••• ' + selectedCard.cardLastDigits}
                    </div>
                    <div className="flex justify-between items-end mt-2">
                      <div className="text-gaming-dark text-sm font-semibold">
                        {selectedCard.label}
                      </div>
                      <div className="text-gaming-dark text-sm">
                        {showCardNumber ? cardDetails.exp : '••/••'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Information */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Card Number:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-mono">
                        {showCardNumber ? cardDetails.cardNumber : '•••• •••• •••• ' + selectedCard.cardLastDigits}
                      </span>
                      <button
                        onClick={() => setShowCardNumber(!showCardNumber)}
                        className="text-gaming-cyan hover:text-gaming-gold transition-colors"
                      >
                        {showCardNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      {showCardNumber && (
                        <button
                          onClick={() => copyToClipboard(cardDetails.cardNumber)}
                          className="text-gaming-cyan hover:text-gaming-gold transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">CVV:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-mono">
                        {showCardNumber ? cardDetails.cvv : '•••'}
                      </span>
                      {showCardNumber && (
                        <button
                          onClick={() => copyToClipboard(cardDetails.cvv)}
                          className="text-gaming-cyan hover:text-gaming-gold transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Expiry:</span>
                    <span className="text-white font-mono">
                      {showCardNumber ? cardDetails.exp : '••/••'}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={getStatusDisplay(cardDetails.status).color}>
                      {getStatusDisplay(cardDetails.status).text}
                    </span>
                  </div>

                  {/* Card Limits */}
                  {cardLimits && (
                    <div className="border-t border-gaming-cyan/30 pt-4">
                      <h4 className="font-semibold text-gaming-gold mb-3">Transaction Limits</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">Daily Total:</div>
                          <div className="text-white">€{cardLimits.dailyTrxAll}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Monthly Total:</div>
                          <div className="text-white">€{cardLimits.monthlyTrxAll}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Daily ATM:</div>
                          <div className="text-white">€{cardLimits.dailyTrxAtm}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Monthly ATM:</div>
                          <div className="text-white">€{cardLimits.monthlyTrxAtm}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Daily E-commerce:</div>
                          <div className="text-white">€{cardLimits.dailyTrxEcom}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Monthly E-commerce:</div>
                          <div className="text-white">€{cardLimits.monthlyTrxEcom}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => {
                      setShowCardDetails(false)
                      setSelectedCard(null)
                      setCardDetails(null)
                      setCardLimits(null)
                      setShowCardNumber(false)
                    }}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Footer />
      </div>
    </ProtectedPage>
  )
} 