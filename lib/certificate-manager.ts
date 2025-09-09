import { CourseraCertificate } from './certificates-data';

export class CertificateManager {
  /**
   * Helper function to create a new certificate entry
   */
  static createCertificate(data: {
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
  }): CourseraCertificate {
    return {
      id: `coursera-${Date.now()}`, // Generate unique ID
      ...data,
      provider: data.provider || 'Coursera'
    };
  }

  /**
   * Extract certificate information from Coursera URL
   * Example: https://www.coursera.org/account/accomplishments/specialization/certificate/ABCD1234
   */
  static parseCourseraUrl(url: string) {
    const patterns = {
      specialization: /coursera\.org\/account\/accomplishments\/specialization\/certificate\/([A-Z0-9]+)/i,
      certificate: /coursera\.org\/account\/accomplishments\/certificate\/([A-Z0-9]+)/i,
      verify: /coursera\.org\/verify\/([A-Z0-9]+)/i
    };

    for (const [type, pattern] of Object.entries(patterns)) {
      const match = url.match(pattern);
      if (match) {
        return {
          credentialId: match[1],
          type: type,
          isValid: true
        };
      }
    }

    return {
      credentialId: null,
      type: 'unknown',
      isValid: false
    };
  }

  /**
   * Generate skills suggestions based on course title and institution
   */
  static suggestSkills(title: string, institution: string): string[] {
    const titleLower = title.toLowerCase();
    const institutionLower = institution.toLowerCase();
    
    const skillMappings = {
      'machine learning': ['Machine Learning', 'Python', 'Statistics', 'Data Analysis'],
      'deep learning': ['Deep Learning', 'Neural Networks', 'TensorFlow', 'PyTorch'],
      'ai': ['Artificial Intelligence', 'Machine Learning', 'Python', 'Data Science'],
      'data science': ['Data Science', 'Python', 'Statistics', 'Machine Learning'],
      'cloud': ['Cloud Computing', 'DevOps', 'Infrastructure'],
      'healthcare': ['Healthcare Technology', 'Medical Data Analysis', 'Clinical Research'],
      'algorithms': ['Data Structures', 'Algorithms', 'Problem Solving', 'Programming'],
      'web development': ['Web Development', 'JavaScript', 'HTML', 'CSS'],
      'mobile': ['Mobile Development', 'App Development'],
      'security': ['Cybersecurity', 'Information Security', 'Network Security'],
      'google': ['Google Cloud Platform', 'GCP'],
      'amazon': ['AWS', 'Amazon Web Services'],
      'microsoft': ['Microsoft Azure', 'Azure'],
      'stanford': ['Research', 'Academic Excellence'],
      'deeplearning.ai': ['Deep Learning', 'AI Research', 'Neural Networks']
    };

    const suggestions = new Set<string>();
    
    // Check title for keywords
    Object.entries(skillMappings).forEach(([keyword, skills]) => {
      if (titleLower.includes(keyword) || institutionLower.includes(keyword)) {
        skills.forEach(skill => suggestions.add(skill));
      }
    });

    return Array.from(suggestions).slice(0, 6); // Limit to 6 suggestions
  }

  /**
   * Validate certificate data before adding
   */
  static validateCertificate(cert: Partial<CourseraCertificate>): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!cert.title || cert.title.trim().length < 3) {
      errors.push('Title must be at least 3 characters long');
    }

    if (!cert.institution || cert.institution.trim().length < 2) {
      errors.push('Institution is required');
    }

    if (!cert.completedDate) {
      errors.push('Completion date is required');
    } else {
      const date = new Date(cert.completedDate);
      if (isNaN(date.getTime()) || date > new Date()) {
        errors.push('Invalid completion date');
      }
    }

    if (!cert.skills || cert.skills.length === 0) {
      errors.push('At least one skill is required');
    }

    if (!cert.category) {
      errors.push('Category is required');
    }

    if (!cert.description || cert.description.trim().length < 10) {
      errors.push('Description must be at least 10 characters long');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Sort certificates by completion date (newest first)
   */
  static sortByDate(certificates: CourseraCertificate[]): CourseraCertificate[] {
    return [...certificates].sort((a, b) => 
      new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime()
    );
  }

  /**
   * Group certificates by category
   */
  static groupByCategory(certificates: CourseraCertificate[]) {
    return certificates.reduce((groups, cert) => {
      const category = cert.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(cert);
      return groups;
    }, {} as Record<string, CourseraCertificate[]>);
  }

  /**
   * Calculate learning statistics
   */
  static calculateStats(certificates: CourseraCertificate[]) {
    const totalCerts = certificates.length;
    const allSkills = new Set<string>();
    
    certificates.forEach(cert => {
      cert.skills.forEach(skill => allSkills.add(skill));
    });

    const monthsActive = certificates.length > 0 ? 
      Math.ceil((new Date().getTime() - new Date(certificates[certificates.length - 1].completedDate).getTime()) / (1000 * 60 * 60 * 24 * 30)) : 0;

    const estimatedHours = certificates.length * 40; // Rough estimate: 40 hours per certificate

    return {
      totalCertificates: totalCerts,
      uniqueSkills: allSkills.size,
      estimatedHours,
      monthsActive,
      categories: Object.keys(this.groupByCategory(certificates)).length,
      averagePerMonth: monthsActive > 0 ? Math.round(totalCerts / monthsActive * 100) / 100 : 0
    };
  }
}

// Example usage:
/*
const newCert = CertificateManager.createCertificate({
  title: 'TensorFlow Developer Certificate',
  provider: 'Coursera',
  institution: 'DeepLearning.AI',
  completedDate: '2024-04-15',
  certificateUrl: 'https://coursera.org/verify/professional-cert/ABC123',
  skills: ['TensorFlow', 'Deep Learning', 'Python', 'Computer Vision'],
  category: 'ai-ml',
  duration: '3 months',
  grade: 'A+',
  description: 'Professional certificate covering TensorFlow fundamentals and practical deep learning applications.',
  featured: true
});

const validation = CertificateManager.validateCertificate(newCert);
if (validation.isValid) {
  // Add to certificates array
  console.log('Certificate is valid and ready to add!');
} else {
  console.log('Validation errors:', validation.errors);
}
*/