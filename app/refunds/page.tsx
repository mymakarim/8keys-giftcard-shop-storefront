'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { 
  RefreshCw, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Mail,
  DollarSign,
  Calendar,
  ArrowRight,
  XCircle,
  AlertTriangle,
  FileText,
  RotateCcw,
  HelpCircle
} from '../../components/icons'

export default function RefundsPage() {
  const refundScenarios = [
    {
      scenario: 'Invalid Gift Card Codes',
      eligible: true,
      timeframe: '24 hours',
      description: 'If you receive gift card codes that are invalid, already used, or do not work on the intended platform.',
      process: 'Contact support with order details and proof of invalid codes. We will investigate and provide replacement codes or full refund.'
    },
    {
      scenario: 'Technical Platform Issues',
      eligible: true,
      timeframe: '48 hours',
      description: 'If our platform experiences technical issues that prevent successful delivery of your purchase.',
      process: 'Automatic detection and refund processing. Manual claims can be submitted through support channels.'
    },
    {
      scenario: 'Payment Processing Errors',
      eligible: true,
      timeframe: '72 hours',
      description: 'If your cryptocurrency payment is processed but you do not receive your gift card codes due to system errors.',
      process: 'Our automated systems will detect and process refunds. Contact support if not resolved automatically.'
    },
    {
      scenario: 'Wrong Gift Card Platform',
      eligible: false,
      timeframe: 'N/A',
      description: 'If you accidentally purchase gift cards for the wrong gaming platform or region.',
      process: 'Due to the digital nature and instant delivery, these purchases are generally not refundable. Please double-check before purchasing.'
    },
    {
      scenario: 'Change of Mind',
      eligible: false,
      timeframe: 'N/A',
      description: 'If you simply change your mind after receiving functional gift card codes.',
      process: 'Digital products with instant delivery are not eligible for refunds due to change of mind.'
    },
    {
      scenario: 'Delivered but Unused Codes',
      eligible: false,
      timeframe: 'N/A',
      description: 'If you receive working gift card codes but decide not to use them.',
      process: 'Once functional codes are delivered, they cannot be refunded even if unused.'
    }
  ]

  const refundProcess = [
    {
      step: 1,
      title: 'Submit Request',
      description: 'Contact our support team within the eligible timeframe with your order details.',
      icon: Mail,
      timeframe: 'Immediate'
    },
    {
      step: 2,
      title: 'Investigation',
      description: 'Our team investigates your claim and verifies the issue with gift card providers.',
      icon: AlertCircle,
      timeframe: '1-3 business days'
    },
    {
      step: 3,
      title: 'Decision',
      description: 'We notify you of our decision and explain the resolution or reason for denial.',
      icon: CheckCircle,
      timeframe: '24-48 hours'
    },
    {
      step: 4,
      title: 'Processing',
      description: 'Approved refunds are processed back to your original cryptocurrency wallet.',
      icon: DollarSign,
      timeframe: '1-5 business days'
    }
  ]

  const importantNotes = [
    {
      title: 'Cryptocurrency Refunds',
      content: 'All refunds are processed in the same cryptocurrency used for the original purchase. We cannot convert to different cryptocurrencies or fiat currency.',
      icon: DollarSign
    },
    {
      title: 'Network Fees',
      content: 'Refund amounts may be reduced by blockchain network fees required to process the return transaction.',
      icon: AlertTriangle
    },
    {
      title: 'Timeframe Requirements',
      content: 'Refund requests must be submitted within the specified timeframe for each scenario. Late requests may not be processed.',
      icon: Clock
    },
    {
      title: 'Proof Required',
      content: 'Valid proof of the issue must be provided, including screenshots, error messages, or other documentation.',
      icon: FileText
    }
  ]

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
              <span className="text-white">Refund</span>
              <span className="cyber-text"> Policy</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl text-gray-300 mb-8"
            >
              Understand our refund policy for digital gift card purchases and 
              learn about eligible scenarios and the refund process.
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

        {/* Important Notice */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="gaming-card border-gaming-gold/50"
            >
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-8 h-8 text-gaming-gold flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-gaming font-bold text-gaming-gold mb-3">
                    Important Notice
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Due to the digital nature of gift cards and instant delivery system, 
                    refunds are limited to specific scenarios. Please review this policy 
                    carefully before making a purchase and ensure you select the correct 
                    platform and region for your gift cards.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Refund Scenarios */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Refund <span className="cyber-text">Scenarios</span>
              </h2>
              <p className="text-xl text-gray-300">
                When refunds are and are not available
              </p>
            </motion.div>

            <div className="space-y-6">
              {refundScenarios.map((scenario, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`gaming-card ${scenario.eligible ? 'border-gaming-neon/30' : 'border-red-400/30'}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${scenario.eligible ? 'bg-gaming-neon/20' : 'bg-red-400/20'}`}>
                      {scenario.eligible ? (
                        <CheckCircle className="w-8 h-8 text-gaming-neon" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-400" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-gaming font-bold text-white">
                          {scenario.scenario}
                        </h3>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            scenario.eligible 
                              ? 'bg-gaming-neon/20 text-gaming-neon' 
                              : 'bg-red-400/20 text-red-400'
                          }`}>
                            {scenario.eligible ? 'Eligible' : 'Not Eligible'}
                          </span>
                          {scenario.eligible && (
                            <span className="px-3 py-1 bg-gaming-gold/20 text-gaming-gold rounded-full text-sm font-medium">
                              {scenario.timeframe}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {scenario.description}
                      </p>
                      
                      <div className="p-4 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30">
                        <h4 className="font-semibold text-gaming-cyan mb-2">Process:</h4>
                        <p className="text-gray-400 text-sm">{scenario.process}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Refund Process */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Refund <span className="cyber-text">Process</span>
              </h2>
              <p className="text-xl text-gray-300">
                Step-by-step guide to requesting a refund
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {refundProcess.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="gaming-card text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gaming-purple/20 rounded-full mx-auto flex items-center justify-center border-2 border-gaming-cyan/30">
                      <step.icon className="w-8 h-8 text-gaming-cyan" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gaming-gold rounded-full flex items-center justify-center text-gaming-darker font-bold text-sm">
                      {step.step}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-gaming font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="px-3 py-1 bg-gaming-dark/50 rounded-full text-gaming-gold text-xs font-medium">
                    {step.timeframe}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Important <span className="cyber-text">Notes</span>
              </h2>
              <p className="text-xl text-gray-300">
                Key information about our refund policy
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {importantNotes.map((note, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="gaming-card"
                >
                  <div className="flex items-start space-x-4">
                    <note.icon className="w-8 h-8 text-gaming-cyan flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-gaming font-bold text-white mb-3">
                        {note.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {note.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Prevention Tips */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="gaming-card"
            >
              <h2 className="text-2xl font-gaming font-bold text-white mb-6 flex items-center">
                <Shield className="w-8 h-8 mr-4 text-gaming-cyan" />
                Prevention Tips
              </h2>
              
              <div className="space-y-4">
                <h3 className="text-xl font-gaming font-semibold text-gaming-gold mb-4">
                  How to Avoid Refund Issues
                </h3>
                
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-gaming-neon flex-shrink-0 mt-0.5" />
                    <span>Double-check the gaming platform and region before purchasing</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-gaming-neon flex-shrink-0 mt-0.5" />
                    <span>Verify your email address to ensure you receive gift card codes</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-gaming-neon flex-shrink-0 mt-0.5" />
                    <span>Read platform-specific terms and regional restrictions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-gaming-neon flex-shrink-0 mt-0.5" />
                    <span>Contact support immediately if you encounter any issues</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-gaming-neon flex-shrink-0 mt-0.5" />
                    <span>Keep order confirmations and transaction records for reference</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="gaming-card"
            >
              <RotateCcw className="w-16 h-16 text-gaming-cyan mx-auto mb-6" />
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Need a <span className="cyber-text">Refund</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                If you believe your situation qualifies for a refund, contact our support team 
                with your order details and explanation of the issue.
              </p>
              
              <div className="btn-group">
                <button className="btn-neon">
                  <Mail className="w-5 h-5" />
                  Request Refund
                </button>
                <button className="btn-secondary">
                  <HelpCircle className="w-5 h-5" />
                  Contact Support
                </button>
              </div>
              
              <div className="mt-6 p-4 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30">
                <p className="text-sm text-gray-400">
                  <strong>Response Time:</strong> We aim to respond to all refund requests within 24 hours. 
                  Complex cases may take up to 3 business days for full investigation.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      
      <Footer />
    </main>
  )
} 