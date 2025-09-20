'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Zap, 
  Shield, 
  Server, 
  Database,
  Wifi,
  ExternalLink,
  RefreshCw
} from '../../components/icons'

export default function StatusPage() {
  const currentStatus = {
    overall: 'operational',
    lastUpdated: new Date().toISOString()
  }

  const services = [
    {
      name: 'Website & Platform',
      status: 'operational',
      uptime: '99.98%',
      description: 'Main website and user interface',
      icon: ExternalLink
    },
    {
      name: 'Payment Processing',
      status: 'operational',
      uptime: '99.95%',
      description: 'Cryptocurrency payment system via P100',
      icon: Zap
    },
    {
      name: 'Gift Card Delivery',
      status: 'operational',
      uptime: '99.99%',
      description: 'Automated gift card code delivery system',
      icon: CheckCircle
    },
    {
      name: 'API Services',
      status: 'operational',
      uptime: '99.97%',
      description: 'Backend API and integration services',
      icon: Server
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: '99.99%',
      description: 'Primary database and data storage',
      icon: Database
    },
    {
      name: 'Security Systems',
      status: 'operational',
      uptime: '100%',
      description: 'Security monitoring and protection',
      icon: Shield
    }
  ]

  const incidents = [
    {
      id: 1,
      title: 'Scheduled Maintenance - Payment System',
      status: 'resolved',
      severity: 'maintenance',
      date: '2024-03-10T02:00:00Z',
      duration: '30 minutes',
      description: 'Routine maintenance on payment processing systems. All services fully restored.',
      updates: [
        {
          time: '2024-03-10T02:30:00Z',
          message: 'Maintenance completed successfully. All systems operational.'
        },
        {
          time: '2024-03-10T02:00:00Z',
          message: 'Scheduled maintenance started. Payment processing temporarily unavailable.'
        }
      ]
    },
    {
      id: 2,
      title: 'Brief API Latency Issues',
      status: 'resolved',
      severity: 'minor',
      date: '2024-03-05T14:20:00Z',
      duration: '15 minutes',
      description: 'Some users experienced slower response times. Issue resolved by scaling infrastructure.',
      updates: [
        {
          time: '2024-03-05T14:35:00Z',
          message: 'Performance fully restored. Monitoring continues.'
        },
        {
          time: '2024-03-05T14:20:00Z',
          message: 'Investigating reports of slower API response times.'
        }
      ]
    }
  ]

  const metrics = [
    { label: 'Overall Uptime (30 days)', value: '99.98%', icon: RefreshCw, color: 'text-gaming-neon' },
    { label: 'Average Response Time', value: '245ms', icon: Zap, color: 'text-gaming-cyan' },
    { label: 'Successful Transactions', value: '99.97%', icon: CheckCircle, color: 'text-gaming-neon' },
    { label: 'Security Incidents', value: '0', icon: Shield, color: 'text-gaming-gold' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-gaming-neon'
      case 'degraded': return 'text-gaming-gold'
      case 'outage': return 'text-red-400'
      case 'maintenance': return 'text-gaming-cyan'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return CheckCircle
      case 'degraded': return AlertTriangle
      case 'outage': return XCircle
      case 'maintenance': return Clock
      default: return AlertTriangle
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-gaming-neon/20 border-gaming-neon/30'
      case 'degraded': return 'bg-gaming-gold/20 border-gaming-gold/30'
      case 'outage': return 'bg-red-400/20 border-red-400/30'
      case 'maintenance': return 'bg-gaming-cyan/20 border-gaming-cyan/30'
      default: return 'bg-gray-400/20 border-gray-400/30'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-400/20'
      case 'major': return 'text-orange-400 bg-orange-400/20'
      case 'minor': return 'text-gaming-gold bg-gaming-gold/20'
      case 'maintenance': return 'text-gaming-cyan bg-gaming-cyan/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
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
                <span className="text-white">System</span>
                <span className="cyber-text"> Status</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Real-time status and performance metrics for GameVault services
              </p>

              {/* Overall Status */}
              <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-lg border ${getStatusBg(currentStatus.overall)}`}>
                <CheckCircle className={`w-6 h-6 ${getStatusColor(currentStatus.overall)}`} />
                <span className={`font-gaming font-bold text-lg ${getStatusColor(currentStatus.overall)}`}>
                  All Systems Operational
                </span>
              </div>
              
              <p className="text-gray-400 mt-4">
                Last updated: {new Date(currentStatus.lastUpdated).toLocaleString()}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="py-12 bg-gaming-dark/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Performance <span className="cyber-text">Metrics</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="gaming-card text-center"
                >
                  <metric.icon className={`w-12 h-12 ${metric.color} mx-auto mb-4`} />
                  <div className="text-2xl font-gaming font-bold text-white mb-2">{metric.value}</div>
                  <div className="text-gray-400 text-sm">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Status */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Service <span className="cyber-text">Status</span>
              </h2>
              <p className="text-xl text-gray-300">
                Current status of all GameVault services and components
              </p>
            </motion.div>

            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="gaming-card"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <service.icon className="w-8 h-8 text-gaming-cyan" />
                      <div>
                        <h3 className="text-lg font-gaming font-bold text-white">{service.name}</h3>
                        <p className="text-gray-400 text-sm">{service.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="text-gaming-neon font-semibold">{service.uptime}</div>
                        <div className="text-gray-400 text-sm">30-day uptime</div>
                      </div>
                      
                      <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${getStatusBg(service.status)}`}>
                        {(() => {
                          const StatusIcon = getStatusIcon(service.status)
                          return <StatusIcon className={`w-5 h-5 ${getStatusColor(service.status)}`} />
                        })()}
                        <span className={`font-semibold capitalize ${getStatusColor(service.status)}`}>
                          {service.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Incidents */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Recent <span className="cyber-text">Incidents</span>
              </h2>
              <p className="text-xl text-gray-300">
                Past incidents and their resolution status
              </p>
            </motion.div>

            <div className="space-y-6">
              {incidents.map((incident, index) => (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="gaming-card"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h3 className="text-xl font-gaming font-bold text-white">{incident.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(incident.severity)}`}>
                          {incident.severity}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBg(incident.status)}`}>
                          {incident.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-400 mb-4">
                        <div className="flex items-center space-x-2">
                          <ExternalLink className="w-4 h-4" />
                          <span>{new Date(incident.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{incident.duration}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-6">{incident.description}</p>
                    </div>
                  </div>

                  <div className="border-t border-gaming-purple/20 pt-4">
                    <h4 className="font-semibold text-white mb-3">Incident Timeline:</h4>
                    <div className="space-y-3">
                      {incident.updates.map((update, updateIndex) => (
                        <div key={updateIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-gaming-cyan rounded-full mt-2 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="text-sm text-gray-400">
                              {new Date(update.time).toLocaleString()}
                            </div>
                            <div className="text-gray-300">{update.message}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Subscribe to Updates */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="gaming-card"
            >
              <Wifi className="w-16 h-16 text-gaming-cyan mx-auto mb-6" />
              <h2 className="text-3xl font-gaming font-bold text-white mb-4">
                Stay <span className="cyber-text">Informed</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Subscribe to status updates and get notified about incidents, 
                maintenance windows, and service improvements.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gaming-dark/50 border border-gaming-purple/30 rounded-lg text-white placeholder-gray-400 focus:border-gaming-cyan/50 focus:outline-none transition-colors"
                />
                <button className="btn-neon px-6 py-3 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              
              <p className="text-sm text-gray-400">
                Get real-time notifications about service status changes and planned maintenance.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Historical Uptime */}
        <section className="py-12 bg-gaming-dark/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-gaming font-bold text-white mb-4">
                Historical <span className="cyber-text">Uptime</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { period: 'Last 24 Hours', uptime: '100%', incidents: 0 },
                { period: 'Last 7 Days', uptime: '99.98%', incidents: 0 },
                { period: 'Last 30 Days', uptime: '99.95%', incidents: 2 }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center p-6 bg-gaming-dark/50 rounded-lg border border-gaming-purple/30"
                >
                  <div className="text-3xl font-gaming font-bold text-gaming-neon mb-2">{stat.uptime}</div>
                  <div className="text-white font-semibold mb-1">{stat.period}</div>
                  <div className="text-gray-400 text-sm">{stat.incidents} incidents</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
} 