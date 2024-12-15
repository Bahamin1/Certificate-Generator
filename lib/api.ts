import { CertificateType } from '@/components/GilavaCertificate'

const mockCertificates: { [key: string]: CertificateType } = {
  '123456': {
    id: '123456',
    recipientName: 'John Doe',
    certificateType: 'B2',
    courseName: 'Advanced English',
    date: '2023-06-15',
    issuingAuthority: 'Gilava English Academy',
    qrCodeData: 'https://gilava.com/verify/123456'
  },
  // Add more mock certificates as needed
}

export async function getCertificate(id: string): Promise<CertificateType | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return mockCertificates[id] || null
}

