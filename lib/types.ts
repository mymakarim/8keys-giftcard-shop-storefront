// Types for Medusa store products
export namespace HttpTypes {
  export interface StoreProduct {
    id: string
    title: string
    handle: string
    subtitle?: string
    external_id?: string
    description?: string
    thumbnail?: string
    images?: Array<{
      id: string
      url: string
      alt?: string
    }>
    variants?: Array<{
      id: string
      title: string
      sku?: string
      calculated_price?: {
        calculated_amount: number
        currency_code: string
        original_amount?: number
      }
      prices?: Array<{
        amount: number
        currency_code: string
      }>
      inventory_quantity?: number
    }>
    metadata?: Record<string, any>
    tags?: Array<{
      id: string
      value: string
    }>
    options?: Array<{
      id: string
      value: string
    }>
    collection_id?: string
    created_at?: string
    updated_at?: string
  }

  export interface StoreProductParams {
    id?: string[]
    handle?: string
    collection_id?: string[]
    category_id?: string[]
    tag_id?: string[]
    is_giftcard?: boolean
  }

  export interface FindParams {
    limit?: number
    offset?: number
    fields?: string
    order?: string
  }

  export interface StoreRegion {
    id: string
    name: string
    currency_code: string
    countries?: Array<{
      id: string
      iso_2: string
      iso_3: string
      num_code: string
      name: string
    }>
  }
} 