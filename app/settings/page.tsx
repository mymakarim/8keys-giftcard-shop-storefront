'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { 
  Settings, 
  User,
  Bell,
  Shield,
  Globe,
  Eye,
  Mail,
  Smartphone,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Save,
  RotateCcw,
  Key,
  Database,
  Download,
  Trash2,
  Lock,
  DollarSign,
  EyeOff,
  Copy,
  QrCode,
  Edit,
  Check,
  X,
  Upload
} from '../../components/icons'
import { useState } from 'react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Account Settings
    email: 'user@example.com',
    username: 'GameVaultUser',
    timezone: 'UTC',
    language: 'en',
    
    // Privacy Settings
    profileVisibility: 'private',
    dataCollection: true,
    marketingEmails: false,
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    orderUpdates: true,
    promotions: false,
    securityAlerts: true,
    
    // Display Settings
    theme: 'dark',
    soundEffects: true,
    animations: true,
    compactMode: false,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: '30',
    loginNotifications: true
  })

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const settingSections = [
    {
      id: 'account',
      title: 'Account Settings',
      icon: User,
      settings: [
        {
          key: 'email',
          label: 'Email Address',
          type: 'email',
          description: 'Used for order confirmations and account recovery'
        },
        {
          key: 'username',
          label: 'Username',
          type: 'text',
          description: 'Your display name on GameVault'
        },
        {
          key: 'timezone',
          label: 'Timezone',
          type: 'select',
          options: [
            { value: 'UTC', label: 'UTC' },
            { value: 'EST', label: 'Eastern Time' },
            { value: 'PST', label: 'Pacific Time' },
            { value: 'CET', label: 'Central European Time' },
            { value: 'JST', label: 'Japan Standard Time' }
          ],
          description: 'Used for displaying transaction times'
        },
        {
          key: 'language',
          label: 'Language',
          type: 'select',
          options: [
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Español' },
            { value: 'fr', label: 'Français' },
            { value: 'de', label: 'Deutsch' },
            { value: 'ja', label: '日本語' }
          ],
          description: 'Interface language preference'
        }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          key: 'emailNotifications',
          label: 'Email Notifications',
          type: 'toggle',
          description: 'Receive notifications via email'
        },
        {
          key: 'pushNotifications',
          label: 'Push Notifications',
          type: 'toggle',
          description: 'Browser push notifications'
        },
        {
          key: 'orderUpdates',
          label: 'Order Updates',
          type: 'toggle',
          description: 'Notifications about order status changes'
        },
        {
          key: 'promotions',
          label: 'Promotional Offers',
          type: 'toggle',
          description: 'Special deals and promotional notifications'
        },
        {
          key: 'securityAlerts',
          label: 'Security Alerts',
          type: 'toggle',
          description: 'Important security and account notifications'
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Data',
      icon: Shield,
      settings: [
        {
          key: 'profileVisibility',
          label: 'Profile Visibility',
          type: 'select',
          options: [
            { value: 'public', label: 'Public' },
            { value: 'private', label: 'Private' },
            { value: 'friends', label: 'Friends Only' }
          ],
          description: 'Who can see your profile information'
        },
        {
          key: 'dataCollection',
          label: 'Analytics Data Collection',
          type: 'toggle',
          description: 'Help improve our service by sharing usage data'
        },
        {
          key: 'marketingEmails',
          label: 'Marketing Communications',
          type: 'toggle',
          description: 'Receive marketing emails and newsletters'
        }
      ]
    },
    {
      id: 'display',
      title: 'Display & Interface',
      icon: Eye,
      settings: [
        {
          key: 'theme',
          label: 'Theme',
          type: 'select',
          options: [
            { value: 'dark', label: 'Dark Mode' },
            { value: 'light', label: 'Light Mode' },
            { value: 'auto', label: 'System Default' }
          ],
          description: 'Choose your preferred color scheme'
        },
        {
          key: 'soundEffects',
          label: 'Sound Effects',
          type: 'toggle',
          description: 'Play sound effects for interactions'
        },
        {
          key: 'animations',
          label: 'Animations',
          type: 'toggle',
          description: 'Enable smooth animations and transitions'
        },
        {
          key: 'compactMode',
          label: 'Compact Mode',
          type: 'toggle',
          description: 'Use more compact interface elements'
        }
      ]
    },
    {
      id: 'security',
      title: 'Security',
      icon: Key,
      settings: [
        {
          key: 'twoFactorAuth',
          label: 'Two-Factor Authentication',
          type: 'toggle',
          description: 'Add an extra layer of security to your account'
        },
        {
          key: 'sessionTimeout',
          label: 'Session Timeout',
          type: 'select',
          options: [
            { value: '15', label: '15 minutes' },
            { value: '30', label: '30 minutes' },
            { value: '60', label: '1 hour' },
            { value: '240', label: '4 hours' },
            { value: 'never', label: 'Never' }
          ],
          description: 'Automatically log out after inactivity'
        },
        {
          key: 'loginNotifications',
          label: 'Login Notifications',
          type: 'toggle',
          description: 'Get notified of new login attempts'
        }
      ]
    }
  ]

  const renderSettingInput = (setting: any) => {
    const value = settings[setting.key as keyof typeof settings]
    
    switch (setting.type) {
      case 'text':
      case 'email':
        return (
          <input
            type={setting.type}
            value={value as string}
            onChange={(e) => updateSetting(setting.key, e.target.value)}
            className="input-cyber"
          />
        )
      
      case 'select':
        return (
          <select
            value={value as string}
            onChange={(e) => updateSetting(setting.key, e.target.value)}
            className="select-cyber"
          >
            {setting.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      
      case 'toggle':
        return (
          <button
            onClick={() => updateSetting(setting.key, !value)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              value ? 'bg-gaming-neon' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                value ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        )
      
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen transition-colors duration-500 dark:bg-gaming-darker light:bg-gradient-to-br light:from-blue-50/80 light:via-white light:to-purple-50/80 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dark theme background */}
        <div className="dark:block hidden absolute inset-0 bg-gradient-to-br from-gaming-purple/10 via-transparent to-gaming-cyan/10" />
        <div className="dark:block hidden absolute top-1/4 left-10 w-72 h-72 bg-gaming-purple/5 rounded-full blur-3xl animate-pulse" />
        <div className="dark:block hidden absolute bottom-1/4 right-10 w-96 h-96 bg-gaming-cyan/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Light theme background */}
        <div className="light:block hidden absolute top-1/4 left-10 w-72 h-72 bg-blue-200/15 rounded-full blur-3xl animate-pulse" />
        <div className="light:block hidden absolute bottom-1/4 right-10 w-96 h-96 bg-purple-200/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <Navigation />
      
      <div className="pt-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-gaming font-bold mb-4">
              <span className="transition-colors duration-300 dark:text-white light:text-gray-900">Account</span>
              <span className="cyber-text"> Settings</span>
            </h1>
            <p className="text-xl transition-colors duration-300 dark:text-gray-300 light:text-gray-600">
              Customize your GameVault experience and manage your preferences
            </p>
          </div>

          {/* Settings Sections */}
          <section className="pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-8">
                {settingSections.map((section, sectionIndex) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: sectionIndex * 0.1, duration: 0.6 }}
                    className="gaming-card"
                  >
                    <h2 className="text-2xl font-gaming font-bold text-white mb-6 flex items-center">
                      <section.icon className="w-8 h-8 mr-4 text-gaming-cyan" />
                      {section.title}
                    </h2>
                    
                    <div className="space-y-6">
                      {section.settings.map((setting, settingIndex) => (
                        <div key={setting.key} className="flex items-center justify-between py-4 border-b border-gaming-purple/20 last:border-b-0">
                          <div className="flex-1 mr-8">
                            <label className="block text-lg font-semibold text-white mb-1">
                              {setting.label}
                            </label>
                            <p className="text-gray-400 text-sm">
                              {setting.description}
                            </p>
                          </div>
                          
                          <div className="flex-shrink-0 min-w-[200px]">
                            {renderSettingInput(setting)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Data Management */}
          <section className="py-20 bg-gaming-dark/30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="gaming-card"
              >
                <h2 className="text-2xl font-gaming font-bold text-white mb-6 flex items-center">
                  <Database className="w-8 h-8 mr-4 text-gaming-cyan" />
                  Data Management
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col text-center p-6 transition-all duration-300 dark:bg-gaming-dark/50 dark:border dark:border-gaming-purple/30 light:bg-white/80 light:border light:border-gray-200 light:shadow-lg rounded-lg h-full">
                    <Download className="w-12 h-12 mx-auto mb-4 transition-colors duration-300 dark:text-gaming-neon light:text-green-600" />
                    <h3 className="text-lg font-gaming font-bold mb-2 transition-colors duration-300 dark:text-white light:text-gray-900">Export Data</h3>
                    <p className="mb-6 text-sm flex-grow transition-colors duration-300 dark:text-gray-400 light:text-gray-600">Download all your account data and transaction history</p>
                    <button className="btn-secondary w-full mt-auto">
                      Export Data
                    </button>
                  </div>
                  
                  <div className="flex flex-col text-center p-6 transition-all duration-300 dark:bg-gaming-dark/50 dark:border dark:border-gaming-purple/30 light:bg-white/80 light:border light:border-gray-200 light:shadow-lg rounded-lg h-full">
                    <Shield className="w-12 h-12 mx-auto mb-4 transition-colors duration-300 dark:text-gaming-gold light:text-amber-600" />
                    <h3 className="text-lg font-gaming font-bold mb-2 transition-colors duration-300 dark:text-white light:text-gray-900">Privacy Report</h3>
                    <p className="mb-6 text-sm flex-grow transition-colors duration-300 dark:text-gray-400 light:text-gray-600">View what data we collect and how it's used</p>
                    <button className="btn-secondary w-full mt-auto">
                      View Report
                    </button>
                  </div>
                  
                  <div className="flex flex-col text-center p-6 transition-all duration-300 dark:bg-gaming-dark/50 dark:border dark:border-red-500/30 light:bg-white/80 light:border light:border-red-200 light:shadow-lg rounded-lg h-full">
                    <Trash2 className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h3 className="text-lg font-gaming font-bold mb-2 transition-colors duration-300 dark:text-white light:text-gray-900">Delete Account</h3>
                    <p className="mb-6 text-sm flex-grow transition-colors duration-300 dark:text-gray-400 light:text-gray-600">Permanently delete your account and all associated data</p>
                    <button className="w-full mt-auto py-3 px-4 rounded-lg font-semibold border-2 transition-all duration-300 dark:bg-red-500/20 dark:border-red-500/50 dark:text-red-400 dark:hover:bg-red-500/30 light:bg-red-500 light:border-red-700 light:text-white light:hover:bg-red-600 light:hover:border-red-800 light:shadow-lg light:hover:shadow-xl">
                      Delete Account
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="gaming-card"
              >
                <Settings className="w-16 h-16 text-gaming-cyan mx-auto mb-6" />
                <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                  Need <span className="cyber-text">Help</span>?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Can't find what you're looking for? Our support team is here to help 
                  with any questions about your settings or account.
                </p>
                
                <div className="btn-group">
                  <button className="btn-neon">
                    <Mail className="w-5 h-5" />
                    Contact Support
                  </button>
                  <button className="btn-secondary">
                    <Globe className="w-5 h-5" />
                    Help Center
                  </button>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </main>
  )
} 