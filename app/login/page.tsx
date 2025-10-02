'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthForm, AuthFormData } from '@/components/molecules/AuthForm'
import { supabase } from '@/lib/supabase'
import { useNotifications } from '@/contexts/NotificationContext'
import { useAuth } from '@/contexts/AuthContext'

export default function LoginPage() {
  const [isFormLoading, setIsFormLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { addNotification } = useNotifications()
  const { user, isLoading, signInWithGoogle } = useAuth()

  // Redirect if user is already logged in
  React.useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  // Show nothing while auth is loading - prevents flash of login form
  if (isLoading) {
    return null
  }

  // Don't render login form if user is already logged in
  if (user) {
    return null
  }

  const handleLogin = async (data: AuthFormData) => {
    setIsFormLoading(true)
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
      setIsFormLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsFormLoading(true)
    setError(null)

    try {
      await signInWithGoogle()
      // The redirect will happen automatically, so we don't need to handle success here
    } catch (err: any) {
      console.error('Google sign-in error:', err)
      setError(err.message || 'Google sign-in failed')
      
      addNotification({
        type: 'error',
        title: 'Google sign-in failed',
        message: err.message || 'Please try again.',
      })
    } finally {
      setIsFormLoading(false)
    }
  }

  return (
    <div className="min-h-screen theme-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthForm
          mode="login"
          onSubmit={handleLogin}
          onGoogleSignIn={handleGoogleSignIn}
          isLoading={isFormLoading}
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
