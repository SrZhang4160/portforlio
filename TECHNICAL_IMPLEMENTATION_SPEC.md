# Sharon Zhang Personal Website - Technical Implementation Specification

**Engineer**: Claude (Full-Stack Development Role)  
**Version**: 1.0  
**Date**: September 2025  
**Status**: Ready for Development  

---

## Executive Summary

This technical specification provides complete implementation guidance for Sharon Zhang's **interactive personal website** targeting **Big Tech Health** recruitment. The system emphasizes **performance**, **accessibility**, and **memorable user experience** while showcasing healthcare AI expertise through modern web technologies.

**Key Technical Goals**:
- **Performance**: Lighthouse score >95 across all categories
- **Accessibility**: WCAG 2.1 AA compliance
- **Scalability**: Handle 10,000+ monthly visitors
- **Maintainability**: Clean, documented codebase for easy updates
- **SEO Excellence**: First-page ranking for healthcare AI engineer keywords

---

## Architecture Overview

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT TIER                              │
├─────────────────────────────────────────────────────────────┤
│  React Components (Next.js 14 App Router)                  │
│  ├── HomePage (Hero + Featured Projects)                   │
│  ├── About (Timeline + AI Learning)                        │
│  ├── Portfolio (Case Studies + Interactive Elements)       │
│  ├── 3D Gallery (Image Grid + Comments)                    │
│  ├── Travel Map (SVG Interactive)                          │
│  └── Contact (Form + Professional Links)                   │
│                                                             │
│  State Management: React Context + Local Storage           │
│  Styling: Tailwind CSS + Custom Components                 │
│  Animation: Framer Motion + CSS Transitions               │
└─────────────────────────────────────────────────────────────┘
                                │
                       ┌────────┴─────────┐
                       │   CDN LAYER      │
                       │  (GitHub Pages)  │
                       │                  │
                       │ • Static Assets  │
                       │ • Image Optimize │
                       │ • GZIP/Brotli   │
                       │ • Edge Caching   │
                       └──────────────────┘
                                │
┌─────────────────────────────────────────────────────────────┐
│                    DATA TIER                                │
├─────────────────────────────────────────────────────────────┤
│  Static Content Sources                                     │
│  ├── /content/projects/*.mdx (Case Studies)                │
│  ├── /data/travel-map.json (Travel Data)                   │
│  ├── /data/3d-prints.json (Gallery Items)                  │
│  └── /public/assets/ (Images, Documents)                   │
│                                                             │
│  Dynamic Features                                           │
│  ├── Contact Form → Netlify Forms / Formspree              │
│  ├── Comments → Local JSON + Manual Moderation             │
│  ├── Analytics → Google Analytics 4                        │
│  └── Search → Static Search Index (Fuse.js)               │
└─────────────────────────────────────────────────────────────┘
```

### Technical Stack Rationale

**Frontend Framework: Next.js 14**
- **App Router**: Modern routing with layouts and streaming
- **Static Generation**: Pre-rendered pages for optimal performance
- **Image Optimization**: Built-in responsive image handling
- **Bundle Optimization**: Automatic code splitting and tree shaking
- **SEO Excellence**: Server-side rendering for search engines

**Styling: Tailwind CSS**
- **Utility-First**: Rapid development with consistent design system
- **Performance**: Purged CSS, minimal bundle size
- **Responsive**: Mobile-first breakpoint system
- **Customization**: Easy theming with design tokens
- **Maintenance**: No CSS conflicts, predictable styles

**Animation: Framer Motion**
- **Performance**: Hardware-accelerated animations
- **Accessibility**: Respects `prefers-reduced-motion`
- **Developer Experience**: Declarative animation API
- **Bundle Size**: Tree-shakable, import only what you use

---

## Tech Stack Implementation Details

### Core Dependencies

```json
{
  "name": "sharon-zhang-portfolio",
  "version": "1.0.0",
  "description": "Healthcare AI Engineer Portfolio",
  "dependencies": {
    "@next/mdx": "^14.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "framer-motion": "^10.16.0",
    "fuse.js": "^7.0.0",
    "gray-matter": "^4.0.3",
    "lucide-react": "^0.290.0",
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-simple-maps": "^3.0.0",
    "reading-time": "^1.5.0",
    "remark": "^15.0.0",
    "remark-html": "^16.0.0",
    "typescript": "^5.0.0"
  },
  "devDependencies": {
    "@types/react-simple-maps": "^3.0.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0",
    "postcss": "^8.4.0",
    "prettier": "^3.0.0",
    "tailwindcss": "^3.3.0"
  }
}
```

### Project Structure

```
portfolio/
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx               # Root layout with navigation
│   ├── page.tsx                 # Homepage
│   ├── about/
│   │   └── page.tsx             # About page
│   ├── portfolio/
│   │   ├── page.tsx             # Portfolio hub
│   │   └── [slug]/
│   │       └── page.tsx         # Dynamic case study pages
│   ├── prints/
│   │   └── page.tsx             # 3D printing gallery
│   ├── travel/
│   │   └── page.tsx             # Interactive travel map
│   ├── contact/
│   │   └── page.tsx             # Contact form
│   └── globals.css              # Global styles
├── components/                   # Reusable React components
│   ├── ui/                      # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── sections/                # Page sections
│   │   ├── Hero.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── AboutTimeline.tsx
│   │   ├── SkillsShowcase.tsx
│   │   └── ContactForm.tsx
│   └── interactive/             # Interactive components
│       ├── TravelMap.tsx
│       ├── PrintGallery.tsx
│       ├── CaseStudyNav.tsx
│       └── CommentSystem.tsx
├── content/                     # MDX content files
│   ├── projects/               # Case study MDX files
│   │   ├── glaucoma-ai.mdx
│   │   ├── autobrachy.mdx
│   │   ├── muscle-analytics.mdx
│   │   └── radiology-tools.mdx
│   └── pages/                  # Static page content
│       ├── about.mdx
│       └── now.mdx
├── data/                        # JSON data files
│   ├── travel-map.json         # Travel locations and stories
│   ├── 3d-prints.json          # Gallery items with metadata
│   ├── skills.json             # Technical skills data
│   └── testimonials.json       # Professional recommendations
├── lib/                         # Utility functions
│   ├── mdx.ts                  # MDX processing utilities
│   ├── analytics.ts            # Google Analytics setup
│   ├── seo.ts                  # SEO metadata generation
│   └── utils.ts                # General utility functions
├── public/                      # Static assets
│   ├── images/
│   │   ├── projects/           # Case study images
│   │   ├── prints/             # 3D print photos (converted from HEIC)
│   │   ├── travel/             # Travel photos
│   │   └── profile/            # Professional headshots
│   ├── documents/              # Downloadable files (resume, etc.)
│   ├── icons/                  # Custom icons and logos
│   └── favicon/                # Favicon files
├── styles/                      # CSS and styling
│   ├── globals.css             # Global Tailwind imports
│   └── components.css          # Custom component styles
├── types/                       # TypeScript type definitions
│   ├── mdx.ts
│   ├── travel.ts
│   ├── prints.ts
│   └── index.ts
└── config/                     # Configuration files
    ├── site.ts                 # Site metadata and constants
    ├── navigation.ts           # Navigation structure
    └── seo.ts                  # SEO configuration
```

---

## Data Models & Content Structure

### Case Study Data Model

```typescript
// types/mdx.ts
export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  timeline: string;
  role: string;
  team: string;
  impact: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  images: {
    hero: string;
    gallery: string[];
    architecture?: string;
    results?: string[];
  };
  metadata: {
    description: string;
    keywords: string[];
    openGraph: {
      title: string;
      description: string;
      image: string;
    };
  };
}

// Content structure in MDX frontmatter
---
title: "At-Home Tonometer + Chronic Glaucoma AI Management"
subtitle: "Transforming $200+ clinical tests into accessible home monitoring"
timeline: "2023-2024 (18 months)"
role: "Hardware Development Lead & AI Software Engineer"
team: "4 engineers (hardware, software, AI, clinical)"
impact: "80% cost reduction, 85% patient engagement increase"
tags: ["healthcare-ai", "medical-devices", "chronic-disease", "hardware"]
featured: true
draft: false
publishedAt: "2024-09-01"
images:
  hero: "/images/projects/glaucoma/hero.jpg"
  gallery: ["/images/projects/glaucoma/device.jpg", "/images/projects/glaucoma/app.jpg"]
  architecture: "/images/projects/glaucoma/architecture.svg"
metadata:
  description: "Complete healthcare innovation: at-home tonometer + AI chronic disease management"
  keywords: ["healthcare AI", "medical devices", "glaucoma", "chronic disease management"]
---
```

### 3D Print Gallery Data Model

```typescript
// types/prints.ts
export interface Print3D {
  slug: string;
  title: string;
  images: string[];
  material: 'PLA' | 'PETG' | 'ABS' | 'TPU' | 'WOOD' | 'METAL';
  settings: {
    nozzle: string;
    layer_height: string;
    infill: string;
    walls: string;
    supports: string;
    print_speed: string;
  };
  tags: string[];
  category: 'medical-devices' | 'productivity' | 'professional' | 'community' | 'workshop';
  complexity: 'beginner' | 'intermediate' | 'advanced';
  print_time: string;
  post_processing?: string;
  notes: string;
  learnings: string;
  applications: string;
  created_at: string;
  featured: boolean;
}

// Usage in components
const printCategories = {
  'medical-devices': { color: 'secondary', icon: 'Stethoscope' },
  'productivity': { color: 'primary', icon: 'Laptop' },
  'professional': { color: 'success', icon: 'Award' },
  'community': { color: 'pink', icon: 'Users' },
  'workshop': { color: 'purple', icon: 'Wrench' }
};
```

### Travel Map Data Model

```typescript
// types/travel.ts
export interface TravelLocation {
  state: string;
  name: string;
  note: string;
  year?: string;
  highlights?: string[];
  opportunity?: string;
  priority?: 'high' | 'medium' | 'low';
}

export interface TravelData {
  visited: TravelLocation[];
  wishlist: TravelLocation[];
  future_goals: {
    target_locations: string[];
    career_focus: string;
    networking_priority: string;
  };
}
```

---

## Component Architecture

### Core UI Components

**Button Component with Variants**:
```typescript
// components/ui/Button.tsx
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
          // Variants
          {
            'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-lg hover:-translate-y-0.5': variant === 'primary',
            'bg-secondary-500 text-white hover:bg-secondary-600': variant === 'secondary',
            'border-2 border-primary-500 text-primary-600 hover:bg-primary-50': variant === 'outline',
            'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100': variant === 'ghost',
          },
          // Sizes
          {
            'h-9 px-3 text-sm': size === 'sm',
            'h-11 px-6 text-base': size === 'md',
            'h-14 px-8 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading && <LoadingSpinner className="mr-2 h-4 w-4" />}
        {children}
      </button>
    );
  }
);
```

**Card Component for Consistent Layout**:
```typescript
// components/ui/Card.tsx
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'featured' | 'interactive';
  padding?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  variant = 'default',
  padding = 'md',
  ...props 
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border transition-all duration-300',
        {
          'border-neutral-200 shadow-md hover:shadow-lg hover:-translate-y-1': variant === 'default',
          'border-primary-200 shadow-warm bg-gradient-to-br from-primary-50 to-secondary-50': variant === 'featured',
          'border-neutral-200 shadow-md hover:shadow-xl hover:-translate-y-2 cursor-pointer': variant === 'interactive',
        },
        {
          'p-4': padding === 'sm',
          'p-6': padding === 'md',
          'p-8': padding === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
```

### Interactive Components

**Travel Map Component**:
```typescript
// components/interactive/TravelMap.tsx
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { motion } from 'framer-motion';
import { TravelData } from '@/types/travel';

const geoUrl = '/data/us-states.json'; // TopoJSON file

interface TravelMapProps {
  data: TravelData;
  interactive?: boolean;
}

export const TravelMap: React.FC<TravelMapProps> = ({ data, interactive = true }) => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'visited' | 'wishlist' | 'all'>('all');

  const getStateColor = (stateCode: string) => {
    const isVisited = data.visited.some(location => location.state === stateCode);
    const isWishlist = data.wishlist.some(location => location.state === stateCode);
    
    if (viewMode === 'visited' && isVisited) return '#0ea5e9';
    if (viewMode === 'wishlist' && isWishlist) return '#14b8a6';
    if (viewMode === 'all') {
      if (isVisited) return '#0ea5e9';
      if (isWishlist) return '#14b8a6';
    }
    return '#e5e7eb';
  };

  return (
    <div className="travel-map-container">
      <div className="flex gap-4 justify-center mb-6">
        {(['all', 'visited', 'wishlist'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={cn(
              'px-4 py-2 rounded-lg capitalize transition-all',
              viewMode === mode 
                ? 'bg-primary-500 text-white' 
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            )}
          >
            {mode}
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ComposableMap
          projection="geoAlbersUsa"
          className="w-full h-auto max-w-4xl mx-auto"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateCode = geo.properties.STUSPS;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={getStateColor(stateCode)}
                    stroke="#ffffff"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { 
                        fill: '#f59e0b', 
                        outline: 'none',
                        cursor: interactive ? 'pointer' : 'default'
                      },
                      pressed: { outline: 'none' }
                    }}
                    onMouseEnter={() => interactive && setSelectedState(stateCode)}
                    onMouseLeave={() => interactive && setSelectedState(null)}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </motion.div>

      {selectedState && (
        <LocationTooltip 
          state={selectedState} 
          data={data} 
        />
      )}
    </div>
  );
};
```

**3D Print Gallery with Filtering**:
```typescript
// components/interactive/PrintGallery.tsx
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Print3D } from '@/types/prints';

interface PrintGalleryProps {
  prints: Print3D[];
}

export const PrintGallery: React.FC<PrintGalleryProps> = ({ prints }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrints = useMemo(() => {
    return prints.filter(print => {
      const categoryMatch = selectedCategory === 'all' || print.category === selectedCategory;
      const materialMatch = selectedMaterial === 'all' || print.material === selectedMaterial;
      const searchMatch = searchQuery === '' || 
        print.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        print.notes.toLowerCase().includes(searchQuery.toLowerCase());
      
      return categoryMatch && materialMatch && searchMatch;
    });
  }, [prints, selectedCategory, selectedMaterial, searchQuery]);

  return (
    <div className="print-gallery">
      {/* Filter Controls */}
      <div className="filter-controls mb-8 p-6 bg-neutral-50 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
          >
            <option value="all">All Categories</option>
            <option value="medical-devices">Medical Devices</option>
            <option value="productivity">Productivity</option>
            <option value="professional">Professional</option>
            <option value="community">Community</option>
            <option value="workshop">Workshop</option>
          </select>

          <select
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            className="px-4 py-2 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
          >
            <option value="all">All Materials</option>
            <option value="PLA">PLA</option>
            <option value="PETG">PETG</option>
            <option value="ABS">ABS</option>
            <option value="TPU">TPU</option>
          </select>

          <input
            type="text"
            placeholder="Search prints..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
          />
        </div>
      </div>

      {/* Gallery Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        layout
      >
        <AnimatePresence>
          {filteredPrints.map((print) => (
            <motion.div
              key={print.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <PrintCard print={print} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredPrints.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-500 text-lg">
            No prints found matching your criteria. 
            <button 
              onClick={() => {
                setSelectedCategory('all');
                setSelectedMaterial('all');
                setSearchQuery('');
              }}
              className="text-primary-600 hover:text-primary-700 ml-2"
            >
              Clear filters
            </button>
          </p>
        </div>
      )}
    </div>
  );
};
```

---

## Performance Optimization

### Image Optimization Strategy

**HEIC to WebP Conversion Process**:
```bash
# Batch convert HEIC images to optimized web formats
#!/bin/bash

# Convert HEIC to WebP with optimization
for file in assets/*.HEIC; do
  filename=$(basename "$file" .HEIC)
  
  # Convert to WebP (primary format)
  magick "$file" -quality 85 -define webp:lossless=false "public/images/prints/${filename}.webp"
  
  # Convert to JPEG (fallback)
  magick "$file" -quality 90 "public/images/prints/${filename}.jpg"
  
  # Generate thumbnail
  magick "$file" -resize 400x300^ -gravity center -crop 400x300+0+0 "public/images/prints/${filename}-thumb.webp"
done
```

**Next.js Image Component Implementation**:
```typescript
// components/ui/OptimizedImage.tsx
import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-200 animate-pulse rounded-lg" />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          'duration-700 ease-in-out',
          isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'
        )}
        onLoad={() => setIsLoading(false)}
        priority={priority}
        quality={85}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};
```

### Bundle Optimization

**Webpack Bundle Analysis**:
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Compression
  compress: true,
  
  // Bundle analyzer (development only)
  webpack: (config, { dev }) => {
    if (dev && process.env.ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          openAnalyzer: true,
        })
      );
    }
    return config;
  },
};

module.exports = nextConfig;
```

**Code Splitting Strategy**:
```typescript
// Dynamic imports for large components
const TravelMap = dynamic(() => import('@/components/interactive/TravelMap'), {
  loading: () => <MapSkeleton />,
  ssr: false, // Map requires client-side rendering
});

const PrintGallery = dynamic(() => import('@/components/interactive/PrintGallery'), {
  loading: () => <GallerySkeleton />,
});

// Lazy load heavy libraries
const CommentSystem = dynamic(
  () => import('@/components/interactive/CommentSystem'),
  { ssr: false }
);
```

---

## SEO Implementation

### Metadata Generation

```typescript
// app/layout.tsx - Root Layout SEO
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Sharon Zhang - Healthcare AI Engineer',
    template: '%s | Sharon Zhang'
  },
  description: 'Healthcare AI Engineer specializing in medical devices, chronic disease management, and AI-powered clinical solutions. Building the future of healthcare technology.',
  keywords: [
    'healthcare AI engineer',
    'medical device development',
    'chronic disease management',
    'AI healthcare solutions',
    'medical robotics',
    'healthcare software'
  ],
  authors: [{ name: 'Sharon Zhang' }],
  creator: 'Sharon Zhang',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sharonzhang.dev',
    title: 'Sharon Zhang - Healthcare AI Engineer',
    description: 'Building life-saving medical devices and AI-powered healthcare solutions',
    siteName: 'Sharon Zhang Portfolio',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sharon Zhang - Healthcare AI Engineer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sharon Zhang - Healthcare AI Engineer',
    description: 'Building life-saving medical devices and AI-powered healthcare solutions',
    images: ['/images/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};
```

### Structured Data Implementation

```typescript
// lib/seo.ts
export const generatePersonStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sharon Zhang',
    alternateName: 'Shuran Zhang',
    jobTitle: 'Healthcare AI Engineer',
    description: 'Full-stack software engineer specializing in medical AI, healthcare devices, and chronic disease management solutions',
    url: 'https://sharonzhang.dev',
    image: 'https://sharonzhang.dev/images/profile/sharon-professional.jpg',
    sameAs: [
      'https://www.linkedin.com/in/sharonzhang',
      'https://github.com/sharonzhang',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Carina AI',
      description: 'Medical AI Company'
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Johns Hopkins University',
      description: 'Medical Robotics Program'
    },
    knowsAbout: [
      'Healthcare AI',
      'Medical Device Development',
      'Chronic Disease Management',
      'Medical Robotics',
      'AI Software Engineering',
      'Clinical Decision Support'
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Healthcare AI Engineer',
      occupationLocation: {
        '@type': 'Place',
        name: 'Virginia, United States'
      },
      skills: [
        'Artificial Intelligence',
        'Healthcare Software',
        'Medical Devices',
        'Python',
        'React',
        'Machine Learning'
      ]
    }
  };
};

export const generateArticleStructuredData = (caseStudy: CaseStudy) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.title,
    description: caseStudy.metadata.description,
    image: `https://sharonzhang.dev${caseStudy.images.hero}`,
    datePublished: caseStudy.publishedAt,
    dateModified: caseStudy.updatedAt,
    author: {
      '@type': 'Person',
      name: 'Sharon Zhang',
      url: 'https://sharonzhang.dev'
    },
    publisher: {
      '@type': 'Person',
      name: 'Sharon Zhang',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sharonzhang.dev/images/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://sharonzhang.dev/portfolio/${caseStudy.slug}`
    }
  };
};
```

---

## Analytics & Tracking

### Google Analytics 4 Implementation

```typescript
// lib/analytics.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Custom events for portfolio tracking
export const trackPortfolioView = (projectSlug: string) => {
  event({
    action: 'view_portfolio_project',
    category: 'engagement',
    label: projectSlug,
  });
};

export const trackContactFormSubmission = () => {
  event({
    action: 'submit_contact_form',
    category: 'conversion',
  });
};

export const trackTravelMapInteraction = (state: string) => {
  event({
    action: 'interact_travel_map',
    category: 'engagement',
    label: state,
  });
};

export const trackPrintGalleryFilter = (filterType: string, filterValue: string) => {
  event({
    action: 'filter_3d_prints',
    category: 'engagement',
    label: `${filterType}:${filterValue}`,
  });
};
```

### Performance Monitoring

```typescript
// lib/monitoring.ts
export const reportWebVitals = ({ id, name, value, label }: any) => {
  // Send to analytics
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', name, {
      event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      event_label: id,
      non_interaction: true,
    });
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${label}] ${name}: ${value}`);
  }
};

// Usage in _app.tsx
export { reportWebVitals };
```

---

## Deployment & CI/CD

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Convert HEIC images
      run: |
        sudo apt-get update
        sudo apt-get install imagemagick
        chmod +x scripts/convert-images.sh
        ./scripts/convert-images.sh
        
    - name: Run tests
      run: npm test
      
    - name: Run lint
      run: npm run lint
      
    - name: Build application
      run: npm run build
      env:
        NEXT_PUBLIC_GA_ID: ${{ secrets.GA_TRACKING_ID }}
        
    - name: Run Lighthouse CI
      run: |
        npm install -g @lhci/cli@0.12.x
        lhci autorun
      env:
        LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

### Build Optimization

```json
// package.json scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "analyze": "ANALYZE=true npm run build",
    "lighthouse": "lhci autorun",
    "convert-images": "./scripts/convert-images.sh",
    "prebuild": "npm run convert-images && npm run type-check && npm run lint"
  }
}
```

---

## Development Workflow

### Getting Started

```bash
# Clone repository
git clone https://github.com/sharonzhang/portfolio.git
cd portfolio

# Install dependencies
npm install

# Convert HEIC images to web formats
./scripts/convert-images.sh

# Start development server
npm run dev
```

### Adding New Content

**Adding a New Case Study**:
1. Create MDX file in `/content/projects/new-project.mdx`
2. Add project images to `/public/images/projects/new-project/`
3. Update navigation if needed
4. Test responsive design and accessibility

**Adding New 3D Print**:
1. Add images to `/public/images/prints/`
2. Update `/data/3d-prints.json` with new entry
3. Test gallery filtering and responsive layout

**Content Update Checklist**:
- [ ] Images optimized (WebP + JPEG fallback)
- [ ] Alt text added for accessibility
- [ ] SEO metadata updated
- [ ] Mobile responsive design tested
- [ ] Lighthouse performance score >90
- [ ] Links and navigation working
- [ ] Analytics events configured

### Quality Assurance

**Pre-commit Checklist**:
- [ ] TypeScript compilation successful
- [ ] ESLint passing with no warnings
- [ ] Prettier formatting applied
- [ ] All tests passing
- [ ] Lighthouse audit >90 across all metrics
- [ ] Accessibility testing with screen reader
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS, Android)

**Performance Targets**:
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 3.5s
- **Total Blocking Time (TBT)**: < 200ms

This technical specification provides complete implementation guidance for building Sharon's professional, interactive, and memorable personal website that will effectively showcase her healthcare AI expertise to Big Tech recruiters.

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"content": "Switch to engineer role for technical implementation", "status": "completed", "activeForm": "Switching to engineer role for technical implementation"}, {"content": "Generate comprehensive technical specification document", "status": "completed", "activeForm": "Generating comprehensive technical specification document"}, {"content": "Create development setup instructions", "status": "completed", "activeForm": "Creating development setup instructions"}, {"content": "Build implementation roadmap", "status": "completed", "activeForm": "Building implementation roadmap"}]