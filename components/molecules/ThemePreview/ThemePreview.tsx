import React from 'react'
import { Card } from '@/components/atoms/Card'
import { Eye } from 'lucide-react'

export interface ThemePreviewProps {
  selectedThemeName: string
  previewElements: React.ReactNode
  className?: string
}

export const ThemePreview = ({ selectedThemeName, previewElements, className }: ThemePreviewProps) => {
  return (
    <Card className={`bg-white rounded-2xl shadow-sm border-0 p-8 ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <Eye className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">See it in Action ✨</h2>
          <p className="text-gray-600">Live Preview: {selectedThemeName}</p>
        </div>
      </div>
      
      <div className="bg-gray-100 rounded-xl p-8">
        <div className="max-w-md mx-auto">
          <p className="text-center text-gray-600 mb-6">See your vibe come to life!</p>
          {previewElements}
        </div>
      </div>
    </Card>
  )
}
