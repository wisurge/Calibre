'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { useNotifications } from '@/contexts/NotificationContext'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import { Card } from '@/components/atoms/Card'
import { Button } from '@/components/atoms/Button'

export default function AuthCallback() {
  const router = useRouter()
  const { addNotification } = useNotifications()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          throw error
        }

        if (data.session) {
          setStatus('success')
          setMessage('Your email has been verified successfully!')
          
          addNotification({
            type: 'success',
            title: 'Email verified!',
            message: 'Your account is now active. Welcome to Routinsie!',
          })

          // Redirect to dashboard after a short delay
          setTimeout(() => {
            router.push('/dashboard')
          }, 2000)
        } else {
          setStatus('error')
          setMessage('Email verification failed. Please try again.')
        }
      } catch (error: any) {
        console.error('Auth callback error:', error)
        setStatus('error')
        setMessage(error.message || 'An error occurred during verification.')
        
        addNotification({
          type: 'error',
          title: 'Verification failed',
          message: 'Please try signing up again.',
        })
      }
    }

    handleAuthCallback()
  }, [router, addNotification])

  const handleRetry = () => {
    router.push('/signup')
  }

  const handleGoToLogin = () => {
    router.push('/login')
  }

  return (
    <div className="min-h-screen theme-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-12 h-12 theme-primary mx-auto mb-4 animate-spin" />
            <h1 className="text-xl font-semibold theme-text mb-2">
              Verifying your email...
            </h1>
            <p className="theme-text-secondary">
              Please wait while we verify your email address.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h1 className="text-xl font-semibold theme-text mb-2">
              Email Verified!
            </h1>
            <p className="theme-text-secondary mb-6">
              {message}
            </p>
            <p className="text-sm theme-text-secondary">
              Redirecting to dashboard...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-xl font-semibold theme-text mb-2">
              Verification Failed
            </h1>
            <p className="theme-text-secondary mb-6">
              {message}
            </p>
            <div className="space-y-3">
              <Button 
                onClick={handleRetry}
                variant="primary"
                className="w-full"
              >
                Try Again
              </Button>
              <Button 
                onClick={handleGoToLogin}
                variant="ghost"
                className="w-full"
              >
                Go to Login
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
