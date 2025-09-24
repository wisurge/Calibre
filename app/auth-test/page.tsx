'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/atoms/Button'
import { Card } from '@/components/atoms/Card'
import { useRouter } from 'next/navigation'
import { useNotifications } from '@/contexts/NotificationContext'

export default function AuthTestPage() {
  const { user, isLoading, signOut } = useAuth()
  const router = useRouter()
  const { addNotification } = useNotifications()

  const testNotification = () => {
    addNotification({
      type: 'success',
      title: 'Test Notification',
      message: 'This is a test notification to verify the system is working!',
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen theme-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 bg-theme-primary rounded-full animate-pulse mx-auto"></div>
          <p className="text-sm theme-text-secondary">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen theme-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto p-8 space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-h2 text-vibed theme-text">
            Authentication Test
          </h1>
          
          {user ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">✅ Authenticated</h3>
                <p className="text-sm text-green-700">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-sm text-green-700">
                  <strong>Name:</strong> {user.user_metadata?.full_name || 'N/A'}
                </p>
                <p className="text-sm text-green-700">
                  <strong>ID:</strong> {user.id}
                </p>
              </div>
              
              <div className="space-y-2">
                <Button 
                  onClick={() => router.push('/dashboard')}
                  variant="primary"
                  className="w-full"
                >
                  Go to Dashboard
                </Button>
                
                <Button 
                  onClick={testNotification}
                  variant="outline"
                  className="w-full"
                >
                  Test Notification
                </Button>
                
                <Button 
                  onClick={signOut}
                  variant="outline"
                  className="w-full"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">❌ Not Authenticated</h3>
                <p className="text-sm text-red-700">
                  You are not signed in. Please sign in to access the dashboard.
                </p>
              </div>
              
              <div className="space-y-2">
                <Button 
                  onClick={() => router.push('/login')}
                  variant="primary"
                  className="w-full"
                >
                  Sign In
                </Button>
                
                <Button 
                  onClick={() => router.push('/signup')}
                  variant="outline"
                  className="w-full"
                >
                  Sign Up
                </Button>
                
                <Button 
                  onClick={testNotification}
                  variant="outline"
                  className="w-full"
                >
                  Test Notification
                </Button>
                
                <Button 
                  onClick={() => router.push('/landing')}
                  variant="ghost"
                  className="w-full"
                >
                  View Landing Page
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
