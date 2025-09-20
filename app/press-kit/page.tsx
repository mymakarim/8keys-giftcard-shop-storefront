'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import { 
  Download, 
  Image, 
  FileText,
  Users,
  Calendar,
  Award,
  TrendingUp,
  Globe,
  Mail,
  ExternalLink,
  Copy,
  Camera
} from '../../components/icons'

export default function PressKitPage() {
  const companyFacts = [
    { label: 'Founded', value: '2024' },
    { label: 'Headquarters', value: 'Malta' },
    { label: 'Industry', value: 'Gaming & Cryptocurrency' },
    { label: 'Users', value: '50,000+' },
    { label: 'Platforms Supported', value: '100+' },
    { label: 'Countries Served', value: '50+' }
  ]

  const keyMetrics = [
    { icon: Users, value: '50K+', label: 'Active Users' },
    { icon: Award, value: '100+', label: 'Gaming Platforms' },
    { icon: TrendingUp, value: '99.9%', label: 'Uptime' },
    { icon: Globe, value: '50+', label: 'Countries' }
  ]

  const mediaAssets = [
    {
      category: 'Logos',
      items: [
        { name: 'GameVault Logo - Primary', format: 'PNG, SVG', size: '2.1 MB' },
        { name: 'GameVault Logo - White', format: 'PNG, SVG', size: '1.8 MB' },
        { name: 'GameVault Logo - Dark', format: 'PNG, SVG', size: '1.9 MB' },
        { name: 'GameVault Icon', format: 'PNG, SVG', size: '0.5 MB' }
      ]
    },
    {
      category: 'Screenshots',
      items: [
        { name: 'Homepage Screenshot', format: 'PNG', size: '3.2 MB' },
        { name: 'Gift Cards Page', format: 'PNG', size: '2.8 MB' },
        { name: 'Purchase Flow', format: 'PNG', size: '4.1 MB' },
        { name: 'Wallet Interface', format: 'PNG', size: '2.5 MB' }
      ]
    },
    {
      category: 'Brand Assets',
      items: [
        { name: 'Brand Guidelines', format: 'PDF', size: '5.2 MB' },
        { name: 'Color Palette', format: 'PDF', size: '0.8 MB' },
        { name: 'Typography Guide', format: 'PDF', size: '1.2 MB' },
        { name: 'Marketing Templates', format: 'ZIP', size: '12.5 MB' }
      ]
    }
  ]

  const pressReleases = [
    {
      date: '2024-03-15',
      title: 'GameVault Launches Revolutionary Cryptocurrency Gaming Platform',
      excerpt: 'New platform enables instant, anonymous gift card purchases for 100+ gaming platforms using Bitcoin, Ethereum, and other cryptocurrencies.',
      link: '#'
    },
    {
      date: '2024-03-01',
      title: 'GameVault Secures P100 Partnership for Enhanced Payment Processing',
      excerpt: 'Strategic partnership with P100 brings advanced cryptocurrency payment capabilities and improved security to the platform.',
      link: '#'
    },
    {
      date: '2024-02-15',
      title: 'GameVault Expands to 50 Countries, Reaches 50,000 Users',
      excerpt: 'Rapid global expansion demonstrates growing demand for cryptocurrency-powered gaming commerce solutions.',
      link: '#'
    }
  ]

  const executiveTeam = [
    {
      name: 'Alex Chen',
      title: 'CEO & Founder',
      bio: 'Blockchain engineer with 8+ years in cryptocurrency and gaming. Previously led development teams at major fintech companies.',
      image: '/team/alex-chen.jpg'
    },
    {
      name: 'Sarah Kim',
      title: 'CTO',
      bio: 'Expert in secure payment systems and cryptocurrency integration. Former senior engineer at leading blockchain companies.',
      image: '/team/sarah-kim.jpg'
    },
    {
      name: 'Marcus Rodriguez',
      title: 'Head of Security',
      bio: 'Cybersecurity specialist with extensive experience in financial services and cryptocurrency security protocols.',
      image: '/team/marcus-rodriguez.jpg'
    }
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <main className="min-h-screen bg-gaming-darker">
      <Navigation />
      
      <div className="pt-16">
        {/* Header */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-gaming font-bold mb-6">
                <span className="text-white">Press</span>
                <span className="cyber-text"> Kit</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Resources for journalists, bloggers, and media professionals covering GameVault 
                and the future of cryptocurrency-powered gaming commerce.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-neon">
                  <Download className="w-5 h-5 mr-2" />
                  Download Full Press Kit
                </button>
                <button className="glass-dark hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 border border-gaming-purple/30 hover:border-gaming-cyan/50">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Press Team
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-12 bg-gaming-dark/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-gaming font-bold text-white mb-6">
                  About <span className="cyber-text">GameVault</span>
                </h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    GameVault is a revolutionary platform that bridges the gap between cryptocurrency 
                    and gaming commerce. Founded in 2024, we enable gamers worldwide to purchase 
                    gift cards for their favorite gaming platforms using Bitcoin, Ethereum, and 
                    other major cryptocurrencies.
                  </p>
                  <p>
                    Our mission is to provide secure, instant, and anonymous transactions for the 
                    gaming community, supporting over 100 gaming platforms and serving customers 
                    in more than 50 countries.
                  </p>
                  <p>
                    With industry-leading security measures, 99.9% uptime, and instant delivery, 
                    GameVault is setting the standard for cryptocurrency-powered digital commerce 
                    in the gaming industry.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="gaming-card"
              >
                <h3 className="text-xl font-gaming font-bold text-white mb-6">Company Facts</h3>
                <div className="space-y-4">
                  {companyFacts.map((fact, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gaming-purple/20">
                      <span className="text-gray-400">{fact.label}:</span>
                      <span className="text-white font-semibold">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Key <span className="cyber-text">Metrics</span>
              </h2>
              <p className="text-xl text-gray-300">
                Numbers that showcase our impact and growth
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {keyMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center p-6 gaming-card"
                >
                  <metric.icon className="w-12 h-12 text-gaming-cyan mx-auto mb-4" />
                  <div className="text-3xl font-gaming font-bold text-white mb-2">{metric.value}</div>
                  <div className="text-gray-400">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Assets */}
        <section className="py-20 bg-gaming-dark/30">
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
                High-quality assets for your articles and presentations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mediaAssets.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
                  className="gaming-card"
                >
                  <h3 className="text-xl font-gaming font-bold text-white mb-6 flex items-center">
                    {category.category === 'Logos' && <Image className="w-6 h-6 mr-3 text-gaming-cyan" />}
                    {category.category === 'Screenshots' && <Camera className="w-6 h-6 mr-3 text-gaming-neon" />}
                    {category.category === 'Brand Assets' && <FileText className="w-6 h-6 mr-3 text-gaming-gold" />}
                    {category.category}
                  </h3>
                  
                  <div className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between p-3 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30">
                        <div className="flex-1">
                          <div className="font-semibold text-white text-sm">{item.name}</div>
                          <div className="text-xs text-gray-400">{item.format} • {item.size}</div>
                        </div>
                        <button className="p-2 rounded bg-gaming-purple/20 text-gaming-cyan hover:bg-gaming-purple/30 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Executive Team */}
        <section className="py-20">
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
                Leadership team driving innovation in gaming commerce
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {executiveTeam.map((exec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="gaming-card text-center"
                >
                  <div className="w-24 h-24 bg-gaming-purple/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-gaming-cyan" />
                  </div>
                  <h3 className="text-xl font-gaming font-bold text-white mb-2">{exec.name}</h3>
                  <p className="text-gaming-cyan mb-4">{exec.title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{exec.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Press Releases */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Recent <span className="cyber-text">Press Releases</span>
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
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gaming-cyan" />
                      <span className="text-gray-400">{new Date(release.date).toLocaleDateString()}</span>
                    </div>
                    <button className="text-gaming-cyan hover:text-gaming-neon transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <h3 className="text-xl font-gaming font-bold text-white mb-3">{release.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{release.excerpt}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="gaming-card text-center"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-6">
                Media <span className="cyber-text">Contact</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-gaming font-bold text-white mb-4">Press Inquiries</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center justify-center space-x-2">
                      <Mail className="w-4 h-4 text-gaming-cyan" />
                      <span>press@gamevault.com</span>
                      <button 
                        onClick={() => copyToClipboard('press@gamevault.com')}
                        className="p-1 rounded text-gaming-cyan hover:text-gaming-neon transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-gaming font-bold text-white mb-4">General Inquiries</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex items-center justify-center space-x-2">
                      <Mail className="w-4 h-4 text-gaming-cyan" />
                      <span>hello@gamevault.com</span>
                      <button 
                        onClick={() => copyToClipboard('hello@gamevault.com')}
                        className="p-1 rounded text-gaming-cyan hover:text-gaming-neon transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-400">
                For high-resolution images, additional quotes, or interview requests, 
                please contact our press team. We typically respond within 24 hours.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
} 