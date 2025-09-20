'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import { 
  Shield, 
  Scale, 
  FileText, 
  AlertCircle,
  CheckCircle,
  Calendar,
  Mail,
  User,
  Globe,
  AlertTriangle,
  CreditCard,
  Users,
  Gavel
} from '../../components/icons'

export default function TermsPage() {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: Scale,
      content: [
        {
          subtitle: 'Agreement to Terms',
          text: 'By accessing and using GameVault, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
        },
        {
          subtitle: 'Legal Capacity',
          text: 'You must be at least 18 years old or have reached the age of majority in your jurisdiction to use our services. By using GameVault, you represent that you meet these age requirements.'
        }
      ]
    },
    {
      id: 'service-description',
      title: 'Service Description',
      icon: FileText,
      content: [
        {
          subtitle: 'Platform Overview',
          text: 'GameVault is a digital platform that facilitates the purchase of gaming gift cards using cryptocurrency payments. We act as an intermediary between users and gift card providers.'
        },
        {
          subtitle: 'Service Availability',
          text: 'Our services are available globally, subject to local laws and regulations. We reserve the right to restrict access in certain jurisdictions where our services may not be legally available.'
        },
        {
          subtitle: 'Platform Modifications',
          text: 'We reserve the right to modify, suspend, or discontinue any part of our services at any time with reasonable notice to users.'
        }
      ]
    },
    {
      id: 'user-obligations',
      title: 'User Obligations',
      icon: Users,
      content: [
        {
          subtitle: 'Lawful Use',
          text: 'You agree to use our services only for lawful purposes and in accordance with these Terms. You must not use our services for any illegal activities, fraud, or money laundering.'
        },
        {
          subtitle: 'Account Security',
          text: 'You are responsible for maintaining the security of your account information and any transactions you initiate. We are not liable for unauthorized access resulting from your negligence.'
        },
        {
          subtitle: 'Accurate Information',
          text: 'You must provide accurate and complete information when using our services. Any false or misleading information may result in service termination.'
        }
      ]
    },
    {
      id: 'payment-terms',
      title: 'Payment Terms',
      icon: CreditCard,
      content: [
        {
          subtitle: 'Cryptocurrency Payments',
          text: 'All payments must be made in supported cryptocurrencies. Payments are final and irreversible once confirmed on the blockchain network.'
        },
        {
          subtitle: 'Processing Fees',
          text: 'Our platform charges processing fees as disclosed during checkout. Additional network fees may apply based on the cryptocurrency used and network conditions.'
        },
        {
          subtitle: 'Payment Timeouts',
          text: 'Payment addresses expire after a specified time period. Payments sent to expired addresses may be lost and are not recoverable.'
        }
      ]
    },
    {
      id: 'refund-policy',
      title: 'Refund Policy',
      icon: AlertTriangle,
      content: [
        {
          subtitle: 'Digital Products',
          text: 'Due to the digital nature of gift cards and instant delivery, refunds are generally not available once codes are delivered and functional.'
        },
        {
          subtitle: 'Technical Issues',
          text: 'We may provide refunds or replacements for technical issues, invalid codes, or service failures on a case-by-case basis at our discretion.'
        },
        {
          subtitle: 'Refund Process',
          text: 'Refund requests must be submitted within 24 hours of purchase with valid proof of the issue. Approved refunds are processed in the original cryptocurrency.'
        }
      ]
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: Shield,
      content: [
        {
          subtitle: 'Service Limitations',
          text: 'GameVault is provided "as is" without warranties of any kind. We do not guarantee uninterrupted service or error-free operation.'
        },
        {
          subtitle: 'Third-Party Services',
          text: 'We are not responsible for the actions, policies, or services of third-party gift card providers, payment processors, or other external services.'
        },
        {
          subtitle: 'Damage Limitations',
          text: 'Our total liability for any claims related to our services shall not exceed the amount you paid for the specific transaction giving rise to the claim.'
        }
      ]
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
              <span className="text-white">Terms of</span>
              <span className="cyber-text"> Service</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl text-gray-300 mb-8"
            >
              These terms govern your use of GameVault and outline the rights and 
              responsibilities of all parties using our platform.
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
                    Please read these Terms of Service carefully before using GameVault. 
                    By using our services, you agree to be legally bound by these terms. 
                    If you do not agree with any part of these terms, you must not use our services.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-12 bg-gaming-dark/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="gaming-card"
            >
              <h2 className="text-2xl font-gaming font-bold text-white mb-6 flex items-center">
                <Gavel className="w-6 h-6 mr-3 text-gaming-cyan" />
                Quick Navigation
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sections.map((section, index) => (
                  <motion.a
                    key={section.id}
                    href={`#${section.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="flex items-center space-x-3 p-3 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30 hover:border-gaming-cyan/50 transition-colors"
                  >
                    <section.icon className="w-5 h-5 text-gaming-cyan" />
                    <span className="text-white font-semibold">{section.title}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Terms Sections */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="gaming-card"
              >
                <h2 className="text-2xl md:text-3xl font-gaming font-bold text-white mb-6 flex items-center">
                  <section.icon className="w-8 h-8 mr-4 text-gaming-cyan" />
                  {section.title}
                </h2>
                
                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h3 className="text-xl font-gaming font-semibold text-gaming-gold mb-3">
                        {item.subtitle}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Additional Terms */}
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
                  <Scale className="w-6 h-6 mr-3 text-gaming-neon" />
                  Governing Law
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws 
                  of Malta, without regard to its conflict of law provisions. Any disputes 
                  shall be resolved through binding arbitration.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="gaming-card"
              >
                <h3 className="text-xl font-gaming font-bold text-white mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-gaming-gold" />
                  Terms Updates
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We reserve the right to modify these Terms at any time. Users will be 
                  notified of significant changes, and continued use of our services 
                  constitutes acceptance of the updated terms.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="gaming-card"
            >
              <Gavel className="w-16 h-16 text-gaming-cyan mx-auto mb-6" />
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Questions About <span className="cyber-text">Terms</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                If you have questions about these Terms of Service or need legal clarification, 
                please contact our legal team.
              </p>
              
              <div className="btn-group">
                <button className="btn-neon">
                  <Mail className="w-5 h-5" />
                  Contact Legal Team
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