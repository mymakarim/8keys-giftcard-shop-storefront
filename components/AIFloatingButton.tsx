'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, MessageCircle } from '../components/icons'
import AIChatbot from './AIChatbot'

interface AIFloatingButtonProps {
  knowledgeBase?: string
}

export default function AIFloatingButton({ knowledgeBase }: AIFloatingButtonProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <>
      {/* Floating AI Button */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-4 right-4 z-40 w-16 h-16 bg-gradient-to-r from-gaming-purple to-gaming-cyan rounded-full shadow-2xl border border-gaming-cyan/30 flex items-center justify-center hover:shadow-gaming-cyan/20 transition-all duration-300"
          >
            {/* Pulsing animation */}
            <div className="absolute inset-0 rounded-full bg-gaming-cyan/20 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-gaming-cyan/10 animate-pulse"></div>
            
            {/* Icon */}
            <Bot className="w-8 h-8 text-white relative z-10" />
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gaming-dark/90 text-white text-sm rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-gaming-purple/30">
              Ask AI Assistant
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gaming-dark/90"></div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* AI Chatbot */}
      <AnimatePresence>
        <AIChatbot
          isOpen={isChatOpen}
          onToggle={() => setIsChatOpen(!isChatOpen)}
          knowledgeBase={knowledgeBase}
        />
      </AnimatePresence>
    </>
  )
} 
