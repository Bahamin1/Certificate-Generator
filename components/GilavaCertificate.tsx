'use client'

import { Button } from '@/components/ui/button'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import Image from 'next/image'
import { QRCodeSVG } from 'qrcode.react'
import React, { useRef } from 'react'

export interface CertificateType {
  recipientName: string
  certificateType: string
  courseName: string
  date: string
  issuingAuthority: string
  qrCodeData: string
  id: string
}

interface CertificateProps {
  recipientName: string
  certificateType: string
  courseName: string
  date: string
  issuingAuthority: string
  qrCodeData: string
}

const GilavaCertificate: React.FC<CertificateProps> = ({
  recipientName,
  certificateType,
  courseName,
  date,
  issuingAuthority,
  qrCodeData
}) => {
  const certificateRef = useRef<HTMLDivElement>(null)

  const downloadAsPDF = async () => {
    if (certificateRef.current) {
      const canvas = await html2canvas(certificateRef.current, { scale: 2 })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      })
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const imgWidth = pdfWidth
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      pdf.save(`certificate-${recipientName.replace(/\s+/g, '-').toLowerCase()}.pdf`)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={certificateRef} 
        className="w-[297mm] h-[210mm] bg-white p-8 rounded-lg shadow-2xl border-8 border-blue-700 relative overflow-hidden"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-opacity-10 z-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        
        {/* Certificate Content */}
        <div className="relative z-10">
          {/* Header with Logos */}
          <div className="flex justify-between items-start mb-2">
            <Image
              src="/logo1.png"
              alt="Gilava English Academy Logo"
              width={220}
              height={250}
              className="object-contain"
            />
             {/* Title */}
          <h1 className="text-5xl md:text-5xl font-serif text-blue-800 mt-9 mb-1 text-center" style={{
            textShadow: '2px 2px 4px rgba(33, 41, 112, 0.63)',
            fontFamily: "'Playfair Display', serif"
          }}>
            Gilava English Academy
          </h1>
            <Image
              src="/IELA.png"
              alt="IELA Logo"
              width={170}
              height={170}
              className="object-contain"
            />
          </div>
          
           {/* Title */}
           <h1 className="absolute z-5 top-1/1 left-2/1 -translate-x-2/2 -translate-y-3/4 object-contain opacity-100 pointer-events-none relative text-5xl mb-4 md:text-4xl font-serif text-blue-1000  mt-0 mb-1 text-center" style={{
            textShadow: '2px 2px 4px rgb(142, 142, 144)',
            fontFamily: "'Playfair Display', serif"
          }}>
            Graduation
          </h1>
          
         
          
          {/* Certificate Type */}
          <div className="text-4xl mb-2 font-bold text-center text-gold-600" style={{color: '#D4AF37'}}>
            {certificateType} Certificate
          </div>
          
          {/* Main Content */}
          <div className="text-center font-bold mb-2">
            <p className="text-2xl mb-2" style={{
            textShadow: '2px 2px 4px rgba(33, 41, 112, 0.63)',
            fontFamily: "'Playfair Display', serif"
          }}>This is to certify that</p>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-2" style={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.63)',
            fontFamily: "'Open Sans', serif"
          }}>
              {recipientName}
            </h2>
            <p className="text-2xl font-bold mb-2" style={{
            textShadow: '2px 2px 4px rgba(33, 41, 112, 0.63)',
            fontFamily: "'Playfair Display', serif"
          }} >Has successfully completed</p>
            <p className=" relative text-4xl md:text-3xl font-bold text-red-600 mb-2" style={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.63)',
            fontFamily: "'Open Sans', serif"
          }} > <Image
          src="/right.png"
          alt="right Logo"
          width={200}
          height={200}
          className=" absolute bottom-12 right-16 w-40"
        />  {courseName} <Image
          src="/left.png"
          alt="left Logo"
          width={200}
          height={200}
          className="absolute bottom-12 left-16 w-40"
        /></p>
          <h1 className="text-xl font-bold mb-8" style={{
            textShadow: '2px 2px 4px rgba(170, 168, 168, 0.79)',
            fontFamily: "'Open Sans', serif"
          }}>This certificate serves as a token of {recipientName}&apos;s accomplishment. We wish them continued success in all future endeavors.</h1>
          </div>
          
          {/* Date and Issuing Authority */}
          <div className=" text-gray-800 flex justify-between items-end mb-12">
          <div className="relative"> {/* Parent relative baraye position tasvir */}
            <p className="text-xl font-semibold">Date of Issue:</p>
            <p className="text-xl mx-4">{date}</p>
            
          </div>
          <div className="text-right">
            <p className="text-xl mx-8 font-semibold">Issuing Authority:</p>
            <p className="text-xl">{issuingAuthority}</p>
            <Image
              src="/Stamp.png"
              alt="Stamp Logo"
              width={200}
              height={200}
              className="absolute z-10 top-2/2 left-2/1 -translate-x-2/2 -translate-y-2/4 object-contain opacity-100 pointer-events-none"
            />
            </div>
          </div>
          
          {/* Signature Line */}
          <div className="relative">
            <div className="w-72 h-px bg-gray-400 mb-2"></div>
            <p className="text-lg text-gray-600">Authorized Signature</p>
            <Image
              src="/sign.png"
              alt="sign Logo"
              width={250}
              height={250}
              className="absolute mx-20 z-10 top-1/2 left-2/2 -translate-x-2/2 -translate-y-1/2 object-contain opacity-100 pointer-events-none"
            />
          </div>
          
          {/* QR Code */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-32">
            <QRCodeSVG value={qrCodeData} size={110} />
            <h1 className='font-bold mb-2'>Certificate No: {qrCodeData.slice(54)}</h1>

          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-40 h-40 border-t-8 border-l-8 border-blue-700 rounded-tl-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 border-b-8 border-r-8 border-blue-700 rounded-br-3xl"></div>
      </div>
      <Button onClick={downloadAsPDF} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Download PDF
      </Button>
    </div>
  )
}

export default GilavaCertificate

