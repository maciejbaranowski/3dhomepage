import React, { useState, useEffect } from 'react'

function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsLoading(false)
          setShowWelcome(true)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  const closeWelcome = () => {
    setShowWelcome(false)
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
          <h2 className="text-2xl font-bold mb-4">Loading 3D Scene</h2>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-600">{Math.round(progress)}%</p>
        </div>
      </div>
    )
  }

  if (showWelcome) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 text-center max-w-lg mx-4">
          <h2 className="text-2xl font-bold mb-4">Welcome to Your 3D Homepage!</h2>
          <p className="text-gray-700 mb-6">
            Navigate using WASD or arrow keys. Click on the floating objects to visit your bookmarked sites.
            You can bookmark this page or set it as your homepage for easy access!
          </p>
          <button
            onClick={closeWelcome}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
          >
            Start Exploring
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default LoadingScreen