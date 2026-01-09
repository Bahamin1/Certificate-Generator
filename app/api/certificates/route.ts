import { NextResponse } from 'next/server'
import { saveCertificateToGitHub } from '@/lib/github'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Validation could go here

    // Save to GitHub (JSON)
    await saveCertificateToGitHub(body.id, body)

    // Save Image if provided
    if (body.imageData) {
      const { saveImageToGitHub } = await import('@/lib/github')
      await saveImageToGitHub(body.id, body.imageData)
    }

    return NextResponse.json({ success: true, id: body.id })
  } catch (error: any) {
    console.error('Error saving certificate:', error)
    return NextResponse.json({ error: error.message || 'Failed to save certificate' }, { status: 500 })
  }
}
