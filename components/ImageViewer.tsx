'use client'

import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface ImageViewerProps {
  imagePaths: string[]
}

export default function ImageViewer({ imagePaths }: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false) // State for fullscreen

  useEffect(() => {
    setCurrentIndex(0)
    setIsLoading(true)
    setError(null)
  }, [imagePaths])

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
    setError('Failed to load image. Please check the file path and try again.')
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative ${
          isFullscreen ? 'w-screen h-screen' : 'w-full max-w-2xl aspect-video'
        }`}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <p className="text-red-500 text-center">{error}</p>
          </div>
        )}
        <Image
          src={imagePaths[currentIndex]}
          alt={`Certificate image ${currentIndex + 1}`}
          fill
          style={{ objectFit: 'contain' }}
          onLoad={handleImageLoad}
          onError={handleImageError}
          onClick={toggleFullscreen} // Toggle fullscreen on click
          className="cursor-pointer"
        />
        {isFullscreen && (
          <button
            onClick={toggleFullscreen}
            className="absolute top-2 right-2 bg-black text-white px-3 py-1 rounded"
          >
            Close
          </button>
        )}
      </div>
    </div>
  )
}
