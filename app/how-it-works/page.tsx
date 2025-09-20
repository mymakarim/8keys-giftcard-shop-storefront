'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { 
  Search, 
  ShoppingCart, 
  CreditCard, 
  Gift, 
  ArrowRight, 
  CheckCircle,
  Shield,
  Zap,
  Globe,
  Bitcoin,
  Clock,
  Star
} from '../../components/icons'

export default function HowItWorksPage() {
  const steps = [
    {
      id: 1,
      title: 'Browse & Select',
      description: 'Choose from our extensive collection of gaming gift cards',
      icon: Search,
      color: 'text-gaming-cyan',
      bgColor: 'bg-gaming-cyan/20',
      details: [
        'Browse 100+ gaming platforms',
        'Filter by price and platform',
        'Compare different denominations',
        'Read reviews and ratings'
      ]
    },
    {
      id: 2,
      title: 'Add to Cart',
      description: 'Select quantity and proceed to secure checkout',
      icon: CreditCard,
      color: 'text-gaming-neon',
      bgColor: 'bg-gaming-neon/20',
      details: [
        'Choose desired quantity',
        'View total in USD and crypto',
        'Apply discount codes',
        'Secure checkout process'
      ]
    },
    {
      id: 3,
      title: 'Pay with Crypto',
      description: 'Complete payment using your preferred cryptocurrency',
      icon: Bitcoin,
      color: 'text-gaming-gold',
      bgColor: 'bg-gaming-gold/20',
      details: [
        'Bitcoin, Ethereum, Litecoin supported',
        'Scan QR code or copy address',
        'Real-time payment tracking',
        'Automatic confirmation'
      ]
    },
    {
      id: 4,
      title: 'Instant Delivery',
      description: 'Receive your gift card codes immediately after payment',
      icon: Gift,
      color: 'text-gaming-purple',
      bgColor: 'bg-gaming-purple/20',
      details: [
        'Instant code delivery',
        'Email notification (optional)',
        'Secure code storage',
        'Easy copy-to-clipboard'
      ]
    }
  ]

  const features = [
    {
      icon: Shield,
      title: 'Secure & Anonymous',
      description: 'No personal information required. Your privacy is protected.',
      color: 'text-gaming-neon'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant delivery once payment is confirmed on the blockchain.',
      color: 'text-gaming-cyan'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Available worldwide with support for multiple cryptocurrencies.',
      color: 'text-gaming-gold'
    },
    {
      icon: ShoppingCart,
      title: 'Multiple Cryptos',
      description: 'Pay with Bitcoin, Ethereum, Litecoin, and more.',
      color: 'text-gaming-purple'
    }
  ]

  const faqs = [
    {
      question: 'How long does delivery take?',
      answer: 'Gift card codes are delivered instantly once your cryptocurrency payment is confirmed on the blockchain. This typically takes 1-10 minutes depending on network congestion.'
    },
    {
      question: 'What cryptocurrencies do you accept?',
      answer: 'We accept Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), Bitcoin Cash (BCH), and several other major cryptocurrencies through our P100 payment processor.'
    },
    {
      question: 'Are the gift cards region-locked?',
      answer: 'Most gift cards work globally, but some may have regional restrictions. We clearly indicate any regional limitations on the product pages.'
    },
    {
      question: 'What if my payment fails?',
      answer: 'If your payment fails or is not received within the timeout period, your cryptocurrency will not be deducted. You can retry the payment or contact our support team.'
    },
    {
      question: 'Can I get a refund?',
      answer: 'Due to the digital nature of gift cards, refunds are generally not possible once codes are delivered. However, we may consider refunds for technical issues on a case-by-case basis.'
    }
  ]

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
              <span className="text-white">How It</span>
              <span className="cyber-text"> Works</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Purchase gaming gift cards with cryptocurrency in just 4 simple steps. 
              Fast, secure, and completely anonymous.
            </motion.p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}
                >
                  <div className="gaming-card">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`p-4 rounded-lg ${step.bgColor}`}>
                        <step.icon className={`w-8 h-8 ${step.color}`} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 font-medium">Step {step.id}</div>
                        <h3 className="text-2xl font-gaming font-bold text-white">{step.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6 text-lg">{step.description}</p>
                    
                    <ul className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-gaming-neon flex-shrink-0" />
                          <span className="text-gray-400">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-gaming font-bold text-white mb-4">
                Why Choose <span className="cyber-text">GameVault</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Experience the future of digital gift card purchases with our cutting-edge platform
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="p-4 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30 mb-4 inline-block">
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-gaming font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Flow */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-gaming font-bold text-white mb-4">
                <span className="cyber-text">Simple</span> Process
              </h2>
              <p className="text-xl text-gray-300">
                From selection to delivery in minutes
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                { icon: Search, title: 'Browse', desc: 'Select your favorite gaming platform' },
                { icon: CreditCard, title: 'Purchase', desc: 'Add to cart and proceed to checkout' },
                { icon: Bitcoin, title: 'Pay', desc: 'Complete payment with cryptocurrency' },
                { icon: ShoppingCart, title: 'Receive', desc: 'Get your codes instantly via email' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="flex items-center space-x-6"
                >
                  <div className="p-3 bg-gaming-purple/20 rounded-lg border border-gaming-purple/30">
                    <item.icon className="w-6 h-6 text-gaming-cyan" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-gaming font-bold text-white">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                  {index < 3 && (
                    <ArrowRight className="w-5 h-5 text-gaming-purple" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-gaming font-bold text-white mb-4">
                Frequently Asked <span className="cyber-text">Questions</span>
              </h2>
              <p className="text-xl text-gray-300">
                Everything you need to know about our service
              </p>
            </motion.div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="gaming-card"
                >
                  <h3 className="text-xl font-gaming font-bold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-gaming font-bold text-white mb-6">
                Ready to <span className="cyber-text">Get Started</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of gamers who trust GameVault for their digital gift card needs
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-neon text-lg px-8 py-4">
                  <Gift className="w-5 h-5 mr-2" />
                  Browse Gift Cards
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="glass-dark hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 border border-gaming-purple/30 hover:border-gaming-cyan/50">
                  <Clock className="w-5 h-5 mr-2" />
                  Quick Purchase
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </main>
  )
} 