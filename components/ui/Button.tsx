'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  healthcare?: boolean // Special healthcare styling
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, healthcare = false, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles - healthcare accessibility compliant
          'inline-flex items-center justify-center font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
          // Healthcare variants
          healthcare ? {
            'btn-primary': variant === 'primary',
            'btn-secondary': variant === 'secondary',
            'btn-icon': variant === 'icon',
            'hover:bg-gray-100 focus-visible:outline-gray-600': variant === 'ghost',
          } : {
            // Standard variants
            'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-blue-600': variant === 'primary',
            'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:outline-gray-600': variant === 'secondary',
            'border-2 border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:outline-gray-600': variant === 'outline',
            'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus-visible:outline-gray-600': variant === 'ghost',
          },
          // Sizes with healthcare touch targets
          variant === 'icon' ? {
            'w-8 h-8': size === 'sm',
            'w-10 h-10': size === 'md',
            'w-12 h-12': size === 'lg',
          } : {
            'h-9 px-3 text-sm rounded-md': size === 'sm',
            'h-11 px-6 text-base rounded-lg': size === 'md',
            'h-14 px-8 text-lg rounded-xl': size === 'lg',
          },
          // Healthcare accessibility
          healthcare && 'touch-target',
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
        {loading && <span className="sr-only">Loading</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }