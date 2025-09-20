'use client'

import { motion } from 'framer-motion'
import React from 'react'

// Add TrendingUp, Users, Globe, Award, Shield, Zap icons to our icons file if not already there
const TrendingUp: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/>
    <polyline points="16,7 22,7 22,13"/>
  </svg>
)

const Users: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

const Globe: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

const Award: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="8" r="7"/>
    <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88"/>
  </svg>
)

const Shield: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const Zap: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
  </svg>
)

export default function Stats() {
  const stats = [
    {
      icon: Users,
      value: '50,000+',
      label: 'Active Users',
      description: 'Trusted gamers worldwide',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Award,
      value: '500+',
      label: 'Gift Cards',
      description: 'Premium gaming platforms',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Globe,
      value: '100+',
      label: 'Countries',
      description: 'Global availability',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: TrendingUp,
      value: '99.9%',
      label: 'Uptime',
      description: 'Reliable service',
      gradient: 'from-orange-500 to-red-500'
    }
  ]

  const features = [
    {
      icon: Shield,
      title: 'Military-Grade Security',
      description: 'Advanced encryption and secure payment processing',
      color: 'text-gaming-neon'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant delivery and real-time transaction processing',
      color: 'text-gaming-cyan'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Available in 100+ countries with local support',
      color: 'text-gaming-purple'
    }
  ]

  return (
    <section className="py-20 relative overflow-hidden transition-colors duration-500">
      {/* Background - Matching Hero Section */}
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
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-gaming font-bold mb-6">
            <span className="text-gradient-primary">Trusted by Gamers</span>
            <br />
            <span className="transition-colors duration-300 dark:text-white light:text-gray-900">Worldwide</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto transition-colors duration-300 dark:text-gray-300 light:text-gray-600">
            Join thousands of satisfied customers who trust GameVault for their gaming gift card needs.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center group"
            >
              <div className="relative mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 mx-auto rounded-2xl gaming-card flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300"
                >
                  <stat.icon className="w-10 h-10 transition-colors duration-300 dark:text-gaming-cyan light:text-blue-600" />
                </motion.div>
                
                <div className="text-3xl md:text-4xl font-gaming font-bold text-gradient-primary mb-2">
                  {stat.value}
                </div>
                
                <div className="text-lg font-gaming font-semibold mb-1 transition-colors duration-300 dark:text-white light:text-gray-900">
                  {stat.label}
                </div>
                
                <div className="text-sm transition-colors duration-300 dark:text-gray-400 light:text-gray-600">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Section - Enhanced with Hero-style Background */}
        <div className="relative">
          {/* Features Background Effects - Matching Hero */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Dark theme features background */}
            <div className="dark:block hidden absolute inset-0 bg-gradient-to-br from-gaming-purple/15 via-gaming-dark/20 to-gaming-cyan/15 rounded-3xl" />
            <div className="dark:block hidden absolute inset-0 bg-gradient-to-tr from-gaming-dark/40 via-transparent to-gaming-darker/40 rounded-3xl" />
            <div className="dark:block hidden absolute -top-10 -left-10 w-40 h-40 bg-gaming-purple/10 rounded-full blur-2xl animate-pulse" />
            <div className="dark:block hidden absolute -bottom-10 -right-10 w-60 h-60 bg-gaming-cyan/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
            
            {/* Light theme features background */}
            <div className="light:block hidden absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white/40 to-purple-50/60 rounded-3xl border border-blue-100/30 shadow-xl" />
            <div className="light:block hidden absolute inset-0 bg-gradient-to-tr from-white/50 via-transparent to-blue-50/50 rounded-3xl" />
            <div className="light:block hidden absolute -top-10 -left-10 w-40 h-40 bg-blue-200/15 rounded-full blur-2xl animate-pulse" />
            <div className="light:block hidden absolute -bottom-10 -right-10 w-60 h-60 bg-purple-200/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative z-10 py-16 px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h3 className="text-2xl md:text-3xl font-gaming font-bold mb-4">
                <span className="text-gradient-primary">Why Choose</span>
                <br />
                <span className="transition-colors duration-300 dark:text-white light:text-gray-900">GameVault</span>
              </h3>
              <p className="text-lg max-w-2xl mx-auto transition-colors duration-300 dark:text-gray-300 light:text-gray-600">
                Experience the difference with our premium platform designed for serious gamers.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="relative group"
                >
                  {/* Feature Card */}
                  <div className="gaming-card p-8 text-center hover:scale-105 transition-all duration-300 h-full">
                    {/* Icon Container */}
                    <div className="relative mb-6">
                      <div className="w-16 h-16 mx-auto rounded-xl transition-all duration-300 dark:bg-gaming-dark/50 light:bg-white/80 light:border light:border-gray-200 light:shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-3">
                        <feature.icon className="w-8 h-8 transition-colors duration-300 dark:text-gaming-cyan light:text-blue-600 group-hover:scale-110" />
                      </div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 w-16 h-16 mx-auto rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:bg-gaming-cyan/20 light:bg-blue-500/20" />
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-xl font-gaming font-semibold mb-3 transition-colors duration-300 dark:text-white dark:group-hover:text-gaming-cyan light:text-gray-900 light:group-hover:text-blue-600">
                      {feature.title}
                    </h4>
                    
                    {/* Description */}
                    <p className="transition-colors duration-300 dark:text-gray-400 light:text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Hover Effect Line */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-0 group-hover:w-20 transition-all duration-300 dark:bg-gradient-to-r dark:from-gaming-cyan dark:to-gaming-purple light:bg-gradient-to-r light:from-blue-500 light:to-purple-500 rounded-full" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-gaming font-bold mb-8 transition-colors duration-300 dark:text-white light:text-gray-900">
            <span className="text-gradient-primary">Supported</span>
            <span className="transition-colors duration-300 dark:text-white light:text-gray-900"> Platforms</span>
          </h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              '🎮 Steam', '🎯 Epic Games', '🎪 PlayStation', '🎨 Xbox', 
              '🎵 Nintendo', '⚡ Battle.net', '🔥 Riot Games'
            ].map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="px-4 py-2 rounded-lg transition-all duration-300 hover:scale-110 cursor-pointer dark:bg-gaming-dark/30 dark:hover:bg-gaming-dark/50 dark:border dark:border-gaming-purple/20 dark:hover:border-gaming-cyan/40 light:bg-white/60 light:hover:bg-white/80 light:border light:border-gray-200 light:hover:border-blue-300 light:shadow-sm light:hover:shadow-md"
              >
                <span className="text-lg font-medium transition-colors duration-300 dark:text-gray-300 dark:hover:text-gaming-cyan light:text-gray-700 light:hover:text-blue-600">
                  {platform}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 