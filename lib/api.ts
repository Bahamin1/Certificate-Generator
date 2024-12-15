import { CertificateType } from '@/components/GilavaCertificate'

// Mock database
let certificates: { [key: string]: CertificateType } = {}

export async function saveCertificate(certificate: CertificateType): Promise<CertificateType> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  certificates[certificate.id] = certificate
  return certificate
}

export async function getCertificate(id: string): Promise<CertificateType | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return certificates[id] || null
}

