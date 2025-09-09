export interface CourseraCertificate {
  id: string;
  title: string;
  provider: string;
  institution: string;
  completedDate: string;
  certificateUrl?: string;
  credentialId?: string;
  skills: string[];
  category: 'ai-ml' | 'healthcare' | 'programming' | 'data-science' | 'cloud' | 'other';
  duration: string;
  grade?: string;
  imageUrl?: string;
  description: string;
  featured?: boolean;
}

export interface LearningProgress {
  totalCertificates: number;
  totalHours: number;
  skillsAcquired: string[];
  recentActivity: {
    date: string;
    action: string;
    course: string;
  }[];
}

export const courseraCertificates: CourseraCertificate[] = [
  {
    id: 'gcp-fhir-2024',
    title: 'Ingesting FHIR Data with the Healthcare API',
    provider: 'Google Cloud',
    institution: 'Google Cloud',
    completedDate: '2024-09-01',
    credentialId: '2ARP6WP2JME1',
    skills: ['FHIR', 'Healthcare API', 'Google Cloud Healthcare', 'Medical Data Interoperability', 'Cloud Healthcare', 'Healthcare Standards'],
    category: 'healthcare',
    duration: '2 weeks',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/512px-Google_Cloud_logo.svg.png',
    description: 'Specialized certification covering FHIR data ingestion, healthcare API implementation, and medical data interoperability using Google Cloud Healthcare APIs.',
    featured: true
  },
  {
    id: 'bloomberg-market-2024',
    title: 'Bloomberg Market Concepts',
    provider: 'Bloomberg',
    institution: 'Bloomberg',
    completedDate: '2024-07-01',
    credentialId: 'ZkPCRxXbaSpubkCXt1AXSejE',
    skills: ['Financial Markets', 'Market Analysis', 'Economics', 'Trading Concepts', 'Financial Data Analysis', 'Bloomberg Terminal'],
    category: 'other',
    duration: '4 weeks',
    imageUrl: 'https://logos-world.net/wp-content/uploads/2021/02/Bloomberg-Symbol.png',
    description: 'Comprehensive course covering fundamental financial market concepts, economic principles, and market analysis using Bloomberg tools and data.',
    featured: true
  },
  {
    id: 'google-data-analysis-2024',
    title: 'Speed Up Data Analysis and Presentation Building',
    provider: 'Google Career Certificates',
    institution: 'Google Career Certificates',
    completedDate: '2024-08-01',
    credentialId: 'K326DK8OUS7A',
    skills: ['Data Analysis', 'Data Visualization', 'Presentation Building', 'Google Workspace', 'Business Intelligence', 'Analytics'],
    category: 'data-science',
    duration: '3 weeks',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png',
    description: 'Professional certificate focusing on accelerating data analysis workflows and creating compelling presentations using Google tools and advanced analytics techniques.',
    featured: true
  },
  {
    id: 'scrimba-claude-2024',
    title: 'Intro to Claude AI',
    provider: 'Scrimba',
    institution: 'Scrimba',
    completedDate: '2024-08-15',
    credentialId: '7KCKS77SW21P',
    skills: ['Claude AI', 'AI Integration', 'Conversational AI', 'AI Applications', 'Natural Language Processing', 'AI Development'],
    category: 'ai-ml',
    duration: '1 week',
    imageUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=400&h=300&fit=crop&auto=format',
    description: 'Introduction to Claude AI covering conversational AI fundamentals, integration techniques, and practical applications for developers.',
    featured: false
  },
  {
    id: 'google-prompting-2024',
    title: 'Google Prompting Essentials Specialization',
    provider: 'Google Career Certificates',
    institution: 'Google Career Certificates',
    completedDate: '2024-08-20',
    credentialId: 'LQ6HQZX1W5ZX',
    skills: ['Prompt Engineering', 'AI Prompting', 'Generative AI', 'AI Communication', 'AI Optimization', 'Google AI'],
    category: 'ai-ml',
    duration: '4 weeks',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png',
    description: 'Comprehensive specialization covering prompt engineering techniques, AI communication strategies, and optimization methods for generative AI systems.',
    featured: true
  },
  {
    id: 'aws-prompt-engineering-2024',
    title: 'Essentials of Prompt Engineering',
    provider: 'Amazon Web Services (AWS)',
    institution: 'Amazon Web Services (AWS)',
    completedDate: '2024-08-25',
    credentialId: 'blob:https://skillbuilder.aws/3fcb4c20-996d-4b40-884f-e5adc2aefa8f',
    skills: ['Prompt Engineering', 'AWS AI Services', 'Generative AI', 'AI/ML on AWS', 'Amazon Bedrock', 'AI Optimization'],
    category: 'ai-ml',
    duration: '3 weeks',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/512px-Amazon_Web_Services_Logo.svg.png',
    description: 'Essential course covering prompt engineering principles and practices using AWS AI services, with focus on Amazon Bedrock and generative AI applications.',
    featured: true
  },
  {
    id: 'google-prompts-work-2024',
    title: 'Design Prompts for Everyday Work Tasks',
    provider: 'Google Career Certificates',
    institution: 'Google Career Certificates',
    completedDate: '2024-08-30',
    credentialId: 'LT9DA5OT9M3B',
    skills: ['Prompt Design', 'Workplace AI', 'Productivity Enhancement', 'AI Integration', 'Task Automation', 'Workflow Optimization'],
    category: 'ai-ml',
    duration: '2 weeks',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png',
    description: 'Practical course focusing on designing effective prompts for common workplace tasks, improving productivity and workflow efficiency with AI tools.',
    featured: false
  }
];

export const learningStats: LearningProgress = {
  totalCertificates: courseraCertificates.length,
  totalHours: 120, // Estimated total learning hours based on actual certificates
  skillsAcquired: [
    'FHIR', 'Healthcare API', 'Google Cloud Healthcare', 'Medical Data Interoperability',
    'Financial Markets', 'Market Analysis', 'Economics', 'Bloomberg Terminal',
    'Data Analysis', 'Data Visualization', 'Presentation Building', 'Business Intelligence',
    'Claude AI', 'Conversational AI', 'AI Integration', 'Natural Language Processing',
    'Prompt Engineering', 'AI Prompting', 'Generative AI', 'AWS AI Services',
    'Amazon Bedrock', 'AI Optimization', 'Workplace AI', 'Task Automation'
  ],
  recentActivity: [
    {
      date: '2024-09-01',
      action: 'Completed',
      course: 'Ingesting FHIR Data with the Healthcare API'
    },
    {
      date: '2024-08-30',
      action: 'Completed',
      course: 'Design Prompts for Everyday Work Tasks'
    },
    {
      date: '2024-08-25',
      action: 'Completed',
      course: 'Essentials of Prompt Engineering'
    }
  ]
};

export const categoryColors = {
  'ai-ml': 'bg-blue-500',
  'healthcare': 'bg-teal-500',
  'programming': 'bg-green-500',
  'data-science': 'bg-purple-500',
  'cloud': 'bg-orange-500',
  'other': 'bg-gray-500'
};

export const categoryLabels = {
  'ai-ml': 'AI & ML',
  'healthcare': 'Healthcare',
  'programming': 'Programming',
  'data-science': 'Data Science',
  'cloud': 'Cloud Computing',
  'other': 'Other'
};