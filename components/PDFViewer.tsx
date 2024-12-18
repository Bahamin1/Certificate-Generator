'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

const pdfPath = `public/sample-certificate.pdf`

export default function PDFViewer({ pdfPath }: { pdfPath: string }) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setNumPages(null)
    setPageNumber(1)
    setIsLoading(true)
    setError(null)
  }, [pdfPath])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    setIsLoading(false)
  }

  function onDocumentLoadError(error: Error) {
    console.error('Error loading PDF:', error)
    setIsLoading(false)
    setError('Failed to load PDF. Please check the file path and try again.')
  }

  return (
    <div className="flex flex-col items-center">
      {isLoading && (
        <div className="flex items-center justify-center w-full min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center my-4">
          <p>{error}</p>
          <p className="mt-2">Make sure the PDF file is in the public folder and the path is correct.</p>
        </div>
      )}
      <Document
        file={pdfPath}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        loading={
          <div className="flex items-center justify-center w-full min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        }
        className="max-w-full"
      >
        {numPages && (
          <Page 
            pageNumber={pageNumber} 
            className="shadow-lg"
            width={typeof window !== 'undefined' ? Math.min(window.innerWidth - 32, 800) : 800}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        )}
      </Document>
      {numPages && (
        <div className="mt-4 space-y-2">
          <p className="text-center">
            Page {pageNumber} of {numPages}
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              onClick={() => setPageNumber(page => Math.max(page - 1, 1))}
              disabled={pageNumber <= 1}
              variant="outline"
            >
              Previous
            </Button>
            <Button
              onClick={() => setPageNumber(page => Math.min(page + 1, numPages))}
              disabled={pageNumber >= numPages}
              variant="outline"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

