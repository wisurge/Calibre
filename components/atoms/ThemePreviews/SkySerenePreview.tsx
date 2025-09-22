import React from 'react'

export const SkySerenePreview = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 h-full flex items-center justify-center">
      <div className="w-full h-full bg-gradient-to-br from-blue-200 to-blue-300 rounded relative overflow-hidden">
        {/* Cloud shapes */}
        <div className="absolute top-2 left-2 w-8 h-4 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-4 right-4 w-6 h-3 bg-white rounded-full opacity-60"></div>
        <div className="absolute bottom-4 left-4 w-4 h-2 bg-white rounded-full opacity-70"></div>
        <div className="absolute bottom-2 right-2 w-3 h-2 bg-white rounded-full opacity-50"></div>
        <div className="absolute top-6 left-1/2 w-5 h-2 bg-white rounded-full opacity-60 transform -translate-x-1/2"></div>
      </div>
    </div>
  )
}

