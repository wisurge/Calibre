'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Bell, X, CheckCircle, AlertCircle, AlertTriangle, Info, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSafeNotifications } from '@/hooks/useSafeNotifications'

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
} as const

const colorMap = {
  success: 'text-green-600',
  error: 'text-red-600',
  warning: 'text-yellow-600',
  info: 'text-blue-600',
} as const

export const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { notifications, removeNotification, clearAllNotifications, markAsRead, unreadCount } =
    useSafeNotifications()

  // close on outside click
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

  const handleNotificationClick = (notificationId: string) => {
    markAsRead(notificationId)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-1.5 theme-text-secondary hover:theme-text transition-colors relative"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border-2 border-theme-border rounded-2xl shadow-2xl backdrop-blur-sm z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold theme-text">Notifications</h3>
              <div className="flex items-center space-x-2">
                {notifications.length > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="p-1 hover:bg-theme-accent rounded-md transition-colors"
                    title="Clear all"
                  >
                    <Trash2 className="w-4 h-4 theme-text-secondary" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-theme-accent rounded-md transition-colors"
                >
                  <X className="w-4 h-4 theme-text-secondary" />
                </button>
              </div>
            </div>

            {notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="w-8 h-8 theme-text-secondary mx-auto mb-2" />
                <p className="text-sm theme-text-secondary">No notifications yet</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {notifications.map((notification) => {
                  const Icon = iconMap[notification.type as keyof typeof iconMap] ?? Info
                  const createdAt = new Date(notification.createdAt)

                  return (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification.id)}
                      className={cn(
                        'flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-theme-accent',
                        !notification.read && 'bg-theme-secondary/50'
                      )}
                    >
                      <Icon
                        className={cn(
                          'w-4 h-4 flex-shrink-0 mt-0.5',
                          colorMap[notification.type as keyof typeof colorMap] ?? 'text-blue-600'
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold theme-text">{notification.title}</h4>
                        {notification.message && (
                          <p className="text-xs theme-text-secondary mt-1">
                            {notification.message}
                          </p>
                        )}
                        {notification.createdAt && (
                          <p className="text-xs theme-text-secondary mt-1">
                            {createdAt.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          removeNotification(notification.id)
                        }}
                        className="flex-shrink-0 p-1 hover:bg-theme-surface rounded-full transition-colors"
                      >
                        <X className="w-3 h-3 theme-text-secondary" />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
