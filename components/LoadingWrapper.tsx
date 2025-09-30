'use client'

import React, { memo } from 'react'
import { Loader2 } from 'lucide-react'

interface LoadingWrapperProps {
  isLoading: boolean
  children: React.ReactNode
  fallback?: React.ReactNode
}

const DefaultFallback = memo(() => (
  <div className="min-h-screen theme-background flex items-center justify-center">
    <div className="text-center space-y-4">
      <Loader2 className="w-8 h-8 theme-primary animate-spin mx-auto" />
      <p className="text-sm theme-text-secondary">Loading...</p>
    </div>
  </div>
))

DefaultFallback.displayName = 'DefaultFallback'

export const LoadingWrapper = memo(({ isLoading, children, fallback }: LoadingWrapperProps) => {
  if (isLoading) {
    return fallback || <DefaultFallback />
  }
  
  return <>{children}</>
})

LoadingWrapper.displayName = 'LoadingWrapper'
