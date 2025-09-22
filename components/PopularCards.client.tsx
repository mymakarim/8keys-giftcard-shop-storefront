// components/PopularCards.client.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import GiftCardGrid from './GiftCardGrid'
import RealGiftCardGrid from './RealGiftCardGrid'
import type { HttpTypes } from '@/lib/types'
import { Gift, ArrowRight } from './icons'

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

export default function PopularCardsClient({
  products,
  error
}: {
  products: HttpTypes.StoreProduct[]
  error: string | null
}) {
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

        {/* Data states */}
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
        ) : products.length > 0 ? (
          <RealGiftCardGrid products={products} />
        ) : (
          <div className='text-center py-12'>
            <div className='bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 max-w-md mx-auto'>
              <h3 className='text-yellow-400 font-semibold mb-2'>No Gift Cards Found</h3>
              <p className='text-yellow-300 text-sm mb-4'>
                No gift card products are currently available in the database.
              </p>
              <p className='text-gray-400 text-xs mb-4'>Showing demo products instead.</p>
            </div>
            <div className='mt-8'>
              <GiftCardGrid />
            </div>
          </div>
        )}

        {/* CTA */}
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
