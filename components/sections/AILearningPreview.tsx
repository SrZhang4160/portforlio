'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ArrowRight, BookOpen, Award, Brain, Zap, Users, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const AILearningPreview = () => {
  const courseProgress = [
    {
      provider: "Coursera",
      course: "AI in Healthcare Specialization",
      progress: 85,
      duration: "6 months",
      skills: ["Medical AI", "Clinical Decision Support", "Healthcare Data"],
      certification: "Stanford University",
      status: "In Progress",
      color: "primary"
    },
    {
      provider: "Google",
      course: "Prompt Engineering for Developers",
      progress: 100,
      duration: "Completed",
      skills: ["Prompt Design", "LLM Integration", "AI Development"],
      certification: "Google Cloud",
      status: "Certified",
      color: "success"
    },
    {
      provider: "Coursera",
      course: "Machine Learning for Healthcare",
      progress: 100,
      duration: "Completed",
      skills: ["Clinical ML", "Medical Imaging", "Predictive Models"],
      certification: "University of California",
      status: "Certified",
      color: "success"
    }
  ]

  const aiApplications = [
    {
      area: "Clinical Decision Support",
      description: "Built AI models for diagnostic assistance and treatment recommendations",
      projects: 3,
      icon: "🩺"
    },
    {
      area: "Medical Device Integration",
      description: "Embedded AI into hardware for real-time patient monitoring",
      projects: 2,
      icon: "⚕️"
    },
    {
      area: "Healthcare Data Analytics",
      description: "Developed predictive models for chronic disease management",
      projects: 4,
      icon: "📊"
    },
    {
      area: "Patient Experience AI",
      description: "Created conversational AI for patient engagement and education",
      projects: 2,
      icon: "💬"
    }
  ]

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary-50 via-secondary-50 to-success-50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="accent-purple" size="lg" className="mb-4">Continuous Learning</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-neutral-900">
            <span className="text-highlight">AI-First</span> Development Journey
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Constantly evolving my healthcare AI expertise through structured learning, 
            hands-on projects, and integration of cutting-edge AI technologies into medical solutions.
          </p>
        </motion.div>

        {/* Learning Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {courseProgress.map((course, index) => (
            <motion.div
              key={course.course}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge 
                      variant={course.color as any} 
                      size="sm"
                    >
                      {course.status}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-neutral-500">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:text-primary-600 transition-colors">
                    {course.course}
                  </CardTitle>
                  <p className="text-sm text-neutral-600">{course.provider} • {course.certification}</p>
                </CardHeader>

                <CardContent>
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-neutral-600">Progress</span>
                      <span className="font-medium text-neutral-900">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <motion.div 
                        className={`h-2 rounded-full ${course.color === 'success' ? 'bg-success-500' : 'bg-primary-500'}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${course.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-neutral-900">Key Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {course.skills.map((skill) => (
                        <Badge key={skill} variant="accent-teal" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* AI Application Areas */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 text-neutral-900">AI Integration in Healthcare Projects</h3>
            <p className="text-neutral-600">How I apply AI learning to solve real healthcare challenges</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiApplications.map((application, index) => (
              <motion.div 
                key={application.area}
                className="flex gap-4 p-4 bg-white rounded-2xl border border-neutral-100 hover:border-primary-200 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-3xl">{application.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2 text-neutral-900">{application.area}</h4>
                  <p className="text-sm text-neutral-600 mb-3 leading-relaxed">
                    {application.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-primary-600 font-medium">
                    <Brain className="w-3 h-3" />
                    {application.projects} Projects
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning Philosophy & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-neutral-900">AI-First Development Philosophy</h3>
            <p className="text-neutral-700 leading-relaxed">
              I integrate AI throughout my entire development cycle - from ideation and research 
              to implementation and optimization. This approach allows me to build more intelligent, 
              adaptive healthcare solutions that truly understand and respond to patient needs.
            </p>
            
            <div className="space-y-4">
              {[
                "AI-assisted code generation and optimization",
                "Prompt engineering for domain-specific applications",
                "Integration of LLMs into healthcare workflows",
                "Continuous learning through AI-powered research"
              ].map((practice, index) => (
                <motion.div 
                  key={practice}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-primary-500 rounded-full" />
                  <span className="text-neutral-700">{practice}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              { icon: Award, value: "5+", label: "AI Certifications", color: "text-primary-600" },
              { icon: Brain, value: "50+", label: "AI Models Trained", color: "text-secondary-600" },
              { icon: BookOpen, value: "200+", label: "Hours Learning", color: "text-success-600" },
              { icon: Zap, value: "15+", label: "AI Projects", color: "text-accent-purple-600" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-600">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Button variant="primary" size="lg" className="group">
            Explore AI Learning Journey
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default AILearningPreview