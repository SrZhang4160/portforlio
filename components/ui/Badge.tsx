'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'accent-purple' | 'accent-pink' | 'accent-teal'
  size?: 'sm' | 'md' | 'lg'
  icon?: string
  children: React.ReactNode
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', icon, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          'inline-flex items-center font-medium rounded-full transition-colors',
          {
            'bg-neutral-100 text-neutral-800 border border-neutral-200': variant === 'default',
            'bg-primary-100 text-primary-800 border border-primary-200': variant === 'primary',
            'bg-secondary-100 text-secondary-800 border border-secondary-200': variant === 'secondary',
            'bg-success-100 text-success-800 border border-success-200': variant === 'success',
            'bg-purple-100 text-purple-800 border border-purple-200': variant === 'accent-purple',
            'bg-pink-100 text-pink-800 border border-pink-200': variant === 'accent-pink',
            'bg-teal-100 text-teal-800 border border-teal-200': variant === 'accent-teal',
          },
          {
            'px-2 py-1 text-xs': size === 'sm',
            'px-3 py-1.5 text-sm': size === 'md',
            'px-4 py-2 text-base': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      >
        {icon && <span className="mr-1.5">{icon}</span>}
        {children}
      </div>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }