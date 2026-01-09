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
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-[#D4AF37] p-6 text-center">
          <h1 className="text-2xl font-serif font-bold text-slate-900">Certificate Verification</h1>
          <p className="text-slate-900/80 text-sm mt-1">Gilava English Academy</p>
        </div>

        <div className="p-8">
          <p className="text-slate-600 text-center mb-6">
            Enter the unique Certificate ID found on the bottom of the document or scan the QR code.
          </p>

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <Input
                placeholder="e.g. 1736428..."
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                className="text-center text-lg py-6 border-slate-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
              />
            </div>
            <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 text-lg">
              Verify Certificate
            </Button>
          </form>
        </div>

        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
          <p className="text-xs text-slate-400">© 2024 Gilava Academy. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
