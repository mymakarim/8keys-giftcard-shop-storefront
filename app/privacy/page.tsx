'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import { 
  Shield, 
  Eye,
  Lock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Mail,
  Globe,
  User,
  Database,
  FileText
} from '../../components/icons'

export default function PrivacyPage() {
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: Database,
      content: [
        {
          subtitle: 'Information You Provide',
          text: 'We collect information you voluntarily provide, such as email addresses for order confirmations and customer support communications. We do not require personal identification for purchases.'
        },
        {
          subtitle: 'Automatically Collected Information',
          text: 'We automatically collect certain technical information including IP addresses, browser type, device information, and usage patterns to improve our services and ensure security.'
        },
        {
          subtitle: 'Cryptocurrency Transaction Data',
          text: 'We process cryptocurrency transaction data necessary to complete purchases, including wallet addresses and transaction hashes. This data is processed securely and not stored permanently.'
        }
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: Eye,
      content: [
        {
          subtitle: 'Service Provision',
          text: 'We use your information to process orders, deliver gift card codes, provide customer support, and maintain platform functionality.'
        },
        {
          subtitle: 'Security and Fraud Prevention',
          text: 'We analyze usage patterns and transaction data to detect and prevent fraudulent activities, ensuring the security of our platform and users.'
        },
        {
          subtitle: 'Service Improvement',
          text: 'We use aggregated, anonymized data to improve our services, develop new features, and enhance user experience.'
        }
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: Globe,
      content: [
        {
          subtitle: 'Third-Party Service Providers',
          text: 'We share necessary information with trusted service providers including payment processors (P100), gift card suppliers, and security services. These providers are bound by strict confidentiality agreements.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose information when required by law, legal process, or to protect our rights, property, or safety, or that of our users or the public.'
        },
        {
          subtitle: 'Business Transfers',
          text: 'In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the transaction, subject to the same privacy protections.'
        }
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Lock,
      content: [
        {
          subtitle: 'Encryption',
          text: 'All data transmission is encrypted using industry-standard SSL/TLS protocols. Sensitive data is encrypted at rest using advanced encryption algorithms.'
        },
        {
          subtitle: 'Access Controls',
          text: 'We implement strict access controls, ensuring only authorized personnel can access user data, and only when necessary for legitimate business purposes.'
        },
        {
          subtitle: 'Security Monitoring',
          text: 'Our systems are continuously monitored for security threats, with automated alerts and response procedures to address potential breaches.'
        }
      ]
    },
    {
      id: 'user-rights',
      title: 'Your Rights',
      icon: Shield,
      content: [
        {
          subtitle: 'Access and Correction',
          text: 'You have the right to access, correct, or update your personal information. Contact our support team to exercise these rights.'
        },
        {
          subtitle: 'Data Deletion',
          text: 'You may request deletion of your personal information, subject to legal and business requirements. Some data may be retained for security and compliance purposes.'
        },
        {
          subtitle: 'Marketing Communications',
          text: 'You can opt out of marketing communications at any time by using the unsubscribe link in emails or contacting our support team.'
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
              <span className="text-white">Privacy</span>
              <span className="cyber-text"> Policy</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl text-gray-300 mb-8"
            >
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your information when you use GameVault.
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
                <Database className="w-6 h-6 mr-3 text-gaming-cyan" />
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

        {/* Privacy Policy Sections */}
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

        {/* Additional Information */}
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
                  International Users
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  GameVault operates globally and complies with applicable data protection laws 
                  including GDPR, CCPA, and other regional privacy regulations. We implement 
                  appropriate safeguards for international data transfers.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="gaming-card"
              >
                <h3 className="text-xl font-gaming font-bold text-white mb-4 flex items-center">
                  <Calendar className="w-6 h-6 mr-3 text-gaming-gold" />
                  Policy Updates
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  We may update this Privacy Policy periodically to reflect changes in our 
                  practices or legal requirements. We will notify users of significant changes 
                  through our website or email communications.
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
              <Shield className="w-16 h-16 text-gaming-cyan mx-auto mb-6" />
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Questions About <span className="cyber-text">Privacy</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                If you have questions about this Privacy Policy or how we handle your information, 
                please don't hesitate to contact us.
              </p>
              
              <div className="btn-group">
                <button className="btn-neon">
                  <Mail className="w-5 h-5" />
                  Contact Privacy Team
                </button>
                <button className="btn-secondary">
                  <Database className="w-5 h-5" />
                  View Terms of Service
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
} 