'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, Target, Settings, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'
import { useThemeStyles } from '@/hooks/useThemeStyles'
import { useSidebar } from '@/contexts/SidebarContext'

export const Sidebar = () => {
  const theme = useThemeStyles() // Apply theme styles
  const { isCollapsed, toggleSidebar } = useSidebar()
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/journal', label: 'Journal', icon: BookOpen },
    { href: '/goals', label: 'Goals', icon: Target },
    { href: '/customize', label: 'Customize', icon: Settings },
  ]

  return (
    <aside className={`hidden lg:flex ${isCollapsed ? 'w-16' : 'w-60'} bg-theme-accent min-h-screen border-r border-theme-border transition-all duration-300 ease-in-out flex-col`}>
      <div className="p-4 flex-1">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center ${isCollapsed ? 'justify-center px-2' : 'space-x-3 px-3'} py-2.5 rounded-lg transition-colors group ${
                  isActive
                    ? 'bg-theme-secondary text-theme-primary text-fun'
                    : 'theme-text-secondary hover:bg-theme-surface hover:theme-text text-playful'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="text-sm whitespace-nowrap">{item.label}</span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
      
      {/* Toggle Button at Bottom */}
      <div className="p-4 border-t border-theme-border">
        <button
          onClick={toggleSidebar}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'space-x-3 px-3'} py-3 rounded-xl transition-all duration-200 bg-theme-primary text-white hover:bg-theme-primary/90 group`}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
