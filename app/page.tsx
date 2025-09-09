'use client';

import { HeroSectionV2 } from '../components/sections/HeroSectionV2';
import { MyJourneySection } from '../components/sections/MyJourneySection';
import { ProjectCard } from '../components/ui/ProjectCard';
import { TimeSpaceUSA } from '../components/sections/TimeSpaceUSA';
import { PrintingGallery } from '../components/sections/PrintingGallery';
import { BooksSimple } from '../components/sections/BooksSimple';
import { LeadershipSection } from '../components/sections/LeadershipSection';

// Featured projects based on actual work experience
const featuredProjects = [
  {
    id: 'cervical-cancer-automation',
    title: 'Cervical Cancer Treatment Automation',
    description: 'First-of-its-kind HIPAA-compliant SaaS product that fully automated cervical cancer HDRBT treatment planning.',
    impact: 'Reduced manual workload by 80% and beta-tested with 3+ leading hospitals.',
    imageUrl: '/images/projects/cervical-cancer-automation.svg',
    imageAlt: 'Automated cervical cancer treatment planning system interface',
    caseStudyUrl: '/portfolio/cervical-cancer-automation',
    featured: true,
    metrics: {
      efficiency: 80,
      patients: 3000,
      accuracy: 95
    },
    techStack: ['Django', 'Angular', 'Python', 'Microsoft Azure', 'Docker', 'HIPAA Compliance']
  },
  {
    id: 'oncology-saas-platform',
    title: 'Cloud-Based Oncology Planning System',
    description: 'Extensible SaaS platform for oncology treatment planning with 3D STL editing and spatial accuracy enhancements.',
    impact: 'Enhanced user satisfaction with innovative 3D editing solution and scalable cloud infrastructure.',
    imageUrl: '/images/projects/oncology-platform.svg',
    imageAlt: '3D oncology treatment planning interface with STL editing capabilities',
    caseStudyUrl: '/portfolio/oncology-platform',
    metrics: {
      efficiency: 80,
      accuracy: 95,
      costReduction: 40
    },
    techStack: ['Django', 'Angular', 'TypeScript', 'Azure', 'CI/CD', '3D Rendering', 'Telemetry']
  },
  {
    id: 'patch-ultrasound-interface',
    title: 'Remote Fetal Ultrasound Interface',
    description: 'Responsive browser interface enabling remote fetal ultrasound control with real-time bi-directional communication.',
    impact: 'Achieved sub-second latency for critical diagnostic imaging applications.',
    imageUrl: '/images/projects/ultrasound-interface.svg',
    imageAlt: 'Remote ultrasound control interface with real-time imaging',
    caseStudyUrl: '/portfolio/ultrasound-interface',
    metrics: {
      efficiency: 98,
      accuracy: 99,
      patients: 500
    },
    techStack: ['HTML', 'CSS', 'jQuery', 'WebSocket', 'Real-time Communication', 'Medical Imaging']
  }
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSectionV2 />

      {/* My Journey Section */}
      <div id="journey">
        <MyJourneySection />
      </div>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-gradient-to-b from-white to-gray-50" role="region" aria-label="Technical skills and projects">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant={project.featured ? 'featured' : 'default'}
                className="h-full"
                onInteraction={(event, projectId) => {
                  // Analytics tracking would go here
                  console.log(`Project ${event}:`, projectId);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3D Printing Gallery */}
      <PrintingGallery />

      {/* Books & Learning Section */}
      <BooksSimple />

      {/* Time & Space Map */}
      <TimeSpaceUSA />

      {/* Leadership Section - She Got Buckets */}
      <LeadershipSection />

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50" role="region" aria-label="Contact information">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Let&apos;s Connect
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Senior Software Engineer at Carina Medical, passionate about healthcare technology innovation. 
              From automating cancer treatment planning to empowering communities through basketball, 
              I love building solutions that transform lives. Let&apos;s create something meaningful together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:zsr_cco@outlook.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                aria-label="Send email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.44a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Me
              </a>
              <a
                href="https://www.linkedin.com/in/shuranzhang/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-all duration-200 transform hover:-translate-y-0.5"
                aria-label="Connect on LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}