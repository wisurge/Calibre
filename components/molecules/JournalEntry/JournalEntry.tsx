'use client'

import React from 'react'
import { Card } from '@/components/atoms/Card'
import { CheckCircle, Cloud, Heart, Sparkles, Sun, Leaf } from 'lucide-react'
import { useThemeStyles } from '@/hooks/useThemeStyles'

export interface JournalEntry {
  id: string | number
  date: string
  content: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

export interface JournalEntryProps {
  entry: JournalEntry
  onClick?: (entry: JournalEntry) => void
  className?: string
}

export const JournalEntry = ({ entry, onClick, className }: JournalEntryProps) => {
  useThemeStyles() // Apply theme styles
  
  const getIconColor = (color: string) => {
    const colorClasses = {
      green: 'bg-green-100 text-green-600',
      blue: 'bg-blue-100 text-blue-600',
      pink: 'bg-pink-100 text-pink-600',
      purple: 'bg-purple-100 text-purple-600',
      yellow: 'bg-yellow-100 text-yellow-600',
    }
    return colorClasses[color as keyof typeof colorClasses] || 'bg-theme-accent text-theme-primary'
  }

  const IconComponent = entry.icon

  return (
    <div
      className={`bg-theme-accent rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer group ${className}`}
      onClick={() => onClick?.(entry)}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-semibold theme-text text-sm">{entry.date}</h3>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getIconColor(entry.color)}`}>
          <IconComponent className="w-4 h-4" />
        </div>
      </div>
      <p className="theme-text-secondary text-sm leading-relaxed group-hover:theme-text transition-colors">
        {entry.content}
      </p>
    </div>
  )
}
