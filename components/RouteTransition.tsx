'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface RouteTransitionContextType {
  isTransitioning: boolean
  setTransitioning: (transitioning: boolean) => void
}

const RouteTransitionContext = createContext<RouteTransitionContextType | undefined>(undefined)

export function RouteTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const pathname = usePathname()

  // Reset transitioning state when route changes
  useEffect(() => {
    // Add a small delay before hiding to prevent blinking
    const timer = setTimeout(() => {
      setIsTransitioning(false)
      setShowOverlay(false)
    }, 100) // Minimum 100ms display time

    return () => clearTimeout(timer)
  }, [pathname])

  const setTransitioning = (transitioning: boolean) => {
    if (transitioning) {
      setIsTransitioning(true)
      setShowOverlay(true)
    } else {
      // Don't immediately hide, let the useEffect handle it
      setIsTransitioning(false)
    }
  }

  return (
    <RouteTransitionContext.Provider value={{ isTransitioning: showOverlay, setTransitioning }}>
      {children}
    </RouteTransitionContext.Provider>
  )
}

export function useRouteTransition() {
  const context = useContext(RouteTransitionContext)
  if (context === undefined) {
    throw new Error('useRouteTransition must be used within a RouteTransitionProvider')
  }
  return context
}

// Content area loading indicator - subtle progress bar
export function RouteTransitionIndicator() {
  const { isTransitioning } = useRouteTransition()

  if (!isTransitioning) return null

  return (
    <div className="absolute top-0 left-0 right-0 z-40">
      {/* Subtle progress bar */}
      <div className="h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-emerald-500 animate-pulse">
        <div className="h-full bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-pulse"></div>
      </div>
      
      {/* Optional: Small loading indicator in corner */}
      <div className="absolute top-2 right-4 flex items-center space-x-1 bg-white/90 dark:bg-gray-800/90 rounded-full px-3 py-1 shadow-sm border border-gray-200/50">
        <Loader2 className="w-3 h-3 text-emerald-600 animate-spin" />
        <span className="text-xs text-gray-500 font-medium">Loading</span>
      </div>
    </div>
  )
}
