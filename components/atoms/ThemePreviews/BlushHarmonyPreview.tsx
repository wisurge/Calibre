import React from 'react'

export const BlushHarmonyPreview = () => {
  return (
    <div className="bg-gradient-to-br from-pink-50 to-blue-50 rounded-lg p-6 h-full relative overflow-hidden">
      {/* Web-style Doodle Background Elements */}
      <div className="absolute inset-0 opacity-25">
        {/* Large Calendar */}
        <div className="absolute top-1 left-2 w-14 h-10 bg-pink-100 border-2 border-pink-300 rounded">
          <div className="absolute top-1 left-1 w-12 h-1 bg-pink-400 rounded"></div>
          <div className="absolute top-2 left-1 w-1 h-1 bg-pink-500 rounded-full"></div>
          <div className="absolute top-2 left-3 w-1 h-1 bg-pink-500 rounded-full"></div>
          <div className="absolute top-2 left-5 w-1 h-1 bg-pink-500 rounded-full"></div>
          <div className="absolute top-2 left-7 w-1 h-1 bg-pink-500 rounded-full"></div>
          <div className="absolute top-4 left-1 w-1 h-1 bg-blue-400 rounded-full"></div>
          <div className="absolute top-4 left-3 w-1 h-1 bg-blue-400 rounded-full"></div>
          <div className="absolute top-4 left-5 w-1 h-1 bg-blue-400 rounded-full"></div>
          <div className="absolute top-6 left-1 w-1 h-1 bg-pink-400 rounded-full"></div>
          <div className="absolute top-6 left-3 w-1 h-1 bg-pink-400 rounded-full"></div>
        </div>
        
        {/* Large Hand */}
        <div className="absolute top-1 right-2 w-8 h-6 bg-pink-200 rounded-full transform rotate-12">
          {/* Fingers */}
          <div className="absolute -top-1 right-2 w-1 h-3 bg-pink-300 rounded-full"></div>
          <div className="absolute top-0 right-1 w-1 h-3 bg-pink-300 rounded-full"></div>
          <div className="absolute top-1 right-0 w-1 h-3 bg-pink-300 rounded-full"></div>
          <div className="absolute top-2 -right-1 w-1 h-3 bg-pink-300 rounded-full"></div>
          <div className="absolute top-3 -right-2 w-1 h-3 bg-pink-300 rounded-full"></div>
        </div>
        
        {/* Large Heart */}
        <div className="absolute bottom-4 left-4 w-5 h-5 bg-pink-300 transform rotate-45 rounded-full">
          <div className="absolute -top-1 left-1 w-3 h-3 bg-pink-300 transform -rotate-45 rounded-full"></div>
        </div>
        
        {/* Large Star */}
        <div className="absolute top-8 right-2 w-4 h-4 bg-blue-300 transform rotate-45">
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-300 transform -translate-x-1/2 -rotate-45"></div>
          <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-300 transform -translate-x-1/2 -rotate-45"></div>
          <div className="absolute left-0 top-1/2 w-2 h-2 bg-blue-300 transform -translate-y-1/2 rotate-45"></div>
          <div className="absolute right-0 top-1/2 w-2 h-2 bg-blue-300 transform -translate-y-1/2 rotate-45"></div>
        </div>
        
        {/* Large Checkmark */}
        <div className="absolute bottom-3 right-4 w-4 h-2 bg-pink-400 transform rotate-45">
          <div className="absolute -top-1 left-1 w-1 h-3 bg-pink-400 transform -rotate-90"></div>
        </div>
        
        {/* Sticky Notes */}
        <div className="absolute top-6 left-1/2 w-3 h-4 bg-blue-100 border border-blue-300 rounded transform -translate-x-1/2">
          <div className="absolute top-1 left-1 w-1 h-1 bg-blue-400 rounded"></div>
        </div>
        <div className="absolute top-10 left-1/3 w-2 h-3 bg-pink-100 border border-pink-300 rounded transform -translate-x-1/2">
          <div className="absolute top-1 left-0.5 w-1 h-0.5 bg-pink-400 rounded"></div>
        </div>
        
        {/* Large Arrow */}
        <div className="absolute bottom-6 left-1/2 w-3 h-2 bg-pink-400 transform -translate-x-1/2">
          <div className="absolute right-0 top-0 w-1 h-1 bg-pink-400 transform rotate-45"></div>
        </div>
        
        {/* Small Hearts */}
        <div className="absolute top-12 left-2 w-2 h-2 bg-pink-200 transform rotate-45 rounded-full">
          <div className="absolute -top-0.5 left-0.5 w-1 h-1 bg-pink-200 transform -rotate-45 rounded-full"></div>
        </div>
        <div className="absolute bottom-8 right-1 w-2 h-2 bg-blue-200 transform rotate-45 rounded-full">
          <div className="absolute -top-0.5 left-0.5 w-1 h-1 bg-blue-200 transform -rotate-45 rounded-full"></div>
        </div>
      </div>
      
      {/* Main Content - Web Style */}
      <div className="relative z-10 text-center space-y-3">
        <div className="w-16 h-16 bg-pink-200 rounded-xl mx-auto flex items-center justify-center border-2 border-pink-300 shadow-sm">
          <div className="w-10 h-10 bg-blue-200 rounded-lg"></div>
        </div>
        <div className="space-y-2">
          <div className="w-20 h-3 bg-pink-300 rounded mx-auto"></div>
          <div className="w-16 h-2 bg-blue-200 rounded mx-auto"></div>
          <div className="w-12 h-2 bg-pink-200 rounded mx-auto"></div>
        </div>
        <div className="flex space-x-2 justify-center">
          <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
          <div className="w-3 h-3 bg-pink-300 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}





