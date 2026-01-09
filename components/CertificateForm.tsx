'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import GilavaCertificate, { CertificateType } from './GilavaCertificate'

import { toJpeg } from 'html-to-image'

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

  // ... (existing handlers) - Restoring...

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
        qrCodeData: `https://gilava-academy.vercel.app/verify/${generatedId}`,
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
      const node = document.getElementById('gilava-certificate-frame')
      let imageData = ''

      if (node) {
        // Use JPEG for storage. Consistently target ONLY the A4 frame.
        // Quality 0.95 and PixelRatio 2.5 for high res ~2-3MB.
        imageData = await toJpeg(node, {
          quality: 0.95,
          pixelRatio: 2.5,
        })
      }

      const response = await fetch('/api/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...certificate,
          imageData // Send base64 image
        }),
      })

      if (response.ok) {
        toast.success('Certificate and Image saved to GitHub!')
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
        <div className="flex gap-4 w-full max-w-4xl justify-between items-center bg-gray-800/50 backdrop-blur-sm border border-white/10 p-4 rounded-lg shadow-sm">
          <Button variant="outline" onClick={() => setCertificate(null)} className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
            ← Back to Edit
          </Button>
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={isLoading} className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg shadow-green-900/20">
              {isLoading ? 'Saving...' : 'Save to Database'}
            </Button>
          </div>
        </div>
        <div id="certificate-display" className="transform scale-[0.8] origin-top md:scale-100 bg-white">
          {/* Added bg-white to ensure capture has background if transparent */}
          <GilavaCertificate {...certificate} />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto bg-gray-800/80 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/10">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">New Certificate</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="recipientName" className="text-gray-300">Recipient&apos;s Name</Label>
          <Input
            id="recipientName"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleInputChange}
            required
            className="mt-1.5 bg-gray-900/50 border-gray-600 text-white placeholder:text-gray-500 focus:border-blue-500"
            placeholder="e.g. John Doe"
          />
        </div>
        <div>
          <Label htmlFor="certificateType" className="text-gray-300">Certificate Type</Label>
          <Select onValueChange={handleSelectChange} required value={formData.certificateType}>
            <SelectTrigger className="mt-1.5 bg-gray-900/50 border-gray-600 text-white focus:border-blue-500">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              <SelectItem value="A1" className="focus:bg-gray-700 focus:text-white">A1 Beginner</SelectItem>
              <SelectItem value="A2" className="focus:bg-gray-700 focus:text-white">A2 Elementary</SelectItem>
              <SelectItem value="B1" className="focus:bg-gray-700 focus:text-white">B1 Intermediate</SelectItem>
              <SelectItem value="B2" className="focus:bg-gray-700 focus:text-white">B2 Upper Intermediate</SelectItem>
              <SelectItem value="C1" className="focus:bg-gray-700 focus:text-white">C1 Advanced</SelectItem>
              <SelectItem value="C2" className="focus:bg-gray-700 focus:text-white">C2 Proficiency</SelectItem>
              <SelectItem value="TOEFL" className="focus:bg-gray-700 focus:text-white">TOEFL</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="date" className="text-gray-300">Date of Issue</Label>
          <Input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
            required
            className="mt-1.5 bg-gray-900/50 border-gray-600 text-white focus:border-blue-500 [color-scheme:dark]"
          />
        </div>
        <div>
          <Label htmlFor="studentPhoto" className="text-gray-300">Student Photo (Optional)</Label>
          <Input
            id="studentPhoto"
            name="studentPhoto"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="mt-1.5 cursor-pointer bg-gray-900/50 border-gray-600 text-gray-300 file:bg-gray-700 file:text-white file:border-0 file:mr-4 file:px-4 file:py-2 file:rounded-md hover:file:bg-gray-600"
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 text-lg mt-4 shadow-lg shadow-blue-500/20 font-semibold">
          {isLoading ? 'Generating...' : 'Generate Certificate'}
        </Button>
      </form>
    </div>
  )
}

