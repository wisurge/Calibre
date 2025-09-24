'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthForm, AuthFormData } from '@/components/molecules/AuthForm'
import { supabase } from '@/lib/supabase'
import { useNotifications } from '@/contexts/NotificationContext'

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { addNotification } = useNotifications()

  const handleSignup = async (data: AuthFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }

      // Check if email confirmation is required
      if (authData.user && !authData.user.email_confirmed_at) {
        addNotification({
          type: 'success',
          title: 'Check your email!',
          message: 'We sent you a confirmation link. Please check your email and click the link to verify your account.',
        })
        
        // Show a confirmation message instead of redirecting
        setError(null)
        return
      }

      // If user is immediately confirmed (shouldn't happen in production)
      if (authData.user && authData.user.email_confirmed_at) {
        addNotification({
          type: 'success',
          title: 'Account created!',
          message: 'Your account has been created successfully.',
        })
        router.push('/dashboard')
      }
    } catch (err: any) {
      console.error('Signup error:', err)
      setError(err.message || 'An unexpected error occurred')
      
      addNotification({
        type: 'error',
        title: 'Signup failed',
        message: err.message || 'Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen theme-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthForm
          mode="signup"
          onSubmit={handleSignup}
          isLoading={isLoading}
          error={error || undefined}
          onModeChange={() => router.push('/login')}
        />
        
        {/* Additional Links */}
        <div className="mt-6 text-center space-y-2">
          <p className="text-xs theme-text-secondary">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="theme-primary hover:opacity-80 transition-opacity">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="theme-primary hover:opacity-80 transition-opacity">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
