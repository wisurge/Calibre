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
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-semibold text-gray-900">Today I feel...</h3>
      <div className="grid grid-cols-3 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onMoodSelect(mood.id)}
            className={cn(
              'flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105',
              selectedMood === mood.id
                ? 'border-purple-500 bg-purple-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            )}
          >
            <span className="text-2xl mb-2">{mood.emoji}</span>
            <span className="text-sm font-medium text-gray-700">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

