'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Gamepad2, 
  Mail, 
  MessageCircle, 
  Twitter, 
  Github, 
  Shield,
  Zap,
  Globe,
  ArrowUp
} from './icons'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    platform: [
      { name: 'Gift Cards', href: '/gift-cards' },
      { name: 'Checkout', href: '/checkout' },
      { name: 'How it Works', href: '/how-it-works' },
      { name: 'Pricing', href: '/pricing' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Status', href: '/status' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Refund Policy', href: '/refunds' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press Kit', href: '/press' },
    ]
  }

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter, color: 'hover:text-blue-400' },
    { name: 'Discord', href: '#', icon: MessageCircle, color: 'hover:text-indigo-400' },
    { name: 'Github', href: '#', icon: Github, color: 'dark:hover:text-gray-300 light:hover:text-gray-600' },
  ]

  return (
    <footer className="relative border-t transition-all duration-500 dark:bg-gaming-darker dark:border-gaming-purple/20 light:bg-gradient-to-b light:from-gray-50 light:to-white light:border-gray-200">
      {/* Background Effects - Dark */}
      <div className="dark:block hidden absolute inset-0 bg-gradient-to-t from-gaming-darker via-gaming-dark/50 to-transparent" />
      <div className="dark:block hidden absolute top-0 left-1/4 w-96 h-96 bg-gaming-purple/5 rounded-full blur-3xl" />
      <div className="dark:block hidden absolute bottom-0 right-1/4 w-96 h-96 bg-gaming-cyan/5 rounded-full blur-3xl" />
      
      {/* Background Effects - Light */}
      <div className="light:block hidden absolute inset-0 bg-gradient-to-t from-white via-gray-50/30 to-transparent" />
      <div className="light:block hidden absolute top-0 left-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" />
      <div className="light:block hidden absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 group mb-6">
                <div className="relative">
                  <Gamepad2 className="w-8 h-8 transition-colors dark:text-gaming-cyan dark:group-hover:text-gaming-neon light:text-blue-600 light:group-hover:text-purple-600" />
                  <div className="absolute inset-0 rounded-full blur-lg transition-all dark:bg-gaming-cyan/20 dark:group-hover:bg-gaming-neon/30 light:bg-blue-500/20 light:group-hover:bg-purple-500/30" />
                </div>
                <span className="font-gaming text-2xl font-bold text-gradient-primary">
                  GameVault
                </span>
              </Link>
              
              <p className="mb-6 max-w-md leading-relaxed transition-colors dark:text-gray-400 light:text-gray-600">
                The premier destination for gaming gift cards with cryptocurrency payments. 
                Secure, instant, and trusted by gamers worldwide.
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-sm">
                  <Shield className="w-4 h-4 transition-colors dark:text-gaming-neon light:text-green-600" />
                  <span className="transition-colors dark:text-gray-400 light:text-gray-600">Secure</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Zap className="w-4 h-4 transition-colors dark:text-gaming-cyan light:text-blue-600" />
                  <span className="transition-colors dark:text-gray-400 light:text-gray-600">Instant</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Globe className="w-4 h-4 transition-colors dark:text-gaming-purple light:text-purple-600" />
                  <span className="transition-colors dark:text-gray-400 light:text-gray-600">Global</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className={`p-2 rounded-lg transition-all duration-300 dark:bg-gaming-dark/50 dark:text-gray-400 light:bg-white light:text-gray-500 light:border light:border-gray-200 light:shadow-sm ${social.color}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h3 className="font-gaming font-semibold mb-4 transition-colors dark:text-white light:text-gray-900">Platform</h3>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors dark:text-gray-400 dark:hover:text-gaming-cyan light:text-gray-600 light:hover:text-blue-600"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-gaming font-semibold mb-4 transition-colors dark:text-white light:text-gray-900">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors dark:text-gray-400 dark:hover:text-gaming-cyan light:text-gray-600 light:hover:text-blue-600"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-gaming font-semibold mb-4 transition-colors dark:text-white light:text-gray-900">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors dark:text-gray-400 dark:hover:text-gaming-cyan light:text-gray-600 light:hover:text-blue-600"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t transition-colors dark:border-gaming-purple/20 light:border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div>
              <h3 className="font-gaming font-semibold mb-2 transition-colors dark:text-white light:text-gray-900">Stay Updated</h3>
              <p className="text-sm transition-colors dark:text-gray-400 light:text-gray-600">Get the latest gaming gift card deals and crypto payment updates.</p>
            </div>
            
            <div className="flex space-x-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-cyber flex-1 md:w-64"
              />
              <button className="btn-neon px-6 py-3 whitespace-nowrap">
                <Mail className="w-4 h-4 mr-2" />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t transition-colors dark:border-gaming-purple/20 light:border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm transition-colors dark:text-gray-400 light:text-gray-600">
              <p>&copy; 2024 GameVault. All rights reserved.</p>
              <div className="flex space-x-4">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="transition-colors dark:hover:text-gaming-cyan light:hover:text-blue-600"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Scroll to Top */}
            <motion.button
              onClick={scrollToTop}
              className="p-2 rounded-lg transition-all duration-300 dark:bg-gaming-purple/20 dark:text-gaming-cyan dark:hover:bg-gaming-purple/30 light:bg-gray-100 light:text-gray-600 light:hover:bg-gray-200 light:border light:border-gray-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
} 