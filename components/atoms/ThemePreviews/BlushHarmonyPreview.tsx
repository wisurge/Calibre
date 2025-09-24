import React from 'react'

export const BlushHarmonyPreview = () => {
  return (
    <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-lg p-6 h-full flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-20 h-20 bg-pink-200 rounded-lg mx-auto flex items-center justify-center relative">
          <div className="w-12 h-12 bg-pink-300 rounded-lg"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-400 rounded-full"></div>
        </div>
        <div className="space-y-2">
          <div className="w-16 h-2 bg-pink-300 rounded mx-auto"></div>
          <div className="w-12 h-2 bg-blue-200 rounded mx-auto"></div>
        </div>
        <div className="flex space-x-1 justify-center">
          <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
          <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}


