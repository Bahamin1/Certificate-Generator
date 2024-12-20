import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Simulate some server-side processing
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Generate a mock certificate
    const certificate = {
      id: Math.floor(Math.random() * 1000000),
      ...body,
      createdAt: new Date().toISOString()
    }

    return NextResponse.json(certificate, { status: 201 })
  } catch (error) {
    console.error('Error in certificate generation:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

