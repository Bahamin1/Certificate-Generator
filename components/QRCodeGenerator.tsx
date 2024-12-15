'use client'

import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

interface QRCodeGeneratorProps {
  data: string
}

export default function QRCodeGenerator({ data }: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, data, (error) => {
        if (error) console.error('Error generating QR code', error)
      })
    }
  }, [data])

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Certificate QR Code</h3>
      <canvas ref={canvasRef} />
    </div>
  )
}

