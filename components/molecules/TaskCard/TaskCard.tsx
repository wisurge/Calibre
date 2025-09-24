'use client'

import React from 'react'
import { Card } from '@/components/atoms/Card'
import { Checkbox } from '@/components/atoms/Checkbox'
import { Button } from '@/components/atoms/Button'
import { Zap } from 'lucide-react'
import { useThemeStyles } from '@/hooks/useThemeStyles'

export interface Task {
  id: number
  name: string
  priority: 'High' | 'Medium' | 'Low'
  completed: boolean
}

export interface TaskCardProps {
  tasks: Task[]
  onToggleTask: (id: number) => void
  className?: string
}

export const TaskCard = ({ tasks, onToggleTask, className }: TaskCardProps) => {
  useThemeStyles() // Apply theme styles
  
  const handleTaskToggle = (taskId: number) => {
    onToggleTask(taskId)
  }
  
  return (
    <Card className={`theme-surface rounded-2xl shadow-sm border-0 p-4 sm:p-6 lg:p-8 ${className}`}>
      <div className="flex items-center space-x-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-theme-accent rounded-xl flex items-center justify-center">
          <Zap className="w-4 h-4 sm:w-6 sm:h-6 theme-primary" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl text-vibed theme-text">What Needs Love Today</h2>
          <p className="theme-text-secondary text-playful text-sm sm:text-base">Prioritize your peace, tackle these tasks.</p>
        </div>
      </div>
      
      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-theme-accent rounded-xl">
            <Checkbox
              checked={task.completed}
              onChange={() => handleTaskToggle(task.id)}
              color="purple"
            />
            <div className="flex-1 min-w-0">
              <span className={`font-medium text-sm sm:text-base ${task.completed ? 'line-through theme-text-secondary' : 'theme-text'}`}>
                {task.name}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ml-2 ${
                task.priority === 'High' ? 'bg-red-100 text-red-700' :
                task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {task.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <Button className="w-full bg-theme-primary text-white py-2 sm:py-3 rounded-xl font-medium text-sm sm:text-base">
        Add Task
      </Button>
    </Card>
  )
}
