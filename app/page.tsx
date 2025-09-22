import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import Features from '../components/Features'
import PopularCards from '../components/PopularCards.server'
import Stats from '../components/Stats'
import Footer from '../components/Footer'
import { HttpTypes } from '@/lib/types'
import { debugProducts, listGiftCardProducts } from '@/lib/data/products'
import GiftCardGrid from '@/components/GiftCardGrid'
import RealGiftCardGrid from '@/components/RealGiftCardGrid'
import { Suspense } from 'react'

export default async function HomePage() {
  return (
    <main className='min-h-screen transition-colors duration-500 dark:bg-gaming-darker light:bg-gradient-to-br light:from-blue-50/80 light:via-white light:to-purple-50/80 relative overflow-hidden'>
      {/* Background Effects */}
      <div className='absolute inset-0 pointer-events-none'>
        {/* Dark theme background */}
        <div className='dark:block hidden absolute inset-0 bg-gradient-to-br from-gaming-purple/10 via-transparent to-gaming-cyan/10' />
        <div className='dark:block hidden absolute top-1/4 left-10 w-72 h-72 bg-gaming-purple/5 rounded-full blur-3xl animate-pulse' />
        <div
          className='dark:block hidden absolute bottom-1/4 right-10 w-96 h-96 bg-gaming-cyan/5 rounded-full blur-3xl animate-pulse'
          style={{ animationDelay: '2s' }}
        />

        {/* Light theme background */}
        <div className='light:block hidden absolute top-1/4 left-10 w-72 h-72 bg-blue-200/15 rounded-full blur-3xl animate-pulse' />
        <div
          className='light:block hidden absolute bottom-1/4 right-10 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl animate-pulse'
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className='relative z-10'>
        <Navigation />
        <Hero />
        <Stats />
        <Features />

        <PopularCards />

        <Footer />
      </div>
    </main>
  )
}
