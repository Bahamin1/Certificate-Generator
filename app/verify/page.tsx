import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import CertificateDisplay from '@/components/CertificateDisplay'
import { CertificateDetailsSkeleton } from '@/components/CertificateDetailsSkeleton'
import { toast } from 'react-hot-toast'
import { Search } from 'lucide-react'

const CertificateVerification = () => {
  const [certificateNumber, setCertificateNumber] = useState('')
  const [certificate, setCertificate] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/certificates?certificateNumber=${certificateNumber}`)
      if (!response.ok) {
        throw new Error('Certificate not found')
      }
      const data = await response.json()
      setCertificate(data.certificate)
      toast.success('Certificate verified successfully!')
    } catch (error) {
      setError('Failed to retrieve certificate. Please check the certificate number and try again.')
      toast.error('Certificate verification failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Certificate Verification</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4 relative">
          <Label htmlFor="certificateNumber" className="text-lg">Enter Certificate Number</Label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <Input
              id="certificateNumber"
              value={certificateNumber}
              onChange={(e) => setCertificateNumber(e.target.value)}
              required
              className="pr-10"
              placeholder="e.g., CERT-123456"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Verifying...' : 'Verify Certificate'}
        </Button>
      </form>

      {isLoading && <CertificateDetailsSkeleton />}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {certificate && (
        <>
          <CertificateDisplay certificate={certificate} />
          <div className="mt-4 text-center">
            <p className="text-green-600 font-semibold">✓ This certificate is valid and verified.</p>
          </div>
        </>
      )}
    </div>
  )
}

export default CertificateVerification

