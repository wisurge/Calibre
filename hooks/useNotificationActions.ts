import { useNotifications } from '@/contexts/NotificationContext'

export const useNotificationActions = () => {
  const { addNotification } = useNotifications()

  const showSuccess = (title: string, message?: string, action?: { label: string; onClick: () => void }) => {
    addNotification({
      type: 'success',
      title,
      message,
      action,
      duration: 5000,
    })
  }

  const showError = (title: string, message?: string, action?: { label: string; onClick: () => void }) => {
    addNotification({
      type: 'error',
      title,
      message,
      action,
      duration: 7000,
    })
  }

  const showWarning = (title: string, message?: string, action?: { label: string; onClick: () => void }) => {
    addNotification({
      type: 'warning',
      title,
      message,
      action,
      duration: 6000,
    })
  }

  const showInfo = (title: string, message?: string, action?: { label: string; onClick: () => void }) => {
    addNotification({
      type: 'info',
      title,
      message,
      action,
      duration: 5000,
    })
  }

  const showPersistent = (title: string, message?: string, action?: { label: string; onClick: () => void }) => {
    addNotification({
      type: 'info',
      title,
      message,
      action,
      duration: 0, // Never auto-remove
    })
  }

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showPersistent,
  }
}



