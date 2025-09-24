'use client'

import React, { useState, memo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, Eye, EyeOff, CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { supabase } from '@/lib/supabase'
import { useNotifications } from '@/contexts/NotificationContext'

// Memoized InputField component to prevent re-creation on each render
const InputField = memo(({ 
  icon: Icon, 
  type, 
  placeholder, 
  value, 
  onChange, 
  error,
  showToggle,
  onToggle
}: {
  icon: React.ComponentType<{ className?: string }>
  type: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  error?: string
  showToggle?: boolean
  onToggle?: () => void
}) => (
  <div className="space-y-1">
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="w-4 h-4 theme-text-secondary" />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-10 pr-10 py-3 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent theme-text bg-theme-surface border-theme-border placeholder:theme-text-secondary ${
          error ? 'border-red-500 focus:ring-red-500' : ''
        }`}
      />
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {type === 'password' ? (
            <EyeOff className="w-4 h-4 theme-text-secondary hover:theme-text transition-colors" />
          ) : (
            <Eye className="w-4 h-4 theme-text-secondary hover:theme-text transition-colors" />
          )}
        </button>
      )}
    </div>
    {error && (
      <p className="text-xs text-red-500 mt-1">{error}</p>
    )}
  </div>
))

InputField.displayName = 'InputField'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<{
    password?: string
    confirmPassword?: string
  }>({})
  
  const router = useRouter()
  const { addNotification } = useNotifications()

  const validateForm = (): boolean => {
    const errors: { password?: string; confirmPassword?: string } = {}

    if (!password) {
      errors.password = 'Password is required'
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) {
        throw error
      }

      setIsSuccess(true)
      addNotification({
        type: 'success',
        title: 'Password updated!',
        message: 'Your password has been successfully updated.',
      })

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (err: any) {
      console.error('Password reset error:', err)
      setError(err.message || 'An unexpected error occurred')
      
      addNotification({
        type: 'error',
        title: 'Reset failed',
        message: err.message || 'Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }


  if (isSuccess) {
    return (
      <div className="min-h-screen theme-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-h2 text-vibed theme-text">
              Password updated!
            </h1>
            <p className="text-sm theme-text-secondary">
              Your password has been successfully updated. Redirecting you to the dashboard...
            </p>
          </div>

          <div className="flex items-center justify-center">
            <Loader2 className="w-6 h-6 theme-primary animate-spin" />
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen theme-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-h2 text-vibed theme-text">
            Set new password
          </h1>
          <p className="text-sm theme-text-secondary">
            Enter your new password below
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            icon={Lock}
            type={showPassword ? 'text' : 'password'}
            placeholder="New password"
            value={password}
            onChange={setPassword}
            error={validationErrors.password}
            showToggle
            onToggle={() => setShowPassword(!showPassword)}
          />

          <InputField
            icon={Lock}
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            error={validationErrors.confirmPassword}
            showToggle
            onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Updating password...
              </>
            ) : (
              'Update password'
            )}
          </Button>
        </form>

        {/* Back to Login */}
        <div className="text-center">
          <Link href="/login">
            <Button variant="ghost" className="w-full">
              Back to login
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
