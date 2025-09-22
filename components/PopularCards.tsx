// 'use client'

import { motion } from 'framer-motion'
import { Suspense, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, ArrowRight, Gift, ShoppingCart, Coins } from './icons'
import { useCart } from '../lib/cart-context'
import type { GiftCard } from '../lib/cart-context'
import error from 'next/error'
import GiftCardGrid from './GiftCardGrid'
import RealGiftCardGrid from './RealGiftCardGrid'
import { HttpTypes } from '@/lib/types'
import { listGiftCardProducts } from '@/lib/data/products'

// Add Zap and Plus icons to our icons file if not already there
const Zap: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <polygon points='13,2 3,14 12,14 11,22 21,10 12,10' />
  </svg>
)

export default async function PopularCards() {
  // const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  // const { addToCart, getItemQuantity } = useCart()

  // const popularCards: GiftCard[] = [
  //   {
  //     id: 'steam-50',
  //     name: 'Steam Gift Card',
  //     platform: 'Steam',
  //     amount: 50,
  //     currency: 'USD',
  //     usdcPrice: '47.50',
  //     rating: 4.9,
  //     reviews: 15420,
  //     discount: 5,
  //     popular: true,
  //     color: 'from-blue-600 to-blue-800',
  //     description: 'Perfect for AAA games and multiple purchases'
  //   },
  //   {
  //     id: 'xbox-25',
  //     name: 'Xbox Gift Card',
  //     platform: 'Xbox',
  //     amount: 25,
  //     currency: 'USD',
  //     usdcPrice: '24.25',
  //     rating: 4.8,
  //     reviews: 12850,
  //     discount: 3,
  //     popular: true,
  //     color: 'from-green-600 to-green-800',
  //     description: 'Great for games and subscriptions'
  //   },
  //   {
  //     id: 'playstation-30',
  //     name: 'PlayStation Store',
  //     platform: 'PlayStation',
  //     amount: 30,
  //     currency: 'USD',
  //     usdcPrice: '30.00',
  //     rating: 4.7,
  //     reviews: 9640,
  //     discount: 0,
  //     popular: false,
  //     color: 'from-blue-800 to-indigo-900',
  //     description: 'PS4 and PS5 games, add-ons, and more'
  //   },
  //   {
  //     id: 'nintendo-35',
  //     name: 'Nintendo eShop',
  //     platform: 'Nintendo',
  //     amount: 35,
  //     currency: 'USD',
  //     usdcPrice: '32.20',
  //     rating: 4.6,
  //     reviews: 7230,
  //     discount: 8,
  //     popular: false,
  //     color: 'from-red-600 to-red-800',
  //     description: 'Switch games and digital content'
  //   },
  //   {
  //     id: 'google-play-20',
  //     name: 'Google Play Card',
  //     platform: 'Google Play',
  //     amount: 20,
  //     currency: 'USD',
  //     usdcPrice: '0.00050 USDC',
  //     rating: 4.5,
  //     reviews: 18750,
  //     discount: 2,
  //     popular: true,
  //     color: 'from-green-500 to-green-700',
  //     description: 'Google Play gift cards for Android apps and games'
  //   },
  //   {
  //     id: 'apple-50',
  //     name: 'App Store & iTunes',
  //     platform: 'Apple',
  //     amount: 50,
  //     currency: 'USD',
  //     usdcPrice: '0.00125 USDC',
  //     rating: 4.8,
  //     reviews: 11200,
  //     discount: 4,
  //     popular: false,
  //     color: 'from-gray-700 to-gray-900',
  //     description: 'Apple gift cards for iTunes, App Store, and more'
  //   }
  // ]

  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.2,
  //       delayChildren: 0.3
  //     }
  //   }
  // }

  // const cardVariants = {
  //   hidden: {
  //     opacity: 0,
  //     y: 50,
  //     scale: 0.8
  //   },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     scale: 1,
  //     transition: {
  //       duration: 0.8,
  //       ease: 'easeOut'
  //     }
  //   }
  // }

  // const handleAddToCart = (card: GiftCard) => {
  //   addToCart(card)
  // }

  // Debug: Test product fetching
  console.log('---------------------------')
  console.log('Debug: Starting gift cards page...')
  await debugProducts()

  // Fetch real gift card products
  let giftCardProducts: HttpTypes.StoreProduct[] = []
  let error: Error | null = null

  try {
    console.log('Debug: Fetching gift card products...')
    const result = await listGiftCardProducts({
      countryCode: 'us',
      queryParams: {
        limit: 50
      }
    })
    giftCardProducts = result.response.products
    console.log('Debug: Gift card products fetched:', giftCardProducts.length)

    // Log detailed product information
    console.log('Debug: Detailed product information:')
    giftCardProducts.forEach((product, index) => {
      console.log(`Product ${index + 1}:`, {
        id: product.id,
        title: product.title,
        subtitle: product.subtitle,
        external_id: product.external_id,
        description: product.description,
        platform: product.metadata?.platform,
        price: product.variants?.[0]?.calculated_price?.calculated_amount,
        currency: product.variants?.[0]?.calculated_price?.currency_code
      })
    })
  } catch (err) {
    console.error('Error fetching gift card products:', err)
    error = err as Error
  }

  return (
    <section className='py-20 bg-gaming-darker/50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <div className='flex items-center justify-center mb-6'>
            <Zap className='w-8 h-8 text-gaming-neon mr-3' />
            <h2 className='text-4xl md:text-5xl font-gaming font-bold'>
              <span className='text-white'>Popular </span>
              <span className='cyber-text'>Gift Cards</span>
            </h2>
          </div>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            Top-rated gaming gift cards chosen by thousands of satisfied customers. Instant
            delivery, secure payments with USDC.
          </p>
        </motion.div>

        {/* Show real products if available, otherwise fallback to mock data */}
        {error ? (
          <div className='text-center py-12'>
            <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md mx-auto'>
              <h3 className='text-red-400 font-semibold mb-2'>Connection Error</h3>
              <p className='text-red-300 text-sm mb-4'>
                Unable to connect to the product database. Please check your backend connection.
              </p>
              <p className='text-gray-400 text-xs'>Showing demo products instead.</p>
            </div>
            <div className='mt-8'>
              <GiftCardGrid />
            </div>
          </div>
        ) : giftCardProducts.length > 0 ? (
          <Suspense
            fallback={
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className='animate-pulse'>
                    <div className='bg-gray-300 dark:bg-gray-700 h-48 rounded-t-2xl'></div>
                    <div className='p-4 space-y-3'>
                      <div className='h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4'></div>
                      <div className='h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2'></div>
                      <div className='h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3'></div>
                    </div>
                  </div>
                ))}
              </div>
            }
          >
            <RealGiftCardGrid products={giftCardProducts} />
          </Suspense>
        ) : (
          <div className='text-center py-12'>
            <div className='bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 max-w-md mx-auto'>
              <h3 className='text-yellow-400 font-semibold mb-2'>No Gift Cards Found</h3>
              <p className='text-yellow-300 text-sm mb-4'>
                No gift card products are currently available in the database.
              </p>
              <p className='text-gray-400 text-xs mb-4'>Showing demo products instead.</p>
              <div className='text-left text-xs text-gray-500'>
                <p>Debug Info:</p>
                <p>
                  • Backend URL:{' '}
                  {process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'}
                </p>
                <p>• Search Term: "Gift Card"</p>
                <p>• Products Found: {giftCardProducts.length}</p>
              </div>
            </div>
            <div className='mt-8'>
              <GiftCardGrid />
            </div>
          </div>
        )}

        {/* Cards Grid */}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className='text-center mt-16'
        >
          <Link href='/gift-cards' className='btn-neon text-lg px-8 py-4'>
            <Gift className='w-5 h-5 mr-3' />
            View All Gift Cards
            <ArrowRight className='w-5 h-5 ml-3' />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
function debugProducts() {
  throw new Error('Function not implemented.')
}
