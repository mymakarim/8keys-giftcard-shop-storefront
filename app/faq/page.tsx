'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from '../../components/Navigation'
import AIFloatingButton from '../../components/AIFloatingButton'
import { 
  ChevronDown, 
  HelpCircle, 
  Shield, 
  Zap, 
  Bitcoin, 
  AlertCircle,
  CheckCircle,
  Search,
  Gamepad2,
  CreditCard,
  MessageCircle,
  Mail,
  Clock
} from '../../components/icons'

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'general', name: 'General', icon: HelpCircle },
    { id: 'payments', name: 'Payments', icon: Bitcoin },
    { id: 'gift-cards', name: 'Gift Cards', icon: Gamepad2 },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'technical', name: 'Technical', icon: CreditCard }
  ]

  const faqs = [
    // General Questions
    {
      id: 1,
      category: 'general',
      question: 'What is GameVault?',
      answer: 'GameVault is a revolutionary platform that allows gamers to purchase gift cards for their favorite gaming platforms using cryptocurrency. We support over 100 gaming platforms and accept Bitcoin, Ethereum, Litecoin, and other major cryptocurrencies.'
    },
    {
      id: 2,
      category: 'general',
      question: 'Do I need to create an account to make a purchase?',
      answer: 'No, you don\'t need to create an account! GameVault allows completely anonymous purchases. However, providing an email address is optional and ensures you receive order confirmations and gift card codes directly in your inbox.'
    },
    {
      id: 3,
      category: 'general',
      question: 'How quickly will I receive my gift card codes?',
      answer: 'Gift card codes are delivered instantly once your cryptocurrency payment is confirmed on the blockchain. This typically takes 1-10 minutes depending on network congestion and the cryptocurrency used.'
    },
    {
      id: 4,
      category: 'general',
      question: 'Which gaming platforms do you support?',
      answer: 'We support over 100 gaming platforms including Steam, Xbox, PlayStation, Nintendo eShop, Epic Games Store, Battle.net, Origin, Uplay, and many more. Our catalog is constantly expanding to include new platforms and regions.'
    },

    // Payment Questions
    {
      id: 5,
      category: 'payments',
      question: 'What cryptocurrencies do you accept?',
      answer: 'We accept Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), Bitcoin Cash (BCH), Dogecoin (DOGE), and several other major cryptocurrencies. Our payment processor P100 supports a wide range of digital currencies.'
    },
    {
      id: 6,
      category: 'payments',
      question: 'How do cryptocurrency payments work?',
      answer: 'When you checkout, you\'ll receive a unique payment address and QR code. Simply send the exact amount of cryptocurrency to the provided address. Once the transaction is confirmed on the blockchain, your gift card codes will be delivered automatically.'
    },
    {
      id: 7,
      category: 'payments',
      question: 'What happens if I send the wrong amount?',
      answer: 'If you send too little, the payment will remain pending until the full amount is received. If you send too much, the excess will be refunded to your original address minus network fees. Always double-check the amount before sending.'
    },
    {
      id: 8,
      category: 'payments',
      question: 'Can I get a refund?',
      answer: 'Due to the digital nature of gift cards and instant delivery, refunds are generally not possible once codes are delivered. However, we may consider refunds on a case-by-case basis for technical issues or if the gift card codes are invalid.'
    },
    {
      id: 9,
      category: 'payments',
      question: 'Are there any fees?',
      answer: 'GameVault doesn\'t charge additional fees beyond the advertised price. However, you\'ll need to pay standard blockchain network fees when sending cryptocurrency. These fees vary depending on network congestion and the cryptocurrency used.'
    },

    // Gift Card Questions
    {
      id: 10,
      category: 'gift-cards',
      question: 'Are the gift cards region-locked?',
      answer: 'Most gift cards work globally, but some may have regional restrictions based on the platform\'s policies. We clearly indicate any regional limitations on the product pages. When in doubt, check with the specific gaming platform.'
    },
    {
      id: 11,
      category: 'gift-cards',
      question: 'How do I redeem my gift card codes?',
      answer: 'Redemption varies by platform. For Steam, go to "Games" > "Activate a Product on Steam". For Xbox, visit xbox.com/redeemcode. For PlayStation, go to PlayStation Store > "Redeem Codes". Each platform has detailed instructions in their support sections.'
    },
    {
      id: 12,
      category: 'gift-cards',
      question: 'Do gift cards expire?',
      answer: 'Gift card expiration depends on the issuing platform\'s policies. Most major platforms like Steam, Xbox, and PlayStation gift cards don\'t expire, but some smaller platforms may have expiration dates. Check the specific platform\'s terms for details.'
    },
    {
      id: 13,
      category: 'gift-cards',
      question: 'Can I use multiple gift cards on one purchase?',
      answer: 'Yes, most gaming platforms allow you to combine multiple gift cards and use them together with other payment methods. This depends on the specific platform\'s payment policies.'
    },

    // Security Questions
    {
      id: 14,
      category: 'security',
      question: 'Is it safe to buy gift cards with cryptocurrency?',
      answer: 'Yes, purchasing with cryptocurrency is very safe. We use industry-leading security measures including encrypted transactions, secure payment processing through P100, and we never store sensitive payment information. Cryptocurrency transactions are also irreversible and secure by design.'
    },
    {
      id: 15,
      category: 'security',
      question: 'How do you protect my privacy?',
      answer: 'We prioritize user privacy by not requiring personal information for purchases. All transactions are processed anonymously, and we don\'t store unnecessary personal data. Your cryptocurrency transactions are also pseudonymous by nature.'
    },
    {
      id: 16,
      category: 'security',
      question: 'What if I receive invalid gift card codes?',
      answer: 'If you receive invalid or already-used gift card codes, contact our support team immediately with your order details. We work directly with authorized distributors and will investigate any issues promptly to ensure you receive working codes.'
    },
    {
      id: 17,
      category: 'security',
      question: 'Are the gift cards legitimate?',
      answer: 'Yes, all our gift cards are sourced from authorized distributors and official channels. We maintain partnerships with legitimate suppliers and regularly audit our inventory to ensure authenticity.'
    },

    // Technical Questions
    {
      id: 18,
      category: 'technical',
      question: 'What if my payment is stuck or pending?',
      answer: 'If your payment appears stuck, first check the blockchain explorer using your transaction hash. If the transaction is confirmed but you haven\'t received codes, contact support. If it\'s unconfirmed, you may need to wait for network confirmation or increase the fee.'
    },
    {
      id: 19,
      category: 'technical',
      question: 'Why is my payment taking so long to confirm?',
      answer: 'Payment confirmation time depends on blockchain network congestion and the fee you paid. Bitcoin can take 10-60 minutes, Ethereum 1-15 minutes, and Litecoin 2-10 minutes. Higher fees generally result in faster confirmation.'
    },
    {
      id: 20,
      category: 'technical',
      question: 'Can I cancel a payment after sending cryptocurrency?',
      answer: 'Cryptocurrency transactions are irreversible once broadcast to the network. However, if the payment hasn\'t been confirmed yet and you used a low fee, it might eventually be dropped from the mempool. Contact support if you need assistance.'
    },
    {
      id: 21,
      category: 'technical',
      question: 'What browsers do you support?',
      answer: 'GameVault works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your preferred browser for the best experience. JavaScript must be enabled.'
    },
    {
      id: 22,
      category: 'technical',
      question: 'Do you have a mobile app?',
      answer: 'Currently, GameVault is a web-based platform optimized for both desktop and mobile browsers. We don\'t have a dedicated mobile app yet, but our website works perfectly on mobile devices.'
    }
  ]

  // Create knowledge base string from FAQs for AI
  const createKnowledgeBase = () => {
    return faqs.map(faq => `Q: ${faq.question}\nA: ${faq.answer}`).join('\n\n')
  }

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
              <span className="text-white">Frequently Asked</span>
              <span className="cyber-text"> Questions</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl text-gray-300 mb-8"
            >
              Find quick answers to common questions about GameVault, cryptocurrency payments, and gift cards
            </motion.p>

            {/* AI Assistant CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-8 p-6 bg-gradient-to-r from-gaming-purple/10 to-gaming-cyan/10 border border-gaming-cyan/30 rounded-lg"
            >
              <div className="flex items-center justify-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-gaming-purple to-gaming-cyan rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-gaming font-bold text-white">
                  🤖 New: AI Assistant
                </h3>
              </div>
              <p className="text-gray-300 mb-4">
                Can't find what you're looking for? Ask our AI assistant! It can instantly answer questions about payments, gift cards, security, and more.
              </p>
              <p className="text-sm text-gaming-cyan">
                Look for the floating bot icon in the bottom-right corner ➡️
              </p>
            </motion.div>

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
                placeholder="Search frequently asked questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-gaming-dark/50 border border-gaming-purple/30 rounded-lg text-white placeholder-gray-400 focus:border-gaming-cyan/50 focus:outline-none transition-colors text-lg"
              />
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg border transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gaming-cyan/20 border-gaming-cyan/30 text-gaming-cyan'
                      : 'bg-gaming-dark/50 border-gaming-purple/30 text-gray-400 hover:border-gaming-cyan/50 hover:text-white'
                  }`}
                >
                  <category.icon className="w-5 h-5" />
                  <span className="font-semibold">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredFAQs.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="gaming-card"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full flex items-center justify-between text-left group"
                    >
                      <h3 className="text-lg font-gaming font-semibold text-white pr-4 group-hover:text-gaming-cyan transition-colors">
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
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <HelpCircle className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-gaming font-bold text-gray-400 mb-2">No results found</h3>
                <p className="text-gray-500">Try adjusting your search terms or browse different categories.</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="gaming-card"
            >
              <HelpCircle className="w-16 h-16 text-gaming-cyan mx-auto mb-6" />
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Still Have <span className="cyber-text">Questions</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is here to help you 24/7.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30 hover:border-gaming-neon/50 transition-colors flex flex-col h-full">
                  <MessageCircle className="w-12 h-12 text-gaming-neon mx-auto mb-4" />
                  <h3 className="font-gaming font-bold text-white mb-2">Live Chat</h3>
                  <p className="text-gray-400 text-sm mb-6 flex-grow">Get instant help from our support team</p>
                  <button className="w-full py-3 font-semibold bg-gaming-neon/20 border border-gaming-neon/30 text-gaming-neon rounded-lg hover:bg-gaming-neon/30 transition-colors">
                    Start Chat
                  </button>
                </div>
                
                <div className="p-6 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30 hover:border-gaming-cyan/50 transition-colors flex flex-col h-full">
                  <Mail className="w-12 h-12 text-gaming-cyan mx-auto mb-4" />
                  <h3 className="font-gaming font-bold text-white mb-2">Email Support</h3>
                  <p className="text-gray-400 text-sm mb-6 flex-grow">Send us a detailed message</p>
                  <button className="w-full py-3 font-semibold bg-gaming-cyan/20 border border-gaming-cyan/30 text-gaming-cyan rounded-lg hover:bg-gaming-cyan/30 transition-colors">
                    Send Email
                  </button>
                </div>
                
                <div className="p-6 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30 hover:border-gaming-gold/50 transition-colors flex flex-col h-full">
                  <Clock className="w-12 h-12 text-gaming-gold mx-auto mb-4" />
                  <h3 className="font-gaming font-bold text-white mb-2">Help Center</h3>
                  <p className="text-gray-400 text-sm mb-6 flex-grow">Browse guides and tutorials</p>
                  <button className="w-full py-3 font-semibold bg-gaming-gold/20 border border-gaming-gold/30 text-gaming-gold rounded-lg hover:bg-gaming-gold/30 transition-colors">
                    Visit Help Center
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Popular Topics */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-gaming font-bold text-white mb-4">
                Popular <span className="cyber-text">Topics</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Bitcoin, title: 'Cryptocurrency Payments', count: '8 articles' },
                { icon: Gamepad2, title: 'Gift Card Redemption', count: '5 articles' },
                { icon: Shield, title: 'Security & Privacy', count: '6 articles' },
                { icon: HelpCircle, title: 'Getting Started', count: '4 articles' }
              ].map((topic, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="p-6 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30 hover:border-gaming-cyan/50 transition-colors cursor-pointer text-center"
                >
                  <topic.icon className="w-12 h-12 text-gaming-cyan mx-auto mb-4" />
                  <h3 className="font-gaming font-bold text-white mb-2">{topic.title}</h3>
                  <p className="text-gray-400 text-sm">{topic.count}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* AI Floating Button */}
      <AIFloatingButton knowledgeBase={createKnowledgeBase()} />

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 #1a1a2e;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a2e;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #8b5cf6, #06b6d4);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #a855f7, #0891b2);
        }
      `}</style>
    </main>
  )
} 