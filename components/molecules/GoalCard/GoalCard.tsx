import React from 'react'
import { Card } from '@/components/atoms/Card'
import { ProgressBar } from '@/components/atoms/ProgressBar'
import { Button } from '@/components/atoms/Button'
import { Sparkles } from 'lucide-react'

export interface Goal {
  id: string | number
  title: string
  description: string
  progress: number
  icon: React.ComponentType<{ className?: string }>
  color: string
  completed: boolean
}

export interface GoalCardProps {
  goal: Goal
  onPeekProgress: (id: string | number) => void
  onMarkComplete: (id: string | number) => void
  className?: string
}

export const GoalCard = ({ goal, onPeekProgress, onMarkComplete, className }: GoalCardProps) => {
  const getProgressMessage = (progress: number) => {
    if (progress === 100) return "You crushed it!"
    if (progress >= 80) return "Almost there! Keep pushing!"
    if (progress >= 60) return "Making steady progress!"
    if (progress >= 40) return "Building foundational skills!"
    return "Just getting started!"
  }

  const getIconColor = (color: string) => {
    const colorClasses = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
    }
    return colorClasses[color as keyof typeof colorClasses] || 'bg-gray-100 text-gray-600'
  }

  const getProgressColor = (color: string) => {
    const colorMap = {
      blue: 'blue' as const,
      green: 'green' as const,
      yellow: 'orange' as const,
      purple: 'purple' as const,
      orange: 'orange' as const,
    }
    return colorMap[color as keyof typeof colorMap] || 'purple'
  }

  const isCompleted = goal.completed || goal.progress === 100
  const IconComponent = goal.icon

  return (
    <div
      className={`bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 ${
        isCompleted ? 'ring-2 ring-green-200 bg-green-50' : ''
      } ${className}`}
    >
      {isCompleted && (
        <div className="flex items-center justify-center mb-4">
          <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>Goal Crushed!</span>
          </div>
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getIconColor(goal.color)}`}>
          <IconComponent className="w-6 h-6" />
        </div>
        <div className="text-right">
          <h3 className="text-vibed text-gray-900 text-lg">{goal.title}</h3>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 text-body">
        {goal.description}
      </p>
      
      <div className="mb-4">
        <ProgressBar 
          value={goal.progress} 
          color={getProgressColor(goal.color)}
          showPercentage={false}
        />
        <p className="text-sm text-gray-600 mt-2">
          {goal.progress}% {getProgressMessage(goal.progress)}
        </p>
      </div>
      
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 text-xs"
          onClick={() => onPeekProgress(goal.id)}
        >
          Peek Progress
        </Button>
        <Button 
          variant={isCompleted ? "secondary" : "primary"} 
          size="sm" 
          className="flex-1 text-xs"
          onClick={() => onMarkComplete(goal.id)}
        >
          {isCompleted ? 'Completed' : 'Mark as Complete'}
        </Button>
      </div>
    </div>
  )
}
