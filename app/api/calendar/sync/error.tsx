'use client'

import { useEffect } from 'react'
import { Button } from '@/components/atoms/Button'
import { AlertCircle, RefreshCw } from 'lucide-react'

export default function SyncError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Calendar sync error:', error)
  }, [error])

  const getErrorMessage = (errorMessage: string) => {
    if (errorMessage.includes('ACCESS_TOKEN_EXPIRED')) {
      return 'Your Google access token has expired. Please sign in again.'
    }
    if (errorMessage.includes('QUOTA_EXCEEDED')) {
      return 'Google Calendar API quota exceeded. Please try again later.'
    }
    if (errorMessage.includes('Invalid Credentials')) {
      return 'Invalid Google credentials. Please check your authentication.'
    }
    if (errorMessage.includes('Network')) {
      return 'Network error. Please check your internet connection.'
    }
    return 'Failed to sync calendar events.'
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Calendar Sync Error
        </h2>
        
        <p className="text-gray-600 mb-6">
          {getErrorMessage(error.message)}
        </p>

        <div className="space-y-3">
          <Button 
            onClick={reset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Sync</span>
          </Button>
        </div>

        <div className="mt-6 text-xs text-gray-400">
          Error details: {error.message}
        </div>
      </div>
    </div>
  )
}






