import { notFound } from 'next/navigation'

async function getCertificate(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/certificates/${id}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default async function CertificateDetails({ id }: { id: string }) {
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
          <p>{certificate.recipient_name}</p>
        </div>
        <div>
          <p className="font-semibold">Certificate Number:</p>
          <p>{certificate.certificate_number}</p>
        </div>
        <div>
          <p className="font-semibold">Certificate Type:</p>
          <p>{certificate.certificate_type}</p>
        </div>
        <div>
          <p className="font-semibold">Course Name:</p>
          <p>{certificate.course_name}</p>
        </div>
        <div>
          <p className="font-semibold">Date of Issue:</p>
          <p>{new Date(certificate.issue_date).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="font-semibold">Issuing Authority:</p>
          <p>{certificate.issuing_authority}</p>
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-green-600 font-semibold">✓ This certificate is valid and verified.</p>
      </div>
    </div>
  )
}

