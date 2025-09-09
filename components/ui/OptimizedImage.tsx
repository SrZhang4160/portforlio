'use client'

import { useState, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  className?: string
}

const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ 
    src, 
    alt, 
    width, 
    height, 
    priority = false, 
    quality = 85, 
    className,
    ...props 
  }, ref) => {
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)

    // Generate responsive srcSet
    const generateSrcSet = (baseSrc: string, format: 'webp' | 'jpg') => {
      if (!width) return ''
      
      const sizes = [1, 1.5, 2, 3] // Device pixel ratios
      return sizes
        .map(ratio => {
          const scaledWidth = Math.round((width || 400) * ratio)
          const extension = format === 'webp' ? 'webp' : 'jpg'
          const scaledSrc = baseSrc.replace(/\.[^.]+$/, `@${ratio}x.${extension}`)
          return `${scaledSrc} ${ratio}x`
        })
        .join(', ')
    }

    const aspectRatio = width && height ? `${width} / ${height}` : undefined

    return (
      <div 
        className={cn('relative overflow-hidden', className)}
        style={{ aspectRatio }}
      >
        {/* Blur placeholder */}
        {!loaded && !error && (
          <div 
            className="absolute inset-0 bg-neutral-200 animate-pulse"
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
        {!error && (
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
              ref={ref}
              src={src.replace(/\.[^.]+$/, '.jpg')}
              alt={alt}
              width={width}
              height={height}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
              className={cn(
                'transition-opacity duration-300 ease-in-out w-full h-full object-cover',
                loaded ? 'opacity-100' : 'opacity-0'
              )}
              {...props}
            />
          </picture>
        )}

        {/* Error placeholder */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 text-neutral-500">
            <div className="text-center">
              <div className="text-2xl mb-2">📷</div>
              <span className="text-sm">Image unavailable</span>
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {!loaded && !error && (
          <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center">
            <div className="w-3 h-3 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    )
  }
)

OptimizedImage.displayName = 'OptimizedImage'

export { OptimizedImage }