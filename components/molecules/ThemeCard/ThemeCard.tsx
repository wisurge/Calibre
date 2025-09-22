import React from 'react'
import { Card } from '@/components/atoms/Card'
import { Button } from '@/components/atoms/Button'
import { Sparkles } from 'lucide-react'

export interface Theme {
  id: string
  name: string
  colors: string[]
  preview: React.ReactNode
  active: boolean
}

export interface ThemeCardProps {
  theme: Theme
  isSelected: boolean
  onSelect: (themeId: string) => void
  className?: string
}

export const ThemeCard = ({ theme, isSelected, onSelect, className }: ThemeCardProps) => {
  return (
    <Card
      className={`theme-surface rounded-2xl shadow-sm border-2 p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isSelected ? 'border-theme-primary ring-2 ring-theme-primary/30' : 'border-theme-border'
      } ${className}`}
      onClick={() => onSelect(theme.id)}
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold theme-text mb-3">{theme.name}</h3>
        <div className="flex justify-center space-x-2 mb-4">
          {theme.colors.map((color, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full border-2 border-theme-surface shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
      
      <div className="mb-6 h-32 flex items-center justify-center">
        {theme.preview}
      </div>
      
      <Button
        className={`w-full py-2 ${
          isSelected
            ? 'bg-theme-primary text-white hover:opacity-90'
            : 'bg-theme-accent text-theme-text hover:bg-theme-secondary'
        }`}
      >
        {isSelected ? (
          <span className="flex items-center justify-center space-x-2">
            <span>Theme Active</span>
            <Sparkles className="w-4 h-4" />
          </span>
        ) : (
          'Apply Theme'
        )}
      </Button>
    </Card>
  )
}
