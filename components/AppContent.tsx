'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { usePathname } from 'next/navigation'
import { Footer } from '@/components/organisms/Footer'
import { RouteTransitionIndicator } from '@/components/RouteTransition'

interface AppContentProps {
  children: React.ReactNode
}

export function AppContent({ children }: AppContentProps) {
  const { isLoading } = useAuth()
  const pathname = usePathname()
  
  // Don't show footer on auth pages, landing page, or during initial loading
  const shouldShowFooter = !isLoading && 
    !pathname?.startsWith('/login') && 
    !pathname?.startsWith('/signup') && 
    !pathname?.startsWith('/auth') &&
    pathname !== '/' &&
    pathname !== '/landing'

  // Don't show loading indicator on auth pages or initial loading
  const shouldShowLoadingIndicator = !isLoading && 
    !pathname?.startsWith('/login') && 
    !pathname?.startsWith('/signup') && 
    !pathname?.startsWith('/auth') &&
    pathname !== '/'

  return (
    <>
      {shouldShowLoadingIndicator && <RouteTransitionIndicator />}
      {children}
      {shouldShowFooter && <Footer />}
    </>
  )
}
