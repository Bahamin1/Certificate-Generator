import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, recipientName, certificateType, date, issuingAuthority, qrCodeData, studentPhoto } = body

    const certificate = await prisma.certificate.create({
      data: {
        id, // Allow client-side ID or let DB generate if omitted (but we pass it currently)
        recipientName,
        certificateType,
        date,
        issuingAuthority,
        qrCodeData,
        studentPhoto,
      },
    })

    return NextResponse.json(certificate)
  } catch (error) {
    console.error('Error saving certificate:', error)
    return NextResponse.json({ error: 'Failed to save certificate' }, { status: 500 })
  }
}
