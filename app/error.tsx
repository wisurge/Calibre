'use client'

import { useEffect } from 'react'
import { Button } from '@/components/atoms/Button'
import { AlertCircle, Home, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 max-w-lg mx-auto">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Something went wrong!
        </h2>
        
        <p className="text-gray-600 mb-8">
          An unexpected error occurred. Don't worry, we're working to fix it.
        </p>

        <div className="space-y-3">
          <Button 
            onClick={reset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>
          
          <Link href="/dashboard">
            <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Go to Home</span>
            </Button>
          </Link>
        </div>

        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-left">
          <h3 className="font-medium text-gray-900 mb-2">Error Details:</h3>
          <code className="text-xs text-gray-600 break-all">
            {error.message}
          </code>
        </div>
      </div>
    </div>
  )
}


