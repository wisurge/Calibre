'use client'

import { useState, useEffect } from 'react'
import { MeetingData } from '@/types/calendar'

interface User {
  email: string
  name: string
}

interface UseLocalCalendarReturn {
  user: User | null
  meetings: MeetingData[]
  isLoading: boolean
  isCalendarConnected: boolean
  error: string | null
  refreshCalendarData: () => Promise<void>
  signInWithGoogle: () => void
  markAsPrepped: (meetingId: string) => void
  toggleChecklistItem: (meetingId: string, itemIndex: number) => void
}

export function useLocalCalendar(): UseLocalCalendarReturn {
  const [user, setUser] = useState<User | null>(null)
  const [meetings, setMeetings] = useState<MeetingData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isCalendarConnected, setIsCalendarConnected] = useState(false)

  // Check for calendar connection on mount and URL changes
  useEffect(() => {
    const checkConnection = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/calendar/sync')
        
        if (response.ok) {
          const data = await response.json()
          if (data.user && data.user.email !== 'Unknown') {
            setUser(data.user)
            setIsCalendarConnected(true)
            setMeetings(data.events || [])
            console.log('✅ Calendar connected:', data.user.email)
          } else {
            setIsCalendarConnected(false)
            setUser(null)
            setMeetings([])
          }
        } else {
          setIsCalendarConnected(false)
          setUser(null)
          setMeetings([])
        }
      } catch (err) {
        console.error('Error checking connection:', err)
        setIsCalendarConnected(false)
        setUser(null)
        setMeetings([])
      } finally {
        setIsLoading(false)
      }
    }

    checkConnection()

    // Check URL for connection status
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('connected') === 'true') {
      // Remove the query parameter and refresh connection
      window.history.replaceState({}, '', window.location.pathname)
      setTimeout(checkConnection, 1000) // Give server time to set cookies
    }
  }, [])

  const refreshCalendarData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('/api/calendar/sync')
      
      if (!response.ok) {
        if (response.headers.get('content-type')?.includes('text/html')) {
          throw new Error('Server returned HTML error page. Please check server logs.')
        }
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch calendar data')
      }
      
      const data = await response.json()
      setMeetings(data.events || [])
      setUser(data.user)
      console.log(`📅 Refreshed ${data.events?.length || 0} calendar events`)
      
    } catch (err: any) {
      console.error('Error refreshing calendar:', err)
      
      if (err.message.includes('ACCESS_TOKEN_EXPIRED')) {
        setError('Your Google Calendar access has expired. Please reconnect.')
        setIsCalendarConnected(false)
        setUser(null)
      } else if (err.message.includes('QUOTA_EXCEEDED')) {
        setError('Google Calendar API quota exceeded. Please try again later.')
      } else {
        setError(err.message || 'Failed to refresh calendar data')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithGoogle = () => {
    setIsLoading(true)
    setError(null)
    window.location.href = '/api/calendar/auth'
  }

  const markAsPrepped = (meetingId: string) => {
    setMeetings(prev => prev.map(meeting => 
      meeting.id === meetingId 
        ? { ...meeting, isPrepped: true }
        : meeting
    ))
  }

  const toggleChecklistItem = (meetingId: string, itemIndex: number) => {
    setMeetings(prev => prev.map(meeting => {
      if (meeting.id === meetingId) {
        const updatedChecklist = [...meeting.checklist]
        // For simplicity, we'll just mark items as completed
        return { ...meeting, checklist: updatedChecklist }
      }
      return meeting
    }))
  }

  return {
    user,
    meetings,
    isLoading,
    isCalendarConnected,
    error,
    refreshCalendarData,
    signInWithGoogle,
    markAsPrepped,
    toggleChecklistItem
  }
}


