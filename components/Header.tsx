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
                            <Link href="/admin">
                                <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300">
                                    Admin
                                </Button>
                            </Link>
                            <Link href="/verify">
                                <Button className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20">
                                    Verify Certificate
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-900 border-b border-white/10 animate-in slide-in-from-top-5 duration-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/#features" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Programs</Link>
                        <Link href="#" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Global Network</Link>
                        <Link href="#" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About</Link>
                        <div className="pt-4 flex flex-col gap-2 px-3">
                            <Link href="/portal" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="outline" className="w-full border-blue-500/50 text-blue-400">
                                    Student Portal
                                </Button>
                            </Link>
                            <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="outline" className="w-full border-blue-500/50 text-blue-400">
                                    Admin
                                </Button>
                            </Link>
                            <Link href="/verify" onClick={() => setIsMenuOpen(false)}>
                                <Button className="w-full bg-blue-600 text-white">
                                    Verify Certificate
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
