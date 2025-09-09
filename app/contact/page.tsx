'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ExternalLink,
  Briefcase,
  Heart,
  Award,
  MessageSquare,
  Send,
  CheckCircle2
} from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  projectType: string;
  timeline: string;
  budget: string;
  message: string;
  newsletter: boolean;
}

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Best for detailed project discussions',
    contact: 'sharon.zhang@healthcare-ai.dev',
    color: 'var(--color-healthcare-blue)'
  },
  {
    icon: Phone,
    title: 'Phone',
    description: 'Available for urgent healthcare projects',
    contact: '+1 (555) 123-4567',
    color: 'var(--color-medical-teal)'
  },
  {
    icon: Calendar,
    title: 'Schedule Meeting',
    description: '30-min healthcare AI consultation',
    contact: 'calendly.com/sharon-zhang',
    color: 'var(--color-innovation-orange)'
  }
];

const expertiseAreas = [
  {
    icon: Heart,
    title: 'Medical Devices',
    description: 'IoT sensors, FDA compliance, clinical validation'
  },
  {
    icon: Briefcase,
    title: 'Healthcare AI',
    description: 'Machine learning, computer vision, predictive analytics'
  },
  {
    icon: Award,
    title: 'Chronic Disease Management',
    description: 'Patient compliance, remote monitoring, cost reduction'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    projectType: '',
    timeline: '',
    budget: '',
    message: '',
    newsletter: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after successful submission
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        role: '',
        projectType: '',
        timeline: '',
        budget: '',
        message: '',
        newsletter: false
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-xl text-gray-700 mb-8 max-w-md">
            Your message has been received. I&apos;ll respond within 24 hours to discuss your healthcare AI project.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <section className="section-spacing pt-24">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-8">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Back to homepage"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </Link>
          </div>

          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Let&apos;s Build Healthcare AI Together
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Ready to discuss your healthcare AI project? I specialize in medical device development, 
              chronic disease management solutions, and clinical automation systems.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-200 text-center hover:shadow-lg transition-shadow"
                >
                  <div 
                    className="w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center"
                    style={{ 
                      backgroundColor: `${method.color}20`,
                      color: method.color
                    }}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                  <a
                    href={method.title === 'Email' ? `mailto:${method.contact}` : 
                          method.title === 'Phone' ? `tel:${method.contact}` : 
                          `https://${method.contact}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center gap-1"
                    target={method.title === 'Schedule Meeting' ? '_blank' : undefined}
                    rel={method.title === 'Schedule Meeting' ? 'noopener noreferrer' : undefined}
                  >
                    {method.contact}
                    {method.title === 'Schedule Meeting' && <ExternalLink className="h-3 w-3" />}
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Project Discussion</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Dr. Sarah Chen"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="sarah.chen@hospital.org"
                      />
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Organization
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Johns Hopkins Hospital"
                      />
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                        Role/Title
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Chief Medical Officer"
                      />
                    </div>
                  </div>

                  {/* Project Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                        Project Type *
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select project type</option>
                        <option value="medical-device">Medical Device Development</option>
                        <option value="ai-healthcare">AI Healthcare Solutions</option>
                        <option value="automation">Clinical Automation</option>
                        <option value="data-platform">Healthcare Data Platform</option>
                        <option value="consulting">Technical Consulting</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                        Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select timeline</option>
                        <option value="urgent">ASAP (&lt; 1 month)</option>
                        <option value="short">Short-term (1-3 months)</option>
                        <option value="medium">Medium-term (3-6 months)</option>
                        <option value="long">Long-term (6+ months)</option>
                        <option value="ongoing">Ongoing partnership</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-25k">Under $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k-250k">$100,000 - $250,000</option>
                      <option value="250k-plus">$250,000+</option>
                      <option value="discuss">Let&apos;s discuss</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      placeholder="Please describe your healthcare AI project, specific challenges you're facing, and how I can help. Include any technical requirements, regulatory considerations, or patient impact goals."
                    />
                  </div>

                  {/* Newsletter */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="newsletter"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="newsletter" className="text-sm text-gray-700">
                      Subscribe to healthcare AI updates and case study releases
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 h-12 px-6 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Expertise Areas */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Areas of Expertise</h3>
                <div className="space-y-6">
                  {expertiseAreas.map((area, index) => {
                    const IconComponent = area.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">{area.title}</h4>
                          <p className="text-gray-600 text-xs mt-1">{area.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <h3 className="text-lg font-bold text-gray-900">Location</h3>
                </div>
                <p className="text-gray-600 mb-2">Baltimore, MD</p>
                <p className="text-gray-500 text-sm">
                  Available for remote collaboration and on-site visits for healthcare projects
                </p>
              </div>

              {/* Response Time */}
              <div className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Response</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Healthcare emergencies</span>
                    <span className="font-medium text-green-700">2-4 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Project inquiries</span>
                    <span className="font-medium text-green-700">24 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">General questions</span>
                    <span className="font-medium text-green-700">48 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}