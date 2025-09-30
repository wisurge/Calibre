import React from 'react'

export const SkySerenePreview = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 h-full relative overflow-hidden">
      {/* Web-style Doodle Background Elements */}
      <div className="absolute inset-0 opacity-30">
        {/* Large Main Cloud */}
        <div className="absolute top-1 left-2 w-12 h-6 bg-blue-200 rounded-full">
          <div className="absolute -top-1 left-2 w-4 h-4 bg-blue-200 rounded-full"></div>
          <div className="absolute -top-1 right-2 w-4 h-4 bg-blue-200 rounded-full"></div>
          <div className="absolute top-1 -left-1 w-3 h-3 bg-blue-200 rounded-full"></div>
          <div className="absolute top-1 -right-1 w-3 h-3 bg-blue-200 rounded-full"></div>
          <div className="absolute top-3 left-1 w-2 h-2 bg-blue-200 rounded-full"></div>
          <div className="absolute top-3 right-1 w-2 h-2 bg-blue-200 rounded-full"></div>
        </div>
        
        {/* Large Secondary Cloud */}
        <div className="absolute top-4 right-2 w-10 h-5 bg-blue-100 rounded-full">
          <div className="absolute -top-1 left-2 w-3 h-3 bg-blue-100 rounded-full"></div>
          <div className="absolute -top-1 right-2 w-3 h-3 bg-blue-100 rounded-full"></div>
          <div className="absolute top-1 -left-1 w-2 h-2 bg-blue-100 rounded-full"></div>
          <div className="absolute top-1 -right-1 w-2 h-2 bg-blue-100 rounded-full"></div>
        </div>
        
        {/* Large Sun */}
        <div className="absolute top-1 right-1 w-6 h-6 bg-blue-300 rounded-full">
          {/* Sun rays */}
          <div className="absolute -top-1 left-1/2 w-1 h-3 bg-blue-400 transform -translate-x-1/2"></div>
          <div className="absolute -bottom-1 left-1/2 w-1 h-3 bg-blue-400 transform -translate-x-1/2"></div>
          <div className="absolute left-0 top-1/2 w-3 h-1 bg-blue-400 transform -translate-y-1/2"></div>
          <div className="absolute right-0 top-1/2 w-3 h-1 bg-blue-400 transform -translate-y-1/2"></div>
          <div className="absolute -top-1 -left-1 w-1 h-1 bg-blue-400 transform rotate-45"></div>
          <div className="absolute -top-1 -right-1 w-1 h-1 bg-blue-400 transform rotate-45"></div>
          <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-blue-400 transform rotate-45"></div>
          <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-blue-400 transform rotate-45"></div>
        </div>
        
        {/* Large Bird */}
        <div className="absolute top-8 left-1/2 w-4 h-2 bg-blue-400 transform -translate-x-1/2">
          <div className="absolute -top-1 left-0 w-2 h-2 bg-blue-400 transform rotate-45"></div>
          <div className="absolute -top-1 right-0 w-2 h-2 bg-blue-400 transform -rotate-45"></div>
        </div>
        
        {/* Mountain Range */}
        <div className="absolute bottom-0 left-0 w-full h-4 bg-blue-200 transform skew-y-1">
          <div className="absolute top-0 left-1/4 w-3 h-3 bg-blue-300 transform -skew-y-1"></div>
          <div className="absolute top-0 left-1/2 w-4 h-3 bg-blue-300 transform -skew-y-1"></div>
          <div className="absolute top-0 right-1/4 w-3 h-3 bg-blue-300 transform -skew-y-1"></div>
        </div>
        
        {/* Large Kite */}
        <div className="absolute top-6 left-1/3 w-2 h-2 bg-blue-400 transform rotate-45">
          <div className="absolute -bottom-1 left-1/2 w-1 h-3 bg-blue-300 transform -translate-x-1/2"></div>
          <div className="absolute -bottom-3 left-1/2 w-0.5 h-2 bg-blue-500 transform -translate-x-1/2"></div>
        </div>
        
        {/* Raindrops */}
        <div className="absolute top-10 right-3 w-1 h-2 bg-blue-300 transform rotate-12"></div>
        <div className="absolute top-12 right-5 w-1 h-2 bg-blue-300 transform rotate-12"></div>
        <div className="absolute top-14 right-2 w-1 h-2 bg-blue-300 transform rotate-12"></div>
        
        {/* Small Cloud */}
        <div className="absolute bottom-4 left-3 w-6 h-3 bg-blue-100 rounded-full">
          <div className="absolute -top-1 left-1 w-2 h-2 bg-blue-100 rounded-full"></div>
          <div className="absolute -top-1 right-1 w-2 h-2 bg-blue-100 rounded-full"></div>
        </div>
        
        {/* Airplane */}
        <div className="absolute top-12 left-1/4 w-3 h-1 bg-blue-400 transform -translate-x-1/2">
          <div className="absolute -top-0.5 left-0 w-1 h-1 bg-blue-400 transform rotate-45"></div>
          <div className="absolute -top-0.5 right-0 w-1 h-1 bg-blue-400 transform -rotate-45"></div>
        </div>
      </div>
      
      {/* Main Content - Web Style */}
      <div className="relative z-10 text-center space-y-3">
        <div className="w-16 h-16 bg-blue-200 rounded-xl mx-auto flex items-center justify-center border-2 border-blue-300 shadow-sm">
          <div className="w-10 h-10 bg-blue-100 rounded-lg"></div>
        </div>
        <div className="space-y-2">
          <div className="w-20 h-3 bg-blue-300 rounded mx-auto"></div>
          <div className="w-16 h-2 bg-blue-100 rounded mx-auto"></div>
          <div className="w-12 h-2 bg-blue-200 rounded mx-auto"></div>
        </div>
        <div className="flex space-x-2 justify-center">
          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}





