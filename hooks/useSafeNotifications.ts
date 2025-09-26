'use client'

import { useContext } from 'react'
import { NotificationContext } from '@/contexts/NotificationContext'

export const useSafeNotifications = () => {
  const context = useContext(NotificationContext)
  
  if (context === undefined) {
    // Return empty/default values when context is not available
    return {
      notifications: [],
      addNotification: () => {},
      removeNotification: () => {},
      clearAllNotifications: () => {},
      markAsRead: () => {},
      unreadCount: 0
    }
  }
  
  return context
}



