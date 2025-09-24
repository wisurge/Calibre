'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Search, Bell, User, Menu, X, LogOut, Settings, ChevronDown } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { Logo } from '@/components/atoms/Logo'
import { useThemeStyles } from '@/hooks/useThemeStyles'
import { ThemeSwitcher } from '@/components/molecules/ThemeSwitcher'
import { NotificationCenter } from '@/components/molecules/NotificationCenter'
import { useAuth } from '@/contexts/AuthContext'
import { useNotifications } from '@/contexts/NotificationContext'

export const Header = () => {
  const theme = useThemeStyles()
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, isLoading, signOut } = useAuth()
  const { addNotification } = useNotifications()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/journal', label: 'Journal' },
    { href: '/goals', label: 'Goals' },
    { href: '/customize', label: 'Customize' },
  ]

  const handleSignOut = async () => {
    try {
      await signOut()
      addNotification({
        type: 'success',
        title: 'Signed out',
        message: 'You have been successfully signed out.',
      })
      router.push('/login')
    } catch (error) {
      console.error('Sign out error:', error)
      addNotification({
        type: 'error',
        title: 'Sign out failed',
        message: 'Please try again.',
      })
    }
  }

  const getUserDisplayName = () => {
    if (!user) return 'User'
    return user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
  }

  const getUserInitials = () => {
    const name = getUserDisplayName()
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
  }

  // Don't show header on auth pages
  if (pathname.startsWith('/login') || pathname.startsWith('/signup') || 
      pathname.startsWith('/forgot-password') || pathname.startsWith('/reset-password')) {
    return null
  }

  return (
    <header className="theme-surface shadow-sm border-b border-theme-border sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 py-2 relative">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center">
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
            <NotificationCenter />
            
            {isLoading ? (
              <div className="w-7 h-7 bg-theme-accent rounded-full animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-1.5 theme-text-secondary hover:theme-text transition-colors"
                >
                  <div className="w-7 h-7 bg-theme-primary rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-white">
                      {getUserInitials()}
                    </span>
                  </div>
                  <ChevronDown className="w-3 h-3" />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border-2 border-theme-border rounded-2xl shadow-2xl backdrop-blur-sm z-50">
                    <div className="p-2">
                      <div className="px-3 py-2 border-b border-theme-border">
                        <p className="text-sm font-semibold theme-text">{getUserDisplayName()}</p>
                        <p className="text-xs theme-text-secondary">{user.email}</p>
                      </div>
                      
                      <div className="py-1">
                        <button className="flex items-center space-x-2 w-full px-3 py-2 text-sm theme-text-secondary hover:theme-text hover:bg-theme-accent rounded-lg transition-colors">
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </button>
                        
                        <button 
                          onClick={handleSignOut}
                          className="flex items-center space-x-2 w-full px-3 py-2 text-sm theme-text-secondary hover:theme-text hover:bg-theme-accent rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeSwitcher />
            <NotificationCenter />
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
                
                {isLoading ? (
                  <div className="py-2 px-3">
                    <div className="w-6 h-6 bg-theme-accent rounded-full animate-pulse" />
                  </div>
                ) : user ? (
                  <>
                    <div className="px-3 py-2">
                      <p className="text-sm font-semibold theme-text">{getUserDisplayName()}</p>
                      <p className="text-xs theme-text-secondary">{user.email}</p>
                    </div>
                    <button className="flex items-center space-x-2 py-2 px-3 rounded-lg text-sm theme-text-secondary hover:theme-text hover:bg-theme-accent transition-colors w-full">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                    <button 
                      onClick={handleSignOut}
                      className="flex items-center space-x-2 py-2 px-3 rounded-lg text-sm theme-text-secondary hover:theme-text hover:bg-theme-accent transition-colors w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="flex items-center space-x-2 py-2 px-3 rounded-lg text-sm theme-text-secondary hover:theme-text hover:bg-theme-accent transition-colors w-full">
                        <User className="w-4 h-4" />
                        <span>Sign in</span>
                      </button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="flex items-center space-x-2 py-2 px-3 rounded-lg text-sm theme-primary bg-theme-accent transition-colors w-full">
                        <span>Sign up</span>
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}