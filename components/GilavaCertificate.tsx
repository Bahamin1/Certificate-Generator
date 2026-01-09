'use client'

import { Button } from '@/components/ui/button'
import * as htmlToImage from 'html-to-image'
import jsPDF from 'jspdf'
import Image from 'next/image'
import { QRCodeSVG } from 'qrcode.react'
import React, { useRef } from 'react'

export interface CertificateType {
  recipientName: string
  certificateType: string
  date: string
  issuingAuthority: string
  qrCodeData: string
  studentPhoto?: string
  id: string
}

interface CertificateProps {
  recipientName: string
  certificateType: string
  date: string
  issuingAuthority: string
  qrCodeData: string
  studentPhoto?: string
}

const CEFR_DESCRIPTIONS: Record<string, string> = {
  'A1': 'This certification attests that the candidate has attained A1 Beginner level in English as defined by the CEFR. At this level, the individual can understand and use familiar everyday expressions and very basic phrases aimed at the satisfaction of needs of a concrete type.',
  'A2': 'This certification attests that the candidate has attained A2 Elementary level in English as defined by the CEFR. At this level, the individual can understand sentences and frequently used expressions related to areas of most immediate relevance.',
  'B1': 'This certification attests that the candidate has attained B1 Intermediate level in English as defined by the CEFR. At this level, the individual can understand the main points of clear standard input on familiar matters regularly encountered in work, school, leisure, etc.',
  'B2': 'This certification attests that the candidate has attained B2 Upper Intermediate level in English as defined by the CEFR. At this level, the individual can understand the main ideas of complex text on both concrete and abstract topics, including technical discussions in their field of specialization.',
  'C1': 'This certification attests that the candidate has attained C1 Advanced level in English as defined by the CEFR. At this level, the individual can understand a wide range of demanding, longer texts, and recognize implicit meaning.',
  'C2': 'This certification attests that the candidate has attained C2 Proficiency in English as defined by the CEFR. At this level, the individual demonstrates exceptional control of complex language structures, nuanced expression, and advanced comprehension across a wide range of academic, professional, and social contexts.',
  'TOEFL': 'This certification attests that the candidate has successfully completed a comprehensive TOEFL preparation program, demonstrating readiness for academic English environments and proficiency in reading, listening, speaking, and writing.'
}

const GilavaCertificate: React.FC<CertificateProps> = ({
  recipientName,
  certificateType,
  date,
  issuingAuthority,
  qrCodeData,
  studentPhoto
}) => {
  const certificateRef = useRef<HTMLDivElement>(null)

  // State to hold base64 versions of static images to prevent swapping issues during export
  const [staticImages, setStaticImages] = React.useState({
    logo: '/logo1.png',
    sign: '/sign.png',
    stamp: '/Stamp.png'
  });

  React.useEffect(() => {
    const convertToBase64 = async (path: string): Promise<string> => {
      try {
        const response = await fetch(path);
        const blob = await response.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      } catch (e) {
        console.error('Failed to load image', path, e);
        return path;
      }
    };

    const loadImages = async () => {
      const [logo, sign, stamp] = await Promise.all([
        convertToBase64('/logo1.png'),
        convertToBase64('/sign.png'),
        convertToBase64('/Stamp.png')
      ]);
      setStaticImages({ logo, sign, stamp });
    };

    loadImages();
  }, []);

  const downloadAsImage = async () => {
    if (certificateRef.current) {
      try {
        // Force load fonts via standard CSS for export
        const dataUrl = await htmlToImage.toPng(certificateRef.current, {
          quality: 1.0,
          pixelRatio: 4,
          backgroundColor: '#ffffff',
          cacheBust: true,
          skipAutoScale: true,
          filter: (node) => {
            // Exclude external stylesheets that might cause CORS/SecurityErrors
            // We are providing the critical formatting via the injected <style> and inline styles.
            if (node.tagName === 'LINK' && (node as HTMLLinkElement).rel === 'stylesheet') {
              return false;
            }
            return true;
          }
        });

        const link = document.createElement('a');
        link.download = `certificate-${recipientName.replace(/\s+/g, '-').toLowerCase()}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Image download failed", err);
      }
    }
  }

  const downloadAsPDF = async () => {
    if (certificateRef.current) {
      try {
        const dataUrl = await htmlToImage.toPng(certificateRef.current, {
          quality: 1.0,
          pixelRatio: 4,
          backgroundColor: '#ffffff',
          cacheBust: true,
          skipAutoScale: true,
          filter: (node) => {
            // Same filter for PDF
            if (node.tagName === 'LINK' && (node as HTMLLinkElement).rel === 'stylesheet') {
              return false;
            }
            return true;
          }
        });

        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        })

        const imgProps = pdf.getImageProperties(dataUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`certificate-${recipientName.replace(/\s+/g, '-').toLowerCase()}.pdf`);
      } catch (err) {
        console.error("PDF download failed", err);
      }
    }
  }

  // Fallback description if type not found
  const description = CEFR_DESCRIPTIONS[certificateType] || `This certification attests that the candidate has successfully completed the ${certificateType} level curriculum at Gilava English Academy.`

  return (
    <div className="flex flex-col items-center">
      {/* Explicitly load fonts for html-to-image capture */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
      `}</style>

      <div
        id="gilava-certificate-frame"
        ref={certificateRef}
        className="w-[297mm] h-[210mm] bg-white text-slate-900 relative overflow-hidden shadow-xl"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {/* Border Frame */}
        <div className="absolute inset-4 border-4 border-double border-[#D4AF37] z-10 p-2">
          <div className="absolute inset-0 border border-slate-900/20"></div>
          {/* Corner Ornaments */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-slate-900/80 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-slate-900/80 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-slate-900/80 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-slate-900/80 rounded-br-lg"></div>
        </div>

        {/* Background Watermark/Texture */}
        <div className="absolute inset-0 z-0 bg-white" style={{
          backgroundImage: `radial-gradient(circle at center, transparent 0%, rgba(212, 175, 55, 0.05) 100%)`
        }}>
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
            <Image src={staticImages.logo} alt="Watermark" width={700} height={700} unoptimized />
          </div>
          {/* Subtle Guilloche-like pattern overlay (CSS pattern) */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)`,
            backgroundSize: '10px 10px'
          }}></div>
        </div>

        {/* Content Container */}
        <div className="relative z-20 h-full flex flex-col px-16 py-8 justify-between">

          {/* Header */}
          <div className="flex justify-between items-start w-full px-8 pt-2">
            <Image src={staticImages.logo} alt="Gilava Logo" width={130} height={130} className="object-contain" unoptimized />
            <div className="text-center flex-grow pt-4">
              <h1 className="text-4xl font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900" style={{ letterSpacing: '0.15em' }}>
                Gilava Academy
              </h1>
              <div className="flex items-center justify-center mb-1 gap-4 mt-3">
                <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
                <p className="text-[#D4AF37] text-xs uppercase mb-4 tracking-[0.3em] font-sans font-bold">Excellence in Language Education</p>
                <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
              </div>
            </div>
            <div className="w-[130px]"></div> {/* Spacer for balance */}
          </div>

          {/* Main Body */}
          <div className="flex-grow flex flex-col items-center justify-center text-center mt-[-30px]">
            <h2 className="text-6xl text-[#D4AF37] font-serif italic mt-2 mb-4" style={{ transform: 'scaleY(1.1)' }}>Certificate of Completion</h2>

            <p className="text-lg text-slate-500 font-sans mb-1 tracking-widest uppercase ">This certificate is proudly awarded to</p>

            <div className="relative  w-full z-10 h-32 flex items-end justify-center">
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[650px] h-[1px] bg-[#D4AF37]"></div>
              <h3 className="text-7xl text-slate-900 relative z-10 px-12 leading-relaxed pt-4 pb-2"
                style={{
                  fontFamily: "'Pinyon Script', cursive",
                  textShadow: '0px 0px 1px rgba(0,0,0,0.5)'
                }}>
                {recipientName}
              </h3>
            </div>

            <p className="text-lg text-slate-500 font-sans mb-2">For successfully completing the course</p>

            <div className="max-w-4xl mx-auto">
              <p className="text-base text-slate-800 font-serif italic leading-relaxed px-12">
                {description}
              </p>
            </div>

            <div className="bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/5 text-[#b4942b] text-sm rounded-full px-8 py-1.5 mt-4 mb-2 inline-block font-bold border border-[#D4AF37]/50 shadow-sm">
              CEFR Level: <span className="text-slate-900">{certificateType}</span>
            </div>
          </div>

          {/* Footer / Signatures / Photo - Fixed Grid Layout for Perfect Centering */}
          <div className="grid grid-cols-3 items-end w-full px-4 pb-4">

            {/* Left: Date & QR */}
            <div className="flex flex-col items-center justify-self-start w-48">
              <div className="text-center w-full">
                <div className="h-px w-full bg-slate-300 mb-2"></div>
                <p className="text-sm font-sans text-slate-500 uppercase tracking-widest mb-1">Date of Issue</p>
                <p className="font-serif font-bold text-2xl text-slate-800">{date}</p>
              </div>
              <div className="mt-4 opacity-90">
                <QRCodeSVG value={qrCodeData} size={85} fgColor="#334155" />
              </div>
            </div>

            {/* Center: Student Photo (Exactly under Main Body) */}
            <div className="flex flex-col items-center justify-self-center relative bottom-4">
              {/* Photo Frame */}
              {studentPhoto ? (
                <div className="relative w-32 h-44 bg-white shadow-2xl skew-y-0 duration-300">
                  {/* Photo */}
                  <div className="absolute inset-1 border border-slate-200 overflow-hidden">
                    <Image
                      src={studentPhoto}
                      alt="Student"
                      width={120}
                      height={170}
                      className="w-full h-full object-cover filter sepia-[.15]"
                      unoptimized
                    />
                  </div>

                  {/* Stamp Overlay - Moved further out to overlap less */}
                  <div className="absolute -bottom-10 -right-16 w-32 h-32 opacity-85 mix-blend-multiply pointer-events-none transform rotate-[10deg] z-30">
                    <Image
                      src={staticImages.stamp}
                      alt="Official Stamp"
                      width={128}
                      height={128}
                      className="w-full h-full object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              ) : (
                <div className="relative w-28 h-28 flex items-center justify-center opacity-60">
                  <Image
                    src={staticImages.stamp}
                    alt="Official Stamp"
                    width={112}
                    height={112}
                    className="w-full h-full object-contain rotate-[-5deg]"
                    unoptimized
                  />
                </div>
              )}
            </div>


            {/* Right: Signature */}
            <div className="flex flex-col items-center justify-self-end w-48 relative">
              <Image
                src={staticImages.sign}
                alt="Signature"
                width={200}
                height={100}
                className="absolute -top-16 object-contain pointer-events-none filter contrast-125"
                unoptimized
              />
              <div className="h-px w-full bg-slate-300 mt-6 mb-2 z-10 relative"></div>
              <div className="text-center w-full">
                <p className="text-sm font-sans text-slate-500 uppercase tracking-widest">Authorized Signature</p>
                <p className="font-serif font-bold text-xl mt-1 text-slate-800">{issuingAuthority}</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-5 left-0 right-0 text-center">
            <p className="text-[10px] text-slate-400 font-sans">
              Certificate ID: {qrCodeData.split('/').pop()} • Verify authenticity at: gilava-academy.app/verify
            </p>
          </div>

        </div>
      </div>
      <div className="mt-8 flex gap-4 no-capture">
        <Button onClick={downloadAsImage} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-full shadow-xl transition-all hover:scale-105">
          Download Image (High Res)
        </Button>
        <Button onClick={downloadAsPDF} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-10 rounded-full shadow-xl transition-all hover:scale-105">
          Download PDF
        </Button>
      </div>
    </div>
  )
}


export default GilavaCertificate

