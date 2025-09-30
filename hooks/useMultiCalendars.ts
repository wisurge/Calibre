'use client'

import { useState, useEffect } from 'react'
import { CalendarProvider, CalendarAccount, CalendarProviderType } from '@/types/calendarProviders'

export const useMultiCalendars = () => {
  const [providers, setProviders] = useState<CalendarProvider[]>([])
  const [accounts, setAccounts] = useState<CalendarAccount[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize calendar providers
  useEffect(() => {
    const initializeProviders = () => {
      const defaultProviders: CalendarProvider[] = [
        {
          id: CalendarProviderType.GOOGLE,
          name: 'Google Calendar',
          icon: '📅',
          color: '#4285F4',
          authUrl: '/api/calendar/auth?provider=google',
          connected: false
        }
        // TODO: Enable other providers later
        // {
        //   id: CalendarProviderType.OUTLOOK,
        //   name: 'Microsoft Outlook',
        //   icon: '📧',
        //   color: '#0078D4',
        //   authUrl: '/api/calendar/auth?provider=outlook',
        //   connected: false
        // },
        // {
        //   id: CalendarProviderType.APPLE,
        //   name: 'Apple Calendar',
        //   icon: '🍎',
        //   color: '#000000',
        //   authUrl: '/api/calendar/auth?provider=apple',
        //   connected: false
        // },
        // {
        //   id: CalendarProviderType.CALDAV,
        //   name: 'CalDAV',
        //   icon: '🔗',
        //   color: '#6D4C41',
        //   authUrl: '/api/calendar/auth?provider=caldav',
        //   connected: false
        // },
        // {
        //   id: CalendarProviderType.ICAL,
        //   name: 'iCal Feed',
        //   icon: '📡',
        //   color: '#8E24AA',
        //   authUrl: '/api/calendar/auth?provider=ical',
        //   connected: false
        // }
      ]
      setProviders(defaultProviders)
    }

    initializeProviders()
  }, [])

  // Check connected accounts - only when needed
  useEffect(() => {
    const checkConnectedAccounts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/calendar/accounts', {
          // Add cache headers to prevent unnecessary requests
          headers: {
            'Cache-Control': 'max-age=300' // Cache for 5 minutes
          }
        })
        if (response.ok) {
          const connectedAccounts: CalendarAccount[] = await response.json()
          setAccounts(connectedAccounts)
          
          // Update provider connectionstatus
          setProviders(prev => prev.map(provider => ({
            ...provider,
            connected: connectedAccounts.some(account => account.providerId === provider.id)
          })))
        }
      } catch (err) {
        console.error('Error checking connected accounts:', err)
      } finally {
        setIsLoading(false)
      }
    }

    // Only check accounts if we haven't loaded them yet
    if (accounts.length === 0) {
      checkConnectedAccounts()
    }
  }, [])

  const connectProvider = (providerId: CalendarProviderType) => {
    const provider = providers.find(p => p.id === providerId)
    if (provider) {
      window.location.href = provider.authUrl
    }
  }

  const disconnectProvider = async (providerId: CalendarProviderType) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/calendar/disconnect?provider=${providerId}`, {
        method: 'POST'
      })
      
      if (response.ok) {
        // Update local state
        setAccounts(prev => prev.filter(account => account.providerId !== providerId))
        setProviders(prev => prev.map(provider => 
          provider.id === providerId 
            ? { ...provider, connected: false }
            : provider
        ))
      }
    } catch (err) {
      setError('Failed to disconnect calendar provider')
      console.error('Error disconnecting provider:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshCalendars = async () => {
    try {
      setIsLoading(true)
      await Promise.all(accounts.map(async (account) => {
        if (account.isActive) {
          await fetch(`/api/calendar/sync?provider=${account.providerId}&account=${account.accountId}`, {
            method: 'POST'
          })
        }
      }))
      
      // Refresh accounts list
      const response = await fetch('/api/calendar/accounts')
      if (response.ok) {
        const connectedAccounts = await response.json()
        setAccounts(connectedAccounts)
      }
    } catch (err) {
      setError('Failed to refresh calendars')
      console.error('Error refreshing calendars:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    providers,
    accounts,
    isLoading,
    error,
    connectProvider,
    disconnectProvider,
    refreshCalendars,
    connectedCount: accounts.filter(acc => acc.isActive).length
  }
}
