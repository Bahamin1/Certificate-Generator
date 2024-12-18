'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const ImageViewer = dynamic(() => import('@/components/ImageViewer'), {
  ssr: false,
  loading: () => <p>Loading image viewer...</p>
})

export default function VerifyPage() {
  const [imagePaths, setImagePaths] = useState([
    '/img19.jpg',
   
  ])
  const [newImagePath, setNewImagePath] = useState('')


  const handleResetImages = () => {
    setImagePaths([
      '/img19.jpg',
   
    ])
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-8 text-center text-blue-800">Certificate Verification</h1>
      <div className="mb-4 flex gap-2">
        <Input 
          type="text" 
          value={newImagePath} 
          onChange={(e) => setNewImagePath(e.target.value)}
          placeholder="Enter image path (e.g., /sample-certificate-4.jpg)"
        />
        <Button onClick={handleResetImages} variant="outline">Reset</Button>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <ImageViewer imagePaths={imagePaths} />
      </div>
    </div>
  )
}

