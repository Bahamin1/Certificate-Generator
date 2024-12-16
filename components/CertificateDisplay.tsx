interface Certificate {
  certificate_number: string;
  recipient_name: string;
  certificate_type: string;
  course_name: string;
  date_issued: string;
  issuing_authority: string;
}

interface CertificateDisplayProps {
  certificate: Certificate;
}

export default function CertificateDisplay({ certificate }: CertificateDisplayProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Certificate Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Certificate Number:</p>
          <p>{certificate.certificate_number}</p>
        </div>
        <div>
          <p className="font-semibold">Recipient Name:</p>
          <p>{certificate.recipient_name}</p>
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
          <p className="font-semibold">Date Issued:</p>
          <p>{new Date(certificate.date_issued).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="font-semibold">Issuing Authority:</p>
          <p>{certificate.issuing_authority}</p>
        </div>
      </div>
    </div>
  )
}

