'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src="/logo1.png" alt="Gilava Logo" width={40} height={40} className="w-10 h-10 object-contain" />
                            <span className="text-2xl font-serif font-bold tracking-tight text-white">
                                Gilava <span className="text-blue-400">Academy</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link href="/#features" className="hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium text-white">Programs</Link>
                            <Link href="#" className="hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium text-white">Global Network</Link>
                            <Link href="#" className="hover:text-blue-400 transition-colors px-3 py-2 rounded-md text-sm font-medium text-white">About</Link>
                            <Link href="/portal">
                                <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300">
                                    Student Portal
                                </Button>
                            </Link>
                            <Link href="/admin"> {/* Added Admin link */}
                                <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300">
                                    Admin
                                </Button>
                            </Link>
                            <Link href="/verify"> {/* Updated Verify Certificate link */}
                                <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20">
                                    Verify Certificate
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
