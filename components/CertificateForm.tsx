'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import GilavaCertificate, { CertificateType } from './GilavaCertificate'

export default function CertificateForm() {
  const [formData, setFormData] = useState({
    recipientName: '',
    certificateType: '',
    courseName: '',
    date: '',
    issuingAuthority: 'Gilava English Academy',
  })
  const [certificate, setCertificate] = useState<CertificateType | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [certificateNumber, setCertificateNumber] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, certificateType: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('/api/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          certificateNumber: Date.now().toString(), // Generate a unique certificate number
          recipientName: formData.recipientName,
          certificateType: formData.certificateType,
          courseName: formData.courseName,
          dateIssued: formData.date,
          issuingAuthority: formData.issuingAuthority,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create certificate')
      }

      const data = await response.json()
      setCertificate(data.certificate)
      setCertificateNumber(data.certificate.certificate_number)
      toast.success('Certificate generated successfully!')
    } catch (error) {
      console.error('Error generating certificate:', error)
      toast.error('Error generating certificate')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <form onSubmit={handleSubmit} className="space-y-4 w-full lg:w-1/3">
        <div>
          <Label htmlFor="recipientName">Recipient&apos;s Name</Label>
          <Input
            id="recipientName"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleInputChange}
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="certificateType">Certificate Type</Label>
          <Select onValueChange={handleSelectChange} required>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select certificate type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A1">A1</SelectItem>
              <SelectItem value="A2">A2</SelectItem>
              <SelectItem value="B1">B1</SelectItem>
              <SelectItem value="B2">B2</SelectItem>
              <SelectItem value="C1">C1</SelectItem>
              <SelectItem value="TOEFL">TOEFL</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="courseName">Course Name</Label>
          <Input
            id="courseName"
            name="courseName"
            value={formData.courseName}
            onChange={handleInputChange}
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="date">Date of Issue</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="mt-1"
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Generating...' : 'Generate Certificate'}
        </Button>
      </form>
      {certificate && (
        <div className="w-full lg:w-2/3">
          <GilavaCertificate {...certificate} />
        </div>
      )}
    </div>
  )
}

