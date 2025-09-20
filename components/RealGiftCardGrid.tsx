'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  SlidersHorizontal,
  Grid3X3,
  List,
} from './icons'
import { useSearch } from '../lib/search-context'
import ProductCard from './ProductCard'
import { HttpTypes } from '../lib/types'

interface RealGiftCardGridProps {
  products: HttpTypes.StoreProduct[]
}

export default function RealGiftCardGrid({ products }: RealGiftCardGridProps) {
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('popular')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  
  const { searchTerm, setSearchTerm } = useSearch()

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.metadata?.platform?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Platform filter
    if (selectedPlatform !== 'all') {
      filtered = filtered.filter(product => {
        const platform = product.metadata?.platform || product.title?.split(' ')[0] || ''
        return platform.toLowerCase() === selectedPlatform.toLowerCase()
      })
    }

    // Price range filter
    if (priceRange !== 'all') {
      filtered = filtered.filter(product => {
        const price = product.variants?.[0]?.calculated_price?.calculated_amount || 0
        const priceInDollars = price

        switch (priceRange) {
          case 'under-25':
            return priceInDollars < 25
          case '25-50':
            return priceInDollars >= 25 && priceInDollars <= 50
          case '50-100':
            return priceInDollars > 50 && priceInDollars <= 100
          case 'over-100':
            return priceInDollars > 100
          default:
            return true
        }
      })
    }

    // Sort products
    filtered.sort((a, b) => {
      const priceA = a.variants?.[0]?.calculated_price?.calculated_amount || 0
      const priceB = b.variants?.[0]?.calculated_price?.calculated_amount || 0

      switch (sortBy) {
        case 'price-low':
          return priceA - priceB
        case 'price-high':
          return priceB - priceA
        case 'name':
          return a.title.localeCompare(b.title)
        case 'popular':
        default:
          // Sort by popularity (using metadata or default order)
          const popularityA = a.metadata?.popular ? 1 : 0
          const popularityB = b.metadata?.popular ? 1 : 0
          return popularityB - popularityA
      }
    })

    return filtered
  }, [products, searchTerm, selectedPlatform, priceRange, sortBy])

  // Get unique platforms for filter
  const platforms = useMemo(() => {
    const platformSet = new Set<string>()
    products.forEach(product => {
      const platform = product.metadata?.platform || product.title?.split(' ')[0] || 'Other'
      platformSet.add(platform)
    })
    return Array.from(platformSet).sort()
  }, [products])

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search gift cards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 dark:bg-zinc-900/30 border border-white/20 dark:border-zinc-700/30 rounded-xl backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Filter className="h-5 w-5" />
          <span>Filters</span>
          <SlidersHorizontal className="h-4 w-4" />
        </button>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2 bg-white/10 dark:bg-zinc-900/30 rounded-xl p-1 backdrop-blur-sm border border-white/20 dark:border-zinc-700/30">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all duration-300 ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <Grid3X3 className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all duration-300 ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 dark:bg-zinc-900/30 backdrop-blur-sm border border-white/20 dark:border-zinc-700/30 rounded-2xl p-6 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Platform Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Platform
                </label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 dark:bg-zinc-800/50 border border-white/30 dark:border-zinc-600/50 rounded-xl backdrop-blur-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="all">All Platforms</option>
                  {platforms.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 dark:bg-zinc-800/50 border border-white/30 dark:border-zinc-600/50 rounded-xl backdrop-blur-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="all">All Prices</option>
                  <option value="under-25">Under $25</option>
                  <option value="25-50">$25 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="over-100">Over $100</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 dark:bg-zinc-800/50 border border-white/30 dark:border-zinc-600/50 rounded-xl backdrop-blur-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600 dark:text-gray-400">
          Showing {filteredAndSortedProducts.length} of {products.length} gift cards
        </p>
      </div>

      {/* Products Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          <AnimatePresence>
            {filteredAndSortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <ProductCard product={product} countryCode="us" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-500/10 border border-gray-500/20 rounded-lg p-6 max-w-md mx-auto">
            <h3 className="text-gray-400 font-semibold mb-2">No Products Found</h3>
            <p className="text-gray-300 text-sm">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 