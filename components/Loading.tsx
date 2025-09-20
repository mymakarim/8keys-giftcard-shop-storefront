'use client'

import { motion } from 'framer-motion'
import { Gamepad2 } from './icons'

// Add Loader2 icon
const Loader2: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
)

interface LoadingProps {
  text?: string
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
}

export default function Loading({ 
  text = 'Loading...', 
  size = 'md', 
  fullScreen = false 
}: LoadingProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  }

  const LoadingContent = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Animated Logo */}
      <motion.div
        className="relative"
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <Gamepad2 className={`${sizeClasses[size]} transition-colors duration-300 dark:text-gaming-cyan light:text-blue-600`} />
        
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 ${sizeClasses[size]} rounded-full blur-lg transition-colors duration-300 dark:bg-gaming-cyan/20 light:bg-blue-600/20`}
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </motion.div>

      {/* Loading Text */}
      <motion.p
        className={`${textSizeClasses[size]} font-gaming transition-colors duration-300 dark:text-white light:text-gray-900`}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {text}
      </motion.p>

      {/* Progress Bar */}
      <div className="w-48 h-1 rounded-full overflow-hidden transition-colors duration-300 dark:bg-gaming-dark light:bg-gray-200">
        <motion.div
          className="h-full transition-all duration-300 dark:bg-gradient-to-r dark:from-gaming-purple dark:to-gaming-cyan light:bg-gradient-to-r light:from-blue-500 light:to-purple-600"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full transition-colors duration-300 dark:bg-gaming-cyan light:bg-blue-600"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center transition-colors duration-500 dark:bg-gaming-darker/95 light:bg-white/95 backdrop-blur-md">
        {/* Background effects */}
        <div className="absolute inset-0 transition-opacity duration-300 dark:opacity-20 light:opacity-10">
          <div className="dark:bg-cyber-grid dark:bg-cyber light:bg-gradient-to-br light:from-blue-100/30 light:to-purple-100/30 w-full h-full" />
        </div>
        
        {/* Background orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-glow transition-colors duration-300 dark:bg-gaming-purple/10 light:bg-blue-200/20" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-glow transition-colors duration-300 dark:bg-gaming-cyan/10 light:bg-purple-200/20" />
        
        <div className="relative z-10">
          <LoadingContent />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-8">
      <LoadingContent />
    </div>
  )
}

// Spinner component for inline loading
export function Spinner({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`spinner ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  )
}

// Page loading wrapper
export function PageLoading({ children, isLoading, loadingText }: {
  children: React.ReactNode
  isLoading: boolean
  loadingText?: string
}) {
  if (isLoading) {
    return <Loading text={loadingText} size="lg" fullScreen />
  }

  return <>{children}</>
} 