'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Link from 'next/link'
import { 
  Calendar, 
  User, 
  ArrowRight, 
  Clock, 
  Tag,
  Star,
  Shield,
  Bitcoin,
  Globe,
  Zap,
  Search,
  Gamepad2,
  TrendingUp
} from '../../components/icons'

export default function BlogPage() {
  const featuredPost = {
    id: 1,
    title: 'The Future of Gaming: How Cryptocurrency is Revolutionizing Digital Commerce',
    excerpt: 'Explore how blockchain technology and cryptocurrencies are transforming the way gamers purchase and own digital content.',
    content: 'The gaming industry is experiencing a paradigm shift...',
    author: 'Alex Chen',
    date: '2024-03-15',
    readTime: '8 min read',
    category: 'Technology',
    image: '/blog/crypto-gaming.jpg',
    tags: ['Cryptocurrency', 'Gaming', 'Blockchain', 'Digital Commerce']
  }

  const blogPosts = [
    {
      id: 2,
      title: 'Top 10 Gaming Platforms Accepting Cryptocurrency in 2024',
      excerpt: 'Discover the leading gaming platforms that have embraced crypto payments and what this means for gamers.',
      author: 'Sarah Kim',
      date: '2024-03-12',
      readTime: '6 min read',
      category: 'Guide',
      tags: ['Gaming Platforms', 'Cryptocurrency', 'Guide']
    },
    {
      id: 3,
      title: 'Security Best Practices for Crypto Gaming Transactions',
      excerpt: 'Learn essential security measures to protect your cryptocurrency when purchasing gaming content.',
      author: 'Marcus Rodriguez',
      date: '2024-03-10',
      readTime: '5 min read',
      category: 'Security',
      tags: ['Security', 'Cryptocurrency', 'Best Practices']
    },
    {
      id: 4,
      title: 'Gift Cards vs. Direct Purchases: Which is Better for Gamers?',
      excerpt: 'Compare the benefits of using gift cards versus direct cryptocurrency payments for gaming purchases.',
      author: 'Emma Thompson',
      date: '2024-03-08',
      readTime: '7 min read',
      category: 'Analysis',
      tags: ['Gift Cards', 'Gaming', 'Analysis']
    },
    {
      id: 5,
      title: 'The Rise of Anonymous Gaming: Privacy in the Digital Age',
      excerpt: 'Understand why privacy matters in gaming and how cryptocurrency enables anonymous purchases.',
      author: 'Alex Chen',
      date: '2024-03-05',
      readTime: '9 min read',
      category: 'Privacy',
      tags: ['Privacy', 'Anonymous', 'Gaming']
    },
    {
      id: 6,
      title: 'GameVault Platform Update: New Features and Improvements',
      excerpt: 'Discover the latest features and improvements we\'ve added to enhance your gaming experience.',
      author: 'GameVault Team',
      date: '2024-03-01',
      readTime: '4 min read',
      category: 'Updates',
      tags: ['Platform', 'Updates', 'Features']
    }
  ]

  const categories = [
    { name: 'All Posts', count: 25 },
    { name: 'Technology', count: 8 },
    { name: 'Security', count: 6 },
    { name: 'Guide', count: 7 },
    { name: 'Analysis', count: 4 }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technology': return 'text-gaming-cyan bg-gaming-cyan/20'
      case 'Security': return 'text-gaming-neon bg-gaming-neon/20'
      case 'Guide': return 'text-gaming-gold bg-gaming-gold/20'
      case 'Analysis': return 'text-gaming-purple bg-gaming-purple/20'
      case 'Privacy': return 'text-pink-400 bg-pink-400/20'
      case 'Updates': return 'text-green-400 bg-green-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  return (
    <main className="min-h-screen bg-gaming-darker">
      <Navigation />
      
      <div className="pt-16">
        {/* Header */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-gaming font-bold mb-6">
                <span className="text-white">Gaming</span>
                <span className="cyber-text"> Blog</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Stay updated with the latest trends in gaming, cryptocurrency, and digital commerce
              </p>
            </motion.div>

            {/* Search and Categories */}
            <div className="flex flex-col md:flex-row gap-6 mb-12">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full pl-12 pr-4 py-3 bg-gaming-dark/50 border border-gaming-purple/30 rounded-lg text-white placeholder-gray-400 focus:border-gaming-cyan/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      index === 0 
                        ? 'bg-gaming-cyan/20 border-gaming-cyan/30 text-gaming-cyan'
                        : 'bg-gaming-dark/50 border-gaming-purple/30 text-gray-400 hover:border-gaming-cyan/50 hover:text-white'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="gaming-card mb-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="order-2 lg:order-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(featuredPost.category)}`}>
                      Featured
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(featuredPost.category)}`}>
                      {featuredPost.category}
                    </span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-gaming font-bold text-white mb-4">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gaming-cyan" />
                        <span className="text-gray-400">{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gaming-cyan" />
                        <span className="text-gray-400">{new Date(featuredPost.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <span className="text-gaming-gold">{featuredPost.readTime}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gaming-dark/50 rounded text-sm text-gray-400">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="btn-neon">
                    Read Full Article
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
                
                <div className="order-1 lg:order-2">
                  <div className="aspect-video bg-gaming-dark/50 rounded-lg border border-gaming-purple/30 flex items-center justify-center">
                    <div className="text-center">
                      <Bitcoin className="w-16 h-16 text-gaming-gold mx-auto mb-4" />
                      <p className="text-gray-400">Featured Article Image</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-gaming font-bold text-white mb-8"
            >
              Latest Articles
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="gaming-card hover:border-gaming-cyan/50 transition-colors cursor-pointer group"
                >
                  <div className="aspect-video bg-gaming-dark/50 rounded-lg border border-gaming-purple/30 mb-4 flex items-center justify-center">
                    <div className="text-center">
                      {post.category === 'Security' && <Shield className="w-12 h-12 text-gaming-neon mx-auto mb-2" />}
                      {post.category === 'Guide' && <Gamepad2 className="w-12 h-12 text-gaming-gold mx-auto mb-2" />}
                      {post.category === 'Analysis' && <TrendingUp className="w-12 h-12 text-gaming-purple mx-auto mb-2" />}
                      {post.category === 'Privacy' && <Shield className="w-12 h-12 text-pink-400 mx-auto mb-2" />}
                      {post.category === 'Updates' && <Zap className="w-12 h-12 text-green-400 mx-auto mb-2" />}
                      <p className="text-gray-500 text-sm">Article Image</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                    <span className="text-gaming-gold text-sm">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-gaming font-bold text-white mb-3 group-hover:text-gaming-cyan transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-gaming-dark/30 rounded text-xs text-gray-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="text-gaming-cyan hover:text-gaming-neon transition-colors flex items-center space-x-2 group-hover:translate-x-1 transition-transform">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="gaming-card"
            >
              <h2 className="text-3xl md:text-4xl font-gaming font-bold text-white mb-4">
                Stay <span className="cyber-text">Updated</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter and never miss the latest gaming industry insights, 
                cryptocurrency trends, and platform updates.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gaming-dark/50 border border-gaming-purple/30 rounded-lg text-white placeholder-gray-400 focus:border-gaming-cyan/50 focus:outline-none transition-colors"
                />
                <button className="btn-neon px-6 py-3 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              
              <p className="text-sm text-gray-400 mt-4">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Popular Tags */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h3 className="text-2xl font-gaming font-bold text-white mb-8">Popular Tags</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {['Cryptocurrency', 'Gaming', 'Security', 'Blockchain', 'Gift Cards', 'Privacy', 'Bitcoin', 'Ethereum', 'Digital Commerce', 'Platform Updates'].map((tag, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="px-4 py-2 bg-gaming-dark/50 border border-gaming-purple/30 rounded-lg text-gray-400 hover:border-gaming-cyan/50 hover:text-gaming-cyan transition-colors"
                  >
                    <Tag className="w-4 h-4 inline mr-2" />
                    {tag}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
} 