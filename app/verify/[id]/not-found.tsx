import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Certificate Not Found</h2>
      <p className="mb-4">Sorry, we couldn't find the certificate you're looking for.</p>
      <Link href="/" className="text-blue-600 hover:underline">
        Return to Home
      </Link>
    </div>
  )
}

