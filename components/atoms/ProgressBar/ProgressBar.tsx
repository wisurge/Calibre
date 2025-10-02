import React from 'react'
import { cn } from '@/lib/utils'

export interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  showPercentage?: boolean
  color?: 'purple' | 'green' | 'blue' | 'orange'
}

export const ProgressBar = ({ 
  value, 
  max = 100, 
  className, 
  showPercentage = true,
  color = 'purple'
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100)
  
  const colorClasses = {
    purple: 'bg-gradient-to-r from-purple-500 to-purple-600',
    green: 'bg-gradient-to-r from-green-500 to-green-600',
    blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
    orange: 'bg-gradient-to-r from-orange-500 to-orange-600',
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          {showPercentage && `${Math.round(percentage)}%`}
        </span>
        <span className="text-xs text-gray-500">
          {value}/{max}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={cn(
            'h-2.5 rounded-full transition-all duration-300 ease-in-out',
            colorClasses[color]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}












