'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Bell, User } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { useThemeStyles } from '@/hooks/useThemeStyles'
import { ThemeSwitcher } from '@/components/molecules/ThemeSwitcher'

export const Header = () => {
  const theme = useThemeStyles() // Apply theme styles
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/journal', label: 'Journal' },
    { href: '/goals', label: 'Goals' },
    { href: '/customize', label: 'Customize' },
  ]

  return (
    <header className="theme-surface shadow-sm border-b border-theme-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 relative">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-theme-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">★</span>
            </div>
            <span className="text-xl text-vibed theme-text">Routinsie</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
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
          
          <div className="flex items-center space-x-3">
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
        </div>
      </div>
    </header>
  )
}
