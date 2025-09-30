'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { CheckCircle, AlertCircle } from 'lucide-react'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('🔄 Processing auth callback...')
        
        // Check if there's an auth error in the URL
        const urlParams = new URLSearchParams(window.location.search)
        const error = urlParams.get('error')
        const errorDescription = urlParams.get('error_description')
        
        if (error) {
          console.error('❌ Auth error from providers:', error, errorDescription)
          router.push('/dashboard?error=auth_callback_failed')
          return
        }

        // Get the current session after callback
        const { data: authData, error: authError } = await supabase.auth.getSession()
        
        if (authError) {
          console.error('❌ Session error:', authError)
          router.push('/dashboard?error=session_failed')
          return
        }

        if (authData.session) {
          console.log('✅ Successfully authenticated with Google')
          console.log('👤 User:', authData.session.user.email)
          console.log('🔑 Provider token exists:', !!authData.session.provider_token)
          console.log('⏰ Token expires at:', authData.session.expires_at ? new Date(authData.session.expires_at * 1000).toISOString() : 'N/A')
          
          // Success - redirect to dashboard
          router.push('/dashboard')
        } else {
          console.warn('⚠️ No session found')
          router.push('/dashboard?error=no_session')
        }
      } catch (error) {
        console.error('❌ Callback error:', error)
        router.push('/dashboard?error=callback_failed')
      }
    }

    // Small delay to ensure URL parameters are properly set
    setTimeout(handleAuthCallback, 100)
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8">
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Loading Spinner */}
            <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
            {/* Success Icon (will show briefly if auth succeeds quickly) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600 opacity-0" />
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Completing Authentication
        </h2>
        
        <p className="text-gray-600 mb-4">
          Please wait while we verify your Google account...
        </p>

        <div className="text-sm text-gray-500 bg-white rounded-lg p-4 border border-gray-200 max-w-md mx-auto">
          <div className="space-y-2 text-left">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Verifying OAuth tokens</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <span>Checking calendar permissions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <span>Redirecting to dashboard</span>
            </div>
          </div>
        </div>

        {/* Error states would be handled by redirects to dashboard with error params */}
        <div className="mt-6 text-xs text-gray-400">
          If this takes longer than expected, <a href="/dashboard" className="text-blue-500">click here</a> to continue.
        </div>
      </div>
    </div>
  )
}


