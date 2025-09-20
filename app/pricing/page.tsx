'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Link from 'next/link'
import { 
  Check, 
  X, 
  ArrowRight, 
  Star,
  CheckCircle,
  Shield,
  Zap,
  Globe,
  Bitcoin,
  Gift,
  Crown,
  Coins,
  Users,
  DollarSign,
  Gamepad2,
  CreditCard,
  Award,
  TrendingUp
} from '../../components/icons'

export default function PricingPage() {
  const pricingTiers = [
    {
      name: 'Basic',
      icon: Gamepad2,
      price: 'Free',
      description: 'Perfect for casual gamers',
      color: 'text-gaming-cyan',
      bgColor: 'bg-gaming-cyan/10',
      borderColor: 'border-gaming-cyan/30',
      features: [
        'Purchase gift cards with crypto',
        'Instant delivery',
        'Email support',
        'Standard processing fees',
        'Basic security features',
        'Access to 100+ platforms'
      ],
      limitations: [
        'No priority support',
        'Standard transaction limits',
        'No bulk discounts'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro',
      icon: Star,
      price: '$9.99/month',
      description: 'For frequent buyers and gamers',
      color: 'text-gaming-gold',
      bgColor: 'bg-gaming-gold/10',
      borderColor: 'border-gaming-gold/30',
      features: [
        'Everything in Basic',
        'Reduced processing fees (1.5%)',
        'Priority email support',
        'Higher transaction limits',
        'Bulk purchase discounts',
        'Order history & tracking',
        'Advanced security features',
        'Early access to new platforms'
      ],
      limitations: [
        'Limited to email support',
        'Standard delivery speed'
      ],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      icon: Crown,
      price: 'Custom',
      description: 'For businesses and high-volume users',
      color: 'text-gaming-purple',
      bgColor: 'bg-gaming-purple/10',
      borderColor: 'border-gaming-purple/30',
      features: [
        'Everything in Pro',
        'Lowest processing fees (0.5%)',
        '24/7 priority support',
        'Unlimited transaction limits',
        'Maximum bulk discounts',
        'Dedicated account manager',
        'Custom integrations',
        'API access',
        'White-label solutions',
        'Advanced analytics'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  const feeStructure = [
    {
      tier: 'Basic',
      processingFee: '2.5%',
      networkFee: 'Standard',
      bulkDiscount: 'None',
      color: 'text-gaming-cyan'
    },
    {
      tier: 'Pro',
      processingFee: '1.5%',
      networkFee: 'Standard',
      bulkDiscount: 'Up to 5%',
      color: 'text-gaming-gold'
    },
    {
      tier: 'Enterprise',
      processingFee: '0.5%',
      networkFee: 'Priority',
      bulkDiscount: 'Up to 15%',
      color: 'text-gaming-purple'
    }
  ]

  const cryptoFees = [
    { crypto: 'Bitcoin (BTC)', networkFee: '~$2-10', confirmTime: '10-60 min' },
    { crypto: 'Ethereum (ETH)', networkFee: '~$1-20', confirmTime: '1-15 min' },
    { crypto: 'Litecoin (LTC)', networkFee: '~$0.01-0.50', confirmTime: '2-10 min' },
    { crypto: 'Bitcoin Cash (BCH)', networkFee: '~$0.01-0.10', confirmTime: '10-60 min' }
  ]

  const volumeDiscounts = [
    { volume: '$100 - $499', discount: '0%', tier: 'All' },
    { volume: '$500 - $999', discount: '2%', tier: 'Pro+' },
    { volume: '$1,000 - $4,999', discount: '5%', tier: 'Pro+' },
    { volume: '$5,000 - $9,999', discount: '8%', tier: 'Enterprise' },
    { volume: '$10,000+', discount: '15%', tier: 'Enterprise' }
  ]

  const faqs = [
    {
      question: 'Are there any hidden fees?',
      answer: 'No hidden fees! Our pricing is transparent. You only pay the processing fee based on your tier plus standard blockchain network fees.'
    },
    {
      question: 'Can I change my plan anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.'
    },
    {
      question: 'What payment methods do you accept for subscriptions?',
      answer: 'We accept all major cryptocurrencies for subscription payments, including Bitcoin, Ethereum, and Litecoin.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for Pro subscriptions. Enterprise plans include custom terms.'
    }
  ]

  return (
    <main className="min-h-screen bg-gaming-darker">
      <Navigation />
      
      <div className="pt-16">
        {/* Header */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-gaming font-bold mb-6"
            >
              <span className="text-white">Simple</span>
              <span className="cyber-text"> Pricing</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Choose the perfect plan for your gaming needs. All plans include access to 100+ gaming platforms 
              and instant gift card delivery with cryptocurrency payments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center justify-center space-x-4 text-gaming-gold"
            >
              <Shield className="w-6 h-6" />
              <span className="font-semibold">30-day money-back guarantee</span>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {pricingTiers.map((tier, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className={`relative gaming-card ${tier.popular ? 'ring-2 ring-gaming-gold/50' : ''}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gaming-gold text-gaming-darker px-4 py-1 rounded-full text-sm font-bold">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${tier.bgColor} mb-4`}>
                      <tier.icon className={`w-8 h-8 ${tier.color}`} />
                    </div>
                    
                    <h3 className="text-2xl font-gaming font-bold text-white mb-2">{tier.name}</h3>
                    <p className="text-gray-400 mb-4">{tier.description}</p>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-gaming font-bold text-white">{tier.price}</span>
                      {tier.price !== 'Free' && tier.price !== 'Custom' && (
                        <span className="text-gray-400 ml-2">per month</span>
                      )}
                    </div>
                    
                    <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      tier.popular 
                        ? 'btn-neon' 
                        : `border ${tier.borderColor} ${tier.color} hover:bg-white/10`
                    }`}>
                      {tier.cta}
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white mb-3">Features included:</h4>
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-gaming-neon flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                    
                    {tier.limitations.length > 0 && (
                      <div className="pt-4 border-t border-gaming-purple/20">
                        <h4 className="font-semibold text-gray-400 mb-3">Limitations:</h4>
                        {tier.limitations.map((limitation, limitIndex) => (
                          <div key={limitIndex} className="flex items-center space-x-3">
                            <X className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            <span className="text-gray-500">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Fee Structure */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Fee <span className="cyber-text">Structure</span>
              </h2>
              <p className="text-xl text-gray-300">
                Transparent pricing with no hidden costs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Processing Fees */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="gaming-card"
              >
                <h3 className="text-xl font-gaming font-bold text-white mb-6 flex items-center">
                  <CreditCard className="w-6 h-6 mr-3 text-gaming-cyan" />
                  Processing Fees by Tier
                </h3>
                
                <div className="space-y-4">
                  {feeStructure.map((fee, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30">
                      <div>
                        <div className={`font-semibold ${fee.color}`}>{fee.tier}</div>
                        <div className="text-gray-400 text-sm">Bulk Discount: {fee.bulkDiscount}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">{fee.processingFee}</div>
                        <div className="text-gray-400 text-sm">{fee.networkFee} network fees</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Crypto Network Fees */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="gaming-card"
              >
                <h3 className="text-xl font-gaming font-bold text-white mb-6 flex items-center">
                  <Bitcoin className="w-6 h-6 mr-3 text-gaming-gold" />
                  Network Fees by Crypto
                </h3>
                
                <div className="space-y-4">
                  {cryptoFees.map((crypto, index) => (
                    <div key={index} className="p-4 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-white">{crypto.crypto}</div>
                        <div className="text-gaming-gold font-bold">{crypto.networkFee}</div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>Confirmation time:</span>
                        <span>{crypto.confirmTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Volume Discounts */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Volume <span className="cyber-text">Discounts</span>
              </h2>
              <p className="text-xl text-gray-300">
                Save more with higher purchase volumes
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="gaming-card overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gaming-purple/30">
                      <th className="text-left py-4 px-6 text-white font-gaming">Monthly Volume</th>
                      <th className="text-left py-4 px-6 text-white font-gaming">Discount</th>
                      <th className="text-left py-4 px-6 text-white font-gaming">Required Tier</th>
                      <th className="text-left py-4 px-6 text-white font-gaming">Savings Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {volumeDiscounts.map((discount, index) => (
                      <tr key={index} className="border-b border-gaming-purple/20 hover:bg-gaming-dark/30 transition-colors">
                        <td className="py-4 px-6 text-gray-300">{discount.volume}</td>
                        <td className="py-4 px-6">
                          <span className={`font-bold ${discount.discount === '0%' ? 'text-gray-400' : 'text-gaming-neon'}`}>
                            {discount.discount}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            discount.tier === 'All' ? 'bg-gaming-cyan/20 text-gaming-cyan' :
                            discount.tier === 'Pro+' ? 'bg-gaming-gold/20 text-gaming-gold' :
                            'bg-gaming-purple/20 text-gaming-purple'
                          }`}>
                            {discount.tier}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-300">
                          {discount.discount === '0%' ? '-' : 
                           discount.discount === '2%' ? 'Save $10 on $500' :
                           discount.discount === '5%' ? 'Save $50 on $1,000' :
                           discount.discount === '8%' ? 'Save $400 on $5,000' :
                           'Save $1,500 on $10,000'
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Comparison Features */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Why Choose <span className="cyber-text">GameVault</span>?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Zap, title: 'Instant Delivery', description: 'Get your codes in seconds after payment confirmation' },
                { icon: Shield, title: 'Secure & Anonymous', description: 'No personal information required, crypto-only payments' },
                { icon: Award, title: '100+ Platforms', description: 'Support for all major gaming platforms and stores' },
                { icon: TrendingUp, title: 'Best Rates', description: 'Competitive fees with volume discounts available' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center p-6 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30 hover:border-gaming-cyan/50 transition-colors"
                >
                  <feature.icon className="w-12 h-12 text-gaming-cyan mx-auto mb-4" />
                  <h3 className="text-lg font-gaming font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Pricing <span className="cyber-text">FAQ</span>
              </h2>
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
                  <h3 className="text-lg font-gaming font-bold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="gaming-card"
            >
              <Gift className="w-16 h-16 text-gaming-cyan mx-auto mb-6" />
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Ready to Get <span className="cyber-text">Started</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of gamers who trust GameVault for their gift card needs. 
                Start with our free tier or try Pro with a 30-day money-back guarantee.
              </p>
              
              <div className="btn-group">
                <button className="btn-neon">
                  Start Free Now
                </button>
                <button className="btn-secondary">
                  Contact Sales
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
} 