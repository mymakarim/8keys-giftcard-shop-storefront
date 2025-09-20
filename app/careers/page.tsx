'use client'

import { motion } from 'framer-motion'
import Navigation from '../../components/Navigation'
import Link from 'next/link'
import { 
  Code, 
  Coffee, 
  Globe, 
  Heart, 
  ArrowRight, 
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  Shield,
  Zap,
  Bitcoin,
  Star,
  CheckCircle
} from '../../components/icons'

export default function CareersPage() {
  const jobListings = [
    {
      id: 1,
      title: 'Senior Blockchain Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '$120k - $180k',
      description: 'Join our core team to build and maintain cryptocurrency payment systems and blockchain integrations.',
      requirements: [
        '5+ years of blockchain development experience',
        'Proficiency in Solidity, Web3.js, and Node.js',
        'Experience with Bitcoin, Ethereum, and other major cryptocurrencies',
        'Strong understanding of smart contracts and DeFi protocols'
      ]
    },
    {
      id: 2,
      title: 'Cybersecurity Engineer',
      department: 'Security',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100k - $150k',
      description: 'Protect our platform and users by implementing advanced security measures and monitoring systems.',
      requirements: [
        '4+ years of cybersecurity experience',
        'Knowledge of penetration testing and vulnerability assessment',
        'Experience with security frameworks and compliance',
        'Understanding of cryptocurrency security best practices'
      ]
    },
    {
      id: 3,
      title: 'Product Manager - Gaming',
      department: 'Product',
      location: 'Remote',
      type: 'Full-time',
      salary: '$90k - $130k',
      description: 'Drive product strategy and roadmap for our gaming-focused features and partnerships.',
      requirements: [
        '3+ years of product management experience',
        'Deep understanding of gaming industry trends',
        'Experience with digital commerce and payments',
        'Strong analytical and communication skills'
      ]
    },
    {
      id: 4,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80k - $120k',
      description: 'Create intuitive and engaging user experiences for our gaming community.',
      requirements: [
        '3+ years of UX/UI design experience',
        'Proficiency in Figma, Sketch, or similar tools',
        'Experience designing for gaming or fintech applications',
        'Strong portfolio demonstrating user-centered design'
      ]
    },
    {
      id: 5,
      title: 'Customer Success Manager',
      department: 'Support',
      location: 'Remote',
      type: 'Full-time',
      salary: '$60k - $85k',
      description: 'Ensure our gaming community has the best possible experience with our platform.',
      requirements: [
        '2+ years of customer success experience',
        'Experience in gaming or cryptocurrency industry',
        'Excellent communication and problem-solving skills',
        'Passion for helping others and building relationships'
      ]
    },
    {
      id: 6,
      title: 'Marketing Specialist - Gaming',
      department: 'Marketing',
      location: 'Remote',
      type: 'Contract',
      salary: '$50k - $70k',
      description: 'Develop and execute marketing campaigns to reach gaming communities worldwide.',
      requirements: [
        '2+ years of digital marketing experience',
        'Knowledge of gaming communities and influencer marketing',
        'Experience with social media and content marketing',
        'Understanding of cryptocurrency and blockchain technology'
      ]
    }
  ]

  const benefits = [
    {
      icon: Globe,
      title: 'Remote First',
      description: 'Work from anywhere in the world with flexible hours and unlimited PTO.'
    },
    {
      icon: DollarSign,
      title: 'Competitive Salary',
      description: 'Market-leading compensation with equity options and crypto bonuses.'
    },
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, mental health support, and wellness stipend.'
    },
    {
      icon: Code,
      title: 'Learning & Growth',
      description: 'Annual learning budget, conference attendance, and skill development programs.'
    },
    {
      icon: Coffee,
      title: 'Team Culture',
      description: 'Regular team events, gaming sessions, and a supportive work environment.'
    },
    {
      icon: Globe,
      title: 'Impact & Purpose',
      description: 'Work on meaningful projects that shape the future of gaming commerce.'
    }
  ]

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'We prioritize the security and privacy of our users in everything we do.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We embrace new technologies and push the boundaries of what\'s possible.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We build products for gamers, by gamers, with a focus on community needs.'
    },
    {
      icon: Heart,
      title: 'Transparency',
      description: 'We believe in open communication and honest relationships with our team.'
    }
  ]

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'Engineering': return 'text-gaming-cyan bg-gaming-cyan/20'
      case 'Security': return 'text-gaming-neon bg-gaming-neon/20'
      case 'Product': return 'text-gaming-gold bg-gaming-gold/20'
      case 'Design': return 'text-gaming-purple bg-gaming-purple/20'
      case 'Support': return 'text-green-400 bg-green-400/20'
      case 'Marketing': return 'text-pink-400 bg-pink-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

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
              <span className="text-white">Join Our</span>
              <span className="cyber-text"> Team</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Help us revolutionize the gaming industry by building the future of 
              cryptocurrency-powered digital commerce. Join a team of passionate 
              innovators working on cutting-edge technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="btn-group"
            >
              <button className="btn-neon">
                <Briefcase className="w-5 h-5" />
                View Open Positions
              </button>
              <button className="btn-secondary">
                <Users className="w-5 h-5" />
                Meet the Team
              </button>
            </motion.div>
          </div>
        </section>

        {/* Company Values */}
        <section className="py-20 bg-gaming-dark/30">
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
                The principles that guide our team and shape our culture
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="gaming-card text-center hover:border-gaming-cyan/50 transition-colors"
                >
                  <value.icon className="w-12 h-12 text-gaming-cyan mx-auto mb-4" />
                  <h3 className="text-xl font-gaming font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-gaming font-bold text-white mb-4">
                Why Work <span className="cyber-text">With Us</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                We offer competitive benefits and a culture that supports your growth
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="gaming-card hover:border-gaming-cyan/50 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-gaming-purple/20">
                      <benefit.icon className="w-8 h-8 text-gaming-cyan" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-gaming font-bold text-white mb-3">{benefit.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-gaming font-bold text-white mb-4">
                Open <span className="cyber-text">Positions</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Join our growing team and help shape the future of gaming commerce
              </p>
            </motion.div>

            <div className="space-y-6">
              {jobListings.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="gaming-card hover:border-gaming-cyan/50 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <h3 className="text-2xl font-gaming font-bold text-white">{job.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDepartmentColor(job.department)}`}>
                          {job.department}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salary}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 leading-relaxed mb-4">{job.description}</p>
                    </div>
                    
                    <div className="lg:ml-8">
                      <button className="btn-neon">
                        Apply Now
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3">Key Requirements:</h4>
                    <ul className="space-y-2">
                      {job.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-gaming-cyan rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-400">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-gaming font-bold text-white mb-4">
                Application <span className="cyber-text">Process</span>
              </h2>
              <p className="text-xl text-gray-300">
                Our streamlined hiring process designed to find the best fit for both sides
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: 'Application Review',
                  description: 'We review your application and portfolio within 2-3 business days.'
                },
                {
                  step: 2,
                  title: 'Initial Interview',
                  description: 'A casual conversation with our hiring team to get to know you better.'
                },
                {
                  step: 3,
                  title: 'Technical Assessment',
                  description: 'Role-specific technical interview or project to showcase your skills.'
                },
                {
                  step: 4,
                  title: 'Team Interview',
                  description: 'Meet with potential team members and discuss collaboration.'
                },
                {
                  step: 5,
                  title: 'Final Decision',
                  description: 'We make our decision and extend an offer to successful candidates.'
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex items-start space-x-6"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gaming-purple/20 rounded-full flex items-center justify-center border-2 border-gaming-cyan/30">
                      <span className="text-gaming-cyan font-gaming font-bold">{step.step}</span>
                    </div>
                  </div>
                  <div className="flex-1 gaming-card">
                    <h3 className="text-xl font-gaming font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gaming-dark/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="gaming-card"
            >
              <h2 className="text-3xl md:text-5xl font-gaming font-bold text-white mb-6">
                Ready to <span className="cyber-text">Join Us</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Don't see a perfect fit? We're always looking for talented individuals 
                who share our passion for gaming and innovation.
              </p>
              
              <div className="btn-group">
                <button className="btn-neon">
                  <Briefcase className="w-5 h-5" />
                  Send General Application
                </button>
                <button className="btn-secondary">
                  <Heart className="w-5 h-5" />
                  Learn More About Us
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
} 