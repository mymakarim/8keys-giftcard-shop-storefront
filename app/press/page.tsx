'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import { 
  FileText, 
  Download,
  Image,
  Video,
  Users,
  Calendar,
  Mail,
  Phone,
  Globe,
  Award,
  TrendingUp,
  Building,
  Zap,
  Shield,
  Camera,
  Monitor,
  Smartphone
} from '../../components/icons'

export default function PressPage() {
  const companyFacts = [
    { label: 'Founded', value: '2024' },
    { label: 'Headquarters', value: 'Malta' },
    { label: 'Active Users', value: '50,000+' },
    { label: 'Supported Platforms', value: '100+' },
    { label: 'Countries Served', value: '50+' },
    { label: 'Transaction Volume', value: '$10M+' },
    { label: 'Uptime', value: '99.9%' },
    { label: 'Security Rating', value: 'A+' }
  ]

  const mediaAssets = [
    {
      category: 'Logos',
      icon: Image,
      items: [
        { name: 'GameVault Logo - Light', format: 'PNG, SVG', size: '2MB' },
        { name: 'GameVault Logo - Dark', format: 'PNG, SVG', size: '2MB' },
        { name: 'GameVault Icon', format: 'PNG, ICO', size: '1MB' },
        { name: 'GameVault Wordmark', format: 'PNG, SVG', size: '1.5MB' }
      ]
    },
    {
      category: 'Screenshots',
      icon: Monitor,
      items: [
        { name: 'Homepage Screenshot', format: 'PNG', size: '5MB' },
        { name: 'Gift Card Browse', format: 'PNG', size: '4MB' },
        { name: 'Purchase Flow', format: 'PNG', size: '3MB' },
        { name: 'Mobile Interface', format: 'PNG', size: '2MB' }
      ]
    },
    {
      category: 'Brand Assets',
      icon: Camera,
      items: [
        { name: 'Color Palette', format: 'PDF', size: '500KB' },
        { name: 'Typography Guide', format: 'PDF', size: '1MB' },
        { name: 'Brand Guidelines', format: 'PDF', size: '3MB' },
        { name: 'Usage Guidelines', format: 'PDF', size: '2MB' }
      ]
    },
    {
      category: 'Product Images',
      icon: Smartphone,
      items: [
        { name: 'Platform Mockups', format: 'PNG', size: '8MB' },
        { name: 'Mobile App Screens', format: 'PNG', size: '6MB' },
        { name: 'Feature Highlights', format: 'PNG', size: '4MB' },
        { name: 'UI Components', format: 'PNG', size: '3MB' }
      ]
    }
  ]

  const executiveTeam = [
    {
      name: 'Alex Chen',
      role: 'CEO & Founder',
      bio: 'Former blockchain engineer with 8+ years in cryptocurrency and gaming. Previously led development at major fintech companies.',
      image: '/team/alex-chen.jpg'
    },
    {
      name: 'Sarah Kim',
      role: 'CTO',
      bio: 'Expert in secure payment systems and cryptocurrency integration. Former security architect at leading payment processors.',
      image: '/team/sarah-kim.jpg'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Security',
      bio: 'Cybersecurity specialist with focus on cryptocurrency security. Former consultant for major blockchain projects.',
      image: '/team/marcus-rodriguez.jpg'
    },
    {
      name: 'Emma Thompson',
      role: 'Head of Operations',
      bio: 'Gaming industry veteran with 10+ years in digital commerce and platform operations.',
      image: '/team/emma-thompson.jpg'
    }
  ]

  const pressReleases = [
    {
      date: '2024-03-15',
      title: 'GameVault Launches Revolutionary Cryptocurrency-Powered Gaming Gift Card Platform',
      excerpt: 'New platform enables instant, anonymous gift card purchases using Bitcoin, Ethereum, and other cryptocurrencies.',
      category: 'Product Launch'
    },
    {
      date: '2024-03-10',
      title: 'GameVault Secures $5M Seed Funding to Expand Global Operations',
      excerpt: 'Investment round led by prominent blockchain VCs to accelerate platform development and market expansion.',
      category: 'Funding'
    },
    {
      date: '2024-03-05',
      title: 'GameVault Partners with Major Gaming Platforms for Expanded Gift Card Selection',
      excerpt: 'Strategic partnerships bring support for 100+ gaming platforms including Steam, PlayStation, Xbox, and more.',
      category: 'Partnership'
    },
    {
      date: '2024-02-28',
      title: 'GameVault Achieves SOC 2 Type II Compliance for Enhanced Security',
      excerpt: 'Platform meets highest security standards for cryptocurrency transactions and user data protection.',
      category: 'Security'
    }
  ]

  const awards = [
    {
      year: '2024',
      award: 'Best Fintech Innovation',
      organization: 'Crypto Awards',
      description: 'Recognition for innovative cryptocurrency payment integration'
    },
    {
      year: '2024',
      award: 'Gaming Platform of the Year',
      organization: 'Digital Commerce Awards',
      description: 'Excellence in gaming-focused digital commerce platform'
    },
    {
      year: '2024',
      award: 'Security Excellence Award',
      organization: 'Cybersecurity Institute',
      description: 'Outstanding security implementation for cryptocurrency platforms'
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
              <span className="text-white">Press</span>
              <span className="cyber-text"> Kit</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Everything you need to know about GameVault - from company information 
              and media assets to executive bios and press releases.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="btn-group"
            >
              <button className="btn-neon">
                <Download className="w-5 h-5" />
                Download Full Press Kit
              </button>
              <button className="btn-secondary">
                <Mail className="w-5 h-5" />
                Contact Press Team
              </button>
            </motion.div>
          </div>
        </section>

        {/* Company Facts */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Company <span className="cyber-text">Facts</span>
              </h2>
              <p className="text-xl text-gray-300">
                Key information about GameVault at a glance
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {companyFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center p-6 gaming-card"
                >
                  <div className="text-2xl md:text-3xl font-gaming font-bold text-gaming-cyan mb-2">
                    {fact.value}
                  </div>
                  <div className="text-gray-400">{fact.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Assets */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Media <span className="cyber-text">Assets</span>
              </h2>
              <p className="text-xl text-gray-300">
                High-quality assets for your stories and articles
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mediaAssets.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="gaming-card"
                >
                  <h3 className="text-xl font-gaming font-bold text-white mb-6 flex items-center">
                    <category.icon className="w-6 h-6 mr-3 text-gaming-cyan" />
                    {category.category}
                  </h3>
                  
                  <div className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between p-3 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30">
                        <div>
                          <div className="text-white font-semibold">{item.name}</div>
                          <div className="text-gray-400 text-sm">{item.format} • {item.size}</div>
                        </div>
                        <button className="p-2 hover:bg-gaming-purple/20 rounded-lg transition-colors">
                          <Download className="w-5 h-5 text-gaming-cyan" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gaming-purple/20">
                    <button className="btn-secondary w-full">
                      <Download className="w-5 h-5" />
                      Download All {category.category}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Executive Team */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Executive <span className="cyber-text">Team</span>
              </h2>
              <p className="text-xl text-gray-300">
                Meet the leaders driving GameVault's vision
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {executiveTeam.map((executive, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="gaming-card"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gaming-purple/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-10 h-10 text-gaming-cyan" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-gaming font-bold text-white mb-1">{executive.name}</h3>
                      <p className="text-gaming-cyan mb-3">{executive.role}</p>
                      <p className="text-gray-300 text-sm leading-relaxed">{executive.bio}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Press Releases */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Press <span className="cyber-text">Releases</span>
              </h2>
              <p className="text-xl text-gray-300">
                Latest news and announcements from GameVault
              </p>
            </motion.div>

            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="gaming-card hover:border-gaming-cyan/50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="text-gaming-gold font-semibold">
                          {new Date(release.date).toLocaleDateString()}
                        </span>
                        <span className="px-3 py-1 bg-gaming-purple/20 text-gaming-purple rounded-full text-sm font-medium">
                          {release.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-gaming font-bold text-white mb-2">{release.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{release.excerpt}</p>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="btn-secondary">
                        <FileText className="w-5 h-5" />
                        Read Full Release
                      </button>
                      <button className="p-3 border border-gaming-purple/30 rounded-lg hover:bg-gaming-purple/20 transition-colors">
                        <Download className="w-5 h-5 text-gaming-cyan" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Awards & <span className="cyber-text">Recognition</span>
              </h2>
              <p className="text-xl text-gray-300">
                Industry recognition for innovation and excellence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {awards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center p-6 gaming-card"
                >
                  <Award className="w-16 h-16 text-gaming-gold mx-auto mb-4" />
                  <div className="text-gaming-gold font-bold mb-2">{award.year}</div>
                  <h3 className="text-lg font-gaming font-bold text-white mb-2">{award.award}</h3>
                  <p className="text-gaming-cyan mb-3">{award.organization}</p>
                  <p className="text-gray-400 text-sm">{award.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Contact */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="gaming-card text-center"
            >
              <FileText className="w-16 h-16 text-gaming-cyan mx-auto mb-6" />
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Media <span className="cyber-text">Contact</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                For press inquiries, interview requests, or additional information, 
                please contact our media relations team.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="text-left">
                  <h3 className="text-lg font-gaming font-bold text-white mb-4">Press Inquiries</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gaming-cyan" />
                      <span className="text-gray-300">press@gamevault.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gaming-cyan" />
                      <span className="text-gray-300">+1 (555) 123-4567</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-left">
                  <h3 className="text-lg font-gaming font-bold text-white mb-4">General Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-gaming-cyan" />
                      <span className="text-gray-300">GameVault Ltd., Malta</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-gaming-cyan" />
                      <span className="text-gray-300">www.gamevault.com</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="btn-group">
                <button className="btn-neon">
                  <Mail className="w-5 h-5" />
                  Send Press Inquiry
                </button>
                <button className="btn-secondary">
                  <Calendar className="w-5 h-5" />
                  Schedule Interview
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
} 