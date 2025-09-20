'use client'

import React from 'react'
import { CartProvider } from '../lib/cart-context'
import { ThemeProvider } from '../lib/theme-context'
import { SearchProvider } from '../lib/search-context'
import { AuthProvider } from '../lib/auth-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <SearchProvider>
            {children}
          </SearchProvider>
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  )
} 