'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { Spinner } from '../../components/Loading'
import { 
  Mail, 
  MessageCircle, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle,
  Twitter,
  Github,
  Gamepad2,
  Shield,
  Zap,
  Globe,
  Send,
  HelpCircle,
  Users,
  AlertCircle
} from '../../components/icons'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', category: 'general', message: '' })
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      contact: 'support@gamevault.com',
      color: 'text-gaming-cyan',
      bgColor: 'bg-gaming-cyan/20'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      contact: 'Available 24/7',
      color: 'text-gaming-neon',
      bgColor: 'bg-gaming-neon/20'
    },
    {
      icon: Gamepad2,
      title: 'Help Center',
      description: 'Find answers to common questions',
      contact: 'Browse FAQs',
      color: 'text-gaming-gold',
      bgColor: 'bg-gaming-gold/20'
    }
  ]

  const supportCategories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'payment', label: 'Payment Issues' },
    { value: 'account', label: 'Account Problems' },
    { value: 'refund', label: 'Refund Request' },
    { value: 'partnership', label: 'Business Partnership' }
  ]

  const stats = [
    { icon: Gamepad2, value: '50K+', label: 'Happy Customers' },
    { icon: Clock, value: '<2hr', label: 'Average Response' },
    { icon: Shield, value: '99.9%', label: 'Uptime' },
    { icon: Zap, value: '24/7', label: 'Support Available' }
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
              <span className="text-white">Contact</span>
              <span className="cyber-text"> Support</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Need help? Our expert support team is here to assist you with any questions 
              or issues you may have.
            </motion.p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="gaming-card text-center hover:border-gaming-cyan/50 transition-colors cursor-pointer"
                >
                  <div className={`inline-flex p-4 rounded-lg ${method.bgColor} mb-4`}>
                    <method.icon className={`w-8 h-8 ${method.color}`} />
                  </div>
                  <h3 className="text-xl font-gaming font-bold text-white mb-2">{method.title}</h3>
                  <p className="text-gray-400 mb-4">{method.description}</p>
                  <div className={`font-semibold ${method.color}`}>{method.contact}</div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center p-6 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30"
                >
                  <stat.icon className="w-8 h-8 text-gaming-cyan mx-auto mb-3" />
                  <div className="text-2xl font-gaming font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-gaming font-bold text-white mb-4">
                Send Us a <span className="cyber-text">Message</span>
              </h2>
              <p className="text-xl text-gray-300">
                Fill out the form below and we'll get back to you as soon as possible
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="gaming-card"
            >
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-gaming-neon/20 border border-gaming-neon/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-gaming-neon" />
                    <div>
                      <h3 className="font-semibold text-gaming-neon">Message Sent Successfully!</h3>
                      <p className="text-sm text-gray-300">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-400/20 border border-red-400/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <ArrowRight className="w-6 h-6 text-red-400" />
                    <div>
                      <h3 className="font-semibold text-red-400">Error Sending Message</h3>
                      <p className="text-sm text-gray-300">Please try again or contact us directly.</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-cyber"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-cyber"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input-cyber"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="input-cyber"
                    >
                      {supportCategories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input-cyber resize-none"
                    placeholder="Please provide as much detail as possible about your inquiry..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">
                    * Required fields
                  </p>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-neon px-8 py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner className="w-5 h-5 mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="gaming-card"
              >
                <h3 className="text-2xl font-gaming font-bold text-white mb-6">
                  <Clock className="w-6 h-6 text-gaming-cyan inline mr-3" />
                  Support Hours
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email Support:</span>
                    <span className="text-white">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Live Chat:</span>
                    <span className="text-white">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Response Time:</span>
                    <span className="text-gaming-neon">Within 2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Languages:</span>
                    <span className="text-white">English, Spanish, French</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="gaming-card"
              >
                <h3 className="text-2xl font-gaming font-bold text-white mb-6">
                  <MapPin className="w-6 h-6 text-gaming-gold inline mr-3" />
                  Company Info
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-400 mb-1">Company:</div>
                    <div className="text-white">GameVault Technologies Ltd.</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Registration:</div>
                    <div className="text-white">Digital Commerce License #DC2024-001</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Jurisdiction:</div>
                    <div className="text-white">Malta Gaming Authority</div>
                  </div>
                  <div>
                    <div className="text-gray-400 mb-1">Established:</div>
                    <div className="text-white">2024</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="py-12 bg-gaming-dark/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="gaming-card"
            >
              <Shield className="w-12 h-12 text-gaming-gold mx-auto mb-4" />
              <h3 className="text-2xl font-gaming font-bold text-white mb-4">
                Urgent Issues?
              </h3>
              <p className="text-gray-300 mb-6">
                For critical payment issues or account security concerns, 
                please contact our priority support line immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-neon">
                  <Mail className="w-5 h-5 mr-2" />
                  priority@gamevault.com
                </button>
                <button className="glass-dark hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 border border-gaming-purple/30 hover:border-gaming-cyan/50">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Emergency Chat
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