'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '../../components/Navigation'
import { 
  Search, 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock, 
  ChevronDown,
  ArrowRight,
  ExternalLink,
  Users,
  Shield,
  CreditCard,
  Smartphone,
  Book,
  Bitcoin,
  Gamepad2
} from '../../components/icons'

export default function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const categories = [
    { id: 'all', name: 'All Topics', icon: HelpCircle, count: 24 },
    { id: 'getting-started', name: 'Getting Started', icon: Book, count: 6 },
    { id: 'payments', name: 'Payments & Crypto', icon: Bitcoin, count: 8 },
    { id: 'gift-cards', name: 'Gift Cards', icon: Gamepad2, count: 5 },
    { id: 'security', name: 'Security', icon: Shield, count: 5 }
  ]

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I purchase a gift card?',
      answer: 'To purchase a gift card, browse our collection, select your desired card and quantity, proceed to checkout, and complete payment with cryptocurrency. Your codes will be delivered instantly.'
    },
    {
      id: 2,
      category: 'getting-started',
      question: 'Do I need to create an account?',
      answer: 'No account is required! You can purchase gift cards anonymously. However, providing an email address ensures you receive order confirmations and gift card codes.'
    },
    {
      id: 3,
      category: 'payments',
      question: 'What cryptocurrencies do you accept?',
      answer: 'We accept Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), Bitcoin Cash (BCH), and several other major cryptocurrencies through our P100 payment processor.'
    },
    {
      id: 4,
      category: 'payments',
      question: 'How long does payment confirmation take?',
      answer: 'Payment confirmation typically takes 1-10 minutes depending on network congestion. Gift card codes are delivered immediately after confirmation.'
    },
    {
      id: 5,
      category: 'payments',
      question: 'What happens if my payment fails?',
      answer: 'If payment fails or times out, your cryptocurrency will not be deducted. You can retry the payment or contact support for assistance.'
    },
    {
      id: 6,
      category: 'gift-cards',
      question: 'Are gift cards region-locked?',
      answer: 'Most gift cards work globally, but some may have regional restrictions. We clearly indicate any limitations on product pages.'
    },
    {
      id: 7,
      category: 'gift-cards',
      question: 'How do I redeem my gift card codes?',
      answer: 'Redeem codes on the respective gaming platform (Steam, Xbox, PlayStation, etc.). Each platform has its own redemption process detailed in their support documentation.'
    },
    {
      id: 8,
      category: 'security',
      question: 'Is it safe to purchase with cryptocurrency?',
      answer: 'Yes! We use industry-leading security measures including encrypted transactions, secure payment processing, and do not store sensitive payment information.'
    },
    {
      id: 9,
      category: 'security',
      question: 'How do you protect my privacy?',
      answer: 'We prioritize user privacy by not requiring personal information for purchases. All transactions are processed securely and anonymously.'
    },
    {
      id: 10,
      category: 'payments',
      question: 'Can I get a refund?',
      answer: 'Due to the digital nature of gift cards, refunds are generally not possible once codes are delivered. However, we may consider refunds for technical issues.'
    }
  ]

  const guides = [
    {
      title: 'First Time Buyer\'s Guide',
      description: 'Complete walkthrough for purchasing your first gift card with cryptocurrency',
      icon: Book,
      readTime: '5 min read',
      color: 'text-gaming-cyan'
    },
    {
      title: 'Cryptocurrency Payment Guide',
      description: 'Learn how to pay with Bitcoin, Ethereum, and other cryptocurrencies',
      icon: Bitcoin,
      readTime: '7 min read',
      color: 'text-gaming-gold'
    },
    {
      title: 'Security Best Practices',
      description: 'Keep your transactions secure and protect your cryptocurrency',
      icon: Shield,
      readTime: '6 min read',
      color: 'text-gaming-neon'
    },
    {
      title: 'Gift Card Redemption',
      description: 'Step-by-step instructions for redeeming codes on different platforms',
      icon: Gamepad2,
      readTime: '4 min read',
      color: 'text-gaming-purple'
    }
  ]

  const supportOptions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      availability: '24/7',
      color: 'text-gaming-neon'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: Mail,
      availability: 'Response within 2 hours',
      color: 'text-gaming-cyan'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users and get answers',
      icon: HelpCircle,
      availability: 'Always active',
      color: 'text-gaming-gold'
    }
  ]

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <main className="min-h-screen bg-gaming-darker">
      <Navigation />
      
      <div className="pt-16">
        {/* Header */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-gaming font-bold mb-6"
            >
              <span className="text-white">Help</span>
              <span className="cyber-text"> Center</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl text-gray-300 mb-8"
            >
              Find answers to your questions and get the support you need
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative max-w-2xl mx-auto"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles, guides, and FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-gaming-dark/50 border border-gaming-purple/30 rounded-lg text-white placeholder-gray-400 focus:border-gaming-cyan/50 focus:outline-none transition-colors text-lg"
              />
            </motion.div>
          </div>
        </section>

        {/* Quick Help Categories */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-lg border transition-all duration-300 text-center ${
                    selectedCategory === category.id
                      ? 'bg-gaming-cyan/20 border-gaming-cyan/30 text-gaming-cyan'
                      : 'bg-gaming-dark/50 border-gaming-purple/30 text-gray-400 hover:border-gaming-cyan/50 hover:text-white'
                  }`}
                >
                  <category.icon className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold text-sm">{category.name}</div>
                  <div className="text-xs opacity-70">({category.count})</div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Guides */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Popular <span className="cyber-text">Guides</span>
              </h2>
              <p className="text-xl text-gray-300">
                Step-by-step tutorials to help you get started
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {guides.map((guide, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="gaming-card hover:border-gaming-cyan/50 transition-colors cursor-pointer group"
                >
                  <guide.icon className={`w-12 h-12 ${guide.color} mb-4`} />
                  <h3 className="text-lg font-gaming font-bold text-white mb-2 group-hover:text-gaming-cyan transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gaming-gold text-sm">{guide.readTime}</span>
                    <ArrowRight className="w-4 h-4 text-gaming-cyan group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Frequently Asked <span className="cyber-text">Questions</span>
              </h2>
              <p className="text-xl text-gray-300">
                Quick answers to common questions
              </p>
            </motion.div>

            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  className="gaming-card"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <h3 className="text-lg font-gaming font-semibold text-white pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-gaming-cyan transition-transform ${
                        openFAQ === faq.id ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {openFAQ === faq.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-gaming-purple/20 mt-4">
                          <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-gaming font-bold text-gray-400 mb-2">No results found</h3>
                <p className="text-gray-500">Try adjusting your search terms or browse different categories.</p>
              </div>
            )}
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Still Need <span className="cyber-text">Help</span>?
              </h2>
              <p className="text-xl text-gray-300">
                Our support team is here to assist you
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {supportOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="gaming-card text-center hover:border-gaming-cyan/50 transition-colors cursor-pointer group"
                >
                  <option.icon className={`w-16 h-16 ${option.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
                  <h3 className="text-xl font-gaming font-bold text-white mb-2">{option.title}</h3>
                  <p className="text-gray-400 mb-4">{option.description}</p>
                  <div className="text-gaming-gold text-sm font-semibold">{option.availability}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { icon: Clock, value: '<2hr', label: 'Avg Response Time' },
                { icon: MessageCircle, value: '24/7', label: 'Live Support' },
                { icon: HelpCircle, value: '95%', label: 'Issues Resolved' },
                { icon: Shield, value: '100%', label: 'Secure Support' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="p-4"
                >
                  <stat.icon className="w-8 h-8 text-gaming-cyan mx-auto mb-2" />
                  <div className="text-2xl font-gaming font-bold text-white">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
} 