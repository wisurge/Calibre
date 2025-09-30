import React from 'react'

export const LilacDreamPreview = () => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 h-full relative overflow-hidden">
      {/* Web-style Doodle Background Elements */}
      <div className="absolute inset-0 opacity-30">
        {/* Large Lilac Bouquet */}
        <div className="absolute top-1 left-2 w-2 h-16 bg-purple-400 transform rotate-6">
          {/* Main Lilac Cluster */}
          <div className="absolute top-1 left-0 w-4 h-4 bg-purple-300 rounded-full"></div>
          <div className="absolute top-3 left-0 w-3 h-3 bg-pink-300 rounded-full"></div>
          <div className="absolute top-5 left-0 w-4 h-4 bg-purple-200 rounded-full"></div>
          <div className="absolute top-7 left-0 w-3 h-3 bg-pink-200 rounded-full"></div>
          <div className="absolute top-9 left-0 w-4 h-4 bg-purple-300 rounded-full"></div>
          <div className="absolute top-11 left-0 w-3 h-3 bg-pink-300 rounded-full"></div>
        </div>
        
        {/* Secondary Lilac Branch */}
        <div className="absolute top-3 right-3 w-2 h-12 bg-purple-300 transform -rotate-6">
          <div className="absolute top-2 left-0 w-3 h-3 bg-pink-300 rounded-full"></div>
          <div className="absolute top-4 left-0 w-4 h-4 bg-purple-200 rounded-full"></div>
          <div className="absolute top-6 left-0 w-3 h-3 bg-pink-200 rounded-full"></div>
          <div className="absolute top-8 left-0 w-4 h-4 bg-purple-300 rounded-full"></div>
        </div>
        
        {/* Floating Petals */}
        <div className="absolute top-8 left-1/2 w-2 h-2 bg-purple-300 rounded-full transform -translate-x-1/2"></div>
        <div className="absolute top-12 right-4 w-1 h-1 bg-pink-300 rounded-full"></div>
        <div className="absolute bottom-6 right-1/3 w-1 h-1 bg-purple-200 rounded-full"></div>
        <div className="absolute bottom-8 left-1/4 w-1 h-1 bg-pink-200 rounded-full"></div>
        
        {/* Large Butterfly */}
        <div className="absolute top-6 left-1/2 w-4 h-2 bg-pink-300 rounded-full transform -translate-x-1/2">
          <div className="absolute -top-1 left-0 w-2 h-2 bg-purple-300 rounded-full"></div>
          <div className="absolute -top-1 right-0 w-2 h-2 bg-purple-300 rounded-full"></div>
          <div className="absolute top-0 left-1 w-2 h-1 bg-pink-200 rounded-full"></div>
        </div>
        
        {/* Heart-shaped Leaves */}
        <div className="absolute bottom-3 right-4 w-4 h-4 bg-purple-200 transform rotate-45 rounded-full">
          <div className="absolute -top-1 left-1 w-3 h-3 bg-purple-200 transform -rotate-45 rounded-full"></div>
        </div>
        <div className="absolute bottom-1 left-4 w-3 h-3 bg-pink-200 transform rotate-45 rounded-full">
          <div className="absolute -top-1 left-1 w-2 h-2 bg-pink-200 transform -rotate-45 rounded-full"></div>
        </div>
        
        {/* Small Sprigs */}
        <div className="absolute bottom-4 left-1 w-1 h-4 bg-purple-300 transform rotate-45">
          <div className="absolute top-1 left-0 w-2 h-2 bg-purple-200 rounded-full"></div>
          <div className="absolute top-2 left-0 w-1 h-1 bg-pink-200 rounded-full"></div>
        </div>
      </div>
      
      {/* Main Content - Web Style */}
      <div className="relative z-10 text-center space-y-3">
        <div className="w-16 h-16 bg-purple-200 rounded-xl mx-auto flex items-center justify-center border-2 border-purple-300 shadow-sm">
          <div className="w-10 h-10 bg-pink-200 rounded-lg"></div>
        </div>
        <div className="space-y-2">
          <div className="w-20 h-3 bg-purple-300 rounded mx-auto"></div>
          <div className="w-16 h-2 bg-pink-200 rounded mx-auto"></div>
          <div className="w-12 h-2 bg-purple-200 rounded mx-auto"></div>
        </div>
        <div className="flex space-x-2 justify-center">
          <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
          <div className="w-3 h-3 bg-pink-300 rounded-full"></div>
          <div className="w-3 h-3 bg-purple-300 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}





