'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { ArrowRight, Layers, Zap, Clock, Palette, Wrench, Eye } from 'lucide-react'
import { motion } from 'framer-motion'

const ThreeDPrintingPreview = () => {
  const featuredPrints = [
    {
      title: "Medical Device Prototypes",
      description: "Functional prototypes for tonometer components, including precision housings and ergonomic grips",
      image: "/images/3d-prints/medical-prototypes.webp",
      category: "Healthcare",
      complexity: "High",
      printTime: "12 hours",
      material: "PETG",
      color: "primary"
    },
    {
      title: "Anatomical Learning Models",
      description: "3D printed eye models for understanding intraocular pressure mechanics and glaucoma pathology",
      image: "/images/3d-prints/anatomical-models.webp",
      category: "Education", 
      complexity: "Medium",
      printTime: "8 hours",
      material: "PLA+",
      color: "secondary"
    },
    {
      title: "Custom Electronics Housing",
      description: "Protective cases for Arduino and sensor components used in medical device development",
      image: "/images/3d-prints/electronics-housing.webp",
      category: "Engineering",
      complexity: "Medium",
      printTime: "6 hours", 
      material: "ABS",
      color: "success"
    }
  ]

  const printingStats = [
    { icon: Layers, value: "50+", label: "Models Designed", color: "text-primary-600" },
    { icon: Clock, value: "200+", label: "Print Hours", color: "text-secondary-600" },
    { icon: Palette, value: "8", label: "Materials Used", color: "text-success-600" },
    { icon: Wrench, value: "3", label: "Printers Operated", color: "text-accent-purple-600" }
  ]

  const printingSkills = [
    "CAD Design (Fusion 360, SolidWorks)",
    "Additive Manufacturing Processes",
    "Material Selection & Properties",
    "Post-Processing Techniques",
    "Quality Control & Testing",
    "Rapid Prototyping Workflows"
  ]

  const materialExpertise = [
    { name: "PLA/PLA+", use: "Prototyping & Education", properties: "Easy printing, biodegradable" },
    { name: "PETG", use: "Medical Components", properties: "Chemical resistant, clear" },
    { name: "ABS", use: "Functional Parts", properties: "Strong, heat resistant" },
    { name: "TPU", use: "Flexible Grips", properties: "Flexible, shock absorbing" }
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
          <Badge variant="accent-purple" size="lg" className="mb-4">Hands-On Engineering</Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-neutral-900">
            <span className="text-highlight">3D Printing</span> for Healthcare
            <br />
            <span className="text-highlight">Innovation</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Bridging the gap between digital design and physical reality through precision 3D printing, 
            rapid prototyping, and additive manufacturing for medical device development.
          </p>
        </motion.div>

        {/* Featured Prints */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {featuredPrints.map((print, index) => (
            <motion.div
              key={print.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card variant="interactive" className="h-full group overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <OptimizedImage
                      src={print.image}
                      alt={`${print.title} - 3D printed healthcare innovation`}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge variant={print.color as any} size="sm">
                        {print.category}
                      </Badge>
                    </div>
                    
                    {/* Complexity Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge 
                        variant={print.complexity === 'High' ? 'accent-pink' : 'accent-teal'} 
                        size="sm"
                      >
                        {print.complexity}
                      </Badge>
                    </div>

                    {/* Print Specs Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex justify-between text-white text-sm">
                        <div>
                          <Clock className="w-3 h-3 inline mr-1" />
                          {print.printTime}
                        </div>
                        <div>{print.material}</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <CardTitle className="mb-3 group-hover:text-primary-600 transition-colors">
                      {print.title}
                    </CardTitle>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                      {print.description}
                    </p>
                  </div>

                  <Button variant="outline" size="sm" className="w-full group/btn">
                    <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Printing Stats */}
        <motion.div 
          className="bg-gradient-to-r from-primary-50 via-secondary-50 to-success-50 rounded-3xl p-8 lg:p-12 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 text-neutral-900">3D Printing Expertise</h3>
            <p className="text-neutral-600">Transforming healthcare ideas into tangible prototypes and functional devices</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {printingStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-600">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills & Materials Expertise */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Technical Skills */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-neutral-900">Technical Capabilities</h3>
            <p className="text-neutral-700 leading-relaxed">
              Comprehensive 3D printing expertise spanning design, manufacturing, and quality assurance 
              for medical device prototyping and healthcare applications.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {printingSkills.map((skill, index) => (
                <motion.div 
                  key={skill}
                  className="flex items-center gap-3 p-3 bg-white rounded-lg border border-neutral-100 hover:border-primary-200 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                  <span className="text-sm text-neutral-700">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Material Expertise */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-neutral-900">Material Expertise</h3>
            <p className="text-neutral-700 leading-relaxed mb-6">
              Strategic material selection based on application requirements, biocompatibility, 
              and manufacturing constraints for healthcare applications.
            </p>

            <div className="space-y-4">
              {materialExpertise.map((material, index) => (
                <motion.div
                  key={material.name}
                  className="p-4 bg-white rounded-xl border border-neutral-100 hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-neutral-900">{material.name}</h4>
                    <Badge variant="accent-teal" size="sm">{material.use}</Badge>
                  </div>
                  <p className="text-sm text-neutral-600">{material.properties}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Application in Healthcare */}
        <motion.div 
          className="bg-white rounded-3xl p-8 lg:p-12 border border-neutral-100 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 text-neutral-900">Healthcare Applications</h3>
            <p className="text-neutral-600 max-w-3xl mx-auto">
              How 3D printing accelerates medical device development and enables rapid iteration in healthcare innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Rapid Prototyping",
                description: "Quick iteration cycles for medical device components, reducing development time from weeks to days",
                icon: "⚡",
                benefit: "10x Faster Iteration"
              },
              {
                title: "Custom Medical Tools",
                description: "Patient-specific devices and surgical guides tailored to individual anatomical requirements",
                icon: "🔧",
                benefit: "Personalized Care"
              },
              {
                title: "Educational Models",
                description: "Accurate anatomical models and pathology demonstrations for medical training and patient education",
                icon: "🧠",
                benefit: "Enhanced Learning"
              }
            ].map((application, index) => (
              <motion.div 
                key={application.title}
                className="text-center p-6 bg-gradient-to-br from-neutral-50 to-white rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{application.icon}</div>
                <h4 className="font-semibold mb-3 text-neutral-900">{application.title}</h4>
                <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                  {application.description}
                </p>
                <Badge variant="primary" size="sm">{application.benefit}</Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Button variant="primary" size="lg" className="group">
            Explore 3D Printing Gallery
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default ThreeDPrintingPreview