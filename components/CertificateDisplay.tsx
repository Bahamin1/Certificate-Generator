interface Certificate {
  recipientName: string;
  date: string;
  certificateType: string;
  id: string;
}

interface CertificateDisplayProps {
  certificate: Certificate;
}

export default function CertificateDisplay({ certificate }: CertificateDisplayProps) {
  return (
    <div className="border-2 border-gray-300 p-4 rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Certificate Details</h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> {certificate.recipientName}</p>
        <p><strong>Date:</strong> {new Date(certificate.date).toLocaleDateString()}</p>
        <p><strong>Type:</strong> {certificate.certificateType}</p>
        <p><strong>Certificate ID:</strong> {certificate.id}</p>
      </div>
    </div>
  )
}

