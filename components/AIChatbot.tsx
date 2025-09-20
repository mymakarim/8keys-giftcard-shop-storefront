'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2,
  Loader,
  Sparkles
} from '../components/icons'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AIChatbotProps {
  knowledgeBase?: string
  isOpen?: boolean
  onToggle?: () => void
}

export default function AIChatbot({ 
  knowledgeBase = '', 
  isOpen = false, 
  onToggle 
}: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m your AI assistant for GameVault. I can help answer questions about gift cards, cryptocurrency payments, security, and more. What would you like to know?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/ai-faq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          knowledgeBase: knowledgeBase,
          conversationHistory: messages.slice(-5) // Last 5 messages for context
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'I apologize, but I couldn\'t process your question right now. Please try again or contact our support team.',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('AI FAQ Error:', error)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I\'m having trouble right now. Please try asking again or contact our support team for immediate help.',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Hi! I\'m your AI assistant for GameVault. I can help answer questions about gift cards, cryptocurrency payments, security, and more. What would you like to know?',
        timestamp: new Date()
      }
    ])
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className={`fixed bottom-4 right-4 z-50 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[650px]'
      } max-w-[calc(100vw-2rem)]`}
    >
      <div className="bg-gaming-dark/95 backdrop-blur-lg border border-gaming-purple/30 rounded-lg shadow-2xl overflow-hidden h-full flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-gaming-purple/20 to-gaming-cyan/20 border-b border-gaming-purple/30 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="w-8 h-8 text-gaming-cyan" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gaming-dark"></div>
              </div>
              <div>
                <h3 className="font-gaming font-bold text-white">AI Assistant</h3>
                <p className="text-xs text-gaming-cyan">
                  {isLoading ? 'Typing...' : 'Online'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 text-gray-400 hover:text-gaming-cyan transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={clearChat}
                className="p-2 text-gray-400 hover:text-gaming-gold transition-colors"
                title="Clear chat"
              >
                <Sparkles className="w-4 h-4" />
              </button>
              <button
                onClick={onToggle}
                className="p-2 text-gray-400 hover:text-red-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        {!isMinimized && (
          <>
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar min-h-0">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${
                      message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === 'user' 
                          ? 'bg-gaming-gold/20 text-gaming-gold' 
                          : 'bg-gaming-cyan/20 text-gaming-cyan'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>
                      
                      <div className={`p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-gaming-gold/10 border border-gaming-gold/30 text-white'
                          : 'bg-gaming-purple/10 border border-gaming-purple/30 text-gray-100'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gaming-cyan/20 text-gaming-cyan flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="p-3 bg-gaming-purple/10 border border-gaming-purple/30 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Loader className="w-4 h-4 animate-spin text-gaming-cyan" />
                          <span className="text-sm text-gray-300">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div className="p-4 border-t border-gaming-purple/30 flex-shrink-0">
              <div className="flex space-x-2 mb-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about GameVault..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-gaming-dark/50 border border-gaming-purple/30 rounded-lg text-white placeholder-gray-400 focus:border-gaming-cyan/50 focus:outline-none transition-colors disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="p-2 bg-gaming-cyan/20 border border-gaming-cyan/30 text-gaming-cyan rounded-lg hover:bg-gaming-cyan/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              
              {/* Suggestion buttons */}
              <div className="flex flex-wrap gap-2">
                {[
                  'Do I need an account?',
                  'What cryptocurrencies do you accept?',
                  'How fast is delivery?',
                  'Is it anonymous and secure?'
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(suggestion)}
                    className="text-xs px-3 py-1.5 bg-gaming-purple/10 border border-gaming-purple/30 text-gaming-purple rounded hover:bg-gaming-purple/20 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
} 
