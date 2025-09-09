# Enterprise Security & Performance Specification

## Strategic Security Importance

**Why Enterprise Security Matters**:
- Demonstrates technical competence expected at Big Tech companies
- Shows understanding of production-grade security practices
- Protects professional reputation and visitor data
- Enables enterprise-level trust from potential employers

**Security Success Criteria**:
- **SSL/TLS**: A+ rating on SSL Labs test
- **Headers**: Perfect score on SecurityHeaders.com
- **Vulnerabilities**: Zero critical or high-severity issues
- **Privacy**: GDPR/CCPA compliant data handling

---

## HTTPS & Certificate Management

### **SSL/TLS Configuration**

**Certificate Setup for GitHub Pages**:
```yaml
# .github/workflows/security-headers.yml
name: Security Headers and HTTPS Enforcement

on:
  push:
    branches: [ main ]

jobs:
  deploy-with-security:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Configure Security Headers
      run: |
        # Create _headers file for Netlify-style header configuration
        cat > public/_headers << EOF
        /*
          X-Frame-Options: DENY
          X-Content-Type-Options: nosniff
          X-XSS-Protection: 1; mode=block
          Referrer-Policy: strict-origin-when-cross-origin
          Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.google-analytics.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com
          Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
          Permissions-Policy: camera=(), microphone=(), geolocation=()
        EOF
        
    - name: Build with security
      run: npm run build
      
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

**Security Headers Implementation**:
```typescript
// next.config.js security configuration
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' https://www.google-analytics.com https://www.googletagmanager.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      font-src 'self' https://fonts.gstatic.com;
      img-src 'self' data: https:;
      connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com;
      media-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self' https://formspree.io;
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim()
  }
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  
  // Additional security configurations
  poweredByHeader: false,
  compress: true,
  
  // Image security
  images: {
    domains: [],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  }
};
```

---

## Input Validation & Sanitization

### **Contact Form Security**

**Server-Side Validation**:
```typescript
// lib/validation.ts
import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name contains invalid characters'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .max(254, 'Email address too long')
    .toLowerCase(),
    
  company: z.string()
    .max(100, 'Company name cannot exceed 100 characters')
    .optional()
    .transform(val => val ? DOMPurify.sanitize(val) : val),
    
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message cannot exceed 2000 characters')
    .transform(val => DOMPurify.sanitize(val))
});

export const validateContactForm = (data: unknown) => {
  try {
    return contactFormSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        errors: error.errors.map(e => ({ 
          field: e.path.join('.'), 
          message: e.message 
        }))
      };
    }
    return { success: false, errors: [{ field: 'general', message: 'Validation failed' }] };
  }
};

// Rate limiting for contact form
const rateLimit = new Map<string, { count: number; resetTime: number }>();

export const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5;

  const userLimit = rateLimit.get(ip);
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (userLimit.count >= maxRequests) {
    return false;
  }
  
  userLimit.count++;
  return true;
};
```

**CSRF Protection**:
```typescript
// lib/csrf.ts
import crypto from 'crypto';

const CSRF_SECRET = process.env.CSRF_SECRET || 'default-secret-change-in-production';

export const generateCSRFToken = (): string => {
  return crypto
    .createHmac('sha256', CSRF_SECRET)
    .update(Date.now().toString())
    .digest('hex');
};

export const validateCSRFToken = (token: string, maxAge: number = 3600000): boolean => {
  try {
    const [timestamp, hash] = token.split('-');
    const now = Date.now();
    
    if (now - parseInt(timestamp) > maxAge) {
      return false; // Token expired
    }
    
    const expectedHash = crypto
      .createHmac('sha256', CSRF_SECRET)
      .update(timestamp)
      .digest('hex');
      
    return crypto.timingSafeEqual(
      Buffer.from(hash, 'hex'),
      Buffer.from(expectedHash, 'hex')
    );
  } catch {
    return false;
  }
};
```

---

## Privacy & Data Protection

### **GDPR/CCPA Compliance**

**Privacy Policy Implementation**:
```typescript
// components/privacy/PrivacyManager.tsx
import { useState, useEffect } from 'react';

interface ConsentSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const PrivacyManager: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [consent, setConsent] = useState<ConsentSettings>({
    necessary: true,  // Always required
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem('privacy-consent');
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      setConsent(JSON.parse(savedConsent));
    }
  }, []);

  const handleConsentChange = (newConsent: ConsentSettings) => {
    setConsent(newConsent);
    localStorage.setItem('privacy-consent', JSON.stringify(newConsent));
    
    // Configure analytics based on consent
    if (newConsent.analytics) {
      // Initialize Google Analytics
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    } else {
      // Disable analytics
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
    
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="privacy-banner">
      <div className="banner-content">
        <h3>Privacy & Cookies</h3>
        <p>
          This website uses cookies to enhance your experience and analyze site usage. 
          Your privacy is important to us.
        </p>
        
        <div className="consent-options">
          <label className="consent-item">
            <input 
              type="checkbox" 
              checked={consent.necessary} 
              disabled 
            />
            <span>Necessary (Always Active)</span>
          </label>
          
          <label className="consent-item">
            <input 
              type="checkbox" 
              checked={consent.analytics}
              onChange={(e) => setConsent({...consent, analytics: e.target.checked})}
            />
            <span>Analytics (Google Analytics)</span>
          </label>
        </div>
        
        <div className="banner-actions">
          <button 
            onClick={() => handleConsentChange(consent)}
            className="btn-accept"
          >
            Save Preferences
          </button>
          
          <button 
            onClick={() => handleConsentChange({necessary: true, analytics: true, marketing: false})}
            className="btn-accept-all"
          >
            Accept All
          </button>
          
          <a href="/privacy-policy" className="privacy-link">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};
```

**Data Minimization**:
```typescript
// lib/analytics.ts - Privacy-first analytics
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Only track if user consented
  const consent = localStorage.getItem('privacy-consent');
  if (!consent || !JSON.parse(consent).analytics) {
    return;
  }

  // Remove PII before tracking
  const sanitizedProperties = properties ? {
    ...properties,
    // Remove any potentially identifying information
    email: undefined,
    name: undefined,
    ip: undefined
  } : {};

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, sanitizedProperties);
  }
};

// Custom privacy-respecting analytics
export const trackPageView = (path: string) => {
  trackEvent('page_view', {
    page_path: path,
    // No user identification
    timestamp: Date.now()
  });
};

export const trackPortfolioView = (projectSlug: string) => {
  trackEvent('portfolio_view', {
    project: projectSlug,
    // Track engagement without identifying user
    session_id: generateAnonymousSessionId()
  });
};

const generateAnonymousSessionId = (): string => {
  return btoa(Date.now().toString()).substring(0, 8);
};
```

---

## Performance Excellence

### **Core Web Vitals Optimization**

**Performance Monitoring**:
```typescript
// lib/performance.ts
export const measureWebVitals = (metric: any) => {
  const consent = localStorage.getItem('privacy-consent');
  if (!consent || !JSON.parse(consent).analytics) {
    return;
  }

  switch (metric.name) {
    case 'FCP':
    case 'LCP':
    case 'CLS':
    case 'FID':
    case 'TTFB':
      // Send to analytics only with consent
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          event_category: 'Web Vitals',
          event_label: metric.id,
          non_interaction: true,
        });
      }
      break;
  }
};

// Performance budget enforcement
export const performanceBudget = {
  'First Contentful Paint': 1800, // 1.8s
  'Largest Contentful Paint': 2500, // 2.5s
  'First Input Delay': 100, // 100ms
  'Cumulative Layout Shift': 0.1, // 0.1
  'Time to First Byte': 600 // 600ms
};

export const checkPerformanceBudget = () => {
  if ('performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    const metrics = {
      'Time to First Byte': navigation.responseStart - navigation.requestStart,
      'First Contentful Paint': paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0
    };
    
    // Log performance budget violations
    Object.entries(metrics).forEach(([name, value]) => {
      const budget = performanceBudget[name as keyof typeof performanceBudget];
      if (budget && value > budget) {
        console.warn(`Performance budget exceeded: ${name} took ${Math.round(value)}ms (budget: ${budget}ms)`);
      }
    });
  }
};
```

**Image Optimization Pipeline**:
```typescript
// lib/image-optimization.ts
interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  quality?: number;
}

export const OptimizedImage: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 85
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Generate srcSet for responsive images
  const generateSrcSet = (baseSrc: string, format: 'webp' | 'jpg') => {
    const sizes = [1, 1.5, 2, 3]; // Device pixel ratios
    return sizes
      .map(ratio => {
        const scaledWidth = Math.round(width * ratio);
        const extension = format === 'webp' ? 'webp' : 'jpg';
        const scaledSrc = baseSrc.replace(/\.[^.]+$/, `@${ratio}x.${extension}`);
        return `${scaledSrc} ${ratio}x`;
      })
      .join(', ');
  };

  return (
    <div className="optimized-image-container" style={{ aspectRatio: `${width} / ${height}` }}>
      {/* Blur placeholder */}
      {!loaded && (
        <div 
          className="image-placeholder"
          style={{
            backgroundImage: `url(${src.replace(/\.[^.]+$/, '-blur.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10px)',
            transform: 'scale(1.1)'
          }}
        />
      )}

      {/* Optimized image */}
      <picture>
        <source 
          srcSet={generateSrcSet(src, 'webp')} 
          type="image/webp" 
        />
        <source 
          srcSet={generateSrcSet(src, 'jpg')} 
          type="image/jpeg" 
        />
        <img
          src={src.replace(/\.[^.]+$/, '.jpg')}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`optimized-image ${loaded ? 'loaded' : ''} ${error ? 'error' : ''}`}
          style={{
            transition: 'opacity 0.3s ease',
            opacity: loaded ? 1 : 0
          }}
        />
      </picture>

      {error && (
        <div className="image-error-placeholder">
          <span>Image unavailable</span>
        </div>
      )}
    </div>
  );
};
```

### **Caching Strategy**

**Service Worker Implementation**:
```javascript
// public/sw.js - Advanced caching strategy
const CACHE_NAME = 'sharon-portfolio-v1.0.0';
const STATIC_CACHE_NAME = 'static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'dynamic-v1.0.0';

// Cache different types of assets with different strategies
const CACHE_STRATEGIES = {
  // Critical assets - Cache First
  static: [
    '/',
    '/about',
    '/portfolio',
    '/contact',
    '/_next/static/css/',
    '/_next/static/js/'
  ],
  
  // Images - Cache First with fallback
  images: [
    '/images/',
    '/icons/',
    '/favicon/'
  ],
  
  // API calls - Network First
  api: [
    '/api/'
  ]
};

// Install event - cache critical resources
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME).then(cache => {
        return cache.addAll([
          '/',
          '/about',
          '/portfolio',
          '/contact',
          '/offline.html'
        ]);
      }),
      self.skipWaiting()
    ])
  );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      // Clean old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => 
              cacheName.startsWith('sharon-portfolio-') && 
              cacheName !== CACHE_NAME
            )
            .map(cacheName => caches.delete(cacheName))
        );
      }),
      self.clients.claim()
    ])
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Static assets - Cache First
  if (CACHE_STRATEGIES.static.some(path => url.pathname.startsWith(path))) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Images - Cache First with network fallback
  if (CACHE_STRATEGIES.images.some(path => url.pathname.startsWith(path))) {
    event.respondWith(cacheFirstWithRefresh(request));
    return;
  }

  // API calls - Network First
  if (CACHE_STRATEGIES.api.some(path => url.pathname.startsWith(path))) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Default - Network First with cache fallback
  event.respondWith(networkFirst(request));
});

// Caching strategies
async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return cache.match('/offline.html');
    }
    throw error;
  }
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cached = await cache.match(request);
    
    if (cached) {
      return cached;
    }
    
    throw error;
  }
}
```

This enterprise-grade security and performance implementation demonstrates the technical standards expected at Big Tech companies while protecting user privacy and ensuring optimal performance across all devices.