'use client'

import React from 'react'
import { Toast } from './Toast'
import { useSafeNotifications } from '@/hooks/useSafeNotifications'

export const ToastContainer = () => {
  const { notifications, removeNotification } = useSafeNotifications()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  )
}
