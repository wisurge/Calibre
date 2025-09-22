import React from 'react'
import { Sparkles } from 'lucide-react'

export interface LivePreviewProps {
  themeColors: string[]
  className?: string
}

export const LivePreview = ({ themeColors, className }: LivePreviewProps) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <div 
        className="h-12 rounded-lg flex items-center justify-between px-4 text-white font-medium"
        style={{ backgroundColor: themeColors[0] }}
      >
        <span>Routinsie App</span>
        <Sparkles className="w-4 h-4" />
      </div>
      <div 
        className="h-8 rounded-lg"
        style={{ backgroundColor: themeColors[1] }}
      />
      <div 
        className="h-8 rounded-lg"
        style={{ backgroundColor: themeColors[2] }}
      />
      <div 
        className="h-10 rounded-lg flex items-center justify-center text-white font-medium"
        style={{ backgroundColor: themeColors[0] }}
      >
        My Fun Button
      </div>
    </div>
  )
}

