'use client'

import React, { useState, memo } from 'react'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { cn } from '@/lib/utils'

export interface AuthFormProps {
  mode: 'login' | 'signup'
  onSubmit: (data: AuthFormData) => Promise<void>
  isLoading?: boolean
  error?: string
  onModeChange: () => void
}

export interface AuthFormData {
  email: string
  password: string
  confirmPassword?: string
  fullName?: string
}

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
        className={cn(
          'w-full pl-10 pr-10 py-3 border rounded-lg text-sm transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent',
          'theme-text bg-theme-surface border-theme-border',
          'placeholder:theme-text-secondary',
          error && 'border-red-500 focus:ring-red-500'
        )}
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

export const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onSubmit,
  isLoading = false,
  error,
  onModeChange
}) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Partial<AuthFormData>>({})

  const validateForm = (): boolean => {
    const errors: Partial<AuthFormData> = {}

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }

    // Signup specific validations
    if (mode === 'signup') {
      if (!formData.fullName) {
        errors.fullName = 'Full name is required'
      }

      if (!formData.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password'
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
      }
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      await onSubmit(formData)
    } catch (err) {
      // Error handling is done by parent component
    }
  }

  const handleInputChange = (field: keyof AuthFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }


  return (
    <Card className="w-full max-w-md mx-auto p-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-h2 text-vibed theme-text">
          {mode === 'login' ? 'Welcome back!' : 'Create your account'}
        </h1>
        <p className="text-sm theme-text-secondary">
          {mode === 'login' 
            ? 'Sign in to continue your journey' 
            : 'Join Routinsie and start building better habits'
          }
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
        {/* Full Name (Signup only) */}
        {mode === 'signup' && (
          <InputField
            icon={User}
            type="text"
            placeholder="Full name"
            value={formData.fullName || ''}
            onChange={(value) => handleInputChange('fullName', value)}
            error={validationErrors.fullName}
          />
        )}

        {/* Email */}
        <InputField
          icon={Mail}
          type="email"
          placeholder="Email address"
          value={formData.email}
          onChange={(value) => handleInputChange('email', value)}
          error={validationErrors.email}
        />

        {/* Password */}
        <InputField
          icon={Lock}
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={formData.password}
          onChange={(value) => handleInputChange('password', value)}
          error={validationErrors.password}
          showToggle
          onToggle={() => setShowPassword(!showPassword)}
        />

        {/* Confirm Password (Signup only) */}
        {mode === 'signup' && (
          <InputField
            icon={Lock}
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            value={formData.confirmPassword || ''}
            onChange={(value) => handleInputChange('confirmPassword', value)}
            error={validationErrors.confirmPassword}
            showToggle
            onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        )}

        {/* Submit Button */}
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
              {mode === 'login' ? 'Signing in...' : 'Creating account...'}
            </>
          ) : (
            <>
              {mode === 'login' ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>

      {/* Mode Toggle */}
      <div className="text-center">
        <p className="text-sm theme-text-secondary">
          {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
          <button
            type="button"
            onClick={onModeChange}
            className="ml-1 theme-primary hover:opacity-80 transition-opacity text-fun"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-theme-border"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-theme-surface theme-text-secondary">or continue with</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-2">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full"
          disabled={isLoading}
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>
      </div>
    </Card>
  )
}
