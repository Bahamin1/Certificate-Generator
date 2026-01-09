'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function VerifyPage() {
  const [certificateId, setCertificateId] = useState('')
  const router = useRouter()

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (certificateId.trim()) {
      router.push(`/verify/${certificateId.trim()}`)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/10">
        <div className="bg-[#D4AF37] p-6 text-center">
          <h1 className="text-2xl font-serif font-bold text-gray-900">Certificate Verification</h1>
          <p className="text-gray-900/80 text-sm mt-1">Gilava English Academy</p>
        </div>

        <div className="p-8">
          <p className="text-gray-300 text-center mb-6">
            Enter the unique Certificate ID found on the bottom of the document or scan the QR code.
          </p>

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <Input
                placeholder="e.g. 1736428..."
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                className="text-center text-lg py-6 bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 text-lg font-semibold shadow-lg shadow-blue-500/20">
              Verify Certificate
            </Button>
          </form>
        </div>

        <div className="bg-gray-900/50 p-4 text-center border-t border-white/5">
          <p className="text-xs text-gray-500">© 2024 Gilava Academy. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
