import React from 'react'

export const LilacDreamPreview = () => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 h-full flex items-center justify-center">
      <div className="w-full h-full bg-gradient-to-br from-purple-200 via-pink-200 to-purple-300 rounded opacity-70 relative overflow-hidden">
        <div className="absolute top-2 left-2 w-8 h-8 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-6 right-4 w-6 h-6 bg-white rounded-full opacity-40"></div>
        <div className="absolute bottom-4 left-6 w-4 h-4 bg-white rounded-full opacity-50"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 bg-white rounded-full opacity-60"></div>
      </div>
    </div>
  )
}


