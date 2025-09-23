'use client'

import React from 'react'
import Link from 'next/link'
import { Twitter, Instagram, Youtube, Heart, Coffee } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { Logo } from '@/components/atoms/Logo'

export const Footer = () => {
  // Safely get theme context
  const { currentTheme } = useTheme()
  
  // Apply theme styles directly
  React.useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--theme-primary', currentTheme.colors.primary)
    root.style.setProperty('--theme-secondary', currentTheme.colors.secondary)
    root.style.setProperty('--theme-accent', currentTheme.colors.accent)
    root.style.setProperty('--theme-background', currentTheme.colors.background)
    root.style.setProperty('--theme-surface', currentTheme.colors.surface)
    root.style.setProperty('--theme-text', currentTheme.colors.text)
    root.style.setProperty('--theme-text-secondary', currentTheme.colors.textSecondary)
    root.style.setProperty('--theme-border', currentTheme.colors.border)
  }, [currentTheme])
  
  return (
    <footer className="theme-background border-t border-theme-border py-8 sm:py-12 mt-8 sm:mt-16">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 sm:space-y-8 lg:space-y-0">
          {/* Rachel's Personal Message */}
          <div className="flex-1 max-w-md">
            <div className="flex items-center space-x-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-theme-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">R</span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg lg:text-h4 theme-text">Hey there! I'm Rachel ✨</h3>
                <p className="text-xs sm:text-sm theme-text-secondary">Founder & Chief Dreamer</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm theme-text-secondary leading-relaxed mb-3 sm:mb-4">
              I built Routinsie because I believe your daily routine shouldn't be boring. 
              Every morning should feel like a fresh start, and every habit should spark joy. 
              Here's to making productivity actually fun! 💫
            </p>
            <div className="flex items-center space-x-2 text-xs sm:text-sm theme-text-secondary">
              <span>Made with</span>
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
              <span>&</span>
              <Coffee className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
              <span>by Rachel</span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <h4 className="font-semibold theme-text text-xs sm:text-sm uppercase tracking-wide">Quick Links</h4>
            <div className="flex flex-col space-y-1 sm:space-y-2">
              <Link href="/about" className="text-xs sm:text-sm theme-text-secondary hover:theme-text transition-colors">
                About Routinsie
              </Link>
              <Link href="/contact" className="text-xs sm:text-sm theme-text-secondary hover:theme-text transition-colors">
                Get in Touch
              </Link>
              <Link href="/support" className="text-xs sm:text-sm theme-text-secondary hover:theme-text transition-colors">
                Help & Support
              </Link>
              <Link href="/privacy" className="text-xs sm:text-sm theme-text-secondary hover:theme-text transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
          
          {/* Social & Connect */}
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <h4 className="font-semibold theme-text text-xs sm:text-sm uppercase tracking-wide">Let's Connect</h4>
            <div className="flex space-x-3 sm:space-x-4">
              <a 
                href="https://twitter.com/rachel_routinsie" 
                className="theme-text-secondary hover:theme-text transition-colors"
                aria-label="Follow Rachel on Twitter"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="https://instagram.com/rachel_routinsie" 
                className="theme-text-secondary hover:theme-text transition-colors"
                aria-label="Follow Rachel on Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a 
                href="https://youtube.com/@rachel_routinsie" 
                className="theme-text-secondary hover:theme-text transition-colors"
                aria-label="Subscribe to Rachel's YouTube"
              >
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
            <p className="text-xs theme-text-secondary">
              Drop me a line anytime! I love hearing from fellow productivity enthusiasts 🚀
            </p>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-theme-border mt-6 sm:mt-8 pt-4 sm:pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-xs theme-text-secondary text-center md:text-left">
              © 2025 Routinsie. All rights reserved. Built with love by Rachel.
            </p>
            <p className="text-xs theme-text-secondary text-center md:text-right">
              Making productivity fun, one routine at a time ✨
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
