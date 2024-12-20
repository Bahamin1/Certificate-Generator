'use client'

import { Button } from '@/components/ui/button'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import Image from 'next/image'
import { QRCodeSVG } from 'qrcode.react'
import { useRef } from 'react'

interface Certificate {
  id: string;
  name: string;
  type: string;
  date: string;
}

interface CertificatePreviewProps {
  certificate: Certificate;
}

export default function CertificatePreview({ certificate }: CertificatePreviewProps) {
  const certificateRef = useRef<HTMLDivElement>(null)

  const downloadAsPDF = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current)
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      })
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
      pdf.save(`certificate-${certificate.id}.pdf`)
    }
  }

  return (
    <div className="space-y-4">
      <div ref={certificateRef} className="w-full max-w-4xl mx-auto bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-lg shadow-2xl border-8 border-amber-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-amber-200 opacity-10 z-0"></div>
        <div className="relative z-10">
          {/* Logo */}
          <div className="text-center mb-6">
            <Image src="/logo.png" alt="Logo" width={120} height={120} className="mx-auto" />
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mb-6">Certificate of Achievement</h1>
          
          {/* Certification Text */}
          <p className="text-xl mb-2">This is to certify that</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">{certificate.name}</h2>
          <p className="text-xl mb-2">has successfully completed</p>
          <p className="text-lg text-gray-600 mb-8">{certificate.type}</p>
          
          {/* Date */}
          <p className="text-lg text-gray-700">
            Date: <span className="font-bold">{new Date(certificate.date).toLocaleDateString()}</span>
          </p>
          
          {/* Signature */}
          <div className="mt-12 flex justify-between items-end">
            <div>
              <div className="w-48 h-0.5 bg-gray-400 mb-2"></div>
              <p className="text-left text-sm text-gray-600">Authorized Signature</p>
            </div>
            
            {/* QR Code */}
            <div className="w-24 h-24">
              <QRCodeSVG value={`https://example.com/certificate/${certificate.id}`} width="100%" height="100%" />
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-amber-300 rounded-tl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-amber-300 rounded-br-3xl"></div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <Button onClick={downloadAsPDF} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded">
          Download Certificate
        </Button>
      </div>
    </div>
  )
}

