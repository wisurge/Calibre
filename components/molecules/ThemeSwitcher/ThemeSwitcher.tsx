'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { Palette } from 'lucide-react'
import { trackThemeChange } from '@/lib/analytics'

export const ThemeSwitcher = () => {
  const { currentTheme, setTheme, themes } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="theme-switcher-container group relative" ref={dropdownRef}>
      <button 
        className="p-1.5 theme-text-secondary hover:theme-text transition-colors hover:bg-theme-accent rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Palette className="w-4 h-4" />
      </button>
      
          {isOpen && (
            <div className="theme-switcher-dropdown w-56 sm:w-60 border-2 border-theme-border rounded-2xl shadow-2xl backdrop-blur-sm" style={{ backgroundColor: 'white' }}>
            <div className="p-3 sm:p-4" style={{ backgroundColor: 'white' }}>
              <div className="text-xs sm:text-sm font-bold theme-text mb-3 sm:mb-4 px-2 text-center">🎨 Choose Your Vibe</div>
              <div className="space-y-2">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setTheme(theme.id)
                      setIsOpen(false)
                      trackThemeChange(theme.name)
                    }}
                    className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-xs sm:text-sm transition-all duration-200 ${
                      currentTheme.id === theme.id
                        ? 'text-theme-primary shadow-lg border-2 border-theme-primary/30 transform scale-105'
                        : 'text-theme-text-secondary hover:text-theme-text hover:shadow-md hover:transform hover:scale-105'
                    }`}
                    style={{
                      backgroundColor: currentTheme.id === theme.id 
                        ? currentTheme.colors.secondary 
                        : 'white'
                    }}
                    onMouseEnter={(e) => {
                      if (currentTheme.id !== theme.id) {
                        e.currentTarget.style.backgroundColor = currentTheme.colors.accent
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentTheme.id !== theme.id) {
                        e.currentTarget.style.backgroundColor = 'white'
                      }
                    }}
                  >
                    <div 
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-theme-border shadow-md"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <span className="font-semibold">{theme.name}</span>
                    {currentTheme.id === theme.id && (
                      <div className="ml-auto w-2 h-2 sm:w-3 sm:h-3 bg-theme-primary rounded-full animate-pulse shadow-sm" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            </div>
          )}
    </div>
  )
}
