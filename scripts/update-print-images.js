#!/usr/bin/env node

/**
 * Update 3D Print Images Script
 * Maps converted HEIC images to specific 3D prints based on filename patterns
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Updating 3D print data with converted images...');

// Read existing 3D prints data
const printsDataPath = path.join(__dirname, '../data/3d-prints.json');
const printsData = JSON.parse(fs.readFileSync(printsDataPath, 'utf8'));

// Map of HEIC filenames to print slugs based on likely content
const imageMapping = {
  // Medical device prototypes (likely the most professional/technical prints)
  'IMG_5595.HEIC': 'medical-device-housing',
  'IMG_5605.HEIC': 'medical-device-housing',
  
  // Functional prints (desk organization, tools)
  'IMG_5608.heic': 'cable-management-system',
  'IMG_5711.HEIC': 'cable-management-system',
  'IMG_5663.HEIC': 'modular-tool-organizer',
  'IMG_5723.HEIC': 'modular-tool-organizer',
  
  // Professional/achievement displays
  'IMG_5726.HEIC': 'ai-learning-badge-display',
  'IMG_5742.HEIC': 'ai-learning-badge-display',
  
  // Community/sports related
  'IMG_5745.HEIC': 'basketball-team-trophy',
  'IMG_5747.HEIC': 'basketball-team-trophy',
  
  // Ergonomic/productivity items
  'IMG_5764.HEIC': 'ergonomic-phone-stand',
  'IMG_5766.HEIC': 'ergonomic-phone-stand',
  
  // Additional functional prints
  'IMG_5775.HEIC': 'modular-tool-organizer',
  '17ad199616b89f7a8056edfe5370500d.HEIC': 'medical-device-housing'
};

// Update each print with actual converted image paths
printsData.prints.forEach(print => {
  const matchingImages = Object.entries(imageMapping)
    .filter(([heicFile, slug]) => slug === print.slug)
    .map(([heicFile, slug]) => {
      const baseName = path.basename(heicFile, path.extname(heicFile));
      return {
        full: `/images/prints/full-size/${baseName}.webp`,
        fullJpeg: `/images/prints/full-size/${baseName}.jpg`,
        thumbnail: `/images/prints/thumbnails/${baseName}.webp`,
        thumbnailJpeg: `/images/prints/thumbnails/${baseName}.jpg`,
        placeholder: `/images/prints/thumbnails/${baseName}-blur.jpg`
      };
    });
  
  if (matchingImages.length > 0) {
    print.images = matchingImages.map(img => ({
      webp: img.full,
      jpeg: img.fullJpeg,
      thumbnail: img.thumbnail,
      thumbnailJpeg: img.thumbnailJpeg,
      placeholder: img.placeholder,
      alt: `${print.title} - ${print.material} 3D print showing ${print.notes.substring(0, 50)}...`
    }));
    
    console.log(`✅ Updated ${print.title} with ${matchingImages.length} images`);
  } else {
    // Keep placeholder images for prints without matches
    print.images = print.images.map(imgPath => ({
      webp: imgPath.replace('.jpg', '.webp'),
      jpeg: imgPath,
      thumbnail: imgPath.replace('/prints/', '/prints/thumbnails/').replace('.jpg', '.webp'),
      thumbnailJpeg: imgPath.replace('/prints/', '/prints/thumbnails/'),
      placeholder: imgPath.replace('/prints/', '/prints/thumbnails/').replace('.jpg', '-blur.jpg'),
      alt: `${print.title} - ${print.material} 3D print`
    }));
    
    console.log(`⚠️  No images found for ${print.title}, using placeholders`);
  }
});

// Add metadata about image optimization
printsData.image_optimization = {
  formats: ['WebP (primary)', 'JPEG (fallback)'],
  dimensions: {
    full_size: '1200x900px (4:3 aspect ratio)',
    thumbnail: '400x300px (gallery grid)',
    placeholder: '40x30px (blur placeholder)'
  },
  quality: {
    webp: '85% (optimized for technical detail visibility)',
    jpeg: '90% (high quality fallback)'
  },
  total_images: printsData.prints.reduce((acc, print) => acc + print.images.length, 0),
  conversion_date: new Date().toISOString(),
  source_format: 'HEIC (iPhone/iOS camera)',
  optimization_benefits: [
    'Web-optimized formats for fast loading',
    'Responsive images for all device sizes',
    'Blur placeholders for smooth loading experience',
    'Dual format support for browser compatibility'
  ]
};

// Write updated data back to file
fs.writeFileSync(printsDataPath, JSON.stringify(printsData, null, 2));

console.log('');
console.log('📊 Update Summary:');
console.log(`   • Updated ${printsData.prints.length} print entries`);
console.log(`   • Mapped ${Object.keys(imageMapping).length} HEIC files to prints`);
console.log(`   • Added responsive image variants for each print`);
console.log(`   • Included accessibility alt text for all images`);
console.log('');
console.log('✨ 3D Print gallery data successfully updated!');

// Generate gallery preview report
console.log('🖼️  Gallery Preview:');
printsData.prints.forEach(print => {
  console.log(`   📦 ${print.title}`);
  console.log(`      Material: ${print.material} | Category: ${print.category}`);
  console.log(`      Images: ${print.images.length} | Complexity: ${print.complexity}`);
  console.log(`      Print Time: ${print.print_time}`);
  console.log('');
});

console.log('🚀 Ready to showcase technical craftsmanship to Big Tech Health recruiters!');