'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Award, Users, Code, Heart, Briefcase, GraduationCap } from 'lucide-react';

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  logo?: string;
  color: string;
}

interface Skill {
  name: string;
  category: 'technical' | 'medical' | 'leadership' | 'research';
  proficiency: number; // 0-100
  color: string;
  icon?: React.ElementType;
}

const professionalExperience: Experience[] = [
  {
    id: 'carina-medical-senior',
    title: 'Senior Software Engineer',
    company: 'Carina Medical',
    location: 'Herndon, VA',
    period: 'Jan. 2025 – Present',
    description: 'Designed and implemented extensible, maintainable SaaS features for a cloud-based oncology planning system, ensuring diagnosability and testability at scale.',
    achievements: [
      'Collaborated with hospital users to gather diverse requests and identify limitations in 2D viewer editing',
      'Pioneered an innovative 3D STL editing solution to enhance spatial accuracy and user satisfaction',
      'Managed cloud infrastructure deployment on Microsoft Azure using CI/CD pipelines with Docker',
      'Mentored junior engineers in system architecture, code quality practices, and telemetry instrumentation strategies',
      'Ensured reliable and scalable service deployment for critical healthcare applications'
    ],
    technologies: ['Django', 'Angular', 'TypeScript', 'Microsoft Azure', 'Docker', 'CI/CD', '3D Rendering', 'Telemetry'],
    color: '#00D4E6'
  },
  {
    id: 'carina-medical',
    title: 'Software Engineer',
    company: 'Carina Medical',
    location: 'Herndon, VA',
    period: 'May 2023 – Dec. 2024',
    description: 'Built a first-of-its-kind HIPAA-compliant SaaS product that fully automated cervical cancer HDRBT treatment planning, reducing manual workload by 80% and beta-tested with 3+ leading hospitals.',
    achievements: [
      'Refactored API logic and batch data handling to increase system throughput by 70%',
      'Integrated unit and integration tests across services, improved code coverage',
      'Reduced defect leakage into production by 40%',
      'Boosted 3D rendering speed by 80% using intelligent image cropping and compression',
      'Implemented telemetry metrics to track model performance and improve user experience'
    ],
    technologies: ['Django', 'Angular', 'Python', 'Microsoft Azure', 'Docker', 'HIPAA Compliance', 'Medical Imaging'],
    color: '#FF6B35'
  },
  {
    id: 'carina-medical-coop',
    title: 'Software Engineer Co-op',
    company: 'Carina Medical',
    location: 'Herndon, VA', 
    period: 'May 2022 – May 2023',
    description: 'Improved software resilience and maintainability by refactoring backend logic, optimizing database operations, and modularizing reusable components.',
    achievements: [
      'Reduced rendering time by 30% and storage overhead by 20%',
      'Built internal engineering tools and automation scripts to support deployment',
      'Enhanced debugging and maintenance workflows',
      'Authored documentation and training materials',
      'Improved engineering onboarding speed by 30%'
    ],
    technologies: ['Python', 'Django', 'Database Optimization', 'Backend Architecture', 'Documentation', 'Automation'],
    color: '#0078D4'
  }
];

const researchExperience: Experience[] = [
  {
    id: 'jhu-robotics',
    title: 'M.S. in Robotics',
    company: 'Johns Hopkins University',
    location: 'Baltimore, MD',
    period: 'Aug. 2021 – May 2023',
    description: 'Advanced graduate studies in robotics with focus on medical applications, computer vision, and autonomous systems. Completed thesis on robotic automation in healthcare.',
    achievements: [
      'Completed comprehensive coursework in robotics algorithms, computer vision, and machine learning',
      'Developed expertise in ROS, MATLAB, and robotic control systems',
      'Participated in interdisciplinary research projects combining engineering and healthcare',
      'Built foundation in medical device development and regulatory processes',
      'Collaborated with medical professionals on robotics applications in healthcare'
    ],
    technologies: ['ROS', 'MATLAB', 'Computer Vision', 'Machine Learning', 'Robotics Algorithms', 'Medical Robotics'],
    color: '#DC2626'
  },
  {
    id: 'tianjin-mechanical',
    title: 'B.S. in Mechanical Engineering',
    company: 'Tianjin University',
    location: 'Tianjin, China',
    period: 'Sep. 2017 – Jun. 2021',
    description: 'Comprehensive undergraduate engineering education with emphasis on mechanical design, manufacturing processes, and engineering fundamentals. Strong foundation in mathematics and physics.',
    achievements: [
      'Completed rigorous curriculum in mechanical engineering fundamentals',
      'Developed strong analytical and problem-solving skills',
      'Gained experience in CAD design and manufacturing processes',
      'Built foundation in mathematics, physics, and engineering principles',
      'Participated in engineering design projects and competitions'
    ],
    technologies: ['CAD Design', 'Manufacturing Processes', 'Engineering Analysis', 'MATLAB', 'Mechanical Design'],
    color: '#4285F4'
  },
  {
    id: 'patch-ultrasound',
    title: 'Remote Fetal Ultrasound Interface Project',
    company: 'Independent Research',
    location: 'Baltimore, MD',
    period: '2022 - 2023',
    description: 'Developed responsive browser interface enabling remote fetal ultrasound control with real-time bi-directional communication. Achieved sub-second latency for critical diagnostic imaging applications.',
    achievements: [
      'Built responsive web interface for real-time ultrasound control',
      'Implemented bi-directional communication protocols for medical imaging',
      'Achieved sub-second latency critical for diagnostic applications',
      'Ensured compatibility across multiple browser platforms',
      'Designed user-friendly interface for medical professionals'
    ],
    technologies: ['HTML', 'CSS', 'jQuery', 'WebSocket', 'Real-time Communication', 'Medical Imaging'],
    color: '#10B981'
  },
  {
    id: 'jhu-basketball',
    title: 'JHU Asian Women\'s Basketball Team Leadership',
    company: 'Johns Hopkins University',
    location: 'Baltimore, MD',
    period: '2021 - 2023',
    description: 'Leadership role in university basketball team, organizing team activities, coordinating with university athletics, and fostering team culture and community engagement.',
    achievements: [
      'Led team organization and coordination of practice sessions',
      'Facilitated communication between team members and university athletics',
      'Organized team-building activities and community outreach events',
      'Mentored new team members and promoted inclusive team culture',
      'Balanced athletic leadership with demanding academic schedule'
    ],
    technologies: ['Team Leadership', 'Event Organization', 'Communication', 'Community Engagement', 'Mentoring'],
    color: '#7C3AED'
  }
];

const skills: Skill[] = [
  // Technical Skills - Programming & AI/ML
  { name: 'Python', category: 'technical', proficiency: 95, color: '#3776AB', icon: Code },
  { name: 'Machine Learning', category: 'technical', proficiency: 93, color: '#FF6F00', icon: Code },
  { name: 'Deep Learning', category: 'technical', proficiency: 90, color: '#FF9800', icon: Code },
  { name: 'Computer Vision', category: 'technical', proficiency: 88, color: '#E91E63', icon: Code },
  { name: 'Natural Language Processing', category: 'technical', proficiency: 85, color: '#9C27B0', icon: Code },
  { name: 'TensorFlow/PyTorch', category: 'technical', proficiency: 92, color: '#FF5722', icon: Code },
  { name: 'React/TypeScript', category: 'technical', proficiency: 87, color: '#61DAFB', icon: Code },
  { name: 'C++/ROS', category: 'technical', proficiency: 82, color: '#00599C', icon: Code },
  { name: 'SQL/NoSQL Databases', category: 'technical', proficiency: 85, color: '#336791', icon: Code },
  { name: 'Cloud Platforms (AWS/Azure/GCP)', category: 'technical', proficiency: 88, color: '#FF9900', icon: Code },
  
  // Medical Domain Expertise
  { name: 'Medical Device Development', category: 'medical', proficiency: 90, color: '#2E7D32', icon: Heart },
  { name: 'FDA Regulatory Pathway', category: 'medical', proficiency: 85, color: '#1976D2', icon: Heart },
  { name: 'Clinical Trial Design', category: 'medical', proficiency: 82, color: '#388E3C', icon: Heart },
  { name: 'Medical Robotics', category: 'medical', proficiency: 88, color: '#D32F2F', icon: Heart },
  { name: 'Medical Imaging (DICOM)', category: 'medical', proficiency: 87, color: '#7B1FA2', icon: Heart },
  { name: 'Healthcare Standards (HL7/FHIR)', category: 'medical', proficiency: 80, color: '#303F9F', icon: Heart },
  { name: 'Clinical Decision Support', category: 'medical', proficiency: 85, color: '#C2185B', icon: Heart },
  { name: 'Healthcare AI Ethics', category: 'medical', proficiency: 92, color: '#512DA8', icon: Heart },
  { name: 'Biomedical Signal Processing', category: 'medical', proficiency: 83, color: '#00796B', icon: Heart },
  
  // Leadership & Management
  { name: 'Team Leadership', category: 'leadership', proficiency: 88, color: '#F57C00', icon: Users },
  { name: 'Cross-functional Collaboration', category: 'leadership', proficiency: 90, color: '#FF5722', icon: Users },
  { name: 'Project Management', category: 'leadership', proficiency: 85, color: '#FF9800', icon: Users },
  { name: 'Mentoring & Training', category: 'leadership', proficiency: 87, color: '#FF6F00', icon: Users },
  { name: 'Community Building', category: 'leadership', proficiency: 95, color: '#4CAF50', icon: Users },
  { name: 'Public Speaking', category: 'leadership', proficiency: 83, color: '#8BC34A', icon: Users },
  { name: 'Stakeholder Management', category: 'leadership', proficiency: 80, color: '#FFC107', icon: Users },
  
  // Research & Academic
  { name: 'Research Design & Methodology', category: 'research', proficiency: 90, color: '#3F51B5', icon: GraduationCap },
  { name: 'Academic Writing & Publication', category: 'research', proficiency: 88, color: '#2196F3', icon: GraduationCap },
  { name: 'Grant Writing & Funding', category: 'research', proficiency: 75, color: '#03A9F4', icon: GraduationCap },
  { name: 'Statistical Analysis', category: 'research', proficiency: 85, color: '#00BCD4', icon: GraduationCap },
  { name: 'Peer Review & Editorial', category: 'research', proficiency: 80, color: '#009688', icon: GraduationCap },
  { name: 'Conference Presentation', category: 'research', proficiency: 87, color: '#4CAF50', icon: GraduationCap },
  { name: 'Collaboration & Networking', category: 'research', proficiency: 85, color: '#8BC34A', icon: GraduationCap },
];

const categoryColors = {
  technical: 'from-blue-500 to-cyan-500',
  medical: 'from-red-500 to-pink-500',
  leadership: 'from-orange-500 to-yellow-500',
  research: 'from-purple-500 to-indigo-500'
};

export function MyJourneySection() {
  const [activeTab, setActiveTab] = useState<'professional' | 'research'>('professional');
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('all');

  const currentExperience = activeTab === 'professional' ? professionalExperience : researchExperience;
  
  const filteredSkills = selectedSkillCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedSkillCategory);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white" id="journey">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              My Journey
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Healthcare AI innovation through research, engineering, and community leadership
          </p>
        </motion.div>

        {/* Experience Tabs */}
        <div className="mb-16">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-2xl p-2 inline-flex">
              {[
                { key: 'professional', label: 'Professional Experience', icon: Briefcase },
                { key: 'research', label: 'Education & Projects', icon: GraduationCap }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                
                return (
                  <motion.button
                    key={tab.key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.key as 'professional' | 'research')}
                    className={`px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-3 ${
                      isActive
                        ? 'bg-white text-gray-900 shadow-lg'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid lg:grid-cols-2 gap-8">
                {currentExperience.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden">
                      {/* Background gradient */}
                      <div 
                        className="absolute top-0 left-0 w-full h-1 opacity-80"
                        style={{ backgroundColor: exp.color }}
                      />
                      
                      {/* Header */}
                      <div className="mb-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                            {exp.title}
                          </h3>
                          <div 
                            className="w-4 h-4 rounded-full opacity-60"
                            style={{ backgroundColor: exp.color }}
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-lg font-semibold text-gray-700">{exp.company}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {exp.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {exp.period}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 mb-6 leading-relaxed">{exp.description}</p>

                      {/* Achievements */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div 
                                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                style={{ backgroundColor: exp.color }}
                              />
                              <span className="text-gray-600 text-sm">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Hover effect */}
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                        style={{ background: `linear-gradient(135deg, ${exp.color}, transparent)` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Skills & Expertise
              </span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Technical proficiencies across healthcare AI, medical robotics, and team leadership
            </p>
          </div>

          {/* Skill Category Filter */}
          <div className="flex justify-center gap-2 mb-8">
            {['all', 'technical', 'medical', 'leadership', 'research'].map(category => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSkillCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedSkillCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSkills.map((skill, index) => {
              const Icon = skill.icon || Code;
              
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: skill.color + '20' }}
                    >
                      <Icon 
                        className="w-5 h-5"
                        style={{ color: skill.color }}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                      <p className="text-xs text-gray-500 capitalize">{skill.category}</p>
                    </div>
                  </div>
                  
                  {/* Skill bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Proficiency</span>
                      <span className="text-sm font-bold" style={{ color: skill.color }}>
                        {skill.proficiency}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1, delay: index * 0.05 }}
                        viewport={{ once: true }}
                        className="h-2 rounded-full"
                        style={{ backgroundColor: skill.color }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}