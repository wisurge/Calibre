import React from 'react'

export const MintyFreshPreview = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 h-full flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-green-200 rounded-lg mx-auto flex items-center justify-center">
          <div className="w-8 h-8 bg-green-300 rounded-lg"></div>
        </div>
        <div className="space-y-2">
          <div className="w-20 h-3 bg-green-300 rounded mx-auto"></div>
          <div className="w-16 h-2 bg-green-200 rounded mx-auto"></div>
          <div className="w-12 h-2 bg-green-300 rounded mx-auto"></div>
        </div>
        <div className="flex space-x-1 justify-center">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <div className="w-2 h-2 bg-green-300 rounded-full"></div>
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}


