'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import { 
  Shield, 
  Zap, 
  Globe, 
  Users,
  Target,
  Heart,
  Award,
  TrendingUp,
  Bitcoin,
  Gamepad2,
  Star,
  CheckCircle
} from '../../components/icons'

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'We prioritize the security and privacy of our users above all else, implementing industry-leading encryption and security measures.',
      color: 'text-gaming-neon'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Our platform delivers instant gift card codes upon payment confirmation, ensuring you never have to wait.',
      color: 'text-gaming-cyan'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving gamers worldwide with support for multiple cryptocurrencies and international gift card providers.',
      color: 'text-gaming-gold'
    },
    {
      icon: Heart,
      title: 'Customer Focused',
      description: 'Every decision we make is centered around providing the best possible experience for our gaming community.',
      color: 'text-gaming-purple'
    }
  ]

  const stats = [
    { icon: Users, value: '50K+', label: 'Active Users' },
    { icon: Award, value: '100+', label: 'Gaming Platforms' },
    { icon: TrendingUp, value: '99.9%', label: 'Uptime' },
    { icon: Star, value: '4.9/5', label: 'User Rating' }
  ]

  const team = [
    {
      name: 'Alex Chen',
      role: 'CEO & Founder',
      bio: 'Former blockchain engineer with 8+ years in cryptocurrency and gaming.',
      image: '/team/alex.jpg'
    },
    {
      name: 'Sarah Kim',
      role: 'CTO',
      bio: 'Expert in secure payment systems and cryptocurrency integration.',
      image: '/team/sarah.jpg'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Security',
      bio: 'Cybersecurity specialist ensuring platform safety and user protection.',
      image: '/team/marcus.jpg'
    },
    {
      name: 'Emma Thompson',
      role: 'Head of Operations',
      bio: 'Gaming industry veteran with expertise in digital commerce.',
      image: '/team/emma.jpg'
    }
  ]

  const milestones = [
    {
      year: '2024',
      title: 'Platform Launch',
      description: 'GameVault officially launches with support for major gaming platforms and cryptocurrency payments.'
    },
    {
      year: '2024',
      title: 'P100 Integration',
      description: 'Integrated advanced cryptocurrency payment processing for seamless transactions.'
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'Expanded to serve customers in over 50 countries worldwide.'
    },
    {
      year: '2024',
      title: 'Security Certification',
      description: 'Achieved industry-leading security certifications and compliance standards.'
    }
  ]

  return (
    <main className="min-h-screen bg-gaming-darker">
      <Navigation />
      
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-gaming font-bold mb-6">
                <span className="text-white">About</span>
                <span className="cyber-text"> GameVault</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                We're revolutionizing the gaming industry by providing secure, instant, and anonymous 
                gift card purchases through cryptocurrency payments. Join the future of digital gaming commerce.
              </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center p-6 gaming-card"
                >
                  <stat.icon className="w-12 h-12 text-gaming-cyan mx-auto mb-4" />
                  <div className="text-3xl font-gaming font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-5xl font-gaming font-bold text-white mb-6">
                  Our <span className="cyber-text">Mission</span>
                </h2>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  At GameVault, we believe that purchasing gaming content should be fast, secure, and private. 
                  Our mission is to bridge the gap between cryptocurrency adoption and gaming commerce, 
                  providing gamers worldwide with a seamless way to access their favorite digital content.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  We're committed to building the most trusted and innovative platform in the gaming industry, 
                  where privacy, security, and user experience are never compromised.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="gaming-card p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <Target className="w-12 h-12 text-gaming-neon" />
                    <div>
                      <h3 className="text-2xl font-gaming font-bold text-white">Our Vision</h3>
                      <p className="text-gaming-cyan">Empowering the gaming community</p>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    To become the global standard for cryptocurrency-powered gaming commerce, 
                    making digital gaming content accessible to everyone, everywhere.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-gaming font-bold text-white mb-4">
                Our <span className="cyber-text">Values</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                The principles that guide everything we do at GameVault
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="gaming-card hover:border-gaming-cyan/50 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-gaming-dark/50 ${value.color}`}>
                      <value.icon className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-gaming font-bold text-white mb-3">{value.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-gaming font-bold text-white mb-4">
                Meet Our <span className="cyber-text">Team</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                The passionate individuals building the future of gaming commerce
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="gaming-card text-center hover:border-gaming-cyan/50 transition-colors"
                >
                  <div className="w-24 h-24 bg-gaming-purple/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-gaming-cyan" />
                  </div>
                  <h3 className="text-xl font-gaming font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-gaming-cyan mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-gaming font-bold text-white mb-4">
                Our <span className="cyber-text">Journey</span>
              </h2>
              <p className="text-xl text-gray-300">
                Key milestones in GameVault's evolution
              </p>
            </motion.div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="flex items-start space-x-6"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gaming-purple/20 rounded-full flex items-center justify-center border-2 border-gaming-cyan/30">
                      <span className="text-gaming-cyan font-gaming font-bold">{milestone.year}</span>
                    </div>
                  </div>
                  <div className="flex-1 gaming-card">
                    <h3 className="text-xl font-gaming font-bold text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-300">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-gaming font-bold text-white mb-4">
                Powered by <span className="cyber-text">Innovation</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Cutting-edge technology stack ensuring security, speed, and reliability
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="gaming-card text-center"
              >
                <Bitcoin className="w-16 h-16 text-gaming-gold mx-auto mb-4" />
                <h3 className="text-xl font-gaming font-bold text-white mb-3">Blockchain Integration</h3>
                <p className="text-gray-300">
                  Seamless cryptocurrency payments with support for major blockchain networks
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="gaming-card text-center"
              >
                <Shield className="w-16 h-16 text-gaming-neon mx-auto mb-4" />
                <h3 className="text-xl font-gaming font-bold text-white mb-3">Advanced Security</h3>
                <p className="text-gray-300">
                  Military-grade encryption and multi-layer security protocols
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="gaming-card text-center"
              >
                <Gamepad2 className="w-16 h-16 text-gaming-cyan mx-auto mb-4" />
                <h3 className="text-xl font-gaming font-bold text-white mb-3">Gaming Focus</h3>
                <p className="text-gray-300">
                  Purpose-built for gamers with optimized user experience
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="gaming-card"
            >
              <h2 className="text-3xl md:text-5xl font-gaming font-bold text-white mb-6">
                Join the <span className="cyber-text">Revolution</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Experience the future of gaming commerce with secure cryptocurrency payments 
                and instant gift card delivery.
              </p>
              
              <div className="btn-group">
                <button className="btn-neon">
                  <Gamepad2 className="w-5 h-5" />
                  Start Shopping
                </button>
                <button className="btn-secondary">
                  <Users className="w-5 h-5" />
                  Contact Us
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
} 