'use client'

import React, { useState } from 'react'
import { Card } from '@/components/atoms/Card'
import { Button } from '@/components/atoms/Button'
import { Lightbulb, Sparkles } from 'lucide-react'
import { useThemeStyles } from '@/hooks/useThemeStyles'

export interface ReflectionComponentProps {
  onSave: (content: string) => void
  className?: string
  variant?: 'dashboard' | 'journal'
  title?: string
  description?: string
  placeholder?: string
  promptText?: string
}

export const ReflectionComponent = ({ 
  onSave, 
  className, 
  variant = 'dashboard',
  title = "Today's Reflection",
  description,
  placeholder,
  promptText
}: ReflectionComponentProps) => {
  useThemeStyles() // Apply theme styles
  const [reflection, setReflection] = useState('')

  const handleSave = () => {
    if (reflection.trim()) {
      onSave(reflection)
      setReflection('')
    }
  }

  // Default content based on variant
  const defaultContent = {
    dashboard: {
      title: "Today's Reflection",
      description: "What are you grateful for today, or what made you smile?",
      placeholder: "Share your thoughts here...",
      promptText: undefined,
      textareaHeight: "h-32"
    },
    journal: {
      title: "Today's Reflection",
      description: "If you could whisper something to your past self, what would it be? Reflect on a lesson learned.",
      placeholder: "What's on your mind today? How are you feeling?",
      promptText: "What's on your mind today? How are you feeling?",
      textareaHeight: "h-48"
    }
  }

  const content = defaultContent[variant]
  const finalTitle = title || content.title
  const finalDescription = description || content.description
  const finalPlaceholder = placeholder || content.placeholder
  const finalPromptText = promptText !== undefined ? promptText : content.promptText

  return (
    <Card className={`theme-surface rounded-2xl shadow-sm border-0 p-8 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-theme-secondary rounded-xl flex items-center justify-center">
          <Lightbulb className="w-6 h-6 theme-primary" />
        </div>
        <div>
          <h2 className={`${variant === 'journal' ? 'text-3xl text-heading' : 'text-2xl text-vibed'} theme-text`}>
            {finalTitle}
          </h2>
          <p className="theme-text-secondary text-playful">{finalDescription}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {finalPromptText && (
          <div className="space-y-2">
            <p className="theme-text-secondary">{finalPromptText}</p>
          </div>
        )}
        
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder={finalPlaceholder}
          className={`w-full ${content.textareaHeight} p-6 border border-theme-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent theme-text placeholder-theme-text-secondary bg-theme-surface`}
        />
        
        <div className={variant === 'journal' ? 'flex justify-end' : 'w-full'}>
          <Button 
            onClick={handleSave}
            className={`${variant === 'journal' ? 'px-8 py-3' : 'w-full py-3'} bg-theme-primary text-white rounded-xl font-medium flex items-center justify-center space-x-2`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Save My Thoughts</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}

