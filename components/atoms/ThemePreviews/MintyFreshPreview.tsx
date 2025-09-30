import React from 'react'

export const MintyFreshPreview = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 h-full relative overflow-hidden">
      {/* Web-style Doodle Background Elements */}
      <div className="absolute inset-0 opacity-25">
        {/* Desktop Monitor */}
        <div className="absolute top-1 left-2 w-16 h-12 bg-green-200 rounded border-2 border-green-300">
          <div className="absolute top-1 left-1 w-14 h-8 bg-green-100 rounded">
            <div className="absolute top-1 left-1 w-12 h-1 bg-green-400 rounded"></div>
            <div className="absolute top-3 left-1 w-8 h-1 bg-green-300 rounded"></div>
            <div className="absolute top-5 left-1 w-10 h-1 bg-green-300 rounded"></div>
          </div>
          <div className="absolute -bottom-1 left-1/2 w-12 h-2 bg-green-300 rounded transform -translate-x-1/2"></div>
        </div>
        
        {/* Keyboard */}
        <div className="absolute bottom-2 left-1 w-14 h-4 bg-green-200 rounded border border-green-300">
          <div className="absolute top-1 left-1 w-1 h-1 bg-green-400 rounded"></div>
          <div className="absolute top-1 left-3 w-1 h-1 bg-green-400 rounded"></div>
          <div className="absolute top-1 left-5 w-1 h-1 bg-green-400 rounded"></div>
          <div className="absolute top-1 left-7 w-1 h-1 bg-green-400 rounded"></div>
          <div className="absolute top-1 left-9 w-1 h-1 bg-green-400 rounded"></div>
          <div className="absolute top-1 left-11 w-1 h-1 bg-green-400 rounded"></div>
        </div>
        
        {/* Coffee Cup */}
        <div className="absolute top-3 right-2 w-8 h-8 bg-green-200 rounded-full border-2 border-green-300">
          <div className="absolute -top-1 left-2 w-3 h-3 bg-green-300 rounded-full"></div>
          <div className="absolute top-1 left-1 w-6 h-1 bg-green-400 rounded"></div>
        </div>
        
        {/* Notebook */}
        <div className="absolute bottom-1 right-1 w-12 h-8 bg-green-100 border border-green-300 rounded">
          <div className="absolute top-1 left-1 w-10 h-1 bg-green-400 rounded"></div>
          <div className="absolute top-2 left-1 w-8 h-1 bg-green-300 rounded"></div>
          <div className="absolute top-3 left-1 w-6 h-1 bg-green-300 rounded"></div>
          <div className="absolute top-4 left-1 w-9 h-1 bg-green-300 rounded"></div>
        </div>
        
        {/* Plant */}
        <div className="absolute top-8 left-1/2 w-3 h-6 bg-green-500 rounded transform -translate-x-1/2">
          <div className="absolute -top-1 left-0 w-4 h-3 bg-green-300 rounded-full"></div>
          <div className="absolute -top-1 right-0 w-3 h-3 bg-green-300 rounded-full"></div>
          <div className="absolute top-1 left-1 w-2 h-2 bg-green-300 rounded-full"></div>
        </div>
        
        {/* Mouse */}
        <div className="absolute bottom-4 right-4 w-4 h-3 bg-green-200 rounded-full border border-green-300">
          <div className="absolute top-1 left-1 w-2 h-1 bg-green-400 rounded"></div>
        </div>
      </div>
      
      {/* Main Content - Web Style */}
      <div className="relative z-10 text-center space-y-3">
        <div className="w-16 h-16 bg-green-200 rounded-xl mx-auto flex items-center justify-center border-2 border-green-300 shadow-sm">
          <div className="w-10 h-10 bg-green-300 rounded-lg"></div>
        </div>
        <div className="space-y-2">
          <div className="w-20 h-3 bg-green-300 rounded mx-auto"></div>
          <div className="w-16 h-2 bg-green-200 rounded mx-auto"></div>
          <div className="w-12 h-2 bg-green-300 rounded mx-auto"></div>
        </div>
        <div className="flex space-x-2 justify-center">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-300 rounded-full"></div>
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}





