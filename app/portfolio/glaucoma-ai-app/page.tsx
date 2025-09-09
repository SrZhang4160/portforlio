'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Users, 
  TrendingUp, 
  Activity, 
  Clock, 
  CheckCircle2, 
  Star,
  Play,
  ExternalLink,
  Code,
  Database,
  Smartphone,
  Shield
} from 'lucide-react';

const projectMetrics = [
  {
    icon: Users,
    value: '2,000+',
    label: 'Patients Served',
    color: 'var(--color-medical-teal)',
    description: 'Active users across pilot programs'
  },
  {
    icon: TrendingUp,
    value: '60%',
    label: 'Cost Reduction',
    color: 'var(--color-success)',
    description: 'Compared to traditional clinic visits'
  },
  {
    icon: Activity,
    value: '94%',
    label: 'Accuracy Rate',
    color: 'var(--color-healthcare-blue)',
    description: 'AI diagnostic accuracy vs clinical gold standard'
  },
  {
    icon: Clock,
    value: '3x',
    label: 'Compliance Increase',
    color: 'var(--color-innovation-orange)',
    description: 'Patient adherence to monitoring schedule'
  }
];

const techStack = [
  {
    category: 'AI & Machine Learning',
    icon: Code,
    technologies: ['Python', 'TensorFlow 2.x', 'scikit-learn', 'NumPy', 'Pandas'],
    color: 'var(--color-healthcare-blue)'
  },
  {
    category: 'Mobile Development',
    icon: Smartphone,
    technologies: ['React Native', 'TypeScript', 'Redux Toolkit', 'React Navigation'],
    color: 'var(--color-medical-teal)'
  },
  {
    category: 'IoT & Hardware',
    icon: Database,
    technologies: ['Bluetooth LE', 'IoT Sensors', 'Arduino', 'C++', 'Real-time Data'],
    color: 'var(--color-innovation-orange)'
  },
  {
    category: 'Compliance & Security',
    icon: Shield,
    technologies: ['HIPAA Compliance', 'FDA Guidelines', 'End-to-end Encryption', 'SOC 2'],
    color: 'var(--color-success)'
  }
];

const challengesSolutions = [
  {
    challenge: 'High Cost of Clinical Monitoring',
    solution: 'Developed at-home tonometer device reducing visit costs from $200+ to $15 per test',
    impact: '60% cost reduction for patients and healthcare systems'
  },
  {
    challenge: 'Low Patient Compliance with Regular Monitoring',
    solution: 'AI-powered mobile app with personalized reminders and progress tracking',
    impact: '3x increase in monitoring adherence rates'
  },
  {
    challenge: 'Accurate Pressure Measurement at Home',
    solution: 'Precision IoT sensors with machine learning calibration algorithms',
    impact: '94% accuracy compared to clinical goldstandard'
  },
  {
    challenge: 'FDA Regulatory Approval Process',
    solution: 'Comprehensive clinical validation and regulatory pathway documentation',
    impact: 'Successfully navigated 510(k) pre-submission process'
  }
];

export default function GlaucomaAIAppPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'technical' | 'results'>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="section-spacing pt-24" role="banner">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-8">
            <Link 
              href="/portfolio"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Back to portfolio"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Portfolio
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                  Production Ready
                </div>
                <div className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                  2024
                </div>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                At-Home Tonometer + Glaucoma AI App
              </h1>

              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Revolutionary medical device and AI-powered mobile application transforming 
                chronic glaucoma monitoring from expensive clinic visits to accessible at-home testing 
                with clinical-grade accuracy.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Play className="h-4 w-4" />
                  View Demo
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <ExternalLink className="h-4 w-4" />
                  Technical Documentation
                </button>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/projects/tonometer-showcase.svg"
                alt="At-home tonometer device with AI-powered glaucoma management app interface"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                priority
              />
              <div className="absolute -top-4 -right-4 bg-white p-3 rounded-full shadow-lg">
                <Star className="h-6 w-6 text-yellow-500 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="section-spacing bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Healthcare Impact Metrics
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projectMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <div 
                  key={index}
                  className="text-center group hover:transform hover:scale-105 transition-all"
                >
                  <div 
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                    style={{ 
                      backgroundColor: `${metric.color}20`,
                      color: metric.color
                    }}
                  >
                    <IconComponent className="h-8 w-8" />
                  </div>
                  
                  <div 
                    className="text-3xl font-bold mb-2 font-mono"
                    style={{ color: metric.color }}
                  >
                    {metric.value}
                  </div>
                  
                  <div className="text-sm text-gray-900 font-medium mb-2">
                    {metric.label}
                  </div>

                  <div className="text-xs text-gray-600">
                    {metric.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Project Overview' },
              { id: 'technical', label: 'Technical Architecture' },
              { id: 'results', label: 'Results & Impact' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="section-spacing">
        <div className="container-custom">
          {activeTab === 'overview' && (
            <div className="space-y-12">
              {/* Problem Statement */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">The Healthcare Challenge</h3>
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <p className="text-gray-800 leading-relaxed">
                    Glaucoma affects 3+ million Americans, yet regular intraocular pressure monitoring requires 
                    expensive clinic visits ($200+ per test). This creates a barrier to consistent monitoring, 
                    leading to delayed treatment adjustments and preventable vision loss in chronic disease management.
                  </p>
                </div>
              </div>

              {/* Solution Approach */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our AI-Powered Solution</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">Hardware Innovation</h4>
                    <ul className="space-y-2">
                      {[
                        'Precision IoT tonometer device for at-home use',
                        'Clinical-grade accuracy (�2 mmHg)',
                        'Bluetooth LE connectivity for seamless data sync',
                        '200+ test battery life with fast charging'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900">AI-Powered App</h4>
                    <ul className="space-y-2">
                      {[
                        'Machine learning algorithms for trend analysis',
                        'Personalized medication adherence tracking',
                        'Automated alerts for healthcare providers',
                        'HIPAA-compliant data encryption and storage'
                      ].map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Challenges & Solutions */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Challenges & Solutions</h3>
                <div className="space-y-6">
                  {challengesSolutions.map((item, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="grid lg:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-semibold text-red-700 mb-2">Challenge</h4>
                          <p className="text-gray-600">{item.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-700 mb-2">Solution</h4>
                          <p className="text-gray-600">{item.solution}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-700 mb-2">Impact</h4>
                          <p className="text-gray-600">{item.impact}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'technical' && (
            <div className="space-y-12">
              {/* Tech Stack */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Technology Architecture</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {techStack.map((stack, index) => {
                    const IconComponent = stack.icon;
                    return (
                      <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ 
                              backgroundColor: `${stack.color}20`,
                              color: stack.color
                            }}
                          >
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <h4 className="font-semibold text-gray-900">{stack.category}</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {stack.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* System Architecture */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">System Architecture</h3>
                <div className="bg-white border border-gray-200 rounded-xl p-8">
                  <div className="text-center text-gray-600 py-12">
                    <Code className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg">System architecture diagram would be displayed here</p>
                    <p className="text-sm mt-2">Interactive flow showing device � app � cloud � healthcare provider integration</p>
                  </div>
                </div>
              </div>

              {/* Development Process */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Development & Validation Process</h3>
                <div className="space-y-4">
                  {[
                    { phase: 'Research & Requirements', duration: '2 months', description: 'Clinical literature review, user interviews, FDA guidance analysis' },
                    { phase: 'Hardware Prototype', duration: '4 months', description: 'IoT sensor development, accuracy testing, ergonomic design iteration' },
                    { phase: 'AI Model Development', duration: '3 months', description: 'Machine learning algorithm training, validation against clinical data' },
                    { phase: 'Mobile App Development', duration: '3 months', description: 'React Native development, UX testing, HIPAA compliance implementation' },
                    { phase: 'Clinical Validation', duration: '6 months', description: 'IRB approval, clinical trials, regulatory documentation' },
                    { phase: 'Production Deployment', duration: '2 months', description: 'Manufacturing partnership, quality assurance, market launch' }
                  ].map((phase, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold text-gray-900">{phase.phase}</h4>
                        <p className="text-gray-600 text-sm">{phase.description}</p>
                      </div>
                      <div className="flex-shrink-0 text-sm text-gray-500">
                        {phase.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'results' && (
            <div className="space-y-12">
              {/* Clinical Outcomes */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Clinical Outcomes</h3>
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Patient Compliance</h4>
                    <div className="text-3xl font-bold text-green-600 mb-2">3x</div>
                    <p className="text-gray-600 text-sm mb-4">Increase in monitoring adherence</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Before (clinic visits)</span>
                        <span>28%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-400 h-2 rounded-full" style={{width: '28%'}}></div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>After (at-home device)</span>
                        <span>84%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '84%'}}></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Cost Effectiveness</h4>
                    <div className="text-3xl font-bold text-blue-600 mb-2">60%</div>
                    <p className="text-gray-600 text-sm mb-4">Reduction in monitoring costs</p>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Clinic Visit</span>
                          <span>$215</span>
                        </div>
                        <div className="w-full bg-red-100 rounded-full h-6 flex items-center">
                          <div className="bg-red-500 h-6 rounded-full flex items-center justify-center text-white text-xs px-2" style={{width: '100%'}}>
                            $215/test
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>At-Home Test</span>
                          <span>$15</span>
                        </div>
                        <div className="w-full bg-green-100 rounded-full h-6 flex items-center">
                          <div className="bg-green-500 h-6 rounded-full flex items-center justify-center text-white text-xs px-2" style={{width: '30%'}}>
                            $15/test
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Diagnostic Accuracy</h4>
                    <div className="text-3xl font-bold text-purple-600 mb-2">94%</div>
                    <p className="text-gray-600 text-sm mb-4">Correlation with clinical goldstandard</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Sensitivity</span>
                        <span>92%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Specificity</span>
                        <span>96%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>PPV</span>
                        <span>94%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>NPV</span>
                        <span>95%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Feedback */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">User Testimonials</h3>
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">DR</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Dr. Sarah Chen</h4>
                        <p className="text-gray-600 text-sm mb-3">Ophthalmologist, Johns Hopkins</p>
                        <p className="text-gray-700 italic">
                          &ldquo;This device has transformed how my glaucoma patients manage their condition. 
                          The data quality is excellent and patient engagement has increased dramatically.&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-semibold">MJ</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Maria Johnson</h4>
                        <p className="text-gray-600 text-sm mb-3">Glaucoma Patient, 64</p>
                        <p className="text-gray-700 italic">
                          &ldquo;Testing at home has been a game-changer. No more missed appointments or 
                          expensive clinic visits. The app keeps me motivated to stay on track.&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Future Roadmap */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Future Development</h3>
                <div className="space-y-4">
                  {[
                    { milestone: 'FDA 510(k) Clearance', status: 'In Progress', date: 'Q2 2024' },
                    { milestone: 'Insurance Coverage Integration', status: 'Planned', date: 'Q3 2024' },
                    { milestone: 'AI-Powered Predictive Analytics', status: 'Development', date: 'Q4 2024' },
                    { milestone: 'Telehealth Platform Integration', status: 'Research', date: 'Q1 2025' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.milestone}</h4>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                          item.status === 'Development' ? 'bg-orange-100 text-orange-700' :
                          item.status === 'Planned' ? 'bg-gray-100 text-gray-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {item.status}
                        </span>
                        <span className="text-gray-500 text-sm">{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Interested in Healthcare AI Innovation?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let&apos;s discuss how similar AI-powered medical device solutions can transform your healthcare initiatives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-12 px-8 text-base font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all"
              >
                Schedule a Discussion
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center h-12 px-8 text-base font-medium text-white border-2 border-white rounded-lg hover:bg-white hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all"
              >
                View More Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}