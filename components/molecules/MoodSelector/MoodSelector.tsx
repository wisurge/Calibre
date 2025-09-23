import React from 'react'
import { cn } from '@/lib/utils'

export interface Mood {
  id: string
  emoji: string
  label: string
  color: string
}

export interface MoodSelectorProps {
  moods: Mood[]
  selectedMood?: string
  onMoodSelect: (moodId: string) => void
  className?: string
}

export const MoodSelector = ({ 
  moods, 
  selectedMood, 
  onMoodSelect, 
  className 
}: MoodSelectorProps) => {
  return (
    <div className={cn('space-y-3 sm:space-y-4', className)}>
      <h3 className="text-base sm:text-lg font-semibold theme-text">Today I feel...</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onMoodSelect(mood.id)}
            className={cn(
              'flex flex-col items-center p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105',
              selectedMood === mood.id
                ? 'border-theme-primary bg-theme-secondary shadow-md'
                : 'border-theme-border bg-theme-surface hover:border-theme-accent'
            )}
          >
            <span className="text-xl sm:text-2xl mb-1 sm:mb-2">{mood.emoji}</span>
            <span className="text-xs sm:text-sm font-medium theme-text text-center">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

