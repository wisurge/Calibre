'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthForm, AuthFormData } from '@/components/molecules/AuthForm'
import { supabase } from '@/lib/supabase'
import { useNotifications } from '@/contexts/NotificationContext'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { addNotification } = useNotifications()

  const handleAuth = async (data: AuthFormData) => {
    setIsLoading(true)
    setError(null)

    try {
      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        })

        if (error) {
          throw error
        }

        addNotification({
          type: 'success',
          title: 'Welcome back!',
          message: 'You have successfully signed in.',
        })

        router.push('/dashboard')
      } else {
        const { error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              full_name: data.fullName,
            },
          },
        })

        if (error) {
          throw error
        }

        addNotification({
          type: 'success',
          title: 'Account created!',
          message: 'Please check your email to verify your account.',
        })

        // Switch to login mode after successful signup
        setMode('login')
      }
    } catch (err: any) {
      console.error('Auth error:', err)
      setError(err.message || 'An unexpected error occurred')
      
      addNotification({
        type: 'error',
        title: 'Authentication failed',
        message: err.message || 'Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleModeChange = () => {
    setMode(mode === 'login' ? 'signup' : 'login')
    setError(null)
  }

  return (
    <div className="min-h-screen theme-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthForm
          mode={mode}
          onSubmit={handleAuth}
          isLoading={isLoading}
          error={error || undefined}
          onModeChange={handleModeChange}
        />
      </div>
    </div>
  )
}
