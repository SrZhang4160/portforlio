'use client';

import { ProjectCard } from '../../components/ui/ProjectCard';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Filter, Grid, List } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// Extended healthcare project data
const allProjects = [
  {
    id: 'glaucoma-ai-app',
    title: 'At-Home Tonometer + Glaucoma AI App',
    description: 'Transforms $200+ clinical test into accessible home monitoring with AI-powered chronic disease management.',
    impact: 'Reduces glaucoma monitoring costs by 60% while improving patient compliance 3x.',
    imageUrl: '/images/projects/tonometer-showcase.svg',
    imageAlt: 'At-home tonometer device with AI-powered glaucoma management app interface',
    caseStudyUrl: '/portfolio/glaucoma-ai-app',
    featured: true,
    category: 'Medical Devices',
    year: '2024',
    status: 'Production',
    metrics: {
      patients: 2000,
      costReduction: 60,
      accuracy: 94
    },
    techStack: ['Python', 'TensorFlow', 'React Native', 'IoT Sensors', 'FDA Compliance']
  },
  {
    id: 'autobrachy-automation',
    title: 'Autobrachy Cancer Treatment Automation',
    description: 'First-of-its-kind cervical cancer treatment automation system improving precision and safety.',
    impact: 'Reduces treatment time by 40% while increasing precision and safety protocols.',
    imageUrl: '/images/projects/autobrachy-system.svg',
    imageAlt: 'Autobrachy automated cancer treatment system with robotic precision',
    caseStudyUrl: '/portfolio/autobrachy-automation',
    category: 'Medical Robotics',
    year: '2023',
    status: 'Clinical Trial',
    metrics: {
      patients: 150,
      efficiency: 40,
      accuracy: 98
    },
    techStack: ['Medical Robotics', 'C++', 'ROS', 'Safety Protocols', 'Clinical Validation']
  },
  {
    id: 'muscle-analytics-platform',
    title: 'AI-Powered Muscle Analytics Platform',
    description: 'Computer vision platform automating muscle analysis for research and human performance optimization.',
    impact: 'Enables breakthrough research by automating previously manual measurement processes.',
    imageUrl: '/images/projects/muscle-analytics.svg',
    imageAlt: 'AI-powered muscle analysis platform with computer vision capabilities',
    caseStudyUrl: '/portfolio/muscle-analytics-platform',
    category: 'AI Research',
    year: '2023',
    status: 'Research',
    metrics: {
      accuracy: 96,
      efficiency: 75
    },
    techStack: ['Computer Vision', 'Deep Learning', 'Python', 'OpenCV', 'Research APIs']
  },
  {
    id: 'healthcare-pipeline-automation',
    title: 'Healthcare Data Pipeline Automation',
    description: 'End-to-end automation system for processing clinical data and generating actionable insights.',
    impact: 'Reduces data processing time by 80% while ensuring HIPAA compliance and data integrity.',
    imageUrl: '/images/projects/healthcare-pipeline.svg',
    imageAlt: 'Healthcare data pipeline automation dashboard with real-time metrics',
    caseStudyUrl: '/portfolio/healthcare-pipeline-automation',
    category: 'Data Engineering',
    year: '2024',
    status: 'Production',
    metrics: {
      efficiency: 80,
      accuracy: 99
    },
    techStack: ['Python', 'Apache Airflow', 'Docker', 'AWS', 'HIPAA Compliance']
  }
];

const categories = ['All', 'Medical Devices', 'Medical Robotics', 'AI Research', 'Data Engineering'];
const statuses = ['All', 'Production', 'Clinical Trial', 'Research'];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProjects = allProjects.filter(project => {
    const categoryMatch = selectedCategory === 'All' || project.category === selectedCategory;
    const statusMatch = selectedStatus === 'All' || project.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header Section */}
      <section className="section-spacing pt-24" role="banner" aria-label="Portfolio header">
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
              Healthcare AI Portfolio
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Comprehensive showcase of medical device innovations, AI-powered healthcare solutions, 
              and clinical automation systems improving patient outcomes across chronic disease management.
            </p>
          </div>

          {/* Filters and View Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-12 p-6 bg-white rounded-xl border border-gray-200">
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <label htmlFor="category-filter" className="text-sm font-medium text-gray-700">
                  Category:
                </label>
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
                  Status:
                </label>
                <select
                  id="status-filter"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-label="Grid view"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Results Info */}
          <div className="mb-8">
            <p className="text-gray-600">
              Showing {filteredProjects.length} of {allProjects.length} projects
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {selectedStatus !== 'All' && ` with status: ${selectedStatus}`}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24" role="main" aria-label="Healthcare projects showcase">
        <div className="container-custom">
          <div className={
            viewMode === 'grid' 
              ? "grid lg:grid-cols-2 gap-8" 
              : "space-y-8"
          }>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant={project.featured ? 'featured' : 'default'}
                onInteraction={(event, projectId) => {
                  // Analytics tracking would go here
                  console.log(`Project ${event}:`, projectId);
                }}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Grid className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your filters to see more results.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedStatus('All');
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Discuss Your Healthcare AI Project?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let&apos;s explore how my healthcare AI expertise can accelerate your medical technology initiatives.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-12 px-8 text-base font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}