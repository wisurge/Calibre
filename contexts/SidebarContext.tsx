'use client'

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'

interface SidebarContextType {
  isCollapsed: boolean
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    // Load sidebar state from localStorage on mount
    let savedState = localStorage.getItem('calibre-sidebar-collapsed')
    
    // Migrate from old routinsie key if needed
    if (!savedState) {
      const oldState = localStorage.getItem('routinsie-sidebar-collapsed')
      if (oldState !== null) {
        localStorage.setItem('calibre-sidebar-collapsed', oldState)
        localStorage.removeItem('routinsie-sidebar-collapsed')
        savedState = oldState
      }
    }
    
    if (savedState !== null) {
      setIsCollapsed(JSON.parse(savedState))
    }
  }, [])

  const toggleSidebar = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem('calibre-sidebar-collapsed', JSON.stringify(newState))
  }

  const setSidebarCollapsed = (collapsed: boolean) => {
    setIsCollapsed(collapsed)
    localStorage.setItem('calibre-sidebar-collapsed', JSON.stringify(collapsed))
  }

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ 
    isCollapsed, 
    toggleSidebar, 
    setSidebarCollapsed
  }), [isCollapsed])

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
