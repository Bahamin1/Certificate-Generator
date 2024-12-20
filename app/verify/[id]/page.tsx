import CertificateDetails from '@/components/CertificateDetails'
import { CertificateDetailsSkeleton } from '@/components/CertificateDetailsSkeleton'
import { Suspense } from 'react'

interface VerifyCertificatePageProps {
  params: { id: string }
}

export default function VerifyCertificatePage({ params }: VerifyCertificatePageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Certificate Verification</h1>
      <Suspense fallback={<CertificateDetailsSkeleton />}>
        <CertificateDetails id={params.id} />
      </Suspense>
    </div>
  )
}

