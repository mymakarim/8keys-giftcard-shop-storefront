'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  Zap, 
  Coins, 
  Globe, 
  Clock, 
  Gift,
  Smartphone,
  Award,
  Lock
} from './icons'

export default function Features() {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Anonymous',
      description: 'Complete privacy protection with no personal information required. Your transactions are secure and anonymous.',
      color: 'gaming-neon',
      delay: 0.1
    },
    {
      icon: Zap,
      title: 'Instant Delivery',
      description: 'Get your gift cards immediately after payment confirmation. No waiting, no delays.',
      color: 'gaming-cyan',
      delay: 0.2
    },
    {
      icon: Coins,
      title: 'Crypto Payments',
      description: 'Pay with Bitcoin, Ethereum, and other cryptocurrencies. Fast, secure, and decentralized.',
      color: 'gaming-gold',
      delay: 0.3
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Available worldwide with support for multiple regions and currencies.',
      color: 'gaming-purple',
      delay: 0.4
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Purchase gift cards anytime, anywhere. Our platform never sleeps.',
      color: 'gaming-pink',
      delay: 0.5
    },
    {
      icon: Gift,
      title: 'Premium Selection',
      description: 'Curated collection of the best gaming platforms and digital stores.',
      color: 'gaming-cyan',
      delay: 0.6
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Perfect experience on all devices. Buy gift cards on the go.',
      color: 'gaming-neon',
      delay: 0.7
    },
    {
      icon: Award,
      title: 'Best Rates',
      description: 'Competitive pricing with transparent fees. No hidden charges.',
      color: 'gaming-gold',
      delay: 0.8
    },
    {
      icon: Lock,
      title: 'Fraud Protection',
      description: 'Advanced security measures to protect against fraud and ensure safe transactions.',
      color: 'gaming-purple',
      delay: 0.9
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-20 relative overflow-hidden transition-colors duration-500">
      {/* Background Effects - Matching Hero */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dark theme background */}
        <div className="dark:block hidden absolute inset-0 bg-gradient-to-br from-gaming-purple/20 via-transparent to-gaming-cyan/20" />
        <div className="dark:block hidden absolute top-1/4 left-10 w-72 h-72 bg-gaming-purple/10 rounded-full blur-3xl animate-pulse" />
        <div className="dark:block hidden absolute bottom-1/4 right-10 w-96 h-96 bg-gaming-cyan/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Light theme background */}
        <div className="light:block hidden absolute inset-0 bg-gradient-to-br from-blue-100/30 via-transparent to-purple-100/30" />
        <div className="light:block hidden absolute top-1/4 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="light:block hidden absolute bottom-1/4 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-gaming font-bold mb-6">
            <span className="transition-colors duration-300 dark:text-white light:text-gray-900">Why Choose</span>
            <br />
            <span className="cyber-text">GameVault</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto transition-colors duration-300 dark:text-gray-300 light:text-gray-600">
            Experience the future of digital gift card purchases with our premium platform
            designed specifically for gamers and crypto enthusiasts.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="gaming-card group cursor-pointer"
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-xl transition-all duration-300 dark:bg-gaming-dark/50 light:bg-white/80 light:border light:border-gray-200 light:shadow-sm flex items-center justify-center mb-4 group-hover:scale-110">
                  <feature.icon className="w-8 h-8 transition-colors duration-300 dark:text-gaming-cyan light:text-blue-600" />
                </div>
                <div className="absolute inset-0 w-16 h-16 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:bg-gaming-cyan/20 light:bg-blue-500/20" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-gaming font-semibold mb-3 transition-colors duration-300 dark:text-white dark:group-hover:text-gaming-cyan light:text-gray-900 light:group-hover:text-blue-600">
                {feature.title}
              </h3>
              <p className="leading-relaxed transition-colors duration-300 dark:text-gray-400 dark:group-hover:text-gray-300 light:text-gray-600 light:group-hover:text-gray-700">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none dark:bg-gradient-to-br dark:from-gaming-purple/5 dark:to-gaming-cyan/5 light:bg-gradient-to-br light:from-blue-500/3 light:to-purple-500/3" />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-lg mb-8 transition-colors duration-300 dark:text-gray-300 light:text-gray-600">
            Ready to experience the future of gift card purchases?
          </p>
          <motion.a
            href="/gift-cards"
            className="btn-neon text-lg px-8 py-4 inline-flex items-center group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Gift className="w-5 h-5 mr-2" />
            Start Shopping
            <motion.div
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
} 