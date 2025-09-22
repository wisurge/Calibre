import React from 'react'
import { cn } from '@/lib/utils'

export interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'full' | 'icon' | 'text'
}

const Logo = ({ className, size = 'md', variant = 'full' }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  const icon = (
    <svg
      viewBox="0 0 32 32"
      className={cn(sizeClasses[size], className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gradient background */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" className="text-theme-primary" />
          <stop offset="100%" stopColor="currentColor" className="text-theme-accent" />
        </linearGradient>
      </defs>
      
      {/* Main circle representing a clock/routine */}
      <circle
        cx="16"
        cy="16"
        r="14"
        fill="url(#logoGradient)"
      />
      
      {/* Inner circle for depth */}
      <circle
        cx="16"
        cy="16"
        r="10"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        opacity="0.3"
      />
      
      {/* Clock hands representing time management */}
      <line
        x1="16"
        y1="16"
        x2="16"
        y2="8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="16"
        x2="20"
        y2="16"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Center dot */}
      <circle
        cx="16"
        cy="16"
        r="1.5"
        fill="white"
      />
      
      {/* Small dots representing routine points */}
      <circle
        cx="16"
        cy="6"
        r="1"
        fill="white"
        opacity="0.8"
      />
      <circle
        cx="22"
        cy="16"
        r="1"
        fill="white"
        opacity="0.8"
      />
      <circle
        cx="16"
        cy="26"
        r="1"
        fill="white"
        opacity="0.8"
      />
      <circle
        cx="10"
        cy="16"
        r="1"
        fill="white"
        opacity="0.8"
      />
      
      {/* Additional accent dots for visual interest */}
      <circle
        cx="20"
        cy="8"
        r="0.5"
        fill="white"
        opacity="0.6"
      />
      <circle
        cx="24"
        cy="12"
        r="0.5"
        fill="white"
        opacity="0.6"
      />
      <circle
        cx="8"
        cy="20"
        r="0.5"
        fill="white"
        opacity="0.6"
      />
      <circle
        cx="12"
        cy="24"
        r="0.5"
        fill="white"
        opacity="0.6"
      />
    </svg>
  )

  const text = (
    <span className={cn('text-vibed theme-text font-bold', textSizeClasses[size])}>
      Routinsie
    </span>
  )

  if (variant === 'icon') {
    return icon
  }

  if (variant === 'text') {
    return text
  }

  return (
    <div className="flex items-center space-x-2">
      {icon}
      {text}
    </div>
  )
}

export { Logo }
