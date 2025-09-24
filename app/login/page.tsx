'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthForm, AuthFormData } from '@/components/molecules/AuthForm'
import { supabase } from '@/lib/supabase'
import { useNotifications } from '@/contexts/NotificationContext'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { addNotification } = useNotifications()

  const handleLogin = async (data: AuthFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) {
        throw error
      }

      // Check if user email is confirmed
      if (authData.user && !authData.user.email_confirmed_at) {
        addNotification({
          type: 'warning',
          title: 'Email not verified',
          message: 'Please check your email and click the verification link before signing in.',
        })
        setError('Please verify your email before signing in.')
        return
      }

      addNotification({
        type: 'success',
        title: 'Welcome back!',
        message: 'You have successfully signed in.',
      })

      router.push('/dashboard')
    } catch (err: any) {
      console.error('Login error:', err)
      setError(err.message || 'An unexpected error occurred')
      
      addNotification({
        type: 'error',
        title: 'Sign in failed',
        message: err.message || 'Please check your credentials and try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen theme-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthForm
          mode="login"
          onSubmit={handleLogin}
          isLoading={isLoading}
          error={error || undefined}
          onModeChange={() => router.push('/signup')}
        />
        
        {/* Additional Links */}
        <div className="mt-6 text-center space-y-2">
          <Link 
            href="/forgot-password" 
            className="text-sm theme-primary hover:opacity-80 transition-opacity"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  )
}
