import { getCertificate } from '@/lib/api'
import { notFound } from 'next/navigation'

interface CertificateDetailsProps {
  id: string
}

export default async function CertificateDetails({ id }: CertificateDetailsProps) {
  const certificate = await getCertificate(id)

  if (!certificate) {
    notFound()
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-800">Certificate Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Certificate Holder:</p>
          <p>{certificate.recipientName}</p>
        </div>
        <div>
          <p className="font-semibold">Certificate Number:</p>
          <p>{certificate.id}</p>
        </div>
        <div>
          <p className="font-semibold">Certificate Type:</p>
          <p>{certificate.certificateType}</p>
        </div>
        <div>
          <p className="font-semibold">Course Name:</p>
          <p>{certificate.courseName}</p>
        </div>
        <div>
          <p className="font-semibold">Date of Issue:</p>
          <p>{certificate.date}</p>
        </div>
        <div>
          <p className="font-semibold">Issuing Authority:</p>
          <p>{certificate.issuingAuthority}</p>
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-green-600 font-semibold">✓ This certificate is valid and verified.</p>
      </div>
    </div>
  )
}

