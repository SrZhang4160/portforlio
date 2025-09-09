'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { ArrowRight, ExternalLink, Github, Calendar, Users, Award, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const QuickProjects = () => {
  const projects = [
    {
      title: "Healthcare Data Pipeline",
      description: "Real-time ETL system processing 1M+ patient records daily with FHIR compliance and privacy-first architecture.",
      image: "/images/projects/healthcare-pipeline.webp",
      tags: ["Python", "Apache Airflow", "FHIR", "AWS", "PostgreSQL"],
      impact: "1M+ Records/Day",
      timeline: "6 months",
      status: "Production",
      links: {
        github: "https://github.com/sharonzhang/healthcare-pipeline",
        demo: "https://health-pipeline-demo.sharonzhang.dev"
      },
      metrics: [
        { label: "Processing Speed", value: "99.9%", icon: Zap },
        { label: "HIPAA Compliance", value: "✓", icon: Award }
      ]
    },
    {
      title: "Medical Image Classification",
      description: "CNN-based diagnostic tool for retinal disease detection, achieving 94% accuracy on diverse patient populations.",
      image: "/images/projects/retinal-classification.webp",
      tags: ["TensorFlow", "Python", "Computer Vision", "Docker"],
      impact: "94% Accuracy",
      timeline: "4 months",
      status: "Research",
      links: {
        github: "https://github.com/sharonzhang/retinal-ai",
        paper: "https://arxiv.org/paper/retinal-classification"
      },
      metrics: [
        { label: "Validation Accuracy", value: "94%", icon: Award },
        { label: "Inference Time", value: "<2s", icon: Zap }
      ]
    },
    {
      title: "She Got Buckets Platform",
      description: "Community-driven platform connecting 5K+ women in basketball with fundraising, mentorship, and skills development.",
      image: "/images/projects/she-got-buckets.webp",
      tags: ["React", "Node.js", "MongoDB", "Stripe", "Community"],
      impact: "$85K+ Raised",
      timeline: "12 months",
      status: "Active",
      links: {
        live: "https://shegotbuckets.org",
        impact: "https://impact.shegotbuckets.org"
      },
      metrics: [
        { label: "Community Size", value: "5K+", icon: Users },
        { label: "Funds Raised", value: "$85K+", icon: Award }
      ]
    }
  ]

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" size="lg" className="mb-4">Portfolio Highlights</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-neutral-900">
            More <span className="text-highlight">Healthcare</span> Innovations
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Additional projects showcasing the intersection of software engineering, 
            AI/ML, and healthcare impact across diverse problem domains.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card variant="interactive" className="h-full group">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <OptimizedImage
                      src={project.image}
                      alt={`${project.title} project showcase`}
                      width={400}
                      height={240}
                      className="aspect-[5/3] group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge 
                        variant={project.status === 'Production' ? 'success' : project.status === 'Active' ? 'primary' : 'secondary'} 
                        size="sm"
                      >
                        {project.status}
                      </Badge>
                    </div>
                    
                    {/* Impact Metric Overlay */}
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-medium">
                        {project.impact}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex-1 mb-6">
                    <CardTitle className="mb-3 group-hover:text-primary-600 transition-colors">
                      {project.title}
                    </CardTitle>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {project.metrics.map((metric) => (
                        <div key={metric.label} className="flex items-center gap-2">
                          <metric.icon className="w-4 h-4 text-primary-500" />
                          <div>
                            <div className="text-sm font-medium text-neutral-900">
                              {metric.value}
                            </div>
                            <div className="text-xs text-neutral-500">
                              {metric.label}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center gap-2 text-xs text-neutral-500 mb-4">
                      <Calendar className="w-3 h-3" />
                      <span>{project.timeline}</span>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="accent-teal" size="sm">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 3 && (
                        <Badge variant="accent-teal" size="sm">
                          +{project.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Project Links */}
                  <div className="flex gap-2">
                    {project.links.github && (
                      <Button variant="outline" size="sm" className="flex-1 group/btn">
                        <Github className="w-3 h-3 mr-1 group-hover/btn:rotate-12 transition-transform" />
                        Code
                      </Button>
                    )}
                    {project.links.live && (
                      <Button variant="primary" size="sm" className="flex-1 group/btn">
                        <ExternalLink className="w-3 h-3 mr-1 group-hover/btn:translate-x-0.5 transition-transform" />
                        Live
                      </Button>
                    )}
                    {project.links.demo && (
                      <Button variant="outline" size="sm" className="flex-1 group/btn">
                        <ExternalLink className="w-3 h-3 mr-1 group-hover/btn:translate-x-0.5 transition-transform" />
                        Demo
                      </Button>
                    )}
                    {project.links.paper && (
                      <Button variant="secondary" size="sm" className="flex-1 group/btn">
                        <ExternalLink className="w-3 h-3 mr-1 group-hover/btn:translate-x-0.5 transition-transform" />
                        Paper
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button variant="primary" size="lg" className="group">
            View All Healthcare Projects
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        {/* Skills & Technologies */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-3xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-neutral-900">Core Technologies</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { category: "AI/ML", technologies: ["TensorFlow", "PyTorch", "Scikit-learn", "Computer Vision"] },
              { category: "Backend", technologies: ["Python", "Node.js", "FastAPI", "PostgreSQL"] },
              { category: "Frontend", technologies: ["React", "TypeScript", "Next.js", "React Native"] },
              { category: "Healthcare", technologies: ["FHIR", "HIPAA", "FDA Pathway", "Medical Devices"] }
            ].map((skillGroup, index) => (
              <motion.div 
                key={skillGroup.category}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h4 className="font-semibold mb-3 text-neutral-900">{skillGroup.category}</h4>
                <div className="space-y-2">
                  {skillGroup.technologies.map((tech) => (
                    <div key={tech} className="text-sm text-neutral-600">{tech}</div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default QuickProjects