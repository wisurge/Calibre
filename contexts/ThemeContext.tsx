'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Theme, themes, defaultTheme } from '@/lib/theme'

interface ThemeContextType {
  currentTheme: Theme
  setTheme: (themeId: string) => void
  themes: Theme[]
  isLoaded: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    // Initialize with saved theme if available, otherwise use default
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('routinsie-theme')
      if (savedTheme) {
        const theme = themes.find(t => t.id === savedTheme)
        if (theme) {
          return theme
        }
      }
    }
    return defaultTheme
  })
  const [isLoaded, setLoaded] = useState(false)

  useEffect(() => {
    // Mark as loaded after hydration
    setLoaded(true)
  }, [])

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId)
    if (theme) {
      setCurrentTheme(theme)
      localStorage.setItem('routinsie-theme', themeId)
    }
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes, isLoaded }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
