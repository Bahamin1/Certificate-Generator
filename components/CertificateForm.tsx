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
    date: '',
    issuingAuthority: 'Gilava English Academy',
  })
  const [certificate, setCertificate] = useState<CertificateType | null>(null)
  const [studentPhoto, setStudentPhoto] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, certificateType: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setStudentPhoto(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      const generatedId = Date.now().toString()
      const generatedCertificate: CertificateType = {
        ...formData,
        id: generatedId,
        qrCodeData: `https://gilava-academy.app/verify/${generatedId}`,
        studentPhoto: studentPhoto
      }
      setCertificate(generatedCertificate)
      toast.success('Certificate generated successfully!')
    } catch (error) {
      console.error('Error generating certificate:', error)
      toast.error('Error generating certificate')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!certificate) return
    setIsLoading(true)
    try {
      const response = await fetch('/api/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(certificate),
      })

      if (response.ok) {
        toast.success('Certificate saved to database!')
      } else {
        toast.error('Failed to save certificate.')
      }
    } catch (error) {
      console.error('Save error:', error)
      toast.error('Error saving certificate.')
    } finally {
      setIsLoading(false)
    }
  }

  if (certificate) {
    return (
      <div className="flex flex-col items-center gap-6 w-full animate-in fade-in duration-500">
        <div className="flex gap-4 w-full max-w-4xl justify-between items-center bg-slate-100 p-4 rounded-lg shadow-sm">
          <Button variant="outline" onClick={() => setCertificate(null)}>
            ← Back to Edit
          </Button>
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={isLoading} className="bg-green-600 hover:bg-green-700 text-white">
              {isLoading ? 'Saving...' : 'Save to Database'}
            </Button>
          </div>
        </div>
        <div className="transform scale-[0.8] origin-top md:scale-100">
          <GilavaCertificate {...certificate} />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-slate-100">
      <h2 className="text-2xl font-bold mb-6 text-slate-800 text-center">New Certificate</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="recipientName">Recipient&apos;s Name</Label>
          <Input
            id="recipientName"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleInputChange}
            required
            className="mt-1.5"
            placeholder="e.g. John Doe"
          />
        </div>
        <div>
          <Label htmlFor="certificateType">Certificate Type</Label>
          <Select onValueChange={handleSelectChange} required value={formData.certificateType}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A1">A1 Beginner</SelectItem>
              <SelectItem value="A2">A2 Elementary</SelectItem>
              <SelectItem value="B1">B1 Intermediate</SelectItem>
              <SelectItem value="B2">B2 Upper Intermediate</SelectItem>
              <SelectItem value="C1">C1 Advanced</SelectItem>
              <SelectItem value="C2">C2 Proficiency</SelectItem>
              <SelectItem value="TOEFL">TOEFL</SelectItem>
            </SelectContent>
          </Select>
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
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="studentPhoto">Student Photo (Optional)</Label>
          <Input
            id="studentPhoto"
            name="studentPhoto"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="mt-1.5 cursor-pointer"
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full bg-blue-900 hover:bg-blue-800 text-white py-6 text-lg mt-4">
          {isLoading ? 'Generating...' : 'Generate Certificate'}
        </Button>
      </form>
    </div>
  )
}

