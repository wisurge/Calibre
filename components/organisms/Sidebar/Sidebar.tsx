'use client'

import React, { useState, memo, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, Target, Settings, Calendar, ChevronLeft, ChevronRight, Menu, X, Cloud, CloudOff, RefreshCw, Plus, ChevronDown, ChevronUp } from 'lucide-react'
import { useThemeStyles } from '@/hooks/useThemeStyles'
import { useSidebar } from '@/contexts/SidebarContext'
import { useMultiCalendars } from '@/hooks/useMultiCalendars'
import { CalendarProviderType } from '@/types/calendarProviders'
import { OptimizedLink } from '@/components/OptimizedLink'

// Memoized navigation items to prevent re-creation
const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/calendar', label: 'Calendar', icon: Calendar },
  { href: '/journal', label: 'Journal', icon: BookOpen },
  { href: '/goals', label: 'Goals', icon: Target },
  { href: '/customize', label: 'Customize', icon: Settings },
]

// Memoized navigation item component
const NavigationItem = memo(({ item, isActive, isCollapsed }: { 
  item: typeof navItems[0], 
  isActive: boolean, 
  isCollapsed: boolean 
}) => {
  const Icon = item.icon
  
  return (
    <OptimizedLink
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
    </OptimizedLink>
  )
})

NavigationItem.displayName = 'NavigationItem'

export const Sidebar = memo(() => {
  const theme = useThemeStyles() // Apply theme styles
  const { isCollapsed, toggleSidebar } = useSidebar()
  const pathname = usePathname()
  const [showCalendarMenu, setShowCalendarMenu] = useState(false)
  
  // Multi-calendar integration state - only load on calendar page
  const shouldLoadCalendar = pathname === '/calendar' || showCalendarMenu
  const { 
    providers,
    accounts,
    isLoading: calendarLoading,
    refreshCalendars,
    connectProvider,
    disconnectProvider,
    connectedCount
  } = useMultiCalendars()

  return (
    <aside className={`hidden lg:flex ${isCollapsed ? 'w-16' : 'w-60'} bg-theme-accent min-h-screen border-r border-theme-border transition-all duration-300 ease-in-out flex-col`}>
      <div className="p-4 flex-1">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavigationItem
              key={item.href}
              item={item}
              isActive={pathname === item.href}
              isCollapsed={isCollapsed}
            />
          ))}
          
          {/* Calendar Integration Hub */}
          <div className="mt-4 pt-2 border-t border-theme-border">
            {isCollapsed ? (
              /* Collapsed: Show single calendar icon with badge */
              <div className="relative">
                <button
                  onClick={() => setShowCalendarMenu(!showCalendarMenu)}
                  className="flex items-center justify-center w-full px-2 py-2.5 rounded-lg transition-colors group theme-text-secondary hover:bg-theme-surface hover:theme-text text-playful"
                  title="Calendar Connections"
                >
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  {connectedCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {connectedCount}
                    </span>
                  )}
                </button>
              </div>
            ) : (
              /* Expanded: Show collapsible calendar hub */
              <>
                <button
                  onClick={() => setShowCalendarMenu(!showCalendarMenu)}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-colors group ${
                    showCalendarMenu 
                      ? 'theme-text-secondary bg-theme-surface text-playful' 
                      : 'theme-text-secondary hover:bg-theme-surface hover:theme-text text-playful'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm whitespace-nowrap">Calendar Hub</span>
                    {connectedCount > 0 && (
                      <span className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5">
                        {connectedCount} connected
                      </span>
                    )}
                  </div>
                  {showCalendarMenu ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {/* Calendar Provider Menu */}
                {showCalendarMenu && (
                  <div className="mt-2 ml-6 space-y-1">
                    {/* Connected Accounts Summary */}
                    {accounts.length > 0 && (
                      <div className="mb-3 space-y-1">
                        {accounts.map((account) => {
                          const provider = providers.find(p => p.id === account.providerId)
                          return (
                            <div key={`${account.providerId}-${account.accountId}`} 
                                 className="flex items-center justify-between px-3 py-2 text-xs rounded-lg bg-green-50 dark:bg-green-900/20">
                              <div className="flex items-center space-x-2">
                                <span style={{ color: provider?.color }}>{provider?.icon}</span>
                                <span style={{ color: theme.colors.text }}>
                                  {account.email}
                                </span>
                              </div>
                              <button
                                onClick={() => disconnectProvider(account.providerId as CalendarProviderType)}
                                disabled={calendarLoading}
                                className="text-red-500 hover:text-red-700 text-xs"
                                title="Disconnect"
                              >
                                ×
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Available Providers */}
                    <div className="space-y-1">
                      <div className="text-xs font-medium px-3 py-1" style={{ color: theme.colors.textSecondary }}>
                        Connect Calendar:
                      </div>
                      {providers.map((provider) => (
                        <button
                          key={provider.id}
                          onClick={() => connectProvider(provider.id as CalendarProviderType)}
                          disabled={calendarLoading || provider.connected}
                          className={`flex items-center justify-between w-full px-3 py-2 text-xs rounded-lg transition-all duration-200 ${
                            provider.connected 
                              ? 'opacity-50 cursor-not-allowed' 
                              : 'hover:bg-theme-accent hover:theme-text hover:shadow-sm'
                          }`}
                          style={{
                            border: `1px solid ${provider.connected ? theme.colors.border : provider.color}20`
                          }}
                        >
                          <div className="flex items-center space-x-2">
                            <span style={{ fontSize: '14px' }}>{provider.icon}</span>
                            <span style={{ color: theme.colors.text }}>
                              {provider.name}
                            </span>
                          </div>
                          {provider.connected ? (
                            <span className="text-green-500 text-xs">✓</span>
                          ) : (
                            <Plus className="w-3 h-3" style={{ color: provider.color }} />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Refresh Button */}
                    {accounts.length > 0 && (
                      <button
                        onClick={refreshCalendars}
                        disabled={calendarLoading}
                        className="flex items-center space-x-2 w-full px-3 py-2 mt-2 text-xs rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <RefreshCw className={`w-3 h-3 ${calendarLoading ? 'animate-spin' : ''}`} />
                        <span style={{ color: theme.colors.textSecondary }}>
                          {calendarLoading ? 'Syncing...' : 'Sync All'}
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
            
            {/* Collapsed Calendar Provider Menu */}
            {isCollapsed && showCalendarMenu && (
              <div className="absolute left-16 top-0 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 w-64">
                <div className="space-y-1">
                  <div className="text-xs font-medium px-2 py-1 text-gray-500 dark:text-gray-400">
                    Calendar Providers
                  </div>
                  {providers.map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => {
                        connectProvider(provider.id as CalendarProviderType)
                        setShowCalendarMenu(false)
                      }}
                      disabled={provider.connected}
                      className={`flex items-center justify-between w-full px-2 py-2 text-xs rounded transition-all duration-200 ${
                        provider.connected 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:bg-theme-accent hover:theme-text hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span style={{ fontSize: '12px' }}>{provider.icon}</span>
                        <span className="text-gray-700 dark:text-gray-300">{provider.name}</span>
                      </div>
                      {provider.connected ? (
                        <span className="text-green-500">✓</span>
                      ) : (
                        <Plus className="w-3 h-3 text-blue-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
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
})

Sidebar.displayName = 'Sidebar'
