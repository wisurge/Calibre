import { useState, useEffect } from 'react'
import { MeetingData } from '@/types/calendar'

interface CalendarSyncStatus {
  isConnected: boolean
  isSyncing: boolean
  lastSyncTime?: Date
  error?: string
  syncProgress?: number
}

export function useCalendarSync() {
  const [status, setStatus] = useState<CalendarSyncStatus>({
    isConnected: false,
    isSyncing: false
  })
  const [meetings, setMeetings] = useState<MeetingData[]>([])
  const [googleUserInfo, setGoogleUserInfo] = useState<any>(null)

  // Check if calendar is already connected on mount
  useEffect(() => {
    const tokens = localStorage.getItem('google_calendar_tokens')
    if (tokens) {
      setStatus(prev => ({ ...prev, isConnected: true }))
    }
  }, [])

  const connectCalendar = async () => {
    try {
      setStatus(prev => ({ ...prev, isSyncing: true, error: undefined }))
      
      const response = await fetch('/api/calendar/auth')
      const data = await response.json()
      
      if (data.authUrl) {
        // Open Google OAuth popup
        const popup = window.open(
          data.authUrl,
          'google-calendar-auth',
          'width=500,height=600,scrollbars=yes,resizable=yes'
        )

        // Listen for the response from the popup
        const pollTimer = setInterval(() => {
          try {
            if (popup?.closed) {
              clearInterval(pollTimer)
              setStatus(prev => ({ ...prev, isSyncing: false }))
              
              // Check if tokens were stored (auth completed)
              const tokens = localStorage.getItem('google_calendar_tokens')
              if (tokens) {
                setStatus(prev => ({ 
                  ...prev, 
                  isConnected: true,
                  lastSyncTime: new Date()
                }))
                // Auto-sync after connecting
                syncCalendar()
              }
            }
          } catch (error) {
            console.error('Error checking popup status:', error)
            clearInterval(pollTimer)
            setStatus(prev => ({ 
              ...prev, 
              isSyncing: false,
              error: 'Authentication failed'
            }))
          }
        }, 1000)
      } else {
        throw new Error('Failed to get authorization URL')
      }
    } catch (error) {
      console.error('Error connecting calendar:', error)
      setStatus(prev => ({ 
        ...prev, 
        isSyncing: false,
        error: 'Failed to connect calendar'
      }))
    }
  }

  const syncCalendar = async () => {
    try {
      setStatus(prev => ({ ...prev, isSyncing: true, error: undefined }))
      
      const response = await fetch('/api/calendar/sync')
      const data = await response.json()
      
      if (data.success) {
        setMeetings(data.meetings)
        setStatus(prev => ({ 
          ...prev, 
          isSyncing: false,
          lastSyncTime: new Date(),
          syncProgress: 100
        }))
      } else {
        throw new Error(data.error || 'Sync failed')
      }
    } catch (error) {
      console.error('Error syncing calendar:', error)
      setStatus(prev => ({ 
        ...prev, 
        isSyncing: false,
        error: error instanceof Error ? error.message : 'Sync failed'
      }))
    }
  }

  const disconnectCalendar = async () => {
    try {
      const response = await fetch('/api/calendar/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'disconnect' })
      })
      
      const data = await response.json()
      
      if (data.success) {
        localStorage.removeItem('google_calendar_tokens')
        setMeetings([])
        setStatus({
          isConnected: false,
          isSyncing: false
        })
        setGoogleUserInfo(null)
      }
    } catch (error) {
      console.error('Error disconnecting calendar:', error)
      setStatus(prev => ({ 
        ...prev, 
        error: 'Failed to disconnect calendar'
      }))
    }
  }

  const manualSyncCalendar = async () => {
    await syncCalendar()
  }

  return {
    status,
    meetings,
    googleUserInfo,
    connectCalendar,
    syncCalendar,
    disconnectCalendar,
    manualSyncCalendar,
    isConnected: status.isConnected,
    isSyncing: status.isSyncing
  }
}

// Hook to periodically sync calendar (every 5 minutes when connected)
export function useCalendarAutoSync(onDataUpdate?: (meetings: MeetingData[]) => void) {
  const { isConnected, syncCalendar } = useCalendarSync()
  
  useEffect(() => {
    if (!isConnected) return

    const sync = async () => {
      try {
        const response = await fetch('/api/calendar/sync')
        const data = await response.json()
        
        if (data.success && data.meetings) {
          onDataUpdate?.(data.meetings)
        }
      } catch (error) {
        console.error('Auto sync failed:', error)
      }
    }

    // Sync immediately when hook mounts
    sync()

    // Set up periodic sync every 5 minutes
    const interval = setInterval(sync, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [isConnected, onDataUpdate])
}


