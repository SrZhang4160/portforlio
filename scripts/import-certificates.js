/**
 * Certificate Import Helper Script
 * 
 * Instructions:
 * 1. Copy your certificates from LinkedIn in the format below
 * 2. Run this script to generate the TypeScript data
 * 3. Replace the data in certificates-data.ts
 */

// PASTE YOUR CERTIFICATES HERE IN THIS FORMAT:
const rawCertificates = `
Example format - replace with your actual certificates:

Google AI Platform Specialization|Google Cloud|2024-03-15|3 months|Machine Learning, Google Cloud, AI Platform, TensorFlow|Professional specialization covering AI/ML on Google Cloud Platform
Deep Learning Specialization|DeepLearning.AI|2024-01-20|4 months|Deep Learning, Neural Networks, TensorFlow, Computer Vision, NLP|Comprehensive deep learning course by Andrew Ng
AWS Solutions Architect|Amazon Web Services|2023-11-10|2 months|AWS, Cloud Architecture, EC2, S3, Lambda|Professional certification for cloud solutions architecture
Data Structures and Algorithms|UC San Diego|2023-09-05|5 months|Algorithms, Data Structures, Java, Problem Solving|Fundamental computer science concepts and programming
Healthcare AI Certificate|Stanford University|2023-07-18|3 months|Healthcare AI, Medical Imaging, Clinical Data, Ethics|AI applications in healthcare and medical technology

`;

function parseCertificates(rawText) {
  const lines = rawText.trim().split('\n').filter(line => line.includes('|'));
  const certificates = [];
  
  lines.forEach((line, index) => {
    const parts = line.split('|').map(part => part.trim());
    if (parts.length >= 6) {
      const [title, institution, completedDate, duration, skillsStr, description] = parts;
      const skills = skillsStr.split(',').map(skill => skill.trim());
      
      // Determine category based on title and skills
      let category = 'other';
      const titleLower = title.toLowerCase();
      const skillsLower = skills.join(' ').toLowerCase();
      
      if (titleLower.includes('ai') || titleLower.includes('machine learning') || titleLower.includes('deep learning') || skillsLower.includes('ai') || skillsLower.includes('machine learning')) {
        category = 'ai-ml';
      } else if (titleLower.includes('healthcare') || titleLower.includes('medical') || skillsLower.includes('healthcare')) {
        category = 'healthcare';
      } else if (titleLower.includes('cloud') || titleLower.includes('aws') || titleLower.includes('google cloud') || skillsLower.includes('cloud')) {
        category = 'cloud';
      } else if (titleLower.includes('data') || skillsLower.includes('data science') || skillsLower.includes('data structures')) {
        category = 'data-science';
      } else if (titleLower.includes('programming') || titleLower.includes('algorithm') || skillsLower.includes('java') || skillsLower.includes('python')) {
        category = 'programming';
      }
      
      certificates.push({
        id: `cert-${index + 1}`,
        title,
        provider: 'Coursera',
        institution,
        completedDate,
        skills,
        category,
        duration,
        description,
        featured: index < 3 // Mark first 3 as featured
      });
    }
  });
  
  return certificates;
}

function generateTypeScriptCode(certificates) {
  const certCode = certificates.map(cert => `  {
    id: '${cert.id}',
    title: '${cert.title}',
    provider: '${cert.provider}',
    institution: '${cert.institution}',
    completedDate: '${cert.completedDate}',
    skills: [${cert.skills.map(skill => `'${skill}'`).join(', ')}],
    category: '${cert.category}',
    duration: '${cert.duration}',
    description: '${cert.description}',
    featured: ${cert.featured}
  }`).join(',\n');

  return `export const courseraCertificates: CourseraCertificate[] = [
${certCode}
];`;
}

// Process the certificates
const certificates = parseCertificates(rawCertificates);
console.log('📊 Found certificates:', certificates.length);
console.log('\n🔧 Generated TypeScript code:');
console.log('='.repeat(50));
console.log(generateTypeScriptCode(certificates));
console.log('='.repeat(50));

console.log('\n📋 Instructions:');
console.log('1. Replace the rawCertificates string above with your actual certificate data');
console.log('2. Use this format: Title|Institution|Date|Duration|Skills|Description');
console.log('3. Run: node scripts/import-certificates.js');
console.log('4. Copy the generated code to certificates-data.ts');

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { parseCertificates, generateTypeScriptCode };
}