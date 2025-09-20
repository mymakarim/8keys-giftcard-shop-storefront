import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { Providers } from './providers'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'GameVault Gift Cards - Premium Gaming Gift Card Platform',
  description: 'Purchase premium gaming gift cards with cryptocurrency. Instant delivery, secure transactions, and luxury gaming experience.',
  keywords: 'gaming gift cards, crypto payment, p100, gaming platform, digital gifts',
  authors: [{ name: 'GameVault Team' }],
  creator: 'GameVault',
  publisher: 'GameVault',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://gamevault-giftcards.com'),
  openGraph: {
    title: 'GameVault Gift Cards',
    description: 'Premium gaming gift cards with crypto payments',
    url: 'https://gamevault-giftcards.com',
    siteName: 'GameVault Gift Cards',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GameVault Gift Cards',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GameVault Gift Cards',
    description: 'Premium gaming gift cards with crypto payments',
    images: ['/og-image.jpg'],
    creator: '@gamevault',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1a1a2e" />
      </head>
      <body className="antialiased font-sans">
        <Providers>
          <div className="min-h-screen relative overflow-x-hidden transition-all duration-500">
            {/* Background Effects - Dark Theme */}
            <div className="dark:block hidden fixed inset-0 bg-cyber-grid bg-cyber opacity-30 pointer-events-none" />
            <div className="dark:block hidden fixed inset-0 bg-gradient-to-br from-gaming-purple/20 via-transparent to-gaming-cyan/20 pointer-events-none" />
            
            {/* Background Effects - Light Theme */}
            <div className="light:block hidden fixed inset-0 bg-gradient-to-br from-blue-50/80 via-white to-purple-50/80 pointer-events-none" />
            <div className="light:block hidden fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.08),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_50%)] pointer-events-none" />
            
            {/* Animated Background Elements - Dark */}
            <div className="dark:block hidden fixed top-10 left-10 w-64 h-64 bg-gaming-purple/10 rounded-full blur-3xl animate-float pointer-events-none" />
            <div className="dark:block hidden fixed bottom-10 right-10 w-96 h-96 bg-gaming-cyan/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
            <div className="dark:block hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gaming-neon/5 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
            
            {/* Animated Background Elements - Light */}
            <div className="light:block hidden fixed top-10 left-10 w-64 h-64 bg-blue-200/15 rounded-full blur-3xl animate-float pointer-events-none" />
            <div className="light:block hidden fixed bottom-10 right-10 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
            <div className="light:block hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/20 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
            
            {/* Main Content with Navbar and Footer */}
            <div className="relative z-10 flex flex-col min-h-screen">
              <Navigation />
              <main className="flex-1">
                {children}
              </main>

            </div>
            
            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                className: 'dark:bg-gaming-dark/95 light:bg-white dark:text-gaming-cyan light:text-blue-600 dark:border-gaming-purple/30 light:border-gray-200 dark:shadow-cyber light:shadow-lg',
                style: {
                  borderRadius: '12px',
                  padding: '16px',
                  fontSize: '14px',
                  fontWeight: '600',
                },
                success: {
                  iconTheme: {
                    primary: 'var(--gaming-cyan)',
                    secondary: 'var(--gaming-dark)',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ff6b6b',
                    secondary: 'var(--gaming-dark)',
                  },
                },
              }}
            />
          </div>
        </Providers>
      </body>
    </html>
  )
} 