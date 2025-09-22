// components/PopularCards.server.tsx
// no "use client"
import PopularCardsClient from './PopularCards.client'
import { listGiftCardProducts } from '@/lib/data/products'
import type { HttpTypes } from '@/lib/types'

export default async function PopularCards() {
  let products: HttpTypes.StoreProduct[] = []
  let error: string | null = null

  try {
    const result = await listGiftCardProducts({
      countryCode: 'us',
      queryParams: { limit: 50 }
    })
    products = result.response.products
  } catch (e: any) {
    error = e?.message ?? 'Failed to fetch products'
  }

  return <PopularCardsClient products={products} error={error} />
}
