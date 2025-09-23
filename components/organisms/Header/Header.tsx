'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Bell, User, Menu, X } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { Logo } from '@/components/atoms/Logo'
import { useThemeStyles } from '@/hooks/useThemeStyles'
import { ThemeSwitcher } from '@/components/molecules/ThemeSwitcher'

export const Header = () => {
  const theme = useThemeStyles() // Apply theme styles
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/journal', label: 'Journal' },
    { href: '/goals', label: 'Goals' },
    { href: '/customize', label: 'Customize' },
  ]

  return (
    <header className="theme-surface shadow-sm border-b border-theme-border sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 py-2 relative">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo size="md" variant="full" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm text-fun transition-colors ${
                  pathname === item.href
                    ? 'theme-primary border-b-2 border-theme-primary pb-1'
                    : 'theme-text-secondary hover:theme-text'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            <button className="p-1.5 theme-text-secondary hover:theme-text transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <ThemeSwitcher />
            <button className="p-1.5 theme-text-secondary hover:theme-text transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-1.5 theme-text-secondary hover:theme-text transition-colors">
              <div className="w-7 h-7 bg-theme-primary rounded-full flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeSwitcher />
            <button className="p-1.5 theme-text-secondary hover:theme-text transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 theme-text-secondary hover:theme-text transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 theme-surface border-b border-theme-border shadow-lg">
            <nav className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-2 px-3 rounded-lg text-sm transition-colors ${
                    pathname === item.href
                      ? 'theme-primary bg-theme-accent'
                      : 'theme-text-secondary hover:theme-text hover:bg-theme-accent'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-theme-border">
                <button className="flex items-center space-x-2 py-2 px-3 rounded-lg text-sm theme-text-secondary hover:theme-text hover:bg-theme-accent transition-colors w-full">
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
                <button className="flex items-center space-x-2 py-2 px-3 rounded-lg text-sm theme-text-secondary hover:theme-text hover:bg-theme-accent transition-colors w-full">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
