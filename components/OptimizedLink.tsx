'use client'

import React, { memo } from 'react'
import Link from 'next/link'
import { useRouteTransition } from './RouteTransition'

interface OptimizedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  title?: string
  onClick?: () => void
}

export const OptimizedLink = memo(({ 
  href, 
  children, 
  className, 
  title,
  onClick 
}: OptimizedLinkProps) => {
  const { setTransitioning } = useRouteTransition()

  const handleClick = () => {
    // Call custom onClick if provided
    if (onClick) {
      onClick()
    }
    
    // Only show loading overlay for routes that might be slow
    // Skip loading for very fast routes to prevent blinking
    const slowRoutes = ['/dashboard', '/journal', '/goals'] // Routes with heavy data loading
    
    if (slowRoutes.includes(href)) {
      // Add a small delay to prevent blinking on very fast transitions
      setTimeout(() => {
        setTransitioning(true)
      }, 100)
    }
  }

  return (
    <Link
      href={href}
      className={className}
      title={title}
      onClick={handleClick}
    >
      {children}
    </Link>
  )
})

OptimizedLink.displayName = 'OptimizedLink'
