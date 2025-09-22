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
  
  return (
    <Card className={`theme-surface rounded-2xl shadow-sm border-0 p-8 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-theme-accent rounded-xl flex items-center justify-center">
          <Zap className="w-6 h-6 theme-primary" />
        </div>
        <div>
          <h2 className="text-2xl text-vibed theme-text">What Needs Love Today</h2>
          <p className="theme-text-secondary text-playful">Prioritize your peace, tackle these tasks.</p>
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center space-x-4 p-4 bg-theme-accent rounded-xl">
            <Checkbox
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
              color="purple"
            />
            <div className="flex-1">
              <span className={`font-medium ${task.completed ? 'line-through theme-text-secondary' : 'theme-text'}`}>
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
      
      <Button className="w-full bg-theme-primary text-white py-3 rounded-xl font-medium">
        Add Task
      </Button>
    </Card>
  )
}
