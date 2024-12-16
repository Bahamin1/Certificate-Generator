import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function POST(request: Request) {
  try {
    const { certificateNumber, recipientName, certificateType, courseName, dateIssued, issuingAuthority } = await request.json()
    
    const result = await sql`
      INSERT INTO certificates (certificate_number, recipient_name, certificate_type, course_name, date_issued, issuing_authority)
      VALUES (${certificateNumber}, ${recipientName}, ${certificateType}, ${courseName}, ${dateIssued}, ${issuingAuthority})
      RETURNING *
    `
    
    return NextResponse.json({ certificate: result.rows[0] }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create certificate' }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const certificateNumber = searchParams.get('certificateNumber')

  if (!certificateNumber) {
    return NextResponse.json({ error: 'Certificate number is required' }, { status: 400 })
  }

  try {
    const result = await sql`
      SELECT * FROM certificates WHERE certificate_number = ${certificateNumber}
    `
    
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 })
    }

    return NextResponse.json({ certificate: result.rows[0] })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve certificate' }, { status: 500 })
  }
}

