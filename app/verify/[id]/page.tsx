import { getCertificateFromGitHub, getImageFromGitHub } from '@/lib/github'
import GilavaCertificate from '@/components/GilavaCertificate'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function VerifyPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;

    // Try to get the image first (Preferred)
    const certificateImage = await getImageFromGitHub(id)

    if (certificateImage) {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
                <div className="mb-8">
                    <div className="bg-[#D4AF37] text-gray-900 px-6 py-2 rounded-full font-bold shadow-lg animate-in fade-in slide-in-from-top-4 duration-700">
                        ✓ Certificate Verified
                    </div>
                </div>

                <div className="bg-white p-2 rounded-lg shadow-2xl animate-in zoom-in-95 duration-500 max-w-4xl w-full">
                    <img
                        src={certificateImage}
                        alt="Verified Certificate"
                        className="w-full h-auto rounded"
                    />
                </div>

                <Link href="/" className="mt-8">
                    <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                        Verify Another Certificate
                    </Button>
                </Link>
            </div>
        )
    }

    // Fallback: Try to get JSON data
    const certificate = await getCertificateFromGitHub(id)

    if (!certificate) {
        notFound()
    }

    // Sanitize the data to match the component props
    const certificateProps = {
        recipientName: certificate.recipientName,
        certificateType: certificate.certificateType,
        date: certificate.date,
        issuingAuthority: certificate.issuingAuthority,
        qrCodeData: certificate.qrCodeData,
        studentPhoto: certificate.studentPhoto || undefined,
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center py-12 px-4">

            {/* Verification Badge */}
            <div className="mb-8 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="bg-green-500/10 text-green-400 border border-green-500/50 rounded-full px-6 py-2 flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="font-bold tracking-wide uppercase text-sm">Certificate Verified</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F7E7CE] text-center mb-2">
                    Official Certification
                </h1>
                <p className="text-slate-400 text-center max-w-md">
                    This document is a valid and authentic certificate issued by Gilava English Academy.
                </p>
            </div>

            {/* Certificate Display */}
            <div className="scale-[0.6] md:scale-[0.7] lg:scale-[0.8] origin-top shadow-2xl rounded-lg overflow-hidden ring-4 ring-[#D4AF37]/30">
                <div className="pointer-events-none select-none">
                    <GilavaCertificate {...certificateProps} />
                </div>
            </div>

            <div className="mt-[-100px] md:mt-[-50px] flex gap-4 z-10">
                <Link href="/">
                    <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                        Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    )
}
