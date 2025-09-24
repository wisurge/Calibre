import React from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

export interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
  color?: 'purple' | 'green' | 'blue'
}

export const Checkbox = ({ 
  checked, 
  onChange, 
  className, 
  size = 'md',
  color = 'purple'
}: CheckboxProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const colorClasses = {
    purple: checked ? 'bg-purple-600 border-purple-600' : 'border-gray-300',
    green: checked ? 'bg-green-600 border-green-600' : 'border-gray-300',
    blue: checked ? 'bg-blue-600 border-blue-600' : 'border-gray-300',
  }

  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        'flex items-center justify-center rounded border-2 transition-all duration-200 hover:scale-105',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
    >
      {checked && <Check className="w-3 h-3 text-white" />}
    </button>
  )
}


