import { useState, useEffect } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'

export interface MeetingData {
  id: string
  time: string
  type: string
  title: string
  participants: Array<{
    name: string
    role: string
    company: string
  }>
  company: string
  companyDescription: string
  fundingStage?: string
  checklist: string[]
  isPrepped: boolean
  contributesToGoal?: boolean
  agenda?: string[]
  keyTopics?: string[]
  myQuestions?: string[]
  companyNews?: string[]
  linkedinInsights?: string[]
  competitorInfo?: string
  roleExpectations?: string
  technicalFocus?: string[]
  preparationTime?: string
  successCriteria?: string[]
  followUpActions?: string[]
}

interface UseGoogleCalendarReturn {
  user: User | null
  session: Session | null
  meetings: MeetingData[]
  isLoading: boolean
  isCalendarConnected: boolean
  error: string | null
  
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
  fetchCalendarEvents: () => Promise<void>
  refreshCalendarData: () => Promise<void>


  markAsPrepped: (meetingId: string) => void
  toggleChecklistItem: (meetingId: string, itemIndex: number) => void
}

export function useGoogleCalendar(): UseGoogleCalendarReturn {
  const { user: authUser } = useAuth()
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [meetings, setMeetings] = useState<MeetingData[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isCalendarConnected, setIsCalendarConnected] = useState(false)

  const [selectedChecklists, setSelectedChecklists] = useState<Set<string>>(new Set())

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth initialization error:', error)
          setError(error.message)
          return
        }

        setSession(session)
        setUser(session?.user || null)

        // Only fetch calories if user has Google provider token
        if (session?.provider_token) {
          console.log('🔄 Initial session has provider token, fetching calendar...')
          await fetchCalendarEvents()
        }

      } catch (err: any) {
        console.error('Auth init error:', err)
        setError(err.message)
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', event, session?.provider_token ? 'has provider token' : 'no provider token')
        
        setSession(session)
        setUser(session?.user || null)
        setError(null)

        if (event === 'SIGNED_IN' && session?.provider_token) {
          console.log('✅ Google Calendar token available, fetching calendar...')
          await fetchCalendarEvents()
        } else if (event === 'SIGNED_OUT') {
          setMeetings([])
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true)
      setError(null)

    // Redirect to our API route which handles OAuth
    window.location.href = '/api/calendar/auth'
      
    } catch (err: any) {
      console.error('❌ Sign in error:', err)
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      console.log('👋 User signed out')
    } catch (err: any) {
      console.error('❌ Sign out error:', err)
      setError(err.message)
    }
  }

  const fetchCalendarEvents = async () => {
    if (!user) {
      console.warn('⚠️ No user session for calendar fetch')
      setError('Please sign in to sync calendar')
      return 
    }

    try {
      setIsLoading(true)
      setError(null)

      console.log('🔄 Fetching calendar events from:', '/api/calendar/sync')
      const response = await fetch('/api/calendar/sync')
      
      // Check if response is HTML (error page) instead of JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text()
        console.error('❌ Received HTML instead of JSON:', textResponse.substring(0, 200))
        throw new Error('Server returned HTML instead of JSON - likely authentication error')
      }
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch calendar')
      }

      const data = await response.json()
      
      console.log('📅 Calendar events fetched:', data.count)
      setMeetings(data.events)

    } catch (err: any) {
      console.error('❌ Calendar fetch error:', err)
      
      if (err.message.includes('ACCESS_TOKEN_EXPIRED') || err.message.includes('No valid Google token')) {
        setError('Google access token expired or not found. Please sign in again.')
      } else if (err.message.includes('QUOTA_EXCEEDED')) {
        setError('Google Calendar API quota exceeded. Please try again later.')
      } else if (err.message.includes('HTML instead of JSON')) {
        setError('Authentication error - please sign in with Google first.')
      } else {
        setError(err.message || 'Failed to fetch calendar events')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const refreshCalendarData = async () => {
    await fetchCalendarEvents()
  }

  const markAsPrepped = (meetingId: string) => {
    setMeetings(prev => prev.map(meeting => 
      meeting.id === meetingId 
        ? { ...meeting, isPrepped: true }
        : meeting
    ))
  }

  const toggleChecklistItem = (meetingId: string, itemIndex: number) => {
    const key = `${meetingId}-${itemIndex}`
    setSelectedChecklists(prev => {
      const newSet = new Set(prev)
      if (newSet.has(key)) {
        newSet.delete(key)
      } else {
        newSet.add(key)
      }
      return newSet
    })
  }

  return {
    user,
    session,
    meetings,
    isLoading,
    isCalendarConnected,
    error,
    
    signInWithGoogle,
    signOut,
    fetchCalendarEvents,
    refreshCalendarData,
    
    markAsPrepped,
    toggleChecklistItem
  }
}
