'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from './icons'
import { useTheme } from '../lib/theme-context'

interface ThemeToggleProps {
  className?: string
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative flex items-center justify-center w-12 h-12 rounded-lg border-2 transition-all duration-300 group ${
        theme === 'dark'
          ? 'bg-gaming-dark border-gaming-purple/30 hover:border-gaming-cyan/50 text-gaming-cyan'
          : 'bg-white border-gray-300 hover:border-blue-400 text-blue-600 shadow-lg'
      } ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon */}
        <motion.div
          initial={false}
          animate={{
            scale: theme === 'light' ? 1 : 0,
            rotate: theme === 'light' ? 0 : 180,
            opacity: theme === 'light' ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="w-6 h-6" />
        </motion.div>

        {/* Moon Icon */}
        <motion.div
          initial={false}
          animate={{
            scale: theme === 'dark' ? 1 : 0,
            rotate: theme === 'dark' ? 0 : -180,
            opacity: theme === 'dark' ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="w-6 h-6" />
        </motion.div>
      </div>

      {/* Hover glow effect */}
      <div
        className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-gaming-purple to-gaming-cyan'
            : 'bg-gradient-to-r from-blue-400 to-purple-500'
        }`}
      />
    </motion.button>
  )
} 