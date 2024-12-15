import { NextApiRequest, NextApiResponse } from 'next'
import { Pool } from 'pg'
import QRCode from 'qrcode'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { recipientName, certificateType, courseName, issueDate, issuingAuthority } = req.body

      // Generate a unique certificate number
      const certificateNumber = `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

      // Generate QR code
      const qrCodeUrl = await QRCode.toDataURL(`${process.env.NEXT_PUBLIC_SITE_URL}/verify/${certificateNumber}`)

      // Insert into database
      const result = await pool.query(
        'INSERT INTO certificates (certificate_number, recipient_name, certificate_type, course_name, issue_date, issuing_authority, qr_code_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [certificateNumber, recipientName, certificateType, courseName, issueDate, issuingAuthority, qrCodeUrl]
      )

      res.status(201).json(result.rows[0])
    } catch (error) {
      console.error('Error saving certificate:', error)
      res.status(500).json({ error: 'Error saving certificate' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

