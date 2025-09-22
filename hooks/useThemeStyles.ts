'use client'

import { useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'

export function useThemeStyles() {
  const { currentTheme, isLoaded } = useTheme()

  useEffect(() => {
    // Only apply theme styles after the context has loaded
    if (!isLoaded) return

    // Apply CSS custom properties for the current theme
    const root = document.documentElement
    
    root.style.setProperty('--theme-primary', currentTheme.colors.primary)
    root.style.setProperty('--theme-secondary', currentTheme.colors.secondary)
    root.style.setProperty('--theme-accent', currentTheme.colors.accent)
    root.style.setProperty('--theme-background', currentTheme.colors.background)
    root.style.setProperty('--theme-surface', currentTheme.colors.surface)
    root.style.setProperty('--theme-text', currentTheme.colors.text)
    root.style.setProperty('--theme-text-secondary', currentTheme.colors.textSecondary)
    root.style.setProperty('--theme-border', currentTheme.colors.border)
  }, [currentTheme, isLoaded])

  return currentTheme
}
