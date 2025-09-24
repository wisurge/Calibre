'use client'

import React from 'react'
import { Card } from '@/components/atoms/Card'
import { Checkbox } from '@/components/atoms/Checkbox'
import { ProgressBar } from '@/components/atoms/ProgressBar'
import { Button } from '@/components/atoms/Button'
import { Flame } from 'lucide-react'
import { useThemeStyles } from '@/hooks/useThemeStyles'
import { trackHabitCompletion } from '@/lib/analytics'

export interface Habit {
  id: number
  name: string
  time: string
  completed: boolean
}

export interface HabitCardProps {
  habits: Habit[]
  onToggleHabit: (id: number) => void
  className?: string
}

export const HabitCard = ({ habits, onToggleHabit, className }: HabitCardProps) => {
  const theme = useThemeStyles() // Apply theme styles
  const completedHabits = habits.filter(habit => habit.completed).length
  const habitProgress = (completedHabits / habits.length) * 100

  const handleHabitToggle = (habit: Habit) => {
    onToggleHabit(habit.id)
    if (!habit.completed) {
      // Track completion when habit is marked as done
      const streak = habits.filter(h => h.completed).length + 1
      trackHabitCompletion(habit.name, streak)
    }
  }

  return (
    <Card className={`theme-surface rounded-2xl shadow-sm border-0 p-4 sm:p-6 lg:p-8 ${className}`}>
      <div className="flex items-center space-x-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-theme-secondary rounded-xl flex items-center justify-center">
          <Flame className="w-4 h-4 sm:w-6 sm:h-6 theme-primary" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl text-vibed theme-text">Crush Your Day</h2>
          <p className="theme-text-secondary text-playful text-sm sm:text-base">Your daily habits are waiting for you!</p>
        </div>
      </div>
      
      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
        {habits.map((habit) => (
          <div key={habit.id} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-theme-accent rounded-xl">
            <Checkbox
              checked={habit.completed}
              onChange={() => handleHabitToggle(habit)}
              color="purple"
            />
            <div className="flex-1 min-w-0">
              <span className={`font-medium text-sm sm:text-base ${habit.completed ? 'line-through theme-text-secondary' : 'theme-text'}`}>
                {habit.name}
              </span>
              <span className="text-xs sm:text-sm theme-text-secondary ml-2">{habit.time}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mb-4 sm:mb-6">
        <ProgressBar value={habitProgress} color="purple" />
        <p className="text-xs sm:text-sm theme-text-secondary mt-2">
          {Math.round(habitProgress)}% ✨ Almost there!
        </p>
      </div>
      
      <Button className="w-full bg-theme-primary text-white py-2 sm:py-3 rounded-xl font-medium text-sm sm:text-base">
        Let's Go!
      </Button>
    </Card>
  )
}