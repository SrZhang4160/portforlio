'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { ArrowRight, Eye, Brain, Smartphone, Users, TrendingUp, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const FeaturedProject = () => {
  const projectMetrics = [
    { icon: Eye, value: "96%", label: "Diagnostic Accuracy", color: "text-primary-600" },
    { icon: TrendingUp, value: "80%", label: "Cost Reduction", color: "text-success-600" },
    { icon: Users, value: "80M+", label: "Potential Patients", color: "text-secondary-600" },
    { icon: Clock, value: "5min", label: "Test Duration", color: "text-accent-purple-600" }
  ]

  const techStack = [
    { name: "Computer Vision", icon: "👁️" },
    { name: "TensorFlow", icon: "🧠" },
    { name: "React Native", icon: "📱" },
    { name: "Python/FastAPI", icon: "🐍" },
    { name: "AWS Health", icon: "☁️" },
    { name: "FHIR Standard", icon: "🏥" }
  ]

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="primary" size="lg" className="mb-4">Featured Innovation</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-neutral-900">
            At-Home <span className="text-highlight">Tonometer</span> + 
            <br className="hidden sm:block" />
            AI <span className="text-highlight">Glaucoma</span> Management
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Revolutionary FDA-pathway medical device combining hardware innovation with AI-powered 
            chronic disease management, making glaucoma screening accessible to 80M+ patients worldwide.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Project Visual */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card variant="featured" className="p-0 overflow-hidden">
              <div className="relative">
                <OptimizedImage
                  src="/images/projects/tonometer-showcase.webp"
                  alt="At-home tonometer device with AI-powered glaucoma management app interface"
                  width={600}
                  height={400}
                  priority
                  className="w-full"
                />
                
                {/* AI Processing Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">AI Analysis Complete</p>
                        <p className="text-sm text-neutral-600">Intraocular pressure: 18 mmHg</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Risk Assessment</span>
                        <span className="font-medium text-success-600">Low Risk</span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-2">
                        <div className="bg-success-500 h-2 rounded-full w-2/3 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Floating Stats */}
            <motion.div 
              className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-lg border border-primary-100"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-center">
                <div className="text-xl font-bold text-primary-600">FDA Pathway</div>
                <div className="text-xs text-neutral-600">De Novo Classification</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Project Details */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Impact Metrics */}
            <div className="grid grid-cols-2 gap-4">
              {projectMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="text-center p-4">
                    <metric.icon className={`w-6 h-6 mx-auto mb-2 ${metric.color}`} />
                    <div className={`text-2xl font-bold ${metric.color}`}>
                      {metric.value}
                    </div>
                    <div className="text-sm text-neutral-600">{metric.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Problem & Solution */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">The Challenge</h3>
                <p className="text-neutral-700 leading-relaxed">
                  Glaucoma affects 80M+ people globally, but traditional tonometry requires expensive 
                  equipment and clinical visits. Early detection is critical, yet 50% of cases go 
                  undiagnosed until irreversible vision loss occurs.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">The Innovation</h3>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  Our solution combines precision hardware engineering with AI-powered analysis, 
                  enabling accurate intraocular pressure measurement at home. The companion app 
                  provides personalized chronic disease management with predictive analytics.
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <Badge key={tech.name} variant="secondary" icon={tech.icon} size="sm">
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" className="group">
                View Full Case Study
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button variant="outline" size="lg" className="group">
                Technical Deep Dive
                <Brain className="ml-2 w-5 h-5 transition-transform group-hover:scale-110" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Development Journey Timeline */}
        <motion.div 
          className="bg-gradient-to-r from-primary-50 via-secondary-50 to-success-50 rounded-3xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-neutral-900">Development Journey</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                phase: "Research & Validation",
                duration: "3 months",
                description: "Market research, clinical literature review, and FDA pathway analysis",
                icon: "🔬"
              },
              {
                phase: "Hardware Prototyping",
                duration: "6 months", 
                description: "3D printing, sensor integration, and precision calibration testing",
                icon: "🔧"
              },
              {
                phase: "AI Development",
                duration: "4 months",
                description: "Computer vision models, predictive algorithms, and clinical validation",
                icon: "🤖"
              },
              {
                phase: "Clinical Testing",
                duration: "Ongoing",
                description: "FDA De Novo submission preparation and clinical validation studies",
                icon: "🏥"
              }
            ].map((phase, index) => (
              <motion.div 
                key={phase.phase}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-3">{phase.icon}</div>
                <h4 className="font-semibold mb-2 text-neutral-900">{phase.phase}</h4>
                <p className="text-sm text-primary-600 font-medium mb-2">{phase.duration}</p>
                <p className="text-sm text-neutral-600">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProject