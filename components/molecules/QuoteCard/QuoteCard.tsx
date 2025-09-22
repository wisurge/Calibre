'use client'

import React from 'react'
import { Card } from '@/components/atoms/Card'
import { useThemeStyles } from '@/hooks/useThemeStyles'

export interface Quote {
  text: string
  author: string
}

export interface QuoteCardProps {
  quote: Quote
  className?: string
}

export const QuoteCard = ({ quote, className }: QuoteCardProps) => {
  useThemeStyles() // Apply theme styles
  
  return (
    <div className={`bg-theme-accent rounded-xl p-6 hover:shadow-md transition-shadow ${className}`}>
      <blockquote className="theme-text-secondary italic text-lg leading-relaxed mb-3">
        "{quote.text}"
      </blockquote>
      <cite className="text-sm theme-text-secondary font-medium">
        — {quote.author}
      </cite>
    </div>
  )
}
