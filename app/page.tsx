'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Loader2 } from 'lucide-react'

export default function HomePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push('/dashboard')
      } else {
        router.push('/landing')
      }
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">Calibre</h2>
            <p className="text-sm text-gray-600">Your Personal Standards, Your Growth</p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
            <p className="text-sm text-gray-500">Loading your experience...</p>
          </div>
        </div>
      </div>
    )
  }

  return null
}