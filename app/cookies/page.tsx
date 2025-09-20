'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import { 
  Shield, 
  Eye, 
  Settings, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Globe,
  Lock,
  User,
  Mail,
  ToggleLeft,
  ToggleRight
} from '../../components/icons'
import { useState } from 'react'

export default function CookiesPage() {
  const [cookieSettings, setCookieSettings] = useState({
    essential: true,
    analytics: true,
    marketing: false,
    preferences: true
  })

  const cookieTypes = [
    {
      id: 'essential',
      title: 'Essential Cookies',
      icon: Shield,
      description: 'These cookies are necessary for the website to function and cannot be switched off.',
      required: true,
      examples: [
        'Session management and security',
        'Payment processing functionality',
        'Basic site navigation and features'
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics Cookies',
      icon: Eye,
      description: 'These cookies help us understand how visitors interact with our website.',
      required: false,
      examples: [
        'Page views and user behavior tracking',
        'Performance monitoring and optimization',
        'Error reporting and debugging'
      ]
    },
    {
      id: 'marketing',
      title: 'Marketing Cookies',
      icon: Eye,
      description: 'These cookies are used to deliver relevant advertisements and track campaign effectiveness.',
      required: false,
      examples: [
        'Targeted advertising and retargeting',
        'Social media integration',
        'Marketing campaign measurement'
      ]
    },
    {
      id: 'preferences',
      title: 'Preference Cookies',
      icon: Settings,
      description: 'These cookies remember your choices and preferences to enhance your experience.',
      required: false,
      examples: [
        'Language and region preferences',
        'Theme and display settings',
        'Personalized content delivery'
      ]
    }
  ]

  const thirdPartyServices = [
    {
      name: 'Google Analytics',
      purpose: 'Website analytics and performance tracking',
      cookies: '_ga, _gid, _gat',
      retention: '2 years'
    },
    {
      name: 'P100 Payment Processor',
      purpose: 'Secure cryptocurrency payment processing',
      cookies: 'p100_session, p100_csrf',
      retention: 'Session only'
    },
    {
      name: 'CloudFlare',
      purpose: 'Security and performance optimization',
      cookies: '__cflb, __cf_bm',
      retention: '30 minutes - 1 year'
    }
  ]

  const toggleCookieSetting = (type: string) => {
    if (type === 'essential') return // Cannot toggle essential cookies
    setCookieSettings(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof cookieSettings]
    }))
  }

  const lastUpdated = '2024-03-15'

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
              <span className="text-white">Cookie</span>
              <span className="cyber-text"> Policy</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl text-gray-300 mb-8"
            >
              Learn about how GameVault uses cookies and similar technologies to 
              enhance your browsing experience and improve our services.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center justify-center space-x-4 text-gaming-gold"
            >
              <Calendar className="w-5 h-5" />
              <span>Last updated: {new Date(lastUpdated).toLocaleDateString()}</span>
            </motion.div>
          </div>
        </section>

        {/* What Are Cookies */}
        <section className="py-12 bg-gaming-dark/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="gaming-card"
            >
              <h2 className="text-2xl font-gaming font-bold text-white mb-6 flex items-center">
                <Shield className="w-8 h-8 mr-4 text-gaming-cyan" />
                What Are Cookies?
              </h2>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Cookies are small text files that are placed on your device when you visit a website. 
                  They are widely used to make websites work more efficiently and to provide information 
                  to website owners about user behavior and preferences.
                </p>
                <p>
                  At GameVault, we use cookies to enhance your gaming experience, secure your transactions, 
                  and improve our platform's performance. We are committed to being transparent about 
                  our cookie usage and giving you control over your preferences.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cookie Types & Settings */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Cookie <span className="cyber-text">Categories</span>
              </h2>
              <p className="text-xl text-gray-300">
                Manage your cookie preferences for each category
              </p>
            </motion.div>

            <div className="space-y-6">
              {cookieTypes.map((type, index) => (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="gaming-card"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <type.icon className="w-8 h-8 text-gaming-cyan flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="text-xl font-gaming font-bold text-white mb-2">
                          {type.title}
                        </h3>
                        <p className="text-gray-300 mb-4">{type.description}</p>
                        
                        <div>
                          <h4 className="font-semibold text-gaming-gold mb-2">Examples:</h4>
                          <ul className="space-y-1">
                            {type.examples.map((example, exampleIndex) => (
                              <li key={exampleIndex} className="flex items-center space-x-2 text-gray-400">
                                <div className="w-1.5 h-1.5 bg-gaming-cyan rounded-full" />
                                <span>{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {type.required ? (
                        <span className="px-3 py-1 bg-gaming-neon/20 text-gaming-neon rounded-full text-sm font-medium">
                          Required
                        </span>
                      ) : (
                        <button
                          onClick={() => toggleCookieSetting(type.id)}
                          className="flex items-center space-x-2"
                        >
                          {cookieSettings[type.id as keyof typeof cookieSettings] ? (
                            <ToggleRight className="w-8 h-8 text-gaming-neon" />
                          ) : (
                            <ToggleLeft className="w-8 h-8 text-gray-500" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Third-Party Services */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Third-Party <span className="cyber-text">Services</span>
              </h2>
              <p className="text-xl text-gray-300">
                External services that may set cookies on our website
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {thirdPartyServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="gaming-card"
                >
                  <h3 className="text-lg font-gaming font-bold text-white mb-3">
                    {service.name}
                  </h3>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gaming-gold font-semibold">Purpose:</span>
                      <p className="text-gray-300 mt-1">{service.purpose}</p>
                    </div>
                    
                    <div>
                      <span className="text-gaming-gold font-semibold">Cookies:</span>
                      <p className="text-gray-300 mt-1 font-mono text-xs">{service.cookies}</p>
                    </div>
                    
                    <div>
                      <span className="text-gaming-gold font-semibold">Retention:</span>
                      <p className="text-gray-300 mt-1">{service.retention}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Managing Cookies */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="gaming-card"
            >
              <h2 className="text-2xl font-gaming font-bold text-white mb-6 flex items-center">
                <Settings className="w-8 h-8 mr-4 text-gaming-cyan" />
                Managing Your Cookie Preferences
              </h2>
              
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <div>
                  <h3 className="text-xl font-gaming font-semibold text-gaming-gold mb-3">
                    Browser Settings
                  </h3>
                  <p className="mb-4">
                    You can control cookies through your browser settings. Most browsers allow you to:
                  </p>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gaming-cyan rounded-full" />
                      <span>View and delete existing cookies</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gaming-cyan rounded-full" />
                      <span>Block cookies from specific websites</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gaming-cyan rounded-full" />
                      <span>Block third-party cookies</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gaming-cyan rounded-full" />
                      <span>Clear cookies when you close your browser</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-gaming font-semibold text-gaming-gold mb-3">
                    Impact of Disabling Cookies
                  </h3>
                  <p>
                    Please note that disabling certain cookies may affect the functionality of GameVault. 
                    Essential cookies are required for basic site operation, including secure payment processing 
                    and account management. Disabling analytics cookies will not affect your ability to use 
                    the platform but may limit our ability to improve the service.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact & Updates */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="gaming-card"
              >
                <h3 className="text-xl font-gaming font-bold text-white mb-4 flex items-center">
                  <Globe className="w-6 h-6 mr-3 text-gaming-neon" />
                  Policy Updates
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We may update this Cookie Policy from time to time to reflect changes in our 
                  practices or for other operational, legal, or regulatory reasons. We will notify 
                  users of any significant changes through our website.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="gaming-card"
              >
                <h3 className="text-xl font-gaming font-bold text-white mb-4 flex items-center">
                  <Mail className="w-6 h-6 mr-3 text-gaming-gold" />
                  Questions?
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  If you have questions about our use of cookies or this Cookie Policy, 
                  please contact our privacy team. We're here to help you understand 
                  how we protect your privacy while enhancing your gaming experience.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Cookie Consent Actions */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="gaming-card"
            >
              <Shield className="w-16 h-16 text-gaming-cyan mx-auto mb-6" />
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Update Your <span className="cyber-text">Preferences</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                You can change your cookie preferences at any time. Your choices will be 
                saved and applied to your future visits to GameVault.
              </p>
              
              <div className="btn-group">
                <button className="btn-neon">
                  <Settings className="w-5 h-5" />
                  Save Cookie Preferences
                </button>
                <button className="btn-secondary">
                  <Shield className="w-5 h-5" />
                  View Privacy Policy
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
} 