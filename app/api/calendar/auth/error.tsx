'use client'

import { useEffect } from 'react'
import { Button } from '@/components/atoms/Button'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AuthError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Auth error:', error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Authentication Error
        </h2>
        
        <p className="text-gray-600 mb-6">
          There was a problem signing in with Google. This might be due to:
        </p>
        
        <div className="text-left space-y-2 text-sm text-gray-500 mb-8">
          <div>• Invalid Google OAuth configuration</div>
          <div>• Expired or invalid credentials</div>
          <div>• Network connection issues</div>
          <div>• Browser blocking third-party cookies</div>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={reset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Try Again
          </Button>
          
          <Link href="/dashboard">
            <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Dashboard</span>
            </Button>
          </Link>
        </div>

        <div className="mt-6 text-xs text-gray-400">
          Error: {error.message}
        </div>
      </div>
    </div>
  )
}






